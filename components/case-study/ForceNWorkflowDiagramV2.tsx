"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ELK, { type ElkNode } from "elkjs/lib/elk.bundled.js";
import {
  forceNWorkflowNodes,
  forceNWorkflowEdges,
  forceNWorkflowNodeOrder,
  type WorkflowNode,
  type WorkflowNodeType,
} from "@/lib/content/forcen-workflow";

/**
 * Dark-shell counterpart to ForceNWorkflowDiagram (which stays on the legacy
 * warm/paper light page). Same elkjs auto-layout and the same reconstructed
 * node/edge data; only the visual treatment moves onto the dark token set,
 * and the docked full-height side drawer is replaced with a floating popover
 * pinned next to the clicked node (the pattern approved on RoomEase V2:
 * createPortal, position:fixed, anchored to the node's on-screen rect,
 * following scroll/resize, clamped to the viewport, closes on ✕/Escape).
 *
 * Shape carries meaning (rectangle = process, diamond = decision, cylinder =
 * data store, document = record, double-border = automated step, pill = event
 * / end state). Exception/side-path nodes (procurement, replenishment, rework)
 * take a faint accent tint so they read as off the main straight-through line.
 */

// Nodes that represent an exception/side path (procurement, rework,
// replenishment) take a faint accent tint instead of the plain surface fill,
// so they read as branching off the main straight-through flow, the dark-token
// equivalent of the light page's white-vs-amber separation.
const SIDE_PATH_IDS = new Set([
  "procure-components",
  "trigger-component-replenishment",
  "diagnose-and-rework",
  "create-order-build-requirement",
]);

const NODE_SIZE: Record<WorkflowNodeType, { width: number; height: number }> = {
  event: { width: 244, height: 70 },
  endpoint: { width: 244, height: 70 },
  process: { width: 254, height: 78 },
  decision: { width: 306, height: 152 },
  "data-store": { width: 228, height: 90 },
  document: { width: 254, height: 80 },
  "automated-subprocess": { width: 254, height: 80 },
};

function estimateLabelWidth(text: string) {
  return Math.round(text.length * 7 + 14);
}
const LABEL_HEIGHT = 18;

const TYPE_LABEL: Record<WorkflowNodeType, string> = {
  event: "Event",
  endpoint: "End state",
  process: "Process",
  decision: "Decision",
  "data-store": "Data store",
  document: "Record",
  "automated-subprocess": "Automated step",
};

function fillFor(node: WorkflowNode): string {
  if (node.type === "decision") return "var(--color-project-accent)";
  if (SIDE_PATH_IDS.has(node.id))
    return "color-mix(in srgb, var(--color-project-accent) 12%, var(--color-surface-2))";
  return "var(--color-surface-2)";
}

function textFor(node: WorkflowNode): string {
  return node.type === "decision" ? "var(--color-bg)" : "var(--color-text)";
}

interface LaidOutNode extends WorkflowNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface LaidOutEdge {
  id: string;
  label?: string;
  style: string;
  points: { x: number; y: number }[];
  labelPos?: { x: number; y: number };
}

const elk = new ELK();

async function computeLayout() {
  const graph: ElkNode = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.layered.spacing.nodeNodeBetweenLayers": "140",
      "elk.spacing.nodeNode": "68",
      "elk.spacing.edgeNode": "46",
      "elk.spacing.edgeEdge": "32",
      "elk.spacing.labelLabel": "16",
      "elk.spacing.labelNode": "16",
      "elk.layered.spacing.edgeNodeBetweenLayers": "58",
      "elk.layered.spacing.edgeEdgeBetweenLayers": "32",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
      "elk.layered.cycleBreaking.strategy": "GREEDY",
      "elk.layered.thoroughness": "14",
      "elk.edgeLabels.inline": "false",
      "elk.layered.spacing.edgeLabelBetweenLayers": "20",
    },
    children: forceNWorkflowNodes.map((n) => ({
      id: n.id,
      width: NODE_SIZE[n.type].width,
      height: NODE_SIZE[n.type].height,
    })),
    edges: forceNWorkflowEdges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
      labels: e.label
        ? [
            {
              text: e.label,
              width: estimateLabelWidth(e.label),
              height: LABEL_HEIGHT,
            },
          ]
        : undefined,
    })),
  };

  const layout = await elk.layout(graph);

  const nodes: LaidOutNode[] = (layout.children ?? []).map((c) => {
    const source = forceNWorkflowNodes.find((n) => n.id === c.id)!;
    return {
      ...source,
      x: c.x ?? 0,
      y: c.y ?? 0,
      width: c.width ?? NODE_SIZE[source.type].width,
      height: c.height ?? NODE_SIZE[source.type].height,
    };
  });

  const edges: LaidOutEdge[] = (layout.edges ?? []).map((e) => {
    const source = forceNWorkflowEdges.find((edge) => edge.id === e.id)!;
    const section = e.sections?.[0];
    const points = section
      ? [section.startPoint, ...(section.bendPoints ?? []), section.endPoint]
      : [];
    const elkLabel = e.labels?.[0];
    const labelPos =
      elkLabel && elkLabel.x !== undefined && elkLabel.y !== undefined
        ? { x: elkLabel.x + (elkLabel.width ?? 0) / 2, y: elkLabel.y + (elkLabel.height ?? LABEL_HEIGHT) }
        : undefined;
    return { id: e.id, label: source.label, style: source.style, points, labelPos };
  });

  return {
    nodes,
    edges,
    width: layout.width ?? 900,
    height: layout.height ?? 900,
  };
}

function NodeShape({ node, active }: { node: LaidOutNode; active: boolean }) {
  const { width, height, type } = node;
  const shapeStyle = {
    fill: fillFor(node),
    stroke: active ? "var(--accent-bright, var(--color-project-accent))" : "var(--color-line-strong, var(--color-line))",
  } as React.CSSProperties;
  const strokeWidth = active ? 4 : 2.25;

  if (type === "decision") {
    const points = `${width / 2},2 ${width - 2},${height / 2} ${width / 2},${height - 2} 2,${height / 2}`;
    return <polygon points={points} style={shapeStyle} strokeWidth={strokeWidth} />;
  }

  if (type === "event" || type === "endpoint") {
    return (
      <rect x={1} y={1} width={width - 2} height={height - 2} rx={(height - 2) / 2} style={shapeStyle} strokeWidth={strokeWidth} />
    );
  }

  if (type === "data-store") {
    const rimH = 16;
    const bodyTop = rimH / 2;
    return (
      <g>
        <path
          d={`M2,${bodyTop} v${height - rimH - 2} a${(width - 4) / 2},${rimH / 2} 0 0 0 ${width - 4},0 v${-(height - rimH - 2)}`}
          style={shapeStyle}
          strokeWidth={strokeWidth}
        />
        <ellipse cx={width / 2} cy={bodyTop} rx={(width - 4) / 2} ry={rimH / 2} style={shapeStyle} strokeWidth={strokeWidth} />
      </g>
    );
  }

  if (type === "document") {
    const waveH = 10;
    return (
      <path
        d={`M2,2 H${width - 2} V${height - waveH - 2} Q${width * 0.75},${height - 2} ${width / 2},${height - waveH - 2} Q${width * 0.25},${height + waveH - 2} 2,${height - waveH - 2} Z`}
        style={shapeStyle}
        strokeWidth={strokeWidth}
      />
    );
  }

  if (type === "automated-subprocess") {
    return (
      <g>
        <rect x={1} y={1} width={width - 2} height={height - 2} rx={10} style={shapeStyle} strokeWidth={strokeWidth} />
        <rect
          x={7}
          y={7}
          width={width - 14}
          height={height - 14}
          rx={6}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          className="inner-line"
          style={{ stroke: "var(--accent-bright, var(--color-project-accent))" }}
        />
      </g>
    );
  }

  return <rect x={1} y={1} width={width - 2} height={height - 2} rx={10} style={shapeStyle} strokeWidth={strokeWidth} />;
}

function edgeStrokeProps(style: string): { stroke: string; strokeDasharray?: string; accent: boolean } {
  switch (style) {
    case "rework":
      return { stroke: "var(--accent-bright, var(--color-project-accent))", strokeDasharray: "6 4", accent: true };
    case "replenishment":
      return { stroke: "var(--accent-bright, var(--color-project-accent))", strokeDasharray: "2 5", accent: true };
    case "parallel":
      return { stroke: "var(--color-text-muted)", strokeDasharray: "1 6", accent: false };
    case "data-update":
      return { stroke: "var(--color-text-subtle)", strokeDasharray: "5 4", accent: false };
    default:
      return { stroke: "var(--color-text-subtle)", strokeDasharray: undefined, accent: false };
  }
}

interface PopPos {
  left: number;
  top: number;
  width: number;
}

export default function ForceNWorkflowDiagramV2() {
  const [layout, setLayout] = useState<Awaited<ReturnType<typeof computeLayout>> | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pos, setPos] = useState<PopPos | null>(null);
  const [open, setOpen] = useState(false);
  const mounted = useRef(true);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mounted.current = true;
    computeLayout().then((result) => {
      if (mounted.current) setLayout(result);
    });
    return () => {
      mounted.current = false;
    };
  }, []);

  const activeNode = useMemo(
    () => layout?.nodes.find((n) => n.id === activeId) ?? null,
    [layout, activeId]
  );
  const activeIndex = activeId ? forceNWorkflowNodeOrder.indexOf(activeId) : -1;

  const stepActive = useCallback(
    (delta: number) => {
      if (activeIndex === -1) return;
      const next = (activeIndex + delta + forceNWorkflowNodeOrder.length) % forceNWorkflowNodeOrder.length;
      setActiveId(forceNWorkflowNodeOrder[next]);
    },
    [activeIndex]
  );

  // Minimizing the diagram also dismisses any open popover, so it can't hang
  // over the page after the nodes it points at have collapsed away.
  const toggleOpen = useCallback(() => {
    setOpen((o) => {
      if (o) setActiveId(null);
      return !o;
    });
  }, []);

  // Pin the popover next to the active node's on-screen rect. Prefers the right
  // of the node, flips to the left when it would overflow, and clamps to the
  // viewport. Re-runs on scroll/resize so it tracks the node as the page moves.
  useEffect(() => {
    if (!activeId) {
      setPos(null);
      return;
    }
    const compute = () => {
      const el = wrapRef.current?.querySelector<SVGGElement>(`[data-node="${activeId}"]`);
      if (!el) return;
      const nr = el.getBoundingClientRect();
      const pad = 12;
      const width = Math.min(340, window.innerWidth - pad * 2);
      const ph = popRef.current?.offsetHeight ?? 260;
      let left = nr.right + 14;
      if (left + width > window.innerWidth - pad) left = nr.left - width - 14;
      left = Math.max(pad, Math.min(left, window.innerWidth - width - pad));
      let top = nr.top + nr.height / 2 - ph / 2;
      top = Math.max(pad, Math.min(top, window.innerHeight - ph - pad));
      setPos({ left, top, width });
    };
    compute();
    const raf = requestAnimationFrame(compute); // refine once popover height is known
    const onMove = () => compute();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    // Click anywhere that isn't the popover or another node closes it. Clicks
    // on a node fall through to that node's own handler, which switches focus.
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (popRef.current && target && popRef.current.contains(target)) return;
      if (target instanceof Element && target.closest("[data-node]")) return;
      setActiveId(null);
    };
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown, true);
    };
  }, [activeId]);

  return (
    <div ref={wrapRef}>
      <style>{`
        .fn2-diagram .node-hit { cursor: pointer; transform-box: fill-box; transform-origin: center; transition: transform .18s ease-out; outline: none; }
        .fn2-diagram .node-hit:hover { transform: translate(-2px, -2px); }
        .fn2-diagram .node-hit:focus-visible .shape-outer { filter: drop-shadow(0 0 0 2px var(--accent-bright, var(--color-project-accent))); }
        .fn2-diagram .node-hit:hover .inner-line { opacity: 0.85; }
      `}</style>

      {/* Collapse/expand tab: the auto-laid workflow is tall, so it stays
          minimized until the reader chooses to open it. */}
      <div
        className={`flex items-center justify-between gap-4 rounded-[var(--radius-default)] border px-5 py-4 ${open ? "mb-4" : ""}`}
        style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
      >
        <div>
          <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Interactive diagram
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
            {open
              ? "Click any node to read what happens at that step."
              : `Full production and fulfilment workflow, ${forceNWorkflowNodeOrder.length} steps. Minimized to save space.`}
          </p>
        </div>
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          className="shrink-0 px-4 py-2 text-sm font-medium rounded-[var(--radius-button)] border transition-all duration-[var(--duration-base)] hover:border-[var(--accent-bright,var(--color-project-accent))] hover:text-[var(--accent-bright,var(--color-project-accent))] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_10%,var(--color-surface-1))]"
          style={{ borderColor: "var(--color-line-strong, var(--color-line))", color: "var(--color-text)", background: "var(--color-surface-2)" }}
        >
          {open ? "Minimize ▲" : "View full design flow ▾"}
        </button>
      </div>

      {open && (
      <>
      <div
        className="fn2-diagram rounded-[var(--radius-default)] overflow-auto border"
        style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
      >
        {!layout ? (
          <div className="flex items-center justify-center h-64 text-sm" style={{ color: "var(--color-text-subtle)" }}>
            Computing diagram layout…
          </div>
        ) : (
          <svg
            width="100%"
            viewBox={`-20 -20 ${layout.width + 40} ${layout.height + 40}`}
            style={{ aspectRatio: `${layout.width + 40} / ${layout.height + 40}`, minWidth: 900 }}
            className="block"
            role="img"
            aria-label="ForceN Dev System production and fulfilment workflow diagram"
          >
            <defs>
              <marker id="fn2-arrowhead" markerWidth="12" markerHeight="12" refX="9.5" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L9.5,3.5 L0,7 Z" style={{ fill: "var(--color-text-subtle)" }} />
              </marker>
              <marker id="fn2-arrowhead-accent" markerWidth="12" markerHeight="12" refX="9.5" refY="3.5" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L9.5,3.5 L0,7 Z" style={{ fill: "var(--accent-bright, var(--color-project-accent))" }} />
              </marker>
            </defs>

            {layout.edges.map((e) => {
              if (e.points.length < 2) return null;
              const d = e.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
              const { stroke, strokeDasharray, accent } = edgeStrokeProps(e.style);
              const labelPos = e.labelPos ?? e.points[Math.floor(e.points.length / 2)];
              return (
                <g key={e.id}>
                  <path
                    d={d}
                    fill="none"
                    strokeWidth={2.75}
                    strokeDasharray={strokeDasharray}
                    markerEnd={accent ? "url(#fn2-arrowhead-accent)" : "url(#fn2-arrowhead)"}
                    style={{ stroke }}
                  />
                  {e.label && (
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fontSize={12}
                      fontWeight={600}
                      textAnchor="middle"
                      style={{ fill: "var(--color-text-muted)", paintOrder: "stroke", stroke: "var(--color-surface-1)", strokeWidth: 5 }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {layout.nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                <g
                  data-node={n.id}
                  onClick={() => setActiveId(n.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(evt) => {
                    if (evt.key === "Enter" || evt.key === " ") {
                      evt.preventDefault();
                      setActiveId(n.id);
                    }
                  }}
                  className="node-hit"
                  aria-label={`${n.title} (${TYPE_LABEL[n.type]})`}
                >
                  <g className="shape-outer">
                    <NodeShape node={n} active={n.id === activeId} />
                  </g>
                  {n.type === "decision" ? (
                    <foreignObject x={n.width * 0.22} y={n.height * 0.28} width={n.width * 0.56} height={n.height * 0.44}>
                      <div className="w-full h-full flex items-center justify-center text-center">
                        <span className="text-[13px] leading-tight font-semibold" style={{ color: textFor(n) }}>
                          {n.title}
                        </span>
                      </div>
                    </foreignObject>
                  ) : (
                    <foreignObject x={6} y={4} width={n.width - 12} height={n.height - 8}>
                      <div className="w-full h-full flex items-center justify-center text-center px-1">
                        <span className="text-[13px] leading-tight font-semibold" style={{ color: textFor(n) }}>
                          {n.title}
                        </span>
                      </div>
                    </foreignObject>
                  )}
                </g>
              </g>
            ))}
          </svg>
        )}
      </div>

      {/* Legend + hint below the chart. */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span
          style={{
            fontSize: "var(--text-label)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--accent-bright, var(--color-project-accent))",
          }}
        >
          Click any node
        </span>
        {(Object.keys(TYPE_LABEL) as WorkflowNodeType[]).map((t) => (
          <span key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <span
              aria-hidden="true"
              className="inline-block w-3.5 h-3.5 shrink-0"
              style={{
                background: t === "decision" ? "var(--color-project-accent)" : "var(--color-surface-2)",
                border: "1.5px solid var(--color-line-strong, var(--color-line))",
                borderRadius: t === "event" || t === "endpoint" ? "999px" : t === "decision" ? "2px" : "3px",
                transform: t === "decision" ? "rotate(45deg)" : undefined,
              }}
            />
            {TYPE_LABEL[t]}
          </span>
        ))}
      </div>
      </>
      )}

      {/* Floating popover, pinned to the clicked node, over the page. */}
      {activeNode &&
        pos &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popRef}
            role="dialog"
            aria-label={activeNode.title}
            className="fixed z-50 rounded-[var(--radius-default)] border p-5"
            style={{
              left: pos.left,
              top: pos.top,
              width: pos.width,
              background: "var(--color-surface-2)",
              borderColor: "var(--color-line-strong, var(--color-line))",
              boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="rounded-full px-2.5 py-1 border"
                style={{
                  fontSize: "var(--text-label)",
                  letterSpacing: "var(--tracking-label)",
                  textTransform: "uppercase",
                  color: "var(--accent-bright, var(--color-project-accent))",
                  borderColor: "var(--accent-bright, var(--color-project-accent))",
                }}
              >
                {TYPE_LABEL[activeNode.type]}
              </span>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close"
                className="text-sm w-7 h-7 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--color-surface-1)]"
                style={{ color: "var(--color-text-subtle)" }}
              >
                ✕
              </button>
            </div>
            <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
              {activeNode.title}
            </h3>
            <p className="mt-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
              {activeNode.description}
            </p>
            <div className="flex items-center justify-between gap-2.5 mt-5">
              <span className="text-sm" style={{ color: "var(--color-text-subtle)" }}>
                {activeIndex + 1} / {forceNWorkflowNodeOrder.length}
              </span>
              <div className="flex gap-2.5">
                {(["prev", "next"] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => stepActive(dir === "prev" ? -1 : 1)}
                    className="px-3.5 py-2 text-sm font-medium rounded-[var(--radius-button)] border transition-all duration-[var(--duration-base)] hover:border-[var(--accent-bright,var(--color-project-accent))] hover:text-[var(--accent-bright,var(--color-project-accent))] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_10%,var(--color-surface-1))]"
                    style={{ borderColor: "var(--color-line)", color: "var(--color-text)", background: "var(--color-surface-1)" }}
                  >
                    {dir === "prev" ? "← Prev" : "Next →"}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

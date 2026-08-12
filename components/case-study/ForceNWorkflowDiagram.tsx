"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ELK, { type ElkNode } from "elkjs/lib/elk.bundled.js";
import {
  forceNWorkflowNodes,
  forceNWorkflowEdges,
  forceNWorkflowNodeOrder,
  type WorkflowNode,
  type WorkflowNodeType,
} from "@/lib/content/forcen-workflow";

// Colors match the approved forcen-preview.html mockup's "comic-box" language.
const INK = "#201c17";
const INK_SOFT = "#5c564c";
const AMBER_FILL = "#fdf1de";
const AMBER_LINE = "#a15a10";
const DECISION_FILL = "#2b2e33";
const DECISION_TEXT = "#f0c98a";
const PAPER = "#fdfaf5";

// Nodes that represent an exception/side path (procurement, rework,
// replenishment) render white instead of amber to visually separate them
// from the main straight-through flow, same as the mockup.
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
  if (node.type === "decision") return DECISION_FILL;
  if (node.type === "event" || node.type === "endpoint" || node.type === "data-store") return "#fff";
  if (SIDE_PATH_IDS.has(node.id)) return "#fff";
  return AMBER_FILL;
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
  const fill = fillFor(node);
  const strokeWidth = active ? 4.5 : 2.5;

  if (type === "decision") {
    const points = `${width / 2},2 ${width - 2},${height / 2} ${width / 2},${height - 2} 2,${height / 2}`;
    return <polygon className="shape-outer" points={points} fill={fill} stroke={INK} strokeWidth={strokeWidth} />;
  }

  if (type === "event" || type === "endpoint") {
    return (
      <rect
        className="shape-outer"
        x={1}
        y={1}
        width={width - 2}
        height={height - 2}
        rx={(height - 2) / 2}
        fill={fill}
        stroke={INK}
        strokeWidth={strokeWidth}
      />
    );
  }

  if (type === "data-store") {
    const rimH = 16;
    const bodyTop = rimH / 2;
    return (
      <g>
        <path
          className="shape-outer"
          d={`M2,${bodyTop} v${height - rimH - 2} a${(width - 4) / 2},${rimH / 2} 0 0 0 ${width - 4},0 v${-(height - rimH - 2)}`}
          fill={fill}
          stroke={INK}
          strokeWidth={strokeWidth}
        />
        <ellipse cx={width / 2} cy={bodyTop} rx={(width - 4) / 2} ry={rimH / 2} fill={fill} stroke={INK} strokeWidth={strokeWidth} />
      </g>
    );
  }

  if (type === "document") {
    const waveH = 10;
    return (
      <path
        className="shape-outer"
        d={`M2,2 H${width - 2} V${height - waveH - 2} Q${width * 0.75},${height - 2} ${width / 2},${height - waveH - 2} Q${width * 0.25},${height + waveH - 2} 2,${height - waveH - 2} Z`}
        fill={fill}
        stroke={INK}
        strokeWidth={strokeWidth}
      />
    );
  }

  if (type === "automated-subprocess") {
    return (
      <g>
        <rect className="shape-outer" x={1} y={1} width={width - 2} height={height - 2} rx={10} fill={fill} stroke={INK} strokeWidth={strokeWidth} />
        <rect
          x={7}
          y={7}
          width={width - 14}
          height={height - 14}
          rx={6}
          fill="none"
          stroke={AMBER_LINE}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          className="inner-line"
        />
      </g>
    );
  }

  return <rect className="shape-outer" x={1} y={1} width={width - 2} height={height - 2} rx={10} fill={fill} stroke={INK} strokeWidth={strokeWidth} />;
}

function edgeStrokeProps(style: string) {
  switch (style) {
    case "rework":
      return { stroke: "#c04b2c", strokeDasharray: "6 4" };
    case "replenishment":
      return { stroke: "#2c6e5e", strokeDasharray: "2 4" };
    case "parallel":
      return { stroke: "#3a6b93", strokeDasharray: "1 5" };
    case "data-update":
      return { stroke: "#8a6b1f", strokeDasharray: "5 3" };
    default:
      return { stroke: INK, strokeDasharray: undefined };
  }
}

export default function ForceNWorkflowDiagram() {
  const [layout, setLayout] = useState<Awaited<ReturnType<typeof computeLayout>> | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const mounted = useRef(true);

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

  function stepActive(delta: number) {
    if (activeIndex === -1) return;
    const next =
      (activeIndex + delta + forceNWorkflowNodeOrder.length) % forceNWorkflowNodeOrder.length;
    setActiveId(forceNWorkflowNodeOrder[next]);
  }

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-2 sm:px-6">
      <style>{`
        .fn-diagram .node-hit { cursor: pointer; transform-box: fill-box; transform-origin: center; transition: transform .18s ease-out; }
        .fn-diagram .node-hit .shape-outer { transition: filter .18s ease-out; }
        .fn-diagram .node-hit:hover { transform: translate(-2px, -2px); }
        .fn-diagram .node-hit:hover .shape-outer { filter: brightness(1.05) drop-shadow(3px 3px 0 ${INK}); }
        .fn-diagram .node-hit:hover .inner-line { opacity: 0.85; }
      `}</style>
      <div className="mx-auto max-w-[1880px]">
        <div
          className="fn-diagram rounded-2xl overflow-auto"
          style={{ border: `3px solid ${INK}`, background: PAPER, boxShadow: `6px 6px 0 ${INK}` }}
        >
          {!layout ? (
            <div className="flex items-center justify-center h-64 text-sm" style={{ color: INK_SOFT }}>
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
                <marker
                  id="fn-arrowhead"
                  markerWidth="12"
                  markerHeight="12"
                  refX="9.5"
                  refY="3.5"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L9.5,3.5 L0,7 Z" fill={INK} />
                </marker>
              </defs>

              {layout.edges.map((e) => {
                if (e.points.length < 2) return null;
                const d = e.points
                  .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
                  .join(" ");
                const { stroke, strokeDasharray } = edgeStrokeProps(e.style);
                const labelPos = e.labelPos ?? e.points[Math.floor(e.points.length / 2)];
                return (
                  <g key={e.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={2.75}
                      strokeDasharray={strokeDasharray}
                      markerEnd="url(#fn-arrowhead)"
                    />
                    {e.label && (
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        fontSize={12}
                        fontWeight={700}
                        fill={INK_SOFT}
                        textAnchor="middle"
                        style={{ paintOrder: "stroke", stroke: PAPER, strokeWidth: 5 }}
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
                    onClick={() => setActiveId(n.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(evt) => {
                      if (evt.key === "Enter" || evt.key === " ") setActiveId(n.id);
                    }}
                    className="node-hit"
                  >
                    <NodeShape node={n} active={n.id === activeId} />
                    {n.type === "decision" ? (
                      <foreignObject
                        x={n.width * 0.22}
                        y={n.height * 0.28}
                        width={n.width * 0.56}
                        height={n.height * 0.44}
                      >
                        <div className="w-full h-full flex items-center justify-center text-center">
                          <span className="text-[13px] leading-tight font-bold" style={{ color: DECISION_TEXT }}>
                            {n.title}
                          </span>
                        </div>
                      </foreignObject>
                    ) : (
                      <foreignObject x={6} y={4} width={n.width - 12} height={n.height - 8}>
                        <div className="w-full h-full flex items-center justify-center text-center px-1">
                          <span className="text-[13px] leading-tight font-bold" style={{ color: INK }}>
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

        {activeNode && (
          <div className="fixed inset-0 z-40" onClick={() => setActiveId(null)}>
            <div className="absolute inset-0 bg-black/20" />
            <div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-8 overflow-y-auto"
              style={{ borderLeft: `3px solid ${INK}` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[13px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
                  style={{
                    background: fillFor(activeNode),
                    color: activeNode.type === "decision" ? DECISION_TEXT : INK,
                    border: `2px solid ${INK}`,
                  }}
                >
                  {TYPE_LABEL[activeNode.type]}
                </span>
                <button
                  onClick={() => setActiveId(null)}
                  className="text-neutral-400 hover:text-neutral-900 text-base"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-serif text-[28px] leading-tight mt-5" style={{ color: INK }}>
                {activeNode.title}
              </h3>
              <p className="text-base leading-relaxed mt-3.5" style={{ color: INK_SOFT }}>
                {activeNode.description}
              </p>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => stepActive(-1)}
                  className="cs-box flex-1 py-2.5 text-base font-bold"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => stepActive(1)}
                  className="cs-box flex-1 py-2.5 text-base font-bold"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-[13px] font-semibold" style={{ color: INK_SOFT }}>
          {(Object.keys(TYPE_LABEL) as WorkflowNodeType[]).map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3.5 h-3.5 rounded-sm"
                style={{
                  background: t === "decision" ? DECISION_FILL : t === "process" ? AMBER_FILL : "#fff",
                  border: `1.5px solid ${INK}`,
                }}
              />
              {TYPE_LABEL[t]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

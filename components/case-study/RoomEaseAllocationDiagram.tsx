"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Dark-shell counterpart to RoomEaseAllocationDiagram (which stays on the
 * legacy warm/paper light page). Same hand-positioned flowchart geometry and
 * the same reconstructed source data — only the visual treatment moves onto
 * the dark token set.
 *
 * Interaction: clicking a node opens a floating popover pinned NEXT TO that
 * node (anchored to its on-screen position, following scroll/resize, clamped
 * to the viewport) — so the explanation appears right where you clicked, never
 * a scroll away in a docked side column. Closes on ✕, Escape, or opening
 * another node. Shape carries meaning: pill = event / end state, rectangle =
 * process, diamond = decision (>=2 labelled branches), document = record.
 */

type NodeType = "event" | "process" | "decision" | "document" | "endpoint";

interface DNode {
  id: string;
  type: NodeType;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zone: "input" | "execution" | "validation";
  synopsis: string;
}

const nodes: DNode[] = [
  {
    id: "submit",
    type: "event",
    title: "User submits booking request",
    x: 270,
    y: 56,
    w: 230,
    h: 60,
    zone: "input",
    synopsis:
      "The member fills out the event-info form: event name, time, group size, event type, AV/accessibility needs, priority rating, and preferred building. This is the intake step from the team's booking-flow prototype.",
  },
  {
    id: "hard-filter",
    type: "process",
    title: "Hard-constraint filtering",
    x: 265,
    y: 168,
    w: 240,
    h: 82,
    zone: "input",
    synopsis:
      "Removes rooms with time conflicts, rooms below the required capacity, and rooms missing required features (AV, accessibility). Anything that fails a hard constraint is out, full stop — this is the feasibility layer, not the preference layer.",
  },
  {
    id: "scoring",
    type: "process",
    title: "Scoring & ranking",
    x: 265,
    y: 302,
    w: 240,
    h: 92,
    zone: "input",
    synopsis:
      "Remaining rooms are scored on capacity fit, feature alignment, and location/building preference, with priority rating moderated to keep the score fair rather than letting a single loud request always win. Shows the best available match even when no room is a perfect fit.",
  },
  {
    id: "suggestions",
    type: "document",
    title: "Ranked room suggestions",
    x: 265,
    y: 448,
    w: 240,
    h: 84,
    zone: "execution",
    synopsis:
      "Top matches are returned with a visible justification (e.g. capacity fit, feature match) next to each option, so the user can see why a room was suggested rather than trusting a black box.",
  },
  {
    id: "accept-decision",
    type: "decision",
    title: "User accepts a suggestion?",
    x: 240,
    y: 588,
    w: 290,
    h: 128,
    zone: "execution",
    synopsis:
      "The user reviews the ranked options. They can select one to move forward, or flag it as unsuitable. Flagging requires a stated reason, which is what keeps the override from becoming an unexplained bypass.",
  },
  {
    id: "override",
    type: "process",
    title: "Manual override — reason required",
    x: 24,
    y: 592,
    w: 200,
    h: 96,
    zone: "execution",
    synopsis:
      "From the team's wireframe: the user selects a reason a suggested room doesn't work (e.g. missing projector, accessibility, layout) before the system re-runs scoring. The reason is captured for the record, not just discarded.",
  },
  {
    id: "book-request",
    type: "process",
    title: "Booking request submitted",
    x: 265,
    y: 760,
    w: 240,
    h: 76,
    zone: "execution",
    synopsis:
      "The chosen room and event details move from “recommendation” to a formal request, entering the executive/admin approval layer of the governed multi-role workflow.",
  },
  {
    id: "admin-decision",
    type: "decision",
    title: "Conflicts or policy issues?",
    x: 240,
    y: 878,
    w: 290,
    h: 130,
    zone: "validation",
    synopsis:
      "An executive or admin checks the request against policy and current bookings. Executives can book directly where their role allows it; anything with a conflict, policy exception, or needed override escalates to an admin.",
  },
  {
    id: "changes",
    type: "process",
    title: "Requests changes",
    x: 546,
    y: 700,
    w: 200,
    h: 84,
    zone: "validation",
    synopsis:
      "If the admin finds a conflict or policy problem, the request is sent back with a reason instead of being silently rejected — the same transparency principle as the user-side override.",
  },
  {
    id: "confirmed",
    type: "endpoint",
    title: "Booking finalized, user notified",
    x: 270,
    y: 1046,
    w: 230,
    h: 60,
    zone: "validation",
    synopsis:
      "The confirmation screen shows the event summary and room summary and logs the booking to prevent it from conflicting with any later request — closing the loop that a manual, email-based process couldn't reliably close.",
  },
];

const nodeOrder = nodes.map((n) => n.id);

interface DEdge {
  id: string;
  from: string;
  points: [number, number][];
  label?: string;
  labelPos?: [number, number];
  labelAnchor?: "start" | "middle" | "end";
  style: "solid" | "decision" | "rework";
}

const edges: DEdge[] = [
  { id: "e1", from: "submit", points: [[385, 116], [385, 168]], style: "solid" },
  { id: "e2", from: "hard-filter", points: [[385, 250], [385, 302]], style: "solid" },
  { id: "e3", from: "scoring", points: [[385, 394], [385, 448]], style: "solid" },
  { id: "e4", from: "suggestions", points: [[385, 532], [385, 588]], style: "solid" },
  {
    id: "e5",
    from: "accept-decision",
    points: [[385, 716], [385, 760]],
    label: "Accepts",
    labelPos: [400, 742],
    labelAnchor: "start",
    style: "decision",
  },
  {
    id: "e6",
    from: "accept-decision",
    points: [[240, 652], [124, 652], [124, 592]],
    label: "Flags a reason",
    style: "decision",
  },
  {
    id: "e7",
    from: "override",
    points: [[124, 592], [124, 348], [265, 348]],
    label: "Re-scored",
    style: "rework",
  },
  { id: "e8", from: "book-request", points: [[385, 836], [385, 878]], style: "solid" },
  {
    id: "e9",
    from: "admin-decision",
    points: [[385, 1008], [385, 1046]],
    label: "Clear",
    labelPos: [400, 1030],
    labelAnchor: "start",
    style: "decision",
  },
  {
    id: "e10",
    from: "admin-decision",
    points: [[530, 943], [646, 943], [646, 784]],
    label: "Issues found",
    style: "decision",
  },
  {
    id: "e11",
    from: "changes",
    // Route up the gap, then enter the suggestions box HORIZONTALLY through its
    // right edge (x=505) — a vertical arrow into the side of a box reads as a
    // mistake; the final segment must be perpendicular to the edge it meets.
    points: [[546, 742], [525, 742], [525, 490], [505, 490]],
    label: "Back to suggestions",
    labelPos: [531, 556],
    labelAnchor: "start",
    style: "rework",
  },
];

const ZONE_BANDS: { id: string; label: string; y: number; h: number; fill: string }[] = [
  { id: "input", label: "Input & Processing", y: 0, h: 424, fill: "color-mix(in srgb, var(--color-project-accent) 9%, transparent)" },
  { id: "execution", label: "Execution", y: 424, h: 434, fill: "color-mix(in srgb, var(--color-project-accent) 3.5%, transparent)" },
  { id: "validation", label: "Validation", y: 858, h: 260, fill: "color-mix(in srgb, var(--color-project-accent) 9%, transparent)" },
];

const TYPE_LABEL: Record<NodeType, string> = {
  event: "Start",
  process: "Process",
  decision: "Decision",
  document: "Record",
  endpoint: "End state",
};

function nodeFill(type: NodeType) {
  return type === "decision" ? "var(--color-project-accent)" : "var(--color-surface-2)";
}
function nodeTextColor(type: NodeType) {
  return type === "decision" ? "var(--color-bg)" : "var(--color-text)";
}

function NodeShape({ node, active }: { node: DNode; active: boolean }) {
  const { w, h, type } = node;
  const shapeStyle = {
    fill: nodeFill(type),
    stroke: active ? "var(--accent-bright, var(--color-project-accent))" : "var(--color-line-strong, var(--color-line))",
  } as React.CSSProperties;
  const strokeWidth = active ? 4 : 2;

  if (type === "decision") {
    const points = `${w / 2},2 ${w - 2},${h / 2} ${w / 2},${h - 2} 2,${h / 2}`;
    return <polygon points={points} style={shapeStyle} strokeWidth={strokeWidth} />;
  }
  if (type === "event" || type === "endpoint") {
    return <rect x={1} y={1} width={w - 2} height={h - 2} rx={(h - 2) / 2} style={shapeStyle} strokeWidth={strokeWidth} />;
  }
  if (type === "document") {
    const waveH = 10;
    return (
      <path
        d={`M2,2 H${w - 2} V${h - waveH - 2} Q${w * 0.75},${h - 2} ${w / 2},${h - waveH - 2} Q${w * 0.25},${h + waveH - 2} 2,${h - waveH - 2} Z`}
        style={shapeStyle}
        strokeWidth={strokeWidth}
      />
    );
  }
  return <rect x={1} y={1} width={w - 2} height={h - 2} rx={10} style={shapeStyle} strokeWidth={strokeWidth} />;
}

function edgeStyleProps(style: DEdge["style"]): React.CSSProperties & { strokeDasharray?: string } {
  if (style === "rework") return { stroke: "var(--accent-bright, var(--color-project-accent))", strokeDasharray: "6 4" };
  return { stroke: "var(--color-text-subtle)" };
}

function LegendSwatch({ type }: { type: NodeType }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-3.5 h-3.5 shrink-0"
      style={{
        background: nodeFill(type),
        border: "1.5px solid var(--color-line-strong, var(--color-line))",
        borderRadius: type === "event" || type === "endpoint" ? "999px" : type === "decision" ? "2px" : "3px",
        transform: type === "decision" ? "rotate(45deg)" : undefined,
      }}
    />
  );
}

interface PopPos {
  left: number;
  top: number;
  width: number;
}

export default function RoomEaseAllocationDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pos, setPos] = useState<PopPos | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const activeNode = useMemo(() => nodes.find((n) => n.id === activeId) ?? null, [activeId]);
  const activeIndex = activeId ? nodeOrder.indexOf(activeId) : -1;

  const stepActive = useCallback(
    (delta: number) => {
      if (activeIndex === -1) return;
      const next = (activeIndex + delta + nodeOrder.length) % nodeOrder.length;
      setActiveId(nodeOrder[next]);
    },
    [activeIndex],
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

  const width = 800;
  const height = 1130;

  return (
    <div ref={wrapRef}>
      <div className="mx-auto max-w-4xl">
        {/* Collapse/expand tab: the full flowchart is tall, so it stays
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
                : `Full allocation flow, ${nodes.length} steps. Minimized to save space.`}
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
          className="re2-diagram rounded-[var(--radius-default)] overflow-auto border"
          style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
        >
          <style>{`
            .re2-diagram .node-hit { cursor: pointer; transform-box: fill-box; transform-origin: center; transition: transform .18s ease-out; outline: none; }
            .re2-diagram .node-hit:hover { transform: translate(-2px, -2px); }
            .re2-diagram .node-hit:focus-visible .shape-outer { filter: drop-shadow(0 0 0 2px var(--accent-bright, var(--color-project-accent))); }
          `}</style>
          <svg
            width="100%"
            viewBox={`-20 -20 ${width + 200} ${height + 40}`}
            style={{ aspectRatio: `${width + 200} / ${height + 40}`, minWidth: 620 }}
            className="block"
            role="img"
            aria-label="Diagram: how a RoomEase booking request becomes a ranked, approved room"
          >
            <defs>
              <marker id="re2-arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,3 L0,6 Z" style={{ fill: "var(--color-text-subtle)" }} />
              </marker>
              <marker id="re2-arrowhead-accent" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L8,3 L0,6 Z" style={{ fill: "var(--accent-bright, var(--color-project-accent))" }} />
              </marker>
            </defs>

            {ZONE_BANDS.map((z) => (
              <g key={z.id}>
                <rect x={-10} y={z.y} width={width + 180} height={z.h} style={{ fill: z.fill }} />
                <text
                  x={width + 150}
                  y={z.y + 26}
                  fontSize={13}
                  fontWeight={700}
                  textAnchor="end"
                  letterSpacing="0.06em"
                  style={{ fill: "var(--color-text-subtle)" }}
                >
                  {z.label.toUpperCase()}
                </text>
              </g>
            ))}

            {edges.map((e) => {
              const d = e.points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
              const { stroke, strokeDasharray } = edgeStyleProps(e.style);
              const mid = e.points[Math.floor((e.points.length - 1) / 2)];
              const [labelX, labelY] = e.labelPos ?? [mid[0] + (e.points.length > 2 ? 8 : 34), mid[1] - 8];
              const labelAnchor = e.labelAnchor ?? (e.points.length > 2 ? "start" : "middle");
              const markerId = e.style === "rework" ? "url(#re2-arrowhead-accent)" : "url(#re2-arrowhead)";
              return (
                <g key={e.id}>
                  <path d={d} fill="none" style={{ stroke }} strokeWidth={2} strokeDasharray={strokeDasharray} markerEnd={markerId} />
                  {e.label && (
                    <text
                      x={labelX}
                      y={labelY}
                      fontSize={11}
                      fontWeight={600}
                      textAnchor={labelAnchor}
                      style={{ fill: "var(--color-text-muted)", paintOrder: "stroke", stroke: "var(--color-surface-1)", strokeWidth: 5 }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {nodes.map((n) => (
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
                  <foreignObject x={6} y={4} width={n.w - 12} height={n.h - 8}>
                    <div className="w-full h-full flex items-center justify-center text-center px-1">
                      <span className="text-[11.5px] leading-tight font-semibold" style={{ color: nodeTextColor(n.type) }}>
                        {n.title}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              </g>
            ))}
          </svg>
        </div>

        {/* Legend + hint below the chart (no docked column any more). */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Click any node
          </span>
          {(Object.keys(TYPE_LABEL) as NodeType[]).map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <LegendSwatch type={t} />
              {TYPE_LABEL[t]}
            </span>
          ))}
        </div>
        </>
        )}
      </div>

      {/* Floating popover — pinned to the clicked node, over the page. */}
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
              {activeNode.synopsis}
            </p>
            <div className="flex items-center justify-between gap-2.5 mt-5">
              <span className="text-sm" style={{ color: "var(--color-text-subtle)" }}>
                {activeIndex + 1} / {nodes.length}
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
          document.body,
        )}
    </div>
  );
}

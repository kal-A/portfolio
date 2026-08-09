"use client";

import { useMemo, useState } from "react";

// Hand-positioned SVG diagram (no layout engine, per the decision to keep
// diagrams hand-built this pass). Shape carries meaning: pill = event/end
// state, rectangle = process, diamond = decision (>=2 labelled branches),
// document = record. Reconstructed from the team's EOT report (six-step
// matching algorithm, Table 4), the FDR presentation ("How the Recommendation
// Engine Works" two-stage model), the manual-override wireframe (Figure 2.3),
// and the "Governed Multi-Role Workflow" slide (member / executive / admin).

const INK = "#201c17";
const INK_SOFT = "#5c564c";
const GOLD_FILL = "#fdf3d9";
const DECISION_FILL = "#2b2419";
const DECISION_TEXT = "#eab848";
const PAPER = "#fffdf8";

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
    points: [[546, 742], [505, 742], [505, 490]],
    label: "Back to suggestions",
    style: "rework",
  },
];

const ZONE_BANDS: { id: string; label: string; y: number; h: number; fill: string }[] = [
  { id: "input", label: "Input & Processing", y: 0, h: 424, fill: "rgba(234,184,72,0.10)" },
  { id: "execution", label: "Execution", y: 424, h: 434, fill: "rgba(234,184,72,0.04)" },
  { id: "validation", label: "Validation", y: 858, h: 260, fill: "rgba(234,184,72,0.10)" },
];

function fillFor(n: DNode) {
  if (n.type === "decision") return DECISION_FILL;
  if (n.type === "event" || n.type === "endpoint" || n.type === "document") return "#fff";
  return GOLD_FILL;
}

function NodeShape({ node, active }: { node: DNode; active: boolean }) {
  const { w, h, type } = node;
  const fill = fillFor(node);
  const strokeWidth = active ? 4.5 : 2.5;

  if (type === "decision") {
    const points = `${w / 2},2 ${w - 2},${h / 2} ${w / 2},${h - 2} 2,${h / 2}`;
    return <polygon points={points} fill={fill} stroke={INK} strokeWidth={strokeWidth} />;
  }
  if (type === "event" || type === "endpoint") {
    return (
      <rect
        x={1}
        y={1}
        width={w - 2}
        height={h - 2}
        rx={(h - 2) / 2}
        fill={fill}
        stroke={INK}
        strokeWidth={strokeWidth}
      />
    );
  }
  if (type === "document") {
    const waveH = 10;
    return (
      <path
        d={`M2,2 H${w - 2} V${h - waveH - 2} Q${w * 0.75},${h - 2} ${w / 2},${h - waveH - 2} Q${w * 0.25},${h + waveH - 2} 2,${h - waveH - 2} Z`}
        fill={fill}
        stroke={INK}
        strokeWidth={strokeWidth}
      />
    );
  }
  return <rect x={1} y={1} width={w - 2} height={h - 2} rx={10} fill={fill} stroke={INK} strokeWidth={strokeWidth} />;
}

function edgeStrokeProps(style: DEdge["style"]) {
  if (style === "rework") return { stroke: "#a15a10", strokeDasharray: "6 4" };
  return { stroke: INK, strokeDasharray: undefined };
}

const TYPE_LABEL: Record<NodeType, string> = {
  event: "Start",
  process: "Process",
  decision: "Decision",
  document: "Record",
  endpoint: "End state",
};

export default function RoomEaseAllocationDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = useMemo(() => nodes.find((n) => n.id === activeId) ?? null, [activeId]);
  const activeIndex = activeId ? nodeOrder.indexOf(activeId) : -1;

  function stepActive(delta: number) {
    if (activeIndex === -1) return;
    const next = (activeIndex + delta + nodeOrder.length) % nodeOrder.length;
    setActiveId(nodeOrder[next]);
  }

  const width = 800;
  const height = 1130;

  return (
    <div className="relative">
      <style>{`
        .re-diagram .node-hit { cursor: pointer; transform-box: fill-box; transform-origin: center; transition: transform .18s ease-out; }
        .re-diagram .node-hit .shape-outer { transition: filter .18s ease-out; }
        .re-diagram .node-hit:hover { transform: translate(-2px, -2px); }
      `}</style>
      <div
        className="re-diagram rounded-2xl overflow-auto"
        style={{ border: `3px solid ${INK}`, background: PAPER, boxShadow: `6px 6px 0 ${INK}` }}
      >
        <svg
          width="100%"
          viewBox={`-20 -20 ${width + 200} ${height + 40}`}
          style={{ aspectRatio: `${width + 200} / ${height + 40}`, minWidth: 640 }}
          className="block"
          role="img"
          aria-label="Diagram: how a RoomEase booking request becomes a ranked, approved room"
        >
          <defs>
            <marker id="re-arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L8,3 L0,6 Z" fill={INK} />
            </marker>
          </defs>

          {ZONE_BANDS.map((z) => (
            <g key={z.id}>
              <rect x={-10} y={z.y} width={width + 180} height={z.h} fill={z.fill} />
              <text x={width + 150} y={z.y + 26} fontSize={13} fontWeight={800} fill={INK_SOFT} textAnchor="end" letterSpacing="0.04em">
                {z.label.toUpperCase()}
              </text>
            </g>
          ))}

          {edges.map((e) => {
            const d = e.points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
            const { stroke, strokeDasharray } = edgeStrokeProps(e.style);
            const mid = e.points[Math.floor((e.points.length - 1) / 2)];
            return (
              <g key={e.id}>
                <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeDasharray={strokeDasharray} markerEnd="url(#re-arrowhead)" />
                {e.label && (
                  <text
                    x={mid[0] + (e.points.length > 2 ? 8 : 34)}
                    y={mid[1] - 8}
                    fontSize={11}
                    fontWeight={700}
                    fill={INK_SOFT}
                    textAnchor={e.points.length > 2 ? "start" : "middle"}
                    style={{ paintOrder: "stroke", stroke: PAPER, strokeWidth: 5 }}
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
                onClick={() => setActiveId(n.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(evt) => {
                  if (evt.key === "Enter" || evt.key === " ") setActiveId(n.id);
                }}
                className="node-hit"
                aria-label={`${n.title} (${TYPE_LABEL[n.type]})`}
              >
                <g className="shape-outer">
                  <NodeShape node={n} active={n.id === activeId} />
                </g>
                <foreignObject x={6} y={4} width={n.w - 12} height={n.h - 8}>
                  <div className="w-full h-full flex items-center justify-center text-center px-1">
                    <span
                      className="text-[11.5px] leading-tight font-bold"
                      style={{ color: n.type === "decision" ? DECISION_TEXT : INK }}
                    >
                      {n.title}
                    </span>
                  </div>
                </foreignObject>
              </g>
            </g>
          ))}
        </svg>
      </div>

      {activeNode && (
        <div className="fixed inset-0 z-40" onClick={() => setActiveId(null)}>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 overflow-y-auto"
            style={{ borderLeft: `3px solid ${INK}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                style={{
                  background: fillFor(activeNode),
                  color: activeNode.type === "decision" ? DECISION_TEXT : INK,
                  border: `2px solid ${INK}`,
                }}
              >
                {TYPE_LABEL[activeNode.type]}
              </span>
              <button onClick={() => setActiveId(null)} className="text-neutral-400 hover:text-neutral-900 text-sm" aria-label="Close">
                ✕
              </button>
            </div>
            <h3 className="font-serif text-2xl mt-4" style={{ color: INK }}>
              {activeNode.title}
            </h3>
            <p className="text-sm leading-relaxed mt-3" style={{ color: INK_SOFT }}>
              {activeNode.synopsis}
            </p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => stepActive(-1)} className="cs-box flex-1 py-2 text-sm font-bold">
                ← Prev
              </button>
              <button onClick={() => stepActive(1)} className="cs-box flex-1 py-2 text-sm font-bold">
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs font-semibold" style={{ color: INK_SOFT }}>
        {(Object.keys(TYPE_LABEL) as NodeType[]).map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{
                background: t === "decision" ? DECISION_FILL : t === "process" ? GOLD_FILL : "#fff",
                border: `1.5px solid ${INK}`,
              }}
            />
            {TYPE_LABEL[t]}
          </span>
        ))}
      </div>
    </div>
  );
}

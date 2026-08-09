"use client";

import { useState } from "react";

export interface RankedIssue {
  rank: number;
  issue: string;
  heuristic: string;
  fix: string;
}

export default function ExpandableIssueList({
  issues,
  accent,
}: {
  issues: RankedIssue[];
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="cs-box light px-5 py-3 text-sm font-extrabold uppercase tracking-wide"
        style={{ color: "var(--ink)" }}
      >
        {open ? "Hide the remaining issues" : `Show the remaining ${issues.length} ranked issues`}
      </button>

      {open && (
        <div className="mt-4 flex flex-col gap-3">
          {issues.map((it) => (
            <div
              key={it.rank}
              className="cs-box white px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-5"
            >
              <span
                className="shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black"
                style={{ borderColor: "var(--ink)", background: accent, color: "var(--ink)" }}
              >
                {it.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-snug" style={{ color: "var(--ink)" }}>
                  {it.issue}
                </p>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mt-1.5" style={{ color: accent }}>
                  {it.heuristic}
                </p>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#4c473e" }}>
                  <span className="font-extrabold" style={{ color: "var(--ink)" }}>
                    Fix:{" "}
                  </span>
                  {it.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

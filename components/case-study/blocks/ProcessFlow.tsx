"use client";

import { useState } from "react";

export interface ProcessStep {
  title: string;
  synopsis: string;
}

const ROW_1_LEN = 3;

function StepBox({
  step,
  active,
  onClick,
  accent,
}: {
  step: ProcessStep;
  active: boolean;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="cs-box text-sm font-bold px-6 py-4 transition-colors"
      style={
        active
          ? { background: accent, color: "#fff9ee", borderColor: "var(--ink)" }
          : { color: "var(--ink)" }
      }
    >
      {step.title}
    </button>
  );
}

export default function ProcessFlow({ steps, accent }: { steps: ProcessStep[]; accent: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const row1 = steps.slice(0, ROW_1_LEN);
  const row2 = steps.slice(ROW_1_LEN);
  const active = steps[activeIndex];

  const renderRow = (row: ProcessStep[], offset: number) => (
    <div className="flex flex-wrap items-center gap-3">
      {row.map((step, i) => {
        const index = offset + i;
        return (
          <div key={step.title} className="flex items-center gap-3">
            <StepBox step={step} active={index === activeIndex} onClick={() => setActiveIndex(index)} accent={accent} />
            {i < row.length - 1 && (
              <span className="text-2xl font-black" style={{ color: "var(--ink)" }}>
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-8 items-start">
      <div className="flex flex-col gap-4">
        {renderRow(row1, 0)}
        <div className="flex items-center gap-3 pl-1">
          <span className="text-2xl font-black" style={{ color: accent }}>
            ↓
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
            Review clears the way to tracking
          </span>
        </div>
        {renderRow(row2, ROW_1_LEN)}
      </div>

      <div
        className="cs-box white px-8 py-8 md:h-[280px] md:-translate-y-10 flex flex-col justify-center overflow-hidden"
        style={{ background: "#fffdf8" }}
      >
        <p className="text-xs font-extrabold uppercase tracking-wide mb-2" style={{ color: accent }}>
          Step {activeIndex + 1} of {steps.length}
        </p>
        <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--ink)" }}>
          {active.title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "#4c473e" }}>
          {active.synopsis}
        </p>
      </div>
    </div>
  );
}

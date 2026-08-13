"use client";

import { useState } from "react";
import Image from "next/image";

export interface ProcessStep {
  title: string;
  synopsis: string;
  image?: { src: string; alt: string };
}

function StepBox({
  step,
  active,
  onClick,
  activeBg,
}: {
  step: ProcessStep;
  active: boolean;
  onClick: () => void;
  activeBg: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="cs-box flex-1 min-w-0 text-center text-[14.5px] leading-snug font-bold px-4 py-4 transition-colors"
      style={
        active
          ? { background: activeBg, color: "#fff9ee", borderColor: "var(--ink)" }
          : { color: "var(--ink)" }
      }
    >
      {step.title}
    </button>
  );
}

export default function ProcessFlow({
  steps,
  accent,
  activeGradient,
  middleLabel = "Review clears the way to tracking",
  rowLength = 3,
}: {
  steps: ProcessStep[];
  accent: string;
  activeGradient?: string;
  middleLabel?: string;
  /** How many steps to place in the first row before wrapping to the next; defaults to 3. */
  rowLength?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const row1 = steps.slice(0, rowLength);
  const row2 = steps.slice(rowLength);
  const activeBg = activeGradient ?? accent;

  const renderRow = (row: ProcessStep[], offset: number) => (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {row.map((step, i) => {
        const index = offset + i;
        return (
          <div key={step.title} className="flex flex-col sm:flex-row items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
            <StepBox
              step={step}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              activeBg={activeBg}
            />
            {i < row.length - 1 && (
              <span className="text-xl sm:text-2xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
                →
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-stretch">
      <div className="flex flex-col justify-start gap-5">
        {renderRow(row1, 0)}
        {row2.length > 0 && (
          <div className="flex items-center gap-3 pl-1">
            <span className="text-2xl font-black" style={{ color: accent }}>
              ↓
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
              {middleLabel}
            </span>
          </div>
        )}
        {renderRow(row2, rowLength)}
      </div>

      {/* All steps render in the same grid cell (stacked); the container's
          height is driven by the tallest one, so switching the active step
          never resizes the panel or shifts anything below it. Only the
          active step is visible. */}
      <div className="cs-box white grid lg:min-h-[200px] px-8 py-7" style={{ background: "#fffdf8" }}>
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col justify-start"
            style={{ gridArea: "1 / 1", visibility: i === activeIndex ? "visible" : "hidden" }}
            aria-hidden={i !== activeIndex}
          >
            {step.image && (
              <div
                className="relative w-full h-28 rounded-md border mb-4 overflow-hidden"
                style={{ borderColor: "rgba(32,28,23,0.14)", background: "#fff" }}
              >
                <Image src={step.image.src} alt={step.image.alt} fill sizes="320px" className="object-contain" />
              </div>
            )}
            <p className="text-xs font-extrabold uppercase tracking-wide mb-2" style={{ color: accent }}>
              Step {i + 1} of {steps.length}
            </p>
            <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--ink)" }}>
              {step.title}
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "#4c473e" }}>
              {step.synopsis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

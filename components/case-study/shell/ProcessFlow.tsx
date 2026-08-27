"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Token-based replacement for components/case-study/blocks/ProcessFlow.tsx
 * (decision of record, Phase 11) — see shell/Chapter.tsx's doc comment for
 * why this lives as a parallel file instead of an in-place edit. Logic,
 * state, crossfade mechanism, and row/alignment structure are unchanged
 * from the original (that spacing/alignment math went through several
 * dedicated bugfix passes — see MIGRATION-INVENTORY.md); only the visual
 * treatment moved off `.cs-box`/`--ink` onto the dark-field token set.
 */
export interface ProcessStep {
  title: string;
  synopsis: string;
  image?: { src: string; alt: string };
}

function StepBox({
  step,
  active,
  onClick,
}: {
  step: ProcessStep;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 min-w-0 text-center text-[14.5px] leading-snug font-medium px-4 py-4 rounded-[var(--radius-button)] border transition-all ${
        active
          ? ""
          : "hover:-translate-y-0.5 hover:border-[var(--color-project-accent)] hover:text-[var(--color-project-accent)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.28)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_14%,var(--color-surface-1))] focus-visible:-translate-y-0.5 focus-visible:border-[var(--color-project-accent)] focus-visible:text-[var(--color-project-accent)] focus-visible:bg-[color-mix(in_srgb,var(--color-project-accent)_14%,var(--color-surface-1))]"
      }`}
      style={{
        transitionDuration: "var(--duration-base)",
        transitionTimingFunction: "var(--ease-standard)",
        // A resting background fill (not just a border) so this reads as
        // a pressable control rather than a static label chip. Hover adds
        // a visible lift + accent-tinted wash (color-mix, not a flat
        // color swap) so the response is unmistakable without abandoning
        // the "one surgical accent" rule — it's the same accent already
        // used for the active state, just diluted for the hover preview.
        ...(active
          ? { background: "var(--color-project-accent)", color: "var(--color-bg)", borderColor: "var(--color-project-accent)" }
          : { background: "var(--color-surface-1)", color: "var(--color-text)", borderColor: "var(--color-line)" }),
      }}
    >
      {step.title}
    </button>
  );
}

export default function ProcessFlow({
  steps,
  middleLabel = "Review clears the way to tracking",
  rowLength = 3,
  topAlignRows = false,
}: {
  steps: ProcessStep[];
  middleLabel?: string;
  /** How many steps to place in the first row before wrapping to the next; defaults to 3. */
  rowLength?: number;
  /** Top-align the row1/connector/row2 group instead of centering it in the
   *  stretched column, so a label placed directly above the flow sits close
   *  to the visible first row instead of behind an invisible centering gap.
   *  Off by default -- opt in per call site. */
  topAlignRows?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const row1 = steps.slice(0, rowLength);
  const row2 = steps.slice(rowLength);

  const renderRow = (row: ProcessStep[], offset: number) => (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {row.map((step, i) => {
        const index = offset + i;
        return (
          <div key={step.title} className="flex flex-col sm:flex-row items-center gap-3 flex-1 min-w-0 w-full sm:w-auto">
            <StepBox step={step} active={index === activeIndex} onClick={() => setActiveIndex(index)} />
            {i < row.length - 1 && (
              <span
                className="text-xl sm:text-2xl font-black shrink-0 rotate-90 sm:rotate-0"
                style={{ color: "var(--color-text-subtle)" }}
              >
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
      <div className={`flex flex-col ${topAlignRows ? "justify-start" : "justify-center"} gap-5`}>
        {renderRow(row1, 0)}
        {row2.length > 0 && (
          <div className="flex items-center gap-3 pl-1">
            <span className="text-2xl font-black" style={{ color: "var(--color-project-accent)" }}>
              ↓
            </span>
            <span
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--color-text-subtle)",
              }}
            >
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
      <div
        className="grid lg:min-h-[200px] px-8 py-7 rounded-[var(--radius-default)] border"
        style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
      >
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex flex-col justify-start"
            style={{
              gridArea: "1 / 1",
              opacity: i === activeIndex ? 1 : 0,
              visibility: i === activeIndex ? "visible" : "hidden",
              transition: `opacity 0.22s ease${i === activeIndex ? "" : ", visibility 0s linear 0.22s"}`,
              pointerEvents: i === activeIndex ? "auto" : "none",
            }}
            aria-hidden={i !== activeIndex}
          >
            {step.image && (
              <div
                className="relative w-full h-28 rounded-[var(--radius-button)] border mb-4 overflow-hidden"
                style={{ borderColor: "var(--color-line)" }}
              >
                <Image src={step.image.src} alt={step.image.alt} fill sizes="320px" className="object-contain" />
              </div>
            )}
            <p
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--color-project-accent)",
                marginBottom: "var(--space-2)",
              }}
            >
              Step {i + 1} of {steps.length}
            </p>
            <h3
              className="mb-3"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}
            >
              {step.title}
            </h3>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{step.synopsis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

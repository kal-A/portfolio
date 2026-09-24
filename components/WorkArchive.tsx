"use client";

import { useState } from "react";
import { caseStudies, evidenceLabel, type CaseStudy } from "@/lib/content/case-studies";
import ProjectIndexItem from "@/components/ui/ProjectIndexItem";
import Reveal from "@/components/Reveal";

/**
 * /work archive: one continuous scroll grouped by the kind of work each entry
 * actually demonstrates, with a filter that narrows the same grouping to just
 * hired work or just independent projects. The default ("All") shows
 * everything, so the page reads as a body of work built up over time rather
 * than a pile of things made this year, and the thematic grouping (not a
 * chronological or employment split) is what carries that. The filter is
 * additive on top of the grouping: picking "Work experience" or "Projects"
 * keeps the same three sections and simply hides the rows (and any section)
 * that don't apply, instead of collapsing everything into one flat list.
 *
 * Grouping rationale (unchanged from the pre-filter version):
 *   Systems & Technical  -> the build/ops end: hardware production, an AI-
 *                           systems architecture, a browser-3D atlas.
 *   Product & Design     -> things people directly use: fintech and booking
 *                           UX, brand/retail design, app and site redesigns,
 *                           an HCI wearable.
 *   Research & Strategy  -> behaviour-into-plan work: analytics-driven feature
 *                           planning, curriculum/ops research.
 *
 * Order within each group is proof strength / relevance, not chronology
 * (/resume is the dated record). Work experience is internships; everything
 * self-directed (the capstone, course, and independent projects) is a project.
 */
const groups: { label: string; slugs: string[] }[] = [
  { label: "Systems & Technical", slugs: ["forcen", "chronicle", "cities-of-east"] },
  { label: "Product & Design", slugs: ["roomease", "hera-fertility", "uwmsa-redesign", "greenhouse", "uwosp-redesign", "pill-pal"] },
  { label: "Research & Strategy", slugs: ["pathpeer", "informatica"] },
];

const isExperience = (cs: CaseStudy) => cs.entryType === "internship";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "experiences", label: "Work experience" },
  { id: "projects", label: "Projects" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

function passesFilter(cs: CaseStudy, filter: FilterId) {
  if (filter === "experiences") return isExperience(cs);
  if (filter === "projects") return !isExperience(cs);
  return true;
}

function yearOf(timeframe: string) {
  const matches = timeframe.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : timeframe;
}

export default function WorkArchive() {
  const [filter, setFilter] = useState<FilterId>("all");

  const counts: Record<FilterId, number> = {
    all: caseStudies.length,
    experiences: caseStudies.filter(isExperience).length,
    projects: caseStudies.filter((cs) => !isExperience(cs)).length,
  };

  const resolvedGroups = groups
    .map((group) => ({
      label: group.label,
      items: group.slugs
        .map((slug) => caseStudies.find((cs) => cs.slug === slug))
        .filter((cs): cs is CaseStudy => Boolean(cs) && passesFilter(cs as CaseStudy, filter)),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter work by type"
        className="inline-flex gap-1 rounded-full border p-1"
        style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className="flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              style={
                active
                  ? { background: "var(--color-text)", color: "var(--color-bg)" }
                  : { color: "var(--color-text-muted)" }
              }
            >
              <span style={{ fontSize: "var(--text-body)", fontWeight: 500 }}>{f.label}</span>
              <span
                className="tabular-nums"
                style={{ fontSize: "var(--text-small)", opacity: active ? 0.75 : 0.6 }}
              >
                {counts[f.id]}
              </span>
            </button>
          );
        })}
      </div>

      <div key={filter} className="mt-10 flex flex-col gap-14">
        {resolvedGroups.map((group) => (
          <div key={group.label}>
            <Reveal>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  lineHeight: "var(--leading-h2)",
                  color: "var(--color-text)",
                }}
              >
                {group.label}
              </h2>
            </Reveal>
            <div className="mt-4 flex flex-col">
              {group.items.map((cs, i) => (
                <Reveal key={cs.slug} delay={i * 80}>
                  <ProjectIndexItem
                    title={cs.title}
                    description={cs.oneLiner}
                    meta={`${evidenceLabel(cs)} · ${cs.role} · ${yearOf(cs.timeframe)}`}
                    href={`/work/${cs.slug}`}
                    variant="complete"
                    image={cs.heroMedia}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

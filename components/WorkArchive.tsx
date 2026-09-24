"use client";

import { useState } from "react";
import { caseStudies, evidenceLabel } from "@/lib/content/case-studies";
import ProjectIndexItem from "@/components/ui/ProjectIndexItem";
import Reveal from "@/components/Reveal";

/**
 * /work archive, split by the kind of engagement each entry represents, with a
 * segmented tab to switch between the two. Now that hired work and independent
 * projects are evenly matched in count, splitting them is clearer than the old
 * three thematic buckets: a reviewer usually wants either "where has he
 * worked" or "what has he built on his own," and the tab answers that directly.
 * The split is driven by `entryType` so new entries land in the right tab
 * automatically: internships are work experience; everything self-directed
 * (the capstone, course projects, and independent projects) is a project.
 * Order within each tab follows the shared `caseStudies` display order (proof
 * strength / recency), so the strongest roles and projects lead, the requested
 * redesigns sit mid-list, and Pill Pal closes out the projects. Rows reuse the
 * same ProjectIndexItem as before; only the grouping around them changed.
 */
const EXPERIENCE_TYPES = new Set(["internship"]);

const TABS = [
  { id: "experiences", label: "Work experience" },
  { id: "projects", label: "Projects" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function yearOf(timeframe: string) {
  const matches = timeframe.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : timeframe;
}

export default function WorkArchive() {
  const [tab, setTab] = useState<TabId>("experiences");

  const experiences = caseStudies.filter((cs) => EXPERIENCE_TYPES.has(cs.entryType));
  const projects = caseStudies.filter((cs) => !EXPERIENCE_TYPES.has(cs.entryType));
  const counts: Record<TabId, number> = { experiences: experiences.length, projects: projects.length };
  const items = tab === "experiences" ? experiences : projects;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter work by type"
        className="inline-flex gap-1 rounded-full border p-1"
        style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              style={
                active
                  ? { background: "var(--color-text)", color: "var(--color-bg)" }
                  : { color: "var(--color-text-muted)" }
              }
            >
              <span style={{ fontSize: "var(--text-body)", fontWeight: 500 }}>{t.label}</span>
              <span
                className="tabular-nums"
                style={{ fontSize: "var(--text-small)", opacity: active ? 0.75 : 0.6 }}
              >
                {counts[t.id]}
              </span>
            </button>
          );
        })}
      </div>

      <div key={tab} className="mt-8 flex flex-col">
        {items.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 70}>
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
  );
}

import { caseStudies, evidenceLabel } from "@/lib/content/case-studies";
import ProjectIndexItem from "@/components/ui/ProjectIndexItem";

/**
 * Grouped archive + refined editorial rows. Projects are grouped by the kind
 * of work each one actually demonstrates (its `caseStudyType` evidence), not
 * by employment status or a rigid professional identity. Three sections keep
 * each group coherent instead of lumping unlike work together: the earlier
 * two-bucket split had Greenhouse (retail/brand DESIGN) sitting under
 * "Systems, Operations & Technical" next to ForceN's hardware ops and
 * Chronicle's AI systems, which read as miscategorised.
 *
 *   Product & Design    -> the things people directly use: fintech and booking
 *                          UX, brand/retail design, an HCI wearable.
 *   Research & Strategy  -> behaviour-into-plan work: analytics-driven feature
 *                          planning, curriculum/ops research.
 *   Systems & Technical  -> the build/ops end: a hardware production workflow,
 *                          an AI-systems architecture.
 *
 * Order within each group is proof strength / relevance, not chronology;
 * /work's job is discovery, not a dated record (that's /resume). Rows omit
 * `number` and `primitive` on purpose: sequential numbering and composition
 * variance are the homepage's storytelling devices; /work needs consistent,
 * scannable equivalence across all eight projects instead.
 */
const groups: { label: string; slugs: string[] }[] = [
  { label: "Product & Design", slugs: ["roomease", "hera-fertility", "greenhouse", "pill-pal"] },
  { label: "Research & Strategy", slugs: ["pathpeer", "informatica"] },
  { label: "Systems & Technical", slugs: ["chronicle", "forcen"] },
];

function yearOf(timeframe: string) {
  const matches = timeframe.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : timeframe;
}

export default function WorkArchive() {
  return (
    <div className="flex flex-col gap-14">
      {groups.map((group) => {
        const items = group.slugs
          .map((slug) => caseStudies.find((cs) => cs.slug === slug))
          .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

        return (
          <div key={group.label}>
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
            <div className="mt-4 flex flex-col">
              {items.map((cs) => (
                <ProjectIndexItem
                  key={cs.slug}
                  title={cs.title}
                  description={cs.oneLiner}
                  meta={`${evidenceLabel(cs)} · ${cs.role} · ${yearOf(cs.timeframe)}`}
                  href={`/work/${cs.slug}`}
                  variant="complete"
                  image={cs.heroMedia}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { caseStudies, evidenceLabel } from "@/lib/content/case-studies";
import ProjectIndexItem from "@/components/ui/ProjectIndexItem";

/**
 * Grouped archive + refined editorial rows — decision of record 2026-08-19,
 * replacing the old Work Experience / Projects tabs. That split organized
 * by employment status (was this a paid internship?), which is not what a
 * visitor trying to evaluate the work needs: it put RoomEase (UX research)
 * and Chronicle (AI systems) in one tab and ForceN (ops) next to Hera
 * (fintech UX) in the other, for reasons unrelated to what any of them
 * demonstrate. It also buried Pill Pal — never mentioned on the homepage or
 * in Additional Experience — behind a tab most homepage visitors had no
 * reason to click.
 *
 * These two groups use the project's strongest evidence as the placement
 * criterion, not a rigid professional identity — several projects
 * genuinely span both. Order within each group is proof strength /
 * relevance, not chronology; /work's job is discovery, not a dated record
 * (that's /resume).
 *
 * Rows omit `number` and `primitive` on purpose: sequential numbering is
 * the homepage's curated-argument device, and per-project composition
 * variance is the homepage's storytelling job. /work needs consistent,
 * scannable equivalence across all eight projects instead.
 */
const groups: { label: string; slugs: string[] }[] = [
  { label: "Product, UX & Research", slugs: ["roomease", "hera-fertility", "pathpeer", "pill-pal"] },
  { label: "Systems, Operations & Technical", slugs: ["forcen", "greenhouse", "chronicle", "informatica"] },
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

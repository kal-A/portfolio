import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";

/**
 * Replaces the old full "Selected Experience" section (decision of record
 * 2026-08-19). Every entry that section listed already has a full case
 * study; three of its five roles (ForceN, Greenhouse, and previously
 * PathPeer) are also shown with full evidence in Selected Work, so a
 * second full-treatment section was mostly the same information restated.
 *
 * This section exists only to name what Selected Work doesn't: the roles
 * not in the featured four. It's deliberately quiet — no numbering, no
 * images, no role/location/date metadata block, a 3-column grid instead of
 * Selected Work's stacked rows — so it reads as a footnote, not a second
 * "Selected Work." Full chronology (all five roles, with dates) lives on
 * /resume, which this section links to rather than duplicates.
 */
const additionalSlugs = ["hera-fertility", "informatica", "pathpeer"];

export default function AdditionalExperience() {
  const items = additionalSlugs
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  return (
    <div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cs) => (
          <div key={cs.slug}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                color: "var(--color-text)",
              }}
            >
              {cs.company}
            </h3>
            <p style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>{cs.role}</p>
            <p
              className="mt-2"
              style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-text-muted)" }}
            >
              {cs.oneLiner}
            </p>
            <Link
              href={`/work/${cs.slug}`}
              className="inline-block mt-3 underline underline-offset-4 decoration-[var(--color-line-strong)] hover:decoration-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-sm"
              style={{ fontSize: "var(--text-small)", color: "var(--color-accent)" }}
            >
              Case study →
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-9" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
        Full chronology, dates, and education on the{" "}
        <Link
          href="/resume"
          className="underline underline-offset-4 decoration-[var(--color-line-strong)] hover:decoration-[var(--color-text)]"
          style={{ color: "var(--color-accent)" }}
        >
          resume
        </Link>
        .
      </p>
    </div>
  );
}

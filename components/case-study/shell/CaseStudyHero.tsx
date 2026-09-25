import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * docs/redesign/07-case-study-system.md section 1 ("Project cover") +
 * docs/redesign/06-component-system.md's Metric/MediaFrame architecture
 * rule: shared component source carries no hardcoded project color. Each
 * case study sets `--color-project-accent` on its own root wrapper (same
 * pattern the legacy `--cs-accent-deep` override used) and this component
 * reads that token for the eyebrow line only — everything else is the
 * site's standard dark text/muted-text tokens, so every case study now
 * shares one hero shell instead of hand-building its own gradient.
 *
 * Text only, by design. The cover image is rendered by each case study as a
 * full-width frame BELOW the hero-text/TOC grid, not inside this component:
 * this hero sits in the grid's narrow `1fr` column, so any media rendered
 * here would stop short of the TOC column and leave a dead strip on the
 * right. Every case study now renders its cover full-bleed under the grid
 * (the UWMSA/UWOSP pattern), so covers extend the full container width.
 */
export default function CaseStudyHero({
  company,
  role,
  title,
  lead,
  meta,
  artifacts,
}: {
  company: string;
  role: string;
  title: string;
  lead: string;
  /** e.g. "Mississauga, ON · Jan 2025 – Apr 2025" — already-composed, since which parts appear varies per entry type. */
  meta: string;
  artifacts: string[];
}) {
  return (
    <div>
      <Reveal>
        <Link
          href="/work"
          className="text-sm underline-offset-4 decoration-[var(--color-line-strong)] hover:underline"
          style={{ color: "var(--color-text-muted)" }}
        >
          ← All case studies
        </Link>

        <p
          className="mt-6"
          style={{
            fontSize: "var(--text-label)",
            lineHeight: "var(--leading-label)",
            letterSpacing: "var(--tracking-label)",
            textTransform: "uppercase",
            color: "var(--color-project-accent)",
          }}
        >
          {company} · {role}
        </p>

        <h1
          className="mt-3 max-w-[22ch]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h1)",
            lineHeight: "var(--leading-h1)",
            color: "var(--color-text)",
          }}
        >
          {title}
        </h1>

        <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
          {meta}
        </p>

        <p
          className="mt-5"
          style={{
            fontSize: "var(--text-lead)",
            lineHeight: "var(--leading-lead)",
            color: "var(--color-text-muted)",
            maxWidth: "var(--measure-lead)",
          }}
        >
          {lead}
        </p>

        {artifacts.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-6">
            {artifacts.map((a) => (
              <span
                key={a}
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{ borderColor: "var(--color-line-strong)", color: "var(--color-text-muted)" }}
              >
                {a}
              </span>
            ))}
          </div>
        )}
      </Reveal>
    </div>
  );
}

/**
 * docs/redesign/06-component-system.md "Metric" — a structural rebuild,
 * not a token swap (decision of record, Phase 11): large plain value,
 * concise label, visible qualifier where the claim needs one (proxy,
 * estimate, internal-reporting, etc.). No bordered comic-box card — the
 * scale of the number is what carries weight on a dark field.
 *
 * Every metric in a set renders at the same size and weight (decision of
 * record, 2026-08-25 — a prior "feature the strongest number" pass was
 * rejected: the project's own NoCode.co case-study reference shows a
 * uniform stats row of plain numbers, none bigger than the others, and
 * differentiating one metric's size read as arbitrary rather than
 * intentional). Uses `--text-metric` — the token's own name and scale
 * (clamp 3rem-6.5rem) already carry the weight a stats row needs; no
 * per-instance size or color variation.
 *
 * Carries the same hairline-top + hover-wash treatment CaseStudySnapshot
 * and the Outcomes list already use, so every "quick fact" grid on a case
 * study shares one tactile language — this was the one grid left with no
 * interaction at all, which read as inert next to its siblings.
 */
export default function Metric({
  value,
  label,
  qualifier,
}: {
  value: string;
  label: string;
  /** States when a number is a proxy, estimate, or otherwise not a direct measured result. Stays visible, never a tooltip. */
  qualifier?: string;
}) {
  return (
    <div
      className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors hover:bg-[var(--color-surface-2)]"
      style={{ borderTop: "1px solid var(--color-line)", transitionDuration: "var(--duration-base)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-metric)",
          lineHeight: "var(--leading-metric)",
          color: "var(--color-text)",
        }}
      >
        {value}
      </p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      {qualifier && (
        <p className="mt-1" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
          {qualifier}
        </p>
      )}
    </div>
  );
}

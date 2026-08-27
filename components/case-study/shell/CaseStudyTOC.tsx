/**
 * docs/redesign/06-component-system.md "Chapter index": a short list of
 * meaningful chapters with current-location indication, normal anchor
 * links, sticky only on large screens. Replaces every bespoke "On this
 * page" cs-box nav — no icons (each case study previously hand-built
 * duplicated inline SVG icon paths for this exact list; the label alone
 * carries the wayfinding).
 *
 * Hover is a plain background wash + text brightening to full contrast
 * (decision of record, 2026-08-25 revision — a colored accent bar was
 * tried and rejected as decorative flourish; `--color-project-accent`
 * stays reserved for its one functional use elsewhere on the page, per
 * Metric.tsx's doc comment).
 */
export default function CaseStudyTOC({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav className="lg:sticky lg:top-24">
      <p
        style={{
          fontSize: "var(--text-label)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--color-text-subtle)",
        }}
      >
        On this page
      </p>
      <ul className="mt-4 flex flex-col">
        {items.map((item, i) => (
          <li key={item.href} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
            <a
              href={item.href}
              className="block py-2.5 px-3 -mx-3 text-sm rounded-[var(--radius-button)] transition-colors hover:bg-[var(--color-surface-1)] focus-visible:bg-[var(--color-surface-1)] hover:text-[var(--color-text)] focus-visible:text-[var(--color-text)]"
              style={{ color: "var(--color-text-muted)", transitionDuration: "var(--duration-base)" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

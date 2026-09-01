import type { ReactNode } from "react";

/**
 * docs/redesign/06-component-system.md "Section": semantic section wrapper
 * with optional number, label, heading, intro, and anchor. Renders valid
 * heading order (headingLevel defaults to h2 for a top-level page section;
 * pass 3 for a subsection nested under another Section's h2).
 */
export default function Section({
  number,
  label,
  heading,
  intro,
  anchor,
  headingLevel = 2,
  className = "",
  accentLabel = false,
  children,
}: {
  number?: string;
  label?: string;
  heading?: ReactNode;
  intro?: ReactNode;
  anchor?: string;
  headingLevel?: 2 | 3;
  className?: string;
  /** Colour the eyebrow label with the project accent (falls back to the raw
   *  accent if no legible-on-dark `--accent-bright` is defined). Opt-in so
   *  pages that haven't defined a bright accent keep the neutral label. */
  accentLabel?: boolean;
  children?: ReactNode;
}) {
  const HeadingTag = headingLevel === 3 ? "h3" : "h2";
  const hasHeader = Boolean(number || label || heading || intro);

  return (
    <section id={anchor} className={className}>
      {hasHeader && (
        <header>
          {(number || label) && (
            <div className="flex items-baseline gap-3">
              {number && (
                <span aria-hidden="true" style={{ color: "var(--color-text-subtle)" }}>
                  {number}
                </span>
              )}
              {label && (
                <span
                  style={{
                    fontSize: "var(--text-label)",
                    lineHeight: "var(--leading-label)",
                    letterSpacing: "var(--tracking-label)",
                    textTransform: "uppercase",
                    color: accentLabel
                      ? "var(--accent-bright, var(--color-project-accent))"
                      : "var(--color-text-muted)",
                  }}
                >
                  {label}
                </span>
              )}
            </div>
          )}
          {heading && (
            <HeadingTag
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-h2)",
                color: "var(--color-text)",
              }}
            >
              {heading}
            </HeadingTag>
          )}
          {intro && (
            <p style={{ color: "var(--color-text-muted)", maxWidth: "var(--measure-lead)" }}>
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

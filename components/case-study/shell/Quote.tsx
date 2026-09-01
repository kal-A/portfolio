/**
 * docs/redesign/06-component-system.md "Quote": attributed research
 * evidence or a short reflective statement only — never a decorative
 * customer quote without provenance.
 */
export default function Quote({
  quote,
  attribution,
  role,
}: {
  quote: string;
  attribution: string;
  role?: string;
}) {
  return (
    <blockquote
      className="pl-6 border-l-2"
      style={{ borderColor: "var(--color-project-accent)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h3)",
          lineHeight: "var(--leading-h3)",
          color: "var(--color-text)",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-3" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
        {attribution}
        {role && `, ${role}`}
      </footer>
    </blockquote>
  );
}

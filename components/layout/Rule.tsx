/**
 * docs/redesign/06-component-system.md "Rule": one border implementation
 * for editorial dividers.
 */
export type RuleVariant = "subtle" | "strong" | "accent";

const COLOR: Record<RuleVariant, string> = {
  subtle: "var(--color-line)",
  strong: "var(--color-line-strong)",
  accent: "var(--color-project-accent)",
};

export default function Rule({
  variant = "subtle",
  className = "",
}: {
  variant?: RuleVariant;
  className?: string;
}) {
  return (
    <hr
      className={className}
      style={{
        border: "none",
        borderTop: `var(--border-width-default) solid ${COLOR[variant]}`,
        margin: 0,
      }}
    />
  );
}

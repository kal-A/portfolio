/**
 * docs/redesign/06-component-system.md "Figure and caption": every
 * non-decorative visual gets a one-sentence description and a takeaway
 * explaining why it matters — a caption states the point, not just the
 * artifact's name (07-case-study-system.md, Narrative layout).
 */
export default function FigureCaption({
  number,
  description,
  takeaway,
}: {
  /** Only set when the figure is referenced elsewhere in the text. */
  number?: string;
  description: string;
  takeaway?: string;
}) {
  return (
    <p className="mt-3" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
      {number && <span style={{ color: "var(--color-text-muted)" }}>Fig. {number} — </span>}
      {description}
      {takeaway && <span style={{ color: "var(--color-text-muted)" }}> {takeaway}</span>}
    </p>
  );
}

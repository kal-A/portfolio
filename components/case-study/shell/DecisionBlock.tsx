/**
 * docs/redesign/06-component-system.md "Decision block": a key judgment
 * that would otherwise be buried in prose — not every paragraph needs to
 * become a card (06's Non-goals).
 *
 * Fields renamed from 06's generic "Signal -> Interpretation -> Decision
 * -> Consequence" template to Decision/Rationale/Alternatives/Result
 * (decision of record, first real content: Chronicle's `cs.decisions`).
 * Every case study's actual authored decision records already use this
 * ADR-style shape (a decision, why, what else was considered, what
 * happened) — "Signal" in particular had no equivalent in any real
 * decision on the site. This component had no consumers before Chronicle,
 * so correcting the schema now costs nothing and avoids forcing real
 * content into a mismatched template.
 */
export default function DecisionBlock({
  decision,
  rationale,
  alternatives,
  result,
}: {
  decision: string;
  rationale: string;
  alternatives?: string;
  result: string;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Decision", value: decision },
    { label: "Rationale", value: rationale },
  ];
  if (alternatives) rows.push({ label: "Alternative considered", value: alternatives });
  rows.push({ label: "Result", value: result });

  return (
    <div className="pl-6 border-l-2" style={{ borderColor: "var(--accent-bright, var(--color-project-accent))" }}>
      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.label}>
            <p
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--color-text-subtle)",
              }}
            >
              {row.label}
            </p>
            <p className="mt-1" style={{ color: row.label === "Decision" ? "var(--color-text)" : "var(--color-text-muted)" }}>
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

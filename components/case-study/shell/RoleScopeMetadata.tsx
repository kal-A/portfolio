/**
 * docs/redesign/06-component-system.md "Role and scope metadata": role,
 * team, timeline, responsibilities, constraints, tools (only when
 * relevant), and status — kept honest and concise, not padded to fill
 * every field for every project.
 */
export default function RoleScopeMetadata({
  role,
  team,
  timeline,
  responsibilities,
  tools,
  status,
}: {
  role: string;
  team?: string;
  timeline: string;
  responsibilities?: string;
  tools?: string[];
  status?: string;
}) {
  const fields: { label: string; value: string }[] = [
    { label: "Role", value: role },
    ...(team ? [{ label: "Team", value: team }] : []),
    { label: "Timeline", value: timeline },
    ...(responsibilities ? [{ label: "Responsibilities", value: responsibilities }] : []),
    ...(status ? [{ label: "Status", value: status }] : []),
  ];

  return (
    <dl className="flex flex-col gap-3">
      {fields.map((f) => (
        <div key={f.label} className="flex gap-4">
          <dt className="w-32 shrink-0" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
            {f.label}
          </dt>
          <dd style={{ color: "var(--color-text-muted)" }}>{f.value}</dd>
        </div>
      ))}
      {tools && tools.length > 0 && (
        <div className="flex gap-4">
          <dt className="w-32 shrink-0" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
            Tools
          </dt>
          <dd style={{ color: "var(--color-text-muted)" }}>{tools.join(", ")}</dd>
        </div>
      )}
    </dl>
  );
}

export default function Metric({
  value,
  label,
  accent = "#181614",
}: {
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="cs-box px-5 py-4">
      <div className="font-serif text-2xl" style={{ color: accent }}>
        {value}
      </div>
      <div className="text-sm text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

import Reveal from "@/components/Reveal";

export default function StatGrid({
  stats,
  valueColor,
}: {
  stats: { value: string; label: string }[];
  valueColor: string;
}) {
  const gridCols = stats.length === 4 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-5`}>
      {stats.map((m, i) => (
        <Reveal key={m.label} delay={i * 80}>
          <div className="cs-box light px-5 py-5">
            <p className="font-serif text-3xl" style={{ color: valueColor }}>
              {m.value}
            </p>
            <p className="text-sm mt-1.5 leading-snug font-semibold" style={{ color: "var(--ink)" }}>
              {m.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

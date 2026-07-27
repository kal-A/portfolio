export default function Tag({
  label,
  variant = "responsibility",
  accent,
  accentSoft,
}: {
  label: string;
  variant?: "responsibility" | "tool";
  accent?: string;
  accentSoft?: string;
}) {
  if (variant === "tool") {
    return (
      <span
        className="text-xs font-semibold rounded-full px-2.5 py-1 text-neutral-900"
        style={{ background: accentSoft ?? "#f0ede4" }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      className="text-xs font-bold rounded-full px-2.5 py-1 text-white"
      style={{ background: accent ?? "#333" }}
    >
      {label}
    </span>
  );
}

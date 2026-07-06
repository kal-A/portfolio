export default function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-neutral-200 rounded-lg px-5 py-4">
      <div className="font-serif text-2xl text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

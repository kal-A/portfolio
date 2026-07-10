const items = [
  { label: "ForceN", strong: true },
  { label: "Product Engineering", strong: false },
  { label: "Greenhouse Juices", strong: true },
  { label: "Product Design", strong: false },
  { label: "Hera Fertility", strong: true },
  { label: "UX / UI", strong: false },
  { label: "Informatica", strong: true },
  { label: "Product Ops", strong: false },
  { label: "PathPeer", strong: true },
  { label: "Systems Thinking", strong: false },
];

function Track() {
  return (
    <div className="flex items-center gap-7 shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-7">
          <span
            className={
              item.strong
                ? "font-serif text-neutral-800 text-sm"
                : "text-neutral-400 text-sm"
            }
          >
            {item.label}
          </span>
          <span className="w-1 h-1 rounded-full bg-rose-500 shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="border-y border-neutral-200 bg-neutral-50/60 py-3.5 overflow-hidden">
      <div className="flex w-max gap-7 animate-[marquee_26s_linear_infinite]">
        <Track />
        <Track />
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

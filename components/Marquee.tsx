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
    <div className="flex items-center gap-9 shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-9">
          <span
            className={
              item.strong
                ? "font-serif text-neutral-900 text-xl font-bold"
                : "text-neutral-600 text-lg"
            }
          >
            {item.label}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="border-y-2 border-neutral-900 py-5 overflow-hidden"
      style={{ background: "linear-gradient(90deg, #f7e6c4 0%, #f7d9e4 50%, #dcebf6 100%)" }}
    >
      <div className="flex w-max gap-9 animate-[marquee_26s_linear_infinite]">
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

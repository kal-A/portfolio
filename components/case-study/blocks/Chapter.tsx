import Reveal from "@/components/Reveal";

export default function Chapter({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col md:flex-row gap-11">
      <div className="md:w-[280px] shrink-0">
        <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
          {num}
        </p>
        <h2 className="font-serif text-3xl md:text-[36px] leading-tight text-balance" style={{ color: "var(--ink)" }}>
          {title}
        </h2>
      </div>
      <div className="flex-1 min-w-0 border-l-[3px] pl-9" style={{ borderColor: "var(--ink)" }}>
        {children}
      </div>
    </Reveal>
  );
}

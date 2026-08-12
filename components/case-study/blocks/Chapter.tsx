import Reveal from "@/components/Reveal";

export default function Chapter({
  num,
  title,
  dark,
  children,
}: {
  num: string;
  title: string;
  /** Use light text/border for a dark section background. */
  dark?: boolean;
  children: React.ReactNode;
}) {
  const textColor = dark ? "#fdfaf5" : "var(--ink)";
  return (
    <Reveal className="flex flex-col md:flex-row gap-11">
      <div className="md:w-[280px] shrink-0">
        <p
          className="font-serif text-6xl md:text-[80px] leading-[0.78]"
          style={{ color: textColor, opacity: dark ? 0.2 : 0.14 }}
        >
          {num}
        </p>
        <h2 className="font-serif text-3xl md:text-[36px] leading-tight text-balance" style={{ color: textColor }}>
          {title}
        </h2>
      </div>
      <div
        className="flex-1 min-w-0 border-l-[3px] pl-9 flex flex-col justify-center"
        style={{ borderColor: dark ? "#f0c98a" : "var(--ink)" }}
      >
        {children}
      </div>
    </Reveal>
  );
}

import { Children } from "react";
import Icon from "@/components/case-study/blocks/Icon";
import Reveal from "@/components/Reveal";

export function SnapshotBox({
  label,
  icon,
  accentGradient,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  accentGradient: string;
  children: React.ReactNode;
}) {
  return (
    <div className="cs-box white h-full px-6 py-6">
      <div
        className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
        style={{ background: accentGradient, borderColor: "var(--ink)" }}
      >
        <span className="w-[21px] h-[21px] text-[#fff9ee]">
          <Icon>{icon}</Icon>
        </span>
      </div>
      <p className="text-[15px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--ink)" }}>
        {label}
      </p>
      <p className="text-[15.5px] leading-relaxed" style={{ color: "#33302a" }}>
        {children}
      </p>
    </div>
  );
}

export default function SnapshotGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
      {Children.map(children, (child, i) => (
        <Reveal delay={i * 80} className="h-full">
          {child}
        </Reveal>
      ))}
    </div>
  );
}

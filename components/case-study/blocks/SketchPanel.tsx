import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function SketchPanel({
  sketchSrc,
  sketchAlt,
  sketchCaption,
  accent,
  reconstructedLabel = "Reconstructed concept",
  reconstructedCaption,
  children,
}: {
  sketchSrc: string;
  sketchAlt: string;
  sketchCaption: string;
  accent: string;
  reconstructedLabel?: string;
  reconstructedCaption?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <Reveal>
        <div className="cs-box white overflow-hidden">
          <div className="relative w-full bg-white" style={{ aspectRatio: "4 / 5" }}>
            <Image src={sketchSrc} alt={sketchAlt} fill className="object-contain" />
          </div>
        </div>
        <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: accent }}>
          Original sketch
        </p>
        <p className="text-sm leading-relaxed mt-1" style={{ color: "#4c473e" }}>
          {sketchCaption}
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div className="cs-box white overflow-hidden">{children}</div>
        <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: accent }}>
          {reconstructedLabel}
        </p>
        {reconstructedCaption && (
          <p className="text-sm leading-relaxed mt-1" style={{ color: "#4c473e" }}>
            {reconstructedCaption}
          </p>
        )}
      </Reveal>
    </div>
  );
}

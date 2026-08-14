import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function SketchPanel({
  sketchSrc,
  sketchAlt,
  sketchCaption,
  accent,
  reconstructedLabel = "Reconstructed concept",
  reconstructedCaption,
  sketchAspect = "4 / 5",
  sketchMaxHeight = 340,
  children,
}: {
  sketchSrc: string;
  sketchAlt: string;
  sketchCaption: string;
  accent: string;
  reconstructedLabel?: string;
  reconstructedCaption?: string;
  /** CSS aspect-ratio for the sketch image's frame; defaults to 4/5. Override for
   *  sketches with a very different natural aspect (e.g. a tall full-page capture) so
   *  object-contain doesn't shrink the image down to an illegible sliver. */
  sketchAspect?: string;
  /** Max height (px) for the sketch frame; defaults to 340. Raise for tall sketches. */
  sketchMaxHeight?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
      <Reveal className="min-w-0">
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
      <Reveal delay={120} className="min-w-0">
        <div className="cs-box white overflow-hidden opacity-90">
          <div className="relative w-full bg-white mx-auto" style={{ aspectRatio: sketchAspect, maxHeight: sketchMaxHeight }}>
            <Image src={sketchSrc} alt={sketchAlt} fill className="object-contain" />
          </div>
        </div>
        <p className="text-[10.5px] font-extrabold uppercase tracking-wide mt-3" style={{ color: "var(--ink-soft)" }}>
          Original working sketch
        </p>
        <p className="text-[13px] leading-relaxed mt-1" style={{ color: "var(--ink-soft)" }}>
          {sketchCaption}
        </p>
      </Reveal>
    </div>
  );
}

import Reveal from "@/components/Reveal";

export default function VideoBlock({
  title,
  context,
  src,
  poster,
  caption,
  accent = "#f0b429",
  delay = 0,
}: {
  title: string;
  context: string;
  src: string;
  poster: string;
  caption: string;
  accent?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="cs-box white overflow-hidden">
        <div className="px-6 pt-6 pb-4">
          <h3 className="font-serif font-bold text-lg mb-1.5" style={{ color: "var(--ink)" }}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
            {context}
          </p>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <video
            src={src}
            poster={poster}
            controls
            preload="none"
            playsInline
            className="w-full h-full object-contain"
          >
            <p className="text-white text-sm p-4">
              Your browser cannot play this video. See the poster frame above for a static preview.
            </p>
          </video>
        </div>
        <div className="px-6 py-4" style={{ borderTop: "1.5px dashed rgba(32,28,23,0.14)" }}>
          <span
            className="inline-block text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 mb-2.5"
            style={{ color: "var(--ink)", borderColor: "var(--ink)", background: accent }}
          >
            What to notice
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
            {caption}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

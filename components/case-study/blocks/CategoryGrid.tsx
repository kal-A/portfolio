import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { ChannelGallery } from "@/lib/content/greenhouse-channels";

export default function CategoryGrid({
  channels,
  linkBase,
}: {
  channels: ChannelGallery[];
  linkBase: string;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {channels.map((ch, i) => {
        const [primary, secondary] = ch.assets;
        return (
          <Reveal key={ch.slug} delay={i * 80}>
            <Link
              href={`${linkBase}/${ch.slug}`}
              className="cs-box white group block h-full"
              style={{ "--cs-wash-from": ch.tintFrom, "--cs-wash-to": ch.tintTo } as React.CSSProperties}
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={primary.src}
                  alt={primary.alt}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                />

                {secondary && (
                  <div
                    className="absolute bottom-4 left-4 w-[36%] aspect-[4/3] rounded-lg overflow-hidden border-2 z-[2] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-1 group-focus-visible:scale-105"
                    style={{ borderColor: "var(--ink)", boxShadow: "3px 3px 0 var(--ink)" }}
                  >
                    <Image src={secondary.src} alt={secondary.alt} fill className="object-cover" />
                  </div>
                )}

                {/* Category-colored tint, full bleed, revealed on hover/focus */}
                <div
                  className="absolute inset-0 z-[1] opacity-0 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-30 group-focus-visible:opacity-30"
                  style={{ background: ch.accent }}
                />

                <span
                  className="absolute top-3 left-3 z-[3] text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2"
                  style={{ color: "var(--ink)", borderColor: "var(--ink)", background: ch.accent }}
                >
                  {ch.label}
                </span>

                {/* Synopsis + action: always visible on mobile, hover/focus reveal at sm+ */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[3] px-4 pt-12 pb-4 opacity-100 sm:opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"
                  style={{ background: "linear-gradient(180deg, transparent 0%, rgba(20,18,14,0.78) 60%)" }}
                >
                  <p className="text-[13px] leading-snug text-white/95 line-clamp-2 mb-2.5">{ch.intro}</p>
                  <span
                    className="inline-block text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2"
                    style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "#fffdf8" }}
                  >
                    View all →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Reveal from "@/components/Reveal";
import Tag from "@/components/Tag";
import ProjectIcon from "@/components/ProjectIcon";

export default function CaseStudyCard({ cs, delay = 0 }: { cs: CaseStudy; delay?: number }) {
  const theme = caseStudyTheme[cs.slug];
  const accent = theme?.accent ?? "#181614";

  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={`/work/${cs.slug}`}
        className="group relative block h-full rounded-[20px] overflow-hidden transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-2.5 hover:scale-[1.02] hover:-rotate-[0.4deg] hover:shadow-[var(--hover-shadow)]"
        style={{
          border: `3px solid ${accent}`,
          background: "#fffdf8",
          boxShadow: `0 10px 24px -8px ${accent}40`,
          ...({ "--hover-shadow": `0 28px 50px -12px ${accent}66, 0 0 0 4px ${theme?.accentSoft ?? "#e8e4d8"}` } as React.CSSProperties),
        }}
      >
        <span
          className="absolute inset-0 opacity-0 scale-[0.94] transition-all duration-[550ms] ease-[cubic-bezier(.22,.61,.36,1)] group-hover:opacity-100 group-hover:scale-100"
          style={{
            background: `linear-gradient(150deg, ${theme?.fillFrom ?? "#fff"} 0%, ${theme?.fillTo ?? "#fff"} 100%)`,
          }}
        />

        <div className="relative z-[1] flex h-full flex-col">
          <div className="relative w-full aspect-[16/11] overflow-hidden">
            {theme?.image ? (
              <Image
                src={theme.image}
                alt=""
                width={640}
                height={440}
                className="w-full h-full object-cover object-left-top"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${theme?.fillFrom ?? "#e4ded0"}, ${theme?.fillTo ?? "#181614"})` }}
              >
                <span
                  className="font-serif font-bold leading-none select-none"
                  style={{ fontSize: "7.5rem", color: "rgba(255,255,255,0.35)" }}
                >
                  {theme?.mark ?? cs.company.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.35) 100%)" }}
            />
            <div
              className="absolute left-4 top-4 z-[2] w-14 h-14 rounded-[15px] flex items-center justify-center"
              style={{ background: theme?.iconBg ?? accent, boxShadow: "0 6px 16px rgba(0,0,0,0.35)", border: "2.5px solid rgba(255,255,255,0.9)" }}
            >
              <ProjectIcon slug={cs.slug} className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="p-6 pt-6 flex flex-col flex-1">
            <p
              className="text-xs uppercase tracking-wide font-extrabold"
              style={{ color: accent }}
            >
              {cs.company} · {cs.timeframe}
            </p>
            <h3 className="font-serif font-bold text-[2rem] leading-[1.1] tracking-tight mt-2.5 text-neutral-900">
              {cs.title}
            </h3>
            <p className="text-sm mt-3 text-neutral-600">{cs.summary}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {cs.tags.map((tag) => (
                <Tag key={tag} label={tag} variant="responsibility" accent={accent} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {cs.toolTags.map((tag) => (
                <Tag key={tag} label={tag} variant="tool" accentSoft={theme?.accentSoft} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

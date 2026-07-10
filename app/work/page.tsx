import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";

export const metadata = { title: "Case Studies · Kamal Ahsan" };

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Work</p>
      <h1 className="font-serif text-4xl mt-3 text-neutral-900">Case Studies</h1>
      <p className="text-neutral-600 mt-4 max-w-2xl">
        Five projects spanning product design, systems/process work, technical builds, and
        formal usability evaluation — most recent first.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 mt-12">
        {caseStudies.map((cs) => {
          const theme = caseStudyTheme[cs.slug];
          return (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group relative block rounded-xl overflow-hidden p-6"
              style={{ border: "2.5px solid #181614" }}
            >
              <span
                className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100"
                style={{ background: theme?.fill ?? "#f4f1ea" }}
              />
              <span
                className="absolute inset-0 -z-10"
                style={{ background: theme?.bg ?? "#fdfaf5" }}
              />
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-lg mb-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ background: theme?.icon ?? "#181614" }}
                />
                <p className="text-sm text-neutral-500">
                  {cs.company} · {cs.timeframe}
                </p>
                <h2 className="font-serif text-xl mt-1 text-neutral-900">{cs.title}</h2>
                <p className="text-neutral-600 mt-3 text-sm">{cs.summary}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/70 text-neutral-700 rounded-full px-2.5 py-1 border border-neutral-900/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";

export const metadata = { title: "Case Studies · Kamal Ahsan" };

export default function WorkIndex() {
  return (
    <div className="pb-20">
      <div
        className="pt-10 pb-14"
        style={{
          background:
            "radial-gradient(circle at 10% 0%, rgba(58,107,147,0.1) 0%, transparent 45%), radial-gradient(circle at 90% 20%, rgba(194,144,10,0.1) 0%, transparent 50%), #fdfaf5",
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Work</p>
          <h1 className="font-serif text-5xl mt-3 text-neutral-900">Case Studies</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-2xl">
            Five projects spanning product design, systems/process work, technical builds, and
            formal usability evaluation, most recent first.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-2 gap-6 mt-12">
        {caseStudies.map((cs) => {
          const theme = caseStudyTheme[cs.slug];
          return (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group relative block rounded-xl overflow-hidden p-7"
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
                  className="w-11 h-11 rounded-lg mb-4 transition-transform duration-300 group-hover:-translate-y-0.5 flex items-center justify-center font-serif text-sm font-bold"
                  style={{ background: theme?.icon ?? "#181614", color: "#fdfaf5" }}
                >
                  {theme?.mark ?? cs.company.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-sm text-neutral-500">
                  {cs.company} · {cs.timeframe}
                </p>
                <h2 className="font-serif text-2xl mt-1 text-neutral-900">{cs.title}</h2>
                <p className="text-neutral-600 mt-3">{cs.summary}</p>
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

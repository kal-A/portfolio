import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata = { title: "Case Studies · Kamal Ahsan" };

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Work</p>
      <h1 className="font-serif text-4xl mt-3 text-neutral-900">Case Studies</h1>
      <p className="text-neutral-600 mt-4 max-w-2xl">
        Four projects spanning 0→1 product design, technical builds, growth/ops design,
        and formal usability evaluation.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-12">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className="group border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-colors"
          >
            <p className="text-sm text-neutral-500">
              {cs.company} · {cs.timeframe}
            </p>
            <h2 className="font-serif text-xl mt-1 text-neutral-900 group-hover:text-rose-500 transition-colors">
              {cs.title}
            </h2>
            <p className="text-neutral-600 mt-3 text-sm">{cs.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

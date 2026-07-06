import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";

const skills = [
  "Product Roadmaps",
  "Agile / Scrum",
  "User Research",
  "Sprint Planning",
  "Cross-functional Leadership",
  "Figma",
  "SQL",
  "Python",
  "React / Node.js",
  "Jira / Confluence",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="py-24 sm:py-32">
        <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">
          Product · Design · TPM
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight text-neutral-900">
          Kamal Ahsan builds products end to end — from user research to shipped code.
        </h1>
        <p className="text-neutral-600 mt-6 max-w-xl text-lg">
          Management Engineering student at the University of Waterloo. I&apos;ve led
          0→1 product design, run sprints for cross-functional teams, and shipped the
          technical implementation myself when it mattered.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/work"
            className="bg-neutral-900 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            View Case Studies
          </Link>
          <Link
            href="/resume"
            className="border border-neutral-300 rounded-lg px-5 py-3 text-sm font-medium hover:border-neutral-500 transition-colors"
          >
            Resume
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <h2 className="font-serif text-2xl text-neutral-900 mb-8">Case Studies</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-colors"
            >
              <p className="text-sm text-neutral-500">{cs.company}</p>
              <h3 className="font-serif text-xl mt-1 text-neutral-900 group-hover:text-rose-500 transition-colors">
                {cs.title}
              </h3>
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
      </section>

      <section className="pb-24">
        <h2 className="font-serif text-2xl text-neutral-900 mb-6">Skills & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-sm border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

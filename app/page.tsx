import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { experience } from "@/lib/content/experience";

const featuredOrder = ["roomease", "hera-fertility", "greenhouse", "pill-pal", "forcen"];
const featured = featuredOrder
  .map((slug) => caseStudies.find((cs) => cs.slug === slug))
  .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

const designWork = caseStudies.filter((cs) => cs.category === "visual");

const howIWork = [
  "Map the workflow",
  "Find the friction",
  "Structure the system",
  "Design the experience",
  "Prototype, test, or build",
  "Document and hand off",
];

const skillGroups = [
  {
    label: "Researching the workflow",
    items: ["User Interviews", "Stakeholder Mapping", "Requirements Gathering", "Workflow Analysis", "Usability Testing"],
  },
  {
    label: "Designing the experience",
    items: ["UX Flows", "Wireframing", "Figma", "Prototyping", "UI Design", "Heuristic Evaluation"],
  },
  {
    label: "Structuring the product",
    items: ["Product Requirements", "Prioritization", "Roadmapping", "Sprint Planning", "Documentation"],
  },
  {
    label: "Building and analyzing",
    items: ["React", "Node.js", "Python", "SQL", "Analytics Dashboards"],
  },
  {
    label: "Communicating the work",
    items: ["Case Studies", "Reports", "Presentations", "Design Rationale"],
  },
];

// Projects without artifacts strong enough for a full case study yet.
const archiveOnly = experience.filter((job) => !job.caseStudySlug);

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="py-24 sm:py-32">
        <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">
          Product Design · UX · Systems
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl mt-4 max-w-2xl leading-tight text-neutral-900">
          I design products for messy real-world workflows.
        </h1>
        <p className="text-neutral-600 mt-6 max-w-xl text-lg">
          I&apos;m a Management Engineering graduate from the University of Waterloo. I work
          across product, UX/UI, operations, and technical systems, mapping the messy parts
          first, then turning them into clearer flows, prototypes, tools, and handoffs.
        </p>
        <div className="flex gap-4 mt-8">
          <Link
            href="/work"
            className="bg-neutral-900 text-white rounded-lg px-5 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            View case studies
          </Link>
          <Link
            href="/resume"
            className="border border-neutral-300 rounded-lg px-5 py-3 text-sm font-medium hover:border-neutral-500 transition-colors"
          >
            See resume
          </Link>
        </div>
      </section>

      {/* Selected Case Studies */}
      <section className="pb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-3xl text-neutral-900">Selected Case Studies</h2>
          <Link
            href="/work"
            className="text-sm text-neutral-500 hover:text-rose-500 transition-colors"
          >
            All work →
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="group flex gap-6 items-start border border-neutral-200 rounded-xl p-6 hover:border-rose-200 hover:bg-rose-50/20 transition-all"
            >
              <span className="font-serif text-4xl text-neutral-200 group-hover:text-rose-200 transition-colors leading-none mt-0.5 select-none shrink-0 w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium text-rose-500 uppercase tracking-wider">
                    {cs.company}
                  </p>
                  {cs.category === "systems" && (
                    <span className="text-[10px] uppercase tracking-wide text-neutral-400 border border-neutral-200 rounded-full px-2 py-0.5">
                      Public-safe process case study
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl mt-1 text-neutral-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {cs.title}
                </h3>
                <p className="text-neutral-600 mt-2 text-sm leading-relaxed">{cs.oneLiner}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-neutral-100 text-neutral-600 rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {cs.metrics[0] && (
                <div className="shrink-0 text-right hidden sm:block">
                  <p className="font-serif text-2xl text-neutral-800 leading-none">
                    {cs.metrics[0].value}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[100px] leading-tight">
                    {cs.metrics[0].label}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Design Work / Visual Evidence */}
      <section className="pb-24">
        <h2 className="font-serif text-3xl text-neutral-900 mb-3">Design Work, Grounded in Systems</h2>
        <p className="text-neutral-600 max-w-2xl mb-10">
          I like design work most when it&apos;s tied to a real workflow. The interface matters,
          but so do the handoffs, edge cases, and constraints people need to complete the task.
          These projects show the more visual side of the work: interfaces, flows, campaign
          assets, and prototypes.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {designWork.map((cs) => {
            const thumbnail =
              cs.slug === "greenhouse"
                ? { src: "/case-studies/greenhouse/amazon-12pack.png", alt: "Greenhouse Juices Amazon 12-pack lineup" }
                : cs.slug === "roomease"
                  ? null
                  : cs.images?.[0];
            return (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-400 transition-colors"
              >
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail.src}
                    alt={thumbnail.alt}
                    className="w-full h-48 object-cover object-center bg-neutral-50"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-rose-50 via-neutral-50 to-neutral-100 flex items-center justify-center">
                    <p className="text-xs uppercase tracking-widest text-neutral-400">
                      Booking + Admin Flow
                    </p>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">{cs.company}</p>
                  <h3 className="font-serif text-lg mt-1 text-neutral-900 group-hover:text-rose-500 transition-colors">
                    {cs.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cs.artifacts.slice(0, 3).map((a) => (
                      <span
                        key={a}
                        className="text-[11px] border border-neutral-200 rounded-full px-2 py-0.5 text-neutral-500"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How I Work */}
      <section className="pb-24">
        <h2 className="font-serif text-3xl text-neutral-900 mb-3">How I Work</h2>
        <p className="text-neutral-600 max-w-2xl mb-10">
          I usually start by mapping the workflow before touching the interface. Who is
          involved? Where does the handoff break? What information is missing? What is being
          tracked manually? What does the user actually need to finish the task? Then I turn
          that into the product layer: flows, requirements, prototypes, dashboards, or
          implementation details.
        </p>
        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {howIWork.map((step, i) => (
            <div key={step} className="border border-neutral-200 rounded-lg px-4 py-4">
              <p className="font-serif text-2xl text-rose-400">{i + 1}</p>
              <p className="text-sm text-neutral-700 mt-2 leading-snug">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project Archive */}
      <section className="pb-24">
        <h2 className="font-serif text-3xl text-neutral-900 mb-3">Project Archive</h2>
        <p className="text-neutral-600 max-w-2xl mb-8">
          Roles and projects with less physical/visual artifact material to draw on right now,
          documented honestly rather than dressed up as full case studies.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {archiveOnly.map((job) => (
            <div
              key={`${job.company}-${job.timeframe}`}
              className="border border-neutral-200 rounded-lg px-5 py-4"
            >
              <p className="text-xs text-neutral-500 uppercase tracking-wide">{job.timeframe}</p>
              <h3 className="font-medium text-neutral-900 mt-1">
                {job.role} · {job.company}
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{job.synopsis}</p>
            </div>
          ))}
        </div>
        <Link
          href="/experience"
          className="inline-block mt-6 text-sm text-rose-500 hover:text-rose-600 font-medium"
        >
          See full work timeline →
        </Link>
      </section>

      {/* Skills / Ways I Work */}
      <section className="pb-24">
        <h2 className="font-serif text-3xl text-neutral-900 mb-8">Ways I Work</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest mb-3">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-700 bg-neutral-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

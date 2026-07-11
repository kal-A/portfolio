import Link from "next/link";
import { experience } from "@/lib/content/experience";
import { caseStudies } from "@/lib/content/case-studies";
import Synopsis from "@/components/Synopsis";

export const metadata = { title: "Experience · Kamal Ahsan" };

const projectSlugs = new Set(experience.map((e) => e.caseStudySlug).filter(Boolean));
const standaloneProjects = caseStudies.filter((cs) => !projectSlugs.has(cs.slug));

const workSynopsis = experience.map((job) => {
  const cs = job.caseStudySlug ? caseStudies.find((c) => c.slug === job.caseStudySlug) : null;
  return {
    key: `${job.company}-${job.timeframe}`,
    heading: `${job.role} · ${job.company}`,
    timeframe: job.timeframe,
    summary: cs?.summary ?? job.synopsis,
    slug: job.caseStudySlug,
  };
});

const projectSynopsis = standaloneProjects.map((cs) => ({
  key: cs.slug,
  heading: `${cs.role} · ${cs.company}`,
  timeframe: cs.timeframe,
  summary: cs.summary,
  slug: cs.slug,
}));

export default function ExperiencePage() {
  return (
    <div className="pb-20">
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Experience</p>
        <h1 className="font-serif text-5xl mt-3 text-neutral-900">Work Timeline</h1>
        <p className="text-lg text-neutral-600 mt-4">
          Five internships across product design, product operations, and hardware/product
          engineering, 2022 to present.
        </p>
      </div>

      <div
        className="mt-14 py-14"
        style={{ background: "linear-gradient(160deg, #f7d9e4 0%, #f7e6c4 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-4xl text-neutral-900 mb-1">Quick Synopsis</h2>
          <p className="text-sm text-neutral-600 mb-6">
            A resume-style scan of every role and project — full detail and case studies below.
          </p>
          <Synopsis work={workSynopsis} projects={projectSynopsis} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-16">
        <h2 className="font-serif text-4xl text-neutral-900 mb-1">Every Internship, In Full</h2>
        <p className="text-sm text-neutral-500 mb-8">
          This section always shows all five internships in full bullet detail — it doesn&apos;t
          filter by the Work/Projects toggle above, since that toggle is just a quick scan.
          Standalone projects (RoomEase, Pill Pal) aren&apos;t internships, so they live in{" "}
          <Link href="/work" className="text-rose-500 hover:text-rose-600">
            Case Studies
          </Link>{" "}
          instead.
        </p>

        <div className="space-y-10">
          {experience.map((job) => (
            <div key={`${job.company}-${job.timeframe}`} className="border-t border-neutral-200 pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-serif text-xl text-neutral-900">
                  {job.role} · {job.company}
                </h2>
                <span className="text-sm text-neutral-500">{job.timeframe}</span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">{job.location}</p>
              <ul className="mt-4 space-y-2">
                {job.bullets.map((b, i) => (
                  <li key={i} className="text-neutral-700 text-sm leading-relaxed flex gap-2">
                    <span className="text-neutral-300">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {job.caseStudySlug && (
                <Link
                  href={`/work/${job.caseStudySlug}`}
                  className="inline-block mt-4 text-sm text-rose-500 hover:text-rose-600 font-medium"
                >
                  Read the full case study →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

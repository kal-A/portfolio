import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import { experience } from "@/lib/content/experience";
import { caseStudyTheme } from "@/lib/content/theme";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Signature from "@/components/Signature";
import RotatingWord from "@/components/RotatingWord";

const featuredOrder = ["roomease", "forcen", "greenhouse", "hera-fertility"];
const featured = featuredOrder
  .map((slug) => caseStudies.find((cs) => cs.slug === slug))
  .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

const manifestoWords = [
  "systems people actually use.",
  "products people trust.",
  "flows that make sense.",
  "tools that cut the busywork.",
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(200,69,44,0.14) 0%, transparent 45%), radial-gradient(circle at 88% 15%, rgba(44,110,94,0.12) 0%, transparent 50%), linear-gradient(160deg, #fdf3ec 0%, #f6ede0 55%, #eef0e6 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 sm:pt-16 sm:pb-24">
          <Reveal className="flex flex-wrap gap-2.5">
            <Tag color="#c8452c" label="Product Management" />
            <Tag color="#2c6e5e" label="Product Design" />
            <Tag color="#3a6b93" label="Systems" />
            <Tag color="#c2900a" label="UX / UI" />
            <span className="text-sm font-bold rounded-full px-3.5 py-2 flex items-center gap-2 bg-neutral-900 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Open to full-time roles
            </span>
          </Reveal>

          <div className="flex flex-col md:flex-row gap-12 md:gap-10 items-center mt-10">
            <Reveal delay={120} className="flex-1">
              <h1 className="font-serif text-5xl sm:text-6xl leading-[1.08] text-neutral-900 max-w-xl">
                I design products for{" "}
                <em className="italic text-rose-500">messy real-world workflows.</em>
              </h1>
              <p className="text-neutral-600 mt-6 max-w-md text-xl leading-relaxed">
                Over the past four years I&apos;ve shipped a fintech onboarding flow, run
                sprints for an 8-person team, owned a hardware operations system, and built a
                capstone platform real student clubs used to book rooms.
              </p>
              <Signature />
              <div className="flex gap-4 mt-7">
                <Link
                  href="/work"
                  className="bg-neutral-900 text-white rounded-lg px-6 py-3.5 text-base font-medium hover:bg-neutral-700 transition-colors"
                >
                  View case studies
                </Link>
                <Link
                  href="/resume"
                  className="border-2 border-neutral-900 text-neutral-900 rounded-lg px-6 py-3.5 text-base font-medium hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  See resume
                </Link>
              </div>
            </Reveal>

            <Reveal delay={250} className="shrink-0">
              <PhotoStack />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Reveal>
        <Marquee />
      </Reveal>

      {/* Selected case studies */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="font-serif text-4xl text-neutral-900 mb-10">Selected case studies</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((cs, i) => {
            const theme = caseStudyTheme[cs.slug];
            return (
              <Reveal key={cs.slug} delay={i * 90}>
                <Link
                  href={`/work/${cs.slug}`}
                  className="group relative block rounded-xl overflow-hidden p-7"
                  style={{ border: "2.5px solid #181614" }}
                >
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100"
                    style={{ background: theme?.fill ?? "#f4f1ea" }}
                  />
                  <span className="absolute inset-0 -z-10" style={{ background: theme?.bg ?? "#fdfaf5" }} />
                  <div className="relative">
                    <div
                      className="w-11 h-11 rounded-lg mb-4 transition-transform duration-300 group-hover:-translate-y-0.5 flex items-center justify-center font-serif text-sm font-bold"
                      style={{ background: theme?.icon ?? "#181614", color: "#fdfaf5" }}
                    >
                      {theme?.mark ?? cs.company.slice(0, 2).toUpperCase()}
                    </div>
                    <h3 className="font-serif text-2xl text-neutral-900 leading-snug">{cs.title}</h3>
                    <p className="text-sm text-neutral-500 mt-2">{cs.company}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Work experience */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #eef2f7 0%, #f3eee0 55%, #eef5e6 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-20 flex flex-col sm:flex-row gap-10">
          <Reveal className="sm:w-64 shrink-0">
            <h2 className="font-serif text-5xl sm:text-6xl text-neutral-900 leading-[1.05]">
              Work
              <br />
              experience
            </h2>
          </Reveal>
          <div className="flex-1 border-l-2 border-dashed border-neutral-400 pl-9">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.timeframe}`} delay={i * 80} className="relative pb-14 last:pb-0">
                <span className="absolute -left-[47px] top-1 w-5 h-5 rounded-full bg-neutral-900 border-4 border-[#eef2f7] flex items-center justify-center" />
                <p className="font-serif text-3xl text-neutral-900">{job.company}</p>
                <p className="text-base text-neutral-600 mt-1.5 font-medium">
                  {job.role} · {job.location} · {job.timeframe}
                </p>
                <p className="text-lg text-neutral-700 mt-3 max-w-lg leading-relaxed">
                  {job.synopsis}
                </p>
                {job.caseStudySlug ? (
                  <Link
                    href={`/work/${job.caseStudySlug}`}
                    className="text-sm font-bold text-rose-600 hover:text-rose-700 mt-3 inline-block"
                  >
                    Read more →
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-neutral-500 mt-3 inline-block">
                    Full bullet detail on the{" "}
                    <Link href="/experience" className="text-rose-600 hover:text-rose-700 font-bold">
                      Experience
                    </Link>{" "}
                    page
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft manifesto / stat strip */}
      <Reveal>
        <section className="bg-neutral-900 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              What I build
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-neutral-50 mt-3 mb-10">
              I build <RotatingWord words={manifestoWords} />
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-5">
              <Stat label="Internships" value="5" />
              <Stat label="Case Studies" value={String(caseStudies.length)} />
              <Stat label="Building Since" value="2022" />
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA block */}
      <Reveal>
        <section
          className="py-20 text-center"
          style={{ background: "linear-gradient(135deg,#f0c9b8,#f6ded0)" }}
        >
          <h2 className="font-serif text-4xl text-neutral-900">Let&apos;s connect.</h2>
          <p className="text-base text-neutral-700 mt-3">
            Open to full-time product, TPM, and product design roles, reach out.
          </p>
          <a
            href="https://linkedin.com/in/kamal-ahsan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white rounded-lg px-7 py-4 text-base font-medium mt-7 hover:bg-neutral-700 transition-colors"
          >
            Connect on LinkedIn ↗
          </a>
        </section>
      </Reveal>
    </div>
  );
}

function Tag({ color, label }: { color: string; label: string }) {
  return (
    <span className="text-sm font-bold border-2 border-neutral-900 rounded-full px-3.5 py-2 flex items-center gap-2 bg-white/70 text-neutral-900">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="pr-10 border-r border-neutral-700 last:border-r-0 last:pr-0">
      <div className="w-6 h-6 rounded-full border-2 border-rose-500 relative mb-2.5">
        <span className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-rose-500 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-xs uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="font-serif text-3xl text-neutral-50 mt-1">{value}</p>
    </div>
  );
}

function PhotoStack() {
  return (
    <div className="relative w-[280px] h-[330px]">
      <div className="absolute w-[245px] h-[290px] bg-neutral-900 rounded-xl p-2.5 shadow-xl top-9 -left-3 rotate-[-9deg] z-10">
        <div
          className="w-full h-full rounded-lg"
          style={{ background: "linear-gradient(160deg,#d8e4dc,#b7c8bd)" }}
        />
      </div>
      <div className="absolute w-[245px] h-[290px] bg-neutral-900 rounded-xl p-2.5 shadow-xl top-4 left-5 rotate-[6deg] z-20">
        <div
          className="w-full h-full rounded-lg"
          style={{ background: "linear-gradient(160deg,#e3dccb,#cdbfa1)" }}
        />
      </div>
      <div className="absolute w-[245px] h-[290px] bg-neutral-900 rounded-xl p-2.5 shadow-xl top-0 left-2 rotate-[-2deg] z-30">
        <div
          className="w-full h-full rounded-lg relative"
          style={{ background: "linear-gradient(160deg,#e8e3d6,#c9d6cd 55%,#a9b8ae)" }}
        >
          <span className="absolute bottom-3 left-3 bg-[#fdfaf5] text-[10px] font-bold px-2.5 py-1 rounded text-neutral-900">
            KAMAL_01.JPG
          </span>
        </div>
      </div>
    </div>
  );
}

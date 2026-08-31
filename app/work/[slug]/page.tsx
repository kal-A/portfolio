import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Metric from "@/components/Metric";
import Diagram from "@/components/case-study/Diagram";
import ForceNCaseStudy from "@/components/case-study/ForceNCaseStudyV2";
import GreenhouseCaseStudy from "@/components/case-study/GreenhouseCaseStudyV2";
import PillPalCaseStudy from "@/components/case-study/PillPalCaseStudyV2";
import PathPeerCaseStudy from "@/components/case-study/PathPeerCaseStudyV2";
import RoomEaseCaseStudy from "@/components/case-study/RoomEaseCaseStudyV2";
import HeraCaseStudy from "@/components/case-study/HeraCaseStudyV2";
import InformaticaCaseStudy from "@/components/case-study/InformaticaCaseStudyV2";
import ChronicleCaseStudy from "@/components/case-study/ChronicleCaseStudyV2";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return { title: cs ? `${cs.title} · Kamal Ahsan` : "Case Study" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  if (cs.slug === "forcen") return <ForceNCaseStudy />;
  if (cs.slug === "greenhouse") return <GreenhouseCaseStudy />;
  if (cs.slug === "pill-pal") return <PillPalCaseStudy />;
  if (cs.slug === "pathpeer") return <PathPeerCaseStudy />;
  if (cs.slug === "roomease") return <RoomEaseCaseStudy />;
  if (cs.slug === "hera-fertility") return <HeraCaseStudy />;
  if (cs.slug === "informatica") return <InformaticaCaseStudy />;
  if (cs.slug === "chronicle") return <ChronicleCaseStudy />;
  const theme = caseStudyTheme[cs.slug];

  return (
    <div className="pb-20">
      <div
        className="pt-10 pb-12"
        style={{
          background: `linear-gradient(160deg, ${theme?.fillTo ?? "#f4f1ea"} 0%, #fdfaf5 95%)`,
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <Link href="/work" className="text-sm text-neutral-500 hover:text-neutral-900">
            ← All case studies
          </Link>

          <div
            className="w-12 h-12 rounded-lg mt-6 flex items-center justify-center font-serif text-base font-bold"
            style={{ background: theme?.iconBg ?? "#181614", color: "#fdfaf5" }}
          >
            {theme?.mark ?? cs.company.slice(0, 2).toUpperCase()}
          </div>
          <p className="text-sm text-rose-500 font-medium tracking-wide uppercase mt-4">
            {cs.company}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl mt-3 text-neutral-900 leading-tight">
            {cs.title}
          </h1>
          <p className="text-neutral-500 mt-3">
            {cs.role} · {cs.location ? `${cs.location} · ` : ""}
            {cs.timeframe}
          </p>
          <p className="text-neutral-700 mt-4 text-xl leading-relaxed">{cs.oneLiner}</p>

          <div className="flex flex-wrap gap-2.5 mt-6">
            {cs.artifacts.map((a) => (
              <span
                key={a}
                className="cs-pill text-xs font-bold px-3 py-1.5 text-neutral-800"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6">
      {cs.team && (
        <div
          className="cs-box mt-6 px-4 py-3 text-sm text-neutral-600"
          style={{ background: theme?.bg ?? "#fdfaf5" }}
        >
          <span className="font-medium text-neutral-800">Team project: </span>
          {cs.team}
          {cs.contribution && (
            <p className="mt-2 text-neutral-600">{cs.contribution}</p>
          )}
        </div>
      )}

      {cs.snapshot && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-sm">
          <div className="cs-box px-4 py-3.5">
            <p className="text-neutral-400 uppercase tracking-wide text-xs mb-1">Challenge</p>
            <p className="text-neutral-700 leading-relaxed">{cs.snapshot.challenge}</p>
          </div>
          <div className="cs-box px-4 py-3.5">
            <p className="text-neutral-400 uppercase tracking-wide text-xs mb-1">Contribution</p>
            <p className="text-neutral-700 leading-relaxed">{cs.snapshot.contribution}</p>
          </div>
          <div className="cs-box px-4 py-3.5">
            <p className="text-neutral-400 uppercase tracking-wide text-xs mb-1">Outcome</p>
            <p className="text-neutral-700 leading-relaxed">{cs.snapshot.outcome}</p>
          </div>
          <div className="cs-box px-4 py-3.5">
            <p className="text-neutral-400 uppercase tracking-wide text-xs mb-1">Tools</p>
            <p className="text-neutral-700 leading-relaxed">{cs.snapshot.tools.join(", ")}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
        {cs.metrics.map((m) => (
          <Metric key={m.label} value={m.value} label={m.label} accent={theme?.accent ?? "#181614"} />
        ))}
      </div>

      {cs.constraints && cs.constraints.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-lg text-neutral-900 mb-3">Constraints</h2>
          <ul className="space-y-2.5">
            {cs.constraints.map((c, i) => (
              <li key={i} className="cs-box px-4 py-2.5 text-neutral-700 text-sm leading-relaxed">
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 mb-3">Problem</h2>
        <p className="text-neutral-700 leading-relaxed">{cs.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl text-neutral-900 mb-3">Process</h2>
        <ul className="space-y-3">
          {cs.process.map((p, i) => (
            <li key={i} className="text-neutral-700 leading-relaxed flex gap-3">
              <span className="text-rose-400 font-serif">{i + 1}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {cs.figures && cs.figures.length > 0 && (
        <section className="mt-10">
          {cs.figures.map((f) => (
            <Diagram key={f.id} figure={f} />
          ))}
        </section>
      )}

      {cs.decisions && cs.decisions.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-neutral-900 mb-4">Key decisions</h2>
          <div className="space-y-6">
            {cs.decisions.map((d, i) => (
              <div
                key={i}
                className="cs-box px-5 py-4"
                style={{ background: theme?.bg ?? "#fdfaf5" }}
              >
                <p className="font-medium text-neutral-900">{d.decision}</p>
                <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{d.rationale}</p>
                {d.alternatives && (
                  <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
                    <span className="text-neutral-400">Alternatives considered: </span>
                    {d.alternatives}
                  </p>
                )}
                {d.result && (
                  <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
                    <span className="text-neutral-400">Result: </span>
                    {d.result}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {cs.note && (
        <p className="mt-8 text-sm text-neutral-500 italic border-l-2 border-neutral-200 pl-4">
          {cs.note}
        </p>
      )}

      {cs.images && cs.images.length > 0 && (
        <section className="mt-10 grid sm:grid-cols-2 gap-4">
          {cs.images.map((img) => (
            <div key={img.src} className="rounded-lg overflow-hidden border border-neutral-200">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-neutral-900 mb-3">Outcome</h2>
        <ul className="space-y-2">
          {cs.outcome.map((o, i) => (
            <li key={i} className="text-neutral-700 leading-relaxed flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      {cs.reflection && cs.reflection.length > 0 && (
        <section className="mt-10 border-t border-neutral-200 pt-6">
          <h2 className="font-serif text-lg text-neutral-900 mb-2">Reflection</h2>
          <ul className="space-y-2">
            {cs.reflection.map((r, i) => (
              <li key={i} className="text-neutral-600 text-sm leading-relaxed flex gap-2">
                <span className="text-neutral-300">-</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cs.whatIdImprove && (
        <section className="mt-10 border-t border-neutral-200 pt-6">
          <h2 className="font-serif text-lg text-neutral-900 mb-2">What I&apos;d improve next</h2>
          <p className="text-neutral-600 text-sm leading-relaxed">{cs.whatIdImprove}</p>
        </section>
      )}

      {cs.links && cs.links.length > 0 && (
        <div className="mt-10 flex gap-4">
          {cs.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-300 rounded-lg px-5 py-2.5 text-sm font-medium hover:border-neutral-500 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

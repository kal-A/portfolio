import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import Metric from "@/components/Metric";
import {
  HeraOnboardingMockup,
  HeraPaymentPlanMockup,
  HeraDashboardMockup,
} from "@/components/mockups/HeraMockups";
import {
  PillPalMyMedsMockup,
  PillPalAddMedicationMockup,
  PillPalReminderMockup,
  PillPalEmergencyMockup,
} from "@/components/mockups/PillPalMockups";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  return { title: cs ? `${cs.title} — Kamal Ahsan` : "Case Study" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/work" className="text-sm text-neutral-500 hover:text-neutral-900">
        ← All case studies
      </Link>

      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase mt-6">
        {cs.company}
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3 text-neutral-900 leading-tight">
        {cs.title}
      </h1>
      <p className="text-neutral-500 mt-3">
        {cs.role} · {cs.timeframe}
      </p>

      {cs.team && (
        <div className="mt-6 border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-600">
          <span className="font-medium text-neutral-800">Team project — </span>
          {cs.team}
          {cs.contribution && (
            <p className="mt-2 text-neutral-600">{cs.contribution}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
        {cs.metrics.map((m) => (
          <Metric key={m.label} value={m.value} label={m.label} />
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-xl text-neutral-900 mb-3">Problem</h2>
        <p className="text-neutral-700 leading-relaxed">{cs.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-xl text-neutral-900 mb-3">Process</h2>
        <ul className="space-y-3">
          {cs.process.map((p, i) => (
            <li key={i} className="text-neutral-700 leading-relaxed flex gap-3">
              <span className="text-rose-400 font-serif">{i + 1}.</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {cs.note && (
        <p className="mt-8 text-sm text-neutral-500 italic border-l-2 border-neutral-200 pl-4">
          {cs.note}
        </p>
      )}

      {cs.mockups === "hera" && (
        <section className="mt-10 overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            <HeraOnboardingMockup />
            <HeraPaymentPlanMockup />
            <HeraDashboardMockup />
          </div>
        </section>
      )}

      {cs.mockups === "pillpal" && (
        <section className="mt-10 overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            <PillPalMyMedsMockup />
            <PillPalAddMedicationMockup />
            <PillPalReminderMockup />
            <PillPalEmergencyMockup />
          </div>
        </section>
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
        <h2 className="font-serif text-xl text-neutral-900 mb-3">Outcome</h2>
        <ul className="space-y-2">
          {cs.outcome.map((o, i) => (
            <li key={i} className="text-neutral-700 leading-relaxed flex gap-3">
              <span className="text-emerald-500">✓</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

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
  );
}

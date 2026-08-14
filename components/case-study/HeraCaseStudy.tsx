// Hera Fertility case study. Built from six real source artifacts audited
// during this rewrite: financial app wireframes.pdf, finacial app product
// roadmap.pdf, marketing metrics.pdf, payment plans designs.pdf, and two
// Near me design PDFs, all in the gitignored `Herafertility work/` folder.
// Per Kamal's direction, raw handwritten notes are now used as source
// material rather than the primary visual: most sections present polished,
// portfolio-native reconstructions (tables, flow diagrams, matrices) built
// from that material, with the original sketches kept only where a rough
// thinking -> polished concept comparison genuinely adds value.
//
// All 8 real-source images in public/case-studies/hera-fertility/ are
// referenced on the page (financing flow, near-me search/filter, near-me
// clinic-detail layout iterations, the roadmap notes, the GA/marketing-
// metrics planning notes, and two tightly cropped pages from the payment
// plans wireframe file: the homepage treatment-selection cards and the
// full treatment-specific IVF Payment Plans page), so every real artifact
// pulled from the source PDFs has a visible home here rather than sitting
// unused. The payment-plan crops replaced an earlier composite sketch
// export that bundled the same two pages at illegible scale plus
// unrelated inspiration-source annotations.
//
// NEEDS_INPUT (kept off the public page, for Kamal to confirm later):
// - Baseline/period/definition for the resume's "2x retention" and "50% less
//   onboarding drop-off" claims. No source artifact documents them, so they
//   are not rendered here.
// - Verification of the resume's "25% lower operational cost" claim from
//   moving loan servicing in-house.
// - Exact user count behind "500+ users tracked."
// - Whether formal moderated user research occurred, versus the competitive/
//   pattern research, Hotjar review, and internal review the artifacts
//   actually document.
// - Whether Phase 3 (site-wide launch) shipped before the internship ended.
// - The roadmap's Phase 2 label ("Upgrade to Missouri") is not used publicly
//   since Kamal doesn't remember what it referred to; the phase is described
//   functionally instead (QA, production keys, production API).
// - No Hera screen recordings or video files were found in this worktree or
//   the gitignored `Herafertility work/` source folder (checked 2026-08-09;
//   that folder only contains the 6 PDFs already audited, plus the 7 sketch
//   PNGs now all in use on this page). If Kamal has recordings elsewhere,
//   the financing, segmentation, and clinic-discovery sections are the
//   places to add them per the video-media rules.

import Link from "next/link";
import Image from "next/image";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import SketchPanel from "@/components/case-study/blocks/SketchPanel";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import Reveal from "@/components/Reveal";
import {
  HeraFinancingFlowMockup,
  HeraPaymentPlanMockup,
  HeraPaymentFlowDiagram,
  HeraClinicSearchMockup,
  HeraClinicDetailMockup,
} from "@/components/mockups/HeraMockups";

const BLUE_GRADIENT = "linear-gradient(135deg, #6fa0c4, #1f3a52)";
const NAVY = "#1f3a52";
const INK_SOFT_BODY = "#4c473e";

/** Splits a two-sentence reflection string into a title (first sentence) and body (remainder). */
function splitReflection(text: string): { title: string; body: string } {
  const splitAt = text.indexOf(". ");
  if (splitAt === -1) return { title: text, body: "" };
  return {
    title: text.slice(0, splitAt + 1).trim(),
    body: text.slice(splitAt + 2).trim(),
  };
}

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(58,107,147,0.16) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(111,160,196,0.2) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(31,58,82,0.1) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.05) 0%, transparent 46%), #f2eee2";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(58,107,147,0.12) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.05) 0%, transparent 46%), #f2eee2";
const TONE_SKY =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.34) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(31,58,82,0.16) 0%, transparent 46%), linear-gradient(180deg, #d7e4ee 0%, #b9d0e2 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(111,160,196,0.16) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(200,214,227,0.07) 0%, transparent 46%), linear-gradient(180deg, #1c3245 0%, #16283a 55%, #0f1c2a 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s-problem",
    label: "The product problem",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>,
  },
  {
    href: "#s-financing",
    label: "Financing & segmentation",
    icon: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 14.5h4" /></>,
  },
  {
    href: "#s-payment",
    label: "Payment plans",
    icon: <><rect x="3" y="7" width="7" height="11" rx="1.2" /><rect x="14" y="7" width="7" height="11" rx="1.2" /><path d="M6.5 11.5h0M17.5 11.5h0" /></>,
  },
  {
    href: "#s-nearme",
    label: "Finding care nearby",
    icon: <><circle cx="12" cy="10.5" r="3" /><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11Z" /></>,
  },
  {
    href: "#s-analytics",
    label: "Behaviour & analytics",
    icon: <path d="M4 19V9M10 19V5M16 19v-7M4 19h16" />,
  },
  {
    href: "#s-roadmap",
    label: "Roadmap & rollout",
    icon: <><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>,
  },
  {
    href: "#s-outcomes",
    label: "Outcomes",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    href: "#s-reflection",
    label: "Reflection",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
  },
];

const ANALYTICS_STEPS: ProcessStep[] = [
  {
    title: "Observe behaviour",
    synopsis:
      "Google Analytics and Looker Studio were scoped to specific flows, financing sign-up, Hera Care, and Hera Care+, and Hotjar recordings showed how people actually moved through them, not just what the aggregate numbers said.",
  },
  {
    title: "Identify friction or opportunity",
    synopsis:
      "Session, engagement, and clicks-per-page data, read alongside what the recordings showed, surfaced where people were dropping off or hesitating instead of moving forward.",
  },
  {
    title: "Investigate",
    synopsis:
      "Checked whether a pattern held across a specific flow, page, or channel before treating it as a real signal, since analytics alone can't explain why something happened.",
  },
  {
    title: "Propose redesign or feature",
    synopsis:
      "Turned a confirmed pattern into a specific proposal, like collapsing the address step to one field or prioritizing which clinic-discovery filters to finish first.",
  },
  {
    title: "Update flow or plan",
    synopsis:
      "Folded the proposal into the wireframes or the roadmap directly, rather than leaving it as a standalone recommendation nobody owned.",
  },
  {
    title: "Hand off or implement",
    synopsis:
      "Passed the updated flow into the shared wireframe set and roadmap the rest of the team was building from.",
  },
  {
    title: "Evaluate",
    synopsis:
      "The same scoped dashboards would confirm whether the change actually moved engagement or completion, closing the loop back to signal instead of treating a redesign as a one-way bet.",
  },
];

const ROADMAP_PHASES = [
  {
    phase: "Phase 1",
    title: "Onto AWS",
    objective:
      "Get the in-house financing app running in a real hosted environment the team could test against, instead of iterating against a live third-party dependency.",
    tasks: [
      "Request Loanglide's existing loan process and API keys",
      "Stand up a staging subdomain on herafertility.co",
      "Upload the codebase to GitHub",
      "Deploy the staging build to AWS",
    ],
    dependencies:
      "Needed Loanglide to hand over the existing process and keys before the in-house build could take over, and needed an external technical contact for the AWS deployment, since the team had no in-house cloud deployment coverage.",
    owner: "Faiq (GitHub upload), an external technical contact (AWS deployment), Thiv & Kamal (PM coordination)",
    validation: "An internal test-and-interact pass on the staging subdomain before any wider review.",
    outcome: "A working staging environment, separate from Loanglide's live process, ready for QA.",
  },
  {
    phase: "Phase 2",
    title: "Harden for production",
    objective: "Close the gap between working in staging and being safe to run for real users.",
    tasks: ["QA, documentation, and bug fixes", "Implement production Loanglide API keys", "Bring the production API online"],
    dependencies:
      "Production API keys depended on Loanglide again, this time for production credentials rather than the underlying process.",
    owner: "Thiv & Kamal (shared PM responsibility)",
    validation: "A QA pass and documentation review before switching over to the production API.",
    outcome: "A production-ready build, not yet exposed to every user.",
  },
  {
    phase: "Phase 3",
    title: "Site-wide launch",
    objective: "Replace Loanglide's live financing flow with the in-house build for every user.",
    tasks: ["Roll the in-house financing app out to all users"],
    dependencies:
      "Depended on Phase 1 and Phase 2 landing cleanly, since a site-wide launch is the point where an untested staging assumption becomes a live incident.",
    owner: "Thiv & Kamal",
    validation: "Planned as the final phase of the six-week window. Whether it shipped before the internship ended isn't confirmed.",
    outcome: "Full cutover from Loanglide to the in-house app, planned as the end state of the roadmap.",
  },
];

const PAYMENT_MATRIX = [
  {
    pattern: "Boston IVF, Wellness Center",
    why: "The clearest fertility-specific precedent found: services grouped into package-style cards.",
    call: "Borrowed",
    decision: "Basis for grouping treatments (IVF, egg freezing, IUI) into their own package pages.",
  },
  {
    pattern: "Costco, membership tiers",
    why: "A two-tier comparison table with a checklist of what each tier includes.",
    call: "Borrowed",
    decision: "Informed presenting multiple payment plans side by side instead of a single default option.",
  },
  {
    pattern: "Walmart, Subscribe & Save",
    why: "Percentage-off subscription blocks, built for recurring retail purchases.",
    call: "Rejected",
    decision: "Ruled out framing payment plans as a subscription discount; financing isn't a recurring purchase.",
  },
  {
    pattern: "GoodRx Gold",
    why: "A single membership upsell with one clear price point.",
    call: "Rejected",
    decision: "Ruled out a single-tier upsell, since users needed to compare multiple plans, not accept one default.",
  },
  {
    pattern: "Bitly",
    why: "A four-tier pricing table with a flagged best-value option. Called out in the research notes as personally the strongest design to choose from.",
    call: "Borrowed, direct model",
    decision: "Became the direct model for Hera's three-option, per-treatment payment-plan layout.",
  },
  {
    pattern: "FCI, Shady Grove Fertility, Alabama Fertility",
    why: "Direct fertility competitors, but their marketing pages were nearly identical to each other and none presented financing as comparable packages.",
    call: "Rejected as a pattern source",
    decision: "Looked outside the immediate category for a real payment-plan pattern, instead of following direct competitors.",
  },
];

const NEARME_PASSES = [
  { n: "01", title: "Map beside hours", body: "Hours of operation and a large square map sat side by side at the top of the page." },
  { n: "02", title: "Hours beside the title", body: "Moved hours of operation up next to the clinic name, giving the map a wider, shorter band beneath it." },
  { n: "03", title: "Narrower map", body: "Tightened the map's width and reduced surrounding whitespace to bring related listings higher on the page." },
  { n: "04", title: "Single column, settled", body: "Settled on a compact single-column layout with the map spanning the full width beneath the header, the version carried into the final design." },
];

const ANALYTICS_INSIGHTS = [
  {
    signal: "Sessions, engagement rate, and average session time, scoped to financing sign-up, Hera Care, and Hera Care+ rather than the whole site.",
    interpretation: "Only a few flows were actually worth designing and tracking closely.",
    opportunity: "Focus design and instrumentation effort on the flows tied to a real decision instead of the whole site.",
    action: "Scoped both the analytics plan and the design review to those named flows.",
    measurement: "Recheck the same scoped dashboards after a design change lands.",
  },
  {
    signal: "Engagement rate and average engagement time by channel group.",
    interpretation: "Some channels brought users in but didn't hold their attention once they arrived.",
    opportunity: "Know which channel's entry experience was worth designing for first.",
    action: "Prioritized the sign-up flow's first-touch experience for the channels with both volume and engagement.",
    measurement: "Compare channel-level engagement before and after the prioritized changes.",
  },
  {
    signal: "Landing-page sessions, new users, and average session time on specific pages like the 'Get started' page.",
    interpretation: "A few pages carried outsized traffic relative to the rest of the site.",
    opportunity: "Those pages deserved deliberate design attention rather than a default template.",
    action: "Fed page-level findings into which UI to redesign first, like collapsing the address step and prioritizing which clinic filters to finish.",
    measurement: "Track completion and drop-off on the redesigned page specifically.",
  },
  {
    signal: "CAC, LTV, and geographic and device-level breakdowns were listed as 'maybe' additions in the planning notes.",
    interpretation: "These would help understand acquisition cost and lifetime value, but weren't tied to the sign-up and clinic-discovery problems in front of the team.",
    opportunity: "Tracking everything by default dilutes what a small team can actually act on.",
    action: "Deliberately left CAC, LTV, and geographic and device-level tracking out of the core plan.",
    measurement: "Revisit once acquisition, not conversion, becomes the active product question.",
  },
];

/** Small evidence panel pairing a real source-note thumbnail with a caption explaining what it shows and what it fed. */
function SourceNoteCard({
  src,
  alt,
  aspect,
  caption,
}: {
  src: string;
  alt: string;
  aspect: string;
  caption: React.ReactNode;
}) {
  return (
    <div className="cs-box white flex flex-col sm:flex-row gap-5 items-start px-6 py-6">
      <div
        className="relative w-full sm:w-[160px] shrink-0 rounded-lg overflow-hidden border"
        style={{ borderColor: "#e5e1d4", aspectRatio: aspect }}
      >
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
          Source notes
        </p>
        <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

function DashedRow({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <div
      className="cs-hover-row grid sm:grid-cols-[1fr_1.6fr_140px_1.4fr] gap-3 sm:gap-5 px-5 py-5 items-start"
      style={{ borderTop: i === 0 ? "none" : "1.5px dashed rgba(32,28,23,0.16)" }}
    >
      {children}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-extrabold uppercase tracking-wide mb-1.5 sm:hidden" style={{ color: NAVY }}>
      {children}
    </p>
  );
}

function PaymentDecisionMatrix() {
  return (
    <div className="cs-box white quiet-hover overflow-hidden">
      <div
        className="hidden sm:grid grid-cols-[1fr_1.6fr_140px_1.4fr] gap-5 px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide"
        style={{ color: NAVY, background: "rgba(58,107,147,0.08)" }}
      >
        <span>Pattern observed</span>
        <span>Why it mattered</span>
        <span>Call</span>
        <span>Resulting Hera decision</span>
      </div>
      {PAYMENT_MATRIX.map((row, i) => (
        <DashedRow key={row.pattern} i={i}>
          <div>
            <FieldLabel>Pattern observed</FieldLabel>
            <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>{row.pattern}</p>
          </div>
          <div>
            <FieldLabel>Why it mattered</FieldLabel>
            <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{row.why}</p>
          </div>
          <div>
            <FieldLabel>Call</FieldLabel>
            <span
              className="inline-block text-[11px] font-extrabold uppercase tracking-wide rounded-full px-2.5 py-1 border-2"
              style={{
                color: row.call.startsWith("Rejected") ? "var(--ink)" : "#fff9ee",
                borderColor: "var(--ink)",
                background: row.call.startsWith("Rejected") ? "transparent" : BLUE_GRADIENT,
              }}
            >
              {row.call}
            </span>
          </div>
          <div>
            <FieldLabel>Resulting Hera decision</FieldLabel>
            <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{row.decision}</p>
          </div>
        </DashedRow>
      ))}
    </div>
  );
}

function SegmentationFlow() {
  const steps = [
    {
      title: "Homepage",
      body: "Three treatment entry points (IVF, egg freezing, IUI), each showing a synopsis, basic procedure, and a payment-plans call to action, modeled on Boston IVF's package layout.",
    },
    {
      title: "Create an account",
      body: "A single ‘I am looking for…’ selection (IVF medication, IUI freezing, or egg freezing) captured at sign-up, alongside a promotional-email consent checkbox.",
    },
    {
      title: "Segmented experience",
      body: "New users land in the payment-plan and content path matching their selection instead of one generic flow.",
    },
  ];
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4">
      {steps.map((s, i) => (
        <div key={s.title} className="flex items-center gap-4 flex-1">
          <div className="cs-box light px-5 py-5 flex-1 h-full">
            <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Step {i + 1}
            </p>
            <p className="font-serif font-bold text-base mb-2" style={{ color: "var(--ink)" }}>{s.title}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: INK_SOFT_BODY }}>{s.body}</p>
          </div>
          {i < steps.length - 1 && (
            <span className="text-2xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function RoadmapTable() {
  return (
    <div className="flex flex-col gap-6">
      {ROADMAP_PHASES.map((p) => (
        <Reveal key={p.phase}>
          <div className="cs-box white overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4" style={{ background: "rgba(58,107,147,0.08)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2"
                style={{ borderColor: "var(--ink)", background: BLUE_GRADIENT, color: "#fff9ee" }}
              >
                {p.phase}
              </span>
              <h4 className="font-serif font-bold text-lg" style={{ color: "var(--ink)" }}>{p.title}</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 px-6 py-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Objective</p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{p.objective}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Owner / team</p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{p.owner}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Tasks</p>
                <ul className="flex flex-col gap-1">
                  {p.tasks.map((t) => (
                    <li key={t} className="text-sm leading-relaxed flex gap-2" style={{ color: INK_SOFT_BODY }}>
                      <span style={{ color: NAVY }}>&#8226;</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Dependencies</p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{p.dependencies}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Validation</p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{p.validation}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>Outcome</p>
                <p className="text-sm leading-relaxed" style={{ color: INK_SOFT_BODY }}>{p.outcome}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function AnalyticsInsightTable() {
  return (
    <div className="flex flex-col gap-4">
      {ANALYTICS_INSIGHTS.map((row, i) => (
        <Reveal key={row.signal} delay={i * 60}>
          <div className="cs-box white px-6 py-6">
            <div className="grid md:grid-cols-5 gap-4">
              {[
                ["Signal / behaviour observed", row.signal],
                ["Interpretation", row.interpretation],
                ["Product opportunity", row.opportunity],
                ["Proposed action", row.action],
                ["Measurement", row.measurement],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10.5px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
                    {label}
                  </p>
                  <p className="text-[13px] leading-relaxed" style={{ color: INK_SOFT_BODY }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function HeraCaseStudy() {
  const cs = getCaseStudy("hera-fertility")!;

  return (
    <div
      style={
        {
          "--cs-wash-from": "#eaf2f8",
          "--cs-wash-to": "#3a6b93",
          "--cs-light-from": "#f0f6fa",
          "--cs-light-to": "#c3dbea",
          "--cs-accent-deep": "#1f3a52",
          "--cs-accent-wash-rgb": "58, 107, 147",
        } as React.CSSProperties
      }
    >
      {/* ---------- Hero ---------- */}
      <div style={{ background: HERO_BG }}>
        <div className="mx-auto max-w-5xl px-6 pt-8 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <Reveal className="flex-1 min-w-0">
              <Link href="/work" className="text-sm font-semibold" style={{ color: "var(--ink-soft)" }}>
                ← All case studies
              </Link>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: NAVY }}>
                Hera Fertility · Product Design &amp; Marketing Intern
              </p>
              <h1
                className="font-serif text-4xl sm:text-[50px] leading-[1.08] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Designing financing and care-discovery flows for a 0-to-1 fertility platform
              </h1>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {cs.metrics.slice(0, 2).map((m) => (
                  <span
                    key={m.label}
                    className="cs-pill inline-flex items-baseline gap-1.5 text-xs font-bold px-3.5 py-1.5"
                  >
                    <span className="font-serif text-base font-bold" style={{ color: NAVY }}>
                      {m.value}
                    </span>
                    <span style={{ color: "var(--ink-soft)" }}>{m.label.split("(")[0].trim()}</span>
                  </span>
                ))}
              </div>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Remote (New York, NY) · Jan 2023 – Apr 2023
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                Hera&apos;s financing application ran through a third-party loan processor, and there
                was no in-house product to design the sign-up, payment, or clinic-discovery experience
                around. I designed the financing flow, a payment-plan concept grounded in competitive
                research, and the clinic-discovery experience, and shipped the account-segmentation
                flow that routes new users into them, then used Hotjar and Google Analytics to decide
                what came next.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {cs.artifacts.map((chip) => (
                  <span key={chip} className="cs-pill highlight text-xs font-extrabold px-3.5 py-1.5 cursor-default">
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-10 md:mt-24 w-full md:w-[300px] shrink-0">
              <nav className="cs-box white quiet-hover px-6 py-7" style={{ background: "#fffdf8" }}>
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: NAVY }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Eight sections, from the product problem through to what I&apos;d change next.
                </p>
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="opn-link flex items-center gap-3.5 text-base font-bold py-2.5 px-2.5 -mx-2.5"
                    style={{
                      color: "var(--ink)",
                      borderTop: i === 0 ? "none" : "1.5px dashed rgba(32,28,23,0.16)",
                    }}
                  >
                    <span
                      className="navicon w-[26px] h-[26px] shrink-0 rounded-lg border-[1.5px] flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #dce9f2, #a9c6db)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: NAVY }}>
                        <Icon>{link.icon}</Icon>
                      </span>
                    </span>
                    {link.label}
                  </a>
                ))}

                <div className="mt-6 pt-5" style={{ borderTop: "1.5px dashed rgba(32,28,23,0.16)" }}>
                  <p className="text-[11px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--ink-soft)" }}>
                    Core skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="cs-pill inline-flex items-center text-[10.5px] font-extrabold uppercase tracking-wide px-3 py-1.5 cursor-default"
                        style={{ background: BLUE_GRADIENT, color: "#fff9ee", borderColor: "var(--ink)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] font-extrabold uppercase tracking-wide mt-4 mb-2.5" style={{ color: "var(--ink-soft)" }}>
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Figma", "Balsamiq", "Google Analytics", "Hotjar", "Looker Studio"].map((chip) => (
                      <span key={chip} className="cs-pill highlight text-[10.5px] font-extrabold px-3 py-1.5 cursor-default">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </nav>
            </Reveal>
          </div>

          {/* Snapshot */}
          <SnapshotGrid>
            <SnapshotBox
              label="Challenge"
              accentGradient={BLUE_GRADIENT}
              icon={<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>}
            >
              {cs.snapshot!.challenge}
            </SnapshotBox>
            <SnapshotBox
              label="Contribution"
              accentGradient={BLUE_GRADIENT}
              icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
            >
              {cs.snapshot!.contribution}
            </SnapshotBox>
            <SnapshotBox
              label="Outcome"
              accentGradient={BLUE_GRADIENT}
              icon={<><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>}
            >
              {cs.snapshot!.outcome}
            </SnapshotBox>
            <div className="cs-box white px-6 py-6">
              <div
                className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)" }}
              >
                <span className="w-[21px] h-[21px] text-[#fff9ee]">
                  <Icon>
                    <rect x="4" y="4" width="7" height="7" rx="1.5" />
                    <rect x="13" y="4" width="7" height="7" rx="1.5" />
                    <rect x="4" y="13" width="7" height="7" rx="1.5" />
                    <rect x="13" y="13" width="7" height="7" rx="1.5" />
                  </Icon>
                </span>
              </div>
              <p className="text-[15px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--ink)" }}>
                Tools
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["Figma", "financing, payment plan & clinic-discovery wireframes"],
                  ["Balsamiq", "early flow sketches"],
                  ["Google Analytics", "behaviour tracking, scoped by flow"],
                  ["Hotjar", "session recordings, reviewed for friction"],
                  ["Looker Studio", "reporting scoped to specific flows"],
                ].map(([tool, use]) => (
                  <li key={tool} className="text-[14.5px]" style={{ color: "#4c473e" }}>
                    <b className="font-extrabold" style={{ color: "var(--ink)" }}>
                      {tool}
                    </b>
                    <span className="block text-[12.5px] font-medium mt-0.5" style={{ color: "var(--ink-soft)" }}>
                      {use}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] font-extrabold uppercase tracking-wide mt-4 mb-1.5" style={{ color: NAVY }}>
                Also used
              </p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                WordPress &amp; Umso (web design), HubSpot (marketing/CRM), Excel (reporting)
              </p>
            </div>
          </SnapshotGrid>

          <p className="text-sm italic leading-relaxed mt-8 max-w-3xl" style={{ color: "var(--ink-soft)" }}>
            {cs.note}
          </p>
        </div>
      </div>

      {/* ---------- 01: The product problem ---------- */}
      <div id="s-problem" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="A high-stakes decision with no in-house product to shape it">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Choosing how to pay for fertility treatment is not a decision most people are practiced
              at making: a requested loan amount, a repayment plan, and clinic pricing, all worked out
              while already navigating a stressful medical process. Hera&apos;s financing application
              ran entirely through Loanglide, a third-party loan processor, which limited how much of
              that experience the team could actually design or control. There was no existing in-house
              product to iterate from, no payment-plan presentation of its own, and no dedicated way for
              someone to find a nearby clinic and see what it would cost. The goal was to design all
              three and stand up an in-house build to replace the third-party dependency.
            </p>

            <div className="flex items-center gap-5 flex-wrap my-9">
              <div className="cs-box white flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#4c6f8f" }}>
                  Before
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Financing routed through Loanglide, a third-party loan processor
                </p>
              </div>
              <span className="text-3xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
                →
              </span>
              <div className="cs-box light flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: NAVY }}>
                  In progress
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  In-house financing app, designed and staged for launch on herafertility.co
                </p>
              </div>
            </div>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Constraints
            </p>
            <div className="cs-box white px-6 py-6">
              <ul className="flex flex-col gap-3">
                {cs.constraints!.map((c) => (
                  <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                    <span
                      className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
                    >
                      ✕
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 02: Financing & segmentation ---------- */}
      <div id="s-financing" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Sketch to product, financing flow
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Designing the financing flow
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              The prequalification flow went through several rounds of the same question: what is the
              fewest, clearest set of inputs a person needs to give before Hera can tell them anything
              useful. The address step and the phone/date-of-birth formatting changed the most.
            </p>
          </Reveal>

          <SketchPanel
            sketchSrc="/case-studies/hera-fertility/sketch-financing-flow.png"
            sketchAlt="Handwritten wireframe iterations of the Get Prequalified flow, showing personal information, address entry options, and input formatting notes"
            sketchCaption="Original wireframe iterations for the Get Prequalified flow: personal information, then two address-entry options, one keeping city/state/ZIP as separate fields, one collapsing everything into a single autofill field."
            accent={NAVY}
            reconstructedCaption="Reconstructed step 2 of the flow: a single autofill address field, plus the masked phone and date-of-birth formatting from the revised wireframe."
          >
            <HeraFinancingFlowMockup />
          </SketchPanel>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {cs.decisions!.slice(0, 2).map((d, i) => (
              <Reveal key={d.decision} delay={i * 100}>
                <div className="cs-box light px-6 py-7 h-full">
                  <div
                    className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-base mb-4"
                    style={{ borderColor: "var(--ink)", background: BLUE_GRADIENT, color: "#fff9ee" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3" style={{ color: "var(--ink)" }}>
                    {d.decision}
                  </h3>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                    {d.rationale}
                  </p>
                  {d.alternatives && (
                    <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: NAVY }}>
                        Alternative:{" "}
                      </span>
                      {d.alternatives}
                    </p>
                  )}
                  {d.result && (
                    <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: NAVY }}>
                        Result:{" "}
                      </span>
                      {d.result}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Reveal>
              <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
                Shipped
              </p>
              <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--ink)" }}>
                Account creation and treatment segmentation
              </h3>
              <p className="text-base leading-relaxed max-w-2xl mb-7" style={{ color: "#33302a" }}>
                Unlike the financing wireframes above, this flow shipped. New users self-select a
                treatment path at sign-up instead of landing on one generic homepage experience.
              </p>
            </Reveal>
            <SegmentationFlow />
            <p className="mt-4 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
                style={{ color: "var(--ink)", borderColor: "var(--ink)", background: BLUE_GRADIENT }}
              >
                Shipped, reconstructed diagram
              </span>
              The flow itself shipped; this diagram reconstructs it for a clearer presentation.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- 03: Payment plans ---------- */}
      <div id="s-payment" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Reconstructed decision matrix
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Making payment options easier to understand
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              Fertility treatment financing rarely gets presented as a clear set of comparable options.
              Before designing Hera&apos;s version, I ran a cited, URL-sourced audit of how other
              products, inside and outside fertility, presented payment choices, and used it to make a
              specific, defensible call rather than just collecting examples.
            </p>
          </Reveal>

          <Reveal>
            <div className="cs-box white overflow-hidden">
              <div className="relative w-full bg-white" style={{ aspectRatio: "1320 / 600" }}>
                <Image
                  src="/case-studies/hera-fertility/source-payment-homepage-cards.png"
                  alt="Real wireframe: homepage treatment-selection cards for IVF, egg freezing, and IUI, each showing a synopsis and a payment-plans link, annotated as inspired by Boston IVF's layout"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: NAVY }}>
              Real wireframe &middot; homepage treatment selection
            </p>
            <p className="text-sm leading-relaxed mt-1 max-w-2xl" style={{ color: "#4c473e" }}>
              Cropped directly from the source wireframe file: three treatment entry points (IVF, egg
              freezing, IUI), each with a synopsis and a link into its own payment-plans page,
              annotated in the original as inspired by Boston IVF&apos;s layout.
            </p>
          </Reveal>

          <div className="mt-10">
            <SketchPanel
              sketchSrc="/case-studies/hera-fertility/source-payment-plan-full-page.png"
              sketchAlt="Real wireframe of the treatment-specific IVF Payment Plans page: header navigation, an About IVF Treatment section with synopsis, basics, and procedure, a testimonial band, a How It Works section, and three payment-plan option cards"
              sketchCaption="The real, treatment-specific IVF Payment Plans page from the source wireframe file: an About IVF Treatment section (synopsis, basics, picture, procedure), a testimonial band, a three-step How It Works section, and the three payment-plan option cards this section reconstructs in more detail."
              accent={NAVY}
              sketchAspect="445 / 1520"
              sketchMaxHeight={900}
              reconstructedCaption="Reconstructed as a full working page, following the source's own section order: treatment selection, the About IVF Treatment section (synopsis, basics, procedure, picture placeholder), a testimonial band, the three-step How It Works section, a Get Started step that routes by treatment interest (the source shows this connecting into an account-creation panel), and the three-option comparison with price, term, and what's included filled in. Dollar amounts are illustrative; the source wireframe never specified numbers."
            >
              <HeraPaymentPlanMockup />
            </SketchPanel>
          </div>

          <div className="mt-10">
            <p className="text-[11px] font-extrabold uppercase tracking-wide mb-3 inline-block rounded-md px-2.5 py-1" style={{ color: NAVY, background: TONE_SKY }}>
              Reconstructed user flow
            </p>
            <div className="cs-box white px-5 py-5" style={{ background: "#fffdf8" }}>
              <HeraPaymentFlowDiagram />
            </div>
          </div>

          <div className="mt-12">
            <PaymentDecisionMatrix />
          </div>

          <div className="mt-10">
            {cs.decisions!.slice(2, 3).map((d) => (
              <Reveal key={d.decision}>
                <div className="cs-box white px-6 py-6" style={{ background: "#fffdf8" }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: "var(--ink)" }}>
                    {d.decision}
                  </p>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#4c473e" }}>
                    {d.rationale}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                    <span className="font-extrabold" style={{ color: NAVY }}>
                      Result:{" "}
                    </span>
                    {d.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 04: Finding care nearby ---------- */}
      <div id="s-nearme" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Sketch to product, clinic discovery
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Finding care nearby
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              Choosing a clinic needed to work like a real local search: filter by service, distance,
              and hours, then compare enough detail to actually decide. The detail page went through
              four layout passes before settling on a compact, single-column version.
            </p>
          </Reveal>

          <SketchPanel
            sketchSrc="/case-studies/hera-fertility/sketch-nearme-flow.png"
            sketchAlt="Handwritten wireframes of the clinic search, filter panel, and clinic detail page for Near Me clinic discovery"
            sketchCaption="The search and filter sketch: search by clinic or location, a category dropdown, a filter panel for services, price range, distance, and hours, and a results list sorted by distance. Doctor name and a percentage rating were crossed out of the detail-field list."
            accent={NAVY}
            reconstructedCaption="Reconstructed search results: category tags, distance sort, and clinic cards pulled straight from the filter logic in the sketch. Only Kofinas Fertility Group, New York, appears by name in the source file; the other clinic names, cities, and states shown here are clearly-generic representative data illustrating nationwide coverage, not real partner clinics."
          >
            <HeraClinicSearchMockup />
          </SketchPanel>

          <p className="text-sm leading-relaxed mt-4 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            <span
              className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-2.5 py-1 border-2 mr-2"
              style={{ color: "var(--ink)", borderColor: "var(--ink)", background: BLUE_GRADIENT }}
            >
              Open design hypothesis
            </span>
            The price-range filter is marked &ldquo;Difficult&rdquo; in the original sketch. It stayed
            in the design as a flagged, unresolved hypothesis, since clinic pricing wasn&apos;t
            consistently available to filter against, rather than shipped as a filter that looked
            functional but wasn&apos;t. It was never user-tested.
          </p>

          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mt-14 mb-1.5" style={{ color: NAVY }}>
              Original layout iterations
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="cs-box white overflow-hidden">
                <div className="relative w-full bg-white" style={{ aspectRatio: "1005 / 1728" }}>
                  <Image
                    src="/case-studies/hera-fertility/sketch-nearme-iterations-1-2.png"
                    alt="Clinic-detail layout passes 1 and 2: a large square map beside a short hours list, then hours moved up beside the clinic title with a wider map band beneath"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="cs-box white overflow-hidden">
                <div className="relative w-full bg-white" style={{ aspectRatio: "998 / 1682" }}>
                  <Image
                    src="/case-studies/hera-fertility/sketch-nearme-iterations-3-4.png"
                    alt="Clinic-detail layout passes 3 and 4: a narrower map with tighter surrounding whitespace, then the settled single-column layout with a full-width map beneath the header"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-3 max-w-2xl" style={{ color: "#4c473e" }}>
              All four clinic-detail layout passes, labeled Design 1 through Design 4 in the original
              file. Each moved the map, hours, and related-listings block until pass four&apos;s compact
              single-column version, carried into the settled design below.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-4">
            {NEARME_PASSES.map((pass, i) => (
              <Reveal key={pass.n} delay={i * 70}>
                <div className="cs-box white h-full px-5 py-6">
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5 border-2 font-serif font-bold text-sm"
                    style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
                  >
                    {pass.n}
                  </div>
                  <h4 className="font-serif font-bold text-base mb-2" style={{ color: "var(--ink)" }}>
                    {pass.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {pass.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-[11px] font-extrabold uppercase tracking-wide mb-10" style={{ color: NAVY }}>
            What each pass changed, labeled against the original iterations above
          </p>

          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Reconstructed product screen
            </p>
            <div className="cs-box white overflow-hidden">
              <HeraClinicDetailMockup />
            </div>
            <p className="text-sm leading-relaxed mt-3 max-w-2xl" style={{ color: "#4c473e" }}>
              The settled single-column layout (pass 04), applied to Kofinas Fertility Group, the real
              New York clinic used as the working example in the original files. The related-listings
              row mixes that same source name with clearly-generic representative clinics in other U.S.
              cities, standing in for a broader nationwide result set rather than one repeated address.
            </p>
          </Reveal>

          <div className="mt-10">
            {cs.decisions!.slice(3, 4).map((d) => (
              <Reveal key={d.decision}>
                <div className="cs-box white px-6 py-6" style={{ background: "#fffdf8" }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: "var(--ink)" }}>
                    {d.decision}
                  </p>
                  <p className="text-sm leading-relaxed mb-2" style={{ color: "#4c473e" }}>
                    {d.rationale}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                    <span className="font-extrabold" style={{ color: NAVY }}>
                      Result:{" "}
                    </span>
                    {d.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 05: Behaviour & analytics ---------- */}
      <div id="s-analytics" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Analytics planning
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Using behaviour to decide what to improve
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              Rather than track everything on the site the same way, the Google Analytics and Looker
              Studio plan was scoped to the flows that mattered most, and paired with Hotjar session
              recordings so the numbers had a behavioural story behind them. Analytics alone cannot
              prove why something happened, so every signal here was paired with a specific product
              question it was meant to answer.
            </p>
          </Reveal>

          <Reveal>
            <ProcessFlow
              steps={ANALYTICS_STEPS}
              accent={NAVY}
              middleLabel="Investigation turns a pattern into something worth proposing"
              topAlignRows
            />
          </Reveal>

          <div className="mt-14">
            <Reveal>
              <SourceNoteCard
                src="/case-studies/hera-fertility/sketch-ga-metrics.png"
                alt="Original marketing-metrics planning notes: acquisition, audience, traffic, and behaviour-and-engagement metric groups, with CAC and LTV marked as a 'maybe' addition"
                aspect="1435 / 1509"
                caption={
                  <>
                    The original metrics-planning notes, grouped into acquisition, audience, traffic,
                    and behaviour &amp; engagement, with CAC and LTV marked &ldquo;maybe&rdquo; rather than
                    core. The scoped plan and insight table below are both built directly from this list.
                  </>
                }
              />
            </Reveal>
            <Reveal delay={80}>
              <p className="text-xs font-extrabold uppercase tracking-wide mt-8 mb-1.5" style={{ color: NAVY }}>
                Reconstructed insight table
              </p>
              <h3 className="font-serif text-2xl mb-6" style={{ color: "var(--ink)" }}>
                From signal to measured action
              </h3>
            </Reveal>
            <AnalyticsInsightTable />
          </div>
        </div>
      </div>

      {/* ---------- 06: Roadmap & rollout ---------- */}
      <div id="s-roadmap" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="02" title="Turning the design into a phased rollout">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              The design work fed into a six-week execution roadmap (Feb 21 to Mar 27), shared with
              Thiv, the project owner and primary stakeholder, and Faiq, the other co-op. Kamal and
              Thiv split product-management responsibility for planning and sequencing the rollout.
            </p>
          </Chapter>

          <Reveal delay={80}>
            <div className="mt-10">
              <SourceNoteCard
                src="/case-studies/hera-fertility/sketch-roadmap.png"
                alt="Original handwritten roadmap notes: a six-week timeline, project owner and co-op resources, the end goal, and a three-phase execution roadmap with tasks and owners"
                aspect="1435 / 1636"
                caption={
                  <>
                    The original planning notes: a six-week timeline (Feb 21 &ndash; Mar 27), Thiv as
                    project owner, Faiq and Kamal as co-ops, and the three-phase execution roadmap the
                    table below is translated from directly, task by task.
                  </>
                }
              />
            </div>
          </Reveal>

          <div className="mt-10">
            <Reveal>
              <p className="text-xs font-extrabold uppercase tracking-wide mb-3" style={{ color: NAVY }}>
                Reconstructed roadmap
              </p>
            </Reveal>
            <RoadmapTable />
          </div>
        </div>
      </div>

      {/* ---------- 07: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>
              03
            </p>
            <h2 className="font-serif text-4xl text-white mt-2">Outcomes</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-3xl mb-9" style={{ color: "#cbd8e3" }}>
              This internship&apos;s usability-test results and post-launch analytics were not
              preserved, so most of the outcomes below describe what was designed, decided, and handed
              off, rather than measured percentages. The segmentation flow is the exception: it shipped.
              The numbers below describe the scope of that work, not a claimed platform-wide result.
            </p>
          </Reveal>

          <div className="mb-10">
            <StatGrid valueColor="#8fb8dc" stats={cs.metrics.map((m) => ({ value: m.value, label: m.label }))} />
          </div>

          <div className="flex flex-col gap-4">
            {cs.outcome.map((row, i) => (
              <Reveal key={row} delay={i * 70}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
                  >
                    ✓
                  </span>
                  <p className="text-base font-semibold leading-relaxed" style={{ color: "var(--ink)" }}>
                    {row}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 08: Reflection ---------- */}
      <div id="s-reflection" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              04
            </p>
            <h2 className="font-serif text-[32px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              {
                title: cs.reflection![0],
                icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
              },
              {
                title: cs.reflection![1],
                icon: <><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="12" cy="18" r="3" /><path d="M9.5 8.8L11 15.5M14.5 8.8L13 15.5M10 7h4" /></>,
              },
              {
                title: cs.reflection![2],
                icon: <path d="M4 19V9M10 19V5M16 19v-7M4 19h16" />,
              },
              {
                title: cs.reflection![3],
                icon: <path d="M4 12a8 8 0 1 1 2.5 5.8M4 12v5.5M4 12H9.5" />,
              },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="cs-box white px-6 py-7 h-full">
                  <div
                    className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2"
                    style={{ background: i % 2 === 0 ? BLUE_GRADIENT : NAVY, borderColor: "var(--ink)" }}
                  >
                    <span className="w-5 h-5 text-[#fff9ee]">
                      <Icon>{r.icon}</Icon>
                    </span>
                  </div>
                  {(() => {
                    const { title, body } = splitReflection(r.title);
                    return (
                      <>
                        <h3 className="font-serif font-bold text-xl mb-3" style={{ color: "var(--ink)" }}>
                          {title}
                        </h3>
                        <p className="text-[15.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                          {body}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="cs-box light px-6 py-6 mt-10">
            <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: NAVY }}>
              What I&apos;d improve
            </p>
            <p className="text-[15px] leading-relaxed" style={{ color: "#4c473e" }}>
              {cs.whatIdImprove}
            </p>
          </div>

          <p className="text-sm italic leading-relaxed mt-8" style={{ color: "var(--ink-soft)" }}>
            {cs.contribution} Team: {cs.team}
          </p>
        </div>
      </div>
    </div>
  );
}

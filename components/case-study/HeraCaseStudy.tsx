// Hera Fertility case study. Built from five real source artifacts audited
// during this rewrite: financial app wireframes.pdf, finacial app product
// roadmap.pdf, marketing metrics.pdf, payment plans designs.pdf, and
// Near me design.pdf. See PORTFOLIO_CASE_STUDY_SYSTEM.md for the shared
// case-study architecture this follows.
//
// NEEDS_INPUT (kept off the public page, for Kamal to confirm later):
// - Baseline/period/definition for the resume's "2x retention" and "50% less
//   onboarding drop-off" claims. No source artifact documents them, so they
//   are not rendered here.
// - Verification of the resume's "25% lower operational cost" claim from
//   moving loan servicing in-house.
// - Exact user count behind "500+ users tracked."
// - Whether formal moderated user research occurred, versus the competitive/
//   pattern research and internal review the artifacts actually document.
// - What "Upgrade to Missouri" (the roadmap's Phase 2 label) refers to.
// - Whether Phase 3 (site-wide launch) shipped before the internship ended.

import Link from "next/link";
import Image from "next/image";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import SketchPanel from "@/components/case-study/blocks/SketchPanel";
import Reveal from "@/components/Reveal";
import {
  HeraFinancingFlowMockup,
  HeraPaymentPlanMockup,
  HeraClinicSearchMockup,
  HeraClinicDetailMockup,
} from "@/components/mockups/HeraMockups";

const BLUE_GRADIENT = "linear-gradient(135deg, #6fa0c4, #1f3a52)";
const NAVY = "#1f3a52";

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
    label: "Financing flow",
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
    title: "Behaviour signal",
    synopsis:
      "Google Analytics and Looker Studio were scoped to specific flows, financing sign-up, Hera Care, and Hera Care+, instead of tracking the whole site the same way. Sessions, engagement rate, and clicks-per-page were the core signals.",
  },
  {
    title: "Interpretation",
    synopsis:
      "Channel-level and landing-page metrics (sessions, new users, average session time, engagement by channel group) showed which entry points and pages actually held attention.",
  },
  {
    title: "Product question",
    synopsis:
      "Where in the financing sign-up or clinic-discovery flow people were most likely to drop off, and which channels were worth designing for first.",
  },
  {
    title: "Feature or UX action",
    synopsis:
      "Fed into design decisions like collapsing the address step to one autofill field and deciding which clinic-discovery filters were worth finishing first.",
  },
  {
    title: "Measurement",
    synopsis:
      "The same dashboards would confirm whether a change actually moved engagement or completion, closing the loop back to signal instead of treating a redesign as a one-way bet.",
  },
];

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
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Remote (New York, NY) · Jan 2023 – Apr 2023
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                Hera&apos;s financing application ran through a third-party loan processor, and there
                was no in-house product to design the sign-up, payment, or clinic-discovery experience
                around. I designed the financing flow, a payment-plan concept grounded in competitive
                research, and the clinic-discovery experience, then planned the analytics needed to
                decide what came next.
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
              <nav className="cs-box white px-6 py-7" style={{ background: "#fffdf8" }}>
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
                  ["Google Analytics", "behaviour tracking plan"],
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
            </div>
          </SnapshotGrid>

          <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            {cs.note}
          </p>
        </div>
      </div>

      {/* ---------- 01: The product problem ---------- */}
      <div id="s-problem" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="A high-stakes decision with no in-house product to shape it">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Fertility financing is dense before a user ever sees a form: a requested amount, a
              repayment plan, and clinic pricing, decided at a moment that is already stressful.
              Hera&apos;s financing application ran entirely through Loanglide, a third-party loan
              processor, which limited how much of that experience the team could actually design.
              There was no existing in-house product to iterate from, no payment-plan presentation of
              its own, and no dedicated way for someone to find a nearby clinic and see what it would
              cost. The goal was to design all three and stand up an in-house build to replace the
              third-party dependency.
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

      {/* ---------- 02: Financing flow ---------- */}
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
        </div>
      </div>

      {/* ---------- 03: Payment plans ---------- */}
      <div id="s-payment" className="cs-seam" style={{ background: TONE_SKY }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: NAVY }}>
              Sketch to product, payment plans
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Making payment options easier to understand
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              Fertility treatment financing rarely gets presented as a clear set of comparable options.
              Before designing Hera&apos;s version, I looked at how other products, inside and outside
              fertility, presented payment choices, and used that research to pick a direction.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {[
              { title: "Boston IVF", body: "A wellness center page that groups services into package-style cards, the clearest fertility-specific precedent found.", tool: "Package cards" },
              { title: "Costco & Walmart", body: "A two-tier comparison table (Costco) and percentage-off subscription blocks (Walmart), neither matched a financing decision well.", tool: "Tiers vs. % off" },
              { title: "GoodRx Gold", body: "A single membership upsell with one clear price. Simple, but not built for comparing multiple plans side by side.", tool: "Single-tier upsell" },
              { title: "Bitly", body: "A four-tier pricing table with a clear best-value flag. The strongest match for comparing discrete payment plans.", tool: "Rated the best fit" },
            ].map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="cs-box white h-full px-5 py-6">
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5 border-2 font-serif font-bold text-sm"
                    style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
                  >
                    {i + 1}
                  </div>
                  <h4 className="font-serif font-bold text-base mb-2" style={{ color: "var(--ink)" }}>
                    {r.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {r.body}
                  </p>
                  <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: NAVY }}>
                    {r.tool}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <SketchPanel
            sketchSrc="/case-studies/hera-fertility/sketch-payment-concept.png"
            sketchAlt="Handwritten concept sketch for the Hera Fertility homepage, treatment blocks, sign-up modal, and IVF payment plan cards, annotated with design references"
            sketchCaption="The homepage concept: three treatment blocks (IVF, egg freezing, IUI), each leading to its own payment-plan page, annotated with the competitive references behind the layout."
            accent={NAVY}
            reconstructedCaption="Reconstructed concept: the treatment blocks and a three-option payment-plan layout, following the pricing-table pattern from the research above."
          >
            <HeraPaymentPlanMockup />
          </SketchPanel>

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
            reconstructedCaption="Reconstructed search results: category tags, distance sort, and clinic cards pulled straight from the filter logic in the sketch."
          >
            <HeraClinicSearchMockup />
          </SketchPanel>

          <p className="text-sm leading-relaxed mt-4 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            <span
              className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-2.5 py-1 border-2 mr-2"
              style={{ color: "var(--ink)", borderColor: "var(--ink)", background: BLUE_GRADIENT }}
            >
              Left open
            </span>
            The price-range filter is marked &ldquo;Difficult&rdquo; in the original sketch. It stayed
            in the design as a flagged, unresolved problem, since clinic pricing wasn&apos;t
            consistently available to filter against, rather than shipped as a filter that looked
            functional but wasn&apos;t.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-12 mb-4">
            <Reveal>
              <div className="cs-box white overflow-hidden">
                <div className="relative w-full bg-white" style={{ aspectRatio: "4 / 5" }}>
                  <Image
                    src="/case-studies/hera-fertility/sketch-nearme-iterations-1-2.png"
                    alt="Clinic detail page layout iterations 1 and 2, testing map size and position"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="cs-box white overflow-hidden">
                <div className="relative w-full bg-white" style={{ aspectRatio: "4 / 5" }}>
                  <Image
                    src="/case-studies/hera-fertility/sketch-nearme-iterations-3-4.png"
                    alt="Clinic detail page layout iterations 3 and 4, moving toward a compact single-column layout"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          <p className="text-[11px] font-extrabold uppercase tracking-wide mb-8" style={{ color: NAVY }}>
            Four layout passes for the clinic-detail page, moving the map and related listings until
            the page read clearly at a glance
          </p>

          <SketchPanel
            sketchSrc="/case-studies/hera-fertility/sketch-nearme-flow.png"
            sketchAlt="Handwritten clinic detail page wireframe with map, contact and pre-approval buttons, and related links"
            sketchCaption="The clinic-detail sketch: name, address, phone, hours, map, a Contact/Connect and a Get Pre-Approved button, and cross-links to the loan calculator and FAQ."
            accent={NAVY}
            reconstructedLabel="Reconstructed final layout"
            reconstructedCaption="The settled single-column layout, applied to a real clinic listing used as the working example in the original files."
          >
            <HeraClinicDetailMockup />
          </SketchPanel>

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
              Studio plan was scoped to the flows that mattered most: the financing sign-up, and the
              Hera Care and Hera Care+ paths. Analytics alone cannot prove why something happened, so
              the plan paired each signal with a specific product question it was meant to answer.
            </p>
          </Reveal>

          <Reveal>
            <div className="cs-box white overflow-hidden mb-12">
              <div className="relative w-full bg-white" style={{ aspectRatio: "4 / 3" }}>
                <Image
                  src="/case-studies/hera-fertility/sketch-ga-metrics.png"
                  alt="Handwritten Google Analytics and Looker Studio planning notes, covering general overview, audience, traffic, and behaviour metrics scoped to the financing sign-up flow"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-wide -mt-8 mb-10" style={{ color: NAVY }}>
            Original planning notes for the analytics dashboards, scoped by flow (sign-up, Hera Care,
            Hera Care+) rather than tracked generically
          </p>

          <Reveal>
            <ProcessFlow
              steps={ANALYTICS_STEPS}
              accent={NAVY}
              middleLabel="Interpretation turns signal into a question worth answering"
            />
          </Reveal>
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

            <div className="grid sm:grid-cols-3 gap-5 mt-9">
              {[
                {
                  phase: "Phase 1",
                  title: "Onto AWS",
                  items: [
                    "Request the existing loan process and API keys from Loanglide",
                    "Stand up a staging subdomain for internal testing",
                    "Upload the codebase and deploy to AWS",
                  ],
                },
                {
                  phase: "Phase 2",
                  title: "Harden for production",
                  items: [
                    "QA, documentation, and bug fixes",
                    "Implement production API keys",
                    "Bring the production API online",
                  ],
                },
                {
                  phase: "Phase 3",
                  title: "Site-wide launch",
                  items: [
                    "Roll the in-house financing app out to all users",
                  ],
                },
              ].map((p, i) => (
                <Reveal key={p.phase} delay={i * 90}>
                  <div className="cs-box white h-full px-5 py-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide mb-1" style={{ color: NAVY }}>
                      {p.phase}
                    </p>
                    <h4 className="font-serif font-bold text-lg mb-3" style={{ color: "var(--ink)" }}>
                      {p.title}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {p.items.map((it) => (
                        <li key={it} className="text-[13px] leading-relaxed flex gap-2" style={{ color: "#4c473e" }}>
                          <span style={{ color: NAVY }}>&#8226;</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-6" style={{ color: "var(--ink-soft)" }}>
              Phase 1 was where the in-house build and the third-party dependency actually met: getting
              Hera&apos;s own app onto AWS meant first getting Loanglide&apos;s existing process and
              keys, so the new build could take over what Loanglide had been running.
            </p>
          </Chapter>

          <div className="mt-14">
            <Reveal>
              <div className="cs-box white overflow-hidden">
                <div className="relative w-full bg-white" style={{ aspectRatio: "16 / 10" }}>
                  <Image
                    src="/case-studies/hera-fertility/sketch-roadmap.png"
                    alt="Handwritten execution roadmap for launching the Hera financing app, listing project owner, co-ops, timeline, and three launch phases"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
            <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: NAVY }}>
              Original roadmap: reconstructed diagram
            </p>
            <p className="text-sm leading-relaxed mt-1" style={{ color: "#4c473e" }}>
              The team&apos;s working roadmap notes, timeline, resourcing, and phased launch plan.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- 07: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-center gap-4.5 mb-8">
              <div
                className="w-[58px] h-[58px] shrink-0 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl"
                style={{ background: BLUE_GRADIENT, color: "#fff9ee", border: "3px solid var(--ink)", boxShadow: "5px 5px 0 rgba(0,0,0,0.4)" }}
              >
                03
              </div>
              <h2 className="font-serif text-4xl text-white">Outcomes</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#cbd8e3" }}>
              This internship&apos;s usability-test results and post-launch analytics were not
              preserved, so the outcomes below describe what was designed, decided, and handed off
              rather than measured percentages.
            </p>
          </Reveal>

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
            <p className="font-serif text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              04
            </p>
            <h2 className="font-serif text-[40px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
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
                  <p className="text-[15.5px] leading-relaxed font-medium" style={{ color: "var(--ink)" }}>
                    {r.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="cs-box white px-6 py-6 mt-10 max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-wide mb-2" style={{ color: NAVY }}>
              What I&apos;d improve next
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
              {cs.whatIdImprove}
            </p>
          </div>

          <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            {cs.contribution} Team: {cs.team}
          </p>
        </div>
      </div>
    </div>
  );
}

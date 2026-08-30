import Image from "next/image";
import { getCaseStudy } from "@/lib/content/case-studies";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import ProcessFlow, { type ProcessStep } from "@/components/case-study/shell/ProcessFlow";
import Reveal from "@/components/Reveal";
import {
  HeraFinancingFlowMockup,
  HeraPaymentPlanMockup,
  HeraPaymentFlowDiagram,
  HeraClinicSearchMockup,
  HeraClinicDetailMockup,
} from "@/components/mockups/HeraMockups";

/**
 * Case-study format playbook rollout (docs/redesign/11-case-study-format-playbook.md),
 * the Hera Fertility page after the Greenhouse pilot, the Chronicle V2 reference,
 * the RoomEase V2 gold standard, ForceN V2, Informatica V2, and PathPeer V2.
 * Hera currently ships on the legacy warm/paper *light* design system
 * (components/case-study/HeraCaseStudy.tsx: cs-box / --ink / blocks/*); this is
 * its rebuild on the shared dark editorial shell.
 *
 * Content is preserved from the shipped light page and the shared data file: the
 * product problem, the financing and segmentation flow, the payment-plan
 * research and decision matrix, the clinic-discovery passes, the scoped
 * analytics plan, the phased rollout roadmap, outcomes, and reflection. Nothing
 * is invented or re-measured. Per playbook section 10, Hera's reconstructed UI
 * mockups (components/mockups/HeraMockups) and the real hand-drawn source
 * sketches keep their own light grammar: they sit as light plates framed on the
 * dark field, the same way RoomEase's allocation blueprint and Chronicle's
 * period maps do, rather than being re-themed. The shell carries the layout,
 * prose, cards, tables, and the analytics process flow.
 *
 * Note on scope: the marketing half of the role is included as its own
 * caveated band, using the smaller, more reasonable resume figures (a 500+ user
 * internal reporting tool and a roughly 50% content-driven conversion lift), per
 * the user's direction. The larger resume claims (a 300% operating-efficiency
 * figure and a 100% engagement figure) stay off, since their baselines aren't
 * documented. Copy is em-dash free.
 */
const HERO_TITLE = "Designing financing and care-discovery flows for a 0-to-1 fertility platform";
const HERO_LEAD =
  "Hera's financing application ran entirely through Loanglide, a third-party loan processor, and there was no in-house product to design the sign-up, payment, or clinic-discovery experience around. I designed the financing flow, a payment-plan concept grounded in competitive research, and the clinic-discovery experience, and shipped the account-segmentation flow that routes new users into them, then used Hotjar and Google Analytics to decide what came next. Most screens here are professional reconstructions built from the real wireframes, research notes, and roadmap, since no production screens were preserved.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-scope", label: "What it covered" },
  { href: "#s-problem", label: "The product problem" },
  { href: "#s-financing", label: "Financing & segmentation" },
  { href: "#s-payment", label: "Payment plans" },
  { href: "#s-nearme", label: "Finding care nearby" },
  { href: "#s-analytics", label: "Behaviour & analytics" },
  { href: "#s-roadmap", label: "Roadmap & rollout" },
  { href: "#s-outcomes", label: "Outcomes" },
  { href: "#s-marketing", label: "Marketing & content" },
  { href: "#s-reflection", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "Product Design and Marketing intern who designed the financing, payment-plan, and clinic-discovery experience and shipped the account-segmentation flow." },
  { label: "Scope", value: "Financing prequalification flow, payment-plan concept, clinic-discovery experience, account segmentation, a scoped analytics plan, and a phased launch roadmap." },
  { label: "Team", value: "Thiv (project owner and primary stakeholder), Faiq (co-op), and Kamal (co-op), with Kamal and Thiv sharing product-management responsibility for planning and execution." },
  { label: "Tools", value: "Figma, Balsamiq, Google Analytics, Hotjar, Looker Studio, WordPress, Umso, HubSpot, Excel." },
  { label: "Core skills", value: "Fintech UX, Product Strategy, UX Research." },
];

const SCOPE_STATS = [
  { value: "4 → 1", label: "address-entry fields collapsed in the financing prequalification flow" },
  { value: "3", label: "treatment paths shipped in account segmentation (IVF, egg freezing, IUI)" },
  { value: "9", label: "competitor products and platforms audited for the payment-plan research" },
  { value: "4", label: "clinic-detail layout passes iterated for Near Me discovery" },
];

const SEGMENTATION_STEPS = [
  {
    title: "Homepage",
    body: "Three treatment entry points (IVF, egg freezing, IUI), each showing a synopsis, basic procedure, and a payment-plans call to action, modeled on Boston IVF's package layout.",
  },
  {
    title: "Create an account",
    body: "A single 'I am looking for...' selection (IVF medication, IUI, or egg freezing) captured at sign-up, alongside a promotional-email consent checkbox.",
  },
  {
    title: "Segmented experience",
    body: "New users land in the payment-plan and content path matching their selection instead of one generic flow.",
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
    call: "Direct model",
    decision: "Became the direct model for Hera's three-option, per-treatment payment-plan layout.",
  },
  {
    pattern: "FCI, Shady Grove Fertility, Alabama Fertility",
    why: "Direct fertility competitors, but their marketing pages were nearly identical to each other and none presented financing as comparable packages.",
    call: "Rejected",
    decision: "Looked outside the immediate category for a real payment-plan pattern, instead of following direct competitors.",
  },
];

const NEARME_PASSES = [
  { n: "01", title: "Map beside hours", body: "Hours of operation and a large square map sat side by side at the top of the page." },
  { n: "02", title: "Hours beside the title", body: "Moved hours of operation up next to the clinic name, giving the map a wider, shorter band beneath it." },
  { n: "03", title: "Narrower map", body: "Tightened the map's width and reduced surrounding whitespace to bring related listings higher on the page." },
  { n: "04", title: "Single column, settled", body: "Settled on a compact single-column layout with the map spanning the full width beneath the header, the version carried into the final design." },
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

const REFLECTION_CATEGORIES = ["Form", "Research", "Analytics", "Honesty"];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

/** Shared card-hover language (playbook section 6), tuned up for a prominent
 *  feedback pop: a clear lift, an accent-colored outline, a deeper shadow, and a
 *  stronger accent wash, so a card visibly responds to the cursor. */
const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.42)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_11%,var(--color-surface-2))]";

/** One deliberate typographic beat per page (playbook section 4). */
function PullQuote({ children, cite }: { children: React.ReactNode; cite?: string }) {
  return (
    <figure className="relative pl-10 md:pl-14">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 select-none"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: 0.7, color: "var(--accent-bright, var(--color-project-accent))" }}
      >
        &ldquo;
      </span>
      <blockquote
        className="text-balance"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption
          className="mt-5"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
        >
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

/** A single headline stat at display-h1 scale with the shared hairline-top and
 *  hover-wash treatment every quick-fact grid on the page uses (playbook 6). */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <p className="text-balance" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>
        {value}
      </p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
        {label}
      </p>
    </div>
  );
}

/** A resulting design decision, called out as its own accented block. */
function DecisionBlock({ title, situation, alternative, result }: { title: string; situation: string; alternative?: string; result: string }) {
  return (
    <div
      className="mt-10 px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px]"
      style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
    >
      <p className="mb-2.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
        Decision
      </p>
      <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
        {title}
      </h3>
      <p className="mb-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
        {situation}
      </p>
      {alternative && (
        <p className="mb-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
          <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Alternative: </span>
          {alternative}
        </p>
      )}
      <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
        <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Result: </span>
        {result}
      </p>
    </div>
  );
}

/** A short accent pill, for provenance labels ("Reconstructed", "Real wireframe",
 *  "Original working sketch", "Shipped"). */
function ProvenancePill({ children, solid = false }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 border"
      style={{
        fontSize: "var(--text-label)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        color: solid ? "var(--color-bg)" : "var(--accent-bright, var(--color-project-accent))",
        borderColor: "var(--accent-bright, var(--color-project-accent))",
        background: solid ? "var(--accent-bright, var(--color-project-accent))" : "transparent",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

/** A light plate: reconstructed UI mockups and hand-drawn source sketches keep
 *  their own light grammar and float on the dark field, framed and shadowed,
 *  rather than being re-themed (playbook section 10). */
function LightPlate({ children, bg = "#ffffff", className = "" }: { children: React.ReactNode; bg?: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-default)] border shadow-[0_10px_36px_rgba(0,0,0,0.4)] transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_22px_55px_rgba(0,0,0,0.55)] ${className}`}
      style={{ borderColor: "var(--color-line-strong, var(--color-line))", background: bg }}
    >
      {children}
    </div>
  );
}

/** A source image (sketch or real wireframe crop) inside a light plate. */
function PlateImage({ src, alt, aspect, maxHeight }: { src: string; alt: string; aspect: string; maxHeight?: number }) {
  return (
    <LightPlate>
      <div className="relative w-full mx-auto bg-white" style={{ aspectRatio: aspect, maxHeight }}>
        <Image src={src} alt={alt} fill className="object-contain" sizes="(min-width: 1024px) 640px, 100vw" />
      </div>
    </LightPlate>
  );
}

/** Small eyebrow + body caption under a plate, on the dark field. */
function FigureCaption({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
        {eyebrow}
      </p>
      <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
        {children}
      </p>
    </div>
  );
}

/** Splits a shared-data reflection entry ("Title sentence. Body sentence.")
 *  into its bold title and lighter body. */
function splitReflection(text: string): { title: string; body: string } {
  const splitAt = text.indexOf(". ");
  if (splitAt === -1) return { title: text, body: "" };
  return { title: text.slice(0, splitAt + 1).trim(), body: text.slice(splitAt + 2).trim() };
}

export default function HeraCaseStudyV2() {
  const cs = getCaseStudy("hera-fertility")!;

  return (
    <div
      style={
        {
          "--color-project-accent": "#3a6b93",
          "--accent-bright": "color-mix(in srgb, #3a6b93 55%, white)",
        } as React.CSSProperties
      }
    >
      {/* ---------- Cover ---------- */}
      <section style={BAND.base}>
        <Container variant="standard" className="pt-10 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            <CaseStudyHero
              company={cs.company}
              role={cs.role}
              title={HERO_TITLE}
              lead={HERO_LEAD}
              meta={`${cs.location} · ${cs.timeframe}`}
              artifacts={cs.artifacts}
            />
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>
          <p className="mt-10 text-sm italic" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
            {cs.note}
          </p>
        </Container>
      </section>

      {/* ---------- At a glance + scope metrics ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Stack variant="section">
            <Section accentLabel anchor="s-glance" label="At a glance">
              <Reveal className="mt-6">
                <CaseStudySnapshot items={SNAPSHOT_ITEMS} />
              </Reveal>
            </Section>

            <Section accentLabel anchor="s-scope" number="01" heading="What the design work covered">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                These describe the scope of the work, not claimed platform-wide results. This internship&apos;s
                usability-test results and post-launch analytics weren&apos;t preserved, so the page is scoped to what
                was designed, decided, shipped, and handed off.
              </p>
              <Grid className="mt-8">
                {SCOPE_STATS.map((s, i) => (
                  <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-3">
                    <Reveal delay={i * 80}>
                      <StatCard value={s.value} label={s.label} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- 02: The product problem ---------- */}
      <section id="s-problem" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="The product problem" heading="A high-stakes decision with no in-house product to shape it" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                Choosing how to pay for fertility treatment is not a decision most people are practiced at making: a
                requested loan amount, a repayment plan, and clinic pricing, all worked out while already navigating a
                stressful medical process. Hera&apos;s financing application ran entirely through Loanglide, a
                third-party loan processor, which limited how much of that experience the team could actually design or
                control. There was no in-house product to iterate from. The goal was to design the financing flow,
                payment-plan presentation, and clinic-discovery experience, then stand up an in-house build to replace
                the third-party dependency.
              </p>
            </div>
            <PullQuote cite="The problem, in one line">
              A stressful financial decision, routed through a third party, with no product of Hera&apos;s own to shape
              how it felt.
            </PullQuote>
          </div>

          {/* Before / in-progress strip */}
          <div className="mt-14 md:mt-16 grid md:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
            <div className={`flex flex-col justify-center px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>
                Before
              </p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                Financing routed through Loanglide, a third-party loan processor
              </p>
            </div>
            <div className="flex items-center justify-center" aria-hidden="true">
              <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontSize: "var(--text-h2)", fontFamily: "var(--font-display)" }} className="rotate-90 md:rotate-0">
                &rarr;
              </span>
            </div>
            <div className={`flex flex-col justify-center px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                In progress
              </p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                In-house financing app, designed and staged for launch on herafertility.co
              </p>
            </div>
          </div>

          <p
            className="mt-12 mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
          >
            Constraints the work had to fit inside
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(cs.constraints ?? []).map((c, i) => (
              <Reveal key={c} delay={i * 60}>
                <div
                  className={`h-full flex gap-4 items-start px-6 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
                  style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                >
                  <span
                    className="shrink-0 inline-flex w-7 h-7 items-center justify-center rounded-md border text-sm font-black mt-0.5"
                    style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))" }}
                  >
                    {i + 1}
                  </span>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- 03: Financing & segmentation ---------- */}
      <section id="s-financing" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Financing & segmentation" heading="Designing the financing flow, then shipping segmentation">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The prequalification flow went through several rounds of the same question: what is the fewest, clearest
              set of inputs a person needs to give before Hera can tell them anything useful. The address step and the
              phone and date-of-birth formatting changed the most.
            </p>
          </Section>

          <div className="mt-10 grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            <Reveal className="min-w-0">
              <LightPlate>
                <HeraFinancingFlowMockup />
              </LightPlate>
              <FigureCaption eyebrow="Reconstructed concept">
                Reconstructed step 2 of the flow: a single autofill address field, plus the masked phone and
                date-of-birth formatting from the revised wireframe.
              </FigureCaption>
            </Reveal>
            <Reveal delay={120} className="min-w-0">
              <PlateImage
                src="/case-studies/hera-fertility/sketch-financing-flow.png"
                alt="Handwritten wireframe iterations of the Get Prequalified flow, showing personal information, address entry options, and input formatting notes"
                aspect="4 / 5"
                maxHeight={360}
              />
              <FigureCaption eyebrow="Original working sketch">
                The Get Prequalified iterations: personal information, then two address-entry options, one keeping
                city, state, and ZIP as separate fields, one collapsing everything into a single autofill field.
              </FigureCaption>
            </Reveal>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {(cs.decisions ?? []).slice(0, 2).map((d, i) => (
              <Reveal key={d.decision} delay={i * 90}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <span
                    className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] border mb-3"
                    style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                    {d.decision}
                  </h3>
                  <p className="mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{d.rationale}</p>
                  {d.alternatives && (
                    <p className="mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Alternative: </span>
                      {d.alternatives}
                    </p>
                  )}
                  {d.result && (
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Result: </span>
                      {d.result}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Shipped: account creation + segmentation */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ProvenancePill solid>Shipped</ProvenancePill>
              <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>
                Account creation and treatment segmentation
              </p>
            </div>
            <p className="mb-7" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Unlike the financing wireframes above, this flow shipped. New users self-select a treatment path at
              sign-up instead of landing on one generic homepage experience.
            </p>
            <div className="grid md:grid-cols-3 gap-5 items-stretch">
              {SEGMENTATION_STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
                    <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                      Step {i + 1}
                    </p>
                    <h4 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {s.title}
                    </h4>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm flex items-start gap-3 flex-wrap" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
              <ProvenancePill>Shipped, reconstructed diagram</ProvenancePill>
              <span className="min-w-0">The flow itself shipped; this diagram reconstructs it for a clearer presentation.</span>
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- 04: Payment plans ---------- */}
      <section id="s-payment" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Payment plans" heading="Making payment options easier to understand">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Fertility treatment financing rarely gets presented as a clear set of comparable options. Before designing
              Hera&apos;s version, I ran a cited, URL-sourced audit of how other products, inside and outside fertility,
              presented payment choices, and used it to make a specific, defensible call rather than just collecting
              examples.
            </p>
          </Section>

          <div className="mt-10">
            <PlateImage
              src="/case-studies/hera-fertility/source-payment-homepage-cards.png"
              alt="Real wireframe: homepage treatment-selection cards for IVF, egg freezing, and IUI, each showing a synopsis and a payment-plans link, annotated as inspired by Boston IVF's layout"
              aspect="1320 / 600"
            />
            <FigureCaption eyebrow="Real wireframe · homepage treatment selection">
              Cropped directly from the source wireframe file: three treatment entry points (IVF, egg freezing, IUI),
              each with a synopsis and a link into its own payment-plans page, annotated in the original as inspired by
              Boston IVF&apos;s layout.
            </FigureCaption>
          </div>

          <div className="mt-10 grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            <Reveal className="min-w-0">
              <LightPlate>
                <HeraPaymentPlanMockup />
              </LightPlate>
              <FigureCaption eyebrow="Reconstructed concept">
                Reconstructed as a full working page following the source&apos;s own section order: treatment
                selection, an About IVF Treatment section, a testimonial band, a three-step How It Works section, a Get
                Started step that routes by treatment interest, and the three-option comparison with price, term, and
                what&apos;s included. Dollar amounts are illustrative; the source wireframe never specified numbers.
              </FigureCaption>
            </Reveal>
            <Reveal delay={120} className="min-w-0">
              <PlateImage
                src="/case-studies/hera-fertility/source-payment-plan-full-page.png"
                alt="Real wireframe of the treatment-specific IVF Payment Plans page: header navigation, an About IVF Treatment section, a testimonial band, a How It Works section, and three payment-plan option cards"
                aspect="445 / 1520"
                maxHeight={900}
              />
              <FigureCaption eyebrow="Real wireframe · full IVF Payment Plans page">
                The real, treatment-specific IVF Payment Plans page from the source file: About IVF Treatment, a
                testimonial band, a three-step How It Works section, and the three payment-plan option cards this
                section reconstructs in more detail.
              </FigureCaption>
            </Reveal>
          </div>

          <div className="mt-10">
            <p className="mb-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Reconstructed user flow
            </p>
            <LightPlate>
              <div className="px-5 py-5">
                <HeraPaymentFlowDiagram />
              </div>
            </LightPlate>
          </div>

          {/* Payment decision matrix, dark table */}
          <div className="mt-12">
            <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              How nine products shaped one payment-plan decision
            </p>
            <div className="overflow-x-auto rounded-[var(--radius-default)] border" style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}>
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-line)" }}>
                    {["Pattern observed", "Why it mattered", "Call", "Resulting Hera decision"].map((h) => (
                      <th key={h} className="px-5 py-3.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_MATRIX.map((row, i) => (
                    <tr
                      key={row.pattern}
                      className="transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                      style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}
                    >
                      <th scope="row" className="align-top px-5 py-4 w-[22%]" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                        {row.pattern}
                      </th>
                      <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        {row.why}
                      </td>
                      <td className="align-top px-5 py-4 whitespace-nowrap">
                        <span
                          className="inline-block rounded-full px-2.5 py-1 border text-xs"
                          style={{
                            fontWeight: 600,
                            letterSpacing: "var(--tracking-label)",
                            textTransform: "uppercase",
                            color: row.call === "Direct model" ? "var(--color-bg)" : row.call === "Borrowed" ? "var(--accent-bright, var(--color-project-accent))" : "var(--color-text-subtle)",
                            borderColor: row.call === "Rejected" ? "var(--color-line-strong, var(--color-line))" : "var(--accent-bright, var(--color-project-accent))",
                            background: row.call === "Direct model" ? "var(--accent-bright, var(--color-project-accent))" : "transparent",
                          }}
                        >
                          {row.call}
                        </span>
                      </td>
                      <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        {row.decision}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {(cs.decisions ?? []).slice(2, 3).map((d) => (
            <DecisionBlock
              key={d.decision}
              title={d.decision}
              situation={d.rationale}
              alternative={d.alternatives}
              result={d.result ?? ""}
            />
          ))}
        </Container>
      </section>

      {/* ---------- 05: Finding care nearby ---------- */}
      <section id="s-nearme" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Finding care nearby" heading="Finding care nearby">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Choosing a clinic needed to work like a real local search: filter by service, distance, and hours, then
              compare enough detail to actually decide. The detail page went through four layout passes before settling
              on a compact, single-column version.
            </p>
          </Section>

          <div className="mt-10 grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            <Reveal className="min-w-0">
              <LightPlate>
                <HeraClinicSearchMockup />
              </LightPlate>
              <FigureCaption eyebrow="Reconstructed concept">
                Reconstructed search results: category tags, distance sort, and clinic cards pulled straight from the
                filter logic in the sketch. Only Kofinas Fertility Group, New York, appears by name in the source file;
                the other clinics shown are clearly-generic representative data illustrating nationwide coverage, not
                real partner clinics.
              </FigureCaption>
            </Reveal>
            <Reveal delay={120} className="min-w-0">
              <PlateImage
                src="/case-studies/hera-fertility/sketch-nearme-flow.png"
                alt="Handwritten wireframes of the clinic search, filter panel, and clinic detail page for Near Me clinic discovery"
                aspect="4 / 5"
                maxHeight={360}
              />
              <FigureCaption eyebrow="Original working sketch">
                Search by clinic or location, a category dropdown, a filter panel for services, price range, distance,
                and hours, and a results list sorted by distance. Doctor name and a percentage rating were crossed out
                of the detail-field list.
              </FigureCaption>
            </Reveal>
          </div>

          <div
            className="mt-6 px-6 py-5 rounded-[var(--radius-default)] border border-l-[3px]"
            style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
          >
            <div className="mb-2.5"><ProvenancePill>Open design hypothesis</ProvenancePill></div>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
              The price-range filter is marked &ldquo;Difficult&rdquo; in the original sketch. It stayed in the design
              as a flagged, unresolved hypothesis, since clinic pricing wasn&apos;t consistently available to filter
              against, rather than shipped as a filter that looked functional but wasn&apos;t. It was never user-tested.
            </p>
          </div>

          {/* Original layout iterations */}
          <div className="mt-14">
            <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Original layout iterations
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <PlateImage
                src="/case-studies/hera-fertility/sketch-nearme-iterations-1-2.png"
                alt="Clinic-detail layout passes 1 and 2: a large square map beside a short hours list, then hours moved up beside the clinic title with a wider map band beneath"
                aspect="1005 / 1728"
                maxHeight={640}
              />
              <PlateImage
                src="/case-studies/hera-fertility/sketch-nearme-iterations-3-4.png"
                alt="Clinic-detail layout passes 3 and 4: a narrower map with tighter surrounding whitespace, then the settled single-column layout with a full-width map beneath the header"
                aspect="998 / 1682"
                maxHeight={640}
              />
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
              All four clinic-detail layout passes, labeled Design 1 through Design 4 in the original file. Each moved
              the map, hours, and related-listings block until pass four&apos;s compact single-column version.
            </p>
          </div>

          <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NEARME_PASSES.map((pass, i) => (
              <Reveal key={pass.n} delay={i * 70}>
                <div className={`h-full px-5 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <span
                    className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] border mb-3.5"
                    style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                  >
                    {pass.n}
                  </span>
                  <h4 className="mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                    {pass.title}
                  </h4>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{pass.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Settled reconstructed product screen */}
          <div className="mt-12">
            <p className="mb-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Reconstructed product screen
            </p>
            <LightPlate>
              <HeraClinicDetailMockup />
            </LightPlate>
            <FigureCaption eyebrow="Settled single-column layout (pass 04)">
              Applied to Kofinas Fertility Group, the real New York clinic used as the working example in the original
              files. The related-listings row mixes that same source name with clearly-generic representative clinics
              in other U.S. cities, standing in for a broader nationwide result set.
            </FigureCaption>
          </div>

          {(cs.decisions ?? []).slice(3, 4).map((d) => (
            <DecisionBlock key={d.decision} title={d.decision} situation={d.rationale} alternative={d.alternatives} result={d.result ?? ""} />
          ))}
        </Container>
      </section>

      {/* ---------- 06: Behaviour & analytics ---------- */}
      <section id="s-analytics" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="Behaviour & analytics" heading="Using behaviour to decide what to improve">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Rather than track everything on the site the same way, the Google Analytics and Looker Studio plan was
              scoped to the flows that mattered most, and paired with Hotjar session recordings so the numbers had a
              behavioural story behind them. Analytics alone cannot prove why something happened, so every signal here
              was paired with a specific product question it was meant to answer. Select a stage to see what happened
              there.
            </p>
          </Section>

          <div className="mt-10">
            <ProcessFlow steps={ANALYTICS_STEPS} rowLength={4} detailBelow middleLabel="Investigation turns a pattern into something worth proposing" />
          </div>

          <div className="mt-14 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
            <Reveal className="min-w-0">
              <PlateImage
                src="/case-studies/hera-fertility/sketch-ga-metrics.png"
                alt="Original marketing-metrics planning notes: acquisition, audience, traffic, and behaviour-and-engagement metric groups, with CAC and LTV marked as a maybe addition"
                aspect="1435 / 1509"
                maxHeight={520}
              />
              <FigureCaption eyebrow="Source notes · metrics planning">
                The original metrics-planning notes, grouped into acquisition, audience, traffic, and behaviour and
                engagement, with CAC and LTV marked &ldquo;maybe&rdquo; rather than core. The scoped plan and insight
                table are built directly from this list.
              </FigureCaption>
            </Reveal>

            <div className="min-w-0">
              <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                From signal to measured action
              </p>
              <div className="flex flex-col gap-4">
                {ANALYTICS_INSIGHTS.map((row, i) => (
                  <Reveal key={row.signal} delay={i * 60}>
                    <div className={`px-6 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)" }}>
                      <p className="mb-3" style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{row.signal}</p>
                      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                        {[
                          ["Interpretation", row.interpretation],
                          ["Product opportunity", row.opportunity],
                          ["Proposed action", row.action],
                          ["Measurement", row.measurement],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <p className="mb-1" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                              {label}
                            </p>
                            <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 07: Roadmap & rollout ---------- */}
      <section id="s-roadmap" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="07" label="Roadmap & rollout" heading="Turning the design into a phased rollout">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The design work fed into a six-week execution roadmap (Feb 21 to Mar 27), shared with Thiv, the project
              owner and primary stakeholder, and Faiq, the other co-op. Kamal and Thiv split product-management
              responsibility for planning and sequencing the rollout.
            </p>
          </Section>

          <div className="mt-10 grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">
            <Reveal className="min-w-0">
              <PlateImage
                src="/case-studies/hera-fertility/sketch-roadmap.png"
                alt="Original handwritten roadmap notes: a six-week timeline, project owner and co-op resources, the end goal, and a three-phase execution roadmap with tasks and owners"
                aspect="1435 / 1636"
                maxHeight={520}
              />
              <FigureCaption eyebrow="Source notes · roadmap">
                The original planning notes: a six-week timeline (Feb 21 to Mar 27), Thiv as project owner, Faiq and
                Kamal as co-ops, and the three-phase roadmap the table is translated from directly, task by task.
              </FigureCaption>
            </Reveal>

            <div className="min-w-0 flex flex-col gap-5">
              {ROADMAP_PHASES.map((p, i) => (
                <Reveal key={p.phase} delay={i * 80}>
                  <div className="overflow-hidden rounded-[var(--radius-default)] border" style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}>
                    <div className="flex items-center gap-3 px-6 py-4" style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-line)" }}>
                      <span
                        className="rounded-full px-3 py-1 border"
                        style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", borderColor: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}
                      >
                        {p.phase}
                      </span>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}>{p.title}</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-5 px-6 py-6">
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Objective</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.objective}</p>
                      </div>
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Owner / team</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.owner}</p>
                      </div>
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Tasks</p>
                        <ul className="flex flex-col gap-1">
                          {p.tasks.map((t) => (
                            <li key={t} className="text-sm flex gap-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                              <span style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>&#8226;</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Dependencies</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.dependencies}</p>
                      </div>
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Validation</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.validation}</p>
                      </div>
                      <div>
                        <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Outcome</p>
                        <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.outcome}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 08: Outcomes ---------- */}
      <section id="s-outcomes" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="08" label="Outcomes" heading="What was designed, decided, and shipped">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              This internship&apos;s usability-test results and post-launch analytics were not preserved, so most of the
              outcomes below describe what was designed, decided, and handed off, rather than measured percentages. The
              segmentation flow is the exception: it shipped. The numbers describe the scope of that work, not a claimed
              platform-wide result.
            </p>

            <Grid className="mt-8">
              {SCOPE_STATS.map((s, i) => (
                <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-3">
                  <Reveal delay={i * 70}>
                    <StatCard value={s.value} label={s.label} />
                  </Reveal>
                </div>
              ))}
            </Grid>

            <ul className="mt-12 flex flex-col">
              {cs.outcome.map((row, i) => (
                <li key={row} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                  <Reveal
                    delay={i * 60}
                    className="flex items-start gap-4 -mx-3 px-3 py-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                  >
                    <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>✓</span>
                    <span style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>{row}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Section>
        </Container>
      </section>

      {/* ---------- 09: Marketing side of the role ---------- */}
      <section id="s-marketing" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="09" label="Marketing & content" heading="The marketing half of the role" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                Product design was one side of a Product Design and Marketing role. The other was marketing analytics and
                content: I built internal reporting and marketing tooling in Looker Studio and Excel, and produced blog and
                quiz content aimed at bringing the right users into the funnel the design work was shaping.
              </p>
            </div>

            <div
              className="px-6 py-7 md:px-8 md:py-8 rounded-[var(--radius-default)] border border-l-[3px]"
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
            >
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                From the internship performance summary
              </p>
              <p className="mb-6" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                These figures are reported for the internship period from a separate performance summary, alongside the
                marketing work, rather than re-measured for this case study.
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>500+</p>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    users supported by an automated internal reporting tool for clinics, built in Looker Studio and Excel
                    to improve data accuracy and reporting speed.
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>~50%</p>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    increase in website traffic and conversions from the blogs and quizzes produced during the internship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Reflection ---------- */}
      <section id="s-reflection" style={BAND.baseBordered}>
        <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Reflection
          </p>
          <h2 className="mt-2 mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
            What building this actually taught me
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {(cs.reflection ?? []).map((entry, i) => {
              const { title, body } = splitReflection(entry);
              return (
                <Reveal key={title} delay={i * 80}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                      {REFLECTION_CATEGORIES[i] ?? "Reflection"}
                    </p>
                    <h3 className="mt-3 mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {cs.whatIdImprove && (
            <div
              className="mt-10 px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px]"
              style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
            >
              <p className="mb-2.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                What I&apos;d improve next
              </p>
              <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>{cs.whatIdImprove}</p>
            </div>
          )}

          <div className="mt-12 pt-8 grid md:grid-cols-2 gap-x-14 gap-y-6" style={{ borderTop: "1px solid var(--color-line)" }}>
            <div>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                My contribution
              </p>
              <p className="text-sm italic" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
                {cs.contribution}
              </p>
            </div>
            <div>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                Team
              </p>
              <p className="text-sm italic" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
                {cs.team}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

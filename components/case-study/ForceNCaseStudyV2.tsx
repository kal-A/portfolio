import { getCaseStudy } from "@/lib/content/case-studies";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import ForceNWorkflowDiagramV2 from "@/components/case-study/ForceNWorkflowDiagramV2";
import Reveal from "@/components/Reveal";

/**
 * Case-study format playbook rollout (docs/redesign/11-case-study-format-playbook.md),
 * the ForceN page after the approved Greenhouse pilot, the Chronicle V2
 * reference implementation, and the RoomEase V2 gold standard. ForceN currently
 * ships on the legacy warm/paper *light* design system
 * (components/case-study/ForceNCaseStudy.tsx: cs-box / --ink / blocks/*); this
 * is its rebuild on the shared dark editorial shell so it matches Greenhouse,
 * Chronicle, and RoomEase instead of being a one-off visual world.
 *
 * Content is preserved from the shipped light page and the shared data file
 * verbatim (strategy, the three production/replenishment decisions, the
 * documentation hub, additional responsibilities, results, and reflection) —
 * nothing is invented or re-measured here. ForceN is a systems/operations case
 * study with no walkthrough videos, so the page carries no VideoRow; its
 * centrepiece is the reconstructed production-and-fulfilment workflow diagram,
 * re-themed onto the token set with the RoomEase floating-popover interaction
 * (ForceNWorkflowDiagramV2).
 *
 * Per playbook §10 the bespoke SVG workflow diagram keeps its own grammar
 * (shape carries meaning) — only the shell and layout around it, and the
 * diagram's own fills/strokes, move onto the token system this pass.
 */
const HERO_TITLE = "An inventory-backed production system for ForceN's Dev Systems";

/** Page-local "what I'd improve next" — a genuine forward-looking enhancement,
 *  rather than the shared data file's `whatIdImprove`, which reads as a
 *  confidentiality disclaimer (already covered by `cs.note`). Framed as the next
 *  step to add, not something done differently: AI workflows firing the
 *  order-triggered actions the moment an order lands, with a human in the loop
 *  for the exceptions. Capability-first (agentic AI workflows) rather than a
 *  named low-code tool, which dates faster and reads narrower. Ties back to
 *  "automation earns its place after the process is proven". */
const WHAT_ID_IMPROVE =
  "The natural next step is an agentic AI-workflow layer that reacts the moment an order is placed — automatically firing the order and build triggers, allocating the unit, and posting the finished-inventory deductions instead of routing each of those steps by hand. It keeps a human in the loop for the exceptions, so the automation carries the common path without giving up control where a person's judgment still matters.";
const HERO_LEAD =
  "ForceN wanted its standard Dev Systems to stop being built from zero on every order and become a real product line: produced ahead of demand, held in finished inventory, and ready to ship the moment an order arrived. As the product engineering intern I owned the end-to-end operating roadmap — connecting parts planning, procurement, assembly, calibration, documentation, finished-product inventory, and fulfilment into one repeatable model — and coordinated 14+ hardware units across 6+ stakeholders in engineering, operations, and inventory. Internal trackers and company-specific materials are confidential, so this page reconstructs the same workflow logic in a public-safe form.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes", label: "What it delivered" },
  { href: "#s-workflow", label: "The workflow" },
  { href: "#s-strategy", label: "Strategy" },
  { href: "#s-decisions", label: "Production logic" },
  { href: "#s-docs", label: "Documentation" },
  { href: "#s-more", label: "Additional work" },
  { href: "#s-reflection", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "Product engineering intern — owned the end-to-end Dev System production and fulfilment roadmap." },
  { label: "Scope", value: "Parts planning, procurement, assembly, calibration, documentation, finished-product inventory, and fulfilment." },
  { label: "Coordination", value: "14+ hardware units, 6+ stakeholders across engineering, operations, and inventory." },
  { label: "Tools", value: "Arena (part & config records), Confluence (process docs), Onshape (assembly context), Python (calibration scripts)." },
  { label: "Core skills", value: "Product Operations, Hardware Workflow, Process Design." },
];

const RESULT_STATS = [
  { value: "35%", label: "faster turnaround on the Dev System transfer workflow" },
  { value: "25%", label: "fewer assembly errors" },
  { value: "30%", label: "better on-time delivery" },
  { value: "30%", label: "higher delivery efficiency across eng, ops, inventory" },
  { value: "14+", label: "hardware units coordinated end to end" },
  { value: "6+", label: "cross-functional stakeholders aligned" },
];

const CONSTRAINTS = [
  "Internal trackers, calibration materials, scripts, and company-specific records are confidential. This write-up reconstructs the same process logic in a public-safe form.",
  "The production system had to connect demand, component availability, assembly, quality, and replenishment — not just one stage in isolation.",
  "No dedicated tracking system was in place. Any fix had to work within tools the team already used.",
];

const DECISIONS = [
  {
    letter: "A",
    title: "Standard configurations as repeatable products",
    context:
      "ForceN wanted Dev Systems to support a greater share of orders instead of treating most incoming work as a custom configuration.",
    decision:
      "Define repeatable configuration paths with known parts, assembly requirements, calibration procedures, and finished-inventory records.",
    result: "Product configuration connected to a repeatable production and inventory process.",
  },
  {
    letter: "B",
    title: "Replenishment triggered by actual usage",
    context:
      "A future build could be delayed even with a clear roadmap if a required component wasn't in stock.",
    decision:
      "Connect part deductions to minimum-stock checks so status is evaluated after component use, before the next build is blocked.",
    result: "Component availability became part of the production logic, not a separate reactive activity.",
  },
  {
    letter: "C",
    title: "Calibration as a gate with a rework loop",
    context: "A failed calibration couldn't be treated as an undefined exception.",
    decision:
      "An explicit route from failed calibration back to assembly for correction and re-testing; only passing units proceed to lamination.",
    result: "Quality failures became part of the planned model, not ad hoc interruptions.",
  },
];

const DOC_INPUTS = [
  { title: "Arena part references", body: "Exact part numbers and BOM entries for the configuration." },
  { title: "Assembly work instructions", body: "The build sequence and validation steps for each unit." },
  { title: "Calibration scripts", body: "Configuration-specific test procedures and acceptance criteria." },
  { title: "Inventory + QA + handoff records", body: "Traceability, release documentation, and ownership at each stage." },
];

const ADDITIONAL_WORK = [
  {
    index: "01",
    title: "Sensor calibration",
    body: "Calibrated sensors across multiple Dev System configurations, applying the right setup and validation process for each unit.",
    tool: "Calibration equipment",
  },
  {
    index: "02",
    title: "Calibration scripts",
    body: "Worked with scripts validating sensor performance: running, parameterizing, and checking output against expected results.",
    tool: "Python",
  },
  {
    index: "03",
    title: "Assembly work instructions",
    body: "Created and maintained documentation connecting parts, Arena references, assembly sequence, and validation steps.",
    tool: "Confluence",
  },
  {
    index: "04",
    title: "Web design input",
    body: "Contributed product and design input to ForceN's web experience, helping communicate the product more clearly.",
    tool: "Product messaging",
  },
];

const REFLECTION_CARDS = [
  {
    category: "Systems",
    title: "Systems thinking beats step-by-step thinking",
    body: "Looking at any single stage in isolation — assembly, calibration, shipping — made each one look fine. It was only mapping the full system, end to end, that showed where it actually broke.",
  },
  {
    category: "Coordination",
    title: "Coordination across functions is a shared-language problem",
    body: "Engineering, operations, and inventory each had their own definition of “ready.” The roadmap only worked once those definitions were forced to agree at every handoff.",
  },
  {
    category: "Automation",
    title: "Automation earns its place after the process is proven",
    body: "The inventory threshold check and the replenishment trigger were designed and run manually first. Automating a process no one had validated yet would have just automated the wrong thing.",
  },
  {
    category: "Design for failure",
    title: "The roadmap survived because it was allowed to fail first",
    body: "The calibration rework loop exists because failure was designed into the model as a normal path, not treated as an exception to route around later.",
  },
  {
    category: "Learning fast",
    title: "You don't need a mechanical background to fix a mechanical process",
    body: "I came into ForceN's hardware and calibration workflow without a mechanical engineering background. The roadmap didn't need me to redesign the sensors — it needed the handoffs between people, parts, and steps to be traceable. That was a systems problem I could learn fast.",
  },
  {
    category: "Traceability",
    title: "Traceability only pays off if it outlives you",
    body: "A UID tied to a calibration record is only useful if the next person inherits it correctly. Writing the documentation so a future co-op could pick up the process without me was part of the actual deliverable, not an afterthought once the roadmap worked.",
  },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

/** Shared card-hover language from the Chronicle reference (playbook §6):
 *  lift + soft shadow + faint accent-tinted wash, for otherwise-static
 *  fact cards so they don't read as inert next to the page's real controls. */
const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.28)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_6%,var(--color-surface-2))]";

/** One deliberate typographic beat per page (playbook §4): a single strong
 *  line lifted to display scale with a large pale accent quotation mark. */
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

/** A single headline stat rendered at display-h1 scale with the shared
 *  hairline-top + hover-wash treatment every quick-fact grid on the page uses
 *  (playbook §6), so the results row stays part of one tactile language. */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>
        {value}
      </p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
        {label}
      </p>
    </div>
  );
}

/** The small "Reconstructed" provenance chip the legacy page carried under its
 *  diagram, moved onto the token set. */
function ReconstructedNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-sm flex items-start gap-3 flex-wrap" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
      <span
        className="shrink-0 rounded-full px-3 py-1 border"
        style={{
          fontSize: "var(--text-label)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          color: "var(--accent-bright, var(--color-project-accent))",
          borderColor: "var(--accent-bright, var(--color-project-accent))",
        }}
      >
        Reconstructed
      </span>
      <span className="min-w-0">{children}</span>
    </p>
  );
}

export default function ForceNCaseStudyV2() {
  const cs = getCaseStudy("forcen")!;
  const accent = "#d9871f";

  return (
    <div
      style={
        {
          "--color-project-accent": accent,
          "--accent-bright": `color-mix(in srgb, ${accent} 55%, white)`,
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
              media={{ src: "/case-studies/forceN/homepage-hero.png", alt: "ForceN's Dev Systems product line", position: "center 40%" }}
            />
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>
        </Container>
      </section>

      {/* ---------- At a glance + Outcome metrics ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Stack variant="section">
            <Section accentLabel anchor="s-glance" label="At a glance">
              <Reveal className="mt-6">
                <CaseStudySnapshot items={SNAPSHOT_ITEMS} />
              </Reveal>
            </Section>

            <Section accentLabel anchor="s-outcomes" number="01" heading="What the roadmap delivered">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                The roadmap connected product configuration, component availability, production, quality, and finished
                inventory into one repeatable operating model — reducing dependence on order-triggered production.
              </p>
              <Grid className="mt-8">
                {RESULT_STATS.map((s, i) => (
                  <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-4">
                    <Reveal delay={i * 70}>
                      <StatCard value={s.value} label={s.label} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- 02: The workflow (diagram) ---------- */}
      {/* The header and provenance note sit in the standard band (aligned with
          every other section); the diagram itself breaks out to the wider `page`
          container as a deliberate, symmetric wide figure — the two-system chart
          is genuinely wide (~2200px intrinsic), so a wider centred plate keeps
          node labels legible instead of shrinking them to fit a 1280 column. */}
      <section id="s-workflow" style={BAND.baseBordered}>
        <Container variant="standard" className="pt-16 md:pt-20">
          <Section
            accentLabel
            number="02"
            label="Reconstructed workflow, two connected systems"
            heading="How a Dev System moves from configuration to a shipped order"
          >
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Stock production builds standard configurations ahead of demand. Customer fulfilment draws from finished
              inventory instead of triggering a new build, and only creates a production requirement when the requested
              configuration isn&apos;t already on the shelf. Shape carries the meaning — rectangle is a process, diamond
              a decision, cylinder a data store, document a record, and a double border an automated step.
            </p>
          </Section>
        </Container>

        <Container variant="page" className="mt-10">
          <ForceNWorkflowDiagramV2 />
        </Container>

        <Container variant="standard" className="pb-16 md:pb-20">
          <ReconstructedNote>
            Rebuilt from the internal Dev System production and fulfilment process. Node positions are computed at render
            time, so the layout can never drift out of sync with the logic. Every node is clickable; details open in a
            floating panel next to it.
          </ReconstructedNote>
        </Container>
      </section>

      {/* ---------- 03: Strategy ---------- */}
      <section id="s-strategy" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="03" label="Strategy" heading="From build-to-order to inventory readiness" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                ForceN wanted Dev Systems to become the standardized, off-the-shelf product line: configurations built{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 600 }}>before</span> an order arrived, held in
                finished inventory, and ready to ship the moment one did. The roadmap wasn&apos;t only about moving a
                unit between teams — it had to make a standard configuration producible, testable, stockable, and ready
                to fulfil an order without restarting the process from zero.
              </p>
            </div>
            <PullQuote cite="The shift, in one line">
              An order should ship from a finished shelf, not start a build from zero.
            </PullQuote>
          </div>

          {/* Before → after strip */}
          <div className="mt-14 md:mt-16 grid sm:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
            <div
              className={`px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
            >
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>
                Before
              </p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                Order arrives → build starts from zero
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>
              <span className="text-3xl font-black">→</span>
            </div>
            <div
              className={`px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
              style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
            >
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                Now
              </p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                Order arrives → ship from the finished shelf
              </p>
            </div>
          </div>

          <p
            className="mt-12 mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
          >
            Constraints the roadmap had to work within
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {CONSTRAINTS.map((c, i) => (
              <Reveal key={c} delay={i * 80}>
                <div
                  className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
                  style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                >
                  <span
                    className="inline-flex w-7 h-7 items-center justify-center rounded-md border mb-4 text-sm font-black"
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

      {/* ---------- 04: Production & replenishment decisions ---------- */}
      <section id="s-decisions" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Production logic" heading="Designing the production and replenishment logic" />
          <div className="mt-8">
            <PullQuote>
              Three decisions turned the roadmap from a diagram into an operating model that could absorb a failed
              calibration or a low part count without stalling the whole line.
            </PullQuote>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {DECISIONS.map((d, i) => (
              <Reveal key={d.letter} delay={i * 90}>
                <div
                  className={`h-full px-6 py-7 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                  style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
                >
                  <span
                    className="inline-flex w-10 h-10 items-center justify-center rounded-[10px] border mb-4"
                    style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                  >
                    {d.letter}
                  </span>
                  <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                    {d.title}
                  </h3>
                  <p className="mb-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    {d.context}
                  </p>
                  <p className="mb-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Decision: </span>
                    {d.decision}
                  </p>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Result: </span>
                    {d.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- 05: Documentation ---------- */}
      <section id="s-docs" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Documentation" heading="A roadmap only works when someone else can run it">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Each step needed more than a status label. It needed the correct part references, work instructions,
              calibration procedure, quality record, inventory transaction, and ownership information — so the process
              could be repeated across teams and continued by future employees.
            </p>

            {/* Doc hub: a central configuration package fed by four record types. */}
            <div className="mt-10 grid lg:grid-cols-[1fr_1.15fr_1fr] gap-5 items-stretch">
              <div className="flex flex-col gap-5">
                {DOC_INPUTS.slice(0, 2).map((doc) => (
                  <div
                    key={doc.title}
                    className={`flex-1 px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
                    style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                  >
                    <p className="mb-1.5" style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{doc.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{doc.body}</p>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col items-center justify-center text-center px-6 py-10 rounded-[var(--radius-default)] border-2"
                style={{ background: "color-mix(in srgb, var(--color-project-accent) 10%, var(--color-surface-1))", borderColor: "var(--accent-bright, var(--color-project-accent))" }}
              >
                <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                  Configuration package
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
                  Dev System configuration
                </p>
                <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  The complete public-safe reference set every unit is built, tested, and released against.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                {DOC_INPUTS.slice(2, 4).map((doc) => (
                  <div
                    key={doc.title}
                    className={`flex-1 px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
                    style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                  >
                    <p className="mb-1.5" style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{doc.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{doc.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 06: Additional work ---------- */}
      <section id="s-more" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="Additional work" heading="Additional product engineering responsibilities">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              These supported the wider Dev System work — not all separate case studies on their own, but part of what
              kept the production line moving.
            </p>

            <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ADDITIONAL_WORK.map((r, i) => (
                <Reveal key={r.index} delay={i * 70}>
                  <div
                    className={`relative h-full px-5 py-6 rounded-[var(--radius-default)] border overflow-hidden ${CARD_HOVER}`}
                    style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-4"
                      style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: 1, color: "var(--color-line-strong, var(--color-line))", opacity: 0.5 }}
                    >
                      {r.index}
                    </span>
                    <h3 className="relative mb-2 pr-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {r.title}
                    </h3>
                    <p className="relative text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      {r.body}
                    </p>
                    <p className="relative mt-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                      {r.tool}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Reflection ---------- */}
      <section id="s-reflection" style={BAND.tint}>
        <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Reflection
          </p>
          <h2 className="mt-2 mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
            What building this actually taught me
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REFLECTION_CARDS.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                    {r.category}
                  </p>
                  <h3 className="mt-3 mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                    {r.title}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div
            className="mt-10 px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px]"
            style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
          >
            <p className="mb-2.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              What I&apos;d improve next
            </p>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>{WHAT_ID_IMPROVE}</p>
          </div>

          {cs.note && (
            <p className="mt-10 text-sm italic" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
              {cs.note}
            </p>
          )}
        </Container>
      </section>
    </div>
  );
}

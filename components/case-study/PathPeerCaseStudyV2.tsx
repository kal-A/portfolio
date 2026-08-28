import { getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import ProcessFlow, { type ProcessStep } from "@/components/case-study/shell/ProcessFlow";
import Reveal from "@/components/Reveal";

/**
 * Case-study format playbook rollout (docs/redesign/11-case-study-format-playbook.md),
 * the PathPeer page after the Greenhouse pilot, the Chronicle V2 reference, the
 * RoomEase V2 gold standard, ForceN V2, and Informatica V2. PathPeer currently
 * ships on the legacy warm/paper *light* design system
 * (components/case-study/PathPeerCaseStudy.tsx: cs-box / --ink / blocks/*); this
 * is its rebuild on the shared dark editorial shell.
 *
 * Content is preserved from the shipped light page and the shared data file: the
 * analytics-and-recordings friction loop, the pattern-to-plan chain, the five
 * product improvements, the earlier internship contributions and their separate
 * performance figures, the no-code validation rationale, outcomes, and
 * reflection. Nothing is invented or re-measured. This is a research/strategy
 * case study with a single live product screenshot (the landing page) and no
 * walkthrough videos or bespoke SVG diagram, so it carries no VideoRow and no
 * re-themed diagram; its two process flows use the shell ProcessFlow
 * (detailBelow), and everything else is token cards.
 *
 * Structurally closest to Informatica V2 (research-strategy: StatCard,
 * DecisionBlock, ReconstructedNote, two ProcessFlows), but its reflection uses
 * the richer RoomEase two-tier (category + title + body) treatment rather than
 * Informatica's flat paragraphs, since PathPeer's reflection was the section
 * flagged for a rebuild. Copy is written without em dashes per the user's
 * standing preference.
 */
const HERO_TITLE = "Turning session recordings into a prioritized feature plan";
const HERO_LEAD =
  "PathPeer helped users explore career paths and find professionals they could connect with as mentors, for networking, advice, and guidance. I designed and built the platform as one of its two developers and designers on Bubble.io, across search, mentor discovery, and shortlisting. Once it was live, the open question was no longer whether people were using it, but where they were getting stuck. Google Analytics showed where engagement dropped; Hotjar recordings showed what was actually happening at those points. As the team's de facto product manager, I used both to recommend what to fix first, turned the strongest patterns into scoped feature plans, and validated smaller ideas in Bubble.io before asking for development time.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes-top", label: "What it moved" },
  { href: "#s-friction", label: "Finding friction" },
  { href: "#s-plan", label: "Pattern to plan" },
  { href: "#s-improvements", label: "Product improvements" },
  { href: "#s-additional", label: "Earlier contributions" },
  { href: "#s-nocode", label: "No-code execution" },
  { href: "#s-outcomes", label: "Outcomes" },
  { href: "#s-reflection", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "One of two developers and designers, and the team's de facto product manager on feature planning and prioritization." },
  { label: "Scope", value: "Mentor search, discovery, shortlisting, and tagging, plus the analytics-to-feature-plan loop that decided what to build next." },
  { label: "Team", value: "A small, resource-constrained team. Search, discovery, shortlisting, tagging, and no-code execution all fit inside two people's time." },
  { label: "Tools", value: "Google Analytics, Hotjar, Figma, Bubble.io." },
  { label: "Core skills", value: "Product Management, UX Research, Behavioural Analytics, No-Code Development." },
];

const RESULT_STATS = [
  { value: "50%", label: "increase in user engagement (internship period)" },
  { value: "40%", label: "reduction in inactive-user drop-off (internship period)" },
];

const FRICTION_STEPS: ProcessStep[] = [
  {
    title: "Observe",
    synopsis:
      "Reviewed how users interacted with search and which mentors they shortlisted, then used Google Analytics to see where engagement dropped across those flows.",
  },
  {
    title: "Identify friction",
    synopsis:
      "Reviewed hundreds of Hotjar session recordings on a recurring, weekly basis, watching the ones matching those drop-off points to see the behavior behind the numbers, not just the number itself.",
  },
  {
    title: "Form hypothesis",
    synopsis:
      "Turned the observed search and shortlisting behavior into a specific explanation for why users were struggling to find or commit to a mentor match.",
  },
  {
    title: "Define feature",
    synopsis:
      "Translated the strongest patterns into a concrete product idea, like a discovery tag or a homepage flow for new mentors, instead of a general redesign.",
  },
  {
    title: "Prioritize",
    synopsis: "Weighed each candidate idea against how many users it touched and how much effort it would take to plan and build.",
  },
  {
    title: "Measure",
    synopsis: "Validated smaller ideas in Bubble.io, then went back to Analytics and Hotjar to check whether the behavior actually moved.",
  },
];

const PLAN_STEPS: ProcessStep[] = [
  {
    title: "Behavior pattern",
    synopsis: "What Analytics and Hotjar showed at a specific step, before any interpretation was applied to it.",
  },
  {
    title: "Product problem",
    synopsis: "Why that behavior mattered to the platform's goals, not just that it happened.",
  },
  {
    title: "Feature definition",
    synopsis: "The smallest change that would address the problem, scoped tightly enough to actually build.",
  },
  {
    title: "Delivery plan",
    synopsis: "What it would take to build and ship: Bubble.io validation first, then development time if it held up.",
  },
];

const NOCODE_REASONS = [
  {
    title: "Faster validation",
    body: "Tested whether an idea like a new discovery tag or homepage flow actually helped before scoping full development.",
  },
  {
    title: "Lower overhead",
    body: "No environment setup or deployment needed to try an idea in Bubble.io.",
  },
  {
    title: "Quicker iteration",
    body: "Adjusted a flow directly instead of filing a new ticket for every tweak.",
  },
  {
    title: "Evidence before investment",
    body: "Development time went to ideas that had already shown they worked.",
  },
];

const ADDITIONAL_CONTRIBUTIONS = [
  {
    title: "Student profile timeline page",
    body: "Designed and built a timeline view of a student's profile in Figma and Bubble.io, as part of improving the profile experience around mentor discovery.",
  },
  {
    title: "Admin dashboard expansion",
    body: "Added useful user information to the admin dashboard to improve visibility and day-to-day workflow for the team managing the platform.",
  },
  {
    title: "Mentor-search filtering",
    body: "Improved mentor-search filtering, including how the remaining, still-available mentors were surfaced once a filter had narrowed the list.",
  },
];

const LEGACY_METRICS = [
  { value: "20%", label: "increase in user engagement, reported alongside the discovery and profile work" },
  { value: "25%", label: "decrease in bounce rate, reported for the same period of work" },
  { value: "30%", label: "increase in usability and overall efficiency, for the expanded admin dashboard" },
  { value: "50%", label: "improvement in search functionality, reported alongside the search-matching and filtering work" },
];

/** The reflection cards, each split into a short category, a bold title, and a
 *  lighter body from the shared data file's `reflection` entries (which are
 *  written as "Title sentence. Body sentence."). The two-tier hierarchy matches
 *  the RoomEase V2 gold standard rather than the flatter Informatica variant,
 *  since PathPeer's ending was the section flagged for a rebuild. Categories
 *  label each reflection's theme; titles and bodies are verbatim from `cs`. */
const REFLECTION_CATEGORIES = ["Evidence", "Planning", "No-code", "Measurement"];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

/** Shared card-hover language from the Chronicle reference (playbook section 6):
 *  lift, soft shadow, and a faint accent-tinted wash for otherwise-static cards. */
const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.28)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_6%,var(--color-surface-2))]";

/** One deliberate typographic beat per page (playbook section 4): a single
 *  strong line lifted to display scale with a large pale accent quotation mark. */
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
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>
        {value}
      </p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
        {label}
      </p>
    </div>
  );
}

/** A resulting design/execution decision, called out as its own accented block:
 *  the same treatment as the RoomEase "what I'd improve" box, reused per section
 *  so each decision reads as a distinct beat rather than another prose card. */
function DecisionBlock({ title, situation, result }: { title: string; situation: string; result: string }) {
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
      <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
        <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Result: </span>
        {result}
      </p>
    </div>
  );
}

/** The small "Reconstructed" provenance chip the legacy page carried under its
 *  diagrams, moved onto the token set. */
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

/** Splits a shared-data reflection entry ("Title sentence. Body sentence.")
 *  into its bold title and lighter body, the same split the light page used. */
function splitReflection(text: string): { title: string; body: string } {
  const splitAt = text.indexOf(". ");
  if (splitAt === -1) return { title: text, body: "" };
  return { title: text.slice(0, splitAt + 1).trim(), body: text.slice(splitAt + 2).trim() };
}

export default function PathPeerCaseStudyV2() {
  const cs = getCaseStudy("pathpeer")!;
  const accent = caseStudyTheme.pathpeer.accent;

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
              media={{
                src: "/case-studies/pathpeer/pathpeer-hero-home.png",
                alt: "PathPeer's live landing page, where a student asks a mentor how to prepare for a software engineering interview",
                position: "top",
              }}
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

            <Section accentLabel anchor="s-outcomes-top" number="01" heading="What the loop helped move">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                Both figures are platform-wide results reported for the internship period, not the analytics-and-recordings
                loop in isolation. The loop shaped which iterative changes went into that period; it wasn&apos;t the sole
                driver of either number.
              </p>
              <Grid className="mt-8">
                {RESULT_STATS.map((s, i) => (
                  <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-6">
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

      {/* ---------- 02: Finding friction ---------- */}
      <section id="s-friction" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="Finding friction" heading="Finding friction in real behavior" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                Once PathPeer was live, Google Analytics could show that a step in search or mentor discovery was leaking
                users, but not why. So I reviewed hundreds of Hotjar session recordings on a recurring, weekly basis,
                watching the ones matching those drop-off points to see the behavior behind the number. That was what
                turned a drop in the metrics into a specific hypothesis, and then a scoped or shipped change.
              </p>
            </div>
            <PullQuote cite="Where the loop starts">
              Analytics told me where. Hotjar told me why. I stopped trusting a drop-off number until I had watched the
              sessions behind it.
            </PullQuote>
          </div>

          {/* Constraints the loop ran inside: a full-width strip so the process
              flow below can take the whole band. */}
          <p
            className="mt-14 md:mt-16 mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
          >
            Constraints the loop ran inside
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {(cs.constraints ?? []).map((c, i) => (
              <Reveal key={c} delay={i * 70}>
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

          <div className="mt-12">
            <span
              className="inline-block mb-4 rounded-full px-3 py-1 border"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", borderColor: "var(--accent-bright, var(--color-project-accent))" }}
            >
              Reconstructed workflow
            </span>
            <p className="mb-6" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              How a drop in the numbers became a shipped or scoped change, end to end. Select a stage to see what
              happened there.
            </p>
            <ProcessFlow steps={FRICTION_STEPS} rowLength={3} detailBelow middleLabel="A hypothesis only matters once it is scoped into something buildable" />
          </div>
        </Container>
      </section>

      {/* ---------- 03: Pattern to plan ---------- */}
      <section id="s-plan" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Pattern to plan" heading="From a pattern to a plan worth building">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Spotting friction in search or shortlisting was only half the loop. Each pattern still had to become
              something specific enough to build. I kept every candidate idea moving through the same chain, so a hunch
              from a recording couldn&apos;t skip straight into development without being scoped first.
            </p>
          </Section>

          <div className="mt-10">
            <ProcessFlow steps={PLAN_STEPS} rowLength={4} detailBelow middleLabel="" />
          </div>

          <DecisionBlock
            title="Scope every pattern into a defined feature before spending development time on it"
            situation="Not every pattern justified a full development cycle. Some resolved with a smaller design change validated directly in Bubble.io; others became scoped feature requests with enough definition to move into a build."
            result="A hunch from a recording never skipped straight into development. Each idea proved out as the smallest change that addressed the confirmed problem, which is what the five improvements below came out of."
          />
        </Container>
      </section>

      {/* ---------- 04: Five product improvements ---------- */}
      <section id="s-improvements" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Product improvements" heading="Five product improvements from the loop">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Each of these started as a specific behavior pattern in Analytics or Hotjar, not a general redesign idea.
              Every one moved through the same observed-behavior-to-plan chain above before it became a shipped change or
              a scoped request.
            </p>

            <div className="mt-9 grid md:grid-cols-2 gap-5">
              {(cs.decisions ?? []).map((d, i, arr) => {
                const isConcludingOdd = arr.length % 2 === 1 && i === arr.length - 1;
                const letter = String.fromCharCode(65 + i);
                const badge = (
                  <span
                    className="shrink-0 inline-flex w-9 h-9 items-center justify-center rounded-[10px] border"
                    style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                  >
                    {letter}
                  </span>
                );
                const body = (
                  <>
                    <p className="mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      {d.rationale}
                    </p>
                    {d.alternatives && (
                      <p className="mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Considered: </span>
                        {d.alternatives}
                      </p>
                    )}
                    {d.result && (
                      <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Result: </span>
                        {d.result}
                      </p>
                    )}
                  </>
                );

                if (isConcludingOdd) {
                  return (
                    <Reveal key={d.decision} delay={i * 80} className="md:col-span-2">
                      <div
                        className={`h-full px-6 py-6 rounded-[var(--radius-default)] border md:flex md:items-start md:gap-9 ${CARD_HOVER}`}
                        style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                      >
                        <div className="md:w-[260px] md:shrink-0 mb-4 md:mb-0">
                          <div className="flex items-center gap-3 mb-3">{badge}</div>
                          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                            {d.decision}
                          </h3>
                        </div>
                        <div className="md:flex-1 md:min-w-0">{body}</div>
                      </div>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={d.decision} delay={i * 80}>
                    <div
                      className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`}
                      style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {badge}
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                          {d.decision}
                        </h3>
                      </div>
                      {body}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 05: Earlier contributions + separate figures ---------- */}
      <section id="s-additional" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Earlier contributions" heading="Contributions from the same role">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Alongside the analytics-and-recordings loop, I carried these contributions during the internship, drawn
              from the original role summary rather than from a specific Analytics or Hotjar finding.
            </p>

            <div className="mt-9 grid md:grid-cols-3 gap-5">
              {ADDITIONAL_CONTRIBUTIONS.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div
                    className={`h-full px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                    style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
                  >
                    <h3 className="mb-2.5" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {item.title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* The four earlier figures, fenced off in their own accent-bordered
                plate with the caveat that they come from a separate summary. */}
            <div
              className="mt-10 px-6 py-7 md:px-8 md:py-8 rounded-[var(--radius-default)] border border-l-[3px]"
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
            >
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                From the original internship performance summary
              </p>
              <p className="mb-6" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
                These four figures come from an earlier, separate performance summary, not the analytics-and-Hotjar loop
                above. Each is reported alongside, not claimed as solely caused by, the contribution it is paired with.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {LEGACY_METRICS.map((m) => (
                  <div key={m.label}>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
                      {m.value}
                    </p>
                    <p className="mt-1.5 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 06: No-code execution ---------- */}
      <section id="s-nocode" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="No-code execution" heading="Validating in Bubble.io before spending build time">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Not every idea needed a full development cycle to prove it was worth one. For smaller ideas like a new
              discovery tag or a homepage flow for new mentors, I put a working version in front of the idea in Bubble.io
              before requesting engineering time, rather than writing a full spec and waiting to find out whether the fix
              actually worked.
            </p>

            <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {NOCODE_REASONS.map((r, i) => (
                <Reveal key={r.title} delay={i * 80}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <h3 className="mb-2.5" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {r.title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 07: Outcomes ---------- */}
      <section id="s-outcomes" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="07" label="Outcomes" heading="What the loop actually changed">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The platform-wide figures below are the reported results for the internship period. They reflect
              PathPeer&apos;s overall growth during that time, with the analytics-and-recordings loop shaping which
              iterative changes went into it rather than being the sole cause of either number.
            </p>

            <Grid className="mt-8">
              {RESULT_STATS.map((s, i) => (
                <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-6">
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

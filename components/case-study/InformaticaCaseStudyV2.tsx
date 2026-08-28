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
 * the Informatica page after the Greenhouse pilot, the Chronicle V2 reference,
 * the RoomEase V2 gold standard, and ForceN V2. Informatica currently ships on
 * the legacy warm/paper *light* design system
 * (components/case-study/InformaticaCaseStudy.tsx: cs-box / --ink / blocks/*);
 * this is its rebuild on the shared dark editorial shell.
 *
 * Content is preserved from the shipped light page and the shared data file:
 * the curriculum problem, the research-to-decision flow, the no-code vs coded
 * implementation split, six-person coordination, the content automation
 * workflow, outcomes, and reflection. Nothing is invented or re-measured. This
 * is a research/planning case study with no hero image, no walkthrough videos,
 * and no bespoke SVG diagram, so it carries no VideoRow and no re-themed
 * diagram; its two process flows use the shell ProcessFlow (detailBelow), and
 * the topic-track hub and implementation table are token cards. Copy is written
 * without em dashes per the user's standing preference.
 */
const HERO_TITLE = "Breaking an ambiguous cybersecurity curriculum into work a six-person team could execute";
const HERO_LEAD =
  "Informatica set out to build a full set of cybersecurity educational web experiences, covering personal, school, and workplace security plus safe networking practices, each with multiple levels and course-like pages. The real problem was never publishing the information; it was figuring out how to teach it well, and how six co-op students could actually build it together. I helped turn that open-ended goal into research, page structure, and build assignments the team could execute, then applied the same approach to the rest of Informatica's web and content requests.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes-top", label: "What it moved" },
  { href: "#s-problem", label: "The curriculum problem" },
  { href: "#s-research", label: "Research flow" },
  { href: "#s-implementation", label: "No-code vs coded" },
  { href: "#s-delivery", label: "Organizing six people" },
  { href: "#s-automation", label: "Content automation" },
  { href: "#s-outcomes", label: "Outcomes" },
  { href: "#s-reflection", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "Product Operations and UX Research intern who helped structure and coordinate a six-person build." },
  { label: "Scope", value: "Research-to-decision flow, curriculum structure, implementation-path choices, and cross-team coordination." },
  { label: "Team", value: "Six co-op students total (five alongside me), working across research, design, and development on the cybersecurity education project." },
  { label: "Tools", value: "Trello, Microsoft Planner, Microsoft Loop, JavaScript and classic web development, no-code tools." },
  { label: "Core skills", value: "Product Operations, UX Research, Educational Content Strategy." },
];

const RESULT_STATS = [
  { value: "18%", label: "increase in user engagement" },
  { value: "20%", label: "internal task efficiency gain" },
  { value: "30%", label: "improvement in on-time delivery" },
];

const TOPIC_TRACKS = [
  "Personal cybersecurity",
  "School cybersecurity",
  "Workplace cybersecurity",
  "Networking and security practices",
];

const RESEARCH_STEPS: ProcessStep[] = [
  {
    title: "Question",
    synopsis:
      "For the curriculum: what does a reader need to understand about a security topic, and at what depth? For other requests: was a page confusing, a workflow slow, or a feature worth building at all.",
  },
  {
    title: "Research",
    synopsis:
      "Looked at how the topic was best taught, not just what to say about it: what structure, diagrams, or activities would actually get the concept across, instead of assuming a page of text was enough.",
  },
  {
    title: "Synthesis",
    synopsis:
      "Findings got distilled into a few clear takeaways: what a topic track needed to cover, what format would teach it best, and what could wait for a later pass.",
  },
  {
    title: "Recommendation",
    synopsis:
      "Turned synthesis into a specific recommendation, such as a page structure or an implementation approach, not just a summary of findings, so the team had something concrete to build against.",
  },
  {
    title: "Requirement",
    synopsis:
      "Accepted recommendations became requirements specific enough to hand to whoever was building that page or track next.",
  },
  {
    title: "Plan",
    synopsis:
      "The requirement got an owner, a place in its topic track's sequence, and a build method (no-code or coded) based on what the page actually needed.",
  },
];

const AUTOMATION_STEPS: ProcessStep[] = [
  {
    title: "Content input",
    synopsis:
      "A topic, research finding, or requirement came in as raw notes or a summary that needed to become published content.",
  },
  {
    title: "Draft and structure",
    synopsis:
      "Turned that raw input into a structured first-pass draft, working from a consistent template so the same kind of content came out in the same shape every time.",
  },
  {
    title: "Human review",
    synopsis:
      "Every draft got checked against accuracy, tone, and the original requirement before moving forward. AI output was never published on its own.",
  },
  {
    title: "Formatting",
    synopsis: "Reviewed content was formatted to match the site or platform's structure and style.",
  },
  {
    title: "Publish or queue",
    synopsis: "Finished content was published directly or queued for scheduled release, depending on the request.",
  },
  {
    title: "Verification",
    synopsis:
      "After publishing, I checked that the content rendered and behaved as intended, closing the loop instead of assuming the last step worked.",
  },
];

const IMPLEMENTATION_PATHS = [
  {
    path: "No-code tools",
    example: "General informational and knowledge pages",
    why: "Fast to produce and easy for the team to edit directly",
    tradeoff: "Not built for scoring, state, or custom interaction logic",
  },
  {
    path: "Classic web development",
    example: "Structured, mostly-static testing and activity pages",
    why: "Full control over layout and interaction without a framework's overhead",
    tradeoff: "More setup time than no-code, but far more flexible",
  },
  {
    path: "JavaScript-based frameworks",
    example: "More complex interactive testing and activity experiences",
    why: "Handled logic and state that no-code and static pages couldn't support",
    tradeoff: "Needed a developer to build and maintain",
  },
];

const COORDINATION = [
  {
    title: "Trello",
    body: "Tracked individual page and activity builds inside each topic track, so day-to-day progress across four tracks and six people stayed visible without a status meeting.",
  },
  {
    title: "Microsoft Planner",
    body: "Owned the larger deliverables, a full topic track spanning research, page design, and development, so a piece of work with more than one owner had one place tracking who owned what and by when.",
  },
  {
    title: "Microsoft Loop",
    body: "Held shared documentation and decision logs, including the page-structure and build-method calls, so six people writing and building in parallel worked from the same decisions instead of six different interpretations.",
  },
];

/** Page-local reflection + "improve next", overriding the shared data file's
 *  `reflection`/`whatIdImprove` so the content-workflow beat reads as process
 *  automation rather than "AI-assisted drafting", which undersells the work.
 *  The other three reflection points match the shared data verbatim. */
const REFLECTION = [
  "An ambiguous educational goal gets built once it's broken into independently ownable pieces. Splitting the curriculum into four topic tracks, instead of one shared course, was what actually let six people work at the same time.",
  "The right implementation method depends on what a page actually needs to do, not on a company-wide default. Knowledge pages and testing or activity pages needed genuinely different approaches, and treating them the same would have wasted effort either way.",
  "Planning tools are only as good as the ownership they make visible. Trello, Planner, and Loop helped because every page and task had a clear owner across a six-person team, not because of the tools themselves.",
  "Automation should remove repetition, not judgment. Automating the repeatable parts of the content pipeline saved time on the mechanical work, but the human review step stayed, since that's where the real quality control happened.",
];

const WHAT_ID_IMPROVE =
  "I don't have a reliable time-saved figure for the content automation workflow, so I've kept that part of the case study scoped to what it did rather than estimating an impact number I can't verify.";

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

export default function InformaticaCaseStudyV2() {
  const cs = getCaseStudy("informatica")!;
  const accent = caseStudyTheme.informatica.accent;

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

            <Section accentLabel anchor="s-outcomes-top" number="01" heading="What the internship moved">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                These are internship-wide figures per internal reporting, describing the full scope of the role rather
                than the cybersecurity curriculum project in isolation.
              </p>
              <Grid className="mt-8">
                {RESULT_STATS.map((s, i) => (
                  <div key={s.label} className="col-span-4 sm:col-span-4 lg:col-span-4">
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

      {/* ---------- 02: The curriculum problem ---------- */}
      <section id="s-problem" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="The curriculum problem" heading="An educational goal, and no structure to build it from" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                Informatica wanted a full set of cybersecurity educational web experiences: personal, school, and
                workplace cybersecurity, plus correct networking and security practices, each with multiple levels and
                course-like pages. That goal didn&apos;t come with a page structure, a teaching approach, or a plan for
                dividing the work. Six co-op students, including me, had to build all of it, and I helped organize how
                that work got broken up, researched, and built.
              </p>
            </div>
            <PullQuote cite="The problem, in one line">
              The hard part was never publishing the information; it was teaching it well, and splitting the build across
              six people.
            </PullQuote>
          </div>

          {/* Topic-track hub: one ambiguous goal split into four buildable tracks. */}
          <div className="mt-14 md:mt-16 grid lg:grid-cols-[1fr_1.05fr_1fr] gap-5 items-stretch">
            <div className="flex flex-col gap-5">
              {TOPIC_TRACKS.slice(0, 2).map((t) => (
                <div key={t} className={`flex-1 flex items-center px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{t}</p>
                </div>
              ))}
            </div>
            <div
              className="flex flex-col items-center justify-center text-center px-6 py-10 rounded-[var(--radius-default)] border-2"
              style={{ background: "color-mix(in srgb, var(--color-project-accent) 10%, var(--color-surface-1))", borderColor: "var(--accent-bright, var(--color-project-accent))" }}
            >
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                One ambiguous goal, split into
              </p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
                Four independent topic tracks
              </p>
              <p className="mt-3 text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                Different audiences, different depth needs, so each could be researched and built in parallel.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              {TOPIC_TRACKS.slice(2, 4).map((t) => (
                <div key={t} className={`flex-1 flex items-center px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
          <ReconstructedNote>
            Based on the four topic areas the curriculum was organized around. Company-specific tool names and records
            are simplified or omitted.
          </ReconstructedNote>

          <p
            className="mt-12 mb-5"
            style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
          >
            Constraints the plan had to work within
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
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
        </Container>
      </section>

      {/* ---------- 03: Research flow ---------- */}
      <section id="s-research" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Research flow" heading="Research that shaped how each topic got taught">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The question was rarely just what to say about a topic. It was how to teach it: what structure, diagrams,
              or activities would actually get the concept across to the audience that topic track was written for.
              Select a stage below to see what happened there.
            </p>
          </Section>

          <div className="mt-10">
            <ProcessFlow steps={RESEARCH_STEPS} rowLength={3} detailBelow middleLabel="Synthesis turns findings into a recommendation" />
          </div>

          <DecisionBlock
            title="Organize the curriculum as four independent topic tracks instead of one continuous course"
            situation="Personal, school, workplace, and networking and security practices are different audiences with different depth needs. Treating them as one continuous course would have forced everyone to build sequentially instead of in parallel."
            result="Each topic track could be researched, structured, and built independently, so the six-person team could work at the same time instead of waiting on a shared sequence."
          />
        </Container>
      </section>

      {/* ---------- 04: No-code vs coded ---------- */}
      <section id="s-implementation" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="No-code vs coded" heading="Matching the build method to the page, not the project">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              A general page explaining what phishing is has very different needs from an interactive quiz testing
              whether someone can spot one. Rather than pick one build approach for the whole curriculum, each page type
              got matched to the method that actually fit it.
            </p>

            <div className="mt-9 overflow-x-auto rounded-[var(--radius-default)] border" style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}>
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-line)" }}>
                    {["Build method", "Used for", "Why", "Tradeoff"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5"
                        style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {IMPLEMENTATION_PATHS.map((row, i) => (
                    <tr
                      key={row.path}
                      className="transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                      style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}
                    >
                      <th scope="row" className="align-top px-5 py-4" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                        {row.path}
                      </th>
                      <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        {row.example}
                      </td>
                      <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        {row.why}
                      </td>
                      <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        {row.tradeoff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReconstructedNote>
              Describes the general split used across the curriculum, not a literal internal document.
            </ReconstructedNote>

            <p className="mt-8" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              General informational and knowledge pages, the bulk of the curriculum, went through no-code tools, so
              content could be produced and edited quickly. Specialized testing, activity, and interactive pages needed
              logic no-code couldn&apos;t reliably support, so those went through classic web development or JavaScript-based
              frameworks instead, matching the extra setup time to the pages that actually needed the flexibility.
            </p>

            <DecisionBlock
              title="Match implementation method to page type instead of picking one build approach for the whole project"
              situation="General knowledge pages needed to be quick to produce and easy to edit, but testing, activity, and interactive pages needed logic such as scoring, state, or custom interaction that no-code tools couldn't reliably support."
              result="No-code tools covered the general informational pages, while classic web development and JavaScript-based frameworks covered the testing, activity, and interactive pages that actually needed the flexibility."
            />
          </Section>
        </Container>
      </section>

      {/* ---------- 05: Organizing six people ---------- */}
      <section id="s-delivery" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Organizing six people" heading="Keeping six people's work visible and consistent">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              None of these tools mattered on their own. What mattered was that six people building across four topic
              tracks could see who owned what, what stage it was at, and where a decision had already been made, instead
              of that living in one person&apos;s head or a single conversation.
            </p>

            <div className="mt-9 grid md:grid-cols-3 gap-5">
              {COORDINATION.map((t, i) => (
                <Reveal key={t.title} delay={i * 80}>
                  <div
                    className={`h-full px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                    style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
                  >
                    <h3 className="mb-2.5" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                      {t.title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-9" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The same planning approach carried over past the curriculum project: as other web application requests,
              content updates, and process fixes came in from different teams, they moved through the same
              research-to-decision flow and the same implementation-path question, rather than getting handled as
              one-off asks.
            </p>
          </Section>
        </Container>
      </section>

      {/* ---------- 06: Content automation ---------- */}
      <section id="s-automation" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="Content automation" heading="Automating content work, without removing the review">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Educational and blog-style content updates followed a repeatable shape, which made part of the workflow
              worth automating without removing the judgment calls that mattered.
            </p>
          </Section>

          <div className="mt-10">
            <ProcessFlow steps={AUTOMATION_STEPS} rowLength={3} detailBelow middleLabel="Human review gates everything before it publishes" />
          </div>
          <ReconstructedNote>
            Describes the shape of the content workflow I helped automate. Specific tools are simplified or omitted.
          </ReconstructedNote>
        </Container>
      </section>

      {/* ---------- 07: Outcomes ---------- */}
      <section id="s-outcomes" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="07" label="Outcomes" heading="From an ambiguous goal to shipped, executable work">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The clearest result was turning one ambiguous educational goal into work six people could actually execute,
              with implementation effort concentrated where it was genuinely needed.
            </p>

            <ul className="mt-9 flex flex-col">
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
            {REFLECTION.map((r, i) => (
              <Reveal key={r} delay={i * 70}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>{r}</p>
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

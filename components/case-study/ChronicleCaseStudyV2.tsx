import { getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import Metric from "@/components/case-study/shell/Metric";
import DecisionBlock from "@/components/case-study/shell/DecisionBlock";
import ProcessFlow, { type ProcessStep } from "@/components/case-study/shell/ProcessFlow";
import MediaFrame from "@/components/ui/MediaFrame";
import Reveal from "@/components/Reveal";

/**
 * Phase 13 rollout (docs/redesign/IMPLEMENTATION-ROADMAP.md), second page
 * after the approved Greenhouse pilot. Chronicle is a materially different
 * shape from Greenhouse: most of its real narrative content (the rules
 * list, workspace/evidence diagrams, agent-role status cards, defect log,
 * reflection cards) has never lived in lib/content/case-studies.ts at all
 * -- it's authored directly in the old ChronicleCaseStudy.tsx. That's
 * preserved here verbatim as page-local constants (same pattern the old
 * component already used), not invented or paraphrased; only cs.* fields
 * that already existed there (company/role/timeframe/tags/toolTags/
 * metrics/decisions/artifacts) are pulled from the shared data file.
 *
 * Two verified content facts came from the LIVE page, not case-studies.ts,
 * because the two disagreed: cs.title/oneLiner are shorter paraphrases
 * that don't match the actual shipped H1/hero paragraph. The live page's
 * exact wording is used below (HERO_TITLE/HERO_LEAD) rather than either
 * silently diverging from what's shipped or rewriting it unreviewed.
 *
 * Chronicle's own original section numbering (01-08) only covered the
 * eight narrative chapters below the hero -- there was no standalone
 * "Outcome metrics" section; two of the four cs.metrics values surfaced
 * only as hero pill badges, and the other two weren't shown at all. This
 * migration folds all four into one real "01 Outcome metrics" section
 * matching Greenhouse's shell pattern (the actual point of a shared
 * shell), which shifts every subsequent chapter number up by one -- a
 * structural change, not a fact change; every number still names the same
 * chapter in the same order.
 */
const HERO_TITLE = "An AI-first historical investigation workspace, built to argue from evidence";
const HERO_LEAD =
  "Chronicle turns a historical question into a bounded, auditable, evidence-linked investigation: a map-first workspace over a schema-validated generation contract, being built toward a four-role agent system that has to cite reviewed evidence instead of inventing history. This page is a snapshot of an active project, not a finished product, and says so explicitly wherever a phase is still architecture, not code.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes", label: "Outcome metrics" },
  { href: "#s1", label: "Product thesis" },
  { href: "#s2", label: "Workspace" },
  { href: "#s3", label: "Evidence model" },
  { href: "#s4", label: "Pipeline" },
  { href: "#s5", label: "Agent system" },
  { href: "#s6", label: "Integrity rules" },
  { href: "#s7", label: "Decisions" },
  { href: "#s8", label: "Status & next" },
];

const INTEGRITY_RULES = [
  "Relationships between events are classified as directly supported, indirectly supported, contextual, correlational, disputed, speculative, or insufficient evidence. Chronological adjacency alone is never treated as causation.",
  "Event-time, report-time, message-sent-time, message-received-time, actor-awareness-time, discovery-time, and interpretation-time are kept as separate fields, never collapsed into one \"date.\"",
  "City-level evidence can never render as an exact building-level location, and modern political borders are never reused to imply historical political geography.",
];

const EVIDENCE_CHAIN = [
  { title: "Source", sub: "Type + rights status recorded" },
  { title: "Document", sub: "Derived from a specific Source" },
  { title: "Passage", sub: "The cited unit of text" },
  { title: "Claim / Relationship", sub: "Supported, never asserted alone" },
];

const PIPELINE_STEPS: ProcessStep[] = [
  { title: "Scope proposed", synopsis: "A bounded scope for the request is proposed before any discovery or generation work starts, so the pipeline never runs unbounded." },
  { title: "Discovery queries prepared", synopsis: "Search/discovery queries are prepared for the scope. In the current build this stage is deterministic (mock or curated), not a live search call." },
  { title: "Source candidates discovered", synopsis: "Candidate sources are identified for the scope, with provenance carried forward rather than discarded." },
  { title: "Sources assessed", synopsis: "Candidates are assessed for rights, reliability, and fit before anything is treated as usable evidence." },
  { title: "Corpus prepared", synopsis: "Assessed sources are assembled into a corpus: documents, passages, and citation anchors, ready to support claims." },
  { title: "Historical model assembled", synopsis: "Entities, events, claims, relationships, and knowledge states are composed from the corpus, with a genuine 'partial' outcome when coverage is honestly incomplete." },
  { title: "Investigation composed", synopsis: "The historical model is composed into a full GeneratedInvestigation package, including its experience plan (lenses, map scope, story sequence)." },
  { title: "Verified", synopsis: "The composed package is run back through the same schema and cross-reference validator every hand-authored package must also pass, before it's treated as output." },
];

type StatusTone = "built" | "progress" | "future";

function StatusPill({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  const style =
    tone === "built"
      ? { background: "var(--color-text)", color: "var(--color-bg)", borderColor: "var(--color-text)" }
      : tone === "progress"
        ? { background: "transparent", color: "var(--accent-bright, var(--color-project-accent))", borderColor: "var(--accent-bright, var(--color-project-accent))" }
        : { background: "transparent", color: "var(--color-text-subtle)", borderColor: "var(--color-line-strong)" };
  return (
    <span
      className="inline-block text-[11px] font-semibold uppercase tracking-wide rounded-full px-3 py-1 border"
      style={style}
    >
      {children}
    </span>
  );
}

const AGENT_ROLES: {
  role: string;
  job: string;
  statusTone: StatusTone;
  statusLabel: string;
  exists: string[];
}[] = [
  {
    role: "Investigation Planner",
    job: "Converts a question plus workspace context into a typed InvestigationPlan.",
    statusTone: "progress",
    statusLabel: "In active development, uncommitted",
    exists: [
      "generate_structured() call shape",
      "10 typed tools to plan calls against",
      "A working implementation with deterministic post-generation gates, written but not yet committed or passing its own test suite",
    ],
  },
  {
    role: "Evidence Analyst",
    job: "Builds a structured AnalysisDraft from retrieved evidence.",
    statusTone: "progress",
    statusLabel: "In active development, uncommitted",
    exists: [
      "Same structured-output call shape",
      "Real retrieved evidence via search_passages / get_claim_evidence / get_relationship_evidence",
      "A working implementation plus a deterministic grounding validator that checks every draft statement traces to the retrieved evidence bundle, not yet committed or passing its own test suite",
    ],
  },
  {
    role: "Historical Critic",
    job: "Produces an approve / downgrade / reject / abstain decision challenging the Analyst's draft.",
    statusTone: "future",
    statusLabel: "Architected, not built",
    exists: ["find_counterevidence / trace_relationships give it something concrete to check a draft against"],
  },
  {
    role: "Investigation Guide",
    job: "Turns critic-approved material into a cited, user-facing answer with typed map actions.",
    statusTone: "future",
    statusLabel: "Architected, not built",
    exists: ["Typed AssistantAction contract already specified", "get_map_context resolves a map action's referenced IDs"],
  },
];

const FOUNDATION_CARDS: { title: string; statusTone: StatusTone; statusLabel: string; body: string; span2?: boolean }[] = [
  {
    title: "Model-provider layer",
    statusTone: "built",
    statusLabel: "Built & smoke-tested",
    body: "A provider-agnostic protocol, a deterministic test provider, and a real local Ollama provider running Qwen2.5:7b-instruct, chosen after an explicit hardware audit (13.69 GB RAM, integrated GPU, CPU-only). A named failure taxonomy and a bounded retry-with-feedback path handle malformed structured output. A real end-to-end smoke test produced valid schema output on the first attempt, at zero inference cost, proving the wiring, not complex reasoning.",
  },
  {
    title: "Corpus and typed tools",
    statusTone: "built",
    statusLabel: "Committed & pushed, not yet merged to master",
    body: "A read-only corpus service over the validated investigation packages, and 10 deterministic tools (search_passages, get_claim_evidence, find_counterevidence, trace_relationships, get_map_context, and others) an agent calls. Historical-integrity rules are enforced in the tool layer itself: evidence roles stay attached to their target, time roles stay separate, and map output preserves precision instead of implying false accuracy.",
  },
  {
    title: "Planner, Analyst, and the agent runner",
    statusTone: "progress",
    statusLabel: "In active development, uncommitted",
    body: "A working Investigation Planner and Evidence Analyst, a deterministic grounding validator that checks every Analyst statement traces back to the retrieved evidence bundle rather than trusting a model's own claim, and a bounded tool-calling runner that executes a Planner's plan over the ten typed tools above, all now exist in the codebase, alongside early scaffolding for an evaluation/benchmark harness. None of this is committed yet, and it is not currently passing its own verification suite, so it is tracked here as work in progress, not claimed as built.",
    span2: true,
  },
];

const INTEGRITY_DEFECTS = [
  "A serialization mismatch: Python's model_dump() wrote unset optional fields as null, while the TypeScript/Zod contract requires the key to be fully absent. A present-but-null field passed Python's validator but silently failed the frontend's. Caught during integration, fixed with an explicit exclude_none serialization step.",
  "A reuse-vs-rerun bug in the workflow engine: resuming a run with a different provider set could have wrongly reused stale output instead of re-running, because the reuse check compared a version field that was hardcoded rather than actually threaded through. Fixed and covered by a regression test.",
  "An accessibility bug in the new workspace: a heading skipped from the page's h1 straight to h3 with no intervening h2, caught by an automated axe scan the same session it was introduced, not after the fact.",
  "A retry-classification bug in the model-provider layer: HTTP 5xx responses and a flat connection refusal were initially bucketed under the same retryable error type, when a 5xx from a local daemon usually means something is actually broken, not a transient blip worth retrying immediately.",
];

const VERIFICATION_STATS = [
  { value: "514", label: "backend (Python) tests passing" },
  { value: "103", label: "frontend unit tests passing" },
  { value: "14", label: "Playwright end-to-end journeys passing" },
  { value: "10", label: "typed agent tools built" },
  { value: "8", label: "resumable generation-pipeline stages" },
  { value: "2", label: "independently-sourced investigations, one renderer" },
];

const COMPLETE_LIST = [
  "Versioned, cross-validated generation contract (TS + Python)",
  "Resumable 8-stage deterministic pipeline, mock and curated providers",
  "Map-first workspace, lenses, docked panel, and preserved Inspector mode",
  "Ask entry surface (keyword-matched against real investigations, not generative)",
  "Model-provider foundation, smoke-tested against a real local model",
  "Corpus service and 10 typed tools, implemented, independently verified, committed and pushed",
];

const NEXT_LIST = [
  "Stabilizing the Investigation Planner, Evidence Analyst, grounding validator, and tool-calling runner already written, but uncommitted and not yet passing their own test suite",
  "The Historical Critic and Investigation Guide roles, not yet started",
  "An API layer and real assistant answers in the workspace's Ask panel",
  "A working evaluation harness with real, verified results (early scaffolding exists, no numbers yet)",
  "A real human comprehension study for the map-first workspace (test plan written, not yet run)",
  "Live web retrieval, embeddings, and a database-backed review service (currently schema-only)",
];

const REFLECTION_CARDS = [
  {
    category: "Product learning",
    title: "Corrections belong on the record, not absorbed quietly",
    body: "The roadmap changed direction twice at the product-framing level: map-first, then agent-as-core. Writing both corrections down as dated decisions made the second one faster to reason about than the first.",
  },
  {
    category: "AI / system learning",
    title: "Structure before intelligence",
    body: "Proving the deterministic pipeline on synthetic topics, before wiring a real model, felt slow at the time. It meant the model-provider and tool layer had a stable, already-tested contract to build against instead of inventing structure under model-output pressure, and a local 7B model's weaker structured-output reliability is designed around with a retry-with-feedback path, not hidden.",
  },
  {
    category: "Historical-integrity learning",
    title: "Integrity rules have to be structural, not stylistic",
    body: "Rules like \"chronological adjacency never implies causation\" are easy to write down and easy to quietly violate under deadline pressure. Only enforcing them as schema and validator rules, checked at write time, actually holds, and that discipline is what caught real defects, like a serialization mismatch, before they shipped.",
  },
  {
    category: "Next validation step",
    title: "What's still unproven: real human comprehension",
    body: "The map-first workspace has automated keyboard, accessibility, and mechanical test coverage, but no real human comprehension study has been run yet. That's the next validation gap to close before trusting the workspace design, written down as an open test plan, not skipped.",
  },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

/** A node row with arrow connectors between items, reflowing to a stacked
 *  column with hidden connectors below `sm` (mirrors the technique built
 *  for Greenhouse's "Behind the visuals" diagram, generalized to N nodes). */
function ConnectedNodes({ nodes }: { nodes: { title: string; sub: string }[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3" role="img" aria-label={nodes.map((n) => n.title).join(" leads to ")}>
      {nodes.map((n, i) => (
        <div key={n.title} className="flex flex-col sm:flex-row items-center gap-3">
          {i > 0 && (
            <span className="hidden sm:inline text-lg shrink-0" aria-hidden="true" style={{ color: "var(--color-text-subtle)" }}>
              →
            </span>
          )}
          <div
            className={`px-5 py-4 min-w-[150px] rounded-[var(--radius-default)] border ${CARD_HOVER}`}
            style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}
          >
            <p
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--accent-bright, var(--color-project-accent))",
                marginBottom: "4px",
              }}
            >
              {n.title}
            </p>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {n.sub}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Same remainder-safe row-fill CaseStudySnapshot uses, applied to a
 *  Metric grid whose item count doesn't divide evenly by 4 (the
 *  verification stat row has 6). */
function spanFor(index: number, total: number) {
  const remainder = total % 4;
  const fromEnd = total - index;
  if (remainder === 1 && fromEnd === 1) return "lg:col-span-12";
  if (remainder === 2 && fromEnd <= 2) return "lg:col-span-6";
  if (remainder === 3 && fromEnd <= 3) return "lg:col-span-4";
  return "lg:col-span-3";
}

/** Greenhouse's approved "Outcomes" treatment (large pale numeral + hover
 *  wash, replacing a small bullet/checkmark) generalized for reuse here --
 *  four separate lists on this page (integrity rules, integrity defects,
 *  complete, next) were flat hairline-rule bullet rows with no interaction
 *  at all, the exact "AI slop" pattern flagged on Greenhouse: a shared
 *  motif already proven on this site, not a new one. `compact` scales the
 *  numeral down for the narrower two-column Complete/Next lists, where an
 *  h1-scale digit would overwhelm a short phrase. */
function NumberedList({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <ul className="mt-6 flex flex-col">
      {items.map((item, i) => (
        <li key={item} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
          <Reveal
            delay={i * 60}
            className="group/row flex items-baseline gap-4 -mx-3 px-3 py-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
          >
            <span
              aria-hidden="true"
              className={`shrink-0 ${compact ? "w-[1em]" : "w-[1.2em]"} transition-colors duration-[var(--duration-base)] group-hover/row:text-[var(--color-text)]`}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: compact ? "var(--text-h3)" : "var(--text-h1)",
                lineHeight: 1,
                color: "var(--color-text-subtle)",
              }}
            >
              0{i + 1}
            </span>
            <span
              className={compact ? "text-sm" : undefined}
              style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: compact ? undefined : "var(--measure-body)" }}
            >
              {item}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** Real hover feedback for the page's static fact-cards (agent roles,
 *  foundation cards, reflection cards) -- none had any interaction before,
 *  which read as inert next to the rest of the shell system. A faint
 *  accent-tinted wash (not a flat swap) plus lift + shadow, same mechanism
 *  ProcessFlow's buttons use, diluted for a non-clickable card so it reads
 *  as "crafted" rather than falsely implying these are pressable. */
const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.28)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_6%,var(--color-surface-2))]";

/** Narrative paragraph paired tightly beside its media, vertically centered
 *  on the same axis, alternating which side the media sits on section to
 *  section (`flip`). This is the single move both reference case studies
 *  (faizanlalva.com/work/grocerease, and the reference library's own NoCode
 *  note: "pair a paragraph tightly against its image... alternating sides
 *  each time") lean on to stop reading as a stacked template. Whitespace
 *  lives *between* pairs, never inside one — so the text column and its
 *  image read as one unit. Stacks to a single column below `lg` with the
 *  media always following its text. */
function NarrativeMedia({
  flip = false,
  media,
  children,
}: {
  flip?: boolean;
  media: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
      <div className={`min-w-0 ${flip ? "lg:order-2" : "lg:order-1"}`}>{children}</div>
      <div className={`min-w-0 ${flip ? "lg:order-1" : "lg:order-2"}`}>{media}</div>
    </div>
  );
}

/** One deliberate typographic beat per page: a single strong line lifted to
 *  display scale, breaking the section rhythm the way both reference sites
 *  use a pull-quote (faizanlalva's Curbit quote, glorialo's Greta quote).
 *  Carries a large pale opening quotation mark — the same "large pale glyph"
 *  flair the numbered lists use — rather than an accent fill, keeping the
 *  one-surgical-accent rule intact; scale and the display serif do the work. */
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
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          lineHeight: "var(--leading-h2)",
          color: "var(--color-text)",
        }}
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

export default function ChronicleCaseStudyV2() {
  const cs = getCaseStudy("chronicle")!;
  const theme = caseStudyTheme.chronicle;

  return (
    <div
      style={
        {
          "--color-project-accent": theme.accent,
          // A lightened accent that stays legible as text/detail on the near-
          // black case-study field (the raw accent is a deep slate-blue, too
          // dark for type on #0b0c0f). Used for eyebrow labels, node titles,
          // the pull-quote mark, and interactive borders.
          "--accent-bright": `color-mix(in srgb, ${theme.accent} 55%, white)`,
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
              meta={cs.timeframe}
              artifacts={cs.artifacts}
              media={cs.heroMedia}
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
                <CaseStudySnapshot
                  items={[
                    { label: "Challenge", value: cs.snapshot!.challenge },
                    { label: "Contribution", value: cs.snapshot!.contribution },
                    { label: "Status", value: cs.snapshot!.outcome },
                    { label: "Tools", value: cs.snapshot!.tools!.join(", ") },
                    { label: "Core skills", value: cs.tags.join(", ") },
                  ]}
                />
              </Reveal>
            </Section>

            <Section accentLabel anchor="s-outcomes" number="01" heading="Outcome metrics">
              <Grid className="mt-8">
                {cs.metrics.map((m, i) => (
                  <div key={m.label} className={`col-span-2 ${spanFor(i, cs.metrics.length)}`}>
                    <Reveal delay={i * 80}>
                      <Metric value={m.value} label={m.label} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- 02: Product thesis ---------- */}
      <section id="s1" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="Product thesis" heading="Why historical investigation needs structure" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                An ordinary historical summary compresses disagreement, uncertain timing, and disputed causation
                into confident prose. Chronicle&apos;s working assumption is that this compression is the actual
                problem, not a stylistic choice: events are interconnected, causal claims need evidence, sources
                disagree with each other, and <em style={{ color: "var(--color-text)" }}>when</em>{" "}someone knew
                something is a separate fact from when the event itself happened.
              </p>
            </div>
            <PullQuote cite="The product thesis, in one line">
              A product that answers a historical question well has to keep the disagreement, the uncertainty, and
              the timing attached to the answer &mdash; not smooth them away.
            </PullQuote>
          </div>

          <div className="mt-14 md:mt-16">
            <p
              className="mb-6"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              Rules the data model enforces, not just style guidance
            </p>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-8">
              {INTEGRITY_RULES.map((r, i) => (
                <div
                  key={r}
                  className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                  style={{ borderTop: "1px solid var(--color-line)" }}
                >
                  <span
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: 1, color: "var(--color-text-subtle)" }}
                  >
                    0{i + 1}
                  </span>
                  <p className="mt-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    {r}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 03: Workspace ---------- */}
      <section id="s2" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Workspace" heading="A map-first workspace, not an article">
            <div className="mt-8">
              <NarrativeMedia
                media={
                  <Reveal>
                    <MediaFrame interactive
                      src="/case-studies/chronicle/chronicle-scope.jpg"
                      alt="Chronicle's real proposed-scope screen: the question, the geographic and time scope, what the evidence currently shows, and its evidence coverage, shown before the workspace opens"
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="aspect-[1265/712]"
                    />
                    <p className="mt-3 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
                      Before the workspace opens: the proposed scope, what the evidence currently shows, and its
                      coverage, stated plainly before generation begins.
                    </p>
                  </Reveal>
                }
              >
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  The original renderer presented an investigation as a single scrollable article. Chronicle now
                  opens a bounded, focused map for the investigation&apos;s actual geography, with a docked panel
                  beside it (mobile: a bottom sheet) carrying Ask, Explore, Evidence, and Sources tabs, plus
                  historical &quot;lenses&quot; that change what the map and timeline surface. The original
                  article-first view is preserved, not deleted, as an accessible &quot;Inspector&quot; mode.
                </p>
                <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  Entry starts as a conversational &quot;Ask&quot; surface: a typed question is keyword-matched
                  against the investigations that actually exist today. On a match, a scope-review card shows the
                  real proposed scope before a generation-progress checklist (built from the pipeline&apos;s own 8
                  real stage names) hands off into the workspace. On no match, it says so honestly rather than
                  guessing.
                </p>
              </NarrativeMedia>
            </div>

            <Reveal className="mt-12 md:mt-16">
              <MediaFrame interactive
                src="/case-studies/chronicle/chronicle-workspace.jpg"
                alt="Chronicle's real investigation workspace: an interactive historical map with dated event markers, a persistent timeline scrubber, and a docked Ask/Explore/Evidence/Sources panel running a live local-model query"
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="aspect-[16/9]"
              />
            </Reveal>
            <p className="mt-3 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
              The live workspace: the map, timeline, lens switch, and Ask panel mid-query against the local model.
            </p>
          </Section>
        </Container>
      </section>

      {/* ---------- 04: Evidence model ---------- */}
      <section id="s3" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Evidence model" heading="An evidence model built to be interrogated">
            <div className="mt-8">
              <NarrativeMedia
                flip
                media={
                  <Reveal>
                    <MediaFrame interactive
                      src="/case-studies/chronicle/chronicle-inspector.jpg"
                      alt="Chronicle's real Inspector view: a narrative claim with underlined selectable passages, the exact supporting quotation and source it traces to, and its review status"
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="aspect-[1265/712]"
                    />
                    <p className="mt-3 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
                      The Inspector: every underlined claim is selectable and traces to the exact quotation,
                      source, and review status behind it.
                    </p>
                  </Reveal>
                }
              >
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  Every claim has to trace back through a chain: a Source (with a recorded type and rights status)
                  produces Documents, which are broken into cited Passages, which support Claims and
                  Relationships. A Claim with no traceable supporting passage is structurally invalid and rejected
                  at write time, not just flagged for later review.
                </p>
              </NarrativeMedia>
            </div>

            <Reveal className="mt-12 md:mt-16">
              <ConnectedNodes nodes={EVIDENCE_CHAIN} />
            </Reveal>
            <p className="mt-3 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
              The formal chain the Inspector view above is built on.
            </p>

            <div className="mt-10 grid lg:grid-cols-2 gap-x-10 gap-y-8 items-stretch">
              <div
                className={`px-6 py-5 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                style={{
                  borderColor: "var(--color-line)",
                  borderLeftColor: "var(--accent-bright, var(--color-project-accent))",
                  background: "var(--color-surface-1)",
                }}
              >
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Disputed relationships</span>{" "}are a
                  first-class case, not an edge case: a disputed relationship must carry both a supporting evidence
                  link and a counterevidence link, not just an assertion. The Concert of Europe
                  investigation&apos;s Troppau-doctrine relationship (Britain&apos;s rejection of the intervention
                  principle) exercises exactly this path with real sourced content.
                </p>
              </div>

              <div className="lg:pt-1">
                <p
                  className="mb-3"
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
                >
                  Review is a real state machine
                </p>
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  Review status is modelled as a real state machine (proposed → reviewed / disputed / rejected,
                  with disputed shown honestly as disputed rather than hidden), and every AI-touched field is
                  required to carry a prompt version, model version, and processing timestamp. As of this write-up
                  that state machine and its persistence layer are a documented target contract, not a running
                  service: only the file-based generation-run storage actually exists today, and the docs say so
                  plainly rather than implying a database that isn&apos;t there.
                </p>
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 05: Pipeline ---------- */}
      <section id="s4" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Pipeline" heading="Proving the pipeline before the model">
            <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Before any model call existed, a resumable, file-persisted, 8-stage Python pipeline was built and
              proven mechanically: deterministic mock providers produced a schema-valid package for{" "}
              <em style={{ color: "var(--color-text)" }}>any</em>{" "}topic string, disclosed as synthetic, purely to
              prove the contract and engine worked end to end. Each stage reruns only when its own input hash
              actually changed, so a failed run resumes without redoing finished work.
            </p>

            <div className="mt-8">
              <ProcessFlow
                steps={PIPELINE_STEPS}
                rowLength={4}
                topAlignRows
                middleLabel="Assessed sources become the corpus the investigation is built from"
              />
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-x-12 gap-y-6 items-start mt-12">
              <div className="min-w-0">
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  A second, real investigation, &quot;The Concert of Europe and Revolutionary Intervention,
                  1814-1822,&quot; was then hand-curated through that exact same pipeline: real Sources (the
                  Congress of Vienna&apos;s General Treaty, the Troppau Protocol, Castlereagh&apos;s State Paper of
                  1820), real Persons (Metternich, Alexander I, Castlereagh, Canning), and a genuinely disclosed
                  sourcing gap where no primary Congress of Verona document was located, stated plainly rather
                  than papered over. It renders through the identical generic frontend renderer as the original
                  hand-authored investigation, with an automated check confirming no topic-specific constants leak
                  into shared code.
                </p>
                <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  The real, rights-cleared period map beside this: William R. Shepherd,{" "}
                  <em>Historical Atlas</em>{" "}(1911), &quot;Treaty Adjustments, 1814, 1815,&quot; p. 157, public
                  domain. It is deliberately{" "}
                  <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>not</span>{" "}attached to
                  the investigation&apos;s second scene (the Troppau/Laibach/Verona era, five to seven years
                  later): the plate documents an earlier settlement, so the honest choice was no map for that
                  scene, disclosed as a gap rather than misapplied.
                </p>
              </div>
              <div>
                <MediaFrame
                  interactive
                  src="/case-studies/chronicle/map-concert-of-europe-1815.jpg"
                  alt="Treaty Adjustments, 1814, 1815 - William R. Shepherd, Historical Atlas (1911), p.157, framed on Central Europe"
                  sizes="320px"
                  objectPosition="center 42%"
                  className="aspect-square"
                />
                <p className="mt-2 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
                  Verified: matches the project&apos;s own map-source documentation.
                </p>
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 06: AI-agent system ---------- */}
      <section id="s5" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="Agent system" heading="The AI-agent system: what's built, what's next">
            <div className="mt-6 grid lg:grid-cols-2 gap-x-12 gap-y-6 items-center">
              <div>
                <StatusPill tone="future">Product core, not shipped yet</StatusPill>
                <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  A documented mid-project correction reframed Chronicle: the domain-specialized, four-role LLM
                  agent system is the actual product core, and the historical investigations are its proving
                  ground, not the other way around.
                </p>
              </div>
              <div
                className={`px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                style={{
                  borderColor: "var(--color-line)",
                  borderLeftColor: "var(--accent-bright, var(--color-project-accent))",
                  background: "var(--color-surface-1)",
                }}
              >
                <p
                  className="mb-2"
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
                >
                  The scope guardrail
                </p>
                <p style={{ color: "var(--color-text)", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}>
                  No autonomous swarm — exactly four bounded roles, typed in and out, until an eval harness proves
                  a fifth is actually needed.
                </p>
              </div>
            </div>

            <Grid className="mt-9">
              {AGENT_ROLES.map((r, i) => (
                <div key={r.role} className="col-span-4 sm:col-span-4 lg:col-span-6">
                  <Reveal delay={i * 80}>
                    <div className={`h-full px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}>{r.role}</p>
                      <div className="mt-2">
                        <StatusPill tone={r.statusTone}>{r.statusLabel}</StatusPill>
                      </div>
                      <p className="mt-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r.job}</p>
                      <p className="mt-3 mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                        What already exists for it
                      </p>
                      <ul className="flex flex-col gap-1">
                        {r.exists.map((e) => (
                          <li key={e} className="text-sm flex gap-2" style={{ color: "var(--color-text-muted)" }}>
                            <span aria-hidden="true" style={{ color: "var(--color-text-subtle)" }}>–</span>
                            {e}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              ))}
            </Grid>

            <p
              className="mt-10 mb-4"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              What the foundation underneath them actually is
            </p>
            <Grid>
              {FOUNDATION_CARDS.map((f, i) => (
                <div key={f.title} className={`col-span-4 sm:col-span-4 ${f.span2 ? "lg:col-span-12" : "lg:col-span-6"}`}>
                  <Reveal delay={i * 80}>
                    <div className={`h-full px-5 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <p style={{ color: "var(--color-text)", fontWeight: 600 }}>{f.title}</p>
                        <StatusPill tone={f.statusTone}>{f.statusLabel}</StatusPill>
                      </div>
                      <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{f.body}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </Grid>

            <p className="mt-9" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              What does <span style={{ color: "var(--color-text)", fontWeight: 600 }}>not</span>{" "}exist yet, stated
              plainly: the Historical Critic and Investigation Guide roles, a passing test suite for the
              Planner/Analyst/runner code above, an API layer, real assistant answers in the workspace (the Ask
              panel stays an honestly disclosed placeholder), an evaluation harness that produces verified
              results, and any database or live web retrieval.
            </p>
          </Section>
        </Container>
      </section>

      {/* ---------- 07: Historical integrity ---------- */}
      <section id="s6" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="07" label="Integrity rules" heading="Historical integrity as a hard constraint, not a style guide">
            <div className="grid lg:grid-cols-[1fr_300px] gap-x-12 gap-y-6 items-start mt-6">
              <div className="min-w-0 lg:order-1">
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  Rules like &quot;chronological adjacency never implies causation&quot; are easy to write down and
                  easy to quietly violate under deadline pressure. Chronicle enforces them as schema and validator
                  rules, checked at write time, in both the TypeScript and Python contracts, not as documentation
                  someone has to remember to follow.
                </p>
                <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  The real map wired into Chronicle&apos;s own July Crisis investigation: William R. Shepherd,{" "}
                  <em>Historical Atlas</em>{" "}(1911), &quot;Europe at the Present Time,&quot; pp. 166-167, public
                  domain, digitized by the Perry-Castañeda Library. Its own sourcing doc discloses a genuine gap:
                  the plate&apos;s Balkan/Ottoman boundaries predate the 1912-13 Balkan Wars and do not match July
                  1914&apos;s real borders. Germany&apos;s and Austria-Hungary&apos;s boundaries, the only ones
                  this scene&apos;s events (Berlin, Vienna) actually need, are unaffected, so the default map view
                  centers there rather than hiding the outdated region.
                </p>
                <p className="mt-2 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
                  Verified: matches the mapAsset record in the project&apos;s own production investigation
                  fixture and its map-source documentation.
                </p>
              </div>
              <MediaFrame
                interactive
                src="/case-studies/chronicle/map-july-crisis-europe.jpg"
                alt="Europe at the Present Time - William R. Shepherd, Historical Atlas (1911), the actual map asset wired into Chronicle's July Crisis investigation"
                sizes="300px"
                className="aspect-[2243/1840] lg:order-2 lg:sticky lg:top-8"
              />
            </div>

            <p
              className="mt-10 mb-4"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              Real defects this discipline caught before shipping
            </p>
            <NumberedList items={INTEGRITY_DEFECTS} />
          </Section>
        </Container>
      </section>

      {/* ---------- 08: Decisions ---------- */}
      <section id="s7" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="08" label="Decisions" heading="Decisions that shaped the system">
            <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-10">
              {cs.decisions!.map((d, i) => (
                <Reveal key={d.decision} delay={i * 60}>
                  <DecisionBlock decision={d.decision} rationale={d.rationale} alternatives={d.alternatives} result={d.result!} />
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 09: Verification, status, and reflection ---------- */}
      <section id="s8" style={BAND.tint}>
        <Container variant="standard" className="pt-16 md:pt-20">
          <Section accentLabel number="09" label="Status & next" heading="Verification, current status, and what's next" />
          <div className="mt-6 grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] gap-x-14 gap-y-6 items-start">
            <p style={{ color: "var(--color-text)", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)" }}>
              Everything below is a dated snapshot of a fast-moving branch, not a permanent scoreboard.
            </p>
            <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
              As most recently recorded in the project&apos;s own delivery log: the Python backend passed 514
              automated tests (4 skipped, plus a local-Ollama integration test that only runs when Ollama is
              actually installed), and the frontend passed typecheck, lint, a production build, 103 unit tests,
              and 14 Playwright browser journeys covering keyboard operability and accessibility. These cover
              everything through the committed corpus/tool layer, not the Planner/Analyst/runner code written
              since, which is not yet included in a passing run.
            </p>
          </div>

          <div>
            <Grid className="mt-10">
              {VERIFICATION_STATS.map((s, i) => (
                <div key={s.label} className={`col-span-2 ${spanFor(i, VERIFICATION_STATS.length)}`}>
                  <Reveal delay={i * 60}>
                    <Metric value={s.value} label={s.label} />
                  </Reveal>
                </div>
              ))}
            </Grid>

            <Grid className="mt-10">
              <div className="col-span-4 lg:col-span-6">
                <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                  Complete
                </p>
                <NumberedList items={COMPLETE_LIST} compact />
              </div>
              <div className="col-span-4 lg:col-span-6">
                <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                  Next / in progress
                </p>
                <NumberedList items={NEXT_LIST} compact />
              </div>
            </Grid>
          </div>
        </Container>

        <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28 border-t border-[var(--color-line)]">
          <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Reflection
          </p>
          <h2 className="mt-2 mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
            What building this actually taught me
          </h2>

          <Grid>
            {REFLECTION_CARDS.map((r, i) => (
              <div key={r.title} className="col-span-4 lg:col-span-6">
                <Reveal delay={i * 90}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                      {r.category}
                    </p>
                    <h3 className="mt-3 mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}>
                      {r.title}
                    </h3>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r.body}</p>
                  </div>
                </Reveal>
              </div>
            ))}
          </Grid>

          <p className="mt-10 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
            {cs.note}
          </p>
        </Container>
      </section>
    </div>
  );
}

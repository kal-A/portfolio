import Image from "next/image";
import Link from "next/link";
import ProjectIcon from "@/components/ProjectIcon";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import Reveal from "@/components/Reveal";

const INK_GRADIENT = "linear-gradient(135deg, #5c7ea3, #1f3a52)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(46,74,107,0.16) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(169,121,31,0.14) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(92,126,163,0.18) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #eef1e9";
const TONE_PARCHMENT =
  "radial-gradient(circle at 14% 10%, rgba(46,74,107,0.12) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(169,121,31,0.08) 0%, transparent 46%), #eef1e9";
const TONE_SLATE =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.28) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(31,58,82,0.18) 0%, transparent 46%), linear-gradient(180deg, #c7d3e2 0%, #b6c5db 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(92,126,163,0.18) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(169,121,31,0.08) 0%, transparent 46%), linear-gradient(180deg, #1f2d3d 0%, #17222e 55%, #10181f 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: "#s1", label: "Product thesis", icon: <><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></> },
  { href: "#s2", label: "Workspace", icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18" /></> },
  { href: "#s3", label: "Evidence model", icon: <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></> },
  { href: "#s4", label: "Pipeline", icon: <><circle cx="6" cy="12" r="2.3" /><circle cx="12" cy="12" r="2.3" /><circle cx="18" cy="12" r="2.3" /><path d="M8.3 12h1.4M14.3 12h1.4" /></> },
  { href: "#s5", label: "Agent system", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></> },
  { href: "#s6", label: "Integrity rules", icon: <><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></> },
  { href: "#s7", label: "Decisions", icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
  { href: "#s8", label: "Status & next", icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></> },
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

function StatusPill({ tone, children }: { tone: "built" | "foundation" | "progress" | "future"; children: React.ReactNode }) {
  const styles =
    tone === "built"
      ? { background: "var(--ink)", color: "#fdfaf5", borderColor: "var(--ink)" }
      : tone === "foundation"
        ? { background: "#dbe3ee", color: "#1f3a52", borderColor: "#1f3a52" }
        : tone === "progress"
          ? { background: "#f0c98a", color: "#3a2a12", borderColor: "#a9791f" }
          : { background: "transparent", color: "#e4ecf5", borderColor: "#e4ecf5" };
  return (
    <span
      className="inline-block text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2"
      style={styles}
    >
      {children}
    </span>
  );
}

function ChainNode({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="cs-box white px-5 py-4 min-w-[150px]">
      <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#2e4a6b" }}>
        {title}
      </p>
      <p className="text-sm leading-snug" style={{ color: "var(--ink)" }}>
        {sub}
      </p>
    </div>
  );
}

const AGENT_ROLES = [
  {
    role: "Investigation Planner",
    job: "Converts a question plus workspace context into a typed InvestigationPlan.",
    statusTone: "progress" as const,
    statusLabel: "In active development, uncommitted",
    exists: [
      "generate_structured() call shape (E1)",
      "10 typed tools to plan calls against (E2)",
      "A working implementation with deterministic post-generation gates, written but not yet committed or passing its own test suite",
    ],
  },
  {
    role: "Evidence Analyst",
    job: "Builds a structured AnalysisDraft from retrieved evidence.",
    statusTone: "progress" as const,
    statusLabel: "In active development, uncommitted",
    exists: [
      "Same structured-output call shape",
      "Real retrieved evidence via search_passages / get_claim_evidence / get_relationship_evidence (E2)",
      "A working implementation plus a deterministic grounding validator that checks every draft statement traces to the retrieved evidence bundle, not yet committed or passing its own test suite",
    ],
  },
  {
    role: "Historical Critic",
    job: "Produces an approve / downgrade / reject / abstain decision challenging the Analyst's draft.",
    statusTone: "future" as const,
    statusLabel: "Architected, not built",
    exists: ["find_counterevidence / trace_relationships (E2) give it something concrete to check a draft against"],
  },
  {
    role: "Investigation Guide",
    job: "Turns critic-approved material into a cited, user-facing answer with typed map actions.",
    statusTone: "future" as const,
    statusLabel: "Architected, not built",
    exists: ["Typed AssistantAction contract already specified", "get_map_context (E2) resolves a map action's referenced IDs"],
  },
];

export default function ChronicleCaseStudy() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <div style={{ background: HERO_BG }}>
        <div className="mx-auto max-w-5xl px-6 pt-8 pb-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <Reveal className="flex-1 min-w-0">
              <Link href="/work" className="text-sm font-semibold" style={{ color: "var(--ink-soft)" }}>
                ← All case studies
              </Link>

              <div
                className="w-[76px] h-[76px] rounded-[20px] mt-3.5 flex items-center justify-center border-[3px] border-white/90"
                style={{ background: INK_GRADIENT, boxShadow: "0 10px 26px -8px rgba(31,58,82,0.45)" }}
              >
                <ProjectIcon slug="chronicle" className="w-[38px] h-[38px]" style={{ color: "#fdfaf5" }} />
              </div>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "#2e4a6b" }}>
                Chronicle · Ongoing independent product / AI systems project
              </p>
              <h1
                className="font-serif text-4xl sm:text-[50px] leading-[1.05] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                An AI-first historical investigation workspace, built to argue from evidence
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Solo build · 2026 - ongoing
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                Chronicle turns a historical question into a bounded, auditable, evidence-linked
                investigation: a map-first workspace over a schema-validated generation contract,
                being built toward a four-role agent system that has to cite reviewed evidence
                instead of inventing history. This page is a snapshot of an active project, not a
                finished product, and says so explicitly wherever a phase is still architecture,
                not code.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {["Agent Architecture", "Local/Open-Weight LLM", "Historical Provenance", "Not Yet Publicly Deployed"].map(
                  (chip) => (
                    <span key={chip} className="cs-pill text-xs font-extrabold px-3.5 py-1.5">
                      {chip}
                    </span>
                  )
                )}
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-10 md:mt-40 w-full md:w-[300px] shrink-0">
              <nav className="cs-box white px-6 py-7" style={{ background: "#fffdf8" }}>
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#2e4a6b" }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Eight sections, from the product thesis through to what&apos;s actually next.
                </p>
                {NAV_LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="opn-link flex items-center gap-3.5 text-base font-bold py-2.5 px-2.5 -mx-2.5"
                    style={{ color: "var(--ink)", borderTop: i === 0 ? "none" : "1.5px dashed rgba(32,28,23,0.16)" }}
                  >
                    <span
                      className="navicon w-[26px] h-[26px] shrink-0 rounded-lg border-[1.5px] flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #dbe3ee, #b6c5db)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: "#1f3a52" }}>
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
              accentGradient={INK_GRADIENT}
              icon={<><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M12 8v5" /><circle cx="12" cy="16" r="0.6" fill="currentColor" /></>}
            >
              Build an AI system that can reason over historical evidence without losing
              provenance, uncertainty, or temporal meaning, on zero paid infrastructure.
            </SnapshotBox>
            <SnapshotBox
              label="Contribution"
              accentGradient={INK_GRADIENT}
              icon={<><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2z" /></>}
            >
              Solo-designed and built the contract, deterministic pipeline, map-first workspace,
              and the model-provider and typed-tool foundation the agent layer will run on.
            </SnapshotBox>
            <SnapshotBox
              label="Status"
              accentGradient={INK_GRADIENT}
              icon={<><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>}
            >
              Two real investigations proven on one generic contract; a local model wired
              end-to-end; a corpus/tool layer committed; the first two of four agent roles
              (Planner, Evidence Analyst) now actively in development.
            </SnapshotBox>
            <SnapshotBox
              label="Tools"
              accentGradient={INK_GRADIENT}
              icon={<><path d="M4 6h16M4 12h16M4 18h10" /></>}
            >
              Python, Pydantic, TypeScript, React, Ollama, MapLibre GL JS, Claude Code.
            </SnapshotBox>
          </SnapshotGrid>
        </div>
      </div>

      {/* ---------- 01: Product thesis ---------- */}
      <div id="s1" className="cs-seam" style={{ background: TONE_SLATE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="Why historical investigation needs structure">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              An ordinary historical summary compresses disagreement, uncertain timing, and
              disputed causation into confident prose. Chronicle&apos;s working assumption is that
              this compression is the actual problem, not a stylistic choice: events are
              interconnected, causal claims need evidence, sources disagree with each other, and{" "}
              <em className="not-italic font-extrabold" style={{ color: "#2e4a6b" }}>
                when
              </em>{" "}
              someone knew something is a separate fact from when the event itself happened. A
              product that answers a historical question well has to keep all of that attached to
              the answer, not smooth it away.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Rules the data model enforces, not just style guidance
            </p>
            <div className="cs-box white px-6 py-6">
              <ul className="flex flex-col gap-3">
                {[
                  "Relationships between events are classified as directly supported, indirectly supported, contextual, correlational, disputed, speculative, or insufficient evidence. Chronological adjacency alone is never treated as causation.",
                  "Event-time, report-time, message-sent-time, message-received-time, actor-awareness-time, discovery-time, and interpretation-time are kept as separate fields, never collapsed into one \"date.\"",
                  "City-level evidence can never render as an exact building-level location, and modern political borders are never reused to imply historical political geography.",
                ].map((c) => (
                  <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                    <span
                      className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: "linear-gradient(135deg, #dbe3ee, #b6c5db)", borderColor: "var(--ink)", color: "var(--ink)" }}
                    >
                      §
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 02: Workspace ---------- */}
      <div id="s2" className="cs-seam" style={{ background: TONE_PARCHMENT }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="02" title="A map-first workspace, not an article">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              The original renderer presented an investigation as a single scrollable article.
              Chronicle now opens a bounded, focused map for the investigation&apos;s actual
              geography, with a docked panel beside it (mobile: a bottom sheet) carrying Ask,
              Explore, Evidence, and Sources tabs, plus historical &quot;lenses&quot; that change
              what the map and timeline surface. The original article-first view is preserved,
              not deleted, as an accessible &quot;Inspector&quot; mode.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Reconstructed workspace layout
            </p>
            <div className="cs-box white px-6 py-6">
              <div className="grid sm:grid-cols-[1fr_260px] gap-4">
                <div className="cs-box light px-5 py-10 flex flex-col items-center justify-center text-center gap-1.5">
                  <p className="text-sm font-extrabold uppercase tracking-wide" style={{ color: "#2e4a6b" }}>
                    Map canvas
                  </p>
                  <p className="text-xs leading-snug" style={{ color: "#4c473e" }}>
                    Bounded scope, events, places, routes, lens-filtered
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {["Ask", "Explore", "Evidence", "Sources"].map((tab) => (
                    <div key={tab} className="cs-box light px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink)" }}>
                      {tab} tab
                    </div>
                  ))}
                </div>
              </div>
              <div className="cs-box light px-5 py-3 mt-4 text-center text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink)" }}>
                Persistent timeline
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-xl font-black" style={{ color: "var(--ink-soft)" }}>↓</span>
                <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
                  Preserved, not replaced
                </span>
              </div>
              <div className="cs-box light px-5 py-3 mt-4 text-center text-xs font-extrabold uppercase tracking-wide" style={{ color: "#2e4a6b" }}>
                Inspector: the original article-first narrative, evidence, and graph view
              </div>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: "var(--ink-soft)" }}>
              Reconstructed diagram based on the workspace&apos;s own architecture documentation,
              not a live product screenshot.
            </p>

            <p className="text-lg leading-[1.8] max-w-2xl mt-9" style={{ color: "var(--ink)" }}>
              Entry starts as a conversational &quot;Ask&quot; surface: a typed question is
              keyword-matched against the investigations that actually exist today. On a match,
              a scope-review card shows the real proposed scope before a generation-progress
              checklist (built from the pipeline&apos;s own 8 real stage names, not invented copy)
              hands off into the workspace. On no match, the surface says so honestly rather than
              guessing.
            </p>
          </Chapter>
        </div>
      </div>

      {/* ---------- 03: Evidence model ---------- */}
      <div id="s3" className="cs-seam" style={{ background: TONE_SLATE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="03" title="An evidence model built to be interrogated">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Every claim has to trace back through a chain: a Source (with a recorded type and
              rights status) produces Documents, which are broken into cited Passages, which
              support Claims and Relationships. A Claim with no traceable supporting passage is
              structurally invalid and rejected at write time, not just flagged for later review.
            </p>

            <div className="flex items-center gap-3 flex-wrap my-9">
              <ChainNode title="Source" sub="Type + rights status recorded" />
              <span className="text-2xl font-black shrink-0" style={{ color: "var(--ink)" }}>→</span>
              <ChainNode title="Document" sub="Derived from a specific Source" />
              <span className="text-2xl font-black shrink-0" style={{ color: "var(--ink)" }}>→</span>
              <ChainNode title="Passage" sub="The cited unit of text" />
              <span className="text-2xl font-black shrink-0" style={{ color: "var(--ink)" }}>→</span>
              <ChainNode title="Claim / Relationship" sub="Supported, never asserted alone" />
            </div>

            <div className="cs-box light px-6 py-5 max-w-2xl">
              <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                <span className="font-extrabold" style={{ color: "#2e4a6b" }}>Disputed relationships</span> are a
                first-class case, not an edge case: a disputed relationship must carry both a
                supporting evidence link and a counterevidence link, not just an assertion. The
                Concert of Europe investigation&apos;s Troppau-doctrine relationship (Britain&apos;s
                rejection of the intervention principle) exercises exactly this path with real
                sourced content.
              </p>
            </div>

            <p className="text-lg leading-[1.8] max-w-2xl mt-9" style={{ color: "var(--ink)" }}>
              Review status is modelled as a real state machine (proposed → reviewed / disputed /
              rejected, with disputed shown honestly as disputed rather than hidden), and every
              AI-touched field is required to carry a prompt version, model version, and
              processing timestamp. As of this write-up that state machine and its persistence
              layer are a documented target contract, not a running service: only the file-based
              generation-run storage actually exists today, and the docs say so plainly rather
              than implying a database that isn&apos;t there.
            </p>
          </Chapter>
        </div>
      </div>

      {/* ---------- 04: Pipeline ---------- */}
      <div id="s4" className="cs-seam" style={{ background: TONE_PARCHMENT }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="04" title="Proving the pipeline before the model">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Before any model call existed, a resumable, file-persisted, 8-stage Python pipeline
              was built and proven mechanically: deterministic mock providers produced a
              schema-valid package for <em className="not-italic font-extrabold" style={{ color: "#2e4a6b" }}>any</em> topic
              string, disclosed as synthetic, purely to prove the contract and engine worked
              end to end. Each stage reruns only when its own input hash actually changed, so a
              failed run resumes without redoing finished work.
            </p>

            <div className="mt-9">
              <ProcessFlow steps={PIPELINE_STEPS} accent="#2e4a6b" />
            </div>

            <p className="text-lg leading-[1.8] max-w-2xl mt-10" style={{ color: "var(--ink)" }}>
              A second, real investigation, &quot;The Concert of Europe and Revolutionary
              Intervention, 1814-1822,&quot; was then hand-curated through that exact same
              pipeline: real Sources (the Congress of Vienna&apos;s General Treaty, the Troppau
              Protocol, Castlereagh&apos;s State Paper of 1820), real Persons (Metternich,
              Alexander I, Castlereagh, Canning), and a genuinely disclosed sourcing gap where no
              primary Congress of Verona document was located, stated plainly rather than papered
              over. It renders through the identical generic frontend renderer as the original
              hand-authored investigation, with an automated check confirming no topic-specific
              constants leak into shared code.
            </p>

            <div className="grid sm:grid-cols-[220px_1fr] gap-6 items-start mt-9 max-w-2xl">
              <div className="relative w-full aspect-[961/1537] rounded-lg overflow-hidden border-[3px]" style={{ borderColor: "var(--ink)" }}>
                <Image
                  src="/case-studies/chronicle/map-concert-of-europe-1815.jpg"
                  alt="Treaty Adjustments, 1814, 1815 - William R. Shepherd, Historical Atlas (1911), p.157"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                  The real, rights-cleared period map behind the Vienna scene: William R.
                  Shepherd, <em>Historical Atlas</em> (1911), &quot;Treaty Adjustments, 1814,
                  1815,&quot; p. 157, public domain. It is deliberately{" "}
                  <span className="font-extrabold" style={{ color: "#2e4a6b" }}>not</span> attached
                  to the investigation&apos;s second scene (the Troppau/Laibach/Verona era, five to
                  seven years later): the plate documents an earlier settlement, so the honest
                  choice was no map for that scene, disclosed as a gap rather than misapplied.
                </p>
                <p className="text-xs mt-2 italic" style={{ color: "var(--ink-soft)" }}>
                  Verified: matches the project&apos;s own map-source documentation.
                </p>
              </div>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 05: AI-agent system ---------- */}
      <div id="s5" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex flex-col md:flex-row gap-11">
            <div className="md:w-[280px] shrink-0">
              <p className="font-serif text-6xl md:text-[88px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>05</p>
              <h2 className="font-serif text-3xl md:text-[36px] leading-tight text-balance" style={{ color: "#fdfaf5" }}>
                The AI-agent system: what&apos;s built, what&apos;s next
              </h2>
              <div className="mt-6">
                <StatusPill tone="future">Product core, not shipped yet</StatusPill>
              </div>
            </div>
            <div className="flex-1 min-w-0 border-l-[3px] pl-9" style={{ borderColor: "#f0c98a" }}>
              <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "#f3efe6" }}>
                A documented mid-project correction reframed Chronicle: the domain-specialized,
                four-role LLM agent system is the actual product core, and the historical
                investigations are its proving ground, not the other way around. No autonomous
                agent swarm: exactly four bounded roles, typed inputs and outputs, until an
                evaluation harness proves a fifth role is actually needed.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-9">
                {AGENT_ROLES.map((r) => (
                  <div key={r.role} className="cs-box dark px-5 py-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="font-serif text-xl" style={{ color: "#fdfaf5" }}>{r.role}</p>
                    </div>
                    <StatusPill tone={r.statusTone}>{r.statusLabel}</StatusPill>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: "#d8d3c6" }}>{r.job}</p>
                    <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3 mb-1.5" style={{ color: "#f0c98a" }}>
                      What already exists for it
                    </p>
                    <ul className="flex flex-col gap-1">
                      {r.exists.map((e) => (
                        <li key={e} className="text-xs leading-snug flex gap-2" style={{ color: "#b9c8db" }}>
                          <span style={{ color: "#f0c98a" }}>-</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="text-[15px] font-extrabold uppercase tracking-wide mt-10 mb-4" style={{ color: "#fdfaf5" }}>
                What the foundation underneath them actually is
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="cs-box dark px-5 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="font-bold text-sm" style={{ color: "#fdfaf5" }}>Model-provider layer</p>
                    <StatusPill tone="built">Built &amp; smoke-tested</StatusPill>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#d8d3c6" }}>
                    A provider-agnostic protocol, a deterministic test provider, and a real local
                    Ollama provider running Qwen2.5:7b-instruct, chosen after an explicit hardware
                    audit (13.69 GB RAM, integrated GPU, CPU-only). A named failure taxonomy and a
                    bounded retry-with-feedback path handle malformed structured output. A real
                    end-to-end smoke test produced valid schema output on the first attempt, at
                    zero inference cost, proving the wiring, not complex reasoning.
                  </p>
                </div>
                <div className="cs-box dark px-5 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="font-bold text-sm" style={{ color: "#fdfaf5" }}>Corpus and typed tools</p>
                    <StatusPill tone="built">Committed &amp; pushed, not yet merged to master</StatusPill>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#d8d3c6" }}>
                    A read-only corpus service over the validated investigation packages, and 10
                    deterministic tools (search_passages, get_claim_evidence,
                    find_counterevidence, trace_relationships, get_map_context, and others) an
                    agent calls. Historical-integrity rules are enforced in the tool layer itself:
                    evidence roles stay attached to their target, time roles stay separate, and
                    map output preserves precision instead of implying false accuracy.
                  </p>
                </div>
                <div className="cs-box dark px-5 py-5 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="font-bold text-sm" style={{ color: "#fdfaf5" }}>Planner, Analyst, and the agent runner</p>
                    <StatusPill tone="progress">In active development, uncommitted</StatusPill>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#d8d3c6" }}>
                    A working Investigation Planner and Evidence Analyst, a deterministic
                    grounding validator that checks every Analyst statement traces back to the
                    retrieved evidence bundle rather than trusting a model&apos;s own claim, and a
                    bounded tool-calling runner that executes a Planner&apos;s plan over the ten typed
                    tools above, all now exist in the codebase, alongside early scaffolding for an
                    evaluation/benchmark harness. None of this is committed yet, and it is not
                    currently passing its own verification suite, so it is tracked here as work in
                    progress, not claimed as built.
                  </p>
                </div>
              </div>

              <p className="text-lg leading-[1.8] max-w-2xl mt-9" style={{ color: "#f3efe6" }}>
                What does <span className="font-extrabold">not</span> exist yet, stated plainly:
                the Historical Critic and Investigation Guide roles, a passing test suite for the
                Planner/Analyst/runner code above, an API layer, real assistant answers in the
                workspace (the Ask panel stays an honestly disclosed placeholder), an evaluation
                harness that produces verified results, and any database or live web retrieval.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- 06: Historical integrity ---------- */}
      <div id="s6" className="cs-seam" style={{ background: TONE_PARCHMENT }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="06" title="Historical integrity as a hard constraint, not a style guide">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Rules like &quot;chronological adjacency never implies causation&quot; are easy to
              write down and easy to quietly violate under deadline pressure. Chronicle enforces
              them as schema and validator rules, checked at write time, in both the TypeScript
              and Python contracts, not as documentation someone has to remember to follow.
            </p>

            <div className="grid sm:grid-cols-[220px_1fr] gap-6 items-start mt-9 max-w-2xl">
              <div className="relative w-full aspect-[2243/1840] rounded-lg overflow-hidden border-[3px]" style={{ borderColor: "var(--ink)" }}>
                <Image
                  src="/case-studies/chronicle/map-july-crisis-europe.jpg"
                  alt="Europe at the Present Time - William R. Shepherd, Historical Atlas (1911), the actual map asset wired into Chronicle's July Crisis investigation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                  The real map wired into Chronicle&apos;s own July Crisis investigation:
                  William R. Shepherd, <em>Historical Atlas</em> (1911), &quot;Europe at the
                  Present Time,&quot; pp. 166-167, public domain, digitized by the Perry-Castañeda
                  Library. Its own sourcing doc discloses a genuine gap: the plate&apos;s
                  Balkan/Ottoman boundaries predate the 1912-13 Balkan Wars and do not match
                  July 1914&apos;s real borders. Germany&apos;s and Austria-Hungary&apos;s
                  boundaries, the only ones this scene&apos;s events (Berlin, Vienna) actually
                  need, are unaffected, so the default map view centers there rather than hiding
                  the outdated region.
                </p>
                <p className="text-xs mt-2 italic" style={{ color: "var(--ink-soft)" }}>
                  Verified: matches the mapAsset record in the project&apos;s own production
                  investigation fixture and its map-source documentation.
                </p>
              </div>
            </div>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-10 mb-4" style={{ color: "var(--ink)" }}>
              Real defects this discipline caught before shipping
            </p>
            <div className="cs-box white px-6 py-6">
              <ul className="flex flex-col gap-3">
                {[
                  "A serialization mismatch: Python's model_dump() wrote unset optional fields as null, while the TypeScript/Zod contract requires the key to be fully absent. A present-but-null field passed Python's validator but silently failed the frontend's. Caught during integration, fixed with an explicit exclude_none serialization step.",
                  "A reuse-vs-rerun bug in the workflow engine: resuming a run with a different provider set could have wrongly reused stale output instead of re-running, because the reuse check compared a version field that was hardcoded rather than actually threaded through. Fixed and covered by a regression test.",
                  "An accessibility bug in the new workspace: a heading skipped from the page's h1 straight to h3 with no intervening h2, caught by an automated axe scan the same session it was introduced, not after the fact.",
                  "A retry-classification bug in the model-provider layer: HTTP 5xx responses and a flat connection refusal were initially bucketed under the same retryable error type, when a 5xx from a local daemon usually means something is actually broken, not a transient blip worth retrying immediately.",
                ].map((c) => (
                  <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                    <span
                      className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: "linear-gradient(135deg, #dbe3ee, #b6c5db)", borderColor: "var(--ink)", color: "var(--ink)" }}
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

      {/* ---------- 07: Decisions ---------- */}
      <div id="s7" className="cs-seam" style={{ background: TONE_SLATE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="07" title="Decisions that shaped the system">
            <div className="flex flex-col gap-6">
              {[
                {
                  decision: "Map-first workspace instead of an article-first renderer.",
                  rationale:
                    "The original renderer presented an investigation as a single scrollable article. A historical investigation is spatial and relational, so the map became the primary canvas, with a docked assistant panel beside it.",
                  alt: "Keep the article-first view as the only experience and add a map as a secondary tab.",
                  result:
                    "Both experiences exist: the map-first workspace as default, and the original article-first view preserved as an accessible Inspector mode.",
                },
                {
                  decision: "The four-agent LLM system is the product core, not the historical content around it.",
                  rationale:
                    "A documented mid-project correction: the domain-specialized agent system is what Chronicle is actually about. The existing curated investigations are its benchmark corpora, not the point.",
                  alt: "Keep expanding hand-curated historical content and treat AI as an add-on feature.",
                  result:
                    "The roadmap was rewritten around this correction. No new hand-authored investigation content ships until the agent layer exists to be evaluated against it.",
                },
                {
                  decision: "Local, open-weight model over a paid hosted API.",
                  rationale:
                    "A real hardware audit (13.69 GB RAM, integrated GPU, no realistic acceleration path) was run before any model comparison, to keep the project inside a genuine zero-paid-infrastructure constraint.",
                  alt: "A frontier hosted API for stronger structured-output reliability.",
                  result:
                    "Qwen2.5:7b-instruct via Ollama, with a documented, accepted tradeoff: weaker structured-output reliability on a small local model, which is why a bounded retry-with-feedback path exists in the provider layer.",
                },
                {
                  decision: "Deterministic contracts and a mock pipeline before any model call.",
                  rationale:
                    "It's possible to start an \"AI-first\" project by calling a model immediately. Instead, the versioned contract, resumable pipeline, and generic renderer were proven end-to-end with deterministic mock providers on arbitrary topics first.",
                  alt: "Wire a model call early and let the contract shape emerge from what the model returned.",
                  result:
                    "When the real model-provider and tool layer landed, they had a stable, already-tested contract and 10 typed tools to call into, instead of inventing structure under model-output pressure.",
                },
                {
                  decision: "Historical-integrity rules enforced as structural constraints, not writing guidance.",
                  rationale:
                    "Rules like \"chronological adjacency never implies causation\" are easy to state and easy to quietly violate. They're enforced as schema and validator rules, checked at write time, in both contracts.",
                  alt: "Document the rules as authoring guidance and rely on manual review to catch violations.",
                  result:
                    "Real bugs were caught by this discipline before shipping, including the Python/TypeScript serialization mismatch described above.",
                },
              ].map((d) => (
                <div key={d.decision} className="cs-box white px-6 py-5">
                  <p className="font-serif text-xl" style={{ color: "var(--ink)" }}>{d.decision}</p>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "#4c473e" }}>{d.rationale}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    <span className="font-extrabold" style={{ color: "#2e4a6b" }}>Alternative considered: </span>
                    {d.alt}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                    <span className="font-extrabold" style={{ color: "#2e4a6b" }}>Result: </span>
                    {d.result}
                  </p>
                </div>
              ))}
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 08: Verification, status, and what's next ---------- */}
      <div id="s8" className="cs-seam" style={{ background: TONE_PARCHMENT }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="08" title="Verification, current status, and what's next">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              As most recently recorded in the project&apos;s own delivery log: the Python backend
              passed 514 automated tests (4 skipped, plus a local-Ollama integration test that
              only runs when Ollama is actually installed), and the frontend passed typecheck,
              lint, a production build, 103 unit tests, and 14 Playwright browser journeys
              covering keyboard operability and accessibility. This is a fast-moving branch, so
              treat these as a dated snapshot, not a permanent number: they cover everything
              through the committed corpus/tool layer, not the Planner/Analyst/runner code
              written since, which is not yet included in a passing run.
            </p>

            <div className="mt-9">
              <StatGrid
                valueColor="#2e4a6b"
                stats={[
                  { value: "514", label: "backend (Python) tests passing" },
                  { value: "103", label: "frontend unit tests passing" },
                  { value: "14", label: "Playwright end-to-end journeys passing" },
                  { value: "10", label: "typed agent tools built" },
                  { value: "8", label: "resumable generation-pipeline stages" },
                  { value: "2", label: "independently-sourced investigations, one renderer" },
                ]}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="cs-box light px-6 py-5">
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-3" style={{ color: "#2e4a6b" }}>
                  Complete
                </p>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                  <li>Versioned, cross-validated generation contract (TS + Python)</li>
                  <li>Resumable 8-stage deterministic pipeline, mock and curated providers</li>
                  <li>Map-first workspace, lenses, docked panel, and preserved Inspector mode</li>
                  <li>Ask entry surface (keyword-matched against real investigations, not generative)</li>
                  <li>Model-provider foundation, smoke-tested against a real local model</li>
                  <li>Corpus service and 10 typed tools, implemented, independently verified, committed and pushed</li>
                </ul>
              </div>
              <div className="cs-box dark px-6 py-5">
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-3" style={{ color: "#f0c98a" }}>
                  Next / in progress
                </p>
                <ul className="flex flex-col gap-2 text-sm leading-relaxed" style={{ color: "#d8d3c6" }}>
                  <li>Stabilizing the Investigation Planner, Evidence Analyst, grounding validator, and tool-calling runner already written, but uncommitted and not yet passing their own test suite</li>
                  <li>The Historical Critic and Investigation Guide roles, not yet started</li>
                  <li>An API layer and real assistant answers in the workspace&apos;s Ask panel</li>
                  <li>A working evaluation harness with real, verified results (early scaffolding exists, no numbers yet)</li>
                  <li>A real human comprehension study for the map-first workspace (test plan written, not yet run)</li>
                  <li>Live web retrieval, embeddings, and a database-backed review service (currently schema-only)</li>
                </ul>
              </div>
            </div>
          </Chapter>

          <div className="mt-16 border-t-[3px] pt-8" style={{ borderColor: "var(--ink)" }}>
            <h2 className="font-serif text-lg mb-3" style={{ color: "var(--ink)" }}>Reflection</h2>
            <ul className="flex flex-col gap-2.5 max-w-2xl">
              {[
                "The roadmap has genuinely changed direction twice at the product-framing level (map-first, then agent-as-core), and writing both corrections down as dated decisions, instead of quietly absorbing them, made the second correction faster to reason about than the first.",
                "Proving the deterministic pipeline mechanically, on synthetic topics, before curating real historical content, felt slow at the time. It meant the eventual model-provider and tool layer had a stable, already-tested contract to build against instead of inventing structure under model-output pressure.",
                "A local 7B model is a real constraint, not a footnote. The retry-with-feedback path in the provider layer exists specifically because a small local model is measurably less reliable at structured output than a hosted frontier model, and that tradeoff is designed around, not hidden.",
              ].map((r) => (
                <li key={r} className="text-sm leading-relaxed flex gap-2" style={{ color: "#4c473e" }}>
                  <span style={{ color: "var(--ink-soft)" }}>-</span>
                  {r}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm italic border-l-2 pl-4 max-w-2xl" style={{ color: "var(--ink-soft)", borderColor: "rgba(32,28,23,0.2)" }}>
              The map-first workspace has automated keyboard, accessibility, and mechanical test
              coverage, but no real human comprehension study has been run yet. That is the next
              validation gap I would close before trusting the workspace design, and it is written
              down as an open test plan rather than skipped.
            </p>

            <p className="mt-8 text-sm italic" style={{ color: "var(--ink-soft)" }}>
              Chronicle is an active, independent project. This page reflects the state of the
              project&apos;s own documentation at the time it was written, and is explicit about
              what&apos;s built versus what&apos;s still architected only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import Reveal from "@/components/Reveal";

const BLUE_GRADIENT = "linear-gradient(135deg, #7fb0dd, #3a6b93)";
const RED_GRADIENT = "linear-gradient(135deg, #d97a7a, #a12f2f)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(178,58,58,0.12) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(58,107,147,0.18) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(127,176,221,0.24) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.05) 0%, transparent 46%), #f5f8fb";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(127,176,221,0.18) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(178,58,58,0.08) 0%, transparent 46%), #f5f8fb";
const TONE_BLUE =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.35) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(58,107,147,0.2) 0%, transparent 46%), linear-gradient(180deg, #cfe3f5 0%, #a9cbe8 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(127,176,221,0.16) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(178,58,58,0.12) 0%, transparent 46%), linear-gradient(180deg, #232a33 0%, #1c222a 55%, #151920 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s-plan",
    label: "The curriculum problem",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 10.5h16M9.5 4v16" />
      </>
    ),
  },
  {
    href: "#s-research",
    label: "Research flow",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L21 21" />
      </>
    ),
  },
  {
    href: "#s-implementation",
    label: "No-code vs. coded",
    icon: (
      <>
        <path d="M12 4v5" />
        <path d="M12 9l-6 5v6M12 9l6 5v6" />
      </>
    ),
  },
  {
    href: "#s-delivery",
    label: "Organizing six people",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: "#s-automation",
    label: "Content automation",
    icon: (
      <>
        <path d="M8 3L4 7l4 4M16 21l4-4-4-4M4 7h9a4 4 0 0 1 4 4v1M20 17H11a4 4 0 0 1-4-4v-1" />
      </>
    ),
  },
  {
    href: "#s-outcomes",
    label: "Outcomes",
    icon: <path d="M4 18l5-6 4 3 7-9M14 6h6v6" />,
  },
  {
    href: "#s-reflection",
    label: "Reflection",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
  },
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
      "The requirement got an owner, a place in its topic track's sequence, and a build method, no-code or coded, based on what the page actually needed.",
  },
];

const AUTOMATION_STEPS: ProcessStep[] = [
  {
    title: "Content Input",
    synopsis:
      "A topic, research finding, or requirement came in as raw notes or a summary that needed to become published content.",
  },
  {
    title: "AI-Assisted Draft",
    synopsis:
      "I used AI tools to turn that raw input into a first-pass draft or transformation, faster than starting from a blank page.",
  },
  {
    title: "Human Review",
    synopsis:
      "Every draft got checked against accuracy, tone, and the original requirement before moving forward. AI output was never published on its own.",
  },
  {
    title: "Formatting",
    synopsis: "Reviewed content was formatted to match the site or platform's structure and style.",
  },
  {
    title: "Publish or Queue",
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
    path: "Java-based frameworks",
    example: "More complex interactive testing and activity experiences",
    why: "Handled logic and state that no-code and static pages couldn't support",
    tradeoff: "Needed a developer to build and maintain",
  },
];

function DecisionCallout({
  accent,
  accentDeep,
  title,
  situation,
  result,
  connectorLabel,
  tight,
}: {
  accent: string;
  accentDeep: string;
  title: string;
  situation: string;
  result: string;
  connectorLabel?: string;
  tight?: boolean;
}) {
  return (
    <Reveal>
      {connectorLabel && (
        <div className={`flex items-center gap-3 pl-1 mb-3 ${tight ? "mt-5" : "mt-8"}`}>
          <span className="text-2xl font-black" style={{ color: accentDeep }}>
            ↓
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
            {connectorLabel}
          </span>
        </div>
      )}
      <div
        className={`cs-box white px-6 py-6 ${connectorLabel ? "" : tight ? "mt-5" : "mt-8"}`}
        style={{ background: "#fffdf8" }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span
            className="w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0"
            style={{ background: accent, borderColor: "var(--ink)" }}
          />
          <p className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: accentDeep }}>
            Decision
          </p>
        </div>
        <p className="font-serif font-bold text-lg mb-2.5" style={{ color: "var(--ink)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
          {situation}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
          <span className="font-extrabold" style={{ color: accentDeep }}>
            Result:{" "}
          </span>
          {result}
        </p>
      </div>
    </Reveal>
  );
}

export default function InformaticaCaseStudy() {
  const cs = getCaseStudy("informatica")!;

  return (
    <div
      style={
        {
          "--cs-wash-from": "#eaf3fb",
          "--cs-wash-to": "#7fb0dd",
          "--cs-light-from": "#f5faff",
          "--cs-light-to": "#cfe3f5",
          "--cs-accent-deep": "#a12f2f",
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

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "#a12f2f" }}>
                Informatica · Product Operations &amp; UX Research Intern
              </p>
              <h1
                className="font-serif text-4xl sm:text-[46px] leading-[1.1] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Breaking an ambiguous cybersecurity curriculum into work a six-person team could execute
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Mississauga, ON · Sep 2023 – Dec 2023
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                Informatica set out to build a new set of cybersecurity educational web experiences,
                covering personal, school, and workplace security plus safe networking practices,
                each with multiple levels and course-like pages. The real problem was never
                publishing the information. It was figuring out how to teach it well, and how six
                co-op students could actually build it together. I helped turn that open-ended goal
                into research, page structure, and build assignments the team could execute, then
                applied the same approach to the rest of Informatica&apos;s web and content requests.
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
              <nav className="cs-box white nav-toc px-6 py-7" style={{ background: "#fffdf8" }}>
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#a12f2f" }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Seven sections, from the curriculum problem through to what I&apos;d take forward.
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
                      style={{ background: "linear-gradient(135deg, #dbe9f5, #a9cbe8)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: "#3a6b93" }}>
                        <Icon>{link.icon}</Icon>
                      </span>
                    </span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>

          {/* At a glance */}
          <div className="pt-16">
            <SnapshotGrid>
              <SnapshotBox
                label="Challenge"
                accentGradient={BLUE_GRADIENT}
                icon={<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>}
              >
                {cs.snapshot?.challenge}
              </SnapshotBox>
              <SnapshotBox
                label="Contribution"
                accentGradient={RED_GRADIENT}
                icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
              >
                {cs.snapshot?.contribution}
              </SnapshotBox>
              <SnapshotBox
                label="Outcome"
                accentGradient={BLUE_GRADIENT}
                icon={<><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>}
              >
                {cs.snapshot?.outcome}
              </SnapshotBox>
              <div className="cs-box white h-full px-6 py-6">
                <div
                  className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                  style={{ background: "linear-gradient(135deg, #7fb0dd, #a12f2f)", borderColor: "var(--ink)" }}
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
                    ["Trello", "backlog and task tracking"],
                    ["Microsoft Planner", "cross-team task ownership"],
                    ["Microsoft Loop", "shared docs and decision logs"],
                    ["Java / classic web dev", "testing and activity pages"],
                    ["No-code tools", "general informational pages"],
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
          </div>
        </div>
      </div>

      {/* ---------- 01: The curriculum problem ---------- */}
      <div id="s-plan" className="cs-seam" style={{ background: TONE_BLUE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="An educational goal, and no structure to build it from">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Informatica wanted a full set of cybersecurity educational web experiences: personal
              cybersecurity, school-related cybersecurity, workplace cybersecurity, and correct
              networking and security practices, each with multiple levels and course-like pages.
              That goal didn&apos;t come with a page structure, a teaching approach, or a plan for
              dividing the work. Six co-op students, including me, had to build all of it, and I
              helped organize how that work got broken up, researched, and built.
            </p>

            <div className="cs-box white px-6 py-6 mt-8">
              <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#3a6b93" }}>
                Team
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "#4c473e" }}>
                {cs.team} My part of that was helping break the educational objective into research,
                planning, diagrams, activities, page design, and development tasks, sequencing them
                across topic tracks, and keeping documentation and coordination visible across all
                six of us.
              </p>
            </div>

            <div className="grid md:grid-cols-[1fr_1.2fr_1fr] gap-4.5 items-center mt-9">
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Personal cybersecurity
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  School cybersecurity
                </div>
              </div>
              <div className="cs-box dark text-center px-5 py-7 font-serif font-bold text-lg">
                Four independent
                <br />
                topic tracks
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Workplace cybersecurity
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Networking &amp; security practices
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
                style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(135deg, #7fb0dd, #a12f2f)" }}
              >
                Reconstructed diagram
              </span>
              Based on the four topic areas the curriculum was organized around. Company-specific
              tool names and records are simplified or omitted.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Constraints
            </p>
            <div className="cs-box white px-6 py-6">
              <ul className="flex flex-col gap-3">
                {(cs.constraints ?? []).map((c) => (
                  <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                    <span
                      className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: "linear-gradient(135deg, #7fb0dd, #3a6b93)", borderColor: "var(--ink)", color: "var(--ink)" }}
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

      {/* ---------- 02: Research flow ---------- */}
      <div id="s-research" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#3a6b93" }}>
              Research
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Research that shaped how each topic got taught
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              The question was rarely just what to say about a topic. It was how to teach it, what
              structure, diagrams, or activities would actually get the concept across to the
              audience that topic track was written for. Select a stage below to see what happened
              there.
            </p>
          </Reveal>
          <ProcessFlow
            steps={RESEARCH_STEPS}
            accent="#3a6b93"
            activeGradient={BLUE_GRADIENT}
            middleLabel="Synthesis turns findings into a recommendation"
          />

          <DecisionCallout
            accent={BLUE_GRADIENT}
            accentDeep="#3a6b93"
            connectorLabel="Resulting execution / curriculum decision"
            tight
            title="Organize the curriculum as four independent topic tracks instead of one continuous course"
            situation="Personal, school, workplace, and networking and security practices are different audiences with different depth needs. As part of planning how the six-person team would divide the work, treating them as one continuous course would have forced everyone to build sequentially instead of in parallel."
            result="Each topic track could be researched, structured, and built independently, so the six-person team could work at the same time instead of waiting on a shared sequence."
          />
        </div>
      </div>

      {/* ---------- 03: No-code vs. coded ---------- */}
      <div id="s-implementation" className="cs-seam" style={{ background: TONE_BLUE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              02
            </p>
            <div className="mt-2">
              <h2 className="font-serif text-[32px] leading-tight text-balance" style={{ color: "var(--ink)" }}>
                Matching the build method to the page, not the project
              </h2>
              <p className="text-lg leading-relaxed max-w-2xl mt-4" style={{ color: "var(--ink)" }}>
                A general page explaining what phishing is has very different needs from an
                interactive quiz testing whether someone can spot one. Rather than pick one build
                approach for the whole curriculum, each page type got matched to the method that
                actually fit it.
              </p>
            </div>
          </Reveal>

          <p className="sm:hidden text-xs font-extrabold uppercase tracking-wide mb-2" style={{ color: "#3a6b93" }}>
            Swipe to see the full table &rarr;
          </p>
          <div className="cs-box white overflow-hidden mt-10">
            <div className="overflow-x-auto">
              <table className="cs-table w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #7fb0dd, #3a6b93)" }}>
                    {["Build method", "Used for", "Why", "Tradeoff"].map((h) => (
                      <th key={h} className="px-5 py-3.5 text-xs font-extrabold uppercase tracking-wide text-[#fff9ee]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {IMPLEMENTATION_PATHS.map((row, i) => (
                    <tr key={row.path} style={{ borderTop: i === 0 ? "none" : "1.5px dashed rgba(32,28,23,0.16)" }}>
                      <td className="px-5 py-4 text-sm font-extrabold" style={{ color: "var(--ink)" }}>
                        {row.path}
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: "#4c473e" }}>
                        {row.example}
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: "#4c473e" }}>
                        {row.why}
                      </td>
                      <td className="px-5 py-4 text-sm" style={{ color: "#4c473e" }}>
                        {row.tradeoff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-5 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <span
              className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
              style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(135deg, #7fb0dd, #a12f2f)" }}
            >
              Reconstructed framework
            </span>
            Describes the general split used across the curriculum, not a literal internal document.
          </p>

          <p className="text-lg leading-relaxed mt-8" style={{ color: "var(--ink)" }}>
            General informational and knowledge pages, the bulk of the curriculum, went through
            no-code tools, so content could be produced and edited quickly. Specialized testing,
            activity, and interactive pages needed logic no-code couldn&apos;t reliably support, so
            those went through classic web development or Java-based frameworks instead, matching
            the extra setup time to the pages that actually needed the flexibility.
          </p>

          <DecisionCallout
            accent={RED_GRADIENT}
            accentDeep="#a12f2f"
            title="Match implementation method to page type instead of picking one build approach for the whole project"
            situation="General knowledge pages needed to be quick to produce and easy to edit, but testing, activity, and interactive pages needed logic such as scoring, state, or custom interaction that no-code tools couldn't reliably support."
            result="No-code tools covered the general informational pages, while classic web development and Java-based frameworks covered the testing, activity, and interactive pages that actually needed the flexibility."
          />
        </div>
      </div>

      {/* ---------- 04: Organizing six people ---------- */}
      <div id="s-delivery" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="03" title="Keeping six people's work visible and consistent">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              None of these tools mattered on their own. What mattered was that six people building
              across four topic tracks could see who owned what, what stage it was at, and where a
              decision had already been made, instead of that living in one person&apos;s head or a
              single conversation.
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mt-8">
              {[
                {
                  accent: "#3a6b93",
                  title: "Trello",
                  body: "Tracked individual page and activity builds inside each topic track, so day-to-day progress across four tracks and six people stayed visible without a status meeting.",
                  icon: (
                    <>
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="7" y="7" width="4" height="8" rx="1" />
                      <rect x="13" y="7" width="4" height="5" rx="1" />
                    </>
                  ),
                },
                {
                  accent: "#a12f2f",
                  title: "Microsoft Planner",
                  body: "Owned the larger deliverables, a full topic track spanning research, page design, and development, so a piece of work with more than one owner had one place tracking who owned what and by when.",
                  icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
                },
                {
                  accent: "#3a6b93",
                  title: "Microsoft Loop",
                  body: "Held shared documentation and decision logs, including the page-structure and build-method calls, so six people writing and building in parallel worked from the same decisions instead of six different interpretations.",
                  icon: <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
                },
              ].map((t, i) => (
                <Reveal key={t.title} delay={i * 90}>
                  <div className="cs-box white px-6 py-6 h-full">
                    <div
                      className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2"
                      style={{ background: t.accent, borderColor: "var(--ink)" }}
                    >
                      <span className="w-5 h-5 text-[#fff9ee]">
                        <Icon>{t.icon}</Icon>
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2.5" style={{ color: "var(--ink)" }}>
                      {t.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                      {t.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-lg leading-relaxed max-w-2xl mt-9" style={{ color: "var(--ink)" }}>
              The same planning approach carried over past the curriculum project: as other web
              application requests, content updates, and process fixes came in from different
              teams, they moved through the same research-to-decision flow and the same
              implementation-path question, rather than getting handled as one-off asks.
            </p>
          </Chapter>
        </div>
      </div>

      {/* ---------- 05: Content automation ---------- */}
      <div id="s-automation" className="cs-seam" style={{ background: TONE_BLUE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#a12f2f" }}>
              Content workflow
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Automating content work, without removing the review
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              Educational and blog-style content updates followed a repeatable shape, which made
              part of the workflow worth automating without removing the judgment calls that
              mattered.
            </p>
          </Reveal>
          <ProcessFlow
            steps={AUTOMATION_STEPS}
            accent="#a12f2f"
            activeGradient={RED_GRADIENT}
            middleLabel="Human review gates everything before it publishes"
          />
          <p className="mt-5 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <span
              className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
              style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(135deg, #7fb0dd, #a12f2f)" }}
            >
              Reconstructed diagram
            </span>
            Describes the shape of the AI-assisted content workflow I supported. Specific tools and
            prompt structures are omitted.
          </p>

          <DecisionCallout
            accent={BLUE_GRADIENT}
            accentDeep="#3a6b93"
            title="Keep AI-assisted drafting paired with a mandatory human review step"
            situation="AI tools could speed up the repetitive part of turning research or notes into a first-pass draft, but accuracy and tone still needed a human check before anything reached a reader."
            result="Draft turnaround got faster without removing the review step that caught accuracy and tone issues before publishing."
          />
        </div>
      </div>

      {/* ---------- 06: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>
              04
            </p>
            <h2 className="font-serif text-4xl text-white mt-2">Outcomes</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#d5dfe8" }}>
              The clearest result was turning one ambiguous educational goal into work six people
              could actually execute. The metrics below describe the internship more broadly, not
              the curriculum project in isolation.
            </p>
          </Reveal>

          <div className="mb-10">
            <StatGrid valueColor="#7fb0dd" stats={cs.metrics.map((m) => ({ value: m.value, label: m.label }))} />
          </div>

          <div className="flex flex-col gap-4">
            {cs.outcome.map((row, i) => (
              <Reveal key={row} delay={i * 70}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: RED_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
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

      {/* ---------- 07: Reflection ---------- */}
      <div id="s-reflection" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              05
            </p>
            <h2 className="font-serif text-[32px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              {
                accent: "#3a6b93",
                title: "An ambiguous goal gets built once it's broken into ownable pieces",
                body: "Splitting the curriculum into four topic tracks, instead of one shared course, was what actually let six people work at the same time.",
                icon: (
                  <>
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M15.5 15.5L21 21" />
                  </>
                ),
              },
              {
                accent: "#a12f2f",
                title: "The right build method depends on the page, not a default",
                body: "Knowledge pages and testing or activity pages needed genuinely different approaches. Treating them the same would have wasted effort either way.",
                icon: (
                  <>
                    <rect x="4" y="4" width="7" height="7" rx="1.5" />
                    <rect x="13" y="13" width="7" height="7" rx="1.5" />
                    <path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" />
                  </>
                ),
              },
              {
                accent: "#3a6b93",
                title: "Planning tools are only as good as the ownership they make visible",
                body: "Trello, Planner, and Loop helped because every page and task had a clear owner across a six-person team, not because of the tools themselves.",
                icon: <path d="M12 4v5M12 9l-6 5v6M12 9l6 5v6" />,
              },
              {
                accent: "#a12f2f",
                title: "Automation should remove repetition, not judgment",
                body: "AI-assisted drafting saved time on the repetitive part of content work. It never replaced the review step, since that's where the real quality control happened.",
                icon: <path d="M8 3L4 7l4 4M16 21l4-4-4-4M4 7h9a4 4 0 0 1 4 4v1M20 17H11a4 4 0 0 1-4-4v-1" />,
              },
            ].map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <div className="cs-box white px-6 py-7 h-full">
                  <div
                    className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2"
                    style={{ background: r.accent, borderColor: "var(--ink)" }}
                  >
                    <span className="w-5 h-5 text-[#fff9ee]">
                      <Icon>{r.icon}</Icon>
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3" style={{ color: "var(--ink)" }}>
                    {r.title}
                  </h3>
                  <p className="text-[15.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {cs.whatIdImprove && (
            <div className="cs-box light px-6 py-6 mt-8">
              <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#a12f2f" }}>
                What I&apos;d improve
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "#4c473e" }}>
                {cs.whatIdImprove}
              </p>
            </div>
          )}

          <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            Internal trackers, boards, and company-specific documentation are omitted for
            confidentiality. The diagrams on this page reconstruct the same planning and research
            logic in a public-safe form.
          </p>
        </div>
      </div>
    </div>
  );
}

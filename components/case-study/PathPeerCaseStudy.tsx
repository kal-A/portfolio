import Link from "next/link";
import Image from "next/image";
import ProjectIcon from "@/components/ProjectIcon";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import Reveal from "@/components/Reveal";

const ORANGE_GRADIENT = "linear-gradient(135deg, #f0954a, #a3430f)";
const BLUE_GRADIENT = "linear-gradient(135deg, #6f8fc4, #22345f)";
const ACCENT_ORANGE = "#a3430f";
const ACCENT_BLUE = "#22345f";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(201,89,26,0.16) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(34,52,95,0.14) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(240,149,74,0.18) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(34,52,95,0.08) 0%, transparent 46%), #fdf6ee";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(201,89,26,0.12) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(34,52,95,0.07) 0%, transparent 46%), #fdf6ee";
const TONE_ORANGE =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.3) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(163,67,15,0.16) 0%, transparent 46%), linear-gradient(180deg, #f6d3ae 0%, #f0be8c 100%)";
const TONE_BLUE =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.26) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(20,30,55,0.2) 0%, transparent 46%), linear-gradient(180deg, #c7d5ec 0%, #aac0e2 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(240,149,74,0.14) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(111,143,196,0.12) 0%, transparent 46%), linear-gradient(180deg, #22345f 0%, #1a2749 55%, #131c38 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s-glance",
    label: "At a glance",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v5M12 16.2v.1" />
      </>
    ),
  },
  {
    href: "#s-friction",
    label: "Finding friction",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-4.35-4.35" />
      </>
    ),
  },
  {
    href: "#s-plan",
    label: "Feature plan",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    href: "#s-nocode",
    label: "No-code execution",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    href: "#s-outcomes",
    label: "Outcomes",
    icon: <path d="M4 18l5-6 4 3 7-9" />,
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

const FRICTION_STEPS: ProcessStep[] = [
  {
    title: "Observe",
    synopsis:
      "Reviewed how users interacted with search and which mentors they shortlisted, then used Google Analytics to see where engagement dropped across those flows.",
  },
  {
    title: "Identify friction",
    synopsis:
      "Watched the matching Hotjar recordings for those drop-off points to see the behavior behind the numbers, not just the number itself.",
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

const PLAN_CHAIN = [
  { label: "Behavior pattern", body: "What Analytics and Hotjar showed at a specific step" },
  { label: "Product problem", body: "Why that behavior mattered to the platform's goals" },
  { label: "Feature definition", body: "The smallest change that would address it" },
  { label: "Delivery plan", body: "What it would take to build and ship" },
];

const KEY_DECISIONS = [
  {
    letter: "A",
    title: "Mentor discovery tags",
    situation:
      "Search behavior kept showing the same pattern: users refining queries around a single signal, mostly job title, with no way to narrow the list further.",
    decision:
      "Define a tag-based discovery layer so mentors could be filtered beyond a title match, even though it meant keeping tags current on every profile.",
    result: "Added to the same feature-plan chain as every other candidate, prioritized before being scoped.",
  },
  {
    letter: "B",
    title: "Homepage flow to new mentors",
    situation:
      "Recordings showed newly added mentors relevant to a user's career path rarely surfaced through search alone.",
    decision:
      "Build a direct homepage flow surfacing newly added mentors matched to a user's career path, giving that space to newer, less-proven profiles over ones already performing well in search.",
    result: "Addressed a visibility problem a search fix on its own would not have solved.",
  },
  {
    letter: "C",
    title: "Shortlisting improvements",
    situation:
      "The same recordings showed a shortlisting pattern: users adding mentors to compare, then abandoning the list.",
    decision:
      "Treated shortlisting as its own friction point rather than an extension of the search problem, worth a separate round of scoping.",
    result: "Folded into the same plan and chain, refined alongside the discovery changes above.",
  },
];

const NOCODE_REASONS = [
  {
    title: "Faster validation",
    body: "Tested whether an idea like a new discovery tag or homepage flow actually helped before scoping full development.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    title: "Lower overhead",
    body: "No environment setup or deployment needed to try an idea in Bubble.io.",
    icon: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6v6H9z" /></>,
  },
  {
    title: "Quicker iteration",
    body: "Adjusted a flow directly instead of filing a new ticket for every tweak.",
    icon: <path d="M4 12a8 8 0 1 1 2.5 5.8M4 12v5.5M4 12H9.5" />,
  },
  {
    title: "Evidence before investment",
    body: "Development time went to ideas that had already shown they worked.",
    icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  },
];

const REFLECTIONS = [
  {
    accent: ACCENT_ORANGE,
    title: "Recordings explain what dashboards can only flag",
    body: "Analytics told me where. Hotjar told me why. I stopped trusting a drop-off number until I'd watched a few of the sessions behind it.",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M20 20l-4.35-4.35" />
      </>
    ),
  },
  {
    accent: ACCENT_BLUE,
    title: "A feature plan is a filter, not a formality",
    body: "Turning a pattern into a defined feature and delivery plan before building it caught changes that would not have actually addressed the friction.",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    accent: ACCENT_ORANGE,
    title: "No-code is worth it when it buys a real answer",
    body: "The value wasn't skipping development. It was using Bubble.io to find out fast enough that the development, when it happened, was aimed at the right fix.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    accent: ACCENT_BLUE,
    title: "Growth and impact aren't the same measurement",
    body: "The 50% and 40% figures describe the internship period, not the loop in isolation. The write-up says what that work likely drove, not more than it can claim.",
    icon: (
      <>
        <path d="M4 20V10M11 20V4M18 20v-7" />
        <path d="M2 20h20" />
      </>
    ),
  },
];

export default function PathPeerCaseStudy() {
  const cs = getCaseStudy("pathpeer")!;
  return (
    <div
      style={
        {
          "--cs-wash-from": "#fdece0",
          "--cs-wash-to": "#f0954a",
          "--cs-light-from": "#fef3e9",
          "--cs-light-to": "#f8ddc9",
          "--cs-accent-deep": ACCENT_ORANGE,
          "--cs-accent-wash-rgb": "201, 89, 26",
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

              <div
                className="w-[76px] h-[76px] rounded-[20px] mt-3.5 flex items-center justify-center border-[3px] border-white/90"
                style={{ background: ORANGE_GRADIENT, boxShadow: "0 10px 26px -8px rgba(163,67,15,0.45)" }}
              >
                <ProjectIcon slug="pathpeer" className="w-[38px] h-[38px]" style={{ color: "#fff9ee" }} />
              </div>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: ACCENT_ORANGE }}>
                PathPeer · Product Designer &amp; Developer Intern
              </p>
              <h1
                className="font-serif text-4xl sm:text-[50px] leading-[1.08] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Turning session recordings into a prioritized feature plan
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Remote (Waterloo, ON) · May 2022 – Aug 2022
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                PathPeer helped users explore career paths and find professionals they could connect
                with as mentors, for networking, advice, and guidance on the career they wanted to
                pursue. I designed and built the platform as PathPeer&apos;s solo product designer and
                developer, working within a small team, then went back into the data. Google Analytics
                showed where engagement was dropping in search and mentor discovery; Hotjar recordings
                showed what was actually happening at those points. I used both to recommend what to
                fix first, turned the strongest patterns into scoped feature and requirement plans, and
                validated smaller ideas with Bubble.io before asking for more development time.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {["Google Analytics", "Hotjar", "Figma", "Bubble.io"].map((chip) => (
                  <span key={chip} className="cs-pill highlight text-xs font-extrabold px-3.5 py-1.5 cursor-default">
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-10 md:mt-24 w-full md:w-[300px] shrink-0">
              <nav className="cs-box white px-6 py-7" style={{ background: "#fffdf8" }}>
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: ACCENT_ORANGE }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Six short sections, from the friction loop through to reflection.
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
                      style={{ background: "linear-gradient(135deg, #f8ddc9, #f0be8c)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: ACCENT_ORANGE }}>
                        <Icon>{link.icon}</Icon>
                      </span>
                    </span>
                    {link.label}
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>

          {/* Hero image */}
          <Reveal className="mt-14">
            <div className="cs-box white overflow-hidden">
              <div className="relative w-full aspect-[1936/1132]">
                <Image
                  src="/case-studies/pathpeer/pathpeer-hero-home.png"
                  alt="PathPeer landing page showing a student asking a mentor how to prepare for a software engineering interview"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              The platform&apos;s live landing page, the same page the analytics and recordings below
              were measuring traffic against.
            </p>
          </Reveal>

          {/* Snapshot */}
          <div id="s-glance" className="pt-16">
            <SnapshotGrid>
              <SnapshotBox
                label="Challenge"
                accentGradient={ORANGE_GRADIENT}
                icon={<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>}
              >
                A live mentor-discovery platform generating real search and shortlisting data, with no
                structured process for turning that data into what to build next.
              </SnapshotBox>
              <SnapshotBox
                label="Contribution"
                accentGradient={ORANGE_GRADIENT}
                icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
              >
                The platform&apos;s original design and build, plus the loop from behavioral evidence
                to scoped feature recommendations within the team.
              </SnapshotBox>
              <SnapshotBox
                label="Outcome"
                accentGradient={ORANGE_GRADIENT}
                icon={<path d="M4 18l5-6 4 3 7-9" />}
              >
                Iterative changes driven by that loop:{" "}
                <em className="not-italic font-extrabold" style={{ color: ACCENT_ORANGE }}>
                  50% higher engagement
                </em>
                , 40% less inactive-user drop-off.
              </SnapshotBox>
              <div className="cs-box white h-full px-6 py-6">
                <div
                  className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                  style={{ background: ORANGE_GRADIENT, borderColor: "var(--ink)" }}
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
                    ["Google Analytics", "usage patterns across the platform"],
                    ["Hotjar", "session recordings behind the numbers"],
                    ["Figma", "design iteration"],
                    ["Bubble.io", "no-code validation before development"],
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

      {/* ---------- 01: Finding friction ---------- */}
      <div id="s-friction" className="cs-seam" style={{ background: TONE_ORANGE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: ACCENT_ORANGE }}>
              01 · Reconstructed workflow
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Finding friction in real behaviour
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-3.5" style={{ color: "var(--ink)" }}>
              Once PathPeer was live, the open question wasn&apos;t whether people were using it. It
              was where they were getting stuck in search and mentor discovery. Analytics could show
              that a step was leaking users, not why. That&apos;s where the recordings came in.
            </p>
          </Reveal>

          <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
            Constraints
          </p>
          <div className="cs-box white px-6 py-6 mb-9">
            <ul className="flex flex-col gap-3">
              {[
                "PathPeer was a small, resource-constrained team. I was the platform's solo designer and developer, so research, design, and no-code execution had to fit inside one person's time rather than dedicated roles.",
                "There was no dedicated PM tooling. Findings, hypotheses, and plans lived in direct notes and conversations instead of a formal backlog.",
                "Product direction and priorities were set within the broader team, not by me alone. My role was to bring recommendations, strategy, and feature plans grounded in behavioral evidence, not to unilaterally decide what PathPeer built next.",
              ].map((c) => (
                <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                  <span
                    className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: ORANGE_GRADIENT, borderColor: "var(--ink)", color: "var(--ink)" }}
                  >
                    ✕
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm font-extrabold mb-8" style={{ color: ACCENT_ORANGE }}>
            Select a stage to see what happened there.
          </p>
          <ProcessFlow
            steps={FRICTION_STEPS}
            accent={ACCENT_ORANGE}
            middleLabel="A hypothesis only matters once it is scoped into something buildable"
          />
        </div>
      </div>

      {/* ---------- 02: Feature plan ---------- */}
      <div id="s-plan" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="02" title="From pattern to plan">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Spotting friction in search or shortlisting was only half the loop. Each pattern still
              had to become something specific enough to build. I kept every candidate idea moving
              through the same chain, so a hunch from a recording couldn&apos;t skip straight into
              development without being scoped first.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-3 my-9">
              {PLAN_CHAIN.map((step, i) => (
                <div key={step.label} className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="cs-box white px-5 py-4 w-full sm:w-[210px]">
                    <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: ACCENT_BLUE }}>
                      {step.label}
                    </p>
                    <p className="text-sm leading-snug font-semibold" style={{ color: "var(--ink)" }}>
                      {step.body}
                    </p>
                  </div>
                  {i < PLAN_CHAIN.length - 1 && (
                    <span className="text-2xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--ink)" }}>
              Key decisions
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {KEY_DECISIONS.map((d, i) => (
                <Reveal key={d.letter} delay={i * 90}>
                  <div className="cs-box light px-5 py-6 h-full">
                    <div
                      className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-base mb-3.5"
                      style={{ borderColor: "var(--ink)", background: BLUE_GRADIENT, color: "var(--ink)" }}
                    >
                      {d.letter}
                    </div>
                    <h3 className="font-serif font-bold text-base mb-2.5" style={{ color: "var(--ink)" }}>
                      {d.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                      {d.situation}
                    </p>
                    <p className="text-[13px] leading-relaxed mb-2" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: ACCENT_BLUE }}>
                        Decision:{" "}
                      </span>
                      {d.decision}
                    </p>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: ACCENT_BLUE }}>
                        Result:{" "}
                      </span>
                      {d.result}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="text-base leading-relaxed max-w-2xl mb-3.5" style={{ color: "#33302a" }}>
              A related pattern, users browsing by company of interest rather than career title,
              became a smaller company-based discovery path alongside these three.
            </p>

            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "#33302a" }}>
              Not every pattern justified a full development cycle. Some resolved with a smaller
              design change validated in Bubble.io; others became scoped feature requests with enough
              definition to move directly into a build.
            </p>
          </Chapter>
        </div>
      </div>

      {/* ---------- 03: No-code execution ---------- */}
      <div id="s-nocode" className="cs-seam" style={{ background: TONE_BLUE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: ACCENT_BLUE }}>
              03
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Planning and no-code execution
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "var(--ink)" }}>
              Not every idea needed a full development cycle to prove it was worth one. For smaller
              ideas like a new discovery tag or a homepage flow for new mentors, I used Bubble.io to
              put a working version in front of an idea before requesting engineering time on it,
              rather than writing a full spec and waiting to find out whether the fix actually worked.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {NOCODE_REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className="cs-box white px-5 py-6 h-full">
                  <div
                    className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2"
                    style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)" }}
                  >
                    <span className="w-5 h-5 text-[#fff9ee]">
                      <Icon>{r.icon}</Icon>
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2" style={{ color: "var(--ink)" }}>
                    {r.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {r.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 04: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-center gap-4.5 mb-8">
              <div
                className="w-[58px] h-[58px] shrink-0 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl"
                style={{ background: ORANGE_GRADIENT, color: "#fff9ee", border: "3px solid #fff9ee", boxShadow: "5px 5px 0 rgba(0,0,0,0.4)" }}
              >
                04
              </div>
              <h2 className="font-serif text-4xl text-white">Outcomes</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#d6ddec" }}>
              The figures below are the platform-level outcomes reported for the internship period.
              They reflect PathPeer&apos;s overall growth during that time, with the analytics-and-
              recordings loop above shaping which iterative changes, like new discovery tags and
              homepage flows for new mentors, went into that period, rather than being the sole cause
              of either number.
            </p>
          </Reveal>

          <div className="mb-10 max-w-xl">
            <StatGrid
              valueColor={ACCENT_ORANGE}
              stats={[
                { value: "50%", label: "increase in user engagement (internship period)" },
                { value: "40%", label: "reduction in inactive user drop-off (internship period)" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            {[
              "Feature ideas were grounded in observed search, shortlisting, and session behavior instead of assumptions.",
              "Smaller ideas could be validated in Bubble.io before requesting development time, so engineering effort went to ideas that had already shown they worked.",
            ].map((row) => (
              <Reveal key={row}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: ORANGE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
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

      {/* ---------- 05: Reflection ---------- */}
      <div id="s-reflection" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-[70px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              05
            </p>
            <h2 className="font-serif text-[32px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {REFLECTIONS.map((r, i) => (
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
              <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: ACCENT_ORANGE }}>
                What I&apos;d improve
              </p>
              <p className="text-[15px] leading-relaxed" style={{ color: "#4c473e" }}>
                {cs.whatIdImprove}
              </p>
            </div>
          )}

          <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            PathPeer&apos;s internal analytics dashboards and session recordings are not shown here
            for confidentiality. The friction-loop, feature-plan diagrams, and discovery examples
            above reconstruct the categories of workflow and reasoning behind the changes, not
            verbatim session data.
          </p>
        </div>
      </div>
    </div>
  );
}

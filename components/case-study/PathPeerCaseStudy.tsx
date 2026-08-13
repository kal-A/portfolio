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
    href: "#s-improvements",
    label: "Product improvements",
    icon: (
      <>
        <path d="M12 3l9 5-9 5-9-5 9-5z" />
        <path d="M3 13l9 5 9-5" />
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

const STORY_STEPS = [
  {
    label: "Observed behavior",
    body: "Once PathPeer was live, Google Analytics showed engagement dropping at specific steps in search and mentor discovery.",
    icon: <><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>,
  },
  {
    label: "Friction",
    body: "Analytics could show that a step was leaking users, but not why. People were getting stuck before they could shortlist or reach out to a mentor match.",
    icon: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.35-4.35" /></>,
  },
  {
    label: "Evidence source",
    body: "I reviewed hundreds of Hotjar session recordings on a recurring, weekly basis, watching the sessions matching those drop-off points to see the behavior behind the numbers.",
    icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 4v5" /></>,
  },
  {
    label: "Hypothesis",
    body: "Turned that observed behavior into a specific explanation for why users were struggling to find or commit to a mentor match, not just where they dropped off.",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
  },
  {
    label: "Product response",
    body: "Translated the strongest patterns into a concrete product idea, like a discovery tag or a homepage flow for new mentors, then validated smaller ideas in Bubble.io before asking for development time.",
    icon: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
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

function splitReflection(text: string): { title: string; body: string } {
  const splitAt = text.indexOf(". ");
  if (splitAt === -1) return { title: text, body: "" };
  return {
    title: text.slice(0, splitAt + 1).trim(),
    body: text.slice(splitAt + 2).trim(),
  };
}

function reflectionIcon(i: number): React.ReactNode {
  switch (i % 4) {
    case 0:
      return (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.35-4.35" />
        </>
      );
    case 1:
      return (
        <>
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </>
      );
    case 2:
      return <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />;
    default:
      return (
        <>
          <path d="M4 20V10M11 20V4M18 20v-7" />
          <path d="M2 20h20" />
        </>
      );
  }
}

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

const ADDITIONAL_CONTRIBUTIONS = [
  {
    title: "Student profile timeline page",
    body: "Designed and built a timeline view of a student's profile in Figma and Bubble.io, as part of improving the profile experience around mentor discovery.",
    icon: <><path d="M4 6h16M4 12h16M4 18h10" /></>,
  },
  {
    title: "Admin dashboard expansion",
    body: "Added useful user information to the admin dashboard to improve visibility and day-to-day workflow for the team managing the platform.",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 10v10" /></>,
  },
  {
    title: "Mentor-search filtering",
    body: "Improved mentor-search filtering, including how the remaining, still-available mentors were surfaced once a filter had narrowed the list.",
    icon: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
  },
];

const LEGACY_METRICS = [
  { value: "20%", label: "increase in user engagement, reported alongside the discovery and profile work above" },
  { value: "25%", label: "decrease in bounce rate, reported for the same period of work" },
  { value: "30%", label: "increase in usability / overall efficiency, for the expanded admin dashboard" },
  { value: "50%", label: "improvement in search functionality, reported alongside the search-matching and filtering work" },
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
        <div className="mx-auto max-w-5xl px-6 pt-8 pb-10">
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
                pursue. I designed and built the platform as one of PathPeer&apos;s two developers and
                designers, building on Bubble.io, then went back into the data. Google Analytics
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
              <nav className="cs-box white quiet-hover px-6 py-7" style={{ background: "#fffdf8" }}>
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: ACCENT_ORANGE }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Seven sections, from the friction loop through to reflection.
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
                {cs.snapshot?.challenge}
              </SnapshotBox>
              <SnapshotBox
                label="Contribution"
                accentGradient={ORANGE_GRADIENT}
                icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
              >
                {cs.snapshot?.contribution}
              </SnapshotBox>
              <SnapshotBox
                label="Outcome"
                accentGradient={ORANGE_GRADIENT}
                icon={<path d="M4 18l5-6 4 3 7-9" />}
              >
                {cs.snapshot?.outcome}
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
        <div className="mx-auto max-w-5xl px-6 pt-14 pb-24">
          <Chapter num="01" title="Finding friction in real behaviour">
            <span
              className="cs-pill inline-block text-[11px] font-extrabold uppercase tracking-wide px-3 py-1 mb-4"
              style={{ color: ACCENT_ORANGE }}
            >
              Reconstructed workflow
            </span>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--ink-soft)" }}>
              I worked as one of PathPeer&apos;s two developers/designers on the Bubble.io no-code
              platform, splitting product, design, and build work across search, discovery,
              shortlisting, and the profile experience. Here&apos;s how a drop in the numbers turned
              into a shipped or scoped change.
            </p>
          </Chapter>

          <div className="mt-9 mb-9">
            {STORY_STEPS.map((step, i) => (
              <Reveal key={step.label} delay={i * 80} className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-11 h-11 rounded-full border-[2.5px] flex items-center justify-center shrink-0"
                    style={{ background: ORANGE_GRADIENT, borderColor: "var(--ink)" }}
                  >
                    <span className="w-5 h-5 text-[#fff9ee]">
                      <Icon>{step.icon}</Icon>
                    </span>
                  </div>
                  {i < STORY_STEPS.length - 1 && (
                    <div className="w-[3px] flex-1 my-1" style={{ background: ACCENT_ORANGE, opacity: 0.25, minHeight: 24 }} />
                  )}
                </div>
                <div className={i < STORY_STEPS.length - 1 ? "pb-7 flex-1 min-w-0" : "flex-1 min-w-0"}>
                  <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-1.5" style={{ color: ACCENT_ORANGE }}>
                    {step.label}
                  </p>
                  <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--ink)" }}>
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--ink)" }}>
            Constraints
          </p>
          <div className="cs-box white px-6 py-6 mb-9">
            <ul className="flex flex-col gap-3">
              {(cs.constraints ?? []).map((c) => (
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
          </Chapter>

          <div className="mt-9">
            <ProcessFlow
              steps={PLAN_STEPS}
              accent={ACCENT_BLUE}
              activeGradient={BLUE_GRADIENT}
              rowLength={4}
              middleLabel="Feature definition only happens once the problem is confirmed"
            />
          </div>

          <p className="text-base leading-relaxed max-w-2xl mt-9" style={{ color: "#33302a" }}>
            Not every pattern justified a full development cycle. Some resolved with a smaller
            design change validated directly in Bubble.io; others became scoped feature requests
            with enough definition to move directly into a build. The five changes that came out of
            this loop, and what each one actually involved, are below.
          </p>
        </div>
      </div>

      {/* ---------- 03: Product improvements ---------- */}
      <div id="s-improvements" className="cs-seam" style={{ background: TONE_BLUE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="03" title="Five product improvements from the loop">
            <span
              className="cs-pill inline-block text-[11px] font-extrabold uppercase tracking-wide px-3 py-1 mb-4"
              style={{ color: ACCENT_BLUE }}
            >
              What changed
            </span>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--ink)" }}>
              Each of these started as a specific behavior pattern in Analytics or Hotjar, not a
              general redesign idea. Every one moved through the same observed-behavior-to-plan chain
              above before it became a shipped change or a scoped request.
            </p>
          </Chapter>

          <div className="grid md:grid-cols-2 gap-5 mt-9">
            {(cs.decisions ?? []).map((d, i) => (
              <Reveal key={d.decision} delay={i * 90}>
                <div className="cs-box light px-6 py-6 h-full min-w-0">
                  <div
                    className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-base mb-3.5"
                    style={{ borderColor: "var(--ink)", background: BLUE_GRADIENT, color: "var(--ink)" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-2.5" style={{ color: "var(--ink)" }}>
                    {d.decision}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                    {d.rationale}
                  </p>
                  {d.alternatives && (
                    <p className="text-[13.5px] leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: ACCENT_BLUE }}>
                        Considered:{" "}
                      </span>
                      {d.alternatives}
                    </p>
                  )}
                  {d.result && (
                    <p className="text-[13.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                      <span className="font-extrabold" style={{ color: ACCENT_BLUE }}>
                        Result:{" "}
                      </span>
                      {d.result}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-[15px] font-extrabold uppercase tracking-wide mt-14 mb-4" style={{ color: "var(--ink)" }}>
            Earlier contributions from the same role
          </p>
          <p className="text-base leading-relaxed max-w-2xl mb-6" style={{ color: "#33302a" }}>
            Alongside the analytics-and-recordings loop above, I also carried these contributions
            during the internship, drawn from the original role summary rather than from a specific
            Analytics or Hotjar finding.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {ADDITIONAL_CONTRIBUTIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="cs-box white px-5 py-6 h-full min-w-0">
                  <div
                    className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center mb-3.5"
                    style={{ background: BLUE_GRADIENT, borderColor: "var(--ink)" }}
                  >
                    <span className="w-[18px] h-[18px] text-[#fff9ee]">
                      <Icon>{item.icon}</Icon>
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base mb-2" style={{ color: "var(--ink)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="cs-box light px-6 py-6">
            <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: ACCENT_BLUE }}>
              From the original internship performance summary
            </p>
            <p className="text-[13.5px] leading-relaxed mb-5 max-w-2xl" style={{ color: "#4c473e" }}>
              These four figures come from an earlier, separate performance summary, not the
              Analytics-and-Hotjar loop above. Each is reported alongside, not claimed as solely
              caused by, the contribution it&apos;s paired with.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {LEGACY_METRICS.map((m) => (
                <div key={m.label}>
                  <p className="font-serif text-3xl font-bold" style={{ color: ACCENT_BLUE }}>
                    {m.value}
                  </p>
                  <p className="text-[12.5px] leading-snug mt-1.5" style={{ color: "var(--ink)" }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- 04: No-code execution ---------- */}
      <div id="s-nocode" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="04" title="Planning and no-code execution">
            <span
              className="cs-pill inline-block text-[11px] font-extrabold uppercase tracking-wide px-3 py-1 mb-4"
              style={{ color: ACCENT_BLUE }}
            >
              No-code execution
            </span>
            <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "var(--ink)" }}>
              Not every idea needed a full development cycle to prove it was worth one. For smaller
              ideas like a new discovery tag or a homepage flow for new mentors, I used Bubble.io to
              put a working version in front of an idea before requesting engineering time on it,
              rather than writing a full spec and waiting to find out whether the fix actually worked.
            </p>
          </Chapter>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-9">
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

      {/* ---------- 05: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>
              05
            </p>
            <h2 className="font-serif text-[32px] leading-tight mt-2 text-white">Outcomes</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#d6ddec" }}>
              The figures below are the platform-level outcomes reported for the internship period.
              They reflect PathPeer&apos;s overall growth during that time, with the analytics-and-
              recordings loop above shaping which iterative changes, like new discovery tags and
              homepage flows for new mentors, went into that period, rather than being the sole cause
              of either number.
            </p>
          </Reveal>

          <div className="mb-10">
            <StatGrid valueColor={ACCENT_ORANGE} stats={cs.metrics.map((m) => ({ value: m.value, label: m.label }))} />
          </div>

          <Reveal>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4 text-white">
              Shipped or scoped from this loop
            </p>
            <div className="grid sm:grid-cols-2 gap-3.5 mb-10">
              {(cs.decisions ?? []).map((d, i) => (
                <div key={d.decision} className="cs-box light flex items-start gap-3.5 px-5 py-4">
                  <div
                    className="w-8 h-8 rounded-[9px] border-2 shrink-0 flex items-center justify-center font-serif font-bold text-sm mt-0.5"
                    style={{ borderColor: "var(--ink)", background: BLUE_GRADIENT, color: "var(--ink)" }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <p className="text-[14.5px] font-semibold leading-relaxed" style={{ color: "var(--ink)" }}>
                    {d.decision}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4 text-white">
            Why the loop held up
          </p>
          <div className="flex flex-col gap-4">
            {cs.outcome.slice(2).map((row) => (
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

      {/* ---------- 06: Reflection ---------- */}
      <div id="s-reflection" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              06
            </p>
            <h2 className="font-serif text-[32px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {(cs.reflection ?? []).map((entry, i) => {
              const { title, body } = splitReflection(entry);
              return (
                <Reveal key={title} delay={i * 90}>
                  <div className="cs-box white px-6 py-7 h-full min-w-0">
                    <div
                      className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2"
                      style={{ background: i % 2 === 0 ? ACCENT_ORANGE : ACCENT_BLUE, borderColor: "var(--ink)" }}
                    >
                      <span className="w-5 h-5 text-[#fff9ee]">
                        <Icon>{reflectionIcon(i)}</Icon>
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-xl mb-3" style={{ color: "var(--ink)" }}>
                      {title}
                    </h3>
                    <p className="text-[15.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                      {body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
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

          {cs.note && (
            <p
              className="text-sm italic leading-relaxed mt-8 max-w-3xl"
              style={{ color: "var(--ink-soft)" }}
            >
              {cs.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

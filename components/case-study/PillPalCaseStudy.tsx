import Link from "next/link";
import Image from "next/image";
import ProjectIcon from "@/components/ProjectIcon";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import ExpandableIssueList, { RankedIssue } from "@/components/case-study/blocks/ExpandableIssueList";
import Reveal from "@/components/Reveal";

const PURPLE_GRADIENT = "linear-gradient(135deg, #9b7bc4, #4a2f73)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(200,69,44,0.08) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(74,47,115,0.16) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(106,74,153,0.18) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f3eefa";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(106,74,153,0.12) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f6f2fb";
const TONE_PURPLE =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.32) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(74,47,115,0.18) 0%, transparent 46%), linear-gradient(180deg, #dcc9ee 0%, #c6a8e0 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(106,74,153,0.16) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(169,131,209,0.08) 0%, transparent 46%), linear-gradient(180deg, #2a2233 0%, #211b29 55%, #191420 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s1",
    label: "High-stakes design",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>,
  },
  {
    href: "#s2",
    label: "Critical tasks",
    icon: <path d="M4 18l5-6 4 3 7-9" />,
  },
  {
    href: "#s3",
    label: "Prototype evolution",
    icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
  },
  {
    href: "#s4",
    label: "Breaking it on purpose",
    icon: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></>,
  },
  {
    href: "#s5",
    label: "What changed",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
  {
    href: "#s6",
    label: "Reflection",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
  },
];

const TASK1_STEPS: ProcessStep[] = [
  {
    title: "Navigate to MyMeds",
    synopsis:
      "The Add New button sits right next to My Meds and is easy to spot, but reaching it means leaving the main schedule screen first, a step the walkthrough flagged as unintuitive for older users.",
    image: {
      src: "/case-studies/pill-pal/paper-task1-navigate-mymeds.jpg",
      alt: "Paper prototype sketch of the watch schedule screen with the Add New button next to My Meds, from the team's Task 1 cognitive walkthrough",
    },
  },
  {
    title: "Tap Add New",
    synopsis:
      "Clearly labeled and easy to find. Increasing its size would help further for users with limited vision.",
    image: {
      src: "/case-studies/pill-pal/paper-task1-tap-addnew.jpg",
      alt: "Paper prototype sketch of the MyMeds list screen with the Add New button being tapped",
    },
  },
  {
    title: "Fill in the fields",
    synopsis:
      "Dropdowns for Type and Days/Week simplify entry, but the number of required fields and their small size were flagged as a barrier for older users.",
    image: {
      src: "/case-studies/pill-pal/paper-task1-fill-fields.jpg",
      alt: "Paper prototype sketch of the Add New Medication form filled in for Tylenol, with Type, Frequency, Dosage, and Time fields",
    },
  },
  {
    title: "Add special notes",
    synopsis:
      "Nothing on screen marks this field as optional, which could read as a required step it isn't.",
    image: {
      src: "/case-studies/pill-pal/paper-task1-special-notes.jpg",
      alt: "Paper prototype sketch of the Add New Medication form with the optional Special Notes field at the bottom",
    },
  },
  {
    title: "Confirm and return",
    synopsis:
      "Tapping Add Meds returns the user to MyMeds with the new medication listed, a clear success signal.",
    image: {
      src: "/case-studies/pill-pal/paper-task1-confirm-return.jpg",
      alt: "Paper prototype sketch of the MyMeds screen after tapping Add Meds, showing the new medication listed",
    },
  },
];

const TASK2_STEPS: ProcessStep[] = [
  {
    title: "Notice the reminder",
    synopsis:
      "“Upcoming: Advil 2pc 19:00” appears bold and centered, paired with a vibration and sound, so it's hard to miss.",
    image: {
      src: "/case-studies/pill-pal/paper-task2-notice-reminder.jpg",
      alt: "Paper prototype sketch of the Pill Reminder screen showing Advil 2pc at 19:00, from the team's Task 2 cognitive walkthrough",
    },
  },
  {
    title: "Tap Taken or Remind Later",
    synopsis:
      "Both labels are clear on their own, but snoozing gives no confirmation of how long the reminder was delayed for.",
    image: {
      src: "/case-studies/pill-pal/paper-task2-remind-later.jpg",
      alt: "Paper prototype sketch of the Pill Reminder screen with Taken and Remind Later buttons",
    },
  },
  {
    title: "See it marked complete",
    synopsis:
      "A checkmark under Completed confirms the dose was logged: a clean, unambiguous end state.",
    image: {
      src: "/case-studies/pill-pal/paper-task2-completed.jpg",
      alt: "Paper prototype sketch of the schedule screen with Advil marked Completed",
    },
  },
];

const HEURISTIC_TALLY = [
  { name: "Visibility of System Status", count: 11 },
  { name: "Recognition Rather Than Recall", count: 5 },
  { name: "Help and Documentation", count: 4 },
  { name: "Match Between System and the Real World", count: 2 },
  { name: "User Control and Freedom", count: 2 },
  { name: "Flexibility and Efficiency of Use", count: 2 },
  { name: "Error Prevention", count: 1 },
  { name: "Help Recognize, Diagnose, and Recover from Errors", count: 1 },
];
const HEURISTIC_TOTAL = HEURISTIC_TALLY.reduce((sum, h) => sum + h.count, 0);

const TOP_ISSUES = [
  {
    rank: 1,
    issue: "No confirmation step existed before calling emergency services or a pharmacy contact.",
    heuristic: "Help Recognize, Diagnose, and Recover from Errors",
    severity: "Rated severity 3, the highest severity any evaluator recorded in this evaluation.",
    fix: "Add a confirmation dialog (“Call Emergency Services?” with Confirm and Cancel) before any emergency or pharmacy call goes through.",
    image: {
      src: "/case-studies/pill-pal/figma-emergency-call-911.png",
      alt: "Real Figma screen showing the 911 emergency call going straight to Call Emergency Services with no confirmation step",
    },
  },
  {
    rank: 2,
    issue: "The Add Medication form could be submitted without a frequency or time of day set.",
    heuristic: "Error Prevention",
    severity: "Rated severity 3.",
    fix: "Require frequency and timing before the form can submit, with a clear visual indicator on incomplete fields.",
    image: {
      src: "/case-studies/pill-pal/figma-add-medication-form.png",
      alt: "Real Figma screen of the Add New Medication form with Type, Days/Week, Frequency/Day, and Time fields, none marked as required",
    },
  },
  {
    rank: 3,
    issue: "No back button inside the medication-addition flow, so users couldn't exit without finishing or restarting.",
    heuristic: "User Control and Freedom",
    severity: "Rated severity 3.",
    fix: "Add a persistent back button to every screen in the flow, with a warning if unsaved changes would be lost.",
    image: {
      src: "/case-studies/pill-pal/figma-add-medication-form.png",
      alt: "Real Figma screen of the Add New Medication form with no back or exit control visible",
    },
  },
  {
    rank: 4,
    issue: "Nothing in the app indicated how much medication was left or when a refill was needed.",
    heuristic: "Visibility of System Status",
    severity: "Rated severity 3.",
    fix: "Add a color-coded supply indicator (sufficient, reorder soon, low) with an automatic refill alert.",
    image: {
      src: "/case-studies/pill-pal/wireframe-mymeds-list.png",
      alt: "Real wireframe of the MyMeds list with no supply level or refill indicator next to each medication",
    },
  },
  {
    rank: 5,
    issue: "The medication list showed no purpose or prescribing doctor, so users had to remember why they were taking each drug.",
    heuristic: "Recognition Rather Than Recall",
    severity: "Rated severity 2, but flagged independently by two of the four evaluators.",
    fix: "Add dedicated Purpose and Prescribing Doctor fields to each medication entry.",
    image: {
      src: "/case-studies/pill-pal/wireframe-mymeds-list.png",
      alt: "Real wireframe of the MyMeds list showing only medication name and dose, with no purpose or prescriber field",
    },
  },
  {
    rank: 6,
    issue: "Swipe navigation existed between screens, but nothing on screen indicated it was possible.",
    heuristic: "Recognition Rather Than Recall",
    severity: "Rated severity 2, also flagged independently by two evaluators.",
    fix: "Add a brief “swipe for more” overlay the first time the app opens.",
    image: {
      src: "/case-studies/pill-pal/wireframe-schedule-direct-add.png",
      alt: "Real wireframe of the main schedule screen with swipe-page dots at the bottom but no on-screen swipe hint",
    },
  },
];

const REMAINING_ISSUES: RankedIssue[] = [
  {
    rank: 7,
    issue: "Nothing flagged medications that require food or specific conditions, like “take with meal.”",
    heuristic: "Visibility of System Status",
    fix: "Add a Special Instructions field with common toggles like “Take with food” or “Avoid sunlight.”",
  },
  {
    rank: 8,
    issue: "Pharmacy and emergency contact screens didn't show operating hours or availability.",
    heuristic: "Visibility of System Status",
    fix: "Display hours and a real-time open/closed status under each contact.",
  },
  {
    rank: 9,
    issue: "No quick-access shortcut to add a medication from the home screen.",
    heuristic: "Flexibility and Efficiency of Use",
    fix: "Add a floating quick-add button on the home screen.",
  },
  {
    rank: 10,
    issue: "The photo-upload feature gave no guidance on what kind of image was useful.",
    heuristic: "Help and Documentation",
    fix: "Add an example-photo guide showing ideal angle and lighting.",
  },
  {
    rank: 11,
    issue: "The Day/Week view selector had no explanatory text for new users.",
    heuristic: "Help and Documentation",
    fix: "Add a short help line under the selector explaining what it switches between.",
  },
  {
    rank: 12,
    issue: "Prescription refill request status wasn't visible anywhere in the app.",
    heuristic: "Visibility of System Status",
    fix: "Add a refill-status tracker (Requested, Processing, Ready for Pickup) with timestamps.",
  },
  {
    rank: 13,
    issue: "The medication form used technical phrasing, like “Frequency/Day,” instead of plain language.",
    heuristic: "Match Between System and the Real World",
    fix: "Reword form fields in plain language, e.g. “How many times a day do you take this?”",
  },
  {
    rank: 14,
    issue: "Once a reminder was set, there was no way to pause it without deleting it entirely.",
    heuristic: "User Control and Freedom",
    fix: "Add a Pause Reminders option with a duration and resume date.",
  },
  {
    rank: 15,
    issue: "Emergency contacts had no icons to distinguish contact types at a glance.",
    heuristic: "Match Between System and the Real World",
    fix: "Give each contact type its own icon: medical cross, pill, heart.",
  },
  {
    rank: 16,
    issue: "The loading screen gave no progress indicator or status message.",
    heuristic: "Visibility of System Status",
    fix: "Add a progress bar with a status message like “Loading your medications.”",
  },
  {
    rank: 17,
    issue: "Upcoming and completed medications had no visible timestamps.",
    heuristic: "Visibility of System Status",
    fix: "Show specific times, e.g. “Next dose: 2:30 PM” and “Taken at 9:15 AM.”",
  },
  {
    rank: 18,
    issue: "Emergency contact types weren't clearly differentiated, so users had to remember which contact fit which situation.",
    heuristic: "Recognition Rather Than Recall",
    fix: "Label each contact type with when to use it, e.g. immediate emergencies vs. prescription questions.",
  },
  {
    rank: 19,
    issue: "No indication of which medications had an active reminder set.",
    heuristic: "Visibility of System Status",
    fix: "Visually distinguish active reminders (solid color) from inactive ones (grayed out).",
  },
  {
    rank: 20,
    issue: "No distinction shown between prescription and over-the-counter medications.",
    heuristic: "Visibility of System Status",
    fix: "Add Rx / OTC tags with distinct styling to each medication entry.",
  },
];

const EVALUATORS = [
  {
    title: "Two HCI classmates",
    body: "Already fluent in the course's revised Nielsen heuristics, recruited first for an “expert” pass on interface consistency and navigation patterns.",
    icon: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.6" /><path d="M2.5 20c0-3.3 2.6-5.6 5.5-5.6s5.5 2.3 5.5 5.6M13.5 20c.2-2.6 1.8-4.4 4-4.7" /></>,
  },
  {
    title: "A caregiver",
    body: "Managed real pill schedules for someone else. Grounded the evaluation in what actually happens when someone relies on the app for a person other than themselves.",
    icon: <path d="M12 20s-7-4.4-7-9.6C5 6.9 7.2 5 9.6 5c1.3 0 2.5.7 3.2 1.8C13.5 5.7 14.7 5 16 5c2.4 0 4.6 1.9 4.6 5.4C20.6 15.6 12 20 12 20z" />,
  },
  {
    title: "A pharmacy industry professional",
    body: "Brought prescription-handling and medication-management experience, relevant given the app's in-app pharmacy contact flow.",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M12 8v8M8 12h8" /></>,
  },
];

export default function PillPalCaseStudy() {
  const cs = getCaseStudy("pill-pal")!;

  return (
    <div
      style={
        {
          "--cs-wash-from": "#f3eefa",
          "--cs-wash-to": "#a983d1",
          "--cs-light-from": "#f6f1fb",
          "--cs-light-to": "#dcc9ee",
          "--cs-accent-deep": "#4a2f73",
          "--cs-accent-wash-rgb": "106, 74, 153",
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
                style={{ background: PURPLE_GRADIENT, boxShadow: "0 10px 26px -8px rgba(74,47,115,0.45)" }}
              >
                <ProjectIcon slug="pill-pal" className="w-[36px] h-[36px]" style={{ color: "#fdfaf5" }} />
              </div>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "#4a2f73" }}>
                Pill Pal · HCI Course Project (MSE 343)
              </p>
              <h1
                className="font-serif text-4xl sm:text-[48px] leading-[1.08] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Designing a medication tracker for older adults, then breaking it on purpose
              </h1>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {cs.metrics.slice(1, 3).map((m) => (
                  <span
                    key={m.label}
                    className="cs-pill inline-flex items-baseline gap-1.5 text-xs font-bold px-3.5 py-1.5"
                  >
                    <span className="font-serif text-base font-bold" style={{ color: "#4a2f73" }}>
                      {m.value}
                    </span>
                    <span style={{ color: "var(--ink-soft)" }}>{m.label.split("(")[0].trim()}</span>
                  </span>
                ))}
              </div>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Team course project · Waterloo, ON
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                Most medication-tracking apps aren&apos;t designed for the vision, dexterity, and stakes
                constraints older adults actually face. We designed an Apple Watch pill tracker for that
                user, then deliberately tried to break it with a four-evaluator heuristic evaluation.
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
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#4a2f73" }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Six sections, from the design constraints through to what we&apos;d learn from doing it again.
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
                      style={{ background: "linear-gradient(135deg, #e7dff2, #c6a8e0)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: "#4a2f73" }}>
                        <Icon>{link.icon}</Icon>
                      </span>
                    </span>
                    {link.label}
                  </a>
                ))}

                <div className="mt-6 pt-5" style={{ borderTop: "1.5px dashed rgba(32,28,23,0.16)" }}>
                  <p className="text-[11px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "var(--ink-soft)" }}>
                    Core skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="cs-pill inline-flex items-center text-[10.5px] font-extrabold uppercase tracking-wide px-3 py-1.5 cursor-default"
                        style={{ background: PURPLE_GRADIENT, color: "#fff9ee", borderColor: "var(--ink)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] font-extrabold uppercase tracking-wide mt-4 mb-2.5" style={{ color: "var(--ink-soft)" }}>
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.toolTags.map((chip) => (
                      <span key={chip} className="cs-pill highlight text-[10.5px] font-extrabold px-3 py-1.5 cursor-default">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </nav>
            </Reveal>
          </div>

          {/* Team note */}
          <Reveal className="mt-10">
            <div className="cs-box white px-5 py-4 text-sm leading-relaxed" style={{ color: "#4c473e" }}>
              <span className="font-extrabold" style={{ color: "var(--ink)" }}>
                Team project:{" "}
              </span>
              {cs.team}. {cs.contribution}
            </div>
          </Reveal>

          {/* Snapshot */}
          <SnapshotGrid>
            <SnapshotBox
              label="Challenge"
              accentGradient={PURPLE_GRADIENT}
              icon={<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>}
            >
              A wearable medication tracker for older adults, where a small screen, limited dexterity, and
              real health stakes all raise the cost of an unclear interaction.
            </SnapshotBox>
            <SnapshotBox
              label="Contribution"
              accentGradient={PURPLE_GRADIENT}
              icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
            >
              Redesign rationale and cognitive walkthroughs, medium-fidelity prototype iterations, and
              synthesizing the heuristic evaluation into a ranked, fix-mapped report.
            </SnapshotBox>
            <SnapshotBox
              label="Outcome"
              accentGradient={PURPLE_GRADIENT}
              icon={<><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>}
            >
              20 ranked usability issues, each mapped to a heuristic and a specific fix, handed off as a
              severity report before this ever reached a real user.
            </SnapshotBox>
            <div className="cs-box white h-full px-6 py-6">
              <div
                className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                style={{ background: PURPLE_GRADIENT, borderColor: "var(--ink)" }}
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
                Tools &amp; method
              </p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["Figma", "medium-fidelity horizontal & vertical prototypes"],
                  ["Cognitive walkthroughs", "simulated from the perspective of an elderly user"],
                  ["Nielsen heuristics (course-revised)", "4-evaluator heuristic evaluation"],
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

      {/* ---------- 01: High-stakes design ---------- */}
      <div id="s1" className="cs-seam" style={{ background: TONE_PURPLE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="Designing for a high-consequence interaction">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              A wrist is a much smaller canvas than a phone, and the user we designed for made that
              constraint sharper: older adults, where vision and dexterity limits are common, and where
              a missed dose or a wrong tap (calling 911 by accident, skipping a required field) carries
              real consequence. Every scoping decision had to hold up against that combination.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              What we scoped in, and deliberately left out
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="cs-box light px-6 py-6">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-3" style={{ color: "#4a2f73" }}>
                  Had to be there
                </p>
                <ul className="flex flex-col gap-2.5 text-sm leading-relaxed" style={{ color: "#33302a" }}>
                  {[
                    "Manage multiple medication schedules across times of day",
                    "One-tap confirmation for taking a dose, tied to reminders",
                    "An emergency contact button, reachable quickly",
                    "In-app prescription refill requests",
                    "High-contrast interface, upcoming doses visible at a glance",
                  ].map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span style={{ color: "#4a2f73" }}>✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cs-box white px-6 py-6">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-3" style={{ color: "#8a5a30" }}>
                  Deliberately excluded
                </p>
                <ul className="flex flex-col gap-2.5 text-sm leading-relaxed" style={{ color: "#33302a" }}>
                  {[
                    "Social sharing features",
                    "Advertising content",
                    "Complex graphs or statistics that could confuse an older user",
                    "A fully automatic medication-ordering system",
                  ].map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span style={{ color: "#8a5a30" }}>✕</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed mt-4" style={{ color: "#4c473e" }}>
                  Later, because the prototype was still medium fidelity, we ran the evaluation against
                  five predefined tasks rather than open exploration, to make sure every evaluator
                  actually exercised every part of the app.
                </p>
              </div>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 02: Critical tasks ---------- */}
      <div id="s2" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#4a2f73" }}>
              Cognitive walkthroughs
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              Two tasks, walked through as an elderly user
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              We chose the two interactions with the highest stakes if they went wrong, and walked
              through each step&apos;s action, visibility, and feedback from the perspective of an older
              user before testing with anyone outside the team. Select a step to see what we found,
              paired with the team&apos;s actual paper prototype sketch for that step.
            </p>
          </Reveal>

          <div className="mb-4">
            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--ink)" }}>
              Task 1 · Adding new medication
            </p>
            <Reveal>
              <ProcessFlow steps={TASK1_STEPS} accent="#4a2f73" topAlignRows />
            </Reveal>
          </div>

          <div className="mt-14">
            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--ink)" }}>
              Task 2 · Responding to a medication reminder
            </p>
            <Reveal>
              <ProcessFlow steps={TASK2_STEPS} accent="#4a2f73" />
            </Reveal>
          </div>

          <Reveal delay={100}>
            <p className="text-base leading-relaxed max-w-2xl mt-12" style={{ color: "#4c473e" }}>
              The walkthroughs surfaced the same theme twice: labels and layout were clear, but{" "}
              <b className="font-extrabold" style={{ color: "var(--ink)" }}>
                what the interface didn&apos;t say
              </b>{" "}
              (that a field was optional, that a screen was swipeable, how long a snooze would last) was
              where older users would most likely stall. That theme carried directly into the redesign.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---------- 03: Prototype evolution ---------- */}
      <div id="s3" className="cs-seam" style={{ background: TONE_PURPLE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="02" title="From paper sketches to a testable prototype">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              The cognitive walkthrough findings drove a low-fidelity redesign round before we built
              anything evaluators would actually use. We reworked six screens: MyMeds and its Add
              Medication flow, the main schedule screen, new Contacts and Settings screens, and a new
              future-date schedule view, each change traceable back to a specific walkthrough finding.
            </p>

            <div className="flex items-center gap-5 flex-wrap my-9">
              <div className="cs-box white flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#8a5a30" }}>
                  Before
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Add Medication was reachable only by navigating away from the schedule
                </p>
              </div>
              <span className="text-3xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
                →
              </span>
              <div className="cs-box light flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#4a2f73" }}>
                  After
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  A direct Add Medication link sits on the main schedule screen
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed" style={{ color: "#4c473e" }}>
              From there we built two medium-fidelity Figma prototypes: a{" "}
              <b className="font-extrabold" style={{ color: "var(--ink)" }}>
                horizontal
              </b>{" "}
              prototype covering the full app breadth (lock screen, home, MyMeds, add medication,
              emergency contacts, settings) to test overall navigation, and a{" "}
              <b className="font-extrabold" style={{ color: "var(--ink)" }}>
                vertical
              </b>{" "}
              prototype that went deep on the single riskiest flow: adding a new medication, from
              keyboard entry through type selection, dosage, image upload, and confirmation. Both are
              shown below, direct from the source files, not recreated.
            </p>
          </Chapter>

          <Reveal delay={100}>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-14 mb-4" style={{ color: "var(--ink)" }}>
              Low-fidelity wireframes, drawn from the walkthrough findings
            </p>
            <div className="mt-2 overflow-x-auto">
              <div className="flex gap-4 pb-4 min-w-max">
                {[
                  {
                    src: "wireframe-mymeds-list.png",
                    alt: "Real wireframe of the updated MyMeds list screen with radio selection",
                    label: "MyMeds list",
                  },
                  {
                    src: "wireframe-add-medication-form.png",
                    alt: "Real wireframe of the Add New Medication form",
                    label: "Add Medication",
                  },
                  {
                    src: "wireframe-schedule-direct-add.png",
                    alt: "Real wireframe of the main schedule screen with a direct Add Medication link",
                    label: "Direct add link",
                  },
                  {
                    src: "wireframe-contacts.png",
                    alt: "Real wireframe of the new Contacts screen",
                    label: "Contacts",
                  },
                  {
                    src: "wireframe-settings.png",
                    alt: "Real wireframe of the new Settings screen",
                    label: "Settings",
                  },
                  {
                    src: "wireframe-future-schedule.png",
                    alt: "Real wireframe of the new future-date schedule screen",
                    label: "Future-date schedule",
                  },
                ].map((w) => (
                  <div key={w.src} className="cs-box white shrink-0 w-[150px] overflow-hidden">
                    <div className="relative w-full bg-white" style={{ aspectRatio: "1 / 1" }}>
                      <Image
                        src={`/case-studies/pill-pal/${w.src}`}
                        alt={w.alt}
                        fill
                        sizes="150px"
                        className="object-contain p-2"
                      />
                    </div>
                    <p
                      className="text-[10.5px] font-extrabold uppercase tracking-wide text-center py-2 border-t"
                      style={{ color: "var(--ink-soft)", borderColor: "rgba(32,28,23,0.1)" }}
                    >
                      {w.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
                style={{ color: "var(--ink)", borderColor: "var(--ink)", background: PURPLE_GRADIENT }}
              >
                Real wireframes
              </span>
              Six screens the team redrew after the walkthroughs, before moving into Figma.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-14 mb-4" style={{ color: "var(--ink)" }}>
              Medium-fidelity Figma prototypes
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  src: "figma-horizontal-prototype.png",
                  alt: "Real Figma canvas of the horizontal prototype: lock screen, home, loading, home/MyMeds/reminder states, add medication, emergency contacts, and settings",
                  ratio: "1124 / 1554",
                  label: "Horizontal · full app breadth",
                  caption:
                    "Lock screen through settings, including the delayed-reminder and emergency-call states used in the heuristic evaluation.",
                  href: "https://www.figma.com/design/IH9NZpw2oQg4HfNMloHrwp/Apple-watch-pill-tracker?node-id=502-94&node-type=canvas",
                },
                {
                  src: "figma-vertical-prototype.png",
                  alt: "Real Figma canvas of the vertical prototype: the full Add New Medication flow from keyboard entry through type selection, dosage, image upload, and confirmation",
                  ratio: "798 / 1406",
                  label: "Vertical · add-medication flow",
                  caption:
                    "Every state of adding a medication: name entry with keyboard, type dropdown, dosage and frequency, image upload, and the confirmed MyMeds entry.",
                  href: "https://www.figma.com/design/IH9NZpw2oQg4HfNMloHrwp/Apple-watch-pill-tracker?node-id=573-611&node-type=canvas",
                },
              ].map((p) => (
                <div key={p.src}>
                  <div className="cs-box white overflow-hidden">
                    <div className="relative w-full bg-[#e9e9e9]" style={{ aspectRatio: p.ratio, maxHeight: 480 }}>
                      <Image
                        src={`/case-studies/pill-pal/${p.src}`}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 768px) 480px, 100vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wide mt-3" style={{ color: "#4a2f73" }}>
                    {p.label}
                  </p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "#4c473e" }}>
                    {p.caption}
                  </p>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold mt-1.5 inline-block"
                    style={{ color: "#4a2f73" }}
                  >
                    Open in Figma ↗
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- 04: Breaking the design on purpose ---------- */}
      <div id="s4" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-6">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>
              03
            </p>
            <h2 className="font-serif text-4xl text-white mt-2">Breaking the design on purpose</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "#d9d2e6" }}>
              We ran a structured heuristic evaluation: five predefined tasks, a 45-minute session, and
              the course&apos;s revised Nielsen heuristics, with four evaluators chosen deliberately for
              different expertise rather than convenience.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {EVALUATORS.map((e, i) => (
              <Reveal key={e.title} delay={i * 90}>
                <div className="cs-box light h-full px-5 py-5">
                  <div
                    className="w-9 h-9 rounded-[10px] border-2 flex items-center justify-center mb-3"
                    style={{ background: PURPLE_GRADIENT, borderColor: "var(--ink)" }}
                  >
                    <span className="w-[18px] h-[18px] text-[#fff9ee]">
                      <Icon>{e.icon}</Icon>
                    </span>
                  </div>
                  <p className="font-serif font-bold text-base mb-2" style={{ color: "var(--ink)" }}>
                    {e.title}
                  </p>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: "#4c473e" }}>
                    {e.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-5" style={{ color: "#fff9ee" }}>
              Where the 28 raw findings landed, by heuristic
            </p>
          </Reveal>
          <div className="cs-box white px-6 py-6 mb-6">
            <div className="flex flex-col gap-3">
              {HEURISTIC_TALLY.map((h, i) => (
                <Reveal key={h.name} delay={i * 50}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold w-[260px] shrink-0" style={{ color: "var(--ink)" }}>
                      {h.name}
                    </span>
                    <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "#e7dff2" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(h.count / HEURISTIC_TALLY[0].count) * 100}%`,
                          background: PURPLE_GRADIENT,
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-6 text-right shrink-0" style={{ color: "var(--ink)" }}>
                      {h.count}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-xs leading-relaxed mt-5" style={{ color: "var(--ink-soft)" }}>
              {HEURISTIC_TOTAL} findings from 4 evaluators, synthesized down to 20 distinct ranked
              issues. Visibility of System Status alone accounted for {HEURISTIC_TALLY[0].count} of{" "}
              {HEURISTIC_TOTAL} findings: the app often did the right thing without telling the user it
              had.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            <Reveal>
              <div className="cs-box light px-6 py-5">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#4a2f73" }}>
                  Severity 2 (moderate)
                </p>
                <p className="font-serif text-3xl" style={{ color: "var(--ink)" }}>
                  24 findings
                </p>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="cs-box dark px-6 py-5">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#c6a8e0" }}>
                  Severity 3 (highest recorded)
                </p>
                <p className="font-serif text-3xl">4 findings</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#fff9ee" }}>
              The top 6 of 20 ranked issues
            </p>
            <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{ color: "#d9d2e6" }}>
              Each finding below is shown against the real prototype screen it was found on, from the
              team&apos;s Figma files and wireframes.
            </p>
          </Reveal>
          <div className="flex flex-col gap-4">
            {TOP_ISSUES.map((it, i) => (
              <Reveal key={it.rank} delay={i * 70}>
                <div className="cs-box white px-6 py-5">
                  <div className="flex items-start gap-4">
                    <span
                      className="shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center font-serif font-bold text-base"
                      style={{ background: PURPLE_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
                    >
                      {it.rank}
                    </span>
                    {it.image && (
                      <div
                        className="relative shrink-0 w-14 h-[86px] rounded-lg border-2 overflow-hidden hidden sm:block"
                        style={{ borderColor: "var(--ink)", background: "#fff" }}
                      >
                        <Image src={it.image.src} alt={it.image.alt} fill sizes="56px" className="object-cover object-top" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-bold leading-snug" style={{ color: "var(--ink)" }}>
                        {it.issue}
                      </p>
                      <p className="text-[11px] font-extrabold uppercase tracking-wide mt-2" style={{ color: "#4a2f73" }}>
                        {it.heuristic}
                      </p>
                      <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--ink-soft)" }}>
                        {it.severity}
                      </p>
                      <p className="text-sm leading-relaxed mt-2" style={{ color: "#4c473e" }}>
                        <span className="font-extrabold" style={{ color: "var(--ink)" }}>
                          Fix:{" "}
                        </span>
                        {it.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <ExpandableIssueList issues={REMAINING_ISSUES} accent="#4a2f73" />
        </div>
      </div>

      {/* ---------- 05: What changed ---------- */}
      <div id="s5" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#4a2f73" }}>
              Findings into action
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              What changed, and what was only recommended
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#33302a" }}>
              MSE 343 concluded with the evaluation and its fix-mapped report. We didn&apos;t build or
              test a further prototype round incorporating these 20 fixes, so it matters to keep the two
              apart.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="cs-box light h-full px-6 py-6">
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#4a2f73" }}>
                  Changes we actually made
                </p>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "#33302a" }}>
                  {[
                    "Added a direct Add Medication link from the main schedule screen, cutting the extra navigation step the walkthrough flagged.",
                    "Enlarged and relabeled the Add New and confirmation buttons for visibility.",
                    "Redesigned the Contacts and Settings screens for clarity.",
                    "Added a new future-date schedule screen.",
                  ].map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span style={{ color: "#4a2f73" }}>✓</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed mt-4" style={{ color: "var(--ink-soft)" }}>
                  Carried forward into the medium-fidelity prototype used for the heuristic evaluation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="cs-box dark h-full px-6 py-6">
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#c6a8e0" }}>
                  Recommendations only proposed
                </p>
                <ul className="flex flex-col gap-3 text-sm leading-relaxed">
                  {[
                    "A confirmation dialog before any emergency or pharmacy call.",
                    "Mandatory field validation on the medication form.",
                    "A back button inside the medication-addition flow.",
                    "A medication supply and refill tracker.",
                    "Plus 16 more fixes across the ranked severity report.",
                  ].map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span style={{ color: "#c6a8e0" }}>→</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed mt-4" style={{ color: "#d9d2e6" }}>
                  Validated as worth building, not yet built or retested.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ---------- 06: Reflection ---------- */}
      <div id="s6" className="cs-seam" style={{ background: TONE_PURPLE }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              04
            </p>
            <h2 className="font-serif text-[40px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              {
                accent: "#4a2f73",
                title: "Evaluation before implementation is cheap insurance",
                body: "Finding the missing emergency-call confirmation on a medium-fidelity prototype cost us nothing. Finding it after a real user hit the wrong button would have cost a lot more.",
                icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
              },
              {
                accent: "#8a5a30",
                title: "A watch screen forces harder tradeoffs than a phone screen would",
                body: "Sorting features into Must, Should, Could, and Exclude wasn't a formality. On a screen this small, every field we included competed directly with legibility for an older user.",
                icon: <><rect x="7" y="3" width="10" height="18" rx="3" /><path d="M12 7v.1" /></>,
              },
              {
                accent: "#4a2f73",
                title: "Accessibility gaps and error-prevention gaps are often the same gap",
                body: "Small input fields that are hard to read and a form that lets you submit without required data aren't separate problems. Both come from not designing for the constraints of the user in front of you.",
                icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
              },
              {
                accent: "#8a5a30",
                title: "A plausible design and a validated one are different claims",
                body: "Our own cognitive walkthrough made the design feel intuitive to us. It took four people outside the team, two classmates, a caregiver, and a pharmacy professional, to find the twenty places where that feeling didn't hold up.",
                icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
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

          {cs.links && cs.links.length > 0 && (
            <Reveal delay={100} className="mt-10 flex gap-4">
              {cs.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-pill text-sm font-extrabold px-5 py-2.5"
                  style={{ color: "var(--ink)" }}
                >
                  {link.label} ↗
                </a>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}

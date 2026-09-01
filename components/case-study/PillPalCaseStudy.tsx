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

/**
 * Case-study format playbook rollout (docs/redesign/11-case-study-format-playbook.md),
 * the Pill Pal page, and the last of the eight case studies, after Greenhouse
 * (pilot), Chronicle (reference), RoomEase (gold standard), ForceN, Informatica,
 * PathPeer, and Hera Fertility. Pill Pal currently ships on the legacy
 * warm/paper *light* design system (components/case-study/PillPalCaseStudy.tsx:
 * cs-box / --ink / blocks/*); this is its rebuild on the shared dark editorial
 * shell.
 *
 * Content is preserved from the shipped light page and the shared data file: the
 * high-stakes scoping, the two cognitive-walkthrough tasks with their real paper
 * prototype sketches, the low-fidelity wireframes and the two medium-fidelity
 * Figma prototypes, the four-evaluator heuristic evaluation, the 20 ranked
 * usability issues with fixes, what changed versus what was only recommended,
 * and the reflection. Nothing is invented or re-measured. Per playbook section
 * 10, the real UI screens (Figma canvases, wireframes, and the paper-prototype
 * photos) keep their own light grammar and sit as light plates framed on the
 * dark field, rather than being re-themed. The shell carries layout, prose,
 * cards, the dark heuristic tally and the dark severity table, and the two task
 * ProcessFlows (which pair each step with its paper sketch). Copy is em-dash
 * free.
 */
const HERO_TITLE = "Designing a medication tracker for older adults, then breaking it on purpose";
const HERO_LEAD =
  "Most medication-tracking apps aren't designed for the vision, dexterity, and stakes constraints older adults actually face. Our team designed an Apple Watch pill tracker for that user, walked the two highest-stakes tasks as an elderly user, built medium-fidelity Figma prototypes, then deliberately tried to break it with a four-evaluator heuristic evaluation that surfaced twenty ranked usability issues, each mapped to a heuristic and a specific fix, before this ever reached a real user.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-scope", label: "What it covered" },
  { href: "#s-stakes", label: "High-stakes design" },
  { href: "#s-tasks", label: "Cognitive walkthroughs" },
  { href: "#s-prototype", label: "Prototype evolution" },
  { href: "#s-evaluation", label: "Breaking it on purpose" },
  { href: "#s-changed", label: "What changed" },
  { href: "#s-reflection", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "Redesign rationale and cognitive walkthroughs, medium-fidelity prototype iterations, and synthesizing the heuristic evaluation into a ranked, fix-mapped report." },
  { label: "Scope", value: "An Apple Watch medication tracker for older adults, from scoping and cognitive walkthroughs through medium-fidelity prototyping and a four-evaluator heuristic evaluation." },
  { label: "Team", value: "Omar Shokeh, Callum Gillies, Graydon Power, and Kamal Ahsan, for the HCI course project MSE 343." },
  { label: "Tools & method", value: "Figma horizontal and vertical prototypes, cognitive walkthroughs simulated as an elderly user, a four-evaluator heuristic evaluation on the course-revised Nielsen heuristics." },
  { label: "Core skills", value: "HCI, Usability Evaluation, Wearable UX." },
];

const SCOPE_STATS = [
  { value: "2", label: "core tasks cognitive-walked" },
  { value: "4", label: "external evaluators recruited" },
  { value: "20", label: "usability issues ranked by severity" },
  { value: "5", label: "screens redesigned across iterations" },
];

const SCOPE_IN = [
  "Manage multiple medication schedules across times of day",
  "One-tap confirmation for taking a dose, tied to reminders",
  "An emergency contact button, reachable quickly",
  "In-app prescription refill requests",
  "High-contrast interface, upcoming doses visible at a glance",
];

const SCOPE_OUT = [
  "Social sharing features",
  "Advertising content",
  "Complex graphs or statistics that could confuse an older user",
  "A fully automatic medication-ordering system",
];

const TASK1_STEPS: ProcessStep[] = [
  {
    title: "Navigate to MyMeds",
    synopsis:
      "The Add New button sits right next to My Meds and is easy to spot, but reaching it means leaving the main schedule screen first, a step the walkthrough flagged as unintuitive for older users.",
    image: { src: "/case-studies/pill-pal/paper-task1-navigate-mymeds.jpg", alt: "Paper prototype sketch of the watch schedule screen with the Add New button next to My Meds" },
  },
  {
    title: "Tap Add New",
    synopsis: "Clearly labeled and easy to find. Increasing its size would help further for users with limited vision.",
    image: { src: "/case-studies/pill-pal/paper-task1-tap-addnew.jpg", alt: "Paper prototype sketch of the MyMeds list screen with the Add New button being tapped" },
  },
  {
    title: "Fill in the fields",
    synopsis:
      "Dropdowns for Type and Days per Week simplify entry, but the number of required fields and their small size were flagged as a barrier for older users.",
    image: { src: "/case-studies/pill-pal/paper-task1-fill-fields.jpg", alt: "Paper prototype sketch of the Add New Medication form filled in for Tylenol" },
  },
  {
    title: "Add special notes",
    synopsis: "Nothing on screen marks this field as optional, which could read as a required step it isn't.",
    image: { src: "/case-studies/pill-pal/paper-task1-special-notes.jpg", alt: "Paper prototype sketch of the Add New Medication form with the optional Special Notes field at the bottom" },
  },
  {
    title: "Confirm and return",
    synopsis: "Tapping Add Meds returns the user to MyMeds with the new medication listed, a clear success signal.",
    image: { src: "/case-studies/pill-pal/paper-task1-confirm-return.jpg", alt: "Paper prototype sketch of the MyMeds screen after tapping Add Meds, showing the new medication listed" },
  },
];

const TASK2_STEPS: ProcessStep[] = [
  {
    title: "Notice the reminder",
    synopsis:
      "The upcoming Advil reminder appears bold and centered, paired with a vibration and sound, so it's hard to miss.",
    image: { src: "/case-studies/pill-pal/paper-task2-notice-reminder.jpg", alt: "Paper prototype sketch of the Pill Reminder screen showing Advil 2pc at 19:00" },
  },
  {
    title: "Tap Taken or Remind Later",
    synopsis: "Both labels are clear on their own, but snoozing gives no confirmation of how long the reminder was delayed for.",
    image: { src: "/case-studies/pill-pal/paper-task2-remind-later.jpg", alt: "Paper prototype sketch of the Pill Reminder screen with Taken and Remind Later buttons" },
  },
  {
    title: "See it marked complete",
    synopsis: "A checkmark under Completed confirms the dose was logged: a clean, unambiguous end state.",
    image: { src: "/case-studies/pill-pal/paper-task2-completed.jpg", alt: "Paper prototype sketch of the schedule screen with Advil marked Completed" },
  },
];

const WIREFRAMES = [
  { src: "wireframe-mymeds-list.png", alt: "Real wireframe of the updated MyMeds list screen with radio selection", label: "MyMeds list" },
  { src: "wireframe-add-medication-form.png", alt: "Real wireframe of the Add New Medication form", label: "Add Medication" },
  { src: "wireframe-schedule-direct-add.png", alt: "Real wireframe of the main schedule screen with a direct Add Medication link", label: "Direct add link" },
  { src: "wireframe-contacts.png", alt: "Real wireframe of the new Contacts screen", label: "Contacts" },
  { src: "wireframe-settings.png", alt: "Real wireframe of the new Settings screen", label: "Settings" },
  { src: "wireframe-future-schedule.png", alt: "Real wireframe of the new future-date schedule screen", label: "Future-date schedule" },
];

const FIGMA_PROTOTYPES = [
  {
    src: "figma-horizontal-prototype.png",
    alt: "Real Figma canvas of the horizontal prototype: lock screen, home, loading, home/MyMeds/reminder states, add medication, emergency contacts, and settings",
    ratio: "1124 / 1554",
    label: "Horizontal · full app breadth",
    caption: "Lock screen through settings, including the delayed-reminder and emergency-call states used in the heuristic evaluation.",
    href: "https://www.figma.com/design/IH9NZpw2oQg4HfNMloHrwp/Apple-watch-pill-tracker?node-id=502-94&node-type=canvas",
  },
  {
    src: "figma-vertical-prototype.png",
    alt: "Real Figma canvas of the vertical prototype: the full Add New Medication flow from keyboard entry through type selection, dosage, image upload, and confirmation",
    ratio: "798 / 1406",
    label: "Vertical · add-medication flow",
    caption: "Every state of adding a medication: name entry with keyboard, type dropdown, dosage and frequency, image upload, and the confirmed MyMeds entry.",
    href: "https://www.figma.com/design/IH9NZpw2oQg4HfNMloHrwp/Apple-watch-pill-tracker?node-id=573-611&node-type=canvas",
  },
];

const EVALUATORS = [
  { title: "Two HCI classmates", body: "Already fluent in the course's revised Nielsen heuristics, recruited first for an expert pass on interface consistency and navigation patterns." },
  { title: "A caregiver", body: "Managed real pill schedules for someone else. Grounded the evaluation in what actually happens when someone relies on the app for a person other than themselves." },
  { title: "A pharmacy industry professional", body: "Brought prescription-handling and medication-management experience, relevant given the app's in-app pharmacy contact flow." },
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
    fix: "Add a confirmation dialog (Call Emergency Services? with Confirm and Cancel) before any emergency or pharmacy call goes through.",
    image: { src: "/case-studies/pill-pal/figma-emergency-call-911.png", alt: "Real Figma screen showing the 911 emergency call going straight to Call Emergency Services with no confirmation step" },
  },
  {
    rank: 2,
    issue: "The Add Medication form could be submitted without a frequency or time of day set.",
    heuristic: "Error Prevention",
    severity: "Rated severity 3.",
    fix: "Require frequency and timing before the form can submit, with a clear visual indicator on incomplete fields.",
    image: { src: "/case-studies/pill-pal/figma-add-medication-form.png", alt: "Real Figma screen of the Add New Medication form with Type, Days per Week, Frequency per Day, and Time fields, none marked as required" },
  },
  {
    rank: 3,
    issue: "No back button inside the medication-addition flow, so users couldn't exit without finishing or restarting.",
    heuristic: "User Control and Freedom",
    severity: "Rated severity 3.",
    fix: "Add a persistent back button to every screen in the flow, with a warning if unsaved changes would be lost.",
    image: { src: "/case-studies/pill-pal/figma-add-medication-form.png", alt: "Real Figma screen of the Add New Medication form with no back or exit control visible" },
  },
  {
    rank: 4,
    issue: "Nothing in the app indicated how much medication was left or when a refill was needed.",
    heuristic: "Visibility of System Status",
    severity: "Rated severity 3.",
    fix: "Add a color-coded supply indicator (sufficient, reorder soon, low) with an automatic refill alert.",
    image: { src: "/case-studies/pill-pal/wireframe-mymeds-list.png", alt: "Real wireframe of the MyMeds list with no supply level or refill indicator next to each medication" },
  },
  {
    rank: 5,
    issue: "The medication list showed no purpose or prescribing doctor, so users had to remember why they were taking each drug.",
    heuristic: "Recognition Rather Than Recall",
    severity: "Rated severity 2, but flagged independently by two of the four evaluators.",
    fix: "Add dedicated Purpose and Prescribing Doctor fields to each medication entry.",
    image: { src: "/case-studies/pill-pal/wireframe-mymeds-list.png", alt: "Real wireframe of the MyMeds list showing only medication name and dose, with no purpose or prescriber field" },
  },
  {
    rank: 6,
    issue: "Swipe navigation existed between screens, but nothing on screen indicated it was possible.",
    heuristic: "Recognition Rather Than Recall",
    severity: "Rated severity 2, also flagged independently by two evaluators.",
    fix: "Add a brief swipe-for-more overlay the first time the app opens.",
    image: { src: "/case-studies/pill-pal/wireframe-schedule-direct-add.png", alt: "Real wireframe of the main schedule screen with swipe-page dots at the bottom but no on-screen swipe hint" },
  },
];

const REMAINING_ISSUES = [
  { rank: 7, issue: "Nothing flagged medications that require food or specific conditions, like take with meal.", heuristic: "Visibility of System Status", fix: "Add a Special Instructions field with common toggles like Take with food or Avoid sunlight." },
  { rank: 8, issue: "Pharmacy and emergency contact screens didn't show operating hours or availability.", heuristic: "Visibility of System Status", fix: "Display hours and a real-time open or closed status under each contact." },
  { rank: 9, issue: "No quick-access shortcut to add a medication from the home screen.", heuristic: "Flexibility and Efficiency of Use", fix: "Add a floating quick-add button on the home screen." },
  { rank: 10, issue: "The photo-upload feature gave no guidance on what kind of image was useful.", heuristic: "Help and Documentation", fix: "Add an example-photo guide showing ideal angle and lighting." },
  { rank: 11, issue: "The Day and Week view selector had no explanatory text for new users.", heuristic: "Help and Documentation", fix: "Add a short help line under the selector explaining what it switches between." },
  { rank: 12, issue: "Prescription refill request status wasn't visible anywhere in the app.", heuristic: "Visibility of System Status", fix: "Add a refill-status tracker (Requested, Processing, Ready for Pickup) with timestamps." },
  { rank: 13, issue: "The medication form used technical phrasing, like Frequency per Day, instead of plain language.", heuristic: "Match Between System and the Real World", fix: "Reword form fields in plain language, e.g. how many times a day do you take this?" },
  { rank: 14, issue: "Once a reminder was set, there was no way to pause it without deleting it entirely.", heuristic: "User Control and Freedom", fix: "Add a Pause Reminders option with a duration and resume date." },
  { rank: 15, issue: "Emergency contacts had no icons to distinguish contact types at a glance.", heuristic: "Match Between System and the Real World", fix: "Give each contact type its own icon: medical cross, pill, heart." },
  { rank: 16, issue: "The loading screen gave no progress indicator or status message.", heuristic: "Visibility of System Status", fix: "Add a progress bar with a status message like loading your medications." },
  { rank: 17, issue: "Upcoming and completed medications had no visible timestamps.", heuristic: "Visibility of System Status", fix: "Show specific times, e.g. next dose 2:30 PM and taken at 9:15 AM." },
  { rank: 18, issue: "Emergency contact types weren't clearly differentiated, so users had to remember which contact fit which situation.", heuristic: "Recognition Rather Than Recall", fix: "Label each contact type with when to use it, e.g. immediate emergencies versus prescription questions." },
  { rank: 19, issue: "No indication of which medications had an active reminder set.", heuristic: "Visibility of System Status", fix: "Visually distinguish active reminders (solid color) from inactive ones (grayed out)." },
  { rank: 20, issue: "No distinction shown between prescription and over-the-counter medications.", heuristic: "Visibility of System Status", fix: "Add Rx and OTC tags with distinct styling to each medication entry." },
];

const CHANGES_MADE = [
  "Added a direct Add Medication link from the main schedule screen, cutting the extra navigation step the walkthrough flagged.",
  "Enlarged and relabeled the Add New and confirmation buttons for visibility.",
  "Redesigned the Contacts and Settings screens for clarity.",
  "Added a new future-date schedule screen.",
];

const RECOMMENDATIONS = [
  "A confirmation dialog before any emergency or pharmacy call.",
  "Mandatory field validation on the medication form.",
  "A back button inside the medication-addition flow.",
  "A medication supply and refill tracker.",
  "Plus 16 more fixes across the ranked severity report.",
];

const REFLECTION = [
  {
    category: "Evaluation",
    title: "Evaluation before implementation is cheap insurance",
    body: "Finding the missing emergency-call confirmation on a medium-fidelity prototype cost us nothing. Finding it after a real user hit the wrong button would have cost a lot more.",
  },
  {
    category: "Tradeoffs",
    title: "A watch screen forces harder tradeoffs than a phone screen would",
    body: "Sorting features into must, should, could, and exclude wasn't a formality. On a screen this small, every field we included competed directly with legibility for an older user.",
  },
  {
    category: "Accessibility",
    title: "Accessibility gaps and error-prevention gaps are often the same gap",
    body: "Small input fields that are hard to read and a form that lets you submit without required data aren't separate problems. Both come from not designing for the constraints of the user in front of you.",
  },
  {
    category: "Validation",
    title: "A plausible design and a validated one are different claims",
    body: "Our own cognitive walkthrough made the design feel intuitive to us. It took four people outside the team, two classmates, a caregiver, and a pharmacy professional, to find the twenty places where that feeling didn't hold up.",
  },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.42)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_11%,var(--color-surface-2))]";

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
      <blockquote className="text-balance" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
          {cite}
        </figcaption>
      )}
    </figure>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]" style={{ borderTop: "1px solid var(--color-line)" }}>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}>{value}</p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{label}</p>
    </div>
  );
}

function ProvenancePill({ children, solid = false }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className="inline-block rounded-full px-3 py-1 border"
      style={{
        fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", fontWeight: 600,
        color: solid ? "var(--color-bg)" : "var(--accent-bright, var(--color-project-accent))",
        borderColor: "var(--accent-bright, var(--color-project-accent))",
        background: solid ? "var(--accent-bright, var(--color-project-accent))" : "transparent",
      }}
    >
      {children}
    </span>
  );
}

/** Real UI screens (Figma, wireframes, paper photos) keep their light grammar
 *  and float on the dark field, framed and shadowed (playbook section 10). */
function LightPlate({ children, bg = "#ffffff", className = "" }: { children: React.ReactNode; bg?: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[var(--radius-default)] border shadow-[0_10px_36px_rgba(0,0,0,0.4)] transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_22px_55px_rgba(0,0,0,0.55)] ${className}`} style={{ borderColor: "var(--color-line-strong, var(--color-line))", background: bg }}>
      {children}
    </div>
  );
}

function FigureCaption({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <p className="mb-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
        {eyebrow}
      </p>
      <p className="text-sm" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{children}</p>
    </div>
  );
}

export default function PillPalCaseStudy() {
  const cs = getCaseStudy("pill-pal")!;

  return (
    <div
      style={
        {
          "--color-project-accent": "#6a4a99",
          "--accent-bright": "color-mix(in srgb, #6a4a99 55%, white)",
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
              meta="Team course project · Waterloo, ON"
              artifacts={cs.artifacts}
            />
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>
          <p className="mt-10 text-sm italic" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
            Team project: {cs.team}. {cs.contribution}
          </p>
        </Container>
      </section>

      {/* ---------- At a glance + metrics ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Stack variant="section">
            <Section accentLabel anchor="s-glance" label="At a glance">
              <Reveal className="mt-6">
                <CaseStudySnapshot items={SNAPSHOT_ITEMS} />
              </Reveal>
            </Section>

            <Section accentLabel anchor="s-scope" number="01" heading="What the project covered">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                A course project (MSE 343) that ran end to end: scope the app for a hard user, design and iterate it,
                then evaluate it hard enough to find where it broke, before it ever reached a real person.
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

      {/* ---------- 02: High-stakes design ---------- */}
      <section id="s-stakes" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="High-stakes design" heading="Designing for a high-consequence interaction" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                A wrist is a much smaller canvas than a phone, and the user we designed for made that constraint
                sharper: older adults, where vision and dexterity limits are common, and where a missed dose or a wrong
                tap (calling 911 by accident, skipping a required field) carries real consequence. Every scoping
                decision had to hold up against that combination.
              </p>
            </div>
            <PullQuote cite="The constraint, in one line">
              On this screen, every field we kept competed directly with legibility for an older user.
            </PullQuote>
          </div>

          <p className="mt-14 md:mt-16 mb-5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            What we scoped in, and deliberately left out
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className={`px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
              <p className="mb-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Had to be there</p>
              <ul className="flex flex-col gap-2.5">
                {SCOPE_IN.map((it) => (
                  <li key={it} className="flex gap-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
              <p className="mb-3" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>Deliberately excluded</p>
              <ul className="flex flex-col gap-2.5">
                {SCOPE_OUT.map((it) => (
                  <li key={it} className="flex gap-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--color-text-subtle)" }}>✕</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
                Because the prototype was still medium fidelity, the later evaluation ran against five predefined tasks
                rather than open exploration, so every evaluator exercised every part of the app.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 03: Cognitive walkthroughs ---------- */}
      <section id="s-tasks" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Cognitive walkthroughs" heading="Two tasks, walked through as an elderly user">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              We chose the two interactions with the highest stakes if they went wrong, and walked through each
              step&apos;s action, visibility, and feedback from the perspective of an older user before testing with
              anyone outside the team. Select a step to see what we found, paired with the team&apos;s actual paper
              prototype sketch for that step.
            </p>
          </Section>

          <div className="mt-10">
            <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Task 1 · Adding new medication
            </p>
            <ProcessFlow steps={TASK1_STEPS} rowLength={5} detailBelow middleLabel="" />
          </div>

          <div className="mt-12">
            <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Task 2 · Responding to a medication reminder
            </p>
            <ProcessFlow steps={TASK2_STEPS} rowLength={3} detailBelow middleLabel="" />
          </div>

          <p className="mt-12" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
            The walkthroughs surfaced the same theme twice: labels and layout were clear, but{" "}
            <span style={{ color: "var(--color-text)", fontWeight: 600 }}>what the interface didn&apos;t say</span>{" "}
            (that a field was optional, that a screen was swipeable, how long a snooze would last) was where older users
            would most likely stall. That theme carried directly into the redesign.
          </p>
        </Container>
      </section>

      {/* ---------- 04: Prototype evolution ---------- */}
      <section id="s-prototype" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Prototype evolution" heading="From paper sketches to a testable prototype">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The cognitive-walkthrough findings drove a low-fidelity redesign round before we built anything evaluators
              would actually use. We reworked six screens: MyMeds and its Add Medication flow, the main schedule screen,
              new Contacts and Settings screens, and a new future-date schedule view, each change traceable back to a
              specific walkthrough finding.
            </p>
          </Section>

          <div className="mt-10 grid md:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
            <div className={`flex flex-col justify-center px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>Before</p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>Add Medication was reachable only by navigating away from the schedule</p>
            </div>
            <div className="flex items-center justify-center" aria-hidden="true">
              <span className="rotate-90 md:rotate-0" style={{ color: "var(--accent-bright, var(--color-project-accent))", fontSize: "var(--text-h2)", fontFamily: "var(--font-display)" }}>&rarr;</span>
            </div>
            <div className={`flex flex-col justify-center px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>After</p>
              <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>A direct Add Medication link sits on the main schedule screen</p>
            </div>
          </div>

          {/* Low-fidelity wireframes, horizontal light-plate strip */}
          <div className="mt-14">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <ProvenancePill solid>Real wireframes</ProvenancePill>
              <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>
                Six screens the team redrew after the walkthroughs
              </p>
            </div>
            <div className="overflow-x-auto -mx-1 px-1">
              <div className="flex gap-4 pb-3 min-w-max">
                {WIREFRAMES.map((w) => (
                  <div key={w.src} className="shrink-0 w-[150px]">
                    <LightPlate>
                      <div className="relative w-full bg-white" style={{ aspectRatio: "1 / 1" }}>
                        <Image src={`/case-studies/pill-pal/${w.src}`} alt={w.alt} fill sizes="150px" className="object-contain p-2" />
                      </div>
                      <p className="text-center py-2 border-t" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "#4c4658", borderColor: "rgba(0,0,0,0.08)" }}>
                        {w.label}
                      </p>
                    </LightPlate>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Medium-fidelity Figma prototypes */}
          <div className="mt-14">
            <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Medium-fidelity Figma prototypes, direct from the source files
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {FIGMA_PROTOTYPES.map((p) => (
                <div key={p.src}>
                  <LightPlate bg="#e9e9e9">
                    <div className="relative w-full" style={{ aspectRatio: p.ratio, maxHeight: 480, background: "#e9e9e9" }}>
                      <Image src={`/case-studies/pill-pal/${p.src}`} alt={p.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-contain" />
                    </div>
                  </LightPlate>
                  <FigureCaption eyebrow={p.label}>{p.caption}</FigureCaption>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-1.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>
                    Open in Figma ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- 05: Breaking it on purpose ---------- */}
      <section id="s-evaluation" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Breaking it on purpose" heading="A four-evaluator heuristic evaluation">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              We ran a structured heuristic evaluation: five predefined tasks, a 45-minute session, and the
              course&apos;s revised Nielsen heuristics, with four evaluators chosen deliberately for different expertise
              rather than convenience.
            </p>
          </Section>

          <div className="mt-9 grid md:grid-cols-3 gap-5">
            {EVALUATORS.map((e, i) => (
              <Reveal key={e.title} delay={i * 80}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
                  <h3 className="mb-2.5" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>{e.title}</h3>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Heuristic tally, dark bar chart */}
          <div className="mt-12 px-6 py-6 md:px-8 md:py-8 rounded-[var(--radius-default)] border" style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
            <p className="mb-5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
              Where the {HEURISTIC_TOTAL} raw findings landed, by heuristic
            </p>
            <div className="flex flex-col gap-3">
              {HEURISTIC_TALLY.map((h, i) => (
                <Reveal key={h.name} delay={i * 40}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-[180px] sm:w-[260px] shrink-0" style={{ color: "var(--color-text)", fontWeight: 600 }}>{h.name}</span>
                    <div className="flex-1 h-4 rounded-full overflow-hidden" style={{ background: "var(--color-surface-1)" }}>
                      <div className="h-full rounded-full" style={{ width: `${(h.count / HEURISTIC_TALLY[0].count) * 100}%`, background: "var(--accent-bright, var(--color-project-accent))" }} />
                    </div>
                    <span className="text-sm w-6 text-right shrink-0" style={{ color: "var(--color-text)", fontWeight: 600 }}>{h.count}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
              {HEURISTIC_TOTAL} findings from four evaluators, synthesized down to 20 distinct ranked issues. Visibility
              of System Status alone accounted for {HEURISTIC_TALLY[0].count} of {HEURISTIC_TOTAL}: the app often did the
              right thing without telling the user it had.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div className="px-6 py-5 rounded-[var(--radius-default)] border" style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>Severity 2 (moderate)</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>24 findings</p>
            </div>
            <div className="px-6 py-5 rounded-[var(--radius-default)] border border-l-[3px]" style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
              <p className="mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Severity 3 (highest recorded)</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>4 findings</p>
            </div>
          </div>

          {/* Top 6 ranked issues, with real screen thumbnails */}
          <p className="mt-14 mb-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            The top six of twenty ranked issues
          </p>
          <p className="mb-6" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
            Each finding is shown against the real prototype screen it was found on, from the team&apos;s Figma files and
            wireframes.
          </p>
          <div className="flex flex-col gap-4">
            {TOP_ISSUES.map((it, i) => (
              <Reveal key={it.rank} delay={i * 60}>
                <div className={`px-6 py-5 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)" }}>
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 inline-flex w-9 h-9 items-center justify-center rounded-full border" style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}>
                      {it.rank}
                    </span>
                    <div className="relative shrink-0 w-14 h-[86px] rounded-lg overflow-hidden border hidden sm:block" style={{ borderColor: "var(--color-line-strong, var(--color-line))", background: "#fff" }}>
                      <Image src={it.image.src} alt={it.image.alt} fill sizes="56px" className="object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>{it.issue}</p>
                      <p className="mt-2" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>{it.heuristic}</p>
                      <p className="mt-1 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>{it.severity}</p>
                      <p className="mt-2" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                        <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Fix: </span>{it.fix}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Remaining 14, dark table */}
          <p className="mt-10 mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            The remaining fourteen ranked issues
          </p>
          <div className="overflow-x-auto rounded-[var(--radius-default)] border" style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}>
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-line)" }}>
                  {["#", "Issue", "Heuristic", "Recommended fix"].map((h) => (
                    <th key={h} className="px-5 py-3.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REMAINING_ISSUES.map((it, i) => (
                  <tr key={it.rank} className="transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]" style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                    <th scope="row" className="align-top px-5 py-4" style={{ color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}>{it.rank}</th>
                    <td className="align-top px-5 py-4 w-[34%]" style={{ color: "var(--color-text)", lineHeight: "var(--leading-body)" }}>{it.issue}</td>
                    <td className="align-top px-5 py-4 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>{it.heuristic}</td>
                    <td className="align-top px-5 py-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{it.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ---------- 06: What changed ---------- */}
      <section id="s-changed" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="What changed" heading="What changed, and what was only recommended">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              MSE 343 concluded with the evaluation and its fix-mapped report. We didn&apos;t build or test a further
              prototype round incorporating these 20 fixes, so it matters to keep the two apart.
            </p>
          </Section>

          <div className="mt-9 grid md:grid-cols-2 gap-5">
            <div className={`px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}>
              <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>Changes we actually made</p>
              <ul className="flex flex-col gap-3">
                {CHANGES_MADE.map((it) => (
                  <li key={it} className="flex gap-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
                Carried forward into the medium-fidelity prototype used for the heuristic evaluation.
              </p>
            </div>
            <div className={`px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
              <p className="mb-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--color-text-subtle)" }}>Recommendations only proposed</p>
              <ul className="flex flex-col gap-3">
                {RECOMMENDATIONS.map((it) => (
                  <li key={it} className="flex gap-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: "var(--color-text-subtle)" }}>&rarr;</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)" }}>
                Validated as worth building, not yet built or retested.
              </p>
            </div>
          </div>
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

          <div className="grid sm:grid-cols-2 gap-5">
            {REFLECTION.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                  <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>{r.category}</p>
                  <h3 className="mt-3 mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>{r.title}</h3>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {cs.links && cs.links.length > 0 && (
            <div className="mt-10 flex gap-4 flex-wrap">
              {cs.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-[var(--radius-button)] px-5 py-2.5 border"
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", fontWeight: 600, color: "var(--accent-bright, var(--color-project-accent))", borderColor: "var(--accent-bright, var(--color-project-accent))" }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

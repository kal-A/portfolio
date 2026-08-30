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
import RoomEaseAllocationDiagramV2 from "@/components/case-study/RoomEaseAllocationDiagramV2";
import MediaFrame from "@/components/ui/MediaFrame";
import Reveal from "@/components/Reveal";

/**
 * Case-study format playbook rollout (docs/redesign/11-case-study-format-playbook.md),
 * next page after the approved Greenhouse pilot and the Chronicle V2 reference
 * implementation. RoomEase currently ships on the legacy warm/gold *light*
 * design system (components/case-study/RoomEaseCaseStudy.tsx: cs-box / --ink /
 * blocks/*); this is its rebuild on the shared dark editorial shell, so it
 * matches Greenhouse and Chronicle instead of being a one-off visual world.
 *
 * Content is preserved from the shipped light page verbatim (same page-local
 * constant pattern that page already used) — requirements, booking fields,
 * role model, feasibility split, the reconstructed allocation diagram, the
 * seven walkthrough videos, validation numbers, and reflection — nothing is
 * invented or re-measured here. Only cs.* fields that already exist
 * (company/role/timeframe/tags/toolTags/artifacts/metrics/outcome/whatIdImprove/
 * note) are pulled from the shared data file.
 *
 * Per playbook §10, RoomEase's bespoke SVG allocation diagram keeps its own
 * grammar (a light "reconstructed blueprint" plate framed on the dark field,
 * the same way Chronicle's period map images sit as light plates on dark) —
 * only the shell and layout around it move onto the token system this pass.
 */
const HERO_TITLE = "A fairer, more transparent room-booking system for student clubs";
const HERO_LEAD =
  "University clubs and departments were booking rooms across 34+ different UW websites, each with its own process and no shared way to check what a room actually offered. As a 5-person Management Engineering capstone team we designed and built RoomEase: a booking-and-recommendation prototype that turns event requirements into ranked, policy-aware room suggestions with a transparent appeal path. I led stakeholder research and the user-side prototype, ran our controlled testing against the current process, and carried the results through the symposium poster and final presentation.";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes", label: "Outcome metrics" },
  { href: "#s1", label: "The problem" },
  { href: "#s2", label: "Requirements" },
  { href: "#s3", label: "Room dataset" },
  { href: "#s4", label: "Ranking logic" },
  { href: "#s5", label: "User & admin UX" },
  { href: "#s6", label: "Feasibility" },
  { href: "#s7", label: "Validation" },
  { href: "#s8", label: "Reflection" },
];

const SNAPSHOT_ITEMS = [
  { label: "Role", value: "Stakeholder research, user-side prototype, controlled-testing lead, and final presentation." },
  { label: "Scope", value: "Booking request flow, ranking and allocation logic, admin approval workflow, controlled validation testing." },
  { label: "Team", value: "5-person Management Engineering capstone (Farhan Valli, Gurman Rai, Pranav Gupta, Kamal Ahsan, Jey Jeyapalan), advised by Chris Rennick." },
  { label: "Tools", value: "Figma, React + Next.js, Supabase (PostgreSQL), NextAuth + Microsoft Entra." },
  { label: "Core skills", value: "Requirements Gathering, UX Design, Systems Thinking." },
];

const HEADLINE_STATS = [
  { value: "50% → 88%", label: "usability score, controlled user testing" },
  { value: "33% → 90%", label: "satisfaction score, controlled user testing" },
  { value: "~8.5 → ~4.5 min", label: "average time to book" },
  { value: "~24 → ~10", label: "average clicks to book" },
];

const CURRENT_PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Search 34+ sites",
    synopsis:
      "There was no single UW room-booking system. Every faculty and building ran its own website, so finding out what was even bookable meant scraping through whichever one applied to the building you had in mind.",
  },
  {
    title: "Check inconsistent details",
    synopsis:
      "Capacity, AV equipment, and furniture layout weren't recorded the same way twice. What counted as available, or as “enough room,” depended on which department's page you happened to be reading.",
  },
  {
    title: "Find the right contact",
    synopsis:
      "Bookings required approval from administrative staff or faculty members, and figuring out who that was for a given room wasn't always obvious from the booking page itself.",
  },
  {
    title: "Wait for a response",
    synopsis:
      "Approvals were handled manually, so response time depended entirely on staff availability. Missing information in a request email often meant another round trip before anything was confirmed.",
  },
];

const STAKEHOLDERS = [
  "Engineering Administrative Staff",
  "Arts Undergraduate Office Administration",
  "Undergraduate Recruitment Coordinator (Arts)",
  "WUSA club executives (MSA, WLPA, and others)",
];

const REQUIREMENTS = [
  {
    id: "R1",
    title: "Automatic conflict resolution",
    target: "Reduce double bookings through automatic conflict detection.",
    verify: "Simulated booking-conflict tests.",
  },
  {
    id: "R2",
    title: "Concurrency",
    target: "Support at least 50 concurrent users without performance issues.",
    verify: "Load testing during peak scenarios.",
  },
  {
    id: "R3",
    title: "Usability",
    target: "An intuitive interface requiring minimal training (target raised from 80% to 85% success after early testing).",
    verify: "Usability testing with student leaders.",
  },
  {
    id: "R4",
    title: "Accessibility",
    target: "Accessibility-focused booking options, added after feedback emphasized equitable access.",
    verify: "Usability and accessibility compliance testing.",
  },
  {
    id: "R5",
    title: "Transparent, appealable allocation",
    target: "Room assignments explainable and appealable, added mid-term after fairness and bias concerns came up in advisor review. This is the requirement that reshaped the whole recommendation-and-override design after it.",
    verify: "Allocation audits and user review of simulated scenarios.",
  },
];

const BOOKING_INPUT_FIELDS = [
  { field: "Event name", purpose: "Bookkeeping and event tracking." },
  { field: "Preferred time slots", purpose: "Availability filtering to identify feasible rooms." },
  { field: "Group size", purpose: "Matches users with appropriately sized rooms." },
  { field: "Event type", purpose: "Context for bookkeeping and special considerations." },
  { field: "AV / accessibility requirements", purpose: "Ensures compliance with equipment and accessibility needs." },
  { field: "Priority rating", purpose: "Supports fair scoring rather than a single loud request always winning." },
  { field: "Preferred buildings", purpose: "Building-specific policy and location matching." },
];

const ROLE_CARDS = [
  {
    role: "Member",
    body: "Submits event requirements, reviews ranked room suggestions with visible justifications, and can flag a suggestion as unsuitable with a stated reason instead of silently rejecting it.",
  },
  {
    role: "Executive",
    body: "Can approve bookings directly where their role allows it, giving club leadership a faster path than routing every request through a central admin.",
  },
  {
    role: "Admin",
    body: "Reviews escalated requests: anything with a policy conflict, an exception, or a needed override lands here instead of being approved automatically.",
  },
];

const ROLE_VIDEOS = [
  {
    title: "Member flow",
    context: "A member checks live room availability, sets a priority level, and sends the request to their club executive instead of the flow dead-ending on a single decision-maker.",
    src: "member-flow",
    caption: "Availability updates against real bookings, so a member is choosing from rooms that are actually free, not a static list that might already be taken.",
  },
  {
    title: "Executive flow",
    context: "An executive reviewing club-member requests can approve and book directly, or send a request onward, without every booking needing to reach an admin first.",
    src: "exec-flow",
    caption: "Approve & book is a one-click action here. That's the speed requirement (R2 / usability) staying intact even with a second role in the approval path.",
  },
  {
    title: "Admin flow",
    context: "Switching into the Admin Portal surfaces exactly the requests that couldn't resolve on their own: pending approvals and flagged scheduling conflicts.",
    src: "admin-flow",
    caption: "Conflicts are labeled, not hidden inside a normal-looking request. That's where the manual override with a stated reason actually gets used.",
  },
];

const DESIGN_DECISIONS = [
  {
    title: "Justification tags on every suggestion, not just a ranked list",
    body: "A bare ranked list would have looked like a black box. Showing why a room was suggested (capacity fit, feature match) is what let club executives trust the matching in testing.",
  },
  {
    title: "Override requires a reason before it re-scores",
    body: "An unexplained override would have made the ranking meaningless the first time someone bypassed it. Requiring a stated reason kept manual control connected to the transparency requirement instead of undermining it.",
  },
  {
    title: "Executives approve directly; anything with an issue escalates",
    body: "Routing every request through a central admin would have recreated the same bottleneck we were removing. Letting executives approve within their own club's requests, while conflicts and exceptions still escalate, kept both speed and oversight.",
  },
];

const FEASIBILITY_COLUMNS = [
  {
    label: "Implemented",
    items: [
      "User-side booking prototype: request intake, hard-constraint filtering, and ranked suggestions.",
      "Supabase (PostgreSQL) persistence for bookings, so a confirmed request could not silently conflict with a later one.",
      "Role-based access via NextAuth with Microsoft Entra authentication, distinguishing member, executive, and admin sessions.",
      "Manual override flow requiring a stated reason before re-scoring.",
    ],
  },
  {
    label: "Simulated in testing",
    items: [
      "Institutional WatIAM and WUSA approval flows, replicated using manual override flags rather than a live UW integration.",
      "Realistic booking scenarios, including priority events and rare room-feature requests, run against the consolidated room dataset.",
      "Building-specific policy edge cases such as last-minute bookings or incomplete event details.",
    ],
  },
  {
    label: "Left as future work",
    items: [
      "Full UW single sign-on and live WatIAM integration.",
      "Unified room data across all campus booking systems, not just the buildings compiled during the term.",
      "Calendar sync with Google Calendar and Outlook.",
      "Procurement support, cut from scope after the MOT to keep the term feasible.",
    ],
  },
];

const TEST_QUOTES = [
  { quote: "Being able to compare rooms so easily saved us a ton of time.", cite: "MSA Exec, controlled user testing" },
  { quote: "The matching algorithm was useful to see what our best options were.", cite: "WLPA Exec, controlled user testing" },
];

const REFLECTION_CARDS = [
  {
    category: "Fairness",
    title: "Fairness has to be an explicit requirement, not an assumed side effect",
    body: "A working matching algorithm isn't automatically a fair one. Requirement R5, transparent and appealable allocation, only exists because advisor review surfaced fairness concerns mid-term. It shaped the whole recommendation-and-override design after that.",
  },
  {
    category: "Requirements",
    title: "Ambiguous stakeholder needs don't resolve themselves into logic",
    body: "Different departments described the same constraint differently, and it took direct outreach to Engineering and Arts staff, plus club executives, before we had a consistent enough picture to encode as hard constraints versus preferences.",
  },
  {
    category: "Systems",
    title: "Admin control and transparency aren't actually in tension",
    body: "I expected the manual override to feel like a loophole in the fairness story. Requiring a stated reason instead of a silent bypass made it the opposite: control that still left a record, which is what made the allocation model appealable rather than just automated.",
  },
  {
    category: "Next step",
    title: "A production version needs the institution, not just the prototype",
    body: "Everything that held the prototype back from being a real UW system — live WatIAM authentication, campus-wide room data, calendar sync — depends on institutional access we didn't have as students. The next step is a pilot, not a rebuild.",
  },
];

const VID = "/case-studies/roomease/video";

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

/** Shared card-hover language from the Chronicle reference (playbook §6):
 *  lift + soft shadow + faint accent-tinted wash, for otherwise-static
 *  fact cards so they don't read as inert next to the page's real controls. */
const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.42)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_11%,var(--color-surface-2))]";

/** Narrative paragraph paired tightly beside its media on one axis, media
 *  side alternating section to section (`flip`) — the primary rhythm move
 *  from the playbook (§2). Whitespace lives between pairs, never inside one.
 *  Stacks to one column below `lg` with the media following its text. */
/** A video figure paired with a side panel that stretches to the video's
 *  height (`items-stretch`) and vertically centres its content — so a short
 *  caption sits inside a deliberate frame instead of floating in a half-empty
 *  column. The wider (1.5fr) track always follows the video, and `videoLeft`
 *  alternates the sides to keep the cascade. One layout for every video pair
 *  on the page, so §05, §06, and §08 stay visually identical. */
function VideoRow({
  videoLeft = false,
  side,
  video,
}: {
  videoLeft?: boolean;
  side: React.ReactNode;
  video: React.ReactNode;
}) {
  return (
    <div className={`grid ${videoLeft ? "lg:grid-cols-[1.5fr_1fr]" : "lg:grid-cols-[1fr_1.5fr]"} gap-8 lg:gap-14 items-stretch`}>
      <div className={`min-w-0 ${videoLeft ? "lg:order-2" : "lg:order-1"}`}>
        <div
          className={`h-full flex flex-col justify-center px-7 py-8 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
          style={{ background: "var(--color-surface-1)", borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))" }}
        >
          {side}
        </div>
      </div>
      <div className={`min-w-0 ${videoLeft ? "lg:order-1" : "lg:order-2"}`}>
        <Reveal>{video}</Reveal>
      </div>
    </div>
  );
}

/** Shared eyebrow style for a VideoRow side panel's small accent label. */
const SIDE_EYEBROW: React.CSSProperties = {
  fontSize: "var(--text-label)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--accent-bright, var(--color-project-accent))",
};

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

/** A before/after delta stat. The site's `Metric` uses `--text-metric`
 *  (clamp 3rem–6.5rem), which is tuned for a single short number; these
 *  values are "before → after" strings that would overflow a quarter-width
 *  cell at that scale, so they render at display-`h1` scale instead. Same
 *  hairline-top + hover-wash treatment every quick-fact grid on the page
 *  shares (playbook §6), so the row stays part of one tactile language. */
function DeltaStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="-mx-3 px-3 pt-5 pb-4 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <p
        className="text-balance"
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", lineHeight: "var(--leading-h1)", color: "var(--color-text)" }}
      >
        {value}
      </p>
      <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
    </div>
  );
}

/** Dark-field walkthrough video figure — the token-based counterpart to the
 *  legacy blocks/VideoBlock (which was built on cs-box / --ink). Header
 *  (title + why it's here), the player itself, and a "What to notice"
 *  footer with an accent eyebrow. Opts into the same interactive hover pop
 *  (`MediaFrame interactive`, playbook §6) so a video frame lifts the same
 *  way an image frame does. */
function VideoFigure({
  title,
  context,
  src,
  poster,
  caption,
}: {
  title: string;
  context: string;
  src: string;
  poster: string;
  caption: string;
}) {
  return (
    <figure
      className={`group h-full overflow-hidden rounded-[var(--radius-default)] border transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]`}
      style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}
    >
      <div className="px-6 pt-6 pb-4">
        <h3 className="mb-1.5" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}>
          {title}
        </h3>
        <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{context}</p>
      </div>
      <div className="relative w-full aspect-video bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={src} poster={poster} controls preload="none" playsInline className="w-full h-full object-contain" />
      </div>
      <figcaption className="px-6 py-4" style={{ borderTop: "1px solid var(--color-line)" }}>
        <p
          className="mb-2"
          style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
        >
          What to notice
        </p>
        <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{caption}</p>
      </figcaption>
    </figure>
  );
}

/** The small "Reconstructed" provenance chip the legacy page carried under
 *  its diagram/table, moved onto the token set. */
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

export default function RoomEaseCaseStudyV2() {
  const cs = getCaseStudy("roomease")!;
  const theme = caseStudyTheme.roomease;

  return (
    <div
      style={
        {
          "--color-project-accent": theme.accent,
          // A lightened accent that stays legible as small type/detail on the
          // near-black field, used for eyebrows, sub-labels, borders, and the
          // pull-quote mark (playbook §5).
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
              meta={`Waterloo, ON · ${cs.timeframe}`}
              artifacts={cs.artifacts}
              media={{ src: "/case-studies/roomease/hero.png", alt: "The RoomEase booking prototype interface", position: "top" }}
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

            <Section accentLabel anchor="s-outcomes" number="01" heading="What controlled testing measured">
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
                Every number below is a before/after from the same end-to-end booking task, run once on the current UW
                process and once on the RoomEase prototype, with students and club executives.
              </p>
              <Grid className="mt-8">
                {HEADLINE_STATS.map((s, i) => (
                  <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-3">
                    <Reveal delay={i * 80}>
                      <DeltaStat value={s.value} label={s.label} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- 02: The problem ---------- */}
      <section id="s1" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="The problem" heading="Room booking wasn't a calendar problem" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                Room booking at UW was a decentralized system stuck in the past: 34+ different booking websites, each
                with its own instructions, contacts, and approval process. Admins handling requests by hand were prone
                to human error, and students had no shared way to see what a room actually offered before submitting a
                request. In our own baseline testing on the current process, that friction was measurable: only{" "}
                <span style={{ color: "var(--color-text)", fontWeight: 600 }}>33% of booking attempts completed
                without help</span>, and it took a student roughly 8.5 minutes and 24 clicks on average when it did.
              </p>
            </div>
            <PullQuote cite="The problem, in one line">
              Booking a room meant searching 34+ separate sites that never described a room the same way twice.
            </PullQuote>
          </div>

          {/* Who we heard from — a full-width strip (chips), so the process
              flow below can take the whole band without its step boxes being
              squeezed into a narrow nested column. */}
          <div
            className={`mt-14 md:mt-16 px-6 py-5 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
            style={{
              borderColor: "var(--color-line)",
              borderLeftColor: "var(--accent-bright, var(--color-project-accent))",
              background: "var(--color-surface-1)",
            }}
          >
            <div className="grid lg:grid-cols-[300px_1fr] gap-x-10 gap-y-4 items-center">
              <div>
                <p
                  className="mb-2"
                  style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
                >
                  Who we heard from
                </p>
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                  Over about a month we reached out to staff across Engineering and Arts, and spoke with
                  WUSA-affiliated club executives and student organizers about the other side of the request.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {STAKEHOLDERS.map((s) => (
                  <span
                    key={s}
                    className="text-sm rounded-full px-3.5 py-1.5 border"
                    style={{ color: "var(--color-text-muted)", borderColor: "var(--color-line-strong, var(--color-line))" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p
              className="mb-6"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              The current process, end to end
            </p>
            <ProcessFlow steps={CURRENT_PROCESS_STEPS} rowLength={4} detailBelow middleLabel="" />
          </div>
        </Container>
      </section>

      {/* ---------- 03: Requirements ---------- */}
      <section id="s2" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="03" label="Requirements" heading="Turning stakeholder needs into product requirements">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              What we heard didn&apos;t map cleanly onto a single feature list. Automatic conflict resolution, enough
              concurrency for real peak-time use, and an interface club members and admins could both use without
              training were the baseline. Two more came later: accessibility, after feedback emphasized equitable
              access, and transparent, appealable allocation, added mid-term once fairness and bias concerns came up
              in advisor review.
            </p>

            <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {REQUIREMENTS.map((r, i) => (
                <Reveal key={r.id} delay={i * 70} className={r.id === "R5" ? "lg:col-span-2" : undefined}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-9 h-9 rounded-[10px] border flex items-center justify-center shrink-0"
                        style={{ borderColor: "var(--accent-bright, var(--color-project-accent))", color: "var(--accent-bright, var(--color-project-accent))", fontFamily: "var(--font-display)", fontSize: "var(--text-h3)" }}
                      >
                        {r.id}
                      </span>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", color: "var(--color-text)" }}>
                        {r.title}
                      </h3>
                    </div>
                    <p className="mb-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      {r.target}
                    </p>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      <span style={{ color: "var(--accent-bright, var(--color-project-accent))", fontWeight: 600 }}>Verified by:</span>{" "}
                      {r.verify}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 04: Room dataset ---------- */}
      <section id="s3" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="04" label="Room dataset" heading="Room data that means the same thing everywhere">
            <div className="mt-8 grid lg:grid-cols-[1fr_1.3fr] gap-x-14 gap-y-8 items-start">
              <div className="min-w-0">
                <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  None of the ranking logic works without room data that means the same thing everywhere. We compiled a
                  shared dataset of bookable UW rooms — capacity, AV equipment, and furniture layouts — starting with
                  Hagey Hall and RCH and expanding to engineering buildings once our advisor shared a data source that
                  filled the gap.
                </p>
                <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                  A room from one building being described completely differently from a room in another was exactly the
                  inconsistency the decentralized process couldn&apos;t catch — and a product prerequisite before
                  ranking logic could treat every room fairly.
                </p>
                <ReconstructedNote>
                  Field list rebuilt from the team&apos;s EOT report. Room-by-room dataset values are internal to the
                  project and not shown here.
                </ReconstructedNote>
              </div>

              <div className="min-w-0 overflow-hidden rounded-[var(--radius-default)] border" style={{ borderColor: "var(--color-line)", background: "var(--color-surface-1)" }}>
                <div className="px-5 py-4" style={{ background: "var(--color-surface-2)", borderBottom: "1px solid var(--color-line)" }}>
                  <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                    Booking input fields, and why each existed
                  </p>
                </div>
                <table className="w-full text-left">
                  <tbody>
                    {BOOKING_INPUT_FIELDS.map((row, i) => (
                      <tr
                        key={row.field}
                        className="transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                        style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}
                      >
                        <th scope="row" className="align-top px-5 py-3.5 w-[42%]" style={{ color: "var(--color-text)", fontWeight: 600 }}>
                          {row.field}
                        </th>
                        <td className="align-top px-5 py-3.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 05: Ranking and allocation logic ---------- */}
      <section id="s4" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="05" label="Ranking logic" heading="How a request becomes a ranked, approved room">
            <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              Hard constraints — time conflicts, capacity, required features — are checked first and are non-negotiable.
              What&apos;s left is scored on fit and preference, with priority rating moderated so one loud request
              can&apos;t always win. A user can accept a suggestion or flag it with a reason, which re-runs scoring
              instead of dead-ending the request, and every booking still passes through executive or admin validation
              before it&apos;s final.
            </p>

            <div className="mt-10">
              <RoomEaseAllocationDiagramV2 />
            </div>
            <ReconstructedNote>
              Rebuilt from the team&apos;s six-step matching algorithm (EOT report, Table 4), the FDR&apos;s two-stage
              recommendation model, the manual-override wireframe, and the governed multi-role workflow. Shape carries
              meaning; every node is clickable and details open in a side panel.
            </ReconstructedNote>

            <div className="mt-14 md:mt-16">
              <VideoRow
                videoLeft
                side={
                  <>
                    <p className="mb-2" style={SIDE_EYEBROW}>The intake step</p>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                      A member entering event requirements feeds straight into the hard-constraint filter before
                      anything gets ranked. Collecting priority level and accessibility needs as structured inputs
                      here — rather than free-text notes — is the design decision that makes the entire ranking step
                      downstream possible.
                    </p>
                  </>
                }
                video={
                  <VideoFigure
                    title="The booking form, live"
                    context="The diagram above is reconstructed from the report; this is the actual step 1 it describes."
                    src={`${VID}/booking-form.mp4`}
                    poster={`${VID}/poster/booking-form.jpg`}
                    caption="Group size, event type, AV/accessibility needs, priority level, and preferred building are structured fields, not free text — which is what lets the matching engine treat capacity and features as hard constraints instead of guessing at intent."
                  />
                }
              />
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 06: User and admin experience ---------- */}
      <section id="s5" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="06" label="User & admin UX" heading="Designing the user and admin experience">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              The frontend had to carry two jobs: help a member get to a good room fast, and give admins a way to
              intervene without becoming a bottleneck for every request. Role-based access split those concerns into
              three levels, each with a different amount of authority over the same booking lifecycle.
            </p>

            <p
              className="mt-9 mb-6"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              Three roles, one booking lifecycle
            </p>
            {/* Each role's definition sits in a VideoRow side panel — the
                role's *authority*, distinct from the video header's narration of
                the flow, so nothing repeats. Sides alternate to keep the cascade. */}
            <div className="flex flex-col gap-12 md:gap-16">
              {ROLE_VIDEOS.map((v, i) => {
                const role = ROLE_CARDS[i];
                return (
                  <VideoRow
                    key={v.src}
                    videoLeft={i % 2 === 1}
                    side={
                      <>
                        <p className="mb-2" style={SIDE_EYEBROW}>Role {String(i + 1).padStart(2, "0")}</p>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
                          {role.role}
                        </h3>
                        <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                          {role.body}
                        </p>
                      </>
                    }
                    video={
                      <VideoFigure
                        title={v.title}
                        context={v.context}
                        src={`${VID}/${v.src}.mp4`}
                        poster={`${VID}/poster/${v.src}.jpg`}
                        caption={v.caption}
                      />
                    }
                  />
                );
              })}
            </div>

            <p
              className="mt-14 mb-6"
              style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}
            >
              Design decisions that came out of testing
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {DESIGN_DECISIONS.map((d, i) => (
                <Reveal key={d.title} delay={i * 80}>
                  <div
                    className={`h-full px-6 py-5 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                    style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
                  >
                    <p className="mb-2" style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                      {d.title}
                    </p>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{d.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 07: Technical feasibility ---------- */}
      <section id="s6" style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="07" label="Feasibility" heading="A feasibility demonstration, tested as a real system">
            <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}>
              RoomEase is a feasibility demonstration, not a fully deployed UW system. After Peer Critique 1 showed that
              a frontend-only version couldn&apos;t actually prevent double bookings, we added Supabase persistence and
              role-based auth so the prototype could be tested as a real, stateful system rather than a click-through
              mockup.
            </p>

            <div className="mt-9 grid md:grid-cols-3 gap-5">
              {FEASIBILITY_COLUMNS.map((col, i) => (
                <Reveal key={col.label} delay={i * 80}>
                  <div className={`h-full px-5 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <p
                      className="inline-block mb-4 rounded-full px-3 py-1 border"
                      style={{
                        fontSize: "var(--text-label)",
                        letterSpacing: "var(--tracking-label)",
                        textTransform: "uppercase",
                        color: "var(--accent-bright, var(--color-project-accent))",
                        borderColor: "var(--accent-bright, var(--color-project-accent))",
                      }}
                    >
                      {col.label}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2.5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                          <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>–</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-6" style={{ color: "var(--color-text-subtle)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}>
              Frontend: React with Tailwind CSS. Backend: Supabase (PostgreSQL) with Microsoft Entra authentication
              integrated via NextAuth and Node.js for data handling and access control.
            </p>

            <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
              <VideoFigure
                title="Full prototype walkthrough"
                context="An end-to-end pass through the built prototype: landing, structured booking form, room comparison, and the admin and analytics views, run against the real Supabase-backed system."
                src={`${VID}/product-demo.mp4`}
                poster={`${VID}/poster/product-demo.jpg`}
                caption="Sign-in, role switching, and every screen here is live application state. That's the difference Peer Critique 1 forced: a frontend-only prototype could look like this and still not stop a double booking."
              />
              <VideoFigure
                title="Admin analytics and conflict queue"
                context="The Admin Portal's analytics view, which lets an admin work from operational patterns instead of reacting to one booking request at a time."
                src={`${VID}/admin-analytics.mp4`}
                poster={`${VID}/poster/admin-analytics.jpg`}
                caption="Pending requests, same-day approvals and denials, and flagged conflicts sit together on one screen — which is what makes an override accountable to a record instead of a private decision."
              />
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- 08: Validation and outcomes ---------- */}
      <section id="s7" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel number="08" label="Validation" heading="Validation against the current process">
            <div className="mt-8">
              <VideoRow
                side={
                  <>
                    <p className="mb-2" style={SIDE_EYEBROW}>How we validated it</p>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                      After meeting with club executives and students to establish a baseline, we ran a controlled
                      comparison: the same end-to-end booking scenario, once on the current UW process and once on the
                      RoomEase prototype, with students and club executives.
                    </p>
                    <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                      The gains held across every measure we tracked — usability, satisfaction, time, and clicks — not
                      just the one that was easiest to move.
                    </p>
                  </>
                }
                video={
                  <VideoFigure
                    title="One of the end-to-end test scenarios"
                    context="A structured booking scenario from verification — the same kind of task compared against the current UW process in the controlled sessions behind the numbers."
                    src={`${VID}/validation-walkthrough.mp4`}
                    poster={`${VID}/poster/validation-walkthrough.jpg`}
                    caption="Priority level and AV/accessibility needs are collected as structured fields here — the same inputs that feed the hard-constraint filter and ranking shown in section 05."
                  />
                }
              />
            </div>

            <Grid className="mt-12">
              {HEADLINE_STATS.map((s, i) => (
                <div key={s.label} className="col-span-2 sm:col-span-2 lg:col-span-3">
                  <Reveal delay={i * 70}>
                    <DeltaStat value={s.value} label={s.label} />
                  </Reveal>
                </div>
              ))}
            </Grid>

            <div className="mt-12 grid lg:grid-cols-2 gap-6">
              {TEST_QUOTES.map((q) => (
                <figure
                  key={q.cite}
                  className={`px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
                  style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
                >
                  <blockquote style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", lineHeight: "var(--leading-h3)", color: "var(--color-text)" }}>
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                    {q.cite}
                  </figcaption>
                </figure>
              ))}
            </div>

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

      {/* ---------- 09: Reflection ---------- */}
      <section id="s8" style={BAND.tint}>
        <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <p style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
            Reflection
          </p>
          <h2 className="mt-2 mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
            What building this actually taught me
          </h2>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-x-14 gap-y-10 items-start">
            <div className="grid sm:grid-cols-2 gap-5">
              {REFLECTION_CARDS.map((r, i) => (
                <Reveal key={r.title} delay={i * 80}>
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

            <div className="lg:sticky lg:top-24">
              <Reveal>
                <MediaFrame
                  interactive
                  src="/case-studies/roomease/team.jpg"
                  alt="The five-person RoomEase capstone team at the symposium presentation"
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="aspect-[4/3]"
                />
                <p className="mt-3 text-sm italic" style={{ color: "var(--color-text-subtle)" }}>
                  The five-person RoomEase capstone team at the symposium presentation.
                </p>
              </Reveal>

              {cs.whatIdImprove && (
                <div
                  className="mt-8 px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px]"
                  style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
                >
                  <p className="mb-2.5" style={{ fontSize: "var(--text-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--accent-bright, var(--color-project-accent))" }}>
                    What I&apos;d improve next
                  </p>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{cs.whatIdImprove}</p>
                </div>
              )}
            </div>
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

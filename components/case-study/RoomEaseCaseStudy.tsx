import Link from "next/link";
import Image from "next/image";
import ProjectIcon from "@/components/ProjectIcon";
import { getCaseStudy } from "@/lib/content/case-studies";
import RoomEaseAllocationDiagram from "@/components/case-study/RoomEaseAllocationDiagram";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import VideoBlock from "@/components/case-study/blocks/VideoBlock";
import Reveal from "@/components/Reveal";

const VID = "/case-studies/roomease/video";

const GOLD_GRADIENT = "linear-gradient(135deg, #f0b429, #8a5a0a)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(234,184,72,0.16) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(138,90,10,0.10) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(240,180,41,0.14) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,36,25,0.06) 0%, transparent 46%), #f8f2e2";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(234,184,72,0.14) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,36,25,0.06) 0%, transparent 46%), #f8f2e2";
const TONE_AMBER =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.34) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(138,90,10,0.16) 0%, transparent 46%), linear-gradient(180deg, #f5dea0 0%, #eecf82 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(234,184,72,0.14) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(240,207,130,0.07) 0%, transparent 46%), linear-gradient(180deg, #2b2419 0%, #241f16 55%, #1a1610 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s1",
    label: "The problem",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>,
  },
  {
    href: "#s2",
    label: "Requirements",
    icon: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  },
  {
    href: "#s3",
    label: "Room dataset",
    icon: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M10 4v16" /></>,
  },
  {
    href: "#s4",
    label: "Ranking logic",
    icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
  },
  {
    href: "#s5",
    label: "User & admin UX",
    icon: <><circle cx="8" cy="8" r="3" /><path d="M2 20c0-3.2 2.7-5.5 6-5.5s6 2.3 6 5.5" /><circle cx="18" cy="7" r="2" /><path d="M14.5 20c.2-2.6 2-4.5 4-4.5" /></>,
  },
  {
    href: "#s6",
    label: "Feasibility",
    icon: <><path d="M4 4h16v16H4z" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  },
  {
    href: "#s7",
    label: "Validation",
    icon: <path d="M4 18l5-6 4 3 7-9" />,
  },
  {
    href: "#s8",
    label: "Reflection",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v5l3 2" /></>,
  },
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
      "Capacity, AV equipment, and furniture layout weren't recorded the same way twice. What counted as available, or as \"enough room,\" depended on which department's page you happened to be reading.",
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
    target: "Room assignments explainable and appealable, added mid-term after fairness and bias concerns came up in advisor review.",
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
    accent: "#f0b429",
    body: "Submits event requirements, reviews ranked room suggestions with visible justifications, and can flag a suggestion as unsuitable with a stated reason instead of silently rejecting it.",
  },
  {
    role: "Executive",
    accent: "#c9941a",
    body: "Can approve bookings directly where their role allows it, giving club leadership a faster path than routing every request through a central admin.",
  },
  {
    role: "Admin",
    accent: "#8a5a0a",
    body: "Reviews escalated requests: anything with a policy conflict, an exception, or a needed override lands here instead of being approved automatically.",
  },
];

const FEASIBILITY_COLUMNS = [
  {
    label: "Implemented",
    accent: "#2f9e6e",
    items: [
      "User-side booking prototype: request intake, hard-constraint filtering, and ranked suggestions.",
      "Supabase (PostgreSQL) persistence for bookings, so a confirmed request could not silently conflict with a later one.",
      "Role-based access via NextAuth with Microsoft Entra authentication, distinguishing member, executive, and admin sessions.",
      "Manual override flow requiring a stated reason before re-scoring.",
    ],
  },
  {
    label: "Simulated in testing",
    accent: "#c9941a",
    items: [
      "Institutional WatIAM and WUSA approval flows, replicated using manual override flags rather than a live UW integration.",
      "Realistic booking scenarios, including priority events and rare room-feature requests, run against the consolidated room dataset.",
      "Building-specific policy edge cases such as last-minute bookings or incomplete event details.",
    ],
  },
  {
    label: "Left as future work",
    accent: "#a15a10",
    items: [
      "Full UW single sign-on and live WatIAM integration.",
      "Unified room data across all campus booking systems, not just the buildings compiled during the term.",
      "Calendar sync with Google Calendar and Outlook.",
      "Procurement support, which was cut from scope after the MOT to keep the term feasible.",
    ],
  },
];

export default function RoomEaseCaseStudy() {
  const cs = getCaseStudy("roomease")!;

  return (
    <div
      style={
        {
          "--cs-wash-from": "#fdf3d9",
          "--cs-wash-to": "#eab848",
          "--cs-light-from": "#fdf6e7",
          "--cs-light-to": "#f6dfb2",
          "--cs-accent-deep": "#8a5a0a",
          "--cs-accent-wash-rgb": "234, 184, 72",
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
                style={{ background: GOLD_GRADIENT, boxShadow: "0 10px 26px -8px rgba(138,90,10,0.45)" }}
              >
                <ProjectIcon slug="roomease" className="w-[38px] h-[38px]" style={{ color: "#fdfaf5" }} />
              </div>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "var(--cs-accent-deep)" }}>
                RoomEase · University of Waterloo Capstone (MSE 401/402)
              </p>
              <h1
                className="font-serif text-4xl sm:text-[50px] leading-[1.08] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Designing a fairer, more transparent room-booking system for student clubs
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Waterloo, ON · Spring 2025 – Winter 2026
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                University clubs and departments were booking rooms across 34+ different UW
                websites, each with its own process, and no shared way to check what a room
                actually offered. As a 5-person Management Engineering capstone team, we designed
                and built RoomEase: a booking-and-recommendation prototype that turns event
                requirements into ranked, policy-aware room suggestions with a transparent appeal
                path. I worked on stakeholder research and the user-side booking prototype, led
                our controlled user testing against the current process, and carried those
                results through the symposium poster and final presentation.
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
                <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--cs-accent-deep)" }}>
                  On this page
                </p>
                <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                  Eight sections, from the fragmented current process through to reflection.
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
                      style={{ background: "linear-gradient(135deg, #fdf3d9, #f0b429)", borderColor: "var(--ink)" }}
                    >
                      <span className="w-3.5 h-3.5" style={{ color: "#8a5a0a" }}>
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
              <div className="relative w-full aspect-[2/1]">
                <Image
                  src="/case-studies/roomease/hero.png"
                  alt="RoomEase booking prototype interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* Snapshot */}
          <SnapshotGrid>
            <SnapshotBox
              label="Role"
              accentGradient={GOLD_GRADIENT}
              icon={<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>}
            >
              Stakeholder research, user-side prototype, controlled testing lead, and final presentation.
            </SnapshotBox>
            <SnapshotBox
              label="Scope"
              accentGradient={GOLD_GRADIENT}
              icon={<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 4v5" /></>}
            >
              Booking request flow, ranking and allocation logic, admin approval workflow, controlled validation testing.
            </SnapshotBox>
            <SnapshotBox
              label="Team"
              accentGradient={GOLD_GRADIENT}
              icon={<><circle cx="7" cy="8" r="2.6" /><circle cx="17" cy="8" r="2.6" /><path d="M2.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M12 19c0-3 2-5 4.5-5s4.5 2 4.5 5" /></>}
            >
              5-person Management Engineering capstone (Farhan Valli, Gurman Rai, Pranav Gupta, Kamal Ahsan, Jey Jeyapalan), advised by Chris Rennick.
            </SnapshotBox>
            <div className="cs-box white h-full px-6 py-6">
              <div
                className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                style={{ background: GOLD_GRADIENT, borderColor: "var(--ink)" }}
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
                  ["Figma", "wireframes and mid-fidelity mockups"],
                  ["React + Next.js", "user-side booking prototype"],
                  ["Supabase (PostgreSQL)", "booking persistence"],
                  ["NextAuth + Microsoft Entra", "role-based authentication"],
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

      {/* ---------- 01: The problem ---------- */}
      <div id="s1" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="Why room booking wasn't just a calendar problem">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Room booking at UW was a decentralized system stuck in the past: 34+ different
              booking websites, each with its own instructions, contacts, and approval process.
              Admins handling requests by hand were prone to human error, and students had no
              shared way to see what a room actually offered before submitting a request. In our
              own baseline testing on the current process, that friction was measurable: only 33%
              of booking attempts completed without help, and it took a student roughly 8.5
              minutes and 24 clicks on average when it did work.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Who we heard from
            </p>
            <div className="cs-box white px-6 py-6">
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#4c473e" }}>
                Over about a month we reached out to administrative staff across Engineering and
                Arts to understand how bookings are currently handled, and spoke with
                WUSA-affiliated club executives and student organizers about what the process
                looked like from the other side of the request.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Engineering Administrative Staff",
                  "Arts Undergraduate Office Administration",
                  "Undergraduate Recruitment Coordinator (Arts)",
                  "WUSA club executives (MSA, WLPA, and others)",
                ].map((s) => (
                  <span
                    key={s}
                    className="text-[13px] font-bold rounded-full px-3.5 py-1.5 border-2"
                    style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(160deg, #fdf6e7, #f6dfb2)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Chapter>

          <Reveal>
            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-11 mb-4" style={{ color: "var(--ink)" }}>
              The current process
            </p>
            <ProcessFlow steps={CURRENT_PROCESS_STEPS} accent="#c9941a" />
          </Reveal>
        </div>
      </div>

      {/* ---------- 02: Requirements ---------- */}
      <div id="s2" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-start gap-5">
              <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
                02
              </p>
              <h2 className="font-serif text-[40px] leading-tight text-balance mt-2" style={{ color: "var(--ink)" }}>
                Turning stakeholder needs into product requirements
              </h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl my-8" style={{ color: "#33302a" }}>
              What we heard didn&apos;t map cleanly onto a single feature list. Automatic conflict
              resolution, enough concurrency to support real peak-time use, and an interface club
              members and admins could both use without training were the baseline. Two more
              requirements came later: accessibility, after feedback emphasized equitable access,
              and transparent, appealable allocation, added mid-term once fairness and bias
              concerns came up in advisor review.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <div className="cs-box white h-full px-6 py-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-base shrink-0"
                      style={{ borderColor: "var(--ink)", background: GOLD_GRADIENT, color: "#fdfaf5" }}
                    >
                      {r.id}
                    </span>
                    <h3 className="font-serif font-bold text-lg" style={{ color: "var(--ink)" }}>
                      {r.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                    {r.target}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                    <span className="font-extrabold" style={{ color: "var(--cs-accent-deep)" }}>
                      Verified by:{" "}
                    </span>
                    {r.verify}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 03: Room dataset ---------- */}
      <div id="s3" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="03" title="Building the room dataset">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              None of the ranking logic works without room data that means the same thing
              everywhere. We compiled a shared Excel dataset of bookable UW rooms, capacity, AV
              equipment, and furniture layouts, starting with Hagey Hall and RCH and expanding to
              engineering buildings once our advisor shared a data source that filled the gap. A
              room from one building being described completely differently from a room in
              another was exactly the kind of inconsistency the current, decentralized process
              couldn&apos;t catch, and it was a product prerequisite before ranking logic could
              treat every room fairly.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Booking input fields, and why each one existed
            </p>
            <div className="cs-box white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="cs-table w-full text-sm">
                  <thead>
                    <tr style={{ background: "linear-gradient(160deg, #fdf3d9, #f6dfb2)" }}>
                      <th className="text-left font-extrabold uppercase tracking-wide text-[12px] px-5 py-3" style={{ color: "var(--ink)" }}>
                        Field
                      </th>
                      <th className="text-left font-extrabold uppercase tracking-wide text-[12px] px-5 py-3" style={{ color: "var(--ink)" }}>
                        Why it was collected
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {BOOKING_INPUT_FIELDS.map((row) => (
                      <tr key={row.field} style={{ borderTop: "1.5px dashed rgba(32,28,23,0.14)" }}>
                        <td className="px-5 py-3 font-bold" style={{ color: "var(--ink)" }}>
                          {row.field}
                        </td>
                        <td className="px-5 py-3" style={{ color: "#4c473e" }}>
                          {row.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
                style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(135deg, #f0b429, #8a5a0a)" }}
              >
                Reconstructed
              </span>
              Field list rebuilt from the team&apos;s EOT report. Room-by-room dataset values are
              internal to the project and not shown here.
            </p>
          </Chapter>
        </div>
      </div>

      {/* ---------- 04: Ranking and allocation logic ---------- */}
      <div id="s4" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "var(--cs-accent-deep)" }}>
              04 · Reconstructed workflow
            </p>
            <h2 className="font-serif text-[32px] mb-3" style={{ color: "var(--ink)" }}>
              How a request becomes a ranked, approved room
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mb-3.5" style={{ color: "#33302a" }}>
              Hard constraints (time conflicts, capacity, required features) are checked first and
              are non-negotiable. What&apos;s left is scored on fit and preference, with priority
              rating moderated so one loud request can&apos;t always win. A user can accept a
              suggestion or flag it with a reason, which re-runs scoring instead of dead-ending the
              request, and every booking still passes through executive or admin validation before
              it&apos;s final.
            </p>
            <p className="text-sm font-extrabold mb-6" style={{ color: "var(--cs-accent-deep)" }}>
              Click any shape for what it involved. Shape = meaning, not just color →
            </p>
          </Reveal>
          <RoomEaseAllocationDiagram />
          <p className="mt-5 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <span
              className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
              style={{ color: "var(--ink)", borderColor: "var(--ink)", background: GOLD_GRADIENT }}
            >
              Reconstructed diagram
            </span>
            Rebuilt from the team&apos;s six-step matching algorithm (EOT report, Table 4), the
            FDR&apos;s two-stage recommendation model, the manual-override wireframe, and the
            governed multi-role workflow. Every node is clickable, and details open in a side
            panel.
          </p>

          <div className="mt-10">
            <VideoBlock
              title="The booking form, live"
              context="The diagram above is reconstructed from the report; this is the actual step 1 it describes, a member entering event requirements that feed straight into the hard-constraint filter before anything gets ranked."
              src={`${VID}/booking-form.mp4`}
              poster={`${VID}/poster/booking-form.jpg`}
              caption="Group size, event type, AV/accessibility needs, priority level, and preferred building are structured fields, not free text, which is what lets the matching engine treat capacity and features as hard constraints instead of guessing at intent."
              accent={GOLD_GRADIENT}
            />
          </div>
        </div>
      </div>

      {/* ---------- 05: User and admin experience ---------- */}
      <div id="s5" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="05" title="Designing the user and admin experience">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              The frontend had to carry two different jobs: help a member get to a good room fast,
              and give admins a way to intervene without becoming a bottleneck for every request.
              Role-based access split those concerns into three levels, each with a different
              amount of authority over the same booking lifecycle.
            </p>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Role-based access
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {ROLE_CARDS.map((r, i) => (
                <Reveal key={r.role} delay={i * 90}>
                  <div className="cs-box white px-5 py-6 h-full">
                    <div
                      className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-sm mb-4"
                      style={{ borderColor: "var(--ink)", background: r.accent, color: "#fdfaf5" }}
                    >
                      {r.role[0]}
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2.5" style={{ color: "var(--ink)" }}>
                      {r.role}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Chapter>
        </div>

        {/* Full-width band: escapes the Chapter's title column so the three videos get real width */}
        <div className="mx-auto max-w-5xl px-6 pb-24">
          <p className="text-[15px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--ink)" }}>
            How each role actually experiences a request
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            <VideoBlock
              title="Member flow"
              context="A member checks live room availability, sets a priority level, and sends the request to their club executive instead of the flow dead-ending on a single decision-maker."
              src={`${VID}/member-flow.mp4`}
              poster={`${VID}/poster/member-flow.jpg`}
              caption="Availability updates against real bookings, so a member is choosing from rooms that are actually free, not a static list that might already be taken."
              accent="#f0b429"
            />
            <VideoBlock
              title="Executive flow"
              context="An executive reviewing club member requests can approve and book directly, or send a request onward, without every booking needing to reach an admin first."
              src={`${VID}/exec-flow.mp4`}
              poster={`${VID}/poster/exec-flow.jpg`}
              caption="Approve & book is a one-click action here. That's the speed requirement (R2/usability) staying intact even with a second role in the approval path."
              accent="#c9941a"
            />
            <VideoBlock
              title="Admin flow"
              context="Switching into the Admin Portal surfaces exactly the requests that couldn't resolve on their own: pending approvals and flagged scheduling conflicts."
              src={`${VID}/admin-flow.mp4`}
              poster={`${VID}/poster/admin-flow.jpg`}
              caption="Conflicts are labeled, not hidden inside a normal-looking request. That's where the manual override with a stated reason (below) actually gets used."
              accent="#8a5a0a"
            />
          </div>

          <p className="text-[15px] font-extrabold uppercase tracking-wide mt-11 mb-4" style={{ color: "var(--ink)" }}>
            Design decisions that came out of testing
          </p>
          <div className="grid sm:grid-cols-3 gap-3.5 items-stretch">
            {[
              {
                title: "Justification tags on every suggestion, not just a ranked list",
                body: "A bare ranked list would have looked like a black box. Showing why a room was suggested (capacity fit, feature match) is what let club executives trust the matching in testing.",
              },
              {
                title: "Override requires a reason before it re-scores",
                body: "An unexplained override would have made the ranking meaningless the first time someone bypassed it. Requiring a stated reason kept manual control connected to the transparency requirement instead of undermining it.",
              },
              {
                title: "Executives can approve directly; anything with an issue escalates",
                body: "Routing every request through a central admin would have recreated the same bottleneck we were trying to remove. Letting executives approve within their own club's requests, while conflicts and exceptions still escalate, kept both speed and oversight.",
              },
            ].map((d) => (
              <div key={d.title} className="cs-box light px-5 py-4 h-full">
                <p className="font-bold text-[15px]" style={{ color: "var(--ink)" }}>
                  {d.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 06: Technical feasibility ---------- */}
      <div id="s6" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              06
            </p>
            <h2 className="font-serif text-[40px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Technical feasibility
            </h2>
          </Reveal>
          <p className="text-lg leading-relaxed max-w-2xl my-8" style={{ color: "#33302a" }}>
            RoomEase is a feasibility demonstration, not a fully deployed UW system. After Peer
            Critique 1 showed that a frontend-only version couldn&apos;t actually prevent double
            bookings, we added Supabase persistence and role-based auth so the prototype could be
            tested as a real, stateful system rather than a click-through mockup.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {FEASIBILITY_COLUMNS.map((col, i) => (
              <Reveal key={col.label} delay={i * 90}>
                <div className="cs-box white h-full px-5 py-6">
                  <p
                    className="text-[12.5px] font-extrabold uppercase tracking-wide mb-4 rounded-full px-3 py-1.5 border-2 inline-block"
                    style={{ color: "var(--ink)", borderColor: "var(--ink)", background: col.accent }}
                  >
                    {col.label}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed max-w-2xl mb-10" style={{ color: "var(--ink-soft)" }}>
            Frontend: React with Tailwind CSS. Backend: Supabase (PostgreSQL) with Microsoft Entra
            authentication integrated via NextAuth and Node.js for data handling and access
            control.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <VideoBlock
              title="Full prototype walkthrough"
              context="An end-to-end pass through the built prototype: landing page, structured booking form, room comparison, and the admin and analytics views, run against the real Supabase-backed system rather than a click-through mockup."
              src={`${VID}/product-demo.mp4`}
              poster={`${VID}/poster/product-demo.jpg`}
              caption="Sign-in, role switching, and every screen here is live application state. That's the difference Peer Critique 1 forced: a frontend-only prototype could look like this and still not stop a double booking."
              accent="#c9941a"
            />
            <VideoBlock
              title="Admin analytics and conflict queue"
              context="The Admin Portal's analytics view, which is what lets an admin work from operational patterns instead of reacting to one booking request at a time."
              src={`${VID}/admin-analytics.mp4`}
              poster={`${VID}/poster/admin-analytics.jpg`}
              caption="Pending requests, same-day approvals and denials, and flagged conflicts sit together on one screen, which is what makes an override accountable to a record instead of a private decision."
              accent="#8a5a0a"
            />
          </div>
        </div>
      </div>

      {/* ---------- 07: Validation and outcomes ---------- */}
      <div id="s7" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-center gap-4.5 mb-8">
              <div
                className="w-[58px] h-[58px] shrink-0 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl"
                style={{ background: GOLD_GRADIENT, color: "var(--ink)", border: "3px solid var(--ink)", boxShadow: "5px 5px 0 rgba(0,0,0,0.4)" }}
              >
                07
              </div>
              <h2 className="font-serif text-4xl text-white">Validation and outcomes</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#e3d9c2" }}>
              After meeting with club executives and students to establish a baseline, we ran a
              controlled comparison: the same end-to-end booking scenario, once on the current UW
              process and once on the RoomEase prototype, with students and club executives.
            </p>
          </Reveal>

          <div className="mb-10 max-w-2xl">
            <VideoBlock
              title="One of the end-to-end scenarios used in testing"
              context="This is one of the structured booking scenarios run during verification, the same kind of task compared against the current UW process in the controlled user-testing sessions behind the numbers below."
              src={`${VID}/validation-walkthrough.mp4`}
              poster={`${VID}/poster/validation-walkthrough.jpg`}
              caption="Priority level and AV/accessibility needs are collected as structured fields here, the same inputs that feed the hard-constraint filter and ranking shown in section 04."
              accent="#eab848"
            />
          </div>

          <div className="mb-10">
            <StatGrid
              valueColor="#eab848"
              stats={[
                { value: "50% → 88%", label: "usability score, controlled user testing" },
                { value: "33% → 90%", label: "satisfaction score, controlled user testing" },
                { value: "~8.5 → ~4.5 min", label: "average time to book" },
                { value: "~24 → ~10", label: "average clicks to book" },
              ]}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <div className="cs-box light px-6 py-6">
              <p className="text-sm leading-relaxed italic" style={{ color: "#33302a" }}>
                &ldquo;Being able to compare rooms so easily saved us a ton of time.&rdquo;
              </p>
              <p className="mt-3 text-[13px] font-extrabold uppercase tracking-wide" style={{ color: "var(--cs-accent-deep)" }}>
                MSA Exec, controlled user testing
              </p>
            </div>
            <div className="cs-box light px-6 py-6">
              <p className="text-sm leading-relaxed italic" style={{ color: "#33302a" }}>
                &ldquo;The matching algorithm was useful to see what our best options were.&rdquo;
              </p>
              <p className="mt-3 text-[13px] font-extrabold uppercase tracking-wide" style={{ color: "var(--cs-accent-deep)" }}>
                WLPA Exec, controlled user testing
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {cs.outcome.map((row, i) => (
              <Reveal key={row} delay={i * 70}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: GOLD_GRADIENT, borderColor: "var(--ink)", color: "#fdfaf5" }}
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

      {/* ---------- 08: Reflection ---------- */}
      <div id="s8" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              08
            </p>
            <h2 className="font-serif text-[40px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              {
                accent: "#f0b429",
                title: "Fairness has to be an explicit requirement, not an assumed side effect",
                body: "A working matching algorithm isn't automatically a fair one. Requirement R5, transparent and appealable allocation, only exists because advisor review surfaced fairness concerns mid-term. It shaped the whole recommendation-and-override design after that.",
                icon: <><path d="M12 3l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L4 10l6-1z" /></>,
              },
              {
                accent: "#8a5a0a",
                title: "Ambiguous stakeholder needs don't resolve themselves into logic",
                body: "Different departments described the same constraint differently, and it took direct outreach to Engineering and Arts staff, plus club executives, before we had a consistent enough picture to encode as hard constraints versus preferences.",
                icon: <><circle cx="7" cy="7" r="3" /><circle cx="17" cy="7" r="3" /><circle cx="12" cy="18" r="3" /><path d="M9.5 8.8L11 15.5M14.5 8.8L13 15.5M10 7h4" /></>,
              },
              {
                accent: "#c9941a",
                title: "Admin control and transparency aren't actually in tension",
                body: "I expected the manual override to feel like a loophole in the fairness story. Requiring a stated reason instead of a silent bypass made it the opposite: control that still left a record, which is what made the allocation model appealable rather than just automated.",
                icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
              },
              {
                accent: "#2b2419",
                title: "A production version needs the institution, not just the prototype",
                body: "Everything that held the prototype back from being a real UW system, live WatIAM authentication, campus-wide room data, calendar sync, depends on institutional access we didn't have as students. The next step is a pilot, not a rebuild.",
                icon: <path d="M4 12a8 8 0 1 1 2.5 5.8M4 12v5.5M4 12H9.5" />,
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
            <div className="cs-box dark px-6 py-6 mt-8 max-w-2xl">
              <p className="text-[12px] font-extrabold uppercase tracking-wide mb-2.5" style={{ color: "#eab848" }}>
                What I&apos;d improve next
              </p>
              <p className="text-sm leading-relaxed">{cs.whatIdImprove}</p>
            </div>
          )}

          {cs.note && (
            <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
              {cs.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

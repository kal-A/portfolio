import Link from "next/link";
import Image from "next/image";
import { getCaseStudy } from "@/lib/content/case-studies";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import CategoryGrid from "@/components/case-study/blocks/CategoryGrid";
import ProcessFlow, { ProcessStep } from "@/components/case-study/blocks/ProcessFlow";
import { greenhouseChannels } from "@/lib/content/greenhouse-channels";
import Reveal from "@/components/Reveal";

const GREEN_GRADIENT = "linear-gradient(135deg, #4bc192, #1c5c3f)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(200,69,44,0.12) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(44,110,94,0.14) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(47,158,110,0.16) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f3f6ee";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(47,158,110,0.12) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f3f6ee";
const TONE_GREEN =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.32) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(28,92,63,0.18) 0%, transparent 46%), linear-gradient(180deg, #bfe8d3 0%, #8fd4ae 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(75,193,146,0.14) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(143,212,174,0.07) 0%, transparent 46%), linear-gradient(180deg, #1c3327 0%, #16261e 55%, #0f1a15 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s-glance",
    label: "At a glance",
    icon: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>,
  },
  {
    href: "#s-gallery",
    label: "Visual design",
    icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 15l5-5 4 4 3-3 6 6" /><circle cx="8" cy="9" r="1.4" /></>,
  },
  {
    href: "#s-systems",
    label: "Behind the visuals",
    icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /><path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" /></>,
  },
  {
    href: "#s-process",
    label: "Process",
    icon: <path d="M4 18l5-6 4 3 7-9" />,
  },
  {
    href: "#s-outcomes",
    label: "Outcomes",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Requirements",
    synopsis:
      "A campaign or retail ask came in from marketing or a partner, and I mapped what the creative actually needed to satisfy before opening a file.",
  },
  {
    title: "Channel Adaptation",
    synopsis:
      "I adapted the same product story to Amazon's A+ format, a Klaviyo email, or a printed sell sheet in Illustrator, Photoshop, and Canva - building each as its own layout, not a resize.",
  },
  {
    title: "Review",
    synopsis:
      "Drafts went back for a brand and copy check before anything moved toward scheduling, print, or upload.",
  },
  {
    title: "Product Tracking",
    synopsis:
      "Once approved, I logged the asset against its product identifiers in the OneDrive UID tracker so it stayed tied to the right SKU.",
  },
  {
    title: "Inventory Coordination",
    synopsis:
      "I checked the linked SKU's inventory status so a campaign never launched pointing at stock that wasn't actually available.",
  },
  {
    title: "Final Delivery",
    synopsis:
      "The asset shipped to its channel - uploaded to Amazon, scheduled in Klaviyo, or sent to print - and the tracker was marked complete.",
  },
];

export default function GreenhouseCaseStudy() {
  const cs = getCaseStudy("greenhouse")!;

  return (
    <div
      style={
        {
          "--cs-wash-from": "#e3f7ec",
          "--cs-wash-to": "#4bc192",
          "--cs-light-from": "#ecfaf1",
          "--cs-light-to": "#bfe8d3",
          "--cs-accent-deep": "#1c5c3f",
          "--cs-accent-wash-rgb": "47, 158, 110",
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

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "#1c5c3f" }}>
                Greenhouse Juices · Product Designer Intern
              </p>
              <h1
                className="font-serif text-4xl sm:text-[50px] leading-[1.08] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Designing the customer-facing experience and the systems behind it
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Mississauga, ON · Jan 2025 – Apr 2025
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                An Amazon listing, a Klaviyo email, and a printed retail sell sheet all earn attention
                differently - but they still had to look like the same brand. I designed and adapted
                creative across all three, plus internal concepting work, while helping keep the UID
                and inventory-tracking systems behind them organized enough that the team always knew
                what was ready and what wasn&apos;t.
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
            <nav className="cs-box white quiet-hover px-6 py-7" style={{ background: "#fffdf8" }}>
              <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "#1c5c3f" }}>
                On this page
              </p>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                Five sections, from the role at a glance through to outcomes.
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
                    style={{ background: "linear-gradient(135deg, #d8f0e4, #a9dcc0)", borderColor: "var(--ink)" }}
                  >
                    <span className="w-3.5 h-3.5" style={{ color: "#1c5c3f" }}>
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
                  src="/case-studies/greenhouse/greenhouse-hero-collage.jpg"
                  alt="Greenhouse Juices retail and campaign assets"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>

          {/* At a glance */}
          <div id="s-glance" className="pt-16">
            <SnapshotGrid>
              <SnapshotBox
                label="Role"
                accentGradient={GREEN_GRADIENT}
                icon={<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>}
              >
                Design and marketing support for a lean internal team.
              </SnapshotBox>
              <SnapshotBox
                label="Scope"
                accentGradient={GREEN_GRADIENT}
                icon={<><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 4v5" /></>}
              >
                Retail assets, e-commerce, product tracking, inventory coordination.
              </SnapshotBox>
              <SnapshotBox
                label="Channels"
                accentGradient={GREEN_GRADIENT}
                icon={<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>}
              >
                Amazon, retail &amp; marketing collateral, email, and internal brand design.
              </SnapshotBox>
              <div className="cs-box white h-full px-6 py-6">
                <div
                  className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                  style={{ background: GREEN_GRADIENT, borderColor: "var(--ink)" }}
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
                    ["Adobe Creative Suite", "Illustrator, Photoshop & InDesign for retail, e-commerce & print"],
                    ["Canva", "quick-turn social & email creative"],
                    ["Microsoft Planner", "sprint planning & task tracking"],
                    ["OneDrive", "UID tracking, inventory routing, documentation"],
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

      {/* ---------- 01: Visual design (gallery) ---------- */}
      <div id="s-gallery" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              01
            </p>
            <h2 className="font-serif text-[32px] mt-2" style={{ color: "var(--ink)" }}>
              One brand, four completely different formats
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "#33302a" }}>
              An Amazon listing, an email send, a printed sell sheet, and an internal concept deck
              each earn attention differently. Every asset below adapted to that format instead of
              resizing the same file - while staying recognizably Greenhouse.
            </p>
          </Reveal>
          <CategoryGrid channels={greenhouseChannels} linkBase="/work/greenhouse" />
        </div>
      </div>

      {/* ---------- 02: Behind the visuals ---------- */}
      <div id="s-systems" className="cs-seam" style={{ background: TONE_GREEN }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="02" title="The system behind the storefront">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Alongside the customer-facing work, I helped maintain the systems behind it. Structured
              trackers in OneDrive and sprint boards in Microsoft Planner connected product identifiers,
              inventory information, deliverables, and ownership, so it was clear what was ready, what was
              missing, and what needed to happen next.
            </p>

            <div className="grid md:grid-cols-[1fr_1.2fr_1fr] gap-4.5 items-center mt-8">
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Product UID
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Retail & e-commerce assets
                </div>
              </div>
              <div className="cs-box dark text-center px-5 py-7 font-serif font-bold text-lg">
                UID tracking
                <br />
                &amp; inventory routing
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Inventory status
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Handoff ownership
                </div>
              </div>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- 03: Process ---------- */}
      <div id="s-process" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              03
            </p>
            <h2 className="font-serif text-[32px] mt-2" style={{ color: "var(--ink)" }}>
              From requirement to final delivery
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-3xl mb-10" style={{ color: "#33302a" }}>
              Select a stage to see what happened there and what I contributed.
            </p>
          </Reveal>
          <Reveal>
            <ProcessFlow steps={PROCESS_STEPS} accent="#1c5c3f" />
          </Reveal>
        </div>
      </div>

      {/* ---------- 04: Outcomes ---------- */}
      <div id="s-outcomes" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5 mb-8">
            <p className="font-serif text-6xl md:text-[80px] leading-[0.78] opacity-[0.2]" style={{ color: "#fdfaf5" }}>
              04
            </p>
            <h2 className="font-serif text-4xl text-white mt-2">Outcomes</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg leading-relaxed max-w-3xl mb-9" style={{ color: "#d3e6da" }}>
              The work connected consistent brand presentation with the operational visibility needed
              to deliver it accurately across Amazon, email, retail, and internal review.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { value: "20%", label: "increase in campaign engagement" },
              { value: "12%", label: "lift in conversion" },
              { value: "25%", label: "gain in delivery consistency" },
              { value: "30%", label: "improvement in shipment accuracy" },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 60}>
                <div className="cs-box light h-full text-center px-4 py-5 flex flex-col items-center justify-center">
                  <div className="font-serif text-3xl" style={{ color: "var(--ink)" }}>
                    {m.value}
                  </div>
                  <div className="text-xs font-semibold mt-1.5 leading-snug" style={{ color: "#4c473e" }}>
                    {m.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[
              "Creative for 12+ campaigns across Amazon, email, and retail collateral stayed on-brand without slowing down for each channel's different format - each one adapted on its own terms instead of being resized from a single master file after the fact.",
              "A shared sprint cadence replaced ad hoc requests, letting the team plan a higher volume of campaign work in advance instead of reacting to it channel by channel.",
              "Centralizing UID and inventory tracking in OneDrive cut the time spent chasing product status by hand, surfacing gaps before they became a shipping problem instead of after.",
              "Clearer ownership at each handoff reduced the rework that comes from two people touching the same asset or SKU without knowing it.",
            ].map((row, i) => (
              <Reveal key={row} delay={i * 70}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: GREEN_GRADIENT, borderColor: "var(--ink)", color: "#fff9ee" }}
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
    </div>
  );
}

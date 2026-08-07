import Link from "next/link";
import ProjectIcon from "@/components/ProjectIcon";
import ForceNWorkflowDiagram from "@/components/case-study/ForceNWorkflowDiagram";
import Chapter from "@/components/case-study/blocks/Chapter";
import Icon from "@/components/case-study/blocks/Icon";
import SnapshotGrid, { SnapshotBox } from "@/components/case-study/blocks/SnapshotGrid";
import StatGrid from "@/components/case-study/blocks/StatGrid";
import Reveal from "@/components/Reveal";

const AMBER_GRADIENT = "linear-gradient(135deg, #eaa64a, #a15a10)";

const HERO_BG =
  "radial-gradient(circle at 12% 8%, rgba(200,69,44,0.14) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(44,110,94,0.12) 0%, transparent 52%), radial-gradient(circle at 14% 10%, rgba(217,135,31,0.16) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f6efe1";
const TONE_CREAM =
  "radial-gradient(circle at 14% 10%, rgba(217,135,31,0.14) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(43,46,51,0.06) 0%, transparent 46%), #f6efe1";
const TONE_AMBER =
  "radial-gradient(circle at 12% 15%, rgba(255,255,255,0.32) 0%, transparent 42%), radial-gradient(circle at 90% 90%, rgba(161,90,16,0.16) 0%, transparent 46%), linear-gradient(180deg, #f3d19c 0%, #f0c98a 100%)";
const TONE_DARK =
  "radial-gradient(circle at 16% 12%, rgba(217,135,31,0.14) 0%, transparent 44%), radial-gradient(circle at 88% 88%, rgba(240,201,138,0.07) 0%, transparent 46%), linear-gradient(180deg, #2b2e33 0%, #23262b 55%, #1c1f23 100%)";

const NAV_LINKS: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "#s2",
    label: "Production map",
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
    href: "#s1",
    label: "Strategy",
    icon: (
      <>
        <path d="M4 18l5-6 4 3 7-9" />
        <path d="M14 6h6v6" />
      </>
    ),
  },
  {
    href: "#s3",
    label: "Decisions",
    icon: (
      <>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </>
    ),
  },
  {
    href: "#s4",
    label: "Documentation",
    icon: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    href: "#s5",
    label: "Other work",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
  {
    href: "#s6",
    label: "Results",
    icon: <path d="M4 18l5-6 4 3 7-9" />,
  },
  {
    href: "#s7",
    label: "Reflection",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </>
    ),
  },
];

export default function ForceNCaseStudy() {
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
                style={{
                  background: "linear-gradient(135deg, #c9ccd0, #2b2e33)",
                  boxShadow: "0 10px 26px -8px rgba(43,46,51,0.45)",
                }}
              >
                <ProjectIcon slug="forcen" className="w-[38px] h-[38px]" style={{ color: "#fdfaf5" }} />
              </div>

              <p className="text-sm font-extrabold uppercase tracking-wide mt-6" style={{ color: "var(--accent-deep, #a15a10)" }}>
                ForceN · Product Engineer Intern
              </p>
              <h1
                className="font-serif text-4xl sm:text-[52px] leading-[1.05] mt-3 max-w-2xl text-balance"
                style={{ color: "var(--ink)" }}
              >
                Building an inventory-backed production system for ForceN&apos;s Dev Systems
              </h1>
              <p className="text-base font-bold mt-5" style={{ color: "var(--ink-soft)" }}>
                Toronto, ON · Sep 2025 – Dec 2025
              </p>
              <p className="text-lg leading-relaxed mt-4 max-w-2xl" style={{ color: "#33302a" }}>
                ForceN wanted its standard Dev Systems to become the default product offering:
                produced ahead of demand, held in finished inventory, and ready to ship the moment
                an order arrived. I developed the end-to-end operating roadmap connecting parts
                planning, procurement, assembly, calibration, documentation, finished-product
                inventory, and fulfilment.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-7">
                {["Production Roadmap", "Inventory Logic", "Documentation System", "Internal Materials Omitted"].map(
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
              <p className="text-[13px] font-extrabold uppercase tracking-wide mb-4" style={{ color: "var(--accent-deep, #a15a10)" }}>
                On this page
              </p>
              <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--ink-soft)" }}>
                Seven sections, from the production map through to what I&apos;d change next.
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
                    style={{ background: "linear-gradient(135deg, #f0e6d5, #e0cfa8)", borderColor: "var(--ink)" }}
                  >
                    <span className="w-3.5 h-3.5" style={{ color: "#a15a10" }}>
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
              accentGradient={AMBER_GRADIENT}
              icon={<><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.2v.1" /></>}
            >
              A complete operating process for producing standardized Dev System configurations{" "}
              <em className="not-italic font-extrabold" style={{ color: "#a15a10" }}>
                ahead of demand
              </em>
              , while keeping the parts and finished-product inventory needed to fulfil incoming orders.
            </SnapshotBox>
            <SnapshotBox
              label="Contribution"
              accentGradient={AMBER_GRADIENT}
              icon={<path d="M14.7 6.3a4 4 0 0 0-5.6 5.6L4 17l3 3 5.1-5.1a4 4 0 0 0 5.6-5.6l-2.6 2.6-2-2z" />}
            >
              The roadmap from configuration and component planning through procurement, assembly,
              calibration, quality validation, finished inventory, and shipment.
            </SnapshotBox>
            <SnapshotBox
              label="Outcome"
              accentGradient={AMBER_GRADIENT}
              icon={<><path d="M4 18l5-6 4 3 7-9" /><path d="M14 6h6v6" /></>}
            >
              The operating foundation for an{" "}
              <em className="not-italic font-extrabold" style={{ color: "#a15a10" }}>
                inventory-backed
              </em>{" "}
              Dev System product line, reducing dependence on order-triggered production.
            </SnapshotBox>
            <div className="cs-box white px-6 py-6">
              <div
                className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center mb-4 border-[2.5px]"
                style={{ background: "linear-gradient(135deg, #eaa64a, #a15a10)", borderColor: "var(--ink)" }}
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
                  ["Arena", "part & config records"],
                  ["Confluence", "process docs"],
                  ["Onshape", "assembly context"],
                  ["Calibration scripts", null],
                ].map(([tool, use]) => (
                  <li key={tool} className="text-[14.5px]" style={{ color: "#4c473e" }}>
                    <b className="font-extrabold" style={{ color: "var(--ink)" }}>
                      {tool}
                    </b>
                    {use && (
                      <span className="block text-[12.5px] font-medium mt-0.5" style={{ color: "var(--ink-soft)" }}>
                        {use}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </SnapshotGrid>

          {/* Diagram */}
          <div id="s2" className="mt-16">
            <Reveal>
              <p className="text-xs font-extrabold uppercase tracking-wide mb-1.5" style={{ color: "#a15a10" }}>
                Reconstructed workflow, two connected systems
              </p>
              <h2 className="font-serif text-[28px] mb-2.5" style={{ color: "var(--ink)" }}>
                How a Dev System moves from configuration to a shipped order
              </h2>
              <p className="text-lg leading-relaxed max-w-3xl mb-3.5" style={{ color: "#33302a" }}>
                Stock production (top) builds standard configurations ahead of demand. Customer
                fulfilment (bottom) draws from finished inventory instead of triggering a new build.
              </p>
              <p className="text-sm font-extrabold mb-6" style={{ color: "#a15a10" }}>
                Click any shape for what it involved. Shape = meaning, not just color →
              </p>
            </Reveal>
            <ForceNWorkflowDiagram />
            <p className="mt-5 text-sm flex items-center gap-3 flex-wrap leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              <span
                className="text-[11px] font-extrabold uppercase tracking-wide rounded-full px-3 py-1 border-2 shrink-0"
                style={{ color: "var(--ink)", borderColor: "var(--ink)", background: "linear-gradient(135deg, #eaa64a, #a15a10)" }}
              >
                Reconstructed diagram
              </span>
              Shape carries the meaning (rectangle = process, diamond = decision, cylinder = data
              store, document = record, double-border = automated). Every node is clickable, and
              details open in a side panel.
            </p>
          </div>
        </div>
      </div>

      {/* ---------- 01: Strategy ---------- */}
      <div id="s1" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="01" title="From build-to-order to inventory readiness">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              ForceN wanted Dev Systems to become the standardized, off-the-shelf product line:
              configurations built{" "}
              <em className="not-italic font-extrabold" style={{ color: "#a15a10" }}>
                before
              </em>{" "}
              an order arrived, held in finished inventory, and ready to ship the moment one did.
              The roadmap wasn&apos;t only about moving a unit between teams. It had to make a
              standard configuration producible, testable, stockable, and ready to fulfil an order
              without restarting the process from zero.
            </p>

            <div className="flex items-center gap-5 flex-wrap my-9">
              <div className="cs-box white flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#8a5a30" }}>
                  Before
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Order arrives → build starts from zero
                </p>
              </div>
              <span className="text-3xl font-black shrink-0 rotate-90 sm:rotate-0" style={{ color: "var(--ink)" }}>
                →
              </span>
              <div className="cs-box light flex-1 px-6 py-4">
                <p className="text-[11.5px] font-extrabold uppercase tracking-wide mb-2" style={{ color: "#a15a10" }}>
                  Now
                </p>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Order arrives → ship from finished shelf
                </p>
              </div>
            </div>

            <p className="text-[15px] font-extrabold uppercase tracking-wide mt-9 mb-4" style={{ color: "var(--ink)" }}>
              Constraints
            </p>
            <div className="cs-box white px-6 py-6">
              <ul className="flex flex-col gap-3">
                {[
                  "Internal trackers, calibration materials, scripts, and company-specific records are confidential. This write-up reconstructs the same process logic in a public-safe form.",
                  "The production system had to connect demand, component availability, assembly, quality, and replenishment, not just one stage in isolation.",
                  "No dedicated tracking system in place. Any fix had to work within tools the team already used.",
                ].map((c) => (
                  <li key={c} className="cs-box light flex gap-3 items-start text-[15px] leading-relaxed px-4 py-3" style={{ color: "#4c473e" }}>
                    <span
                      className="shrink-0 w-[22px] h-[22px] rounded-md border-2 flex items-center justify-center text-xs font-black mt-0.5"
                      style={{ background: "linear-gradient(135deg, #eaa64a, #a15a10)", borderColor: "var(--ink)", color: "var(--ink)" }}
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

      {/* ---------- 02: Decisions ---------- */}
      <div id="s3" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-start gap-5">
              <p className="font-serif text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
                02
              </p>
              <h2 className="font-serif text-[40px] leading-tight text-balance mt-2" style={{ color: "var(--ink)" }}>
                Designing the production and replenishment logic
              </h2>
            </div>
            <p
              className="font-serif italic text-2xl leading-snug max-w-xl my-9"
              style={{ color: "var(--ink)" }}
            >
              Three decisions turned the roadmap from a diagram into{" "}
              <b className="not-italic font-bold" style={{ color: "#a15a10" }}>
                an operating model
              </b>{" "}
              that could absorb a failed calibration or a low part count without stalling the whole
              line.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                letter: "A",
                title: "Standard configurations as repeatable products",
                context:
                  "ForceN wanted Dev Systems to support a greater share of orders instead of treating most incoming work as a custom configuration.",
                decision:
                  "Define repeatable configuration paths with known parts, assembly requirements, calibration procedures, and finished-inventory records.",
                result: "Product configuration connected to a repeatable production and inventory process.",
              },
              {
                letter: "B",
                title: "Replenishment triggered by actual usage",
                context:
                  "A future build could be delayed even with a clear roadmap if a required component wasn't in stock.",
                decision:
                  "Connect part deductions to minimum-stock checks so status is evaluated after component use, before the next build is blocked.",
                result: "Component availability became part of the production logic, not a separate reactive activity.",
              },
              {
                letter: "C",
                title: "Calibration as a gate with a rework loop",
                context: "A failed calibration couldn't be treated as an undefined exception.",
                decision:
                  "An explicit route from failed calibration back to assembly for correction and re-testing; only passing units proceed to lamination.",
                result: "Quality failures became part of the planned model, not ad hoc interruptions.",
              },
            ].map((d, i) => (
              <Reveal key={d.letter} delay={i * 100}>
                <div className="cs-box light px-6 py-7 h-full">
                  <div
                    className="w-9 h-9 rounded-[10px] border-[2.5px] flex items-center justify-center font-serif font-bold text-base mb-4"
                    style={{ borderColor: "var(--ink)", background: "linear-gradient(135deg, #eaa64a, #a15a10)", color: "var(--ink)" }}
                  >
                    {d.letter}
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3" style={{ color: "var(--ink)" }}>
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                    {d.context}
                  </p>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: "#4c473e" }}>
                    <span className="font-extrabold" style={{ color: "#a15a10" }}>
                      Decision:{" "}
                    </span>
                    {d.decision}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4c473e" }}>
                    <span className="font-extrabold" style={{ color: "#a15a10" }}>
                      Result:{" "}
                    </span>
                    {d.result}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- 03: Documentation ---------- */}
      <div id="s4" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Chapter num="03" title="A roadmap only works when someone else can run it">
            <p className="text-lg leading-[1.8] max-w-2xl" style={{ color: "var(--ink)" }}>
              Each step needed more than a status label. It needed the correct part references,
              work instructions, calibration procedure, quality record, inventory transaction, and
              ownership information, so the process could be repeated across teams and continued by
              future employees.
            </p>

            <div className="grid md:grid-cols-[1fr_1.2fr_1fr] gap-4.5 items-center mt-8">
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Arena part references
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Assembly work instructions
                </div>
              </div>
              <div className="cs-box dark text-center px-5 py-7 font-serif font-bold text-lg">
                Dev System
                <br />
                configuration
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Calibration scripts
                </div>
                <div className="cs-box white text-center px-4 py-4 text-sm font-bold" style={{ color: "var(--ink)" }}>
                  Inventory + QA + handoff records
                </div>
              </div>
            </div>
          </Chapter>
        </div>
      </div>

      {/* ---------- Additional responsibilities ---------- */}
      <div id="s5" className="cs-seam" style={{ background: TONE_CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-center gap-5">
            <div
              className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center font-serif font-bold text-3xl"
              style={{ background: "#2b2e33", color: "#d9871f", border: "3px solid #1c1f23", boxShadow: "5px 5px 0 #1c1f23" }}
            >
              +
            </div>
            <div>
              <h2 className="font-serif text-[32px]" style={{ color: "var(--ink)" }}>
                Additional product engineering responsibilities
              </h2>
              <p className="text-base mt-2" style={{ color: "var(--ink)" }}>
                These supported the wider Dev System work, not all separate case studies on their own.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-11">
            {[
              {
                index: "01",
                accent: "#d9871f",
                title: "Sensor calibration",
                body: "Calibrated sensors across multiple Dev System configurations, applying the right setup and validation process for each unit.",
                tool: "Calibration equipment",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                  </>
                ),
              },
              {
                index: "02",
                accent: "#2b2e33",
                title: "Calibration scripts",
                body: "Worked with scripts validating sensor performance: running, parameterizing, and checking output against expected results.",
                tool: "Python",
                icon: <path d="M8 3L4 7l4 4M16 21l4-4-4-4M4 7h9a4 4 0 0 1 4 4v1M20 17H11a4 4 0 0 1-4-4v-1" />,
              },
              {
                index: "03",
                accent: "#d9871f",
                title: "Assembly work instructions",
                body: "Created and maintained documentation connecting parts, Arena references, assembly sequence, and validation steps.",
                tool: "Confluence",
                icon: <path d="M4 4h16v16H4z M8 9h8M8 13h8M8 17h5" />,
              },
              {
                index: "04",
                accent: "#2b2e33",
                title: "Web design input",
                body: "Contributed product and design input to ForceN's web experience, helping communicate the product more clearly.",
                tool: "Product messaging",
                icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 4v5" /></>,
              },
            ].map((r, i) => (
              <Reveal key={r.index} delay={i * 80}>
                <div className="cs-box white overflow-hidden h-full">
                  <div className="h-2" style={{ background: r.accent }} />
                  <div className="relative px-5 py-6">
                    <span
                      className="absolute top-4 right-4 font-serif font-bold text-[34px]"
                      style={{ color: "#f0e6d5" }}
                    >
                      {r.index}
                    </span>
                    <div
                      className="w-10 h-10 rounded-[11px] flex items-center justify-center mb-4 border-2 relative z-10"
                      style={{ background: r.accent, borderColor: "var(--ink)" }}
                    >
                      <span className="w-5 h-5 text-[#fff9ee]">
                        <Icon>{r.icon}</Icon>
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-lg mb-2 relative z-10" style={{ color: "var(--ink)" }}>
                      {r.title}
                    </h4>
                    <p className="text-[13.5px] leading-relaxed relative z-10" style={{ color: "#4c473e" }}>
                      {r.body}
                    </p>
                    <p className="text-[11.5px] font-extrabold uppercase tracking-wide mt-3.5 relative z-10" style={{ color: "#a15a10" }}>
                      {r.tool}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Results ---------- */}
      <div id="s6" className="cs-seam" style={{ background: TONE_DARK }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal>
            <div className="flex items-center gap-4.5 mb-8">
              <div
                className="w-[58px] h-[58px] shrink-0 rounded-2xl flex items-center justify-center font-serif font-bold text-2xl"
                style={{ background: "linear-gradient(135deg, #eaa64a, #a15a10)", color: "var(--ink)", border: "3px solid var(--ink)", boxShadow: "5px 5px 0 rgba(0,0,0,0.4)" }}
              >
                04
              </div>
              <h2 className="font-serif text-4xl text-white">Results</h2>
            </div>
            <p className="text-lg leading-relaxed max-w-2xl mb-9" style={{ color: "#d9d5cb" }}>
              The roadmap connected product configuration, component availability, production,
              quality, and finished inventory into one repeatable operating model.
            </p>
          </Reveal>

          <div className="mb-10">
            <StatGrid
              valueColor="#a15a10"
              stats={[
                { value: "35%", label: "faster turnaround on the Dev System transfer workflow" },
                { value: "25%", label: "fewer assembly errors" },
                { value: "30%", label: "better on-time delivery" },
                { value: "30%", label: "higher delivery efficiency across eng, ops, inventory" },
                { value: "14+", label: "hardware units coordinated" },
                { value: "6+", label: "cross-functional stakeholders" },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            {[
              "Established a ground-up roadmap from component planning through finished inventory and shipment.",
              "Supported the shift toward producing standard Dev Systems ahead of incoming orders.",
              "Reduced the risk of assembly delays caused by missing components.",
              "Connected component deductions to minimum-stock replenishment logic.",
              "Defined a repeatable rework route for failed calibration.",
              "Created configuration-specific work instructions and process documentation.",
            ].map((row, i) => (
              <Reveal key={row} delay={i * 70}>
                <div className="cs-box light flex items-center gap-4 px-5 py-4">
                  <span
                    className="w-[30px] h-[30px] shrink-0 rounded-full flex items-center justify-center font-black text-sm border-2"
                    style={{ background: "linear-gradient(135deg, #eaa64a, #a15a10)", borderColor: "var(--ink)", color: "var(--ink)" }}
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

      {/* ---------- Reflection ---------- */}
      <div id="s7" className="cs-seam" style={{ background: TONE_AMBER }}>
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Reveal className="flex items-start gap-5">
            <p className="font-serif text-[80px] leading-[0.78] opacity-[0.14]" style={{ color: "var(--ink)" }}>
              05
            </p>
            <h2 className="font-serif text-[40px] leading-tight mt-2" style={{ color: "var(--ink)" }}>
              Reflection
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {[
              {
                accent: "#d9871f",
                title: "Systems thinking beats step-by-step thinking",
                body: "Looking at any single stage in isolation (assembly, calibration, shipping) made each one look fine. It was only mapping the full system, end to end, that showed where it actually broke.",
                icon: (
                  <>
                    <circle cx="7" cy="7" r="3" />
                    <circle cx="17" cy="7" r="3" />
                    <circle cx="12" cy="18" r="3" />
                    <path d="M9.5 8.8L11 15.5M14.5 8.8L13 15.5M10 7h4" />
                  </>
                ),
              },
              {
                accent: "#2b2e33",
                title: "Coordination across functions is a shared-language problem",
                body: 'Engineering, operations, and inventory each had their own definition of "ready." The roadmap only worked once those definitions were forced to agree at every handoff.',
                icon: (
                  <>
                    <circle cx="6" cy="6" r="2.5" />
                    <circle cx="18" cy="6" r="2.5" />
                    <circle cx="12" cy="18" r="2.5" />
                    <path d="M8 7.5L11 16M16 7.5L13 16M8.3 6h7.4" />
                  </>
                ),
              },
              {
                accent: "#d9871f",
                title: "Automation earns its place after the process is proven",
                body: "The inventory threshold check and the replenishment trigger were designed and run manually first. Automating a process no one had validated yet would have just automated the wrong thing.",
                icon: (
                  <>
                    <rect x="4" y="4" width="7" height="7" rx="1.5" />
                    <rect x="13" y="13" width="7" height="7" rx="1.5" />
                    <path d="M11 7.5h4a2 2 0 0 1 2 2v3.5M9 13v1.5a2 2 0 0 0 2 2H13" />
                  </>
                ),
              },
              {
                accent: "#2b2e33",
                title: "The roadmap survived because it was allowed to fail first",
                body: "The calibration rework loop exists because failure was designed into the model as a normal path, not treated as an exception to route around later.",
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

          <p className="text-sm italic leading-relaxed mt-8 max-w-2xl" style={{ color: "var(--ink-soft)" }}>
            Internal trackers, calibration materials, scripts, and company-specific documentation
            are omitted for confidentiality. The visuals on this page reconstruct the same process
            logic in a public-safe form.
          </p>
        </div>
      </div>
    </div>
  );
}

import { getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import { greenhouseChannels } from "@/lib/content/greenhouse-channels";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import Metric from "@/components/case-study/shell/Metric";
import Reveal from "@/components/Reveal";
import ProcessFlow, { type ProcessStep } from "@/components/case-study/shell/ProcessFlow";
import CategoryGrid from "@/components/case-study/shell/CategoryGrid";

/**
 * Phase 11 pilot (docs/redesign/IMPLEMENTATION-ROADMAP.md): the shared
 * shell/evidence component set composed against Greenhouse's real content,
 * built and verified without cutting the live `/work/greenhouse` route
 * over yet — see components/case-study/GreenhouseCaseStudy.tsx (unchanged,
 * still what the live route renders) and the temporary preview route this
 * component is mounted at for comparison. Every fact below is sourced
 * from lib/content/case-studies.ts and lib/content/greenhouse-channels.ts,
 * copied verbatim from what the live page already says — this phase
 * changes how the page is built, not what it says.
 *
 * Revised 2026-08-25 against docs/redesign/REFERENCE-AUDIT.md's own
 * benchmark set after an arbitrary-asymmetry pass was rejected: the
 * NoCode.co case-study reference explicitly shows a uniform stats row —
 * "large plain numbers... no cards," none bigger than the others — and
 * the Refero benchmark set is "near-monochrome plus exactly one surgical
 * accent." Metrics and at-a-glance facts are back to equal weight;
 * `--color-project-accent` now appears in exactly one place on this page
 * (ProcessFlow's active step, a functional signal, not decoration).
 */
const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-outcomes", label: "Outcome metrics" },
  { href: "#s-gallery", label: "Visual design" },
  { href: "#s-systems", label: "Behind the visuals" },
  { href: "#s-process", label: "Process" },
  { href: "#s-final-outcomes", label: "Outcomes" },
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
    synopsis: "Drafts went back for a brand and copy check before anything moved toward scheduling, print, or upload.",
  },
  {
    title: "Product Tracking",
    synopsis: "Once approved, I logged the asset against its product identifiers in the OneDrive UID tracker so it stayed tied to the right SKU.",
  },
  {
    title: "Inventory Coordination",
    synopsis: "I checked the linked SKU's inventory status so a campaign never launched pointing at stock that wasn't actually available.",
  },
  {
    title: "Final Delivery",
    synopsis: "The asset shipped to its channel - uploaded to Amazon, scheduled in Klaviyo, or sent to print - and the tracker was marked complete.",
  },
];

const SYSTEM_NODES = {
  left: ["Product UID", "Retail & e-commerce assets"],
  center: "UID tracking & inventory routing",
  right: ["Inventory status", "Handoff ownership"],
};

/**
 * Band background/border pair for a full-bleed section — alternating
 * --color-bg / --color-surface-1 gives the page real tonal depth between
 * major sections (approved: decision-of-record 5, "secondary surface
 * tinting... using the new semantic surface tokens") instead of relying on
 * whitespace alone to mark a section change. Every band after the first
 * gets a hairline top border so the tone shift itself reads as a deliberate
 * seam, not a fade. Interactive rows inside (Metric, CaseStudySnapshot,
 * Outcomes) always hover to --color-surface-2 regardless of which band
 * they sit in, one full tonal step above either band color, so hover
 * feedback never silently disappears on a tinted band.
 */
const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

export default function GreenhouseCaseStudy() {
  const cs = getCaseStudy("greenhouse")!;
  const theme = caseStudyTheme.greenhouse;

  return (
    <div style={{ "--color-project-accent": theme.accent } as React.CSSProperties}>
      {/* ---------- Cover ---------- */}
      <section style={BAND.base}>
        <Container variant="page" className="pt-10 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            <CaseStudyHero
              company={cs.company}
              role={cs.role}
              title={cs.title}
              lead={cs.oneLiner}
              meta={`${cs.location} · ${cs.timeframe}`}
              artifacts={cs.artifacts}
              media={cs.heroMedia}
            />
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>
        </Container>
      </section>

      {/* ---------- At a glance + Outcome metrics ----------
          Grouped under one tighter Stack (not full band-to-band padding)
          — both are "quick facts" reads for the five-minute reviewer, not
          separate narrative beats, so the whitespace between them should
          read as related, not as a section break. */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Stack variant="section">
            {cs.atAGlance && (
              <Section anchor="s-glance" label="At a glance">
                <Reveal className="mt-6">
                  <CaseStudySnapshot
                    items={[
                      ...cs.atAGlance,
                      ...(cs.tags?.length ? [{ label: "Core skills", value: cs.tags.join(", ") }] : []),
                      ...(cs.toolTags?.length ? [{ label: "Tools", value: cs.toolTags.join(", ") }] : []),
                    ]}
                  />
                </Reveal>
              </Section>
            )}

            <Section anchor="s-outcomes" number="01" heading="Outcome metrics">
              <Grid className="mt-8">
                {cs.metrics.map((m, i) => (
                  <div key={m.label} className="col-span-2 lg:col-span-3">
                    <Reveal delay={i * 80}>
                      <Metric value={m.value} label={m.label} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- Visual design ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-gallery"
            number="02"
            heading="One brand, five completely different formats"
            intro="An Amazon listing, an email send, a printed sell sheet, a LinkedIn announcement, and an internal concept deck each earn attention differently. Every asset below adapted to that format instead of resizing the same file, while staying recognizably Greenhouse."
          >
            <div className="mt-8">
              <CategoryGrid channels={greenhouseChannels} linkBase="/work/greenhouse" />
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Behind the visuals ----------
          Uses the same Section number/heading treatment as every other
          section on this page (was previously wrapped in the shared
          Chapter component, whose 80px pull-numeral is meant as a
          one-time editorial break, not a per-section repeat — that
          mismatch was the visible "03 is huge" inconsistency; every
          section number is now the same small inline numeral).
          The node diagram gets real connecting edges (08-diagram-
          system.md: "1-1.5px using --color-line," arrowhead only where
          direction isn't otherwise obvious) instead of three floating
          unconnected boxes, plus a real --color-surface-2 fill so the
          nodes read as solid objects against this band's tinted
          background instead of empty outlines. */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Section anchor="s-systems" number="03" heading="The system behind the storefront">
            <p
              className="mt-4"
              style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}
            >
              Alongside the customer-facing work, I helped maintain the systems behind it. Structured trackers in
              OneDrive and sprint boards in Microsoft Planner connected product identifiers, inventory information,
              deliverables, and ownership, so it was clear what was ready, what was missing, and what needed to
              happen next.
            </p>

            <Reveal className="mt-8">
              <div
                className="grid md:grid-cols-[1fr_48px_1.2fr_48px_1fr] gap-3 md:gap-0 items-center"
                role="img"
                aria-label="Product UID and retail and e-commerce assets flow into UID tracking and inventory routing, which determines inventory status and handoff ownership."
              >
                <div className="flex flex-col gap-3">
                  {SYSTEM_NODES.left.map((label) => (
                    <div
                      key={label}
                      className="text-center px-4 py-4 text-sm rounded-[var(--radius-default)] border transition-colors"
                      style={{
                        background: "var(--color-surface-2)",
                        borderColor: "var(--color-line)",
                        color: "var(--color-text-muted)",
                        transitionDuration: "var(--duration-base)",
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                  <div className="flex-1 h-px" style={{ background: "var(--color-line)" }} />
                  <span className="px-1 text-xs leading-none" style={{ color: "var(--color-text-subtle)" }}>
                    →
                  </span>
                </div>

                <div
                  className="text-center px-5 py-7 rounded-[var(--radius-default)] font-medium text-lg"
                  style={{ background: "var(--color-project-accent)", color: "var(--color-bg)" }}
                >
                  {SYSTEM_NODES.center}
                </div>

                <div className="hidden md:flex items-center justify-center" aria-hidden="true">
                  <span className="px-1 text-xs leading-none" style={{ color: "var(--color-text-subtle)" }}>
                    →
                  </span>
                  <div className="flex-1 h-px" style={{ background: "var(--color-line)" }} />
                </div>

                <div className="flex flex-col gap-3">
                  {SYSTEM_NODES.right.map((label) => (
                    <div
                      key={label}
                      className="text-center px-4 py-4 text-sm rounded-[var(--radius-default)] border transition-colors"
                      style={{
                        background: "var(--color-surface-2)",
                        borderColor: "var(--color-line)",
                        color: "var(--color-text-muted)",
                        transitionDuration: "var(--duration-base)",
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Section>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-process"
            number="04"
            heading="From requirement to final delivery"
            intro="Select a stage to see what happened there and what I contributed."
          >
            <div className="mt-8">
              <ProcessFlow steps={PROCESS_STEPS} topAlignRows />
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Outcomes ----------
          Each result gets the same large-pale-numeral treatment Chapter
          already uses for section numbers, at list-row scale — real
          presence instead of a small checkmark, but every row gets
          identical treatment (no one outcome sized differently), and it
          reuses an established motif instead of inventing a new one. */}
      <section style={BAND.tint}>
        <Container variant="page" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <Section anchor="s-final-outcomes" number="05" heading="Outcomes">
            <ul className="mt-6 flex flex-col">
              {cs.outcome.map((o, i) => (
                <li key={o} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
                  <Reveal
                    delay={i * 70}
                    className="group/outcome flex items-baseline gap-6 -mx-4 px-4 py-6 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-[1.4em] transition-colors duration-[var(--duration-base)] group-hover/outcome:text-[var(--color-text)]"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h1)",
                        lineHeight: 1,
                        color: "var(--color-text-subtle)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="pt-1"
                      style={{ fontSize: "var(--text-body-l)", color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}
                    >
                      {o}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Section>
        </Container>
      </section>
    </div>
  );
}

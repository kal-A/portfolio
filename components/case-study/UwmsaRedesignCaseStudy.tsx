import { getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import Metric from "@/components/case-study/shell/Metric";
import DecisionBlock from "@/components/case-study/shell/DecisionBlock";
import Action from "@/components/ui/Action";
import Reveal from "@/components/Reveal";

/**
 * UWMSA app redesign, a self-initiated case study. Built on the shared
 * case-study shell (same vocabulary as Greenhouse/Chronicle): a cover with
 * the live-prototype and process-atlas links as the primary artifact, an
 * at-a-glance snapshot plus metrics, the problem and its fixed constraints,
 * a numbered process, the key decisions as decision blocks, and outcomes
 * plus reflection. Every fact traces to lib/content/case-studies.ts, which is
 * sourced from the project's own process atlas. Screenshots are intentionally
 * deferred: this is an in-progress, low-key entry and the live prototype is
 * the real artifact, so the page is typographic until real captures are added
 * to heroMedia/images.
 */
const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-problem", label: "The problem" },
  { href: "#s-process", label: "Process" },
  { href: "#s-decisions", label: "Decisions" },
  { href: "#s-outcome", label: "Outcomes" },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

function NumberedList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-col">
      {items.map((item, i) => (
        <li key={item} style={{ borderTop: i === 0 ? "none" : "1px solid var(--color-line)" }}>
          <Reveal
            delay={i * 60}
            className="group/row flex items-baseline gap-6 -mx-4 px-4 py-6 rounded-[var(--radius-default)] transition-colors duration-[var(--duration-base)] hover:bg-[var(--color-surface-2)]"
          >
            <span
              aria-hidden="true"
              className="shrink-0 w-[1.6em] transition-colors duration-[var(--duration-base)] group-hover/row:text-[var(--color-text)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: 1,
                color: "var(--color-text-subtle)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="pt-1"
              style={{ fontSize: "var(--text-body-l)", color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}
            >
              {item}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default function UwmsaRedesignCaseStudy() {
  const cs = getCaseStudy("uwmsa-redesign")!;
  const theme = caseStudyTheme["uwmsa-redesign"];

  return (
    <div style={{ "--color-project-accent": theme.accent } as React.CSSProperties}>
      {/* ---------- Cover ---------- */}
      <section style={BAND.base}>
        <Container variant="page" className="pt-10 pb-16 md:pb-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            <div>
              <CaseStudyHero
                company={cs.company}
                role={cs.role}
                title={cs.title}
                lead={cs.oneLiner}
                meta={cs.timeframe}
                artifacts={cs.artifacts}
                media={cs.heroMedia}
              />
              {cs.links && cs.links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-4">
                  {cs.links.map((l, i) => (
                    <Action
                      key={l.href}
                      href={l.href}
                      variant={i === 0 ? "primary" : "secondary"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {l.label} ↗
                    </Action>
                  ))}
                </div>
              )}
            </div>
            <CaseStudyTOC items={TOC_ITEMS} />
          </div>
        </Container>
      </section>

      {/* ---------- At a glance + metrics ---------- */}
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

            <Section anchor="s-metrics" number="01" heading="Shape of the work">
              <Grid className="mt-8">
                {cs.metrics.map((m, i) => (
                  <div key={m.label} className="col-span-2 lg:col-span-3">
                    <Reveal delay={i * 80}>
                      <Metric value={m.value} label={m.label} qualifier={m.qualifier} />
                    </Reveal>
                  </div>
                ))}
              </Grid>
            </Section>
          </Stack>
        </Container>
      </section>

      {/* ---------- The problem + constraints ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="py-16 md:py-20">
          <Section anchor="s-problem" number="02" heading="Useful, but hard to read at a glance">
            <p
              className="mt-4"
              style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}
            >
              {cs.problem}
            </p>

            {cs.constraints && cs.constraints.length > 0 && (
              <div className="mt-10">
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    letterSpacing: "var(--tracking-label)",
                    textTransform: "uppercase",
                    color: "var(--color-text-subtle)",
                  }}
                >
                  Fixed constraints
                </p>
                <ul className="mt-4 grid gap-x-10 gap-y-4 md:grid-cols-2">
                  {cs.constraints.map((c) => (
                    <li
                      key={c}
                      className="pl-5"
                      style={{
                        borderLeft: "2px solid var(--color-line-strong)",
                        color: "var(--color-text-muted)",
                        lineHeight: "var(--leading-body)",
                      }}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-process"
            number="03"
            heading="From the whole product to a working system"
            intro="The redesign started from the complete existing app, not a hero screen, and grew Home into a system by building the screens that were actually hard."
          >
            <NumberedList items={cs.process} />
          </Section>
        </Container>
      </section>

      {/* ---------- Decisions ---------- */}
      {cs.decisions && cs.decisions.length > 0 && (
        <section style={BAND.baseBordered}>
          <Container variant="page" className="py-16 md:py-20">
            <Section anchor="s-decisions" number="04" heading="The decisions that shaped it">
              <div className="mt-8 flex flex-col gap-10">
                {cs.decisions.map((d, i) => (
                  <Reveal key={d.decision} delay={i * 70}>
                    <DecisionBlock
                      decision={d.decision}
                      rationale={d.rationale}
                      alternatives={d.alternatives}
                      result={d.result ?? ""}
                    />
                  </Reveal>
                ))}
              </div>
            </Section>
          </Container>
        </section>
      )}

      {/* ---------- Outcomes + reflection ---------- */}
      <section style={BAND.tint}>
        <Container variant="page" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <Section anchor="s-outcome" number="05" heading="Where it stands">
            <NumberedList items={cs.outcome} />

            {cs.reflection && cs.reflection.length > 0 && (
              <div className="mt-14">
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    letterSpacing: "var(--tracking-label)",
                    textTransform: "uppercase",
                    color: "var(--color-text-subtle)",
                  }}
                >
                  Reflection
                </p>
                <ul className="mt-4 flex flex-col gap-4">
                  {cs.reflection.map((r) => (
                    <li
                      key={r}
                      style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.note && (
              <p
                className="mt-14 pl-5 italic"
                style={{
                  borderLeft: "2px solid var(--color-line)",
                  color: "var(--color-text-subtle)",
                  fontSize: "var(--text-small)",
                  lineHeight: "var(--leading-body)",
                  maxWidth: "var(--measure-body)",
                }}
              >
                {cs.note}
              </p>
            )}
          </Section>
        </Container>
      </section>
    </div>
  );
}

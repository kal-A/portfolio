import { getCaseStudy } from "@/lib/content/case-studies";
import { caseStudyTheme } from "@/lib/content/theme";
import Container from "@/components/layout/Container";
import Stack from "@/components/layout/Stack";
import Grid from "@/components/layout/Grid";
import Section from "@/components/layout/Section";
import CaseStudyHero from "@/components/case-study/shell/CaseStudyHero";
import CaseStudyTOC from "@/components/case-study/shell/CaseStudyTOC";
import CaseStudySnapshot from "@/components/case-study/shell/CaseStudySnapshot";
import CaptionedMedia from "@/components/case-study/shell/CaptionedMedia";
import Metric from "@/components/case-study/shell/Metric";
import DecisionBlock from "@/components/case-study/shell/DecisionBlock";
import Action from "@/components/ui/Action";
import Reveal from "@/components/Reveal";

/**
 * UWMSA app redesign, an independent product-design case study on the shared
 * case-study shell. The evidence here is the interface itself, so the page is
 * image-led: a device-shelf cover, a real before/after of the home screen, the
 * three art directions explored on identical Friday data, and the built
 * screens that grew Home into a system. Every screenshot is a real capture
 * from the live prototype's own process atlas (public/case-studies/
 * uwmsa-redesign), and every fact traces to lib/content/case-studies.ts.
 */
const PHONE = "aspect-[78/169]"; // exact source ratio of the 780x1690 captures: no crop
const PHONE_SIZES = "(min-width: 1024px) 340px, (min-width: 640px) 44vw, 90vw";
const WIDE_SIZES = "(min-width: 1024px) 1200px, 100vw";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-problem", label: "The problem" },
  { href: "#s-directions", label: "Three directions" },
  { href: "#s-system", label: "The system" },
  { href: "#s-process", label: "Process" },
  { href: "#s-decisions", label: "Decisions" },
  { href: "#s-outcome", label: "Outcomes" },
];

const DIRECTIONS = [
  { src: "dir-a-quiet", label: "A. Quiet Utility", caption: "Hierarchy carried by spacing and type, not a card per object." },
  { src: "dir-b-islamic", label: "B. Islamic Editorial", caption: "Devotional character led from the top of the scan." },
  { src: "dir-c-campus", label: "C. Campus Editorial", caption: "Community and campus life pulled forward as the frame." },
];

const SCREENS = [
  { src: "screen-events", label: "Events", caption: "Forced recurrence, tentative and major-event states, calendar traversal." },
  { src: "screen-prayer", label: "Prayer", caption: "One clear next-prayer signal alongside adhan and iqamah." },
  { src: "screen-campus", label: "Campus", caption: "Tested list-and-map depth without breaking the calm shell." },
  { src: "screen-duas", label: "Duas", caption: "Held long-form Arabic and audio reading in the same language." },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

function img(name: string) {
  return `/case-studies/uwmsa-redesign/${name}.webp`;
}

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

          {/* Device-shelf cover shot: the built prototype is the hero. */}
          <Reveal delay={120} className="mt-12 md:mt-16">
            <CaptionedMedia
              src={img("cover-shelf")}
              alt="Three screens of the redesigned UWMSA app in the Quiet Utility direction: Prayer, Home, and Duas"
              sizes={WIDE_SIZES}
              aspect="aspect-[16/10]"
              priority
              interactive={false}
              caption="The redesigned app in its Quiet Utility direction: Prayer, Home, and Duas, built as an interactive prototype rather than flat frames."
            />
          </Reveal>
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

            <Section anchor="s-metrics" number="01" heading="What the redesign covers">
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

      {/* ---------- The problem + before/after ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="py-16 md:py-20">
          <Section anchor="s-problem" number="02" heading="Composition, not content, was the problem">
            <p
              className="mt-4"
              style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}
            >
              {cs.problem}
            </p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 max-w-[720px]">
              <Reveal>
                <CaptionedMedia
                  src={img("baseline-home")}
                  alt="The original UWMSA home screen: a separate card for every object"
                  sizes={PHONE_SIZES}
                  aspect={PHONE}
                  parallax={false}
                  label="Before"
                  caption="A card for every object, and a greeting competing with next prayer for the first scan."
                />
              </Reveal>
              <Reveal delay={90}>
                <CaptionedMedia
                  src={img("home-quiet")}
                  alt="The redesigned home screen: one next-prayer signal and the day's essentials"
                  sizes={PHONE_SIZES}
                  aspect={PHONE}
                  parallax={false}
                  label="After"
                  caption="One next-prayer signal leads; the day's essentials step forward, everything else steps back."
                />
              </Reveal>
            </div>

            {cs.constraints && cs.constraints.length > 0 && (
              <div className="mt-12">
                <p
                  style={{
                    fontSize: "var(--text-label)",
                    letterSpacing: "var(--tracking-label)",
                    textTransform: "uppercase",
                    color: "var(--color-text-subtle)",
                  }}
                >
                  Working constraints
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

      {/* ---------- Three directions ---------- */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-directions"
            number="03"
            heading="Three directions, one Friday"
            intro="To separate product character from content edits dressed up as progress, three genuinely different first Home screens were built on the same Friday data."
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {DIRECTIONS.map((d, i) => (
                <Reveal key={d.src} delay={i * 90}>
                  <CaptionedMedia
                    src={img(d.src)}
                    alt={`UWMSA home screen, direction ${d.label}`}
                    sizes={PHONE_SIZES}
                    aspect={PHONE}
                    label={d.label}
                    caption={d.caption}
                  />
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- The system across screens ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-system"
            number="04"
            heading="Growing Home into a system"
            intro="A design system invented up front fits the first screen and fights the rest. Home set the language; then the harder screens exposed the states and components the system actually needed."
          >
            <div className="mt-8 grid gap-8 grid-cols-2 lg:grid-cols-4">
              {SCREENS.map((s, i) => (
                <Reveal key={s.src} delay={i * 80}>
                  <CaptionedMedia
                    src={img(s.src)}
                    alt={`UWMSA ${s.label} screen in the Quiet Utility direction`}
                    sizes={PHONE_SIZES}
                    aspect={PHONE}
                    label={s.label}
                    caption={s.caption}
                  />
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-process"
            number="05"
            heading="From the whole product to a foundation"
            intro="The redesign started from the complete existing app, not a single hero screen, and ended by setting Quiet Utility as the foundation to keep building on."
          >
            <NumberedList items={cs.process} />
          </Section>
        </Container>
      </section>

      {/* ---------- Decisions ---------- */}
      {cs.decisions && cs.decisions.length > 0 && (
        <section style={BAND.baseBordered}>
          <Container variant="page" className="py-16 md:py-20">
            <Section anchor="s-decisions" number="06" heading="The decisions that shaped it">
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

      {/* ---------- Palette and emphasis studies ---------- */}
      <section style={BAND.tint}>
        <Container variant="page" className="py-16 md:py-20">
          <Section
            anchor="s-palette"
            number="07"
            heading="Two studies on emphasis"
            intro="With composition settled, two focused studies pushed only visual emphasis on the same Home content, to see how far tone could move without touching the structure."
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-2 max-w-[720px]">
              <Reveal>
                <CaptionedMedia
                  src={img("palette-warm")}
                  alt="UWMSA home screen, Warm Ledger emphasis study"
                  sizes={PHONE_SIZES}
                  aspect={PHONE}
                  label="Warm Ledger"
                  caption="A warmer, ledger-like reading of the same hierarchy."
                />
              </Reveal>
              <Reveal delay={90}>
                <CaptionedMedia
                  src={img("palette-contrast")}
                  alt="UWMSA home screen, Gold Contrast emphasis study"
                  sizes={PHONE_SIZES}
                  aspect={PHONE}
                  label="Gold Contrast"
                  caption="Heritage gold pushed harder as the single point of emphasis."
                />
              </Reveal>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Outcomes + reflection ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="page" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <Section anchor="s-outcome" number="08" heading="Where it stands">
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

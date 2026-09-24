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
 * Cities of East, an independent research-and-design case study on the shared
 * shell, laid out against the RoomEase/Chronicle reference (standard-width
 * container, --accent-bright, two-column prose/media so nothing floats in a
 * half-empty band). The atlas is the argument, so it is map-led: a cover map,
 * a field-study detail as the problem's evidence, and the same geography read
 * three ways (terrain, climate, waterways) as the centerpiece. Every capture
 * is from the live atlas (public/case-studies/cities-of-east); every fact
 * traces to lib/content/case-studies.ts.
 */
const WIDE = "aspect-[16/10]";
const WIDE_SIZES = "(min-width: 1024px) 1200px, 100vw";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-problem", label: "The problem" },
  { href: "#s-layers", label: "Three readings" },
  { href: "#s-process", label: "Process" },
  { href: "#s-decisions", label: "Decisions" },
  { href: "#s-outcome", label: "Outcomes" },
];

const LAYERS = [
  {
    src: "atlas-terrain",
    label: "Terrain",
    caption: "Open and mixed land, arid desert, rugged highlands, and forested river gorges, so form can be read against the land it sits on.",
  },
  {
    src: "atlas-climate",
    label: "Climate",
    caption: "Six schematic climate families, from arid desert to cold alpine, a deliberately coarse tool for reasoning about built form.",
  },
  {
    src: "atlas-waterways",
    label: "Waterways",
    caption: "Major rivers and water-linked land, the corridors that decide where oasis settlements and trade cities actually sit.",
  },
];

const BAND = {
  base: { background: "var(--color-bg)" },
  tint: { background: "var(--color-surface-1)", borderTop: "1px solid var(--color-line)" },
  baseBordered: { background: "var(--color-bg)", borderTop: "1px solid var(--color-line)" },
} as const;

const CARD_HOVER =
  "transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.42)] hover:bg-[color-mix(in_srgb,var(--color-project-accent)_11%,var(--color-surface-2))]";

const EYEBROW: React.CSSProperties = {
  fontSize: "var(--text-label)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--accent-bright, var(--color-project-accent))",
};

function img(name: string) {
  return `/case-studies/cities-of-east/${name}.webp`;
}

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
        style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}
      >
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-5" style={EYEBROW}>
          {cite}
        </figcaption>
      )}
    </figure>
  );
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
              className="shrink-0 w-[1.6em] transition-colors duration-[var(--duration-base)] group-hover/row:text-[var(--accent-bright,var(--color-project-accent))]"
              style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: 1, color: "var(--color-text-subtle)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="pt-1"
              style={{ fontSize: "var(--text-body-l)", color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)", maxWidth: "var(--measure-body)" }}
            >
              {item}
            </span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export default function CitiesOfEastCaseStudy() {
  const cs = getCaseStudy("cities-of-east")!;
  const theme = caseStudyTheme["cities-of-east"];

  return (
    <div
      style={
        {
          "--color-project-accent": theme.accent,
          "--accent-bright": `color-mix(in srgb, ${theme.accent} 60%, white)`,
        } as React.CSSProperties
      }
    >
      {/* ---------- Cover ---------- */}
      <section style={BAND.base}>
        <Container variant="standard" className="pt-10 pb-16 md:pb-20">
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
                    <Action key={l.href} href={l.href} variant={i === 0 ? "primary" : "secondary"} target="_blank" rel="noopener noreferrer">
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
        <Container variant="standard" className="py-16 md:py-20">
          <Stack variant="section">
            {cs.atAGlance && (
              <Section accentLabel anchor="s-glance" label="At a glance">
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

            <Section accentLabel anchor="s-metrics" number="01" label="By the numbers" heading="What the atlas holds">
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

      {/* ---------- The problem + a field study ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="The problem" heading="Style, detached from why it exists" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                {cs.problem}
              </p>
            </div>
            <PullQuote cite="The atlas, in one line">
              Read a city's form as an answer to its climate, not as ornament.
            </PullQuote>
          </div>

          <Reveal className="mt-14">
            <CaptionedMedia
              src={img("study-arabian")}
              alt="A Cities of East field study: the Arabian Peninsula, opened to Shibam, the barjeel, and Souq Waqif"
              sizes={WIDE_SIZES}
              aspect={WIDE}
              parallax
              label="A region opened up"
              caption="Each region opens into field studies of specific responses: Shibam's tower houses, Dubai's barjeel and mangh, Souq Waqif, each tied back to climate, land, and patterns of life."
            />
          </Reveal>

          {cs.constraints && cs.constraints.length > 0 && (
            <div
              className={`mt-14 px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`}
              style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
            >
              <div className="grid lg:grid-cols-[220px_1fr] gap-x-10 gap-y-4">
                <p style={EYEBROW}>Working constraints</p>
                <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {cs.constraints.map((c) => (
                    <li key={c} className="pl-5" style={{ borderLeft: "2px solid var(--color-line-strong)", color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ---------- Three readings of one geography ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section
            accentLabel
            anchor="s-layers"
            number="03"
            label="The basemap"
            heading="The same geography, read three ways"
            intro="The basemap can be read by terrain, by climate, and by waterways, so the same land can be interrogated from different environmental angles instead of presenting buildings as isolated images."
          >
            <div className="mt-8 flex flex-col gap-12">
              {LAYERS.map((layer, i) => (
                <Reveal key={layer.src} delay={i * 90}>
                  <CaptionedMedia src={img(layer.src)} alt={`Cities of East atlas, ${layer.label} reading`} sizes={WIDE_SIZES} aspect={WIDE} parallax label={layer.label} caption={layer.caption} />
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Process ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section
            accentLabel
            anchor="s-process"
            number="04"
            label="Process"
            heading="Building a reading tool, not a gallery"
            intro="The atlas is built around one relationship, architecture as a response to climate and land, and expands region by region with real, sourced studies."
          >
            <NumberedList items={cs.process} />
          </Section>
        </Container>
      </section>

      {/* ---------- Decisions ---------- */}
      {cs.decisions && cs.decisions.length > 0 && (
        <section style={BAND.tint}>
          <Container variant="standard" className="py-16 md:py-20">
            <Section accentLabel anchor="s-decisions" number="05" label="Decisions" heading="The decisions that shaped it">
              <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-10">
                {cs.decisions.map((d, i) => (
                  <Reveal key={d.decision} delay={i * 70}>
                    <DecisionBlock decision={d.decision} rationale={d.rationale} alternatives={d.alternatives} result={d.result ?? ""} />
                  </Reveal>
                ))}
              </div>
            </Section>
          </Container>
        </section>
      )}

      {/* ---------- Outcomes + reflection ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28">
          <Section accentLabel anchor="s-outcome" number="06" label="Outcomes" heading="Where it stands">
            <NumberedList items={cs.outcome} />

            {cs.reflection && cs.reflection.length > 0 && (
              <div className="mt-16">
                <p style={EYEBROW}>Reflection</p>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {cs.reflection.map((r, i) => (
                    <Reveal key={r} delay={i * 80}>
                      <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                        <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {cs.note && (
              <p
                className="mt-14 pl-5 italic"
                style={{ borderLeft: "2px solid var(--color-line)", color: "var(--color-text-subtle)", fontSize: "var(--text-small)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}
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

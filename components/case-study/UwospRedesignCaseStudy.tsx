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
 * UWOSP website redesign, an independent web/visual-design case study on the
 * shared shell, laid out against the RoomEase/UWMSA reference (standard-width
 * container, --accent-bright, two-column prose/media, card grids). The evidence
 * is the redesigned interface itself, so it is image-led: a homepage cover, the
 * marked-up critique that drove it, the rebuilt impact page, the explorable
 * allocation chart, and the mobile navigation overlay. Every screenshot is a
 * real capture from the live prototype and its process atlas
 * (public/case-studies/uwosp-redesign); every fact traces to
 * lib/content/case-studies.ts and the atlas narrative.
 */
const WIDE = "aspect-[16/10]";
// Desktop screenshots (~1.9:1) shown in full, un-cropped (fit="contain"), so the
// whole page is readable rather than zoomed into a centre crop.
const SHOT = "aspect-[16/9]";
const PHONE = "aspect-[78/169]";
const WIDE_SIZES = "(min-width: 1024px) 1160px, 100vw";
const TILE_SIZES = "(min-width: 1024px) 380px, (min-width: 640px) 46vw, 92vw";
const PHONE_SIZES = "(min-width: 1024px) 300px, (min-width: 640px) 40vw, 80vw";

const TOC_ITEMS = [
  { href: "#s-glance", label: "At a glance" },
  { href: "#s-problem", label: "The problem" },
  { href: "#s-critique", label: "The critique" },
  { href: "#s-impact", label: "Rebuilding impact" },
  { href: "#s-allocation", label: "Allocation chart" },
  { href: "#s-mobile", label: "Mobile nav" },
  { href: "#s-decisions", label: "Decisions" },
  { href: "#s-outcome", label: "Outcomes" },
  { href: "#s-reflection", label: "Reflection" },
];

const PRINCIPLES = [
  { title: "Real information over AI slop", body: "Keep the campaign names, money, partners, households, and children that prove the work." },
  { title: "Economical, not empty", body: "Open space should create contrast or pace, not look like missing content." },
  { title: "Motion earns attention", body: "Animate entry, progress, and state change; never to rescue a weak layout." },
  { title: "Polish the obvious UX", body: "Clear hover states, consistent rules, outside-click menus, and responsive spacing." },
];

const CRITIQUE = [
  { src: "crit-impact", label: "Impact", caption: "Achievement was buried under unearned space." },
  { src: "crit-join", label: "Join", caption: "Tiny numbers and rules did not explain the sequence." },
  { src: "crit-donate", label: "Donate", caption: "Padding separated the message instead of supporting it." },
];

const ALLOCATION_POINTS = [
  "A selected slice gets a controlled lift.",
  "The center label changes without layout shift.",
  "Legend and chart share one active state.",
  "Motion is reduced when the visitor asks for it.",
];

const MOBILE_POINTS = [
  "The menu closes when the page is clicked.",
  "Logo and close action keep their own row.",
  "Navigation is visually separated from content.",
  "The active page keeps a consistent rule.",
  "Focus returns to the menu trigger.",
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
  return `/case-studies/uwosp-redesign/${name}.webp`;
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

export default function UwospRedesignCaseStudy() {
  const cs = getCaseStudy("uwosp-redesign")!;
  const theme = caseStudyTheme["uwosp-redesign"];

  return (
    <div
      style={
        {
          "--color-project-accent": theme.accent,
          "--accent-bright": `color-mix(in srgb, ${theme.accent} 62%, white)`,
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

          <Reveal delay={120} className="mt-12 md:mt-16">
            <CaptionedMedia
              src={img("home")}
              alt="The redesigned UWOSP homepage: large editorial UWOSP wordmark over real photography, with a cobalt Donate action"
              sizes={WIDE_SIZES}
              aspect="aspect-[16/10]"
              objectPosition="top"
              priority
              interactive={false}
              caption="The redesigned homepage: editorial type as the brand, one cobalt interaction colour, and real photography over ink-and-paper contrast."
            />
          </Reveal>
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

            <Section accentLabel anchor="s-metrics" number="01" label="By the numbers" heading="What the redesign covers">
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

      {/* ---------- The problem + principles ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel number="02" label="The problem" heading="The right facts, no clear story" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                {cs.problem}
              </p>
            </div>
            <Reveal>
              <CaptionedMedia
                src={img("orig-desktop")}
                alt="The original UWOSP site: dense cards and generic page patterns"
                sizes={TILE_SIZES}
                aspect={SHOT}
                fit="contain"
                label="The original site"
                caption="Real campaigns and partners were there, but dense cards made the work feel smaller than it was."
              />
            </Reveal>
          </div>

          <div className="mt-14">
            <PullQuote cite="The critique that set the brief">
              Less is more. Adding more to the less breaks that philosophy.
            </PullQuote>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border border-l-[3px] ${CARD_HOVER}`} style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}>
                  <p className="mb-2" style={{ color: "var(--color-text)", fontWeight: 600, lineHeight: "var(--leading-body)" }}>
                    {p.title}
                  </p>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- The critique ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section
            accentLabel
            anchor="s-critique"
            number="03"
            label="The critique"
            heading="Specific enough to draw"
            intro="Direct critique marked the exact places where whitespace, alignment, and responsive behavior stopped feeling intentional. Those marks became the work list."
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {CRITIQUE.map((c, i) => (
                <Reveal key={c.src} delay={i * 90}>
                  <CaptionedMedia src={img(c.src)} alt={`Marked-up critique: ${c.label}`} sizes={TILE_SIZES} aspect={SHOT} fit="contain" label={c.label} caption={c.caption} />
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Rebuilding impact ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section
            accentLabel
            anchor="s-impact"
            number="04"
            label="Rebuilding impact"
            heading="Impact stopped reading like a spreadsheet"
            intro="The proof stayed factual, but the composition began to feel like an achievement: a strong narrative, metrics with ceremony, and locations that could finally breathe."
          >
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <Reveal>
                <CaptionedMedia src={img("stats")} alt="The rebuilt impact page: achievement statistics given ceremony" sizes={TILE_SIZES} aspect={SHOT} fit="contain" label="Metrics with ceremony" caption="Counters enter upward as achievements and never visibly count backward." />
              </Reveal>
              <Reveal delay={90}>
                <CaptionedMedia src={img("impact-after")} alt="The rebuilt impact page: location cards own the lower field" sizes={TILE_SIZES} aspect={SHOT} fit="contain" label="Location cards own the field" caption="Locations sit in cards that hold the lower field instead of floating in space." />
              </Reveal>
            </div>
          </Section>
        </Container>
      </section>

      {/* ---------- Allocation chart ---------- */}
      <section style={BAND.tint}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-x-14 gap-y-10 items-center">
            <div>
              <Section accentLabel anchor="s-allocation" number="05" label="Allocation chart" heading="Four bars became one explorable allocation" />
              <p className="mt-5" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                The original four-bar chart returned in a form that matched the new system. A selected segment lifts, the amount moves to the center, and the legend confirms the category, all sharing one active state.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {ALLOCATION_POINTS.map((p) => (
                  <li key={p} className="flex gap-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>
                      –
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal>
              <CaptionedMedia src={img("allocation")} alt="The explorable donut allocation chart: how $12,600 was distributed across four categories" sizes={TILE_SIZES} aspect={WIDE} label="Where the funds went" caption="A selected slice lifts and its amount recenters without shifting the layout." />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Mobile navigation ----------
          A stretch-card layout: the text card fills to the phone's height so
          the tall mobile capture never leaves the copy floating in dead space. */}
      <section id="s-mobile" style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <div className="grid lg:grid-cols-[1fr_300px] gap-x-14 gap-y-10 items-stretch">
            <div
              className="h-full flex flex-col justify-center rounded-[var(--radius-default)] border border-l-[3px] px-7 py-9 md:px-9"
              style={{ borderColor: "var(--color-line)", borderLeftColor: "var(--accent-bright, var(--color-project-accent))", background: "var(--color-surface-1)" }}
            >
              <p style={EYEBROW}>06 &middot; Mobile nav</p>
              <h2 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
                Navigation became a layer, not a collision
              </h2>
              <p className="mt-4" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body-l)" }}>
                The prototype menu had collided with the logo and the page beneath it. Clear separation, full-width targets, persistent orientation, and outside-click dismissal turned it into predictable navigation.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {MOBILE_POINTS.map((p) => (
                  <li key={p} className="flex gap-3" style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>
                    <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: "var(--accent-bright, var(--color-project-accent))" }}>
                      –
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal className="w-full max-w-[300px] mx-auto lg:mx-0 lg:justify-self-end">
              <CaptionedMedia src={img("mobile-after")} alt="The redesigned UWOSP mobile navigation overlay" sizes={PHONE_SIZES} aspect={PHONE} label="A deliberate overlay" caption="The menu is a full-width overlay with outside-click dismissal." />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------- Decisions ---------- */}
      {cs.decisions && cs.decisions.length > 0 && (
        <section style={BAND.tint}>
          <Container variant="standard" className="py-16 md:py-20">
            <Section accentLabel anchor="s-decisions" number="07" label="Decisions" heading="The decisions that shaped it">
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

      {/* ---------- Outcomes ---------- */}
      <section style={BAND.baseBordered}>
        <Container variant="standard" className="py-16 md:py-20">
          <Section accentLabel anchor="s-outcome" number="08" label="Outcomes" heading="Where it stands">
            <NumberedList items={cs.outcome} />
          </Section>
        </Container>
      </section>

      {/* ---------- Reflection (own section, matching the other case studies) ---------- */}
      {cs.reflection && cs.reflection.length > 0 && (
        <section id="s-reflection" style={BAND.tint}>
          <Container variant="standard" className="pt-16 pb-24 md:pt-20 md:pb-28">
            <p style={EYEBROW}>Reflection</p>
            <h2 className="mt-2 mb-8" style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h2)", lineHeight: "var(--leading-h2)", color: "var(--color-text)" }}>
              What this redesign taught me
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cs.reflection.map((r, i) => (
                <Reveal key={r} delay={i * 80}>
                  <div className={`h-full px-6 py-6 rounded-[var(--radius-default)] border ${CARD_HOVER}`} style={{ background: "var(--color-surface-2)", borderColor: "var(--color-line)" }}>
                    <p style={{ color: "var(--color-text-muted)", lineHeight: "var(--leading-body)" }}>{r}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {cs.note && (
              <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--color-line)" }}>
                <p
                  className="mx-auto text-center italic"
                  style={{ color: "var(--color-text-subtle)", fontSize: "var(--text-small)", lineHeight: "var(--leading-body)", maxWidth: "var(--measure-body)" }}
                >
                  {cs.note}
                </p>
              </div>
            )}
          </Container>
        </section>
      )}
    </div>
  );
}

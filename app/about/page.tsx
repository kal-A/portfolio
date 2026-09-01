import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "About · Kamal Ahsan" };

/**
 * Rebuilt 2026-09-01. The prior version was an honest synopsis but read as
 * three stacked prose blocks in a single reading column, which the site owner
 * flagged as "wayy too simple" for formatting. This version keeps the exact
 * voice and every grounded fact, but gives the page real structure:
 *
 *   1. Asymmetric masthead: name + hook against a compact "at a glance" fact
 *      card (only facts already true elsewhere on the site).
 *   2. "What I do": three numbered editorial rows with hover fills, the same
 *      primitive vocabulary as the homepage ProjectIndexItem.
 *   3. "How I got here": the arc rebuilt as a phase timeline with a marker
 *      rail, so the progression reads visually instead of as flat paragraphs.
 *   4. "Off the clock": the personal beat, broken into scannable labelled
 *      micro-blocks rather than one run-on sentence.
 *
 * No em dashes anywhere in copy (site convention). Every fact traces to real
 * work already on /work, /resume, or GitHub. No portrait asset exists, so the
 * page stays typographic like the rest of the site.
 */

const eyebrow = {
  fontSize: "var(--text-label)",
  letterSpacing: "var(--tracking-label)",
  textTransform: "uppercase",
  color: "var(--color-accent)",
} as const;

const glance: { label: string; value: string }[] = [
  { label: "Now", value: "Technical product & workflows" },
  { label: "Focus", value: "PM, product design, UX" },
  { label: "Studied", value: "Management Engineering, Waterloo" },
  { label: "Open to", value: "Full-time product roles" },
];

const doing: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Product",
    body: "Holding the strategy and the smallest details at once: what to build, why it matters, and what is actually happening underneath the screen.",
  },
  {
    n: "02",
    title: "Design",
    body: "An eye built the long way, through frontend, so it stays close to how a thing feels to use, not just how it looks in a frame.",
  },
  {
    n: "03",
    title: "Systems & technical",
    body: "Comfortable in the wiring: workflows, data, and the parts of a product that never make it to a mockup but decide whether it works.",
  },
];

const timeline: { phase: string; when: string; body: string }[] = [
  {
    phase: "High school",
    when: "Where it started",
    body: "The basics: a lot of data structures and algorithms, and a stretch teaching younger kids to code at camps. What actually taught me, though, was building things I wanted to exist, from small games and Discord bots to a COVID case tracker I put together when lockdown hit.",
  },
  {
    phase: "University",
    when: "2021",
    body: "Waterloo turned that into a direction. I started in frontend, which is quietly where I got my eye for design: enough time spent on how something looked and felt that I started caring about it properly.",
  },
  {
    phase: "Co-op terms",
    when: "2022 – 2025",
    body: "Five work terms, each adding a layer. Co-ops and a few good mentors pulled me toward product, and I never put the design down along the way: from research, to systems, to owning how the work itself got run.",
  },
  {
    phase: "Now",
    when: "2026",
    body: "Technical product and workflows. I like holding the strategy of a project and its smallest details at the same time, and I am usually the one asking what is actually happening underneath a screen before anyone designs it.",
  },
];

const offClock: { label: string; body: string }[] = [
  {
    label: "History",
    body: "I read a fair amount of history. What gets me is the cause and effect, how one decision quietly sets up the next. I catch myself reading workflows the same way.",
  },
  {
    label: "Sport",
    body: "I am not much for arguing about it, but I am passionate about my teams: Arsenal, and, unfortunately, the Maple Leafs.",
  },
  {
    label: "Style",
    body: "I am really into dressing well, and I have a fragrance collection I am proud of.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      {/* Masthead: asymmetric name + hook against an at-a-glance fact card. */}
      <div className="pt-10 pb-14">
        <Container variant="standard">
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <p style={eyebrow}>About</p>
              <h1
                className="mt-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-display-l)",
                  lineHeight: "var(--leading-display-l)",
                  color: "var(--color-text)",
                }}
              >
                Kamal Ahsan
              </h1>
              <p
                className="mt-8 max-w-[24ch]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h2)",
                  lineHeight: "var(--leading-h2)",
                  color: "var(--color-text)",
                }}
              >
                I have been building things since high school, and I keep following the work: out of
                code, into design, and into product.
              </p>
            </div>

            {/* At a glance: only facts already true on /work and /resume. */}
            <dl
              className="lg:justify-self-end lg:w-[300px]"
              style={{
                border: "1px solid var(--color-line-strong)",
                borderRadius: "var(--radius-default)",
                padding: "var(--space-5)",
              }}
            >
              {glance.map((g, i) => (
                <div
                  key={g.label}
                  className={i === 0 ? "" : "mt-4 pt-4 border-t"}
                  style={i === 0 ? undefined : { borderColor: "var(--color-line)" }}
                >
                  <dt style={{ ...eyebrow, color: "var(--color-text-subtle)" }}>{g.label}</dt>
                  <dd
                    className="mt-1"
                    style={{
                      fontSize: "var(--text-body)",
                      lineHeight: "var(--leading-body)",
                      color: "var(--color-text)",
                    }}
                  >
                    {g.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </div>

      {/* What I do: numbered editorial rows with a quiet hover fill. */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="standard">
            <p style={eyebrow}>What I do</p>
            <div className="mt-8">
              {doing.map((d, i) => (
                <div
                  key={d.n}
                  className={`group relative overflow-hidden ${i === 0 ? "" : "border-t"}`}
                  style={i === 0 ? undefined : { borderColor: "var(--color-line)" }}
                >
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-[var(--duration-base)] group-hover:scale-y-100 group-hover:opacity-100"
                    style={{ background: "var(--color-surface-1)" }}
                  />
                  <div className="relative grid gap-x-8 gap-y-2 py-7 md:grid-cols-[auto_minmax(0,14ch)_1fr] md:items-baseline">
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-body)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {d.n}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h3)",
                        lineHeight: "var(--leading-h3)",
                        color: "var(--color-text)",
                      }}
                    >
                      {d.title}
                    </h2>
                    <p
                      className="max-w-[54ch]"
                      style={{
                        fontSize: "var(--text-body-l)",
                        lineHeight: "var(--leading-body-l)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Reveal>

      {/* How I got here: the arc as a phase timeline with a marker rail. */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="standard">
            <p style={eyebrow}>How I got here</p>
            <div className="mt-10">
              {timeline.map((t, i) => (
                <div
                  key={t.phase}
                  className="grid gap-x-10 md:grid-cols-[minmax(0,200px)_1fr]"
                >
                  {/* Phase + year, the rail label. */}
                  <div className="flex items-start gap-4 pb-2 md:pb-10">
                    <span
                      aria-hidden
                      className="mt-[10px] shrink-0"
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "999px",
                        background: "var(--color-accent)",
                      }}
                    />
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-h3)",
                          lineHeight: "var(--leading-h3)",
                          color: "var(--color-text)",
                        }}
                      >
                        {t.phase}
                      </h3>
                      <p
                        className="mt-1"
                        style={{
                          fontSize: "var(--text-small)",
                          color: "var(--color-text-subtle)",
                        }}
                      >
                        {t.when}
                      </p>
                    </div>
                  </div>

                  {/* Narrative, with a connecting line on desktop except the last. */}
                  <div
                    className={`pl-8 md:pl-0 ${i === timeline.length - 1 ? "pb-0" : "pb-10"} ${
                      i === timeline.length - 1 ? "" : "md:border-l"
                    }`}
                    style={
                      i === timeline.length - 1
                        ? undefined
                        : { borderColor: "var(--color-line)" }
                    }
                  >
                    <p
                      className="md:pl-10 max-w-[62ch]"
                      style={{
                        fontSize: "var(--text-body-l)",
                        lineHeight: "var(--leading-body-l)",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {t.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Reveal>

      {/* Off the clock: the personal beat, broken into labelled micro-blocks. */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="standard">
            <p style={eyebrow}>Off the clock</p>
            <p
              className="mt-6 mb-10 max-w-[46ch]"
              style={{
                fontSize: "var(--text-lead)",
                lineHeight: "var(--leading-lead)",
                color: "var(--color-text)",
              }}
            >
              First, the part that has nothing to do with work.
            </p>
            <div className="grid gap-10 md:grid-cols-3">
              {offClock.map((o) => (
                <div key={o.label}>
                  <p
                    className="pb-3 mb-4 border-b"
                    style={{ ...eyebrow, color: "var(--color-text-subtle)", borderColor: "var(--color-line)" }}
                  >
                    {o.label}
                  </p>
                  <p
                    style={{
                      fontSize: "var(--text-body-l)",
                      lineHeight: "var(--leading-body-l)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {o.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Reveal>

      <ContactCTA />
    </div>
  );
}

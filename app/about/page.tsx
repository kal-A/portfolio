import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";
import ContactCTA from "@/components/ContactCTA";

export const metadata = { title: "About · Kamal Ahsan" };

/**
 * Rewritten 2026-08-31 to be a tight synopsis rather than an expository,
 * list-heavy page (user feedback: "a good to the point synopsis and story
 * is much better than an overly wordy page"). The old four-chapter layout
 * plus process-steps list and capabilities grid were cut. Structure now:
 * a one-line hook, a personal beat moved high on the page, then the actual
 * arc, pushed back to where it really starts (high school), not a recent
 * project. Every fact traces to real work already on /work or GitHub.
 */
export default function AboutPage() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      {/* Intro */}
      <div className="pt-10 pb-12">
        <Container variant="reading">
          <p
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            About
          </p>
          <h1
            className="mt-3"
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
            className="mt-8"
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
        </Container>
      </div>

      {/* Personal beat, kept high on the page on purpose */}
      <Reveal>
        <div className="py-12 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="reading">
            <p
              style={{
                fontSize: "var(--text-body-l)",
                lineHeight: "var(--leading-body-l)",
                color: "var(--color-text-muted)",
              }}
            >
              First, the part that has nothing to do with work: I read a lot of history, mostly for
              the cause and effect of it, how one quiet decision in one decade sets up the crisis in
              the next. (Occupational hazard, apparently. I do the same thing with workflows.) I
              watch more soccer and hockey than I can strictly justify and will happily argue about
              either. And I care more than is reasonable about how things are cut and put together,
              so I follow fashion closely.
            </p>
          </Container>
        </div>
      </Reveal>

      {/* The arc */}
      <Reveal>
        <div className="py-12 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="reading">
            <h2
              className="mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-h2)",
                color: "var(--color-text)",
              }}
            >
              How I got here
            </h2>
            <div
              className="space-y-5"
              style={{
                fontSize: "var(--text-body-l)",
                lineHeight: "var(--leading-body-l)",
                color: "var(--color-text-muted)",
              }}
            >
              <p>
                It started in high school: the basics, a lot of data structures and algorithms,
                and a stretch teaching younger kids to code at camps. What actually taught me,
                though, was building things I wanted to exist, from small games and Discord bots
                to a COVID case tracker I put together when lockdown hit.
              </p>
              <p>
                University turned that into a direction. I started in frontend, which is quietly
                where I got my eye for design: enough time spent on how something looked and felt
                that I started caring about it properly.
              </p>
              <p>
                Co-ops and a few good mentors pulled me toward product, and I never put the design
                down along the way. Each work term added a layer, from research, to systems, to
                owning how the work itself got run.
              </p>
              <p>
                That is roughly where I am now, in technical product and workflows. I like holding
                the strategy of a project and its smallest details at the same time, and I am
                usually the one asking what is actually happening underneath a screen before anyone
                designs it.
              </p>
            </div>
          </Container>
        </div>
      </Reveal>
      <ContactCTA />
    </div>
  );
}

import Container from "@/components/layout/Container";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About · Kamal Ahsan" };

/**
 * Full redesign, decision of record 2026-08-19. Replaces a generic
 * intro-paragraph + skills-tag-wall page with four chapters (intro,
 * throughline, process, capabilities) built around the same "fragmented ->
 * clear" throughline the homepage argues with projects. Every claim below
 * is backed by a real, named project already documented in
 * lib/content/case-studies.ts — nothing here is a new fact.
 *
 * Visual pacing varies measure and density on purpose: the intro and
 * throughline sit in the narrow "reading" column (760px) for an intimate,
 * one-idea-at-a-time register; the capability pairs in chapter four widen
 * to "standard" because a 2x2 grid needs the room. The pull-quote in
 * chapter two reuses the exact accent-left-border treatment built for
 * RoomEase's homepage stat, on purpose, not a new device.
 */
export default function AboutPage() {
  return (
    <div className="pb-20" style={{ background: "var(--color-bg)" }}>
      {/* Chapter 1: introduction */}
      <div className="pt-10 pb-14">
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
            I started out writing code, then kept following each problem upstream: into
            design, and then into how the work itself gets run.
          </p>
          <p
            className="mt-5"
            style={{
              fontSize: "var(--text-body-l)",
              lineHeight: "var(--leading-body-l)",
              color: "var(--color-text-muted)",
            }}
          >
            I studied Management Engineering at the University of Waterloo, which is a co-op
            degree, so every role below happened between study terms, while I was still an
            undergrad, and not after graduating. Alternating school and work every four months
            meant I got to try on a different hat each time: I shipped code, then designed the
            product that code was for, then ended up owning the messy process that decided
            whether any of it went out on time.
          </p>
        </Container>
      </div>

      {/* Chapter 2: how I ended up working this way */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
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
              How I ended up working this way
            </h2>
            <div
              className="space-y-5"
              style={{ fontSize: "var(--text-body-l)", lineHeight: "var(--leading-body-l)", color: "var(--color-text-muted)" }}
            >
              <p>
                I came in through engineering, so I started where I was most comfortable:
                writing code, and treating a product as a system to be built correctly.
                Chronicle is the clearest artifact of that stretch, an 8-stage pipeline I built
                solo, typed contracts and 500-plus tests included.
              </p>
              <p>
                Design pulled me in next. Once you have watched someone struggle with a screen
                you were proud of, you cannot unlearn that a working system and a usable one are
                two different things. RoomEase, Pill Pal, and Hera&apos;s financing flow were
                where I learned to close that gap on purpose, with real testing instead of taste.
              </p>
              <p>
                Product and operations came last, almost by accident. At Greenhouse and ForceN I
                kept running into the same realization: the interface problem in front of me
                usually was not the real problem.
              </p>
            </div>

            <div
              className="mt-7 pl-4 border-l-2"
              style={{ borderColor: "var(--color-accent)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h3)",
                  lineHeight: "var(--leading-h3)",
                  color: "var(--color-text)",
                }}
              >
                They start upstream: an unclear owner, a step nobody double-checked, or
                information that only lived in one person&apos;s inbox.
              </p>
            </div>

            <div
              className="mt-7 space-y-5"
              style={{ fontSize: "var(--text-body-l)", lineHeight: "var(--leading-body-l)", color: "var(--color-text-muted)" }}
            >
              <p>
                At ForceN, a hardware transfer process kept breaking down, not because any single
                step was hard, but because no one owned the handoff between teams. At Greenhouse,
                campaign work was slipping for a similar reason: design, marketing, and
                fulfillment were pulling from different timelines, so fixing the sprint cadence
                did more than any single redesign would have.
              </p>
              <p>
                So now I work backwards from there. Before I design a screen or write a
                requirement, I go find out what is actually happening underneath it. That
                instinct is the one thread connecting a Python pipeline, a usability test, and a
                shared tracking sheet: the same question every time, just a different tool for
                the answer.
              </p>
            </div>
          </Container>
        </div>
      </Reveal>

      {/* Chapter 3: how I work */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
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
              How I work
            </h2>
            <div className="flex flex-col">
              {processSteps.map((step) => (
                <div
                  key={step.lead}
                  className="border-t"
                  style={{ borderColor: "var(--color-line)", paddingTop: "var(--space-5)", paddingBottom: "var(--space-5)" }}
                >
                  <p style={{ fontSize: "var(--text-body-l)", lineHeight: "var(--leading-body-l)", color: "var(--color-text-muted)" }}>
                    <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{step.lead} </span>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Reveal>

      {/* Chapter 4: what I bring to a team */}
      <Reveal>
        <div className="py-14 border-t" style={{ borderColor: "var(--color-line)" }}>
          <Container variant="standard">
            <h2
              className="mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                lineHeight: "var(--leading-h2)",
                color: "var(--color-text)",
              }}
            >
              What I bring to a team
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-9">
              {capabilities.map((cap) => (
                <div key={cap.title}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h3)",
                      lineHeight: "var(--leading-h3)",
                      color: "var(--color-text)",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", color: "var(--color-text-muted)" }}
                  >
                    {cap.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </Reveal>

      {/* Closing note: small and personal, but written with a real voice
          rather than a robotic "fun facts" list. Interests are history (for
          the cause-and-effect of it), soccer and hockey, and fashion.
          Present-day geopolitics and architecture were dropped at the user's
          request; the history line is deliberately tied back to how he reads
          workflows, so it reads as a real person, not a bio template. */}
      <Container variant="reading" className="mt-8">
        <p style={{ fontSize: "var(--text-body)", lineHeight: "var(--leading-body-l)", color: "var(--color-text-muted)" }}>
          Away from all of this, I read a lot of history, mostly for the cause and effect of it:
          how one quiet decision in one decade sets up the crisis in the next. (Occupational
          hazard, apparently. I do the same thing with workflows.) I watch more soccer and hockey
          than I can strictly justify and will happily argue about either. And I care more than
          is reasonable about how things are cut and put together, so I follow fashion closely.
        </p>
      </Container>
    </div>
  );
}

const processSteps: { lead: string; body: string }[] = [
  {
    lead: "Find out what is actually happening.",
    body: "At PathPeer, that meant watching real Hotjar recordings instead of guessing why engagement had stalled.",
  },
  {
    lead: "See where people, information, or ownership actually break down.",
    body: "34 different departments at Waterloo each ran their own room-booking process, with no shared way to compare what a room actually offered. That was RoomEase's starting point, not a feature list.",
  },
  {
    lead: "Decide what is actually worth changing.",
    body: "Not everything is. Price-range filtering for Hera's clinic search stayed flagged as an open question instead of shipped half-working, because the underlying pricing data was not solid enough yet.",
  },
  {
    lead: "Pick the right kind of fix.",
    body: "A redesigned form, sometimes. A shared tracking sheet, or a documented process nobody had written down, other times.",
  },
  {
    lead: "Test it against something real.",
    body: "RoomEase's usability score moved from 50% to 88% because the prototype was tested against the process it was meant to replace, not because it looked better in Figma.",
  },
];

const capabilities: { title: string; body: string }[] = [
  {
    title: "Product judgment",
    body: "Knowing what is worth building now, and what can wait. At PathPeer, that meant using Google Analytics and Hotjar together to separate a real mentor-fit gap from a simple discoverability problem, before building anything.",
  },
  {
    title: "Systems and process thinking",
    body: "Treating a workflow as one connected system, not a series of separate steps. At ForceN, that meant mapping the full procurement-to-shipment handoff for 14+ hardware units before touching any single stage of it.",
  },
  {
    title: "UX and design craft",
    body: "Getting from a real constraint to something people can actually use. At Pill Pal, that meant running cognitive walkthroughs from an older adult's perspective before a single prototype screen existed, then stress-testing the result with four outside evaluators.",
  },
  {
    title: "Technical fluency",
    body: "Enough real implementation experience to know what a design costs to build. Chronicle is a solo-built AI-systems project: an 8-stage Python pipeline, typed contracts shared between Python and TypeScript, and 500+ automated tests.",
  },
];

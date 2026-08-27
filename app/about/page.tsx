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
            I studied Management Engineering at the University of Waterloo.
          </p>
          <p
            className="mt-5"
            style={{
              fontSize: "var(--text-body-l)",
              lineHeight: "var(--leading-body-l)",
              color: "var(--color-text-muted)",
            }}
          >
            Since then my work has moved between product design, operations, and engineering:
            designing the financing and clinic-discovery flow at Hera Fertility, running
            sprints for an eight-person team at Greenhouse, and owning a hardware transfer
            workflow from procurement through shipment at ForceN. I&apos;ve run usability tests
            and I&apos;ve written the code behind the feature being tested, often on the same
            project.
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
                My background is in engineering, so I started out comfortable with systems,
                constraints, and the technical side of building something. Working in UX and
                product design taught me that a working system and a usable one are not the same
                thing. Working in product operations taught me something else: a lot of interface
                problems are not really interface problems.
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
                That is roughly how I ended up working the way I do now. Before I design a screen
                or write a requirement, I try to find out what is actually happening underneath
                it.
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

      {/* Closing note: small, quiet, not a "fun facts" section. Decision of
          record 2026-08-19: present-day geopolitics removed (not a real
          interest); the professional tie-back to Chronicle and the
          self-deprecating "more useful than my degree" line were both cut
          as manufactured-sounding personal-brand copy the user flagged. */}
      <Container variant="reading" className="mt-8">
        <p style={{ fontSize: "var(--text-small)", lineHeight: "var(--leading-body)", color: "var(--color-text-subtle)" }}>
          Outside of work, I read a lot of history, especially the geopolitics of earlier eras.
          I follow soccer and hockey, and I pay close attention to architecture and fashion.
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

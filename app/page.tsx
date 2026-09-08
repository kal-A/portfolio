import Link from "next/link";
import { caseStudies } from "@/lib/content/case-studies";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import Container from "@/components/layout/Container";
import ProjectIndexItem, { ProjectIndexItemPrimitive } from "@/components/ui/ProjectIndexItem";
import AdditionalExperience from "@/components/AdditionalExperience";
import ContactCTA from "@/components/ContactCTA";

/**
 * Featured set and ordering, decision of record 2026-08-19 (visual +
 * narrative architecture pass, superseding the 2026-08-19 proof-map
 * confirmation above it). Deliberate narrative progression, not a quality
 * ranking:
 *
 *   1. ForceN — professional credibility first. Paid, most recent, systems/
 *      ops ownership. Leads specifically so the homepage doesn't open on a
 *      university capstone and risk implying that's the most significant
 *      work here.
 *   2. RoomEase — product methodology/evidence. The only fully measured
 *      UX outcome in the set (50% -> 88% usability, controlled testing).
 *   3. Greenhouse — visual/commercial range. The only shipped visual-craft
 *      evidence; shows breadth beyond systems and research.
 *   4. Chronicle — technical curiosity. The only independent AI/systems
 *      build; closes the list on initiative rather than a resume line.
 *
 * PathPeer moved to AdditionalExperience — real, paid work, but the most
 * conceptually adjacent to RoomEase (both are "behavioral evidence ->
 * fixes") of anything cut, and the oldest (2022) of the five internships.
 * Still fully present on /work and via AdditionalExperience's link.
 *
 * Each row's `primitive` and evidence prop follow
 * docs/redesign/06-component-system.md via ProjectIndexItem's doc comment:
 * composition matches what kind of evidence each project actually has,
 * rather than every row getting the same treatment.
 */
const featuredOrder: {
  slug: string;
  primitive: ProjectIndexItemPrimitive;
}[] = [
  { slug: "forcen", primitive: "narrative" },
  { slug: "roomease", primitive: "balanced" },
  { slug: "greenhouse", primitive: "artifact" },
  { slug: "chronicle", primitive: "narrative" },
];

const featured = featuredOrder
  .map(({ slug, primitive }) => {
    const cs = caseStudies.find((c) => c.slug === slug);
    return cs ? { cs, primitive } : undefined;
  })
  .filter((entry): entry is { cs: NonNullable<typeof entry>["cs"]; primitive: ProjectIndexItemPrimitive } =>
    Boolean(entry)
  );

function yearOf(timeframe: string) {
  const matches = timeframe.match(/\d{4}/g);
  return matches ? matches[matches.length - 1] : timeframe;
}

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Content plane: opaque and stacked above the hero so, as the hero
          recedes on scroll (HeroReveal), this whole block slides up and over
          it instead of hard-cutting. Its own background prevents the receding
          hero from showing through the transparent sections. */}
      <div className="relative z-10" style={{ background: "var(--color-bg)" }}>
      {/* Selected work: editorial index, not an equal-card grid.
          06-component-system.md's "Project index item", selected variant,
          composed via ProjectIndexItem's narrative/balanced/artifact
          primitive system (see comment above and on the component itself). */}
      <Container variant="standard" className="pt-[var(--space-7)] pb-[var(--space-7)]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h1)",
                lineHeight: "var(--leading-h1)",
                color: "var(--color-text)",
              }}
            >
              Selected work
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              style={{
                fontSize: "var(--text-label)",
                letterSpacing: "var(--tracking-label)",
                textTransform: "uppercase",
                color: "var(--color-text-subtle)",
              }}
            >
              <span className="transition-colors duration-300 group-hover:text-[color:var(--color-text)]">
                All work
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
                style={{ color: "var(--color-accent)" }}
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
        <div className="mt-8 flex flex-col">
          {featured.map(({ cs, primitive }, i) => {
            // RoomEase (balanced): one headline stat carries the persuasion.
            const stat = cs.slug === "roomease" ? cs.metrics[0] : undefined;
            // ForceN and Chronicle (narrative): quiet supporting facts —
            // ownership/coordination scale for ForceN, build depth for
            // Chronicle. Greenhouse (artifact) gets neither; its shipped
            // creative is the evidence.
            const facts =
              cs.slug === "forcen"
                ? cs.metrics
                : cs.slug === "chronicle"
                  ? cs.metrics.filter((m) => m.label.includes("pipeline") || m.label.includes("tests"))
                  : undefined;

            return (
              <Reveal key={cs.slug} delay={i * 90}>
                <ProjectIndexItem
                  number={String(i + 1).padStart(2, "0")}
                  title={cs.title}
                  description={cs.oneLiner}
                  meta={`${cs.role} · ${yearOf(cs.timeframe)}`}
                  href={`/work/${cs.slug}`}
                  variant="selected"
                  image={cs.heroMedia}
                  primitive={primitive}
                  stat={stat}
                  facts={facts}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* Additional experience: quiet, compact, deliberately not a second
          Selected Work. See AdditionalExperience.tsx's doc comment. */}
      <Container variant="standard" className="pt-[var(--space-7)] pb-[var(--space-8)]">
        <Reveal>
          <p
            style={{
              fontSize: "var(--text-label)",
              letterSpacing: "var(--tracking-label)",
              textTransform: "uppercase",
              color: "var(--color-text-subtle)",
            }}
          >
            Additional experience
          </p>
        </Reveal>
        <div className="mt-6">
          <AdditionalExperience />
        </div>
      </Container>

      {/* Closing contact CTA: the shared ContactCTA used sitewide (replaces
          this page's former one-off "Let's connect" block and the standalone
          /contact route). */}
      <Reveal>
        <ContactCTA />
      </Reveal>
      </div>
    </div>
  );
}

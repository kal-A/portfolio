import Link from "next/link";
import type { ReactNode } from "react";
import MediaFrame from "@/components/ui/MediaFrame";

/**
 * docs/redesign/06-component-system.md "Project index item": one generous
 * editorial row, not a grid of small equal cards. Required content: title,
 * one-line problem/outcome, role/category + year, purposeful thumbnail or
 * media, and one semantic link — here the entire row *is* the link, so
 * there is exactly one.
 *
 * `variant` changes density/type scale only (selected = homepage, spacious;
 * complete = /work, denser) per decision of record 2026-08-18 — both share
 * the same information hierarchy.
 *
 * `number` is optional (decision of record 2026-08-19): the homepage's
 * curated-argument rows pass one, /work's archive rows omit it — sequential
 * numbering is a homepage-only device, not a general row feature. Omitting
 * it collapses the leading grid column entirely rather than leaving a gap.
 *
 * `primitive` is the homepage Selected Work composition system. Decision of
 * record 2026-08-19 ("final visual calibration" pass): all four Selected
 * Work rows now share ONE media footprint — same max-width tier, same
 * aspect-[4/3] frame, same border/radius (via MediaFrame), same vertical
 * (items-center) relationship to the text block. An earlier version scaled
 * the frame per primitive (artifact largest, narrative smallest), which
 * made the section read as four differently-designed rows instead of one
 * authored system. The frame is now fixed; only three things still vary
 * per primitive, which is the "four different types of proof" the frame
 * is meant to hold:
 *
 *   - "narrative": text leads, artifact trails (ForceN, Chronicle) — for
 *     projects whose real evidence is process/ownership facts or technical
 *     depth, not imagery.
 *   - "balanced": artifact beside a single headline stat (`stat`) that does
 *     most of the persuading (RoomEase).
 *   - "artifact": the artifact leads (rendered first) — because the
 *     shipped visual work itself is the evidence (Greenhouse). No evidence
 *     prop needed. Still the SAME frame size as the other two now, not a
 *     larger one — object-position (set per asset in case-studies.ts) does
 *     the work of showing the right region of a wide source image inside
 *     that fixed frame, rather than growing the frame to fit the source.
 *
 * `stat` (one headline figure) and `facts` (a few smaller supporting
 * figures) are alternate evidence registers, not decoration — pass at most
 * one of them. Omitting both (Greenhouse) is correct when the artifact
 * itself is the proof.
 *
 * Leaving `primitive` unset (used by /work) renders a single, denser row.
 * Decision of record 2026-08-19: the row spans the container's full width
 * (no artificial cap) via a three-column grid — text column (bounded to a
 * readable measure), a flexible gutter, then an end-anchored thumbnail —
 * so the archive visibly occupies the page instead of the whole block
 * sitting pinned to the left of a much wider container. See gridColsClass.
 */
export type ProjectIndexItemVariant = "selected" | "complete";
export type ProjectIndexItemPrimitive = "narrative" | "balanced" | "artifact";

interface EvidenceFigure {
  value: string;
  label: string;
}

interface RowImage {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "top" — set deliberately per asset, not left centered by default. */
  position?: string;
}

function NarrativeBlock({
  title,
  meta,
  description,
  spacious,
  evidence,
}: {
  title: string;
  meta: string;
  description: string;
  spacious: boolean;
  evidence?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3
          className="underline-offset-4 decoration-[var(--color-line-strong)] group-hover:underline"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: spacious ? "var(--text-h2)" : "var(--text-h3)",
            lineHeight: spacious ? "var(--leading-h2)" : "var(--leading-h3)",
            color: "var(--color-text)",
          }}
        >
          {title}
        </h3>
        <span
          className="shrink-0 max-w-full"
          style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}
        >
          {meta}
        </span>
      </div>
      <p
        className="mt-2 max-w-[65ch]"
        style={{
          fontSize: spacious ? "var(--text-body-l)" : "var(--text-body)",
          lineHeight: spacious ? "var(--leading-body-l)" : "var(--leading-body)",
          color: "var(--color-text-muted)",
        }}
      >
        {description}
      </p>
      {evidence}
    </div>
  );
}

export default function ProjectIndexItem({
  number,
  title,
  description,
  meta,
  href,
  variant = "selected",
  image,
  primitive,
  stat,
  facts,
}: {
  number?: string;
  title: string;
  description: string;
  meta: string;
  href: string;
  variant?: ProjectIndexItemVariant;
  image?: RowImage;
  primitive?: ProjectIndexItemPrimitive;
  /** One headline figure — the "balanced" primitive's pull-quote. */
  stat?: EvidenceFigure;
  /** A few smaller supporting figures — the "narrative" primitive's quiet chips. */
  facts?: EvidenceFigure[];
}) {
  const spacious = variant === "selected";
  const artifactLeads = primitive === "artifact";

  // One shared frame tier for all three homepage primitives (decision of
  // record 2026-08-19) — the frame is the system, so it no longer varies
  // by which primitive a project uses. /work (no primitive) keeps its own,
  // smaller "recognition, not storytelling" tier, now enlarged slightly and
  // end-anchored via gridColsClass's three-column grid below.
  const imageWidthClass = primitive
    ? "w-full md:w-[42%] lg:w-[40%]"
    : spacious
      ? "w-full md:w-40 lg:w-48"
      : "w-full md:w-48 lg:w-56";

  const imageSizes = primitive
    ? "(min-width: 1024px) 460px, (min-width: 768px) 380px, 100vw"
    : spacious
      ? "(min-width: 1024px) 192px, (min-width: 768px) 160px, 100vw"
      : "(min-width: 1024px) 224px, (min-width: 768px) 176px, 100vw";

  const evidence = stat ? (
    <div
      className="mt-5 pl-4 border-l-2"
      style={{ borderColor: "var(--color-accent)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h2)",
          lineHeight: 1.05,
          color: "var(--color-text)",
        }}
      >
        {stat.value}
      </p>
      <p className="mt-1" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
        {stat.label}
      </p>
    </div>
  ) : facts && facts.length > 0 ? (
    <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2">
      {facts.map((fact) => (
        <div key={fact.label}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h3)",
              color: "var(--color-text)",
            }}
          >
            {fact.value}
          </span>
          <span className="ml-2" style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}>
            {fact.label}
          </span>
        </div>
      ))}
    </div>
  ) : undefined;

  // /work's archive rows (no number, no primitive) use a real 3-column
  // grid instead of a capped-width 2-column one (decision of record
  // 2026-08-19, "fix the left-heavy archive composition"). A prior pass
  // fixed the text-to-thumbnail gap by capping the whole row to 840px, but
  // that just moved the dead space outside the row: the row sat pinned to
  // the left of the full container, and the archive read as accidentally
  // narrow rather than composed. Instead, the text column is bounded to a
  // real reading measure (minmax(0, 60ch) — shrinks under pressure, never
  // overflows), the middle track is a flexible gutter that absorbs
  // whatever width is left, and the thumbnail is explicitly placed in the
  // third column so it anchors to the row's — and the page's — right edge.
  // The row itself spans the full container width, so the gutter grows
  // instead of the whole block just stopping.
  const gridColsClass = !number
    ? primitive
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-[minmax(0,60ch)_1fr_auto]"
    : primitive
      ? "grid-cols-[auto_1fr]"
      : "grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto]";

  return (
    <Link
      href={href}
      className={`group grid items-baseline md:items-center gap-x-6 sm:gap-x-8 border-t focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${gridColsClass}`}
      style={{
        borderColor: "var(--color-line)",
        paddingTop: spacious ? "var(--space-7)" : "var(--space-6)",
        paddingBottom: spacious ? "var(--space-7)" : "var(--space-6)",
      }}
    >
      {number && (
        <span
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: spacious ? "var(--text-h1)" : "var(--text-h2)",
            lineHeight: 1,
            color: "var(--color-text-subtle)",
          }}
        >
          {number}
        </span>
      )}

      {primitive ? (
        <div className="min-w-0 flex flex-col md:flex-row md:items-center gap-6 md:gap-8 lg:gap-10">
          <div className={`min-w-0 flex-1 ${artifactLeads ? "order-2" : "order-1"}`}>
            <NarrativeBlock
              title={title}
              meta={meta}
              description={description}
              spacious={spacious}
              evidence={evidence}
            />
          </div>
          {image && (
            <MediaFrame
              src={image.src}
              alt={image.alt}
              objectPosition={image.position}
              sizes={imageSizes}
              hoverReveal
              className={`aspect-[4/3] shrink-0 ${imageWidthClass} ${artifactLeads ? "order-1" : "order-2"}`}
            />
          )}
        </div>
      ) : (
        <>
          <NarrativeBlock title={title} meta={meta} description={description} spacious={spacious} />
          {image && (
            <MediaFrame
              src={image.src}
              alt={image.alt}
              objectPosition={image.position}
              sizes={imageSizes}
              className={`aspect-[4/3] mt-4 md:mt-0 ${number ? "col-span-2 md:col-span-1" : "md:col-start-3"} shrink-0 ${imageWidthClass}`}
            />
          )}
        </>
      )}
    </Link>
  );
}

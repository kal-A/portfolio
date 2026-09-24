import type { CSSProperties } from "react";
import MediaFrame from "@/components/ui/MediaFrame";

/**
 * One captioned figure grammar shared by the image-led case studies
 * (UWMSA, Cities of East). It exists so every screenshot and map on those
 * pages sits in the SAME frame, radius, hover, and caption treatment — a
 * gallery of figures that don't share a baseline reads as broken, so the
 * frame is the system and only the aspect and caption vary per asset.
 *
 * `aspect` is a Tailwind aspect utility chosen per role, not a global
 * default: phone screens carry their own device chrome and must not be
 * cropped, so they pass their exact source ratio (object-cover then fits
 * perfectly with no loss); wide maps and context shots take a landscape
 * ratio and may crop, which is why `parallax` (a subtle scroll drift that
 * needs the crop's headroom) is opt-in and off for phones.
 *
 * `interactive` (on by default) makes the frame lift with an accent border
 * on hover/focus — the same tactile "this was built, not dropped in"
 * feedback the rest of the page's real controls give, so a static figure
 * never feels inert next to them.
 */
export default function CaptionedMedia({
  src,
  alt,
  sizes,
  aspect = "aspect-[16/10]",
  objectPosition = "center",
  priority = false,
  parallax = false,
  interactive = true,
  label,
  caption,
  className = "",
  frameClassName = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  aspect?: string;
  objectPosition?: string;
  priority?: boolean;
  parallax?: boolean;
  interactive?: boolean;
  /** Small accent eyebrow above the caption, e.g. "Before" / "Climate". */
  label?: string;
  caption?: string;
  className?: string;
  frameClassName?: string;
}) {
  const labelStyle: CSSProperties = {
    fontSize: "var(--text-label)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: "var(--accent-bright, var(--color-project-accent))",
  };

  return (
    <figure className={className}>
      <MediaFrame
        src={src}
        alt={alt}
        sizes={sizes}
        objectPosition={objectPosition}
        priority={priority}
        parallax={parallax}
        interactive={interactive}
        className={`${aspect} ${frameClassName}`}
      />
      {(label || caption) && (
        <figcaption className="mt-3 flex flex-col gap-1">
          {label && <span style={labelStyle}>{label}</span>}
          {caption && (
            <span
              style={{
                fontSize: "var(--text-small)",
                lineHeight: "var(--leading-body)",
                color: "var(--color-text-muted)",
              }}
            >
              {caption}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

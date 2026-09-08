"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { registerParallax } from "@/components/ui/mediaParallax";

/**
 * The one media grammar shared by every project thumbnail on the site
 * (homepage Selected Work, /work archive) — decision of record 2026-08-19,
 * "Selected Work media consistency" pass. A single component, not per-page
 * copies, so border/radius, aspect handling, loading behavior, and failure
 * behavior can't drift between the homepage and /work again.
 *
 * NOT desaturated by default anywhere except where `hoverReveal` opts in.
 * `hoverReveal` (decision of record 2026-08-20) restores a grayscale-to-
 * color transition for the homepage's four Selected Work rows specifically
 * — but only on real hover-capable pointers (`@media (hover: hover) and
 * (pointer: fine)`, defined in globals.css). On touch/mobile the rule
 * simply doesn't apply, so those images always render in full color: real
 * evidence (Greenhouse's brand color, RoomEase's UI color) can never be
 * gated behind a hover a visitor has no way to trigger. /work's archive
 * rows leave `hoverReveal` unset and stay full-color-at-rest, as before.
 *
 * `objectPosition` is per-image, not a single global default, because a
 * fixed aspect-[4/3] crop needs a different anchor per artifact (e.g. a
 * screenshot's meaningful content sitting nearer the top). Callers should
 * set it deliberately per asset, not leave every crop centered by default.
 *
 * Failure behavior: an `onError`'d image swaps to a quiet labeled
 * placeholder (the alt text, at small/subtle type) instead of a broken-
 * image icon or an empty frame — this component owns that fallback so no
 * caller can ship a silently blank media slot again.
 */
export default function MediaFrame({
  src,
  alt,
  sizes,
  className = "",
  objectPosition = "center",
  priority,
  hoverReveal = false,
  interactive = false,
  parallax = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
  /** Grayscale-at-rest, full color on hover/focus — hover-capable desktop only. See doc comment. */
  hoverReveal?: boolean;
  /** Opt-in hover "pop": makes the frame its own hover group so the built-in
   *  image zoom fires, and lifts it with an accent border + shadow. Off by
   *  default so callers that already sit inside a `.group` (Selected Work,
   *  /work) keep their existing behaviour. */
  interactive?: boolean;
  /** Opt-in scroll parallax: the image drifts vertically within its frame as
   *  the frame travels through the viewport (see mediaParallax). Off by
   *  default; a no-op under reduced motion. */
  parallax?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || failed) return;
    const el = parallaxRef.current;
    if (!el) return;
    return registerParallax(el);
  }, [parallax, failed]);

  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      style={{ objectPosition }}
      className="object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03]"
    />
  );

  return (
    <div
      className={`relative overflow-hidden ${hoverReveal ? "hover-reveal-media" : ""} ${
        interactive
          ? "group transition-all duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-[var(--accent-bright,var(--color-project-accent))] hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          : ""
      } ${className}`}
      style={{
        borderRadius: "var(--radius-default)",
        border: "1px solid var(--color-line)",
        background: "var(--color-surface-1)",
      }}
    >
      {!failed ? (
        parallax ? (
          // Oversized inner wrapper so the image has room to drift vertically
          // without exposing a frame edge; the translate is driven by
          // --parallax-y (see mediaParallax), which stays 0 until the scroll
          // loop runs, so the resting state is a centered, fully covering crop.
          <div
            ref={parallaxRef}
            className="absolute will-change-transform"
            style={{
              top: "-9%",
              bottom: "-9%",
              left: 0,
              right: 0,
              transform: "translate3d(0, var(--parallax-y, 0%), 0)",
            }}
          >
            {image}
          </div>
        ) : (
          image
        )
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center px-4 text-center"
          style={{ fontSize: "var(--text-small)", color: "var(--color-text-subtle)" }}
        >
          {alt}
        </div>
      )}
    </div>
  );
}

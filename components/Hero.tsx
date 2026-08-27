import Image from "next/image";
import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";

/**
 * FINAL hero atmosphere + contour assets (implemented 2026-08-25, approved
 * direction — see docs/redesign/CURRENT-HANDOFF.md). Hero copy is still
 * the pending placeholder text awaiting separate approval — this pass
 * only replaces the visual layers, not the words.
 *
 * Layer order (docs/redesign/04-hero-system.md's five independent layers):
 *   1. near-black stage field  -> this <section>'s own background
 *   2. atmosphere raster       -> first aria-hidden absolute div, real PNG
 *   3. subtle vignette/light   -> second aria-hidden absolute div
 *   4. SVG contour             -> CSS mask (public/hero/portfolio-hero-contour-v5.svg)
 *      recolored via background-color on a masked div, not an inline
 *      <svg><path>, so the reveal-sweep mask (layer below) and the shape
 *      mask compose as two nested elements instead of one — the file's
 *      own vector geometry is never touched or re-traced.
 *   5. semantic content        -> the z-10 content block, DOM-first
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)", minHeight: "clamp(520px, 78vh, 760px)" }}
    >
      {/* Layer 2: atmosphere raster. hero-atmosphere carries the optional
          1200-1500ms light bloom (04-hero-system.md's motion table) — a
          3-5% brightness lift, once, after the contour has settled. The
          image itself already carries the quiet near-black left side
          (behind the text) fading into restrained warm fog toward the
          right (behind the figure) — cover+center reproduces that
          composition at any hero aspect ratio without distorting it. */}
      <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0">
        <Image
          src="/hero/portfolio-hero-atmosphere-final.png"
          alt=""
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Layer 3: optional, extremely subtle vignette (PLACEHOLDER, decorative) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, transparent 55%, rgba(0,0,0,0.32) 100%)",
        }}
      />

      <Container
        variant="page"
        className="relative z-10 flex flex-col lg:flex-row lg:justify-between items-center gap-12 lg:gap-16 py-[clamp(64px,12vh,120px)]"
      >
        {/* Layer 5: semantic content — renders immediately, no client JS,
            no animation. This is the DOM's first child of the row, so it is
            also visually first at every breakpoint (content-first at
            compact, text-left at large via flex-row). */}
        <div className="max-w-[52ch]">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-l)",
              lineHeight: "var(--leading-display-l)",
              color: "var(--color-text)",
            }}
          >
            I take what&apos;s fragmented{" "}
            <span style={{ color: "var(--color-accent)" }}>and give it structure.</span>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "var(--text-lead)",
              lineHeight: "var(--leading-lead)",
              color: "var(--color-text-muted)",
              maxWidth: "var(--measure-lead)",
            }}
          >
            At ForceN, that meant owning a hardware transfer workflow end to end. At
            RoomEase, it meant taking a booking process spread across 34 different
            websites and testing it into an 88%-usable system.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Action href="/work">View case studies</Action>
            <Action href="/resume" variant="secondary">
              See resume
            </Action>
          </div>
        </div>

        {/* Layer 4: SVG contour, approved v5 geometry (three-quarter-back,
            facing inward, adjusting glasses, coat sweeping right) —
            public/hero/portfolio-hero-contour-v5.svg, used ONLY as a CSS
            mask shape, never re-rasterized or re-traced. Two nested
            elements split the two concerns the original placeholder's
            single <svg><path> combined: hero-contour-mask (unchanged
            class, unchanged sweep-reveal CSS below) still does the
            fog-reveal sweep; the inner div's own mask defines WHICH
            pixels are the figure, filled with the warm-ivory accent
            color so recoloring never touches the source file. Width
            hits the requested ~28-34% desktop stage-width range;
            self-end grounds the figure at the stage floor at every
            breakpoint (not just compact, per the approved composition).
            Below 360px the wrapper still crops to the head/shoulder
            fragment instead of shrinking the whole figure into an
            unreadable miniature — same technique as before, just
            applied to the mask-sized div instead of an SVG element. */}
        <div
          aria-hidden="true"
          className="hero-contour-mask shrink-0 self-end aspect-[2/3] w-[160px] sm:w-[200px] md:w-[29%] lg:w-[32%] max-[359px]:w-[130px] max-[359px]:h-[150px] max-[359px]:overflow-hidden"
        >
          <div
            className="hero-contour-path w-full h-full max-[359px]:w-[220px] max-[359px]:h-[330px] max-[359px]:max-w-none"
            style={{
              backgroundColor: "#E5DCC9",
              maskImage: "url(/hero/portfolio-hero-contour-v5.svg)",
              WebkitMaskImage: "url(/hero/portfolio-hero-contour-v5.svg)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "bottom right",
              WebkitMaskPosition: "bottom right",
            }}
          />
        </div>
      </Container>

      {/* Finite, single-play reveal, begins at 250ms and finishes over the
          850ms hero-duration token (settles at 1100ms). Combines mask and
          opacity — 04-hero-system.md is explicit that this "should feel
          like the figure emerging from fog, not a hand literally drawing
          every line," which ruled out a stroke-dasharray/dashoffset
          line-draw technique (the literal "hand drawing" look) in favor of
          a soft mask that sweeps upward while the figure fades in. The mask
          lives on hero-contour-mask (the sizing wrapper, so its percentage
          geometry resolves against a plain box rather than SVG viewport
          units); the fade lives on the inner shape div (.hero-contour-path
          — same class name as the old inline <path>, now applied to a div
          whose own CSS mask is the approved SVG file). hero-atmosphere then
          runs one subtle 3-5% brightness bloom from 1200-1500ms. Reduced
          motion shows the final state immediately with no travel and no
          bloom. Content above is never gated on this — it is already
          visible at 0ms. .hero-contour-skip (set by the inline script
          below, once per browser session) prevents the entrance sequence
          from replaying on a route return — 04-hero-system.md's Non-goals
          list this explicitly ("Replaying the animation on route return,
          hover, or scroll"). */}
      <style>{`
        .hero-contour-path {
          opacity: 0;
          animation: hero-contour-fade var(--duration-hero) var(--ease-enter) 250ms 1 forwards;
        }
        @keyframes hero-contour-fade {
          to { opacity: 0.7; }
        }
        .hero-contour-mask {
          -webkit-mask-image: linear-gradient(to top, black 0%, black 85%, transparent 100%);
          mask-image: linear-gradient(to top, black 0%, black 85%, transparent 100%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: bottom;
          mask-position: bottom;
          -webkit-mask-size: 100% 8%;
          mask-size: 100% 8%;
          animation: hero-contour-sweep var(--duration-hero) var(--ease-enter) 250ms 1 forwards;
        }
        @keyframes hero-contour-sweep {
          to { -webkit-mask-size: 100% 130%; mask-size: 100% 130%; }
        }
        .hero-atmosphere {
          animation: hero-bloom 300ms var(--ease-standard) 1200ms 1 forwards;
        }
        @keyframes hero-bloom {
          from { filter: brightness(1); }
          to { filter: brightness(1.04); }
        }
        :root.hero-contour-skip .hero-contour-path {
          animation: none;
          opacity: 0.7;
        }
        :root.hero-contour-skip .hero-contour-mask {
          animation: none;
          -webkit-mask-size: 100% 130%;
          mask-size: 100% 130%;
        }
        :root.hero-contour-skip .hero-atmosphere {
          animation: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-contour-path {
            animation: none;
            opacity: 0.7;
          }
          .hero-contour-mask {
            animation: none;
            -webkit-mask-size: 100% 130%;
            mask-size: 100% 130%;
          }
          .hero-atmosphere {
            animation: none;
          }
        }
      `}</style>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{if(sessionStorage.getItem('hero-contour-played')==='1'){document.documentElement.classList.add('hero-contour-skip');}else{sessionStorage.setItem('hero-contour-played','1');}}catch(e){}})();`,
        }}
      />
    </section>
  );
}

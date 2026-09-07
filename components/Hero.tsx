import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";
import HeroAtmosphereFlow from "@/components/HeroAtmosphereFlow";
import HeroMistFlow from "@/components/HeroMistFlow";
import HeroBuildTyping from "@/components/HeroBuildTyping";

/**
 * Hero (2026-08-31) - cinematic "figure on the shelf, facing the distant
 * light" composition. Layered strictly so positioning, fading and the draw
 * reveal never fight each other:
 *
 *   Layer 0  near-black stage            -> <section> background
 *   Layer 1  atmosphere raster (v6)      -> baked light + illustrated shelf
 *   Layer 1b fog behind the figure       -> depth between figure and sky
 *   Layer 2  figure (bronze line art)    -> see nesting below
 *   Layer 3  foreground knee mist        -> SIBLING above the figure
 *   Layer 10 semantic content            -> headline/lead/actions, never gated
 *
 * The figure is the clean ivory line drawing recoloured to bronze
 * (public/hero/hero-figure-bronze.png, built by tinting the source art's own
 * alpha mask). This keeps the smooth, flowing hair the vector TRACE mangled
 * into spikes - a region tracer cannot preserve fine line hair. The raster is
 * cropped tight to the figure so it positions predictably, and is nested so
 * each concern is isolated:
 *
 *   .hero-figure-wrap   (CSS: right/top/height only - NEVER an x transform)
 *     .hero-figure-draw (animated clip-path top-down draw reveal)
 *       <img>           (CSS mask-image = the lower-body fade)
 *
 * The draw reveal defaults to fully revealed, so if it cannot run the whole
 * (upper) figure still shows; the both fill-mode holds the clipped first frame
 * so there is no full-figure flash. Reduced motion / route-return settle
 * straight to the static frame.
 */

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)", minHeight: "clamp(480px, 68vh, 620px)" }}
    >
      {/* Layer 1: atmosphere raster (v6) - distant warm light and the
          illustrated shelf, both baked in. */}
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/hero-atmosphere-v6.png)" }}
      />

      {/* Layer 1 (live): the same atmosphere raster driven through a WebGL2
          flow shader so the light and haze visibly churn and drift. Painted
          over the CSS fallback above; hides itself (revealing that static
          background) when WebGL2 is unavailable or reduced-motion is set. */}
      <HeroAtmosphereFlow
        src="/hero/hero-atmosphere-v6.png"
        className="hero-flow pointer-events-none absolute inset-0 block h-full w-full"
      />

      {/* Layer 1b: fog BEHIND the figure - separation from the sky. */}
      <div aria-hidden="true" className="hero-fog-back pointer-events-none absolute inset-0 z-[1]" />

      {/* Layer 2: the figure. The outer wrap is position-only (right/top/size,
          never transformed). The inner layer owns the draw reveal via an
          animated clip-path (compositor-reliable). The img carries the
          lower-body fade as a CSS mask-image. */}
      <div
        aria-hidden="true"
        className="hero-figure-wrap pointer-events-none absolute hidden sm:block z-[2]"
      >
        <div className="hero-figure-draw">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-figure-img" src="/hero/hero-figure-bronze.png" alt="" aria-hidden="true" draggable={false} />
        </div>
      </div>

      {/* Layer 3: foreground knee mist - a SIBLING above the figure (not inside
          its mask), crossing the thighs, knees and shelf edge so the figure
          reads as standing in fog with its lower legs lost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,12,15,0.7) 0%, rgba(11,12,15,0.3) 12%, rgba(11,12,15,0.1) 24%, transparent 34%)",
        }}
      />
      {/* Foreground mist bank - several overlapping blurred, irregular fog
          shapes filling the gap between the lower coat and the shelf on the
          right ~45% of the hero. Faint at the coat, dense through the thighs
          and knees, opaque over the legs and shoes, dissolving into the shelf.
          Sits in front of both the figure (z-2) and the baked-in shelf. Each
          shape drifts horizontally only 1-3% over 20-30s. */}
      <div aria-hidden="true" className="hero-mist pointer-events-none absolute inset-0 z-[4]">
        {/* hm1-hm3: faint GREY drifting veils over the lower body. They no
            longer erase the legs (the figure is meant to read as a whole person
            standing in light mist, not a half figure); they just soften the
            coat/legs so the structure stays apparent but atmospheric. */}
        <span className="hero-mist-blob hm1" />
        <span className="hero-mist-blob hm2" />
        <span className="hero-mist-blob hm3" />
        {/* Plus a real drifting procedural fog (WebGL2), localized to the
            figure's lower body, so the mist actually moves over it. Falls back
            to nothing (the figure simply shows) if WebGL2 is missing. */}
        <HeroMistFlow className="pointer-events-none absolute inset-0 block h-full w-full" />
      </div>

      <Container variant="page" className="relative z-10 pt-[clamp(56px,11vh,104px)] pb-[clamp(28px,5vh,52px)]">
        {/* Layer 10: semantic content - unchanged, DOM-first, never gated. */}
        <div className="max-w-[52ch]">
          <h1
            aria-label="I build products, systems, workflows, experiences, and tools."
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-l)",
              lineHeight: "var(--leading-display-l)",
              color: "var(--color-text)",
            }}
          >
            <span aria-hidden="true" className="block">I build</span>
            <span aria-hidden="true" className="block">
              <HeroBuildTyping />
            </span>
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
            I came up through code and design into product, and I do my best work in the
            parts underneath: the workflows, the systems, the edge cases most people skip.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Action href="/work">View case studies</Action>
            <Action href="/resume" variant="secondary">
              See resume
            </Action>
          </div>
        </div>
      </Container>

      <style>{`
        /* POSITION LAYER: right/top/size only. The figure is anchored by its
           right edge so it never drifts left, and this element is never given
           an x-transform. Nudge via these vars. */
        .hero-figure-wrap {
          right: var(--fig-right, 15%);
          top: var(--fig-top, 24%);
          height: var(--fig-h, 68%);
        }
        .hero-figure-draw { height: 100%; }

        /* Typewriter caret trailing the cycling manifesto word. */
        .hero-caret {
          display: inline-block;
          width: 0.06em;
          height: 0.82em;
          margin-left: 0.06em;
          background: currentColor;
          vertical-align: -0.04em;
          animation: hero-caret-blink 1s steps(1, end) infinite;
        }
        @keyframes hero-caret-blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }
        /* The figure raster, height-driven so the wrap's right edge stays put.
           LOWER-BODY FADE: a CSS mask with a long, gentle ramp so the figure
           dissolves into the mist through the thighs and knees instead of
           ending suddenly. Held solid to ~84% so the whole figure (coat, legs)
           reads as present; only the feet/base soften into the shelf, gone by
           100%. The grey mist veils below do the atmospheric softening. */
        .hero-figure-img {
          height: 100%; width: auto; display: block;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 84%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.3) 97%, transparent 100%);
                  mask-image: linear-gradient(to bottom, #000 0%, #000 84%, rgba(0,0,0,0.7) 92%, rgba(0,0,0,0.3) 97%, transparent 100%);
        }

        /* DRAW REVEAL: a top-down clip-path wipe (hair/hands first, then
           shoulders, arms, coat). clip-path animates on the compositor and is
           reliable, unlike animating inside an SVG <mask>. Default is fully
           revealed, so any failure shows the whole figure - it can only draw
           it in, never hide it. The both fill-mode holds the clipped first
           frame during the delay, so there is no full-figure flash. */
        .hero-figure-draw {
          clip-path: inset(0 0 0 0);
          animation: hero-draw-down 1450ms cubic-bezier(0.33, 0.02, 0.25, 1) 200ms both;
        }
        @keyframes hero-draw-down {
          from { clip-path: inset(0 0 84% 0); }
          to   { clip-path: inset(0 0 0 0); }
        }

        /* Two restrained fog layers: one behind, one crossing the knees in
           front. Both crawl only a couple of percent over ~20-26s. */
        .hero-fog-back {
          background: radial-gradient(52% 40% at 76% 42%, rgba(28,26,22,0.32) 0%, transparent 70%);
          animation: hero-fog-back 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-back {
          from { transform: translate3d(-1.5%, 0.4%, 0); }
          to   { transform: translate3d(1.5%, -0.8%, 0); }
        }
        /* FOREGROUND MIST BANK. Each blob is a full-bleed layer carrying one
           soft, wide radial ellipse placed over the figure's lower body;
           overlapping them builds an irregular fog with no straight lines or
           hard cutoffs, and the blur dissolves any residual edge. They are
           faint cool-grey veils (not dark erasers): they soften the coat and
           legs so the figure reads as standing in light mist, its structure
           still apparent, rather than dissolving into a half figure. Each
           drifts slowly so the mist visibly moves over the body. */
        .hero-mist-blob { position: absolute; inset: 0; will-change: transform; }
        .hm1 { background: radial-gradient(30% 18% at 82% 68%, rgba(150,155,170,0.32) 0%, rgba(150,155,170,0.15) 55%, transparent 82%); filter: blur(18px); animation: hero-mist-c 29s ease-in-out infinite alternate; }
        .hm2 { background: radial-gradient(42% 24% at 80% 78%, rgba(150,155,170,0.28) 0%, rgba(140,145,160,0.13) 52%, transparent 82%); filter: blur(24px); animation: hero-mist-d 25s ease-in-out infinite alternate; }
        .hm3 { background: radial-gradient(58% 28% at 80% 88%, rgba(150,155,170,0.24) 0%, rgba(140,145,160,0.11) 54%, transparent 84%); filter: blur(26px); animation: hero-mist-e 30s ease-in-out infinite alternate; }
        @keyframes hero-mist-c { from { transform: translate3d(-1.4%, 0, 0); }  to { transform: translate3d(1.3%, -0.3%, 0); } }
        @keyframes hero-mist-d { from { transform: translate3d(0.6%, 0, 0); }   to { transform: translate3d(-0.9%, 0.2%, 0); } }
        @keyframes hero-mist-e { from { transform: translate3d(-0.7%, 0, 0); }  to { transform: translate3d(0.6%, 0, 0); } }

        /* Ambient life: a one-time brightness lift after the figure settles,
           plus a very slow, continuous drift + micro-zoom so the distant light
           and haze read as breathing instead of frozen. A >1 base scale is held
           at all times so the pan can never expose an edge. Felt, not seen:
           about 3% of travel over a full minute, ease-in-out so it never has a
           visible start or stop. */
        .hero-atmosphere {
          will-change: transform;
          animation:
            hero-bloom 320ms var(--ease-standard) 1600ms 1 forwards,
            hero-atmo-drift 60s ease-in-out 0s infinite alternate;
        }
        @keyframes hero-bloom { from { filter: brightness(1); } to { filter: brightness(1.03); } }
        @keyframes hero-atmo-drift {
          from { transform: scale(1.035) translate3d(-0.4%, 0.25%, 0); }
          to   { transform: scale(1.06) translate3d(0.5%, -0.3%, 0); }
        }

        /* Responsive placement as the cover-crop shifts. */
        @media (min-width: 1536px) { .hero-figure-wrap { --fig-right: 16%; --fig-top: 24%; --fig-h: 70%; } }
        @media (max-width: 900px)  { .hero-figure-wrap { --fig-right: 7%;  --fig-top: 26%; --fig-h: 52%; } }
        @media (max-width: 700px)  { .hero-figure-wrap { --fig-right: 4%;  --fig-top: 28%; --fig-h: 46%; opacity: 0.9; } }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
        /* On route-return, skip only the one-time bloom; the ambient drift is
           not an entrance, so it keeps running. */
        :root.hero-contour-skip .hero-atmosphere { animation: hero-atmo-drift 60s ease-in-out 0s infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
          .hero-fog-back, .hero-mist-blob { animation: none; }
          .hero-atmosphere { animation: none; }
          .hero-caret { animation: none; opacity: 1; }
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

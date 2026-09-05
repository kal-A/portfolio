import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";
import HeroAtmosphereFlow from "@/components/HeroAtmosphereFlow";

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
            "linear-gradient(to top, var(--color-bg) 0%, rgba(11,12,15,0.92) 12%, rgba(11,12,15,0.55) 22%, rgba(11,12,15,0.16) 32%, transparent 42%)",
        }}
      />
      {/* Foreground mist bank - several overlapping blurred, irregular fog
          shapes filling the gap between the lower coat and the shelf on the
          right ~45% of the hero. Faint at the coat, dense through the thighs
          and knees, opaque over the legs and shoes, dissolving into the shelf.
          Sits in front of both the figure (z-2) and the baked-in shelf. Each
          shape drifts horizontally only 1-3% over 20-30s. */}
      <div aria-hidden="true" className="hero-mist pointer-events-none absolute inset-0 z-[4]">
        <span className="hero-mist-blob hm1" />
        <span className="hero-mist-blob hm2" />
        <span className="hero-mist-blob hm3" />
        <span className="hero-mist-blob hm4" />
        <span className="hero-mist-blob hm5" />
      </div>

      <Container variant="page" className="relative z-10 pt-[clamp(56px,11vh,104px)] pb-[clamp(28px,5vh,52px)]">
        {/* Layer 10: semantic content - unchanged, DOM-first, never gated. */}
        <div className="max-w-[52ch]">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-l)",
              lineHeight: "var(--leading-display-l)",
              color: "var(--color-text)",
            }}
          >
            I build products by starting with{" "}
            <span style={{ color: "var(--color-accent)" }}>how they actually work.</span>
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
            Take a look at what I&apos;ve done, and what I&apos;m up to.
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
          right: var(--fig-right, 10%);
          top: var(--fig-top, 24%);
          height: var(--fig-h, 54%);
        }
        .hero-figure-draw { height: 100%; }
        /* The figure raster, height-driven so the wrap's right edge stays put.
           LOWER-BODY FADE: a CSS mask with a long, gentle ramp so the figure
           dissolves into the mist through the thighs and knees instead of
           ending suddenly (full to ~50%, soft falloff, fully gone by ~88%). */
        .hero-figure-img {
          height: 100%; width: auto; display: block;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.32) 75%, rgba(0,0,0,0.12) 82%, transparent 88%);
                  mask-image: linear-gradient(to bottom, #000 0%, #000 50%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.32) 75%, rgba(0,0,0,0.12) 82%, transparent 88%);
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
           soft, wide radial ellipse placed in the lower-right; overlapping them
           builds an irregular fog with no straight lines or hard cutoffs, and
           the blur dissolves any residual edge. Opacity and darkness climb from
           the lower coat (hm1, faint, lit) down through the knees to the legs
           and shoes (hm4/hm5, near-opaque, background-toned) so the figure
           dissolves in and the bank settles onto the shelf. Each drifts
           horizontally only 1-3% over 23-30s. */
        .hero-mist-blob { position: absolute; inset: 0; will-change: transform; }
        /* Painted back-to-front. First three are near-background-toned
           CONCEALERS that sit directly over the leg lines, shoes and base and
           quietly erase the thin bronze lines (they read as nothing over the
           near-black stage, so raising their opacity never shows a dark patch).
           The last two are the VISIBLE, lit fog that lays a soft grey bank over
           the thighs and knees ON TOP, so that zone reads as fog, not a hole. */
        .hm1 { background: radial-gradient(26% 15% at 82% 65%, rgba(11,12,15,1) 0%, rgba(11,12,15,0.92) 55%, transparent 80%); filter: blur(16px); animation: hero-mist-c 29s ease-in-out infinite alternate; }
        .hm2 { background: radial-gradient(38% 22% at 82% 75%, rgba(11,12,15,1) 0%, rgba(11,12,15,0.6) 52%, transparent 80%); filter: blur(22px); animation: hero-mist-d 25s ease-in-out infinite alternate; }
        .hm3 { background: radial-gradient(60% 27% at 80% 89%, rgba(11,12,15,0.80) 0%, rgba(11,12,15,0.38) 54%, transparent 82%); filter: blur(24px); animation: hero-mist-e 30s ease-in-out infinite alternate; }
        .hm4 { background: radial-gradient(42% 21% at 81% 62%, rgba(50,52,61,0.60) 0%, rgba(34,36,45,0.28) 48%, transparent 74%); filter: blur(32px); animation: hero-mist-b 23s ease-in-out infinite alternate; }
        .hm5 { background: radial-gradient(48% 20% at 76% 53%, rgba(60,62,72,0.32) 0%, rgba(46,48,58,0.14) 48%, transparent 72%); filter: blur(32px); animation: hero-mist-a 27s ease-in-out infinite alternate; }
        @keyframes hero-mist-a { from { transform: translate3d(-1%, 0, 0); }    to { transform: translate3d(1.2%, -0.4%, 0); } }
        @keyframes hero-mist-b { from { transform: translate3d(1%, 0, 0); }     to { transform: translate3d(-0.8%, 0.3%, 0); } }
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
        @media (min-width: 1536px) { .hero-figure-wrap { --fig-right: 11%; --fig-top: 24%; --fig-h: 56%; } }
        @media (max-width: 900px)  { .hero-figure-wrap { --fig-right: 7%;  --fig-top: 26%; --fig-h: 50%; } }
        @media (max-width: 700px)  { .hero-figure-wrap { --fig-right: 4%;  --fig-top: 28%; --fig-h: 44%; opacity: 0.9; } }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
        /* On route-return, skip only the one-time bloom; the ambient drift is
           not an entrance, so it keeps running. */
        :root.hero-contour-skip .hero-atmosphere { animation: hero-atmo-drift 60s ease-in-out 0s infinite alternate; }

        @media (prefers-reduced-motion: reduce) {
          .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
          .hero-fog-back, .hero-mist-blob { animation: none; }
          .hero-atmosphere { animation: none; }
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

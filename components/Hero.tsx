import fs from "node:fs";
import path from "node:path";
import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";

/**
 * Hero (2026-08-31) - cinematic "figure on the shelf, facing the distant
 * light" composition. Layered strictly so positioning, fading and the draw
 * reveal never fight each other (this was the root of the earlier
 * missing-paths / shifting bugs):
 *
 *   Layer 0  near-black stage            -> <section> background
 *   Layer 1  atmosphere raster (v6)      -> baked light + illustrated shelf
 *   Layer 1b fog behind the figure       -> depth between figure and sky
 *   Layer 2  figure (inline v8 contour)  -> see nesting below
 *   Layer 3  foreground knee mist        -> SIBLING above the figure
 *   Layer 10 semantic content            -> headline/lead/actions, never gated
 *
 * The figure itself is nested so each concern is isolated:
 *
 *   .hero-figure-wrap   (CSS: right/top/height only - NEVER an x transform)
 *     <svg 0 0 1024 1536>
 *       <g mask=lower-body-fade>     static gradient, hides legs + shoes
 *         <g mask=draw-reveal>       animated top-down wipe (hair -> coat)
 *           <g .hero-figure-g>       the 27 filled v8 paths, muted bronze
 *
 * Why the figure used to break:
 *   1) MISSING PATHS - a hand-authored reveal mask whose stroke skeleton was
 *      misaligned with the trace geometry masked most of the figure out, and a
 *      steep bronze opacity gradient faded the torso/legs to zero. Fixed by
 *      making the draw mask a full-width wipe (it cannot miss geometry) and
 *      moving the "vanish" into a dedicated lower-body-fade gradient mask.
 *   2) LEFTWARD SHIFT - the figure was positioned with `left:%` on a viewBox
 *      wider than the drawn figure, so xMid-centering + responsive --fig-left
 *      changes slid it. Fixed by anchoring with `right` and never transforming
 *      the position layer.
 *
 * The asset (public/hero/hero-figure-contour-v8.svg) is a VTracer trace, read
 * at build time and inlined (server component, statically prerendered) so the
 * figure is present in the first painted HTML with no hydration flash. The
 * draw mask defaults to fully revealed, so if its animation cannot run the
 * whole (upper) figure still shows - it can never hide the figure, only draw
 * it in. Reduced motion / route-return settle straight to the static frame.
 */

function figurePaths(): string[] {
  const file = path.join(process.cwd(), "public/hero/hero-figure-contour-v8.svg");
  const svg = fs.readFileSync(file, "utf8");
  return Array.from(svg.matchAll(/<path\s+d="([^"]+)"/g)).map((m) => m[1]);
}

function buildFigureSvg(paths: string[]): string {
  const pathEls = paths
    .map(
      (d) =>
        `<path d="${d}" fill="url(#heroFigBronze)" stroke="url(#heroFigBronze)" stroke-width="3" stroke-linejoin="round"/>`
    )
    .join("");

  // The v8 trace draws only in the left ~40% of its native 1024x1536 box and
  // even runs to negative x (the raised arm), so the native viewBox both
  // clipped the arm and, with xMid centering, placed the figure nowhere near
  // where it is anchored. Crop to the figure's true content bounds
  // (x:-237..395, y:-7..1438, measured from the path data) so it fills the
  // frame, is never clipped, and positions predictably.
  const VB_X = -250, VB_Y = -20, VB_W = 680, VB_H = 1480;
  const vb = `${VB_X} ${VB_Y} ${VB_W} ${VB_H}`;
  const yTop = VB_Y, yBot = VB_Y + VB_H;

  return `
<svg class="hero-figure-svg" viewBox="${vb}" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <!-- Muted bronze-grey. No white, no glow. The lower-body-fade mask does
         the vanishing, so this stays near-uniform. -->
    <linearGradient id="heroFigBronze" gradientUnits="userSpaceOnUse" x1="0" y1="${yTop}" x2="0" y2="${yBot}">
      <stop offset="0.00" stop-color="rgb(212,182,140)" stop-opacity="0.92"/>
      <stop offset="0.50" stop-color="rgb(200,170,128)" stop-opacity="0.88"/>
      <stop offset="0.80" stop-color="rgb(190,160,120)" stop-opacity="0.82"/>
      <stop offset="1.00" stop-color="rgb(182,152,114)" stop-opacity="0.72"/>
    </linearGradient>

    <!-- Lower-body fade: white (visible) down to ~56% of the figure, strong
         fade through the knees, fully transparent by ~78%, so the shins and
         shoes never resolve. Static; independent of the draw reveal. -->
    <linearGradient id="heroLowerFade" gradientUnits="userSpaceOnUse" x1="0" y1="${yTop}" x2="0" y2="${yBot}">
      <stop offset="0.00" stop-color="#fff"/>
      <stop offset="0.56" stop-color="#fff"/>
      <stop offset="0.68" stop-color="#888"/>
      <stop offset="0.78" stop-color="#000"/>
      <stop offset="1.00" stop-color="#000"/>
    </linearGradient>
    <mask id="heroLowerMask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="${VB_X}" y="${VB_Y}" width="${VB_W}" height="${VB_H}">
      <rect x="${VB_X}" y="${VB_Y}" width="${VB_W}" height="${VB_H}" fill="url(#heroLowerFade)"/>
    </mask>
  </defs>

  <!-- Lower-body fade is a STATIC mask (static mask content renders reliably;
       only ANIMATING elements inside an SVG <mask> is fragile - that is why
       the draw reveal lives outside the SVG, as a clip-path on a wrapper). -->
  <g mask="url(#heroLowerMask)">
    <g class="hero-figure-g">${pathEls}</g>
  </g>
</svg>`;
}

export default function Hero() {
  const figureSvg = buildFigureSvg(figurePaths());

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)", minHeight: "clamp(520px, 82vh, 780px)" }}
    >
      {/* Layer 1: atmosphere raster (v6) - distant warm light and the
          illustrated shelf, both baked in. */}
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/hero-atmosphere-v6.png)" }}
      />

      {/* Layer 1b: fog BEHIND the figure - separation from the sky. */}
      <div aria-hidden="true" className="hero-fog-back pointer-events-none absolute inset-0 z-[1]" />

      {/* Layer 2: the figure. The outer wrap is position-only (right/top/size,
          never transformed). The inner layer owns the draw reveal via an
          animated clip-path (compositor-reliable, unlike a mask-internal
          animation). */}
      <div
        aria-hidden="true"
        className="hero-figure-wrap pointer-events-none absolute hidden sm:block z-[2]"
      >
        <div className="hero-figure-draw" dangerouslySetInnerHTML={{ __html: figureSvg }} />
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
      <div aria-hidden="true" className="hero-fog-front pointer-events-none absolute inset-0 z-[3]" />

      <Container variant="page" className="relative z-10 py-[clamp(64px,12vh,120px)]">
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
        .hero-figure-svg { height: 100%; width: auto; display: block; }

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
        .hero-fog-front {
          background: radial-gradient(46% 26% at 80% 70%, rgba(12,13,17,0.55) 0%, transparent 72%);
          animation: hero-fog-front 21s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-front {
          from { transform: translate3d(-2%, 0, 0); }
          to   { transform: translate3d(2.5%, -0.6%, 0); }
        }

        /* One subtle, single-play atmosphere lift after the figure settles. */
        .hero-atmosphere { animation: hero-bloom 320ms var(--ease-standard) 1600ms 1 forwards; }
        @keyframes hero-bloom { from { filter: brightness(1); } to { filter: brightness(1.03); } }

        /* Responsive placement as the cover-crop shifts. */
        @media (min-width: 1536px) { .hero-figure-wrap { --fig-right: 11%; --fig-top: 24%; --fig-h: 56%; } }
        @media (max-width: 900px)  { .hero-figure-wrap { --fig-right: 7%;  --fig-top: 26%; --fig-h: 50%; } }
        @media (max-width: 700px)  { .hero-figure-wrap { --fig-right: 4%;  --fig-top: 28%; --fig-h: 44%; opacity: 0.9; } }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
        :root.hero-contour-skip .hero-atmosphere { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .hero-figure-draw { animation: none; clip-path: inset(0 0 0 0); }
          .hero-fog-back, .hero-fog-front { animation: none; }
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

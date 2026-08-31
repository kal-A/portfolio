import fs from "node:fs";
import path from "node:path";
import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";

/**
 * Hero - final implementation pass (2026-08-31). A cinematic "figure on the
 * shelf, facing the distant light" composition:
 *
 *   Layer 0  near-black stage           -> <section> background
 *   Layer 1  atmosphere raster (v6)     -> baked light (upper-middle-left) + shelf
 *   Layer 1b fog behind the figure      -> depth between figure and atmosphere
 *   Layer 2  figure (inline v8 contour) -> bronze line art, knee-down fade, sketch-in
 *   Layer 3  fog crossing the knees      -> buries the base in front of the figure
 *   Layer 10 semantic content            -> headline/lead/actions, never gated
 *
 * The figure asset (public/hero/hero-figure-contour-v8.svg) is a VTracer
 * trace: 27 FILLED paths, no centreline strokes. So it cannot be drawn with a
 * stroke-dashoffset trace directly. Instead the filled artwork is revealed
 * through an animated SVG mask of broad guide strokes that follow the body
 * (hair -> hand/beard -> collar -> coat -> windblown edge -> faint upper leg),
 * each drawn on with stroke-dashoffset, staggered, ~200ms..1.5s. The strokes
 * overlap to blanket the silhouette so the settled figure is complete. This is
 * the same "draw the contour on, do not fade the whole object in" idea the
 * spec asks for, adapted to filled trace art per its own fallback instruction.
 *
 * Colour: a single vertical bronze gradient with falling alpha (no white, no
 * uniform opacity): clearest at the hair/hand, thinning through the coat, gone
 * by the knee, so the lower legs never resolve and most of the torso stays
 * absorbed into the dark. No glow, bloom, or drop shadow.
 *
 * The paths are read at build time and inlined (this is a server component,
 * statically prerendered) so the masked figure is present and already hidden
 * in the first painted frame - no post-hydration flash. Reduced motion and
 * route-return settle straight to the final static composition.
 *
 * Placement is driven by CSS custom properties (--fig-left/-top/-h) so the
 * figure can be nudged onto the shelf without touching structure.
 */

function figurePaths(): string[] {
  const file = path.join(process.cwd(), "public/hero/hero-figure-contour-v8.svg");
  const svg = fs.readFileSync(file, "utf8");
  return Array.from(svg.matchAll(/<path\s+d="([^"]+)"/g)).map((m) => m[1]);
}

// Full asset frame. (The figure is authored to sit grounded within its own
// 1024x1536 canvas, so the whole frame is the viewBox; preserveAspectRatio
// xMidYMax then rests its base at the container bottom.)
const FIG = { x: 0, y: 0, w: 1024, h: 1536 };
const FIG_VB = `${FIG.x} ${FIG.y} ${FIG.w} ${FIG.h}`;
const FIG_BOTTOM = FIG.y + FIG.h;

// Coat-tail region (asset coords): the windblown flare in the lower right.
// Used both to clip the drifting copy and (inverted) to cut the same region
// out of the static copy, so the two never double up.
const COAT_TAIL = "M598 712 L712 724 L872 826 L936 858 L904 908 L788 966 L648 952 L600 858 Z";

// Per-path draw delays: order the trace paths roughly top-to-bottom (by their
// first move) so the sketch reads head -> coat -> hem, and spread the starts
// across ~150ms..1250ms.
function drawDelays(paths: string[]): number[] {
  const firstY = paths.map((d) => {
    const m = d.match(/^M\s*-?[\d.]+[ ,]+(-?[\d.]+)/);
    return m ? parseFloat(m[1]) : 0;
  });
  const order = firstY.map((y, i) => [y, i] as const).sort((a, b) => a[0] - b[0]);
  const rank = new Array<number>(paths.length);
  order.forEach(([, idx], r) => (rank[idx] = r));
  const n = Math.max(1, paths.length - 1);
  return paths.map((_, i) => Math.round(150 + (rank[i] / n) * 1100));
}

function buildFigureSvg(paths: string[]): string {
  const delays = drawDelays(paths);
  const pathEls = paths.map((d) => `<path d="${d}" fill="url(#heroFigBronze)"/>`).join("");
  // The reveal mask traces the figure's OWN paths: a thick round stroke along
  // each contour, drawn on with stroke-dashoffset. Because these are the actual
  // artwork paths, the reveal is perfectly aligned and, once drawn, blankets the
  // thin trace lines so the settled figure is complete.
  const trace = paths
    .map((d, i) => `<path d="${d}" pathLength="1" style="animation-delay:${delays[i]}ms"/>`)
    .join("");
  return `
<svg class="hero-figure-svg" viewBox="${FIG_VB}" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="heroFigBronze" gradientUnits="userSpaceOnUse" x1="0" y1="${FIG.y}" x2="0" y2="${FIG_BOTTOM}">
      <stop offset="0.04" stop-color="rgb(198,168,126)" stop-opacity="0.80"/>
      <stop offset="0.20" stop-color="rgb(195,165,122)" stop-opacity="0.76"/>
      <stop offset="0.38" stop-color="rgb(192,162,120)" stop-opacity="0.72"/>
      <stop offset="0.54" stop-color="rgb(190,160,119)" stop-opacity="0.68"/>
      <stop offset="0.68" stop-color="rgb(188,157,116)" stop-opacity="0.60"/>
      <stop offset="0.77" stop-color="rgb(186,155,114)" stop-opacity="0.44"/>
      <stop offset="0.85" stop-color="rgb(186,155,114)" stop-opacity="0.18"/>
      <stop offset="0.91" stop-color="rgb(186,155,114)" stop-opacity="0"/>
      <stop offset="1" stop-color="rgb(186,155,114)" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="heroCoatTailClip"><path d="${COAT_TAIL}"/></clipPath>
    <mask id="heroAntiTail" maskUnits="userSpaceOnUse" x="${FIG.x}" y="${FIG.y}" width="${FIG.w}" height="${FIG.h}">
      <rect x="${FIG.x}" y="${FIG.y}" width="${FIG.w}" height="${FIG.h}" fill="#fff"/>
      <path d="${COAT_TAIL}" fill="#000"/>
    </mask>
    <mask id="heroSketch" maskUnits="userSpaceOnUse" x="${FIG.x}" y="${FIG.y}" width="${FIG.w}" height="${FIG.h}">
      <g class="hero-sketch" fill="none" stroke="#fff" stroke-width="42" stroke-linecap="round" stroke-linejoin="round">
        ${trace}
      </g>
    </mask>
  </defs>
  <g mask="url(#heroSketch)">
    <g mask="url(#heroAntiTail)">${pathEls}</g>
    <g class="hero-coat-tail" clip-path="url(#heroCoatTailClip)">${pathEls}</g>
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
      {/* Layer 1: atmosphere raster (v6) - distant warm light upper-middle-left
          and the illustrated shelf, both baked in. bg-cover keeps it filling
          the stage; the left stays quiet-dark behind the copy. */}
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/hero-atmosphere-v6.png)" }}
      />

      {/* Layer 1b: fog BEHIND the figure - a little separation from the sky. */}
      <div aria-hidden="true" className="hero-fog-back pointer-events-none absolute inset-0 z-[1]" />

      {/* Layer 2: the figure. Inlined so the mask hides it from the first
          painted frame (no flash), positioned onto the right-hand shelf. */}
      <div
        aria-hidden="true"
        className="hero-figure-wrap pointer-events-none absolute hidden sm:block z-[2]"
        dangerouslySetInnerHTML={{ __html: figureSvg }}
      />

      {/* Layer 3: foreground fog crossing the knees IN FRONT of the figure and
          burying its base into the stage floor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg) 0%, rgba(11,12,15,0.92) 8%, rgba(11,12,15,0.5) 19%, rgba(11,12,15,0.14) 30%, transparent 40%)",
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
        /* Placement onto the right-hand shelf. Feet sit at (top + height); the
           figure's own artwork is grounded at the bottom of its viewBox, so the
           container bottom is the implied shelf line. Nudge via these vars. */
        .hero-figure-wrap {
          left: var(--fig-left, 71%);
          top: var(--fig-top, 26.5%);
          height: var(--fig-h, 56%);
        }
        .hero-figure-svg { height: 100%; width: auto; display: block; }

        /* Sketch-in reveal: each mask path traces the figure's own contour with
           stroke-dashoffset, staggered head-to-hem via inline animation-delay.
           The hidden state lives in this (server-rendered) CSS, so the figure is
           concealed in the first painted frame - no flash. */
        .hero-sketch path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: hero-draw 520ms var(--ease-standard) forwards;
        }
        @keyframes hero-draw { to { stroke-dashoffset: 0; } }

        /* Ambient coat-tail drift - the isolated windblown region only, hinged
           near where it leaves the coat. Starts once the sketch has settled. */
        .hero-coat-tail {
          transform-box: view-box;
          transform-origin: 626px 758px;
          animation: hero-coat-drift 6.5s ease-in-out 2000ms infinite alternate;
          will-change: transform;
        }
        @keyframes hero-coat-drift {
          from { transform: rotate(-1.2deg); }
          to   { transform: rotate(1.5deg); }
        }

        /* Two restrained fog layers: one behind, one crossing the knees in
           front. Both crawl only a couple of percent over ~20-26s. */
        .hero-fog-back {
          background: radial-gradient(52% 40% at 70% 46%, rgba(28,26,22,0.34) 0%, transparent 70%);
          animation: hero-fog-back 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-back {
          from { transform: translate3d(-1.5%, 0.4%, 0); }
          to   { transform: translate3d(1.5%, -0.8%, 0); }
        }
        .hero-fog-front {
          background: radial-gradient(46% 26% at 72% 76%, rgba(12,13,17,0.55) 0%, transparent 72%);
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

        /* Responsive placement onto the shelf as the cover-crop shifts. */
        @media (min-width: 1536px) { .hero-figure-wrap { --fig-left: 72%; --fig-top: 25%; --fig-h: 57%; } }
        @media (max-width: 900px) { .hero-figure-wrap { --fig-left: 67%; --fig-top: 29%; --fig-h: 50%; } }
        @media (max-width: 700px) { .hero-figure-wrap { --fig-left: 63%; --fig-top: 32%; --fig-h: 44%; opacity: 0.85; } }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-sketch path { animation: none; stroke-dashoffset: 0; }
        :root.hero-contour-skip .hero-atmosphere { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .hero-sketch path { animation: none; stroke-dashoffset: 0; }
          .hero-coat-tail { animation: none; }
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

import fs from "node:fs";
import path from "node:path";
import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";

/**
 * Hero (2026-08-31) - cinematic "figure on the shelf, facing the distant
 * light" composition:
 *
 *   Layer 0  near-black stage           -> <section> background
 *   Layer 1  atmosphere raster (v6)     -> baked light (upper-middle-left) + shelf
 *   Layer 1b fog behind the figure      -> depth between figure and atmosphere
 *   Layer 2  figure (inline v8 contour) -> full bronze line drawing, base in fog
 *   Layer 3  fog crossing the shins      -> buries the base in front of the figure
 *   Layer 10 semantic content            -> headline/lead/actions, never gated
 *
 * The figure asset (public/hero/hero-figure-contour-v8.svg) is a VTracer trace
 * of a fine single-line drawing (27 filled paths). It is read at build time and
 * inlined (server component, statically prerendered) so it is present in the
 * first painted HTML. Each path is filled AND stroked with the same bronze
 * gradient so the very thin lines thicken enough to read at this size - the
 * whole figure (head, raised arm, coat, both legs) shows, not just the dense
 * head. The lower body is not faded away; the foreground fog and the shelf do
 * the occluding, so the figure reads as complete and grounded.
 *
 * Entrance is a plain opacity fade-in on the figure GROUP (render-tree, so it
 * runs reliably), with `both` fill so it is hidden during the delay yet defaults
 * to visible if the animation cannot run. Reduced motion / route-return settle
 * straight to the static composition. Placement is driven by CSS custom
 * properties (--fig-left/-top/-h) so the figure can be nudged without touching
 * structure.
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
        `<path d="${d}" fill="url(#heroFigBronze)" stroke="url(#heroFigBronze)" stroke-width="3.5" stroke-linejoin="round"/>`
    )
    .join("");
  return `
<svg class="hero-figure-svg" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="heroFigBronze" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1536">
      <stop offset="0.00" stop-color="rgb(214,182,138)" stop-opacity="0.92"/>
      <stop offset="0.45" stop-color="rgb(206,174,130)" stop-opacity="0.86"/>
      <stop offset="0.74" stop-color="rgb(199,167,123)" stop-opacity="0.80"/>
      <stop offset="0.88" stop-color="rgb(193,161,118)" stop-opacity="0.62"/>
      <stop offset="1.00" stop-color="rgb(190,158,116)" stop-opacity="0.34"/>
    </linearGradient>
  </defs>
  <g class="hero-figure-g">${pathEls}</g>
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
          and the illustrated shelf, both baked in. */}
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/hero-atmosphere-v6.png)" }}
      />

      {/* Layer 1b: fog BEHIND the figure - a little separation from the sky. */}
      <div aria-hidden="true" className="hero-fog-back pointer-events-none absolute inset-0 z-[1]" />

      {/* Layer 2: the figure, inlined and positioned onto the right-hand shelf. */}
      <div
        aria-hidden="true"
        className="hero-figure-wrap pointer-events-none absolute hidden sm:block z-[2]"
        dangerouslySetInnerHTML={{ __html: figureSvg }}
      />

      {/* Layer 3: foreground fog crossing the shins IN FRONT of the figure and
          burying its base into the stage floor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg) 0%, rgba(11,12,15,0.9) 7%, rgba(11,12,15,0.45) 16%, rgba(11,12,15,0.1) 26%, transparent 36%)",
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
        /* Placement onto the right-hand shelf. The figure's boots sit at the
           bottom of its viewBox; with preserveAspectRatio xMidYMax the base
           rests at the container bottom, and the foreground fog buries the
           shins. Nudge via these vars. */
        .hero-figure-wrap {
          left: var(--fig-left, 67%);
          top: var(--fig-top, 15%);
          height: var(--fig-h, 68%);
        }
        .hero-figure-svg { height: 100%; width: auto; display: block; }

        /* Entrance: a plain group fade-in (render-tree, reliable). Visible by
           default, so if the animation cannot run the figure still shows; the
           both fill-mode hides it during the delay so there is no flash. */
        .hero-figure-g { opacity: 1; animation: hero-fig-in 1100ms var(--ease-enter) 250ms both; }
        @keyframes hero-fig-in { from { opacity: 0; } to { opacity: 1; } }

        /* Two restrained fog layers: one behind, one crossing the shins in
           front. Both crawl only a couple of percent over ~20-26s. */
        .hero-fog-back {
          background: radial-gradient(52% 40% at 66% 44%, rgba(28,26,22,0.32) 0%, transparent 70%);
          animation: hero-fog-back 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-back {
          from { transform: translate3d(-1.5%, 0.4%, 0); }
          to   { transform: translate3d(1.5%, -0.8%, 0); }
        }
        .hero-fog-front {
          background: radial-gradient(44% 24% at 68% 80%, rgba(12,13,17,0.5) 0%, transparent 72%);
          animation: hero-fog-front 21s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-front {
          from { transform: translate3d(-2%, 0, 0); }
          to   { transform: translate3d(2.5%, -0.6%, 0); }
        }

        /* One subtle, single-play atmosphere lift after the figure settles. */
        .hero-atmosphere { animation: hero-bloom 320ms var(--ease-standard) 1500ms 1 forwards; }
        @keyframes hero-bloom { from { filter: brightness(1); } to { filter: brightness(1.03); } }

        /* Responsive placement onto the shelf as the cover-crop shifts. */
        @media (min-width: 1536px) { .hero-figure-wrap { --fig-left: 68%; --fig-top: 14%; --fig-h: 70%; } }
        @media (max-width: 900px) { .hero-figure-wrap { --fig-left: 64%; --fig-top: 18%; --fig-h: 62%; } }
        @media (max-width: 700px) { .hero-figure-wrap { --fig-left: 60%; --fig-top: 22%; --fig-h: 54%; opacity: 0.9; } }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-figure-g { animation: none; opacity: 1; }
        :root.hero-contour-skip .hero-atmosphere { animation: none; }

        @media (prefers-reduced-motion: reduce) {
          .hero-figure-g { animation: none; opacity: 1; }
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

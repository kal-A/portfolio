import Container from "@/components/layout/Container";
import Action from "@/components/ui/Action";

/**
 * Hero — cinematic "figure standing within the atmosphere" (rebuilt 2026-08-28
 * to the FINAL VISIBILITY CORRECTION brief). The figure is a full-body ivory
 * line drawing (public/hero/hero-figure-ivory.png, the complete figure down to
 * the shoes) but the lower body is never allowed to resolve: it is concealed by
 * a permanent responsive mask, foreground fog, and the bottom fade, not cropped
 * out of the asset.
 *
 * Visibility hierarchy, clearest to concealed:
 *   hair / glasses / raised hand / restrained beard  -> clearest (top of mask)
 *   head / collar / shoulder / upper coat            -> clearly suggested
 *   windblown coat edge                              -> lit + wind-animated
 *   torso / upper legs                               -> intermittent through fog
 *   below the knees                                  -> fully concealed
 *
 * Layer order (bottom to top), each an independent element:
 *   1. near-black stage field   -> the <section> background
 *   2. atmosphere raster        -> distant warm fog + light beyond the figure
 *   3. figure                   -> ivory line art, knee-down mask, top-down draw-on
 *   4. foreground fog           -> crosses IN FRONT of the figure; buries the base
 *   5. semantic content         -> z-10, the primary reading target, never gated
 *
 * The entrance is a top-down draw-on: the figure is revealed from the head
 * downward and the reveal is spent by the coat / upper-leg area, so the lower
 * legs are never drawn on before being hidden. The knee-down region stays
 * unresolved the whole time. Reduced motion / route-return skip to the settled
 * state.
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)", minHeight: "clamp(520px, 82vh, 780px)" }}
    >
      {/* Layer 2: atmosphere raster — the distant, restrained warm fog and the
          light kept beyond and above the figure. Quiet near-black on the left
          (behind the text) so the copy stays the primary reading target. */}
      <div
        aria-hidden="true"
        className="hero-atmosphere pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero/portfolio-hero-atmosphere-final.png)" }}
      />

      {/* Layer 3: the figure. Two nested masks keep the two jobs separate:
          the wrapper carries the top-down reveal wipe (the draw-on); the inner
          element carries the permanent knee-down concealment gradient and the
          ivory line art itself. self-anchored bottom-right and grounded, so the
          shoes sit at the stage floor even though they are never visible. */}
      <div
        aria-hidden="true"
        className="hero-figure pointer-events-none absolute bottom-0 hidden sm:block"
        style={{
          right: "clamp(0px, 3vw, 72px)",
          width: "clamp(300px, 36vw, 500px)",
          height: "min(94%, 720px)",
        }}
      >
        <div
          className="hero-figure-inner absolute inset-0"
          style={{
            backgroundImage: "url(/hero/hero-figure-ivory.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom center",
            backgroundSize: "contain",
          }}
        />
      </div>

      {/* Layer 4: foreground fog — sits IN FRONT of the figure (above layer 3,
          below the z-10 content) so it visibly crosses the contour instead of
          sitting behind it. The base gradient buries everything from the knees
          down into the stage floor; the drifting wisp adds wind across the
          torso and coat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, var(--color-bg) 0%, rgba(11,12,15,0.94) 7%, rgba(11,12,15,0.6) 20%, rgba(11,12,15,0.18) 33%, transparent 44%), radial-gradient(58% 42% at 74% 62%, rgba(14,15,19,0.5) 0%, transparent 72%)",
        }}
      />
      <div aria-hidden="true" className="hero-fog-wisp pointer-events-none absolute inset-0 z-[3]" />
      {/* A soft warm light lifting the windblown coat edge, drifting on the wind. */}
      <div aria-hidden="true" className="hero-coat-glow pointer-events-none absolute inset-0 z-[3]" />

      <Container
        variant="page"
        className="relative z-10 py-[clamp(64px,12vh,120px)]"
      >
        {/* Layer 5: semantic content — renders immediately, no client JS, no
            animation, DOM-first. Left-aligned; the figure lives on the right. */}
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
        /* Permanent knee-down concealment + the ivory line weight. The mask is
           full-strength through the torso, thins across the upper legs (the
           "intermittent through fog" band), and is gone by the knee — so the
           shoes/ankles/lower-leg in the asset never resolve. Also the resting
           opacity (< 1) keeps the figure emerging from the field rather than
           reading as flat line art laid over it. */
        .hero-figure-inner {
          opacity: 0;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.45) 57%, rgba(0,0,0,0.12) 64%, transparent 68%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.45) 57%, rgba(0,0,0,0.12) 64%, transparent 68%);
          animation: hero-figure-fade 1500ms var(--ease-enter) 300ms 1 forwards;
        }
        @keyframes hero-figure-fade { to { opacity: 0.86; } }

        /* Top-down draw-on: the wrapper mask exposes a growing band from the top,
           soft leading edge, so the head/hand/hair resolve first and the reveal
           runs down into the coat. It grows past the concealed lower body, so the
           reveal is visually spent around the coat / upper-leg. */
        .hero-figure {
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
          -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
          -webkit-mask-position: top; mask-position: top;
          -webkit-mask-size: 100% 14%; mask-size: 100% 14%;
          animation: hero-figure-reveal 1500ms var(--ease-enter) 300ms 1 forwards;
        }
        @keyframes hero-figure-reveal {
          to { -webkit-mask-size: 100% 118%; mask-size: 100% 118%; }
        }

        /* Wind: a low, slow drift of a warm fog wisp across the torso/coat. */
        .hero-fog-wisp {
          background: radial-gradient(46% 38% at 66% 50%, rgba(32,27,22,0.30) 0%, transparent 66%);
          animation: hero-fog-drift 17s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes hero-fog-drift {
          from { transform: translate3d(-2.5%, 0.5%, 0); }
          to   { transform: translate3d(3%, -1%, 0); }
        }

        /* The lit, animated coat edge: a soft warm glow riding the windblown
           side, breathing gently so the coat reads as "selectively illuminated
           and animated" rather than statically outlined. */
        .hero-coat-glow {
          background: radial-gradient(30% 26% at 80% 56%, rgba(197,138,74,0.16) 0%, transparent 70%);
          opacity: 0;
          animation: hero-coat-glow-in 1600ms var(--ease-standard) 1100ms 1 forwards, hero-coat-breathe 9s ease-in-out 2700ms infinite alternate;
        }
        @keyframes hero-coat-glow-in { to { opacity: 1; } }
        @keyframes hero-coat-breathe {
          from { transform: translate3d(0,0,0); opacity: 0.7; }
          to   { transform: translate3d(1.5%, -0.5%, 0); opacity: 1; }
        }

        /* One subtle, single-play atmosphere bloom after the figure settles. */
        .hero-atmosphere {
          animation: hero-bloom 300ms var(--ease-standard) 1600ms 1 forwards;
        }
        @keyframes hero-bloom {
          from { filter: brightness(1); }
          to   { filter: brightness(1.035); }
        }

        /* Route-return: settle immediately, no entrance replay. */
        :root.hero-contour-skip .hero-figure-inner { animation: none; opacity: 0.86; }
        :root.hero-contour-skip .hero-figure { animation: none; -webkit-mask-size: 100% 118%; mask-size: 100% 118%; }
        :root.hero-contour-skip .hero-atmosphere { animation: none; }
        :root.hero-contour-skip .hero-coat-glow { animation: hero-coat-breathe 9s ease-in-out infinite alternate; opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .hero-figure-inner { animation: none; opacity: 0.86; }
          .hero-figure { animation: none; -webkit-mask-size: 100% 118%; mask-size: 100% 118%; }
          .hero-fog-wisp { animation: none; }
          .hero-coat-glow { animation: none; opacity: 1; }
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

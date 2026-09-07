"use client";

import { useEffect } from "react";

/**
 * Scroll-driven hero recede. As the first viewport of scroll advances, the
 * hero does not simply scroll away as a hard cut into "Selected work": it
 * settles into the background (a slight upward parallax lag, a scale-down, a
 * soft blur and fade) while the opaque content plane below slides up and over
 * it. This is the "scale-and-blur for distance / sections pin while content
 * advances" feel, driven by a single scroll-progress custom property in the
 * spirit of scroll-craft's --sc-p, kept dependency-free.
 *
 * It writes two custom properties on #hero-root and lets CSS own the visual
 * transform, so paint stays on the compositor:
 *   --hero-p    0 to 1 progress across the first hero-height of scroll
 *   --hero-lag  px of downward parallax lag (hero trails the scroll)
 *
 * Reduced motion: the listener never attaches, the properties stay at rest,
 * and the CSS reduced-motion block forces the hero flat. Renders nothing.
 */
export default function HeroReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.getElementById("hero-root");
    if (!root) return;

    let ticking = false;

    const apply = () => {
      ticking = false;
      const heroH = root.offsetHeight || 1;
      const eff = Math.min(Math.max(window.scrollY, 0), heroH);
      const p = eff / heroH;
      root.style.setProperty("--hero-p", p.toFixed(4));
      root.style.setProperty("--hero-lag", (eff * 0.22).toFixed(2) + "px");
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}

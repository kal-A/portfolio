"use client";

/**
 * Shared scroll parallax for media frames. One rAF-throttled scroll loop and
 * one IntersectionObserver drive every registered element, rather than N
 * listeners, so a dense case-study page with many images stays cheap. Each
 * registered element gets a --parallax-y custom property (a percentage) that
 * MediaFrame applies as an inner translate, so the image drifts within its
 * frame as the frame travels through the viewport.
 *
 * Only elements currently near the viewport are in the active set. Disabled
 * entirely under prefers-reduced-motion (register is a no-op that leaves the
 * element at rest).
 */

type Entry = { el: HTMLElement; strength: number };

const entries = new Set<Entry>();
const activeEntries = new Set<Entry>();
let io: IntersectionObserver | null = null;
let raf = 0;
let listening = false;

function update() {
  raf = 0;
  const vh = window.innerHeight || 1;
  activeEntries.forEach((e) => {
    const r = e.el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    // +1 when the frame sits at the very bottom of the viewport, -1 at the
    // very top, 0 at the middle. The image trails that, drifting down as the
    // frame rises.
    let p = 1 - (2 * center) / vh;
    p = Math.max(-1, Math.min(1, p));
    e.el.style.setProperty("--parallax-y", (p * e.strength).toFixed(2) + "%");
  });
}

function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(update);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  io = new IntersectionObserver(
    (records) => {
      records.forEach((rec) => {
        const found = [...entries].find((x) => x.el === rec.target);
        if (!found) return;
        if (rec.isIntersecting) activeEntries.add(found);
        else activeEntries.delete(found);
      });
      onScroll();
    },
    { rootMargin: "20% 0px 20% 0px" }
  );
  entries.forEach((e) => io!.observe(e.el));
}

/**
 * Register an element for scroll parallax. `strength` is the peak drift as a
 * percentage of the (oversized) inner wrapper's height. Returns an unregister
 * function. A no-op under reduced motion or on the server.
 */
export function registerParallax(el: HTMLElement, strength = 6): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const entry: Entry = { el, strength };
  entries.add(entry);
  ensureListening();
  io?.observe(el);
  onScroll();

  return () => {
    entries.delete(entry);
    activeEntries.delete(entry);
    io?.unobserve(el);
    el.style.removeProperty("--parallax-y");
  };
}

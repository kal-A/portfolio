"use client";

import { useEffect, useState } from "react";

/**
 * The cycling word in the hero manifesto headline "I build ___." Each word is
 * typed in one character at a time, held, then cleared in a single step (the
 * whole word at once, like alt/ctrl+delete, per the owner's preference) before
 * the next word types in. A blinking caret trails the text.
 *
 * The first word is server-rendered in full so there is no hydration flash or
 * layout shift; the cycle begins on mount. Under reduced motion the animation
 * never starts and the first word stays put. The headline's real accessible
 * name lives in an aria-label on the <h1>; this animated text is aria-hidden.
 */

const WORDS = ["Products", "Systems", "Workflows", "Experiences", "Tools"];
const TYPE_MS = 85; // per character
const HOLD_MS = 1700; // pause on the finished word
const GAP_MS = 420; // pause after clearing, before the next word

export default function HeroBuildTyping() {
  const [typed, setTyped] = useState(WORDS[0] + ".");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let wordIndex = 0;

    const clearThenNext = () => {
      timer = setTimeout(() => {
        if (cancelled) return;
        // Remove the whole word in one step (alt-delete), not char by char.
        setTyped("");
        wordIndex = (wordIndex + 1) % WORDS.length;
        timer = setTimeout(typeWord, GAP_MS);
      }, HOLD_MS);
    };

    const typeWord = () => {
      if (cancelled) return;
      const target = WORDS[wordIndex] + ".";
      let charIndex = 0;
      const step = () => {
        if (cancelled) return;
        charIndex += 1;
        setTyped(target.slice(0, charIndex));
        if (charIndex < target.length) timer = setTimeout(step, TYPE_MS);
        else clearThenNext();
      };
      step();
    };

    // First word is already on screen (server-rendered): just hold, then cycle.
    clearThenNext();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>
      {typed}
      <span className="hero-caret" />
    </span>
  );
}

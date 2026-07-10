"use client";

import { useEffect, useRef, useState } from "react";

export default function Signature() {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="mt-2 inline-block">
      <span
        className="inline-block text-3xl text-neutral-900"
        style={{
          fontFamily: "var(--font-caveat)",
          clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 1.1s ease-out",
          transitionDelay: visible ? "1s" : "0s",
        }}
      >
        Kamal Ahsan
      </span>
    </span>
  );
}

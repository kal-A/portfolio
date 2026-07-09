"use client";

import { useEffect, useRef, useState } from "react";

export default function Signature() {
  const ref = useRef<SVGSVGElement>(null);
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
    <svg ref={ref} width="170" height="46" viewBox="0 0 170 46" className="mt-2">
      <path
        d="M6 34 C 16 8, 28 8, 32 25 C 36 40, 44 17, 52 21 C 60 25, 56 38, 65 35 C 78 32, 82 12, 96 15 C 107 17, 102 34, 113 32 C 126 30, 126 10, 140 13 C 151 15, 146 34, 162 29"
        stroke="#181614"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: visible ? 0 : 1,
          transition: "stroke-dashoffset 1.3s ease-out",
          transitionDelay: visible ? "1.1s" : "0s",
        }}
      />
    </svg>
  );
}

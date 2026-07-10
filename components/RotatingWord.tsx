"use client";

import { useEffect, useState } from "react";

export default function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaving(true);
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setLeaving(false);
      }, 500);
      return () => clearTimeout(swap);
    }, 3200);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span
      className={`inline-block border-b-2 border-dashed border-rose-500 text-rose-500 pb-0.5 transition-all duration-500 ${
        leaving ? "opacity-0 -translate-y-1.5" : "opacity-100 translate-y-0"
      }`}
    >
      {words[index]}
    </span>
  );
}

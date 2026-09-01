"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ChannelAsset } from "@/lib/content/greenhouse-channels";
import Reveal from "@/components/Reveal";

function spanClass(size: ChannelAsset["size"]) {
  // Native multi-column masonry can't partially span a subset of columns, so
  // "feature"/"wide" assets break the column flow full-width instead --
  // this avoids the empty-space bug that CSS Grid dense-packing produces
  // when mixing very different aspect ratios (e.g. a tall portrait next to
  // wide landscape assets forces the whole grid row to their combined height).
  if (size === "feature" || size === "wide") return "break-inside-avoid mb-5 [column-span:all]";
  return "break-inside-avoid mb-5";
}

export default function ChannelCollage({ assets, accent }: { assets: ChannelAsset[]; accent: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % assets.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + assets.length) % assets.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, assets.length]);

  const active = openIndex === null ? null : assets[openIndex];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {assets.map((asset, i) => (
          <Reveal key={asset.src} delay={i * 60} className={spanClass(asset.size)}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="block w-full text-left rounded-xl overflow-hidden border-2 transition-transform duration-150 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none"
              style={{ borderColor: "var(--ink)", boxShadow: "4px 4px 0 var(--ink)" }}
            >
              <span className="relative block w-full">
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  width={asset.width}
                  height={asset.height}
                  className="w-full h-auto"
                />
              </span>
              {asset.caption && (
                <span className="block text-xs leading-relaxed px-3.5 py-3" style={{ color: "#4c473e" }}>
                  {asset.caption}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 sm:px-10"
          style={{ background: "rgba(20,18,14,0.88)" }}
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg font-bold"
            style={{ borderColor: "#fff9ee", color: "#fff9ee", background: "rgba(255,255,255,0.08)" }}
          >
            ✕
          </button>

          {assets.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + assets.length) % assets.length));
                }}
                className="hidden sm:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 items-center justify-center text-xl font-bold"
                style={{ borderColor: "#fff9ee", color: "#fff9ee", background: "rgba(255,255,255,0.08)" }}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % assets.length));
                }}
                className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 items-center justify-center text-xl font-bold"
                style={{ borderColor: "#fff9ee", color: "#fff9ee", background: "rgba(255,255,255,0.08)" }}
              >
                →
              </button>
            </>
          )}

          <div
            className="relative max-w-4xl max-h-[82vh] w-full rounded-xl overflow-hidden border-2 bg-white"
            style={{ borderColor: accent }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              className="block w-full h-full max-h-[70vh] object-contain bg-white"
            />
            {active.caption && (
              <p className="text-sm leading-relaxed px-5 py-4" style={{ color: "#33302a" }}>
                {active.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

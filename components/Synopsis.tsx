"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudyTheme } from "@/lib/content/theme";

export interface SynopsisItem {
  key: string;
  heading: string;
  timeframe: string;
  summary: string;
  slug?: string;
}

export default function Synopsis({
  work,
  projects,
}: {
  work: SynopsisItem[];
  projects: SynopsisItem[];
}) {
  const [tab, setTab] = useState<"work" | "projects">("work");
  const items = tab === "work" ? work : projects;

  return (
    <div>
      <div className="flex items-center gap-2 mb-6" role="tablist" aria-label="Work or projects">
        {(["work", "projects"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={
              "text-sm font-medium rounded-full px-4 py-1.5 transition-colors " +
              (tab === key
                ? "bg-neutral-900 text-white"
                : "text-neutral-500 border border-neutral-200 hover:border-neutral-400")
            }
          >
            {key === "work" ? "Work" : "Projects"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const theme = item.slug ? caseStudyTheme[item.slug] : undefined;
          const content = (
            <div
              className="group/card relative flex items-start justify-between gap-4 rounded-lg px-5 py-4 overflow-hidden"
              style={{ border: "2px solid #181614" }}
            >
              {theme && (
                <>
                  <span
                    className="absolute inset-0 origin-bottom scale-y-0 opacity-0 transition-all duration-300 group-hover/card:scale-y-100 group-hover/card:opacity-100"
                    style={{ background: theme.fill }}
                  />
                  <span className="absolute inset-0 -z-10" style={{ background: theme.bg }} />
                </>
              )}
              <div className="relative">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs uppercase tracking-wide text-neutral-400">
                    {tab === "work" ? "Work" : "Project"}
                  </span>
                  <span className="text-xs text-neutral-500">{item.timeframe}</span>
                </div>
                <p className="font-medium text-neutral-900 mt-1">{item.heading}</p>
                <p className="text-sm text-neutral-600 mt-1">{item.summary}</p>
              </div>
              {item.slug && (
                <span className="relative text-neutral-400 group-hover/card:text-rose-500 group-hover/card:translate-x-0.5 transition-all shrink-0">
                  →
                </span>
              )}
            </div>
          );
          return item.slug ? (
            <Link key={item.key} href={`/work/${item.slug}`} className="group/link block">
              {content}
            </Link>
          ) : (
            <div key={item.key}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}

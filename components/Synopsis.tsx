"use client";

import Link from "next/link";
import { useState } from "react";

export interface SynopsisItem {
  key: string;
  heading: string;
  timeframe: string;
  summary: string;
  metric?: string;
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
          const content = (
            <div className="flex items-start justify-between gap-4 border border-neutral-200 rounded-lg px-5 py-4 group-hover:border-neutral-400 transition-colors">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-xs uppercase tracking-wide text-neutral-400">
                    {tab === "work" ? "Work" : "Project"}
                  </span>
                  <span className="text-xs text-neutral-500">{item.timeframe}</span>
                </div>
                <p className="font-medium text-neutral-900 mt-1">{item.heading}</p>
                <p className="text-sm text-neutral-600 mt-1">{item.summary}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {item.metric && (
                  <span className="text-sm font-serif text-rose-500">{item.metric}</span>
                )}
                {item.slug && (
                  <span className="text-xs text-neutral-400 group-hover:text-rose-500">→</span>
                )}
              </div>
            </div>
          );
          return item.slug ? (
            <Link key={item.key} href={`/work/${item.slug}`} className="group block">
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

"use client";

import { useState } from "react";
import { CaseStudy } from "@/lib/content/case-studies";
import { projects } from "@/lib/content/projects";
import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";

export default function WorkTabs({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [tab, setTab] = useState<"experience" | "projects">("experience");

  const experienceStudies = caseStudies.filter((cs) => cs.entryType === "internship");
  const projectStudies = projects.map((p) => ({
    project: p,
    cs: p.caseStudySlug ? caseStudies.find((cs) => cs.slug === p.caseStudySlug) : undefined,
  }));

  return (
    <div>
      <div className="flex gap-2 mb-10">
        <TabButton active={tab === "experience"} onClick={() => setTab("experience")}>
          Work experience
        </TabButton>
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects
        </TabButton>
      </div>

      {tab === "experience" && (
        <div className="grid sm:grid-cols-2 gap-6">
          {experienceStudies.map((cs, i) => (
            <CaseStudyCard key={cs.slug} cs={cs} delay={i * 60} />
          ))}
        </div>
      )}

      {tab === "projects" && (
        <div className="grid sm:grid-cols-2 gap-6">
          {projectStudies.map(({ project, cs }, i) =>
            cs ? (
              <CaseStudyCard key={cs.slug} cs={cs} delay={i * 60} />
            ) : (
              <Reveal key={project.name} delay={i * 60} className="h-full">
                <div className="h-full rounded-[20px] border-2 border-dashed border-neutral-300 bg-white/50 p-6 flex flex-col justify-center items-start">
                  <span className="text-xs font-bold uppercase tracking-wide text-neutral-500 bg-white border border-neutral-300 rounded-full px-2.5 py-1">
                    In development
                  </span>
                  <p className="font-serif text-2xl text-neutral-900 mt-4">{project.name}</p>
                  <p className="text-sm text-neutral-500 mt-1">{project.timeframe}</p>
                  <p className="text-base text-neutral-600 mt-3">{project.synopsis}</p>
                </div>
              </Reveal>
            )
          )}
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "text-sm font-bold rounded-full px-4 py-2 bg-neutral-900 text-white transition-colors"
          : "text-sm font-bold rounded-full px-4 py-2 bg-white/60 text-neutral-600 border border-neutral-300 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
      }
    >
      {children}
    </button>
  );
}

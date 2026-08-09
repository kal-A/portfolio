export interface ProjectEntry {
  name: string;
  timeframe: string;
  synopsis: string;
  caseStudySlug?: string;
  inDevelopment?: boolean;
}

export const projects: ProjectEntry[] = [
  {
    name: "RoomEase",
    timeframe: "Sept 2025 – Apr 2026",
    synopsis:
      "Turned a scattered, partly-manual club room booking process into a structured booking flow, tested through iterative usability rounds with student organizations.",
    caseStudySlug: "roomease",
  },
  {
    name: "Pill Pal",
    timeframe: "Course Project",
    synopsis:
      "An Apple Watch medication-tracking app for older adults, designed through cognitive walkthroughs and medium-fidelity prototyping, then stress-tested with a heuristic evaluation.",
    caseStudySlug: "pill-pal",
  },
  {
    name: "Chronicle",
    timeframe: "2026 - ongoing",
    synopsis:
      "An ongoing, independent AI-systems project: a bounded generation pipeline and map-first workspace being built toward a four-role historical-investigation agent system.",
    caseStudySlug: "chronicle",
  },
];

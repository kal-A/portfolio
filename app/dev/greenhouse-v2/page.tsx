import GreenhouseCaseStudyV2 from "@/components/case-study/GreenhouseCaseStudyV2";

/**
 * TEMPORARY Phase 11 verification route — not linked from any nav, not a
 * real page. Renders the shared-shell rebuild of Greenhouse for visual
 * comparison against the live /work/greenhouse route. Delete this route
 * once Phase 11 is reviewed (either discarded, or Phase 12 promotes
 * GreenhouseCaseStudyV2 into the live route directly).
 */
export default function GreenhouseV2PreviewPage() {
  return <GreenhouseCaseStudyV2 />;
}

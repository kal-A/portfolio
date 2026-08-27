import ChronicleCaseStudyV2 from "@/components/case-study/ChronicleCaseStudyV2";

/**
 * TEMPORARY Phase 13 verification route — not linked from any nav, not a
 * real page. Renders the shared-shell rebuild of Chronicle for visual
 * comparison against the live /work/chronicle route. Delete this route
 * once reviewed (either discarded, or promoted into the live route
 * directly).
 */
export default function ChronicleV2PreviewPage() {
  return <ChronicleCaseStudyV2 />;
}

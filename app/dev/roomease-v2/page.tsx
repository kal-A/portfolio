import RoomEaseCaseStudyV2 from "@/components/case-study/RoomEaseCaseStudyV2";

/**
 * TEMPORARY verification route — not linked from any nav, not a real page.
 * Renders the shared dark-shell rebuild of RoomEase for visual comparison
 * against the live /work/roomease route. Delete this route once reviewed
 * (either discarded, or promoted into the live route directly).
 */
export default function RoomEaseV2PreviewPage() {
  return <RoomEaseCaseStudyV2 />;
}

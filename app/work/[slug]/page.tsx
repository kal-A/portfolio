import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import ForceNCaseStudy from "@/components/case-study/ForceNCaseStudy";
import GreenhouseCaseStudy from "@/components/case-study/GreenhouseCaseStudy";
import PillPalCaseStudy from "@/components/case-study/PillPalCaseStudy";
import PathPeerCaseStudy from "@/components/case-study/PathPeerCaseStudy";
import RoomEaseCaseStudy from "@/components/case-study/RoomEaseCaseStudy";
import HeraCaseStudy from "@/components/case-study/HeraCaseStudy";
import InformaticaCaseStudy from "@/components/case-study/InformaticaCaseStudy";
import ChronicleCaseStudy from "@/components/case-study/ChronicleCaseStudy";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return { title: cs ? `${cs.title} · Kamal Ahsan` : "Case Study" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  if (cs.slug === "forcen") return <ForceNCaseStudy />;
  if (cs.slug === "greenhouse") return <GreenhouseCaseStudy />;
  if (cs.slug === "pill-pal") return <PillPalCaseStudy />;
  if (cs.slug === "pathpeer") return <PathPeerCaseStudy />;
  if (cs.slug === "roomease") return <RoomEaseCaseStudy />;
  if (cs.slug === "hera-fertility") return <HeraCaseStudy />;
  if (cs.slug === "informatica") return <InformaticaCaseStudy />;
  if (cs.slug === "chronicle") return <ChronicleCaseStudy />;
  notFound();
}

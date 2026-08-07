import { caseStudies } from "@/lib/content/case-studies";
import WorkTabs from "@/components/WorkTabs";

export const metadata = { title: "Work · Kamal Ahsan" };

export default function WorkIndex() {
  return (
    <div
      className="pb-20"
      style={{
        background:
          "radial-gradient(circle at 10% 0%, rgba(200,69,44,0.20) 0%, transparent 45%), radial-gradient(circle at 90% 10%, rgba(194,144,10,0.18) 0%, transparent 42%), radial-gradient(circle at 15% 55%, rgba(44,110,94,0.18) 0%, transparent 42%), radial-gradient(circle at 90% 60%, rgba(58,107,147,0.18) 0%, transparent 42%), radial-gradient(circle at 45% 100%, rgba(200,69,44,0.14) 0%, transparent 46%), linear-gradient(160deg, #fbe9dd 0%, #f3e3cc 35%, #e2ecd8 65%, #e9f1f8 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="relative overflow-hidden pt-10 pb-16"
        style={{
          background:
            "radial-gradient(circle at 12% 8%, rgba(200,69,44,0.22) 0%, transparent 48%), radial-gradient(circle at 88% 15%, rgba(44,110,94,0.2) 0%, transparent 52%), linear-gradient(160deg, #fbe9dd 0%, #f3e3cc 55%, #e2ecd8 100%)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">Work</p>
          <h1 className="font-serif text-5xl mt-3 text-neutral-900">Experience &amp; Case Studies</h1>
          <p className="text-lg text-neutral-600 mt-4 max-w-2xl">
            Every internship, capstone, and course project - product design, systems/process
            work, technical builds, and formal usability evaluation - most recent first.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 mt-12">
        <WorkTabs caseStudies={caseStudies} />
      </div>
    </div>
  );
}

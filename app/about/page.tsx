export const metadata = { title: "About · Kamal Ahsan" };

const toolGroups = [
  {
    label: "Product & Collaboration",
    items: [
      "Product Roadmaps",
      "Agile / Scrum",
      "Sprint & Project Planning",
      "User Research",
      "Process Optimization",
      "Workflow Design",
      "KPI Tracking",
      "Cross-functional Leadership",
    ],
  },
  {
    label: "Design",
    items: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "Miro"],
  },
  {
    label: "Technical",
    items: ["Python", "JavaScript / TypeScript", "SQL", "React", "Node.js", "REST APIs"],
  },
  {
    label: "Tools",
    items: ["Jira", "Confluence", "Trello", "Looker Studio", "Google Analytics", "Qualtrics"],
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20">
      <div
        className="pt-10 pb-14"
        style={{
          background:
            "radial-gradient(circle at 90% 0%, rgba(106,74,153,0.16) 0%, transparent 50%), linear-gradient(160deg, #fdfaf5 0%, #f3eefa 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">About</p>
          <h1 className="font-serif text-5xl mt-3 text-neutral-900">Kamal Ahsan</h1>

          <div className="mt-8 space-y-5 text-lg text-neutral-700 leading-relaxed">
            <p>
              I&apos;m a Management Engineering graduate from the University of Waterloo, a program
              that blends systems engineering, business, and design, which is a fairly accurate
              description of what I like doing: understanding a problem end to end, then building
              the thing that solves it.
            </p>
            <p>
              Across five internships I&apos;ve moved between product design, product operations,
              and hardware/product engineering roles: designing onboarding flows for a fintech
              startup, running sprints for an 8-person team, and owning a hardware transfer
              workflow across procurement, assembly, and shipment. I&apos;m equally comfortable
              running a user research session and writing the React/Node code behind the
              feature it informs.
            </p>
            <p>
              That range is intentional. I&apos;m now looking for full-time roles in product
              management, technical program management, and product design, where being able to
              speak both the user&apos;s language and the engineer&apos;s language is the actual job.
            </p>
          </div>
        </div>
      </div>

      <div
        className="py-14"
        style={{ background: "linear-gradient(160deg, #e4d9f2 0%, #dcebf6 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-4xl text-neutral-900 mb-6">Skills & Tools</h2>
          <div className="space-y-6">
            {toolGroups.map((group) => (
              <div key={group.label}>
                <p className="text-sm font-medium text-neutral-500 mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm rounded-full px-3 py-1.5 text-neutral-800 bg-white/70"
                      style={{ border: "1.5px solid #181614" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

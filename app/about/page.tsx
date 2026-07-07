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
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm text-rose-500 font-medium tracking-wide uppercase">About</p>
      <h1 className="font-serif text-4xl mt-3 text-neutral-900">Kamal Ahsan</h1>

      <div className="mt-8 space-y-4 text-neutral-700 leading-relaxed">
        <p>
          I&apos;m a Management Engineering student at the University of Waterloo (2021–2026),
          a program that blends systems engineering, business, and design — which is a fairly
          accurate description of what I like doing: understanding a problem end to end, then
          building the thing that solves it.
        </p>
        <p>
          Across five internships I&apos;ve moved between product design, product operations,
          and hardware/product engineering roles — designing onboarding flows for a fintech
          startup, running sprints for an 8-person team, and owning a hardware transfer
          workflow across procurement, assembly, and shipment. I&apos;m equally comfortable
          running a user research session and writing the React/Node code behind the
          feature it informs.
        </p>
        <p>
          That range is intentional. I&apos;m aiming for roles — product management, technical
          program management, product design — where being able to speak both the user&apos;s
          language and the engineer&apos;s language is the actual job.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="font-serif text-2xl text-neutral-900 mb-6">Skills & Tools</h2>
        <div className="space-y-6">
          {toolGroups.map((group) => (
            <div key={group.label}>
              <p className="text-sm font-medium text-neutral-500 mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-700"
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
  );
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  timeframe: string;
  synopsis: string;
  bullets: string[];
  caseStudySlug?: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: "Product Engineer Intern",
    company: "ForceN",
    location: "Toronto, ON",
    timeframe: "Sep 2025 – Dec 2025",
    synopsis:
      "Owned hardware transfer operations end-to-end, cutting turnaround time and assembly errors while coordinating engineering, ops, and inventory.",
    bullets: [
      "Owned an end-to-end Dev System transfer workflow — procurement → assembly → calibration → shipment — for 14+ hardware units, reducing turnaround time by 35%.",
      "Coordinated execution across engineering, operations, and inventory (6+ stakeholders), improving delivery efficiency by 30%.",
      "Standardized tracking, documentation, and QA validation across hardware configurations, reducing assembly errors by 25% and improving on-time delivery by 30%.",
    ],
  },
  {
    role: "Product Designer Intern",
    company: "Greenhouse Juices",
    location: "Mississauga, ON",
    timeframe: "Jan 2025 – Apr 2025",
    synopsis:
      "Led design and sprint execution for a small team, shipping campaigns and tightening fulfillment across every sales channel.",
    bullets: [
      "Designed user flows and supported 12+ digital campaigns, increasing engagement by 20% and conversion by 12%.",
      "Led sprint planning and execution for an 8-person team, improving delivery consistency and productivity by 25%.",
      "Managed inventory and fulfillment tracking across retail, Amazon, e-commerce, and U.S. distribution channels, improving shipment accuracy by 30%.",
    ],
    caseStudySlug: "greenhouse",
  },
  {
    role: "Product Operations & UX Research Intern",
    company: "Informatica",
    location: "Mississauga, ON",
    timeframe: "Sep 2023 – Dec 2023",
    synopsis:
      "Turned UX research into workflow fixes that lifted engagement and internal efficiency across cross-team deliverables.",
    bullets: [
      "Translated UX research into workflow improvements, increasing user engagement by 18%.",
      "Improved internal task efficiency by 20% by identifying and addressing system friction points.",
      "Coordinated cross-team deliverables, reducing missed deadlines and improving on-time delivery by 30%.",
    ],
  },
  {
    role: "Product Design & Marketing Intern",
    company: "Hera Fertility",
    location: "Remote — New York, NY",
    timeframe: "Jan 2023 – Apr 2023",
    synopsis:
      "Took a fintech onboarding experience from zero to shipped, bringing loan servicing in-house and doubling retention.",
    bullets: [
      "Led 0→1 product design for a financing platform, transitioning loan services in-house and reducing operational costs by 25%.",
      "Defined MVP scope and 5+ MVP features through user research and competitive analysis.",
      "Designed onboarding and core user flows in Figma, doubling user retention and reducing onboarding drop-off by 50%.",
    ],
    caseStudySlug: "hera-fertility",
  },
  {
    role: "Product Designer & Developer Intern",
    company: "PathPeer",
    location: "Remote — Waterloo, ON",
    timeframe: "May 2022 – Aug 2022",
    synopsis:
      "Built and shipped a mentorship platform solo, driving engagement up and drop-off down through iterative design.",
    bullets: [
      "Built and launched a mentorship web platform end-to-end, increasing engagement by 50%.",
      "Reduced inactive user drop-off by 40% through iterative design changes.",
    ],
  },
];

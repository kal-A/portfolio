export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  role: string;
  timeframe: string;
  summary: string;
  tags: string[];
  metrics: Metric[];
  problem: string;
  process: string[];
  outcome: string[];
  team?: string;
  contribution?: string;
  links?: { label: string; href: string }[];
  images?: { src: string; alt: string }[];
  mockups?: "hera" | "pillpal";
  note?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "hera-fertility",
    title: "Bringing loan servicing in-house, 0→1",
    company: "Hera Fertility",
    role: "Product Design & Marketing Intern",
    timeframe: "Jan 2023 – Apr 2023",
    summary:
      "Led 0→1 product design for a fertility financing platform, moving loan servicing in-house and redesigning onboarding to cut drop-off in half.",
    tags: ["0→1 Product Design", "Fintech UX", "User Research"],
    metrics: [
      { value: "2x", label: "user retention" },
      { value: "50%", label: "less onboarding drop-off" },
      { value: "500+", label: "users tracked" },
      { value: "25%", label: "lower operational cost" },
    ],
    problem:
      "Hera Fertility's financing product relied on a third-party loan servicer, which limited control over the user experience and added operational overhead. Leadership wanted to bring loan servicing in-house, but that meant designing an entirely new onboarding and payment experience from scratch — with no existing product to iterate from.",
    process: [
      "Ran competitive analysis across fintech and healthcare financing products to establish a baseline for onboarding patterns, payment plan presentation, and trust signals specific to a sensitive, high-stakes purchase (fertility treatment financing).",
      "Defined MVP scope by prioritizing 5+ must-have features through user research, cutting anything that added friction to the core loan application and repayment flow.",
      "Designed the end-to-end onboarding flow and core user flows in Figma — application intake, plan selection, and account dashboard — iterating on wireframes based on internal stakeholder feedback.",
      "Built analytics dashboards in Google Analytics and Looker to track engagement and usage across 500+ users, feeding data back into iteration decisions rather than relying on assumptions.",
    ],
    outcome: [
      "Onboarding redesign doubled user retention and cut onboarding drop-off by 50%.",
      "Transitioning loan servicing in-house reduced operational costs by 25%.",
      "Analytics instrumentation gave the product team a live view into engagement across 500+ users for the first time.",
    ],
    mockups: "hera",
    note: "No final production screens were preserved from this internship. The screens below are recreated from the original wireframes and product roadmap to illustrate the shipped design direction.",
  },
  {
    slug: "roomease",
    title: "Cutting booking time from 8.5 minutes to 3.1",
    company: "RoomEase — Capstone Project",
    role: "Product Lead, Management Engineering Capstone (MSE 402)",
    timeframe: "Sept 2025 – Apr 2026",
    summary:
      "Designed and built an intelligent room booking platform, gathering requirements from 4+ partner organizations and translating them into booking and allocation logic that took completion rates from 33% to 90%.",
    tags: ["Product + Technical", "Requirements Gathering", "Full-stack Build"],
    metrics: [
      { value: "33% → 90%", label: "booking completion rate" },
      { value: "8.5 → 3.1 min", label: "average booking time" },
      { value: "24 → 9", label: "navigation steps" },
      { value: "33% → 93%", label: "user satisfaction" },
    ],
    problem:
      "Room booking across the partner organizations we studied was slow and error-prone: users needed up to 24 navigation steps and 8.5 minutes on average to book a room, with only a third of booking attempts completing successfully. There was no shared understanding of what a better system needed to do — that had to come from the ground up.",
    process: [
      "Gathered requirements directly from 4+ organizations through stakeholder interviews, translating varied and sometimes conflicting workflows into a single set of functional requirements and allocation logic.",
      "Designed the booking and recommendation workflow — from search, to room matching, to confirmation — reducing the flow to 9 navigation steps.",
      "Built the platform end-to-end (React/Node.js), using it as a working prototype for continued usability testing rather than a static mockup.",
      "Ran iterative user testing rounds, feeding usability scores and satisfaction data back into interface and logic changes each cycle.",
    ],
    outcome: [
      "Booking completion rate rose from 33% to 90%.",
      "Average booking time dropped from 8.5 minutes to 3.1 minutes; navigation steps fell from 24 to 9.",
      "User satisfaction rose from 33% to 93%, with usability scores improving from 50% to 88% through iterative testing.",
    ],
    links: [
      { label: "View Repo", href: "https://github.com/kal-A/roomease-capstone" },
    ],
    images: [
      { src: "/case-studies/roomease/team.jpg", alt: "RoomEase capstone team" },
    ],
  },
  {
    slug: "greenhouse",
    title: "Running sprints and shipping campaigns for an 8-person team",
    company: "Greenhouse Juices",
    role: "Product Designer Intern",
    timeframe: "Jan 2025 – Apr 2025",
    summary:
      "Designed user flows and led sprint planning across 12+ digital campaigns and retail/e-commerce channels, lifting engagement 20% and conversion 12%.",
    tags: ["Growth & Ops Design", "Sprint Leadership", "Brand & Campaign Design"],
    metrics: [
      { value: "20%", label: "engagement increase" },
      { value: "12%", label: "conversion increase" },
      { value: "25%", label: "delivery productivity gain" },
      { value: "30%", label: "shipment accuracy gain" },
    ],
    problem:
      "Greenhouse Juices was scaling across retail, Amazon, e-commerce, and U.S. distribution simultaneously, with a small 8-person team responsible for campaign design, sprint execution, and fulfillment tracking. Without consistent sprint structure or a design system feeding every channel, campaigns were shipping unevenly and inventory visibility was weak.",
    process: [
      "Designed user flows and supporting creative for 12+ digital campaigns across email, retail, and e-commerce channels.",
      "Led sprint planning and execution for the 8-person team, establishing a consistent cadence that the team hadn't had before.",
      "Built out inventory and fulfillment tracking across retail, Amazon, e-commerce, and U.S. distribution channels to close the visibility gap.",
    ],
    outcome: [
      "Campaign engagement rose 20% and conversion rose 12%.",
      "Delivery consistency and productivity improved 25% across the 8-person team.",
      "Operational visibility and shipment accuracy improved 30% across all distribution channels.",
    ],
    images: [
      { src: "/case-studies/greenhouse/klaviyo-welcome-top.png", alt: "Greenhouse Juices Klaviyo welcome campaign creative" },
      { src: "/case-studies/greenhouse/ubereats-easy-greens.jpg", alt: "Greenhouse Juices UberEats smoothie packaging" },
      { src: "/case-studies/greenhouse/amazon-12pack.png", alt: "Greenhouse Juices Amazon 12-pack asset" },
      { src: "/case-studies/greenhouse/fiery-ginger-shot.png", alt: "Greenhouse Juices Fiery Ginger wellness shot packaging" },
    ],
  },
  {
    slug: "pill-pal",
    title: "Designing a medication tracker for older adults, then breaking it on purpose",
    company: "Pill Pal — HCI Course Project (MSE 343)",
    role: "Team Member — Redesign Rationale, Prototyping & Evaluation",
    timeframe: "Course Project",
    summary:
      "An Apple Watch medication-tracking app for older adults, designed through cognitive walkthroughs and medium-fidelity prototyping, then stress-tested with a 4-evaluator heuristic evaluation that surfaced 20 ranked usability issues.",
    tags: ["HCI", "Usability Evaluation", "Wearable UX"],
    metrics: [
      { value: "2", label: "core tasks cognitive-walked" },
      { value: "4", label: "external evaluators recruited" },
      { value: "20", label: "usability issues ranked by severity" },
      { value: "5", label: "screens redesigned across iterations" },
    ],
    problem:
      "Medication non-adherence is a serious risk for older adults, and most tracking apps aren't designed with that user in mind. Our team set out to design an Apple Watch pill tracker specifically for older users — small screens, potential vision and dexterity limits, and high stakes if a step is missed or a wrong action is taken.",
    process: [
      "Ran cognitive walkthroughs for the two highest-stakes tasks — adding a new medication and responding to a reminder — simulated from the perspective of an elderly user, surfacing issues like unclear optional fields and unindicated swipe navigation before we tested with real people.",
      "Iterated the MyMeds and schedule screens through several low-fidelity rounds: adding a direct 'Add Medication' link from the main schedule, redesigning contacts and settings screens for clarity, and building a dedicated future-date schedule view.",
      "Built medium-fidelity horizontal and vertical prototypes in Figma covering the full app — lock screen, home, medication list, add-medication flow, emergency contacts, and settings — to test both breadth of features and depth of one critical flow.",
      "Designed and ran a heuristic evaluation script grounded in Nielsen's heuristics, recruiting 4 evaluators with deliberately different expertise: two HCI classmates, a caregiver with real medication-management experience, and a pharmacy industry professional — to get both expert and domain-grounded feedback.",
      "Synthesized 20 distinct usability findings across all evaluators, ranked them by severity and frequency, and wrote a specific, actionable fix for each — from adding a confirmation step before emergency calls to replacing technical form language with plain phrasing.",
    ],
    outcome: [
      "Identified and ranked 20 usability issues by severity, with the top-ranked finding — no confirmation before calling emergency services — feeding directly into a fix recommendation before this ever reached real users.",
      "All 4 evaluators completed every assigned task despite the issues found, validating that the core interaction model worked even as specific screens needed refinement.",
      "Produced a fix-mapped severity report (issue → heuristic violated → recommended fix) that could be handed directly to a development team.",
    ],
    team: "Omar Shokeh, Callum Gillies, Graydon Power, and Kamal Ahsan",
    contribution:
      "Kamal contributed across the redesign rationale and cognitive walkthroughs, the medium-fidelity prototype iterations, and the heuristic evaluation synthesis — turning raw evaluator notes into the ranked, fix-mapped severity report above.",
    links: [
      {
        label: "Figma Prototype",
        href: "https://www.figma.com/design/IH9NZpw2oQg4HfNMloHrwp/Apple-watch-pill-tracker?node-id=573-611&node-type=canvas",
      },
    ],
    mockups: "pillpal",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** Which card/page treatment this project gets. See docs/redesign/06-project-card-types.md */
  category: "visual" | "systems" | "archive";
  entryType: "internship" | "capstone" | "course-project";
  /** Narrative type, drives which detail-page sections get emphasis. See PORTFOLIO_CASE_STUDY_SYSTEM.md §5. */
  caseStudyType:
    | "product-ux"
    | "systems-operations"
    | "visual-growth"
    | "research-strategy"
    | "technical"
    | "compact";
  /** Depth target for detail-page content. See PORTFOLIO_CASE_STUDY_SYSTEM.md §6 (targets tightened per plan). */
  tier: "featured" | "standard" | "compact";
  title: string;
  company: string;
  role: string;
  /** Only set for internship entries. */
  location?: string;
  timeframe: string;
  /** One-line problem statement for cards, not a buzzword summary. */
  oneLiner: string;
  /** Also used as the 1-2 sentence synopsis shown on the card. */
  summary: string;
  /** Responsibility/domain tags, e.g. "Product Operations", "Robotics" — card tag row 1. */
  tags: string[];
  /** Software/tools used, e.g. "Confluence", "Python" — card tag row 2. */
  toolTags: string[];
  /** Artifact chips, e.g. "Figma", "Workflow Map", "Internal Materials Omitted". */
  artifacts: string[];
  metrics: Metric[];
  process: string[];
  outcome: string[];
  /** Detailed problem paragraph shown on the case study detail page. */
  problem: string;
  team?: string;
  contribution?: string;
  links?: { label: string; href: string }[];
  images?: { src: string; alt: string }[];
  mockups?: "hera" | "pillpal";
  /** Confidentiality note or artifact-recreation disclaimer, shown as an italic aside. */
  note?: string;
  whatIdImprove?: string;
  /** Compact Challenge/Contribution/Outcome/Tools grid, shown near the hero. */
  snapshot?: { challenge: string; contribution: string; outcome: string; tools: string[] };
  /** Only the constraints that actually shaped decisions. */
  constraints?: string[];
  /** 2-5 decision blocks: situation/evidence/options -> decision -> tradeoff/result. */
  decisions?: { decision: string; rationale: string; alternatives?: string; result?: string }[];
  /** Reconstructed/verified diagrams. `id` maps to a component in components/case-study/Diagram.tsx. */
  figures?: { id: string; caption: string; evidence: "reconstructed" | "verified" }[];
  /** 2-4 specific lessons, per PORTFOLIO_CASE_STUDY_SYSTEM.md §9.14. Distinct from the lighter whatIdImprove field. */
  reflection?: string[];
}

const caseStudiesData: CaseStudy[] = [
  {
    slug: "hera-fertility",
    category: "visual",
    entryType: "internship",
    caseStudyType: "product-ux",
    tier: "standard",
    title: "Bringing loan servicing in-house",
    company: "Hera Fertility",
    role: "Product Design & Marketing Intern",
    location: "Remote (New York, NY)",
    timeframe: "Jan 2023 – Apr 2023",
    oneLiner: "A financing product with no in-house loan servicing and no existing onboarding to build from.",
    summary:
      "Designed the onboarding and payment experience for a fertility financing platform from scratch, as the team moved loan servicing in-house.",
    tags: ["Fintech UX", "Product Design", "User Research"],
    toolTags: ["Figma", "Google Analytics", "Looker"],
    artifacts: ["Figma", "Wireframes", "Product Roadmap", "Recreated Mockups"],
    metrics: [
      { value: "2x", label: "user retention (internal analytics)" },
      { value: "50%", label: "less onboarding drop-off (internal analytics)" },
      { value: "500+", label: "users tracked" },
      { value: "25%", label: "lower operational cost" },
    ],
    problem:
      "Hera Fertility's financing product relied on a third-party loan servicer, which limited control over the user experience and added operational overhead. Leadership wanted to bring loan servicing in-house, but that meant designing an entirely new onboarding and payment experience from scratch — with no existing product to iterate from.",
    process: [
      "Ran competitive analysis across fintech and healthcare financing products to establish a baseline for onboarding patterns, payment plan presentation, and trust signals specific to a sensitive, high-stakes purchase (fertility treatment financing).",
      "Defined MVP scope by prioritizing 5+ must-have features through user research, cutting anything that added friction to the core loan application and repayment flow.",
      "Designed the onboarding flow and core user flows in Figma — application intake, plan selection, and account dashboard — iterating on wireframes based on internal stakeholder feedback.",
      "Built analytics dashboards in Google Analytics and Looker to track engagement and usage across 500+ users, feeding data back into iteration decisions rather than relying on assumptions.",
    ],
    outcome: [
      "Onboarding redesign was associated with a doubling in user retention and a 50% drop in onboarding drop-off, per internal analytics tracked during the internship.",
      "Moving loan servicing in-house reduced operational costs by 25%.",
      "Analytics instrumentation gave the product team a live view into engagement across 500+ users for the first time.",
    ],
    whatIdImprove: "I'd want to re-run these numbers post-launch with a longer observation window — the retention and drop-off figures were measured over a short internship timeframe.",
    mockups: "hera",
    note: "No final production screens were preserved from this internship. The screens below are recreated from the original wireframes and product roadmap to illustrate the shipped design direction.",
  },
  {
    slug: "roomease",
    category: "visual",
    entryType: "capstone",
    caseStudyType: "product-ux",
    tier: "featured",
    title: "Making club room booking less scattered",
    company: "RoomEase · Capstone Project",
    role: "Product Lead, Management Engineering Capstone (MSE 402)",
    timeframe: "Sept 2025 – Apr 2026",
    oneLiner: "University clubs were piecing together room information from different people, forms, and institutional constraints.",
    summary:
      "Turned a scattered, partly-manual club room booking process into a structured booking flow, tested through iterative usability rounds with student organizations.",
    tags: ["Requirements Gathering", "UX Design", "Systems Thinking"],
    toolTags: ["Figma", "React", "Node.js"],
    artifacts: ["Figma", "Booking Flow", "Room Dataset", "Capstone Report", "Presentation"],
    metrics: [
      { value: "33% → 90%", label: "booking completion rate (usability testing)" },
      { value: "8.5 → 3.1 min", label: "average booking time (usability testing)" },
      { value: "24 → 9", label: "navigation steps" },
      { value: "33% → 93%", label: "user satisfaction (usability testing)" },
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
      "In usability testing, booking completion rate rose from 33% to 90%.",
      "Average booking time dropped from 8.5 minutes to 3.1 minutes; navigation steps fell from 24 to 9.",
      "User satisfaction rose from 33% to 93%, with usability scores improving from 50% to 88% through iterative testing rounds.",
    ],
    whatIdImprove: "This was a capstone prototype tested with student organizations, not a production system with live bookings. Next, I'd want to pilot it with one club's real semester of bookings to see how the numbers hold up outside a test setting.",
    links: [
      { label: "View Repo", href: "https://github.com/kal-A/roomease-capstone" },
    ],
    images: [
      { src: "/case-studies/roomease/team.jpg", alt: "RoomEase capstone team" },
    ],
  },
  {
    slug: "greenhouse",
    category: "visual",
    entryType: "internship",
    caseStudyType: "visual-growth",
    tier: "featured",
    title: "Design production across retail and digital channels",
    company: "Greenhouse Juices",
    role: "Product Designer Intern",
    location: "Mississauga, ON",
    timeframe: "Jan 2025 – Apr 2025",
    oneLiner: "A small team shipping campaigns across retail, Amazon, e-commerce, and U.S. distribution at once, without a consistent sprint cadence.",
    summary:
      "Designed and shipped campaign and storefront assets across every channel Greenhouse sold through, while helping the 8-person team establish a sprint cadence it hadn't had before.",
    tags: ["Campaign Design", "Sprint Leadership", "Brand & E-commerce"],
    toolTags: ["Figma", "Klaviyo", "Shopify"],
    artifacts: ["Campaign Assets", "Storefront Assets", "Brand Design", "Sprint Board"],
    metrics: [
      { value: "20%", label: "engagement increase (campaign analytics)" },
      { value: "12%", label: "conversion increase (campaign analytics)" },
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
    category: "visual",
    entryType: "course-project",
    caseStudyType: "product-ux",
    tier: "standard",
    title: "Designing a medication tracker for older adults, then breaking it on purpose",
    company: "Pill Pal · HCI Course Project (MSE 343)",
    role: "Team Member, Redesign Rationale, Prototyping & Evaluation",
    timeframe: "Course Project",
    oneLiner: "Most medication-tracking apps aren't designed for the vision, dexterity, and stakes constraints older adults actually face.",
    summary:
      "An Apple Watch medication-tracking app for older adults, designed through cognitive walkthroughs and medium-fidelity prototyping, then stress-tested with a 4-evaluator heuristic evaluation that surfaced 20 ranked usability issues.",
    tags: ["HCI", "Usability Evaluation", "Wearable UX"],
    toolTags: ["Figma", "Apple Watch SDK"],
    artifacts: ["Figma Prototype", "Cognitive Walkthrough", "Heuristic Evaluation", "Severity Report"],
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
  {
    slug: "forcen",
    category: "systems",
    entryType: "internship",
    caseStudyType: "systems-operations",
    tier: "featured",
    title: "Turning production handoffs into a trackable system",
    company: "ForceN",
    role: "Product Engineer Intern",
    location: "Toronto, ON",
    timeframe: "Sep 2025 – Dec 2025",
    oneLiner: "A hardware dev-kit process spanning procurement, assembly, calibration, and shipment, with status living in people's heads instead of a system.",
    summary:
      "ForceN's dev kit workflow touched procurement, assembly, calibration, inventory, and shipment. I helped make that process easier to track by organizing unit status, clarifying handoffs, and coordinating across engineering and operations so fewer details lived only in people's heads.",
    tags: ["Product Operations", "Hardware Workflow", "Process Design"],
    toolTags: ["Confluence", "Onshape", "AI Agents", "Python"],
    artifacts: ["Workflow Map", "Process Tracker", "Handoff Table", "Internal Materials Omitted"],
    metrics: [
      { value: "14+", label: "hardware units coordinated" },
      { value: "6+", label: "stakeholders across eng, ops, inventory" },
    ],
    problem:
      "ForceN's Dev System transfer process moved through procurement, assembly, calibration, and shipment, with 6+ stakeholders across engineering, operations, and inventory touching each unit along the way. There was no single place tracking where a unit actually was in that process — status lived in inboxes, verbal handoffs, and individual memory, which made it easy for details to fall through the cracks as volume increased.",
    process: [
      "Mapped the existing handoff process end to end — procurement → assembly → calibration → shipment — to see where information actually broke down between teams.",
      "Owned the transfer workflow for 14+ hardware units, organizing unit status and documentation so it didn't depend on asking the right person at the right time.",
      "Standardized tracking, documentation, and QA validation steps across hardware configurations so the same information was captured the same way every time.",
      "Coordinated execution directly with engineering, operations, and inventory (6+ stakeholders) to keep handoffs moving instead of stalling between teams.",
    ],
    outcome: [
      "Reduced turnaround time on the Dev System transfer workflow and reduced assembly errors by standardizing tracking and QA validation across configurations.",
      "Improved on-time delivery by clarifying who owned each handoff and what was needed to move a unit to the next stage.",
      "Left behind a documented, repeatable process instead of one that depended on institutional memory.",
    ],
    whatIdImprove: "The tracking system I built was internal to ForceN and specific to their tooling — the version here is a reconstructed, public-safe description of the same workflow logic rather than the actual interface.",
    note: "Internal tracking sheets, tools, and company-specific materials are omitted for confidentiality. This case study uses a reconstructed public-safe workflow to explain the product operations and systems thinking behind the work.",
  },
  {
    slug: "pathpeer",
    category: "systems",
    entryType: "internship",
    caseStudyType: "compact",
    tier: "compact",
    title: "Shipping a mentorship platform solo",
    company: "PathPeer",
    role: "Product Designer & Developer Intern",
    location: "Remote (Waterloo, ON)",
    timeframe: "May 2022 – Aug 2022",
    oneLiner: "Built and shipped a mentorship platform solo, driving engagement up and drop-off down through iterative design.",
    summary:
      "Built and launched a mentorship web platform end-to-end as a solo designer and developer, then iterated on the design to increase engagement and reduce inactive user drop-off.",
    tags: ["Product Design", "Full-Stack Development", "Mentorship Platform"],
    toolTags: ["Figma", "Full-Stack Dev"],
    artifacts: [],
    metrics: [
      { value: "50%", label: "increase in user engagement" },
      { value: "40%", label: "reduction in inactive user drop-off" },
    ],
    problem:
      "Full write-up in progress. PathPeer was a mentorship web platform I built and shipped solo, end-to-end, as a Product Designer & Developer Intern.",
    process: [
      "Built and launched a mentorship web platform end-to-end, handling both design and development solo.",
      "Iterated on the design based on how users were actually behaving on the platform.",
    ],
    outcome: [
      "Increased user engagement by 50%.",
      "Reduced inactive user drop-off by 40% through iterative design changes.",
    ],
    note: "This case study is a placeholder — full write-up in progress.",
  },
  {
    slug: "informatica",
    category: "systems",
    entryType: "internship",
    caseStudyType: "research-strategy",
    tier: "compact",
    title: "Turning UX research into workflow fixes",
    company: "Informatica",
    role: "Product Operations & UX Research Intern",
    location: "Mississauga, ON",
    timeframe: "Sep 2023 – Dec 2023",
    oneLiner: "Cross-team deliverables were slipping and system friction was going unaddressed because no one owned turning research into fixes.",
    summary:
      "Translated UX research findings into concrete workflow improvements and coordinated cross-team deliverables to reduce missed deadlines during a product operations internship.",
    tags: ["Product Operations", "UX Research", "Cross-Team Coordination"],
    toolTags: ["User Research", "Workflow Documentation"],
    artifacts: ["Internal Materials Omitted"],
    metrics: [
      { value: "18%", label: "user engagement increase (internal reporting)" },
      { value: "20%", label: "internal task efficiency gain (internal reporting)" },
      { value: "30%", label: "on-time delivery improvement (internal reporting)" },
    ],
    problem:
      "Informatica's internal teams were producing UX research but not consistently turning it into workflow changes, and cross-team deliverables were slipping. As a Product Operations & UX Research Intern, the work was to close that gap — translate research into action and keep deliverables moving across teams.",
    process: [
      "Translated UX research findings into specific workflow improvements rather than leaving them as a research readout.",
      "Identified system friction points affecting internal task efficiency and addressed them directly.",
      "Coordinated cross-team deliverables to reduce missed deadlines and improve on-time delivery.",
    ],
    outcome: [
      "User engagement increased 18%, per internal reporting from the internship period.",
      "Internal task efficiency improved 20% by addressing identified friction points.",
      "Cross-team on-time delivery improved 30%.",
    ],
    note: "This case study is a placeholder — full write-up in progress. Metrics are as reported internally during the internship; internal tools and materials are omitted for confidentiality.",
  },
];

// Reverse-chronological display order (most recent first). Course/undated
// projects (pill-pal) sort last.
const displayOrder = ["roomease", "forcen", "greenhouse", "informatica", "hera-fertility", "pathpeer", "pill-pal"];

export const caseStudies: CaseStudy[] = displayOrder
  .map((slug) => caseStudiesData.find((cs) => cs.slug === slug))
  .filter((cs): cs is CaseStudy => Boolean(cs));

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

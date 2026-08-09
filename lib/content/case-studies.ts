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
  /** Responsibility/domain tags, e.g. "Product Operations", "Robotics" - card tag row 1. */
  tags: string[];
  /** Software/tools used, e.g. "Confluence", "Python" - card tag row 2. */
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
  images?: { src: string; alt: string; channel?: string; channelSlug?: string; caption?: string }[];
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
      "Hera Fertility's financing product relied on a third-party loan servicer, which limited control over the user experience and added operational overhead. Leadership wanted to bring loan servicing in-house, but that meant designing an entirely new onboarding and payment experience from scratch - with no existing product to iterate from.",
    process: [
      "Ran competitive analysis across fintech and healthcare financing products to establish a baseline for onboarding patterns, payment plan presentation, and trust signals specific to a sensitive, high-stakes purchase (fertility treatment financing).",
      "Defined MVP scope by prioritizing 5+ must-have features through user research, cutting anything that added friction to the core loan application and repayment flow.",
      "Designed the onboarding flow and core user flows in Figma - application intake, plan selection, and account dashboard - iterating on wireframes based on internal stakeholder feedback.",
      "Built analytics dashboards in Google Analytics and Looker to track engagement and usage across 500+ users, feeding data back into iteration decisions rather than relying on assumptions.",
    ],
    outcome: [
      "Onboarding redesign was associated with a doubling in user retention and a 50% drop in onboarding drop-off, per internal analytics tracked during the internship.",
      "Moving loan servicing in-house reduced operational costs by 25%.",
      "Analytics instrumentation gave the product team a live view into engagement across 500+ users for the first time.",
    ],
    whatIdImprove: "I'd want to re-run these numbers post-launch with a longer observation window - the retention and drop-off figures were measured over a short internship timeframe.",
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
      "Room booking across the partner organizations we studied was slow and error-prone: users needed up to 24 navigation steps and 8.5 minutes on average to book a room, with only a third of booking attempts completing successfully. There was no shared understanding of what a better system needed to do - that had to come from the ground up.",
    process: [
      "Gathered requirements directly from 4+ organizations through stakeholder interviews, translating varied and sometimes conflicting workflows into a single set of functional requirements and allocation logic.",
      "Designed the booking and recommendation workflow - from search, to room matching, to confirmation - reducing the flow to 9 navigation steps.",
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
    title: "Designing the customer-facing experience and the systems behind it",
    company: "Greenhouse Juices",
    role: "Product Designer Intern",
    location: "Mississauga, ON",
    timeframe: "Jan 2025 – Apr 2025",
    oneLiner: "The same bottle of Fiery Ginger had to work as an Amazon listing, a Klaviyo email, and a printed trade sell sheet - three formats, three audiences, one brand.",
    summary:
      "Designed and adapted retail, e-commerce, email, and internal brand creative across Amazon, trade/retail collateral, and Klaviyo campaigns, while helping keep the UID tracking and inventory routing behind them organized enough for a lean team to move in sync.",
    tags: ["Retail & E-commerce Design", "Product Tracking", "Inventory Coordination"],
    toolTags: ["Adobe Creative Suite", "Canva", "Microsoft Planner", "OneDrive"],
    artifacts: ["Product Design", "Retail & E-commerce Assets", "UID Tracking Sheet", "Inventory Routing", "Sprint Board"],
    metrics: [],
    problem:
      "An Amazon listing earns attention in a thumbnail grid; a Klaviyo email earns it in an inbox; a printed trade sell sheet earns it in the ten seconds a retail buyer spends scanning a table. Greenhouse needed the same handful of product lines - Fiery Ginger, Green Ritual, Super Smoothies - to hold together as one recognizable brand across all of it, with a lean 8-person team and no shared system feeding those channels. Without one, the same bottle could look like a different product from one touchpoint to the next, and no one had a clear view of which product records and inventory were actually current behind the scenes.",
    process: [
      "Designed and adapted creative for 12+ campaigns across Amazon listings, Klaviyo email, and retail sell sheets - treating each as its own format instead of resizing one master file, since an A+ content module and a printed trade sheet have to work completely differently.",
      "Led sprint planning for the 8-person team, giving campaign work a consistent cadence it hadn't had before, so design, marketing, and fulfillment weren't pulling from different timelines.",
      "Built out UID and inventory tracking in OneDrive connecting Amazon, retail, and e-commerce, so product status and stock were something the team could check in one place instead of chasing down channel by channel.",
    ],
    outcome: [
      "Amazon, email, and retail creative stayed visually consistent with the Greenhouse brand while still meeting each channel's own format and constraints.",
      "The 8-person team worked off a shared sprint cadence instead of ad hoc requests, giving campaign output a predictable rhythm for the first time.",
      "UID and inventory tracking gave the team one shared reference for product status and stock instead of re-checking with whoever last touched a given SKU.",
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
      "Medication non-adherence is a serious risk for older adults, and most tracking apps aren't designed with that user in mind. Our team set out to design an Apple Watch pill tracker specifically for older users - small screens, potential vision and dexterity limits, and high stakes if a step is missed or a wrong action is taken.",
    process: [
      "Ran cognitive walkthroughs for the two highest-stakes tasks - adding a new medication and responding to a reminder - simulated from the perspective of an elderly user, surfacing issues like unclear optional fields and unindicated swipe navigation before we tested with real people.",
      "Iterated the MyMeds and schedule screens through several low-fidelity rounds: adding a direct 'Add Medication' link from the main schedule, redesigning contacts and settings screens for clarity, and building a dedicated future-date schedule view.",
      "Built medium-fidelity horizontal and vertical prototypes in Figma covering the full app - lock screen, home, medication list, add-medication flow, emergency contacts, and settings - to test both breadth of features and depth of one critical flow.",
      "Designed and ran a heuristic evaluation script grounded in Nielsen's heuristics, recruiting 4 evaluators with deliberately different expertise: two HCI classmates, a caregiver with real medication-management experience, and a pharmacy industry professional - to get both expert and domain-grounded feedback.",
      "Synthesized 20 distinct usability findings across all evaluators, ranked them by severity and frequency, and wrote a specific, actionable fix for each - from adding a confirmation step before emergency calls to replacing technical form language with plain phrasing.",
    ],
    outcome: [
      "Identified and ranked 20 usability issues by severity, with the top-ranked finding - no confirmation before calling emergency services - feeding directly into a fix recommendation before this ever reached real users.",
      "All 4 evaluators completed every assigned task despite the issues found, validating that the core interaction model worked even as specific screens needed refinement.",
      "Produced a fix-mapped severity report (issue → heuristic violated → recommended fix) that could be handed directly to a development team.",
    ],
    team: "Omar Shokeh, Callum Gillies, Graydon Power, and Kamal Ahsan",
    contribution:
      "Kamal contributed across the redesign rationale and cognitive walkthroughs, the medium-fidelity prototype iterations, and the heuristic evaluation synthesis - turning raw evaluator notes into the ranked, fix-mapped severity report above.",
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
    title: "Building an inventory-backed production system for ForceN's Dev Systems",
    company: "ForceN",
    role: "Product Engineer Intern",
    location: "Toronto, ON",
    timeframe: "Sep 2025 – Dec 2025",
    oneLiner: "ForceN wanted standard Dev Systems built ahead of demand and shipped from finished inventory instead of starting from zero on every order.",
    summary:
      "Developed the end-to-end operating roadmap connecting parts planning, procurement, assembly, calibration, documentation, finished-product inventory, and fulfilment, so ForceN's standard Dev Systems could become an inventory-backed product line.",
    tags: ["Product Operations", "Hardware Workflow", "Process Design"],
    toolTags: ["Confluence", "Onshape", "AI Agents", "Python"],
    artifacts: ["Production Roadmap", "Inventory Logic", "Documentation System", "Internal Materials Omitted"],
    metrics: [
      { value: "14+", label: "hardware units coordinated" },
      { value: "6+", label: "stakeholders across eng, ops, inventory" },
    ],
    problem:
      "ForceN's Dev System transfer process moved through procurement, assembly, calibration, and shipment, with 6+ stakeholders across engineering, operations, and inventory touching each unit along the way. There was no single place tracking where a unit actually was in that process - status lived in inboxes, verbal handoffs, and individual memory, which made it easy for details to fall through the cracks as volume increased.",
    process: [
      "Mapped the existing handoff process end to end - procurement → assembly → calibration → shipment - to see where information actually broke down between teams.",
      "Owned the transfer workflow for 14+ hardware units, organizing unit status and documentation so it didn't depend on asking the right person at the right time.",
      "Standardized tracking, documentation, and QA validation steps across hardware configurations so the same information was captured the same way every time.",
      "Coordinated execution directly with engineering, operations, and inventory (6+ stakeholders) to keep handoffs moving instead of stalling between teams.",
    ],
    outcome: [
      "Reduced turnaround time on the Dev System transfer workflow and reduced assembly errors by standardizing tracking and QA validation across configurations.",
      "Improved on-time delivery by clarifying who owned each handoff and what was needed to move a unit to the next stage.",
      "Left behind a documented, repeatable process instead of one that depended on institutional memory.",
    ],
    whatIdImprove: "The tracking system I built was internal to ForceN and specific to their tooling - the version here is a reconstructed, public-safe description of the same workflow logic rather than the actual interface.",
    note: "Internal tracking sheets, tools, and company-specific materials are omitted for confidentiality. This case study uses a reconstructed public-safe workflow to explain the product operations and systems thinking behind the work.",
    figures: [
      {
        id: "forcen-workflow",
        caption: "The Dev System production and fulfilment workflow, from planned stock build through customer shipment. Click a node for details.",
        evidence: "reconstructed",
      },
    ],
  },
  {
    slug: "pathpeer",
    category: "systems",
    entryType: "internship",
    caseStudyType: "compact",
    tier: "compact",
    title: "Turning session recordings into a feature plan",
    company: "PathPeer",
    role: "Product Designer & Developer Intern",
    location: "Remote (Waterloo, ON)",
    timeframe: "May 2022 – Aug 2022",
    oneLiner: "Built a career-mentorship discovery platform solo, then used analytics and session recordings to recommend what to fix next.",
    summary:
      "Designed and built PathPeer's mentorship-discovery platform solo within a small team, then used Google Analytics and Hotjar recordings on search and shortlisting behavior to find where users were getting stuck, turned those patterns into prioritized feature plans such as new discovery tags and homepage flows for new mentors, and validated smaller ideas with Bubble.io before requesting further development time.",
    tags: ["Product Management", "UX Research", "Behavioural Analytics"],
    toolTags: ["Google Analytics", "Hotjar", "Figma", "Bubble.io"],
    artifacts: [],
    metrics: [
      { value: "50%", label: "increase in user engagement (internship period)" },
      { value: "40%", label: "reduction in inactive user drop-off (internship period)" },
    ],
    problem:
      "PathPeer helped users explore career paths and find professionals they could connect with as mentors, for networking, advice, and guidance. Once the platform was live, the open question was no longer whether people were using it, but where they were getting stuck in search and mentor discovery, and what to fix first. As the platform's solo designer and developer, working within a small team, I used behavioral evidence to recommend and plan what came next.",
    process: [
      "Designed and built PathPeer's mentorship-discovery platform end-to-end, handling design and development solo within a small team.",
      "Used Google Analytics to find where engagement dropped in search and mentor discovery, then reviewed the matching Hotjar recordings to see what was actually happening at each point.",
      "Turned the strongest patterns, including opportunities like mentor discovery tags, shortlisting improvements, and new-mentor homepage discovery, into scoped feature and requirement plans, and validated smaller ideas with Bubble.io before requesting further development time.",
      "Iterated on the design based on that evidence rather than assumptions.",
    ],
    outcome: [
      "User engagement increased 50% and inactive user drop-off dropped 40% over the internship period, the platform's reported results for that time.",
      "These reflect the platform's overall growth during the internship, with the analytics-and-recordings loop shaping which iterative changes, like new discovery tags and homepage flows for new mentors, went into that period rather than being the sole driver of the numbers.",
    ],
    note: "This case study reconstructs the categories of analysis and feature work from the internship, not verbatim session data; the platform's internal analytics dashboards and session recordings are not shown for confidentiality.",
    whatIdImprove: "The 50% engagement and 40% drop-off numbers are the platform's overall internship-period results, not isolated to the analytics-and-recordings loop. I'd want to track changes at the feature level next time, so a given fix's impact could be measured on its own instead of folded into total growth.",
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
      "Informatica's internal teams were producing UX research but not consistently turning it into workflow changes, and cross-team deliverables were slipping. As a Product Operations & UX Research Intern, the work was to close that gap - translate research into action and keep deliverables moving across teams.",
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
    note: "This case study is a placeholder - full write-up in progress. Metrics are as reported internally during the internship; internal tools and materials are omitted for confidentiality.",
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

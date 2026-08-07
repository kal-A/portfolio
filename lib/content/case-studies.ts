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
    tier: "featured",
    title: "Designing financing and care-discovery flows for a 0-to-1 fertility platform",
    company: "Hera Fertility",
    role: "Product Design & Marketing Intern",
    location: "Remote (New York, NY)",
    timeframe: "Jan 2023 – Apr 2023",
    oneLiner: "Fertility treatment financing is confusing and high-stakes, and Hera had no existing product to design from.",
    summary:
      "Designed the financing application, payment-plan comparison, and clinic-discovery flows for a 0-to-1 fertility financing platform, then planned the analytics instrumentation needed to decide what to build next.",
    tags: ["Fintech UX", "Product Design", "Product Planning"],
    toolTags: ["Figma", "Balsamiq", "Google Analytics", "Looker Studio"],
    artifacts: ["Wireframes", "Payment Plan Research", "Clinic Discovery Design", "Product Roadmap", "Analytics Planning"],
    metrics: [],
    problem:
      "Hera Fertility's financing application ran through a third-party loan processor, Loanglide, which limited how much of the sign-up and payment experience the team could actually design. There was no existing in-house product to iterate from, and fertility financing itself is a dense, high-stakes decision: users had to understand a requested amount, a repayment plan, and clinic pricing before they could act, at a moment when they were already navigating a stressful process. The team's goal was to design and stand up Hera's own financing flow, payment-plan presentation, and clinic-discovery experience, then use behavioral data to decide what to build next.",
    process: [
      "Audited how fintech, retail-subscription, and fertility-adjacent products (Costco, GoodRx, Walmart, Bitly, Boston IVF, Ro, FCI, Alabama Fertility) presented payment options, then translated the strongest pattern into a Hera-specific payment-plan concept.",
      "Designed and iterated the prequalification and address-entry steps in the financing wireframes across several rounds, tightening input formatting and field count based on internal review.",
      "Designed the clinic search, filter, and detail experience for 'Near Me' clinic discovery across multiple layout passes, working through what data a filter could realistically support.",
      "Planned Google Analytics and Looker Studio instrumentation scoped to specific flows (financing sign-up, Hera Care, Hera Care+) instead of generic site-wide tracking, so the data could feed a specific product question.",
      "Contributed to the six-week execution roadmap moving the financing app off Loanglide and onto Hera's own AWS-hosted build, alongside the project owner and one other co-op.",
    ],
    outcome: [
      "Designed a three-step prequalification flow and iterated its address-entry step from four manual fields to a single autofill-driven field, after flagging the four-field version as a likely source of drop-off.",
      "Translated competitive and pattern research into a tiered payment-plan concept (modeled on a SaaS-style pricing table rather than a subscription-discount block) for IVF, egg-freezing, and IUI financing.",
      "Designed the clinic discovery search, filter, and detail experience end to end, including the filter fields and a price-range filter that stayed explicitly flagged as unresolved rather than shipped half-working.",
      "Scoped the Google Analytics and Looker Studio plan to the financing sign-up flow and named product paths (Hera Care, Hera Care+) so engagement data could inform specific iteration decisions once instrumented.",
      "Contributed to the phased roadmap (AWS staging, QA and documentation, site-wide launch) for moving the financing app off a third-party loan processor and onto an in-house build.",
    ],
    whatIdImprove:
      "Formal usability-test results and post-launch analytics from this internship weren't preserved, so this case study is built from the design artifacts, competitive research, and roadmap that were. I'd want to pair the shipped version with real usage data if I could access it again.",
    team: "Thiv (project owner and primary stakeholder), Faiq (co-op), and Kamal (co-op), with Kamal and Thiv sharing product-management responsibility for planning and execution.",
    contribution:
      "Kamal owned the financing-flow and clinic-discovery design work end to end, ran the competitive and pattern research behind the payment-plan concept, and shared PM responsibility for the six-week execution roadmap with Thiv.",
    note: "No final production screens were preserved from this internship. The original wireframes, roadmap, and research notes shown below are real; the polished screens beside them are reconstructions built from that same source material, not the shipped production UI.",
    snapshot: {
      challenge: "Fertility financing was routed through a third-party loan processor, with no in-house product to design the sign-up, payment, or clinic-discovery experience around.",
      contribution: "Designed the financing flow, payment-plan concept, and clinic-discovery experience, then planned the analytics needed to decide what came next.",
      outcome: "A reconstructed but faithful financing, payment-plan, and clinic-discovery design system, plus a scoped analytics plan and phased launch roadmap.",
      tools: ["Figma", "Balsamiq", "Google Analytics", "Looker Studio"],
    },
    constraints: [
      "No existing in-house financing product to iterate from. The application intake, payment-plan presentation, and clinic-discovery experience had to be designed from a blank page.",
      "The financing flow depended on a third-party loan processor (Loanglide) for the underlying process, which limited what the in-house app could control until that dependency was migrated.",
      "Clinic pricing wasn't consistently available across clinics, which kept price-range filtering flagged as a hard, unresolved problem rather than a shipped feature.",
      "A six-week execution window (per the internal roadmap) for moving the financing app from staging to a site-wide launch, shared across a two-co-op team.",
    ],
    decisions: [
      {
        decision: "Collapsed the address-entry step from four separate fields to one autofill-driven field.",
        rationale:
          "An early version of the prequalification flow's second step asked for address, city, state, and ZIP as four manual fields. A revised version replaced that with a single autocomplete-style address field, annotated as autofilling every address parameter from one user interaction.",
        alternatives: "Kept the four-field version as an option, with a dropdown-assisted street selector instead of full autofill.",
        result: "Fewer required inputs in a step users could abandon, at the cost of relying on an address-matching service getting the result right.",
      },
      {
        decision: "Locked phone number and date of birth into masked, static-character input formats.",
        rationale:
          "The original phone and date-of-birth fields were open text inputs. The revised wireframe adds a fixed (XXX)-XXX-XXXX pattern and XX/XX/XXXX pattern, with the separating characters marked static and non-deletable so users could only edit the actual digits.",
        result: "A more consistent, harder-to-malform input pattern for two of the more error-prone fields in a financial intake form.",
      },
      {
        decision: "Modeled the payment-plan page on a tiered SaaS pricing table instead of a subscription-discount block.",
        rationale:
          "The payment-plan research compared several pricing-presentation patterns: Boston IVF's package cards, Costco's two-tier comparison, Walmart's percentage-off subscription blocks, GoodRx's single membership upsell, and Bitly's four-tier pricing table. Most direct fertility competitors (FCI, Alabama Fertility) didn't present financing as comparable packages at all.",
        alternatives: "A percentage-off subscription block (Walmart pattern) or a single membership upsell (GoodRx pattern).",
        result: "A three-option payment-plan layout, one set per treatment type (IVF, egg freezing, IUI), reused across the treatment-specific concept pages.",
      },
      {
        decision: "Cut doctor name and a percentage rating from the clinic-detail field list.",
        rationale:
          "The initial clinic-detail field list included hours, About, clinic score, phone, specialty, services, and location, alongside doctor name and a percentage rating. Both of the latter are marked out in the working sketch.",
        result: "A simpler clinic-detail page built around fields that could be populated consistently across clinics, keeping clinic score as the one rating signal.",
      },
    ],
    reflection: [
      "Reducing friction in a financial form is as much about input format as field count. Locking phone and date-of-birth into a masked pattern mattered as much as cutting the address step down to one field.",
      "Competitive research is more useful when it looks past the immediate category. Costco, GoodRx, and Bitly's pricing pages taught us more about presenting payment options clearly than the fertility competitors did, since most of them had no comparable packaging pattern at all.",
      "Analytics only earns its place once it's tied to a specific product question. Scoping the Google Analytics and Looker Studio plan to named flows, financing sign-up, Hera Care, Hera Care+, mattered more than tracking everything on the site.",
      "Not every open question needs to be resolved in the same pass. Price-range filtering for clinic search stayed explicitly flagged as unsolved rather than shipped half-working, which felt more honest than forcing a fix before the underlying data problem was solved.",
    ],
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
    note: "This case study is a placeholder - full write-up in progress.",
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

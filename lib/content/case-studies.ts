export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  /** Which card/page treatment this project gets. See docs/redesign/06-project-card-types.md */
  category: "visual" | "systems" | "archive";
  entryType: "internship" | "capstone" | "course-project" | "independent-project";
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
  {
    slug: "chronicle",
    category: "systems",
    entryType: "independent-project",
    caseStudyType: "technical",
    tier: "featured",
    title: "Building an AI-first historical investigation workspace",
    company: "Chronicle · Independent Product",
    role: "Solo builder - product, architecture, and AI systems",
    timeframe: "2026 - ongoing",
    oneLiner:
      "Historical claims need evidence, provenance, and uncertainty attached to them, not a confident chatbot answer or a static timeline.",
    summary:
      "An ongoing, independent AI-systems project: a bounded, auditable investigation-generation pipeline and a map-first workspace, being built toward a four-role agent system that has to argue from cited evidence instead of inventing history.",
    tags: ["AI Systems", "Agent Architecture", "Product Architecture"],
    toolTags: ["Python", "Pydantic", "TypeScript", "React", "Ollama", "MapLibre GL JS"],
    artifacts: ["Architecture Docs", "Deterministic Pipeline", "Typed Tool Registry", "Test Suite"],
    metrics: [
      { value: "8-stage", label: "resumable generation pipeline (Python)" },
      { value: "10", label: "typed, corpus-bound agent tools built" },
      { value: "2", label: "independently-sourced investigations on one generic renderer" },
      { value: "500+", label: "backend and frontend automated tests passing (snapshot, see Verification)" },
    ],
    problem:
      "Ordinary historical explanations compress disagreement, uncertain timing, and disputed causation into confident prose. Chronicle's problem was to build a system, not just an interface, where a claim about the past could never appear without the evidence, timing, and uncertainty that produced it, and where an eventual AI agent layer would be bounded and auditable enough to be trusted with that responsibility.",
    process: [
      "Defined a versioned GeneratedInvestigation contract (Zod on the frontend, a field-for-field Pydantic mirror on the backend) before writing any generation logic, so every package a pipeline could ever produce was schema-valid and cross-reference-checked by construction.",
      "Built a resumable, file-persisted, 8-stage Python generation pipeline and proved it mechanically with deterministic mock providers on arbitrary topics before curating any real historical content.",
      "Hand-curated a second, real investigation (the Concert of Europe, 1814-1822) through that same pipeline, sourced from primary documents, and rendered it through the identical generic frontend renderer as the original hand-authored investigation, with no topic-specific branching.",
      "Replaced the article-first renderer with a map-first workspace: a persistent map canvas, historical lenses, a docked assistant panel, and an Inspector mode that preserves the original detailed view rather than deleting it.",
      "Reoriented the whole roadmap around a documented product-framing correction: the domain-specialized four-agent LLM system is the actual product core, and the historical content is its proving ground, not the reverse.",
      "Built a provider-agnostic model layer (a deterministic test provider plus a real local Ollama/Qwen2.5 provider), chosen after an explicit hardware audit, with a named failure taxonomy and bounded retry-with-feedback on malformed structured output.",
      "Built a read-only corpus service and 10 typed, bounded tools over the validated investigation packages for a future agent to call, with historical-integrity rules (evidence roles, temporal-role separation, precision tagging) enforced in the tool layer itself.",
      "Kept a running, dated learning log of real defects caught before shipping, instead of only recording what went right.",
    ],
    outcome: [
      "Two independently-sourced investigations render through one unmodified generic package renderer, with an automated check confirming no topic-specific constants leak into shared code.",
      "A local, open-weight model (Qwen2.5:7b-instruct via Ollama) was installed and produced a real, schema-valid structured output on a genuine end-to-end smoke test, at zero inference cost.",
      "A 10-tool, corpus-bound registry exists for a future agent to call, with bounded result sizes so an oversized tool result fails before it ever reaches a model.",
      "The four-agent system itself (Investigation Planner, Evidence Analyst, Historical Critic, Investigation Guide) is architected and specified, but not yet built - deliberately kept out of this outcome list until real, called by an agent.",
    ],
    constraints: [
      "No paid infrastructure: the model layer had to run on a local, open-weight model under real consumer hardware (13.69 GB RAM, integrated GPU, CPU-only inference) rather than a hosted frontier API.",
      "Solo build: every architectural boundary, contract, and historical-integrity rule had to be self-enforced through tests and validators rather than caught by a second reviewer.",
      "No live retrieval yet: with no web search, embeddings, or database layer built, every claim in the two investigations had to be hand-sourced and hand-verified against real primary or secondary documents.",
      "A moving target: the roadmap has already been corrected twice at the product-framing level (map-first, then agent-system-as-core), so the page you're reading is a snapshot, not a finished product.",
    ],
    snapshot: {
      challenge:
        "Build an AI system that can reason over historical evidence without losing provenance, uncertainty, or temporal meaning, on zero paid infrastructure.",
      contribution:
        "Solo-designed and built the contract, deterministic pipeline, map-first workspace, and the model-provider and typed-tool foundation the agent layer will run on.",
      outcome:
        "Two real investigations proven on one generic contract; a local model wired end-to-end; the four-agent system architected and next in line to be built.",
      tools: ["Python", "Pydantic", "TypeScript", "React", "Ollama", "MapLibre GL JS", "Claude Code"],
    },
    decisions: [
      {
        decision: "Map-first workspace instead of an article-first renderer.",
        rationale:
          "The original renderer presented an investigation as a single scrollable article. A historical investigation is fundamentally spatial and relational, so the map became the primary canvas, with a docked assistant panel beside it.",
        alternatives: "Keep the article-first view as the only experience and add a map as a secondary tab.",
        result:
          "Both experiences exist: the map-first workspace as default, and the original article-first view preserved as an accessible 'Inspector' mode rather than deleted.",
      },
      {
        decision: "The four-agent LLM system is the product core, not the historical content around it.",
        rationale:
          "A documented mid-project correction: the domain-specialized agent system (Investigation Planner, Evidence Analyst, Historical Critic, Investigation Guide) is what Chronicle is actually about. The existing curated investigations are its benchmark corpora, not the point.",
        alternatives: "Keep expanding hand-curated historical content and treat AI as an add-on feature.",
        result:
          "The roadmap was rewritten around this correction. No new hand-authored investigation content ships until the agent layer exists to be evaluated against it.",
      },
      {
        decision: "Local, open-weight model over a paid hosted API.",
        rationale:
          "A real hardware audit (13.69 GB RAM, integrated GPU, no realistic acceleration path) was run before any model comparison, to keep the project inside a genuine zero-paid-infrastructure constraint rather than an aspirational one.",
        alternatives: "A frontier hosted API for stronger structured-output reliability.",
        result:
          "Qwen2.5:7b-instruct via Ollama, with a documented, accepted tradeoff: weaker structured-output reliability on a small local model, which is why a bounded retry-with-feedback path exists in the provider layer.",
      },
      {
        decision: "Deterministic contracts and a mock pipeline before any model call.",
        rationale:
          "It's possible to start an 'AI-first' project by calling a model immediately. Instead, the versioned package contract, resumable pipeline, and generic renderer were proven end-to-end with deterministic mock providers on arbitrary topics first.",
        alternatives: "Wire a model call early and let the contract shape emerge from what the model returned.",
        result:
          "When the real model-provider and tool layer landed, they had a stable, already-tested contract and 10 typed tools to call into, instead of needing to invent structure under model-output pressure.",
      },
      {
        decision: "Historical-integrity rules enforced as structural constraints, not writing guidance.",
        rationale:
          "Rules like 'chronological adjacency never implies causation' or 'city-level evidence can never render as building-level' are easy to state and easy to quietly violate. They're enforced as schema and validator rules, checked at write time, in both the TypeScript and Python contracts.",
        alternatives: "Document the rules as authoring guidance and rely on manual review to catch violations.",
        result:
          "Real bugs were caught by this discipline before shipping, including a serialization mismatch between the Python and TypeScript contracts that would have silently broken frontend validation.",
      },
    ],
    reflection: [
      "The roadmap has genuinely changed direction twice at the product-framing level (map-first, then agent-as-core), and writing both corrections down as dated decisions, instead of quietly absorbing them, made the second correction faster to reason about than the first.",
      "Proving the deterministic pipeline mechanically, on synthetic topics, before curating real historical content, felt slow at the time. It meant the eventual model-provider and tool layer had a stable, already-tested contract to build against instead of inventing structure under model-output pressure.",
      "A local 7B model is a real constraint, not a footnote. The retry-with-feedback path in the provider layer exists specifically because a small local model is measurably less reliable at structured output than a hosted frontier model, and that tradeoff is designed around, not hidden.",
    ],
    whatIdImprove:
      "The map-first workspace has automated keyboard, accessibility, and mechanical test coverage, but no real human comprehension study has been run yet. That's the next validation gap I'd close before trusting the workspace design, and it's written down as an open test plan rather than skipped.",
    note: "Chronicle is an active, independent project. This page reflects the state of the project's own documentation at the time it was written, and is explicit about what's built versus what's still architected only.",
  },
];

// Reverse-chronological display order (most recent first). Course/undated
// projects (pill-pal) sort last.
const displayOrder = ["chronicle", "roomease", "forcen", "greenhouse", "informatica", "hera-fertility", "pathpeer", "pill-pal"];

export const caseStudies: CaseStudy[] = displayOrder
  .map((slug) => caseStudiesData.find((cs) => cs.slug === slug))
  .filter((cs): cs is CaseStudy => Boolean(cs));

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

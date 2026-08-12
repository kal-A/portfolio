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
  mockups?: "hera";
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
      "Designed the financing application's prequalification flow, payment-plan comparison, and clinic-discovery experience for a 0-to-1 fertility platform, and shipped the account-segmentation flow that routes new users into them, using Hotjar and Google Analytics to decide what to build next.",
    tags: ["Fintech UX", "Product Strategy", "UX Research"],
    toolTags: ["Figma", "Balsamiq", "Google Analytics", "Hotjar", "Looker Studio", "WordPress", "Umso", "HubSpot", "Excel"],
    artifacts: ["Wireframes", "Payment Plan Research", "Clinic Discovery Design", "Product Roadmap", "Analytics Planning"],
    metrics: [
      { value: "4 → 1", label: "address-entry fields collapsed in the financing prequalification flow" },
      { value: "3", label: "treatment paths shipped in account segmentation (IVF, egg freezing, IUI)" },
      { value: "9", label: "competitor products and platforms audited for the payment-plan research" },
      { value: "4", label: "clinic-detail layout passes iterated for Near Me discovery" },
    ],
    problem:
      "Choosing how to pay for fertility treatment is not a decision most people are practiced at making: a requested loan amount, a repayment plan, and clinic pricing, all worked out while already navigating a stressful medical process. Hera Fertility's financing application ran entirely through Loanglide, a third-party loan processor, which limited how much of that sign-up, payment, and clinic-discovery experience the team could actually design or control. There was no existing in-house product to iterate from. The goal was to design Hera's own financing flow, payment-plan presentation, and clinic-discovery experience, then stand up an in-house build to replace the third-party dependency and use behavioral research to decide what to build next.",
    process: [
      "Audited how fintech, retail-subscription, and fertility-adjacent products (Boston IVF, Costco, Walmart, Ro, GoodRx, Bitly, and direct fertility competitors FCI, Shady Grove Fertility, and Alabama Fertility) presented payment options, then translated the strongest pattern, a Bitly-style tiered pricing table, into a Hera-specific payment-plan concept.",
      "Designed and iterated the prequalification and address-entry steps in the financing wireframes across several rounds, tightening input formatting and field count based on internal review.",
      "Designed and shipped the account-creation and treatment-segmentation flow, routing new users into an IVF, egg-freezing, or IUI experience from a single sign-up selection.",
      "Designed the clinic search, filter, and detail experience for 'Near Me' clinic discovery across four layout passes, working through what data a filter could realistically support.",
      "Used Hotjar session recordings alongside Google Analytics to review how people actually moved through the site, feeding real behavior, not just internal review, into which redesigns and features got prioritized.",
      "Planned Google Analytics and Looker Studio instrumentation scoped to specific flows (financing sign-up, Hera Care, Hera Care+) instead of generic site-wide tracking, deliberately leaving CAC, LTV, and geographic and device-level tracking out of the initial scope.",
      "Contributed to the six-week execution roadmap moving the financing app off Loanglide and onto Hera's own AWS-hosted build, alongside the project owner, one other co-op, and an external technical contact who handled the AWS deployment.",
    ],
    outcome: [
      "Designed a three-step prequalification flow and iterated its address-entry step from four manual fields to a single autofill-driven field, after flagging the four-field version as a likely source of drop-off.",
      "Shipped the account-creation and segmentation flow, letting new users self-select into an IVF, egg-freezing, or IUI experience at sign-up instead of landing on one generic flow.",
      "Translated competitive research into a tiered payment-plan concept, explicitly modeled on Bitly's pricing-table pattern over a subscription-discount block, for IVF, egg-freezing, and IUI financing.",
      "Designed the clinic discovery search, filter, and detail experience end to end, including a price-range filter that stayed explicitly flagged as an unresolved design hypothesis rather than shipped half-working.",
      "Used Hotjar and Google Analytics together to turn observed behavior into specific redesign and feature decisions, rather than relying on internal review alone.",
      "Scoped the Google Analytics and Looker Studio plan to named flows and product paths, deliberately leaving CAC, LTV, and geographic and device tracking out of the initial plan instead of instrumenting everything by default.",
      "Contributed to the phased roadmap (AWS staging, production hardening, site-wide launch) for moving the financing app off a third-party loan processor and onto an in-house build.",
    ],
    whatIdImprove:
      "Formal usability-test results and post-launch analytics from this internship weren't preserved, so this case study is built from the design artifacts, competitive research, and roadmap that were. I'd want to pair the shipped version with real usage data if I could access it again.",
    team: "Thiv (project owner and primary stakeholder), Faiq (co-op), and Kamal (co-op), with Kamal and Thiv sharing product-management responsibility for planning and execution.",
    contribution:
      "Kamal owned the financing-flow, account-segmentation, and clinic-discovery design work end to end; ran the competitive research behind the payment-plan concept; used Google Analytics and Hotjar to review behavior and session recordings and translate findings into feature and redesign decisions; and shared PM responsibility for the six-week execution roadmap with Thiv.",
    note: "No final production screens were preserved from this internship, aside from what's noted as shipped below. The wireframes, roadmap, and research notes underlying this case study are real source material; most of the diagrams, tables, and screens on this page are professional reconstructions built from that material rather than scans of the original working notes.",
    snapshot: {
      challenge: "Fertility financing was routed through a third-party loan processor, with no in-house product to design the sign-up, payment, or clinic-discovery experience around.",
      contribution: "Designed the financing flow, payment-plan concept, and clinic-discovery experience, and shipped the account-segmentation flow that routes new users into them, then used Hotjar and Google Analytics to decide what came next.",
      outcome: "A shipped segmentation flow, a reconstructed but faithful financing, payment-plan, and clinic-discovery design system, plus a scoped analytics plan and phased launch roadmap.",
      tools: ["Figma", "Balsamiq", "Google Analytics", "Hotjar", "Looker Studio", "WordPress", "Umso", "HubSpot", "Excel"],
    },
    constraints: [
      "No existing in-house financing product to iterate from. The application intake, payment-plan presentation, and clinic-discovery experience had to be designed from a blank page.",
      "The financing flow depended on a third-party loan processor (Loanglide) for the underlying process, which limited what the in-house app could control until that dependency was migrated.",
      "Getting the in-house build onto AWS depended on an external technical contact, since the team did not have in-house cloud deployment coverage of its own.",
      "Clinic pricing wasn't consistently available across clinics, which kept price-range filtering flagged as an unresolved design hypothesis rather than a shipped feature.",
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
        decision: "Modeled the payment-plan page on Bitly's tiered pricing table instead of a subscription-discount block.",
        rationale:
          "The payment-plan research compared several pricing-presentation patterns: Boston IVF's package cards, Costco's two-tier comparison, Walmart's percentage-off subscription blocks, GoodRx's single membership upsell, and Bitly's four-tier pricing table with a flagged best-value option. The research notes call out Bitly by name as the strongest fit for comparing discrete plans side by side. Most direct fertility competitors (FCI, Shady Grove Fertility, Alabama Fertility) didn't present financing as comparable packages at all, and were nearly identical to each other.",
        alternatives: "A percentage-off subscription block (Walmart pattern) or a single membership upsell (GoodRx pattern).",
        result: "A three-option payment-plan layout, one set per treatment type (IVF, egg freezing, IUI), reused across the treatment-specific concept pages.",
      },
      {
        decision: "Cut doctor name and a percentage rating from the clinic-detail field list.",
        rationale:
          "The initial clinic-detail field list included hours, About, clinic score, phone, specialty, services, and location, alongside doctor name and a percentage rating. Both of the latter are marked out in the working sketch.",
        result: "A simpler clinic-detail page built around fields that could be populated consistently across clinics, keeping clinic score as the one rating signal.",
      },
      {
        decision: "Left CAC, LTV, and geographic and device-level tracking out of the initial analytics plan.",
        rationale:
          "The analytics planning notes listed customer acquisition cost and lifetime value, plus country, city, and device-level breakdowns, as 'maybe' additions on top of the core plan. None of them were tied to a specific financing or clinic-discovery decision the team needed to make in the near term.",
        alternatives: "Instrument everything available in Google Analytics by default and sort out what mattered later.",
        result: "A smaller, more actionable dashboard scoped to session, engagement, and channel signals tied to the financing sign-up and clinic-discovery flows, with acquisition-level metrics deferred until they were tied to an actual decision.",
      },
    ],
    reflection: [
      "Reducing friction in a financial form is as much about input format as field count. Locking phone and date-of-birth into a masked pattern mattered as much as cutting the address step down to one field.",
      "Competitive research only earns its keep once it turns into a specific choice, not just a lineup of examples. Naming Bitly's tiered table as the direct model, over just listing four references, was what actually shaped the payment-plan page.",
      "Analytics only earns its place once it's tied to a specific product question. Scoping the Google Analytics and Looker Studio plan to named flows, and deliberately leaving CAC, LTV, and geographic and device tracking out of the initial plan, mattered more than tracking everything on the site.",
      "Not every open question needs to be resolved in the same pass. Price-range filtering for clinic search stayed explicitly flagged as an open design hypothesis rather than shipped half-working, which felt more honest than forcing a fix before the underlying data problem was solved.",
    ],
  },
  {
    slug: "roomease",
    category: "visual",
    entryType: "capstone",
    caseStudyType: "product-ux",
    tier: "featured",
    title: "Making club room booking less scattered",
    company: "RoomEase · University of Waterloo Capstone (MSE 401/402)",
    role: "Team Member - User Prototype, Testing & Presentation",
    timeframe: "Spring 2025 – Winter 2026",
    oneLiner: "University clubs and departments were booking rooms across 34+ different websites, each with its own process, with no shared way to check what a room actually offered.",
    summary:
      "A 5-person Management Engineering capstone team turned a fragmented, mostly manual UW room-booking process into a working booking-and-recommendation prototype, tested through a controlled comparison against the current process with students and club executives.",
    tags: ["Requirements Gathering", "UX Design", "Systems Thinking"],
    toolTags: ["Figma", "React", "Next.js", "Supabase"],
    artifacts: ["Figma", "Booking Flow", "Room Dataset", "Capstone Report", "Symposium Poster", "Presentation"],
    metrics: [
      { value: "50% → 88%", label: "usability score (controlled user testing)" },
      { value: "33% → 90%", label: "satisfaction score (controlled user testing)" },
      { value: "~8.5 → ~4.5 min", label: "average time to book (controlled user testing)" },
      { value: "~24 → ~10", label: "average clicks to book (controlled user testing)" },
    ],
    problem:
      "Room booking at the University of Waterloo was split across 34+ different departmental booking websites and workflows, each with its own instructions, contacts, and approval process. In our own baseline testing on the current process, users completed a booking without help only 33% of the time, and it took an average of 8.5 minutes and 24 clicks when they did. There was no shared room-attribute data, no visibility into availability before submitting a request, and no consistent way clubs or admins could tell whether a room assignment was fair. That had to be designed from stakeholder interviews up, not assumed.",
    process: [
      "Interviewed administrative staff across Engineering and Arts departments, and spoke with WUSA-affiliated club executives and student organizers, to map how room booking actually worked - and where it broke down - across a fragmented, department-by-department system.",
      "Translated what we heard into five prioritized requirements covering automatic conflict resolution, concurrency, usability, accessibility, and transparent, appealable room allocation.",
      "Consolidated a room dataset (capacity, AV, furniture, building-specific policies) across buildings including Hagey Hall, RCH, and engineering spaces, and used it to design and pressure-test the hard-constraint-then-ranking matching logic.",
      "Built a working prototype end to end - hard-constraint filtering, preference-based ranking with visible justifications, a manual override that required a stated reason, and a member/executive/admin approval workflow - after Peer Critique 1 showed a frontend-only version couldn't actually prevent double bookings.",
      "I led the controlled user-testing sessions comparing the current UW booking process against the RoomEase prototype with students and club executives, then worked on the symposium poster's visual system and the final design-review presentation that carried those results forward.",
    ],
    outcome: [
      "In controlled user testing, usability scores rose from 50% to 88% and satisfaction scores rose from 33% to 90%.",
      "Average time to book fell from roughly 8.5 to roughly 4.5 minutes, and average clicks to book fell from roughly 24 to roughly 10.",
      "Club executives who tested the prototype specifically called out the room-comparison and matching features - an MSA exec said comparing rooms \"saved us a ton of time,\" and a WLPA exec said the matching algorithm \"was useful to see what our best options were.\"",
      "The team validated RoomEase as a working, testable prototype and feasibility demonstration for a centralized, policy-aware booking platform - not a production system. Full UW authentication, broader room-data integration across campus, and calendar sync were scoped as next steps, not delivered.",
    ],
    whatIdImprove:
      "This was a capstone prototype, validated through a controlled comparison with a group of students and club executives, not a production system with live UW single sign-on or campus-wide room data. I'd want to pilot it with one department's real semester of bookings, with full UW login and calendar integration, to see how the numbers hold up outside a test setting.",
    note: "RoomEase was a Management Engineering capstone built by a 5-person team (Farhan Valli, Gurman Rai, Pranav Gupta, Kamal Ahsan, Jey Jeyapalan) advised by Chris Rennick. It's a working prototype and feasibility demonstration, not a fully deployed UW system - some diagrams below are reconstructed from the team's report, presentation, and poster rather than pulled directly from the codebase.",
    images: [
      { src: "/case-studies/roomease/team.jpg", alt: "The five-person RoomEase capstone team at the symposium presentation" },
    ],
    figures: [
      {
        id: "roomease-allocation-flow",
        caption: "How a booking request becomes a ranked, approved room. Click a node for details.",
        evidence: "reconstructed",
      },
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
    caseStudyType: "research-strategy",
    tier: "standard",
    title: "Turning session recordings into a feature plan",
    company: "PathPeer",
    role: "Product Designer & Developer Intern",
    location: "Remote (Waterloo, ON)",
    timeframe: "May 2022 – Aug 2022",
    oneLiner: "Built a career-mentorship discovery platform as one of two developers/designers, then used analytics, session recordings, and no-code prototyping to decide what to fix and build next.",
    summary:
      "Designed and built PathPeer's mentorship-discovery platform as one of two developers/designers on a small team, covering mentor search, discovery, and shortlisting end to end on the Bubble.io no-code platform. Used Google Analytics and Hotjar recordings to analyze search and shortlisting behavior, then turned that evidence into a mentor tagging and discovery taxonomy, a homepage discovery flow for newly added mentors matched to a user's career path, and a company-of-interest discovery path. Prototyped and validated the smaller changes directly in Bubble.io before requesting further development time, and worked as the platform's de facto product manager on feature planning and prioritization.",
    tags: ["Product Management", "UX Research", "Behavioural Analytics", "No-Code Development"],
    toolTags: ["Google Analytics", "Hotjar", "Figma", "Bubble.io"],
    artifacts: ["Feature Plan Reconstruction", "Search & Shortlisting Research", "Internal Analytics Omitted"],
    metrics: [
      { value: "50%", label: "increase in user engagement (internship period)" },
      { value: "40%", label: "reduction in inactive user drop-off (internship period)" },
    ],
    problem:
      "PathPeer helped users explore career paths and find professionals they could connect with as mentors, for networking, advice, and guidance. Once the platform was live, the open question was no longer whether people were using it, but where they were getting stuck across search, mentor discovery, shortlisting, and tagging, and what to fix or build first. As one of PathPeer's two developers/designers, working within a small team and acting as its de facto product manager, I used behavioral evidence from Google Analytics and Hotjar to recommend, plan, and validate what came next.",
    process: [
      "Designed and built PathPeer's mentorship-discovery platform end-to-end on Bubble.io, as one of two developers/designers on a small team, across search, mentor discovery, shortlisting, and the mentor tagging taxonomy.",
      "Used Google Analytics to find where engagement dropped in search and mentor discovery, then reviewed the matching Hotjar session recordings to see what was actually happening at each point, rather than treating the numbers alone as an answer.",
      "Analyzed search behavior specifically, tracking how users refined queries and where they abandoned a search, to separate a genuine mentor-fit gap from a discoverability problem.",
      "Built out a mentor tagging and discovery taxonomy so mentors could be filtered on more than a single job-title match, then reviewed shortlisting behavior to see where users added mentors to compare but never followed through.",
      "Designed a homepage discovery flow surfacing newly added mentors relevant to a user's stated career path, and a separate discovery path for users browsing by company of interest, both aimed at mentors that search alone wasn't surfacing.",
      "Turned the strongest patterns into scoped feature and requirement plans, then prioritized them against how many users a fix touched and how much effort it would take to plan and build.",
      "Prototyped and validated smaller ideas directly in Bubble.io before requesting further development time, then went back to Analytics and Hotjar to check whether behavior actually moved, where the change and timeline supported that follow-up.",
      "Iterated on the design based on that evidence rather than assumptions, feeding findings back into PM planning and the next round of feature recommendations.",
    ],
    outcome: [
      "User engagement increased 50% and inactive user drop-off dropped 40% over the internship period, the platform's reported results for that time.",
      "These reflect the platform's overall growth during the internship, with the analytics-and-recordings loop shaping which iterative changes, like new discovery tags and homepage flows for new mentors, went into that period rather than being the sole driver of the numbers.",
      "Search, shortlisting, and discovery all changed as a direct result of that loop: a mentor tagging taxonomy, a homepage flow for newly added mentors, and a company-of-interest discovery path were all shipped or scoped from it.",
      "Validating smaller ideas directly in Bubble.io before requesting development time kept engineering effort pointed at changes that had already shown they addressed real friction, instead of speculative builds.",
      "Feature planning and prioritization ran on observed search and shortlisting behavior rather than internal assumptions about what mentors or users needed next.",
    ],
    note: "This case study reconstructs the categories of analysis and feature work from the internship, not verbatim session data; the platform's internal analytics dashboards and session recordings are not shown for confidentiality.",
    whatIdImprove: "The 50% engagement and 40% drop-off numbers are the platform's overall internship-period results, not isolated to the analytics-and-recordings loop. I'd want to track changes at the feature level next time, so a given fix's impact could be measured on its own instead of folded into total growth.",
    snapshot: {
      challenge: "A live mentor-discovery platform generating real search, shortlisting, and tagging data, with no structured process for turning that data into what to build next.",
      contribution: "Designed and built the platform's search, discovery, shortlisting, and tagging experience as one of two developers/designers, then used Hotjar and Google Analytics to turn behavioral evidence into prioritized, Bubble.io-validated feature plans.",
      outcome: "Iterative changes driven by that loop: 50% higher engagement, 40% less inactive-user drop-off, platform-wide over the internship.",
      tools: ["Google Analytics", "Hotjar", "Figma", "Bubble.io"],
    },
    constraints: [
      "PathPeer was a small, resource-constrained team. I was one of two developers/designers on the platform, so search, discovery, shortlisting, tagging, and no-code execution all had to fit inside two people's time rather than dedicated roles.",
      "There was no dedicated PM tooling. Findings, hypotheses, and feature plans lived in direct notes and conversations instead of a formal backlog.",
      "Product direction and priorities were set within the broader team, not by me alone. My role was to bring recommendations, strategy, and feature plans grounded in behavioral evidence and Bubble.io validation, not to unilaterally decide what PathPeer built next.",
    ],
    decisions: [
      {
        decision: "Built a mentor discovery tagging taxonomy so mentors could be filtered on more than a single job-title match.",
        rationale:
          "Search behavior kept showing the same pattern in Analytics and the matching Hotjar recordings: users refining a query around one signal, almost always job title, with no way to narrow the list further once that single match came up empty or too broad.",
        alternatives: "Left search matching on title and keyword alone, or added a general free-text filter instead of a structured tag layer.",
        result: "Scoped and prioritized as a discovery-layer change, then kept as an ongoing tagging effort since it depended on tags staying current on every mentor profile.",
      },
      {
        decision: "Treated shortlisting as its own friction point, worth a separate round of scoping, instead of folding it into the search fix.",
        rationale:
          "The same recordings showed a shortlisting pattern distinct from search: users adding mentors to a shortlist to compare, then abandoning the list without reaching out to any of them.",
        result: "Refined shortlisting alongside the discovery changes, aimed specifically at what stalled users between shortlisting a mentor and actually contacting one.",
      },
      {
        decision: "Built a direct homepage flow surfacing newly added mentors relevant to a user's stated career path.",
        rationale:
          "Recordings showed newly added mentors relevant to a user's career path rarely surfaced through search alone, since new profiles hadn't yet accumulated the engagement or match signals that made an existing mentor easy to find.",
        alternatives: "Relied on search ranking or manual featuring to eventually surface new mentors.",
        result: "Gave homepage space to newer, less-proven profiles over ones already performing well in search, addressing a visibility problem a search fix alone would not have solved.",
      },
      {
        decision: "Added a discovery path letting users browse mentors by the companies they were interested in, alongside career-path and title-based discovery.",
        rationale:
          "A related pattern in the same behavioral review showed users browsing by company of interest rather than career title, a different mental model than the title-first search flow was built around.",
        result: "Shipped as a smaller, company-based discovery path alongside the tagging and homepage changes, validated first in Bubble.io before development time was requested.",
      },
      {
        decision: "Refined search matching and result presentation at the specific steps losing users, instead of a general search redesign.",
        rationale:
          "Google Analytics flagged specific steps in search where engagement dropped; the Hotjar recordings behind those drop-offs showed users repeating near-identical queries, which pointed to a matching or presentation problem rather than a lack of relevant mentors.",
        result: "Directed fixes at the step actually losing users, then checked Analytics afterward to see whether the same drop-off persisted, where the timeline supported that follow-up.",
      },
    ],
    reflection: [
      "Recordings explain what dashboards can only flag. Analytics told me where. Hotjar told me why. I stopped trusting a drop-off number until I'd watched a few of the sessions behind it.",
      "A feature plan is a filter, not a formality. Turning a pattern into a defined feature and delivery plan before building it caught changes that would not have actually addressed the friction, across search, shortlisting, tagging, and discovery alike.",
      "No-code is worth it when it buys a real answer. The value wasn't skipping development. It was using Bubble.io to find out fast enough that the development, when it happened, was aimed at the right fix.",
      "Growth and impact aren't the same measurement. The 50% and 40% figures describe the internship period, not the loop in isolation. The write-up says what that work likely drove, not more than it can claim.",
    ],
  },
  {
    slug: "informatica",
    category: "systems",
    entryType: "internship",
    caseStudyType: "research-strategy",
    tier: "standard",
    title: "Breaking an ambiguous cybersecurity curriculum into work a six-person team could execute",
    company: "Informatica",
    role: "Product Operations & UX Research Intern",
    location: "Mississauga, ON",
    timeframe: "Sep 2023 – Dec 2023",
    oneLiner: "Informatica needed a full set of cybersecurity educational web experiences built by a six-person co-op team, with no existing structure for what teaching the material well would actually require.",
    summary:
      "Helped turn an open-ended cybersecurity education project, covering personal, school, and workplace security plus safe networking practices, into research, page structure, and build assignments a six-person co-op team could execute, then applied the same research-to-decision and planning approach to Informatica's other web and content requests.",
    tags: ["Product Operations", "UX Research", "Educational Content Strategy"],
    toolTags: ["Trello", "Microsoft Planner", "Microsoft Loop", "Java", "No-Code Tools"],
    artifacts: ["Research Synthesis", "Curriculum Structure", "Workflow Documentation", "Internal Materials Omitted"],
    metrics: [
      { value: "18%", label: "user engagement increase, internship-wide (internal reporting)" },
      { value: "20%", label: "internal task efficiency gain, internship-wide (internal reporting)" },
      { value: "30%", label: "on-time delivery improvement, internship-wide (internal reporting)" },
    ],
    problem:
      "Informatica set out to build a new set of cybersecurity educational web experiences: personal cybersecurity, school-related cybersecurity, workplace cybersecurity, and correct networking and security practices, each with multiple levels and course-like pages. The real difficulty was never publishing the information. It was figuring out how to teach it effectively through page structure, diagrams, activities, sequencing, and interactive testing. Six co-op students, including me, were responsible for turning that open-ended educational goal into an executable set of pages, and I helped organize how that work was broken up, planned, and built. I later applied the same research-to-decision and implementation-path approach to other UX research and web or content requests that arrived from different teams during the internship.",
    process: [
      "Broke the four cybersecurity topic areas, personal, school, workplace, and networking and security practices, into independently buildable tracks with their own levels and pages, so six co-op students could work in parallel instead of waiting on one shared sequence.",
      "Researched how to teach each topic effectively (structure, diagrams, activities, sequencing) rather than just drafting text, since the actual problem was communication, not content volume.",
      "Matched implementation method to page type: no-code tools for general informational and knowledge pages, coded implementation through classic web development and Java-based frameworks for the specialized testing, activity, and interactive pages that needed logic no-code couldn't reliably support.",
      "Used Trello, Microsoft Planner, and Microsoft Loop to keep six people's tasks, ownership, and decisions visible and consistent across topic tracks.",
      "Applied the same research-to-decision approach, translating findings into specific requirements and routing them to the right build path, to other UX research and web or content requests arriving from different teams.",
      "Supported an AI-assisted workflow for educational and blog-style content drafts, with mandatory human review before anything published.",
    ],
    outcome: [
      "Turned an open-ended educational objective, teaching cybersecurity across four different audiences, into a structured set of pages and build assignments a six-person co-op team could actually execute without duplicated effort or gaps between tracks.",
      "Matching no-code and coded implementation to page type let the team ship general knowledge pages quickly while concentrating development effort on the testing and activity pages that genuinely needed custom logic.",
      "User engagement increased 18%, internal task efficiency improved 20%, and cross-team on-time delivery improved 30%, per internal reporting across the internship. These reflect the full scope of the role, not the cybersecurity project alone.",
      "UX research findings moved into tracked requirements instead of ending as a readout no one acted on.",
    ],
    whatIdImprove:
      "I don't have a reliable time-saved figure for the AI-assisted content workflow, so I've kept that part of the case study scoped to what it did rather than estimating an impact number I can't verify.",
    team: "Five other co-op students alongside me, six total, working across research, design, and development on the cybersecurity education project.",
    contribution:
      "I helped organize the team's work: breaking the educational objective into research, planning, diagrams, activities, page design, and development tasks, sequencing them across the four topic tracks, and keeping documentation and coordination visible across all six of us. I also applied the same research-to-decision and implementation-path approach to other UX research and web or content requests during the internship.",
    snapshot: {
      challenge:
        "A new set of cybersecurity educational web experiences, personal, school, workplace, and networking and security practices, needed to be built by six co-op students, with no existing structure for how to teach the material effectively or divide the work.",
      contribution:
        "Helped break the curriculum into independently buildable topic tracks, matched no-code and coded implementation to what each page actually needed, and kept the six-person team's work and decisions organized end to end.",
      outcome:
        "A structured, executable path from an ambiguous educational goal to shipped content, with implementation effort concentrated where it was actually needed.",
      tools: ["Trello", "Microsoft Planner", "Microsoft Loop", "Java", "No-code tools", "AI-assisted drafting"],
    },
    constraints: [
      "Internal trackers, boards, and company-specific materials are confidential. This write-up reconstructs the same planning and research logic in a public-safe form.",
      "Six co-op students needed clearly separable work, since overlapping ownership on the same content risked duplicated effort or gaps between topic tracks.",
      "Personal, school, and workplace cybersecurity are different audiences with different depth needs, so one shared template or tone wouldn't fit all four topic areas.",
      "General informational pages and specialized testing or activity pages had very different technical needs, so no single implementation approach fit every page in the curriculum.",
    ],
    decisions: [
      {
        decision: "Split the curriculum into four independent topic tracks instead of one continuous course.",
        rationale:
          "Personal, school, workplace, and networking and security practices are different audiences with different depth needs. Treating them as one continuous course would have forced six people to build sequentially instead of in parallel.",
        alternatives: "A single linear course structure covering all four areas in one sequence.",
        result: "Each topic track could be researched, structured, and built independently, so the six-person team could work at the same time instead of waiting on a shared sequence.",
      },
      {
        decision: "Match implementation method to page type instead of picking one build approach for the whole project.",
        rationale:
          "General knowledge pages needed to be quick to produce and easy to edit, but testing, activity, and interactive pages needed logic such as scoring, state, or custom interaction that no-code tools couldn't reliably support.",
        alternatives: "Building the entire curriculum in one approach, either fully no-code or fully custom-coded.",
        result: "No-code tools covered the general informational pages, while classic web development and Java-based frameworks covered the testing, activity, and interactive pages that actually needed the flexibility.",
      },
      {
        decision: "Keep AI-assisted content drafting paired with a mandatory human review step.",
        rationale:
          "AI tools could speed up the repetitive part of turning research or notes into a first-pass draft, but accuracy and tone still needed a human check before anything reached a reader.",
        result: "Draft turnaround got faster without removing the review step that caught accuracy and tone issues before publishing.",
      },
    ],
    reflection: [
      "An ambiguous educational goal gets built once it's broken into independently ownable pieces. Splitting the curriculum into four topic tracks, instead of one shared course, was what actually let six people work at the same time.",
      "The right implementation method depends on what a page actually needs to do, not on a company-wide default. Knowledge pages and testing or activity pages needed genuinely different approaches, and treating them the same would have wasted effort either way.",
      "Planning tools are only as good as the ownership they make visible. Trello, Planner, and Loop helped because every page and task had a clear owner across a six-person team, not because of the tools themselves.",
      "Automation should remove repetition, not judgment. AI-assisted drafting saved time on the repetitive part of content work, but it never replaced the review step, since that's where the real quality control happened.",
    ],
    note: "Internal trackers, boards, and company-specific materials are omitted for confidentiality. This case study uses reconstructed, public-safe diagrams to explain the research and planning logic behind the work. Metrics are as reported internally during the internship.",
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

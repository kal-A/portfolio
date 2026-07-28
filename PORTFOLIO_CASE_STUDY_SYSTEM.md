# Portfolio Case Study System
## Source-of-truth instructions for Claude Code

> **Provenance note:** This file consolidates two drafts of the same spec pasted in the same message on 2026-07-28 — they were byte-identical, so no reconciliation was needed. It supersedes the older, lighter-weight `docs/redesign/07-case-study-specifics.md` for anything related to writing/structuring individual case-study detail pages (that file's per-project framing is consistent with this one, just far less detailed — no conflicts found). See the "Amendments" section at the end for directives added on top of the original draft.

This document defines how every experience or project **details page** in Kamal Ahsan's portfolio should be researched, written, illustrated, structured, and implemented.

The project cards and portfolio browsing interface already exist and are outside the scope of this document. This system begins after a visitor selects an experience or project.

The details-page system must work across:
- Product management and product operations
- UX/UI and product design
- Systems and workflow improvement
- Engineering-adjacent work
- Growth, marketing, and ecommerce design
- Academic and capstone projects

It must preserve a consistent portfolio identity without forcing every project into the same generic case-study template.

---

# 1. The Goal

When a visitor selects an experience or project, open a dedicated case-study page that answers five questions quickly:

1. What was the situation?
2. What did Kamal personally own?
3. How did he think through the problem?
4. What did he make, change, or enable?
5. Why did the work matter?

The page should then let an interested reader go deeper into decisions, process, artifacts, collaboration, outcomes, and lessons.

The portfolio should communicate that Kamal:
- Understands products and systems at both the micro and macro level.
- Can trace how people, processes, tools, information, and technical constraints interact.
- Creates structure in ambiguous environments.
- Moves from discovery and planning into practical execution.
- Can communicate with design, engineering, operations, supply chain, marketing, research, and business stakeholders.
- Uses AI tools as part of concrete workflows rather than as a vague claim.
- Has strong UX/UI and visual-design ability where artifacts support it.
- Is honest about scope, evidence, limitations, and what was or was not shipped.

---

# 2. The Combined Case-Study Model

Use a synthesis of four portfolio approaches:

## A. Metric-led scannability
Begin with a strong title, one-sentence value proposition, clear role, tags, and the strongest verified outcomes. Use numbered or clearly separated chapters so a recruiter can understand the story quickly.

## B. Deep product reasoning
Show constraints, discovery, research, important decisions, implementation, testing, business value, and lessons. Explain why decisions were made rather than merely listing activities.

## C. Transparent process and reflection
Include real process artifacts, collaboration details, changes in approach, and honest reflection. Show initiative and learning without turning the page into a diary.

## D. Personal voice and clean presentation
Use direct, human writing. Allow selective honesty about what did not work, what changed, and what Kamal would do differently. Use generous whitespace, restrained visuals, and prominent statistics without making the page feel empty.

Do not copy any reference portfolio's visual identity. Combine their storytelling strengths inside Kamal's existing minimalist portfolio system.

---

# 3. Details-Page Reading Model: Orient -> Understand -> Trust

Every details page must support two reading depths.

## Layer 1: 60-second overview

The top of the details page should communicate the full story without requiring a long scroll.

Required:
- Outcome-oriented headline
- One-sentence summary
- Role
- Timeline
- Team
- Scope
- Tools
- 2-4 strongest outcomes or evidence points
- A concise executive summary
- A clear statement of the central problem

## Layer 2: Full case study

The rest of the page should provide enough depth for a hiring manager, designer, product leader, or interviewer to examine the work seriously.

Use only sections that add evidence. Do not include empty process theatre.

The details page should not redesign, restyle, or redefine the existing project card. It should only consume the selected project's slug or identifier and render the corresponding case study.

# 4. Non-Negotiable Truth and Evidence Rules

## Never invent
Do not invent:
- Metrics
- User quotes
- Research sessions
- Team sizes
- Launch status
- Revenue
- Adoption
- Technical implementation
- Customer feedback
- Responsibilities
- Artifacts

## Evidence labels
Internally classify every claim as one of:

- `verified`: directly supported by an artifact, record, or confirmed statement
- `qualitative`: supported by observed feedback or a confirmed non-numeric result
- `estimated`: a defensible estimate explicitly approved by Kamal
- `reconstructed`: a visual recreated after the fact to explain a real process
- `redacted`: real work simplified or obscured for confidentiality

Only `verified` and approved `qualitative` claims should normally appear as unqualified facts.

Any estimate must be clearly worded as an estimate. A reconstructed diagram must be captioned as reconstructed.

## Ownership language
Use:
- "I" for actions Kamal personally owned or completed.
- "We" for team decisions or shared work.
- Explicit collaboration language when another function owned a major part.

Do not imply solo ownership of team outcomes.

## Missing information
When a required fact is missing:
1. Add it to an internal `NEEDS_INPUT` list.
2. Do not expose a placeholder on the public page.
3. Hide the unsupported component until the information is confirmed.
4. Never fill the gap with a plausible-sounding assumption.

---

# 5. Case-Study Types

Claude Code should classify each project before choosing its structure.

## Type A: Product / UX case study
Best for:
- RoomEase
- Hera
- HCI / Pill Pal
- Similar design-heavy or end-to-end product work

Emphasize:
- User and business problem
- Research or evidence
- Product requirements
- Flows and information architecture
- Design alternatives
- Key decisions
- Prototypes
- Validation
- Handoff or implementation
- Outcomes

## Type B: Systems / product operations case study
Best for:
- ForceN
- Operational workflow, delivery, or process-improvement work

Emphasize:
- Existing operating system
- Failure points and dependencies
- People, tools, inventory, information, and handoffs
- Root causes
- Workflow redesign
- Tracking and documentation
- Rollout and adoption
- Risk reduction
- Delivery, quality, traceability, or efficiency outcomes

Do not force this work into a fake UX process.

## Type C: Visual design / growth case study
Best for:
- Greenhouse
- Ecommerce, retail, campaign, content, or brand work

Emphasize:
- Commercial or communication goal
- Audience and channel constraints
- Asset system
- Design direction
- Iteration and feedback
- Variants and adaptation across channels
- Production workflow
- Final deliverables
- Business or operational impact

## Type D: Research / strategy case study
Best for:
- Informatica
- Research-heavy contributions or PM-support work

Emphasize:
- Decision that needed to be informed
- Research questions
- Methods
- Synthesis
- Insights
- Recommendations
- How findings affected priorities, requirements, or the roadmap

Keep the page compact when evidence and artifacts are limited.

## Type E: Technical / engineering-adjacent case study
Best for:
- Technical projects
- Google-related engineering work
- Data, integrations, prototypes, or architecture-heavy projects

Emphasize:
- System context
- Requirements and interfaces
- Architecture or data flow
- Technical decisions
- Tradeoffs
- Validation
- Reliability, security, performance, or developer-experience impact
- What Kamal learned about the complete product system

## Type F: Compact project note
Best for:
- PathPeer until more artifacts are available
- Smaller projects
- Narrow contributions
- Archived or supporting work

Use:
- Context
- Contribution
- 2-3 key decisions or deliverables
- Evidence
- Reflection

Do not inflate a small project into a long case study.

---

# 6. Depth Tiers

Not every project should receive equal page length.

## Tier 1: Featured case study
Use when the work has strong ownership, a meaningful story, and enough artifacts or evidence.

Recommended depth:
- 1,500-2,500 words
- 8-14 purposeful visuals
- 6-10 sections
- Full decision and outcome narrative

## Tier 2: Standard case study
Use when the work is important but the evidence is narrower.

Recommended depth:
- 800-1,500 words
- 4-8 visuals
- 4-7 sections

## Tier 3: Compact project
Use when artifacts or scope are limited.

Recommended depth:
- 350-800 words
- 1-4 visuals
- 3-5 sections

Length is a ceiling, not a target. Remove anything that does not improve understanding or credibility.

---

# 7. Artifact Audit Before Writing

Before drafting a case study, create an internal inventory.

```ts
type ArtifactRecord = {
  id: string;
  projectSlug: string;
  filePath: string;
  type:
    | "screen"
    | "wireframe"
    | "prototype"
    | "photo"
    | "spreadsheet"
    | "diagram"
    | "document"
    | "presentation"
    | "research"
    | "code"
    | "video-still"
    | "other";
  description: string;
  date?: string;
  evidenceStatus: "verified" | "reconstructed" | "redacted";
  confidentiality: "public" | "redact" | "internal-only";
  supports: string[];
  displayPriority: 1 | 2 | 3;
};
```

For each artifact, record:
- What it is
- What part of the story it proves
- Whether it can be shown publicly
- Whether it needs cropping, redaction, annotation, or reconstruction
- Its ideal placement in the narrative

Do not place artifacts merely to decorate the page. Every visual must explain, prove, compare, or orient.

---

# 8. Required Content Intake

Create a private source-notes file for every project.

Suggested path:

```text
content/_source-notes/<slug>.md
```

Use this intake template:

```md
# Project Source Notes

## Identity
- Project/company:
- Public title:
- Internal title:
- Role:
- Dates:
- Location:
- Team:
- Stakeholders:
- Project type:
- Desired depth tier:

## Central story
- What was happening before this work?
- Who experienced the problem?
- Why did it matter?
- What would happen if nothing changed?
- What was the clearest project goal?

## My ownership
- What did I own end to end?
- What did I contribute but not own?
- What decisions did I influence?
- What was explicitly outside my scope?

## Constraints
- Time:
- Data:
- Technical:
- Operational:
- Regulatory:
- Privacy/confidentiality:
- Team/resources:
- User access:

## Work performed
- Discovery:
- Research:
- Planning:
- Requirements:
- Roadmap:
- Design:
- Documentation:
- Engineering collaboration:
- Operations:
- Testing:
- Launch/rollout:
- Follow-up:

## Important decisions
For each decision:
- Situation:
- Evidence:
- Options considered:
- Decision:
- Tradeoff:
- Result:

## Artifacts
- File:
- What it shows:
- Public/redacted/private:
- Suggested caption:

## Results
- Verified metrics:
- Qualitative outcomes:
- Adoption:
- Delivery:
- Quality:
- Efficiency:
- Customer/user impact:
- Team/process impact:
- What cannot be claimed:

## Tools and AI workflows
- Tool:
- Exact use:
- Input/context:
- Output:
- What the tool got wrong:
- How I checked or corrected it:
- Final value:

## Reflection
- What did I learn?
- What changed in my thinking?
- What would I do differently?
- What capability did this demonstrate?
```

---

# 9. Standard Case-Study Architecture

The order may adapt by project type, but the following is the default.

## 9.1 Hero

Required fields:
- Eyebrow: company, course, or project category
- Outcome-oriented title
- One-sentence description
- Role
- Timeline
- Team
- Scope
- Tools
- Tags
- Hero visual
- Optional confidentiality note

Headline formula:

> [Action or transformation] for [user, team, or system]

Examples:
- Redesigning a fragmented dev-kit workflow into a traceable delivery system
- Building a fairer room-booking experience for student clubs
- Creating a scalable retail design system across storefront channels

Avoid generic titles such as:
- "My Internship"
- "UX Case Study"
- "Product Design Project"

## 9.2 Snapshot

Use a compact grid for:
- Challenge
- Contribution
- Outcome
- Tools or methods

This should be readable without opening the full story.

## 9.3 Executive summary

Write 90-160 words answering:
- What was the situation?
- What did Kamal own?
- What changed?
- Why is the project relevant?

Do not repeat the metadata verbatim.

## 9.4 The situation

Use a human or operational opening rather than a textbook introduction.

Possible opening forms:
- A specific failure or friction point
- A repeated operational breakdown
- A user scenario
- A business constraint
- A moment that clarified the real problem

Then explain:
- Background
- Who was affected
- Existing workflow or product
- Why the problem mattered
- Consequence of inaction

## 9.5 My role and scope

Show:
- Personal ownership
- Team context
- Main collaborators
- Boundaries
- What Kamal inherited versus created
- Where he led, supported, or influenced

Use a role map or responsibility strip when useful.

## 9.6 Constraints

List only constraints that shaped decisions.

Possible categories:
- Timeline
- Technical limitations
- No direct user access
- Incomplete data
- Regulatory or privacy limits
- Operational dependencies
- Limited artifacts
- New team or process
- Hardware or supply-chain constraints

Explain the consequence of each constraint. Do not present constraints as excuses.

## 9.7 Understanding the system

Choose the visual appropriate to the project:
- Current-state workflow
- Service blueprint
- User journey
- System map
- Architecture diagram
- Information flow
- Stakeholder map
- Inventory lifecycle
- Funnel
- Content production pipeline

The accompanying copy should identify:
- Bottlenecks
- Failure points
- Unknowns
- Dependencies
- Decision points

## 9.8 Process chapters

Do not use a generic five-step "design thinking" diagram unless the project genuinely followed it.

Build chapters around the actual work, such as:
- Mapping the existing workflow
- Establishing requirements
- Prioritizing the roadmap
- Exploring alternatives
- Building the tracking system
- Designing the booking flow
- Validating the riskiest assumptions
- Preparing handoff and rollout

Each process chapter should follow:

> Context -> Evidence -> Decision -> Action -> Result

## 9.9 Key decisions

This is one of the most important sections.

Create 2-5 decision blocks.

```ts
type Decision = {
  title: string;
  situation: string;
  evidence: string[];
  options?: string[];
  decision: string;
  tradeoff?: string;
  result?: string;
  artifactIds?: string[];
};
```

A decision block should explain:
- What needed to be decided
- What evidence existed
- What alternatives were possible
- Why one direction was chosen
- What was sacrificed or deferred
- What happened afterward

This demonstrates product judgment more effectively than a list of tasks.

## 9.10 Artifacts and final work

Show the strongest artifacts at a readable size.

For each figure:
- Descriptive title
- 1-3 sentence caption
- What the visitor should notice
- Evidence or reconstruction label when required
- Optional annotation

Use paired comparisons where useful:
- Before / after
- Early / final
- Option A / chosen direction
- Manual / improved workflow
- User-facing / admin-facing
- Artifact / implementation

## 9.11 Collaboration and delivery

Explain how the work moved through the organization.

Possible evidence:
- Requirements or specifications
- Roadmap
- Handoff documentation
- QA checklist
- Workshop
- Design review
- Sprint planning
- Supply-chain or operations coordination
- Pilot plan
- Release or shipment workflow
- Status tracking

Avoid saying only "I collaborated cross-functionally." Name the functions, the handoff, and the decision enabled.

## 9.12 Tools and software

Do not present a decorative logo wall without context.

Group tools by use:
- Research and synthesis
- Design and prototyping
- Planning and documentation
- Data and analysis
- Development
- Communication
- AI-assisted workflow

For AI tools, show exact use:

```md
### AI-assisted workflow
I used Claude Code to translate the agreed booking logic into a working prototype structure, then checked generated components against the flow requirements and manually corrected state handling that did not reflect the intended admin override process.
```

The reader should understand:
- What the tool accelerated
- What context Kamal supplied
- What it produced
- What required human judgment
- How the output was verified

Avoid:
- "Used ChatGPT to brainstorm"
- "Leveraged AI to improve efficiency"
- Generic tool lists with no workflow

## 9.13 Results and impact

Separate outcomes into evidence types.

### Quantitative
Use only verified or approved estimates:
- Time
- Errors
- Throughput
- Adoption
- Completion
- Reliability
- Engagement
- Delivery
- Revenue
- Cost
- Quality

### Qualitative
Examples:
- Better traceability
- Clearer ownership
- Reduced ambiguity
- Faster handoffs
- Improved stakeholder confidence
- Process adopted by the next team member
- Stronger design consistency
- Better ability to prioritize

### Capability or organizational impact
Examples:
- New reusable workflow
- Documentation standard
- Repeatable decision framework
- Improved collaboration pattern
- Foundation for future implementation

For academic or unlaunched work, distinguish:
- Designed
- Prototyped
- Validated
- Demonstrated feasibility
- Proposed
- Piloted
- Implemented
- Shipped

Never convert a prototype into a "launch."

## 9.14 Reflection

Use 2-4 specific lessons.

Good reflection:
- Connects a real event to a changed behavior
- Identifies what would be done differently
- Shows growth in product judgment, systems thinking, communication, or execution

Avoid:
- "I learned communication is important."
- Generic gratitude sections
- Excessively self-critical writing
- Repeating the entire project

## 9.15 What happened next

Use when there is a real continuation:
- Adoption
- Handoff
- Pilot
- Next co-op continuation
- Future roadmap
- Deferred phase
- Acquisition
- Redesign
- Later learning

If there is no meaningful next step, omit the section.

## 9.16 Next project

End with:
- One recommended next case study
- A short reason it complements the current one
- Previous / next navigation

Do not end on a generic contact form alone.

---

# 10. Visual Storytelling Rules

## Visual pacing
Aim for one meaningful visual every 1-2 viewport heights.

Avoid:
- More than 700 uninterrupted words
- Tiny screenshot galleries
- Repetitive mockups
- Decorative stock imagery that implies work Kamal did not do
- Huge empty sections used only for visual drama

## Preferred visual formats
Use:
- Annotated screenshots
- Cropped artifact details
- Process diagrams
- Current-state and future-state workflows
- Timelines
- Decision trees
- System maps
- Journey maps
- Information architecture
- Before/after comparisons
- Artifact contact sheets
- Simple metric cards
- Data tables when they prove a decision
- Video stills when motion or interaction matters

## Reconstructed visuals
For projects without public artifacts, create restrained explanatory visuals from confirmed facts:
- Workflow diagram
- Shipment lifecycle
- Status model
- Handoff map
- Responsibility map
- Before/after process
- Sample documentation structure
- Simplified system architecture
- Redacted tracker layout

Caption every reconstructed visual:

> Reconstructed diagram based on the workflow I documented and supported during the project. Confidential details have been simplified.

Do not fabricate polished product screens for work that was operational or documentation-based.

## Image treatment
- Use actual project colors only when they improve recognition.
- Preserve the portfolio's overall neutral visual system.
- Use a single restrained accent per project.
- Avoid glassmorphism, excessive gradients, neon glow, and obvious AI-generated imagery.
- Use subtle borders, captions, whitespace, and simple framing.
- Do not make every screenshot appear inside a device mockup.
- Show raw artifacts when authenticity is more valuable than polish.

## Accessibility
- All meaningful visuals require useful alt text.
- Core information cannot exist only inside an image.
- Keep body line length around 60-75 characters.
- Maintain semantic heading order.
- Ensure keyboard access to galleries, accordions, and navigation.
- Do not rely on color alone.
- Respect reduced-motion preferences.
- Maintain sufficient contrast.
- Use readable captions on mobile.

---

# 11. Writing Style

## Voice
Write in first person, with direct and reflective language.

Desired:
- Clear
- Specific
- Thoughtful
- Human
- Confident without exaggeration
- Technically literate without jargon dumping

## Sentence model
Prefer:
- Problem -> action -> reason -> result
- Observation -> implication -> decision
- Constraint -> tradeoff -> response

## Show judgment
Replace:
> I created a spreadsheet to track units.

With:
> The existing process had no reliable way to connect a physical unit to its calibration, shipment status, and handoff history. I introduced UID-based tracking so each unit could be followed through the full workflow.

## Avoid portfolio filler
Avoid:
- Seamless
- Innovative solution
- Leveraged
- Synergy
- Dynamic environment
- Passionate
- User-centric
- End-to-end, unless the actual scope is explained
- Cross-functional, unless the functions and interaction are named
- I was responsible for, repeated throughout
- Generic design-process narration

## Keep the person visible
Include selective moments such as:
- A misunderstanding that changed the approach
- A process that initially failed
- A difficult tradeoff
- A realization from feedback
- A decision Kamal would change now

Do not make the case study sound like corporate marketing copy.

---

# 12. Component System

Create reusable **details-page** components, but do not force all components onto all pages. Do not alter the existing project-card components as part of this system.

```text
components/case-study/
  CaseStudyHero.tsx
  CaseStudySnapshot.tsx
  CaseStudyTOC.tsx
  CaseStudySection.tsx
  RoleScope.tsx
  ConstraintList.tsx
  ProcessFlow.tsx
  SystemMap.tsx
  DecisionBlock.tsx
  ArtifactFigure.tsx
  ArtifactGallery.tsx
  BeforeAfter.tsx
  MetricGrid.tsx
  OutcomeGroup.tsx
  ToolWorkflow.tsx
  QuoteCallout.tsx
  ReflectionBlock.tsx
  EvidenceLabel.tsx
  NextProject.tsx
```

## Component behavior

### `CaseStudyHero`
Props:
- eyebrow
- title
- summary
- metadata
- tags
- hero artifact
- confidentiality note

### `CaseStudySnapshot`
A 2x2 or 4-column responsive grid:
- Challenge
- Role
- Response
- Outcome

### `CaseStudyTOC`
- Sticky on desktop
- Collapsible on mobile
- Highlights active section
- Uses semantic anchor links
- Hidden for compact cases with fewer than four sections

### `DecisionBlock`
Supports:
- Situation
- Evidence
- Decision
- Tradeoff
- Result
- Linked artifact

### `ArtifactFigure`
Supports:
- Image or video
- Alt text
- Caption
- Annotation
- Evidence status
- Expand view
- Optional side-by-side layout

### `MetricGrid`
- 1-4 cards
- Supports quantitative and qualitative evidence
- Displays evidence labels internally, but only public-facing labels when needed
- Does not animate numbers unless motion adds real value

### `OutcomeGroup`
Separate:
- User/customer
- Business
- Operational
- Product/team
- Learning

### `ToolWorkflow`
Shows tools as part of a sequence, not merely logos.

---

# 13. Data Architecture

Use structured content so all case studies share a reliable renderer.

Preferred structure:

```text
content/
  case-studies/
    force-n.mdx
    roomease.mdx
    greenhouse.mdx
    hera.mdx
    pill-pal.mdx
    pathpeer.mdx
    informatica.mdx
  _source-notes/
    force-n.md
    roomease.md
    ...

data/
  case-studies.ts
  artifacts.ts

public/
  case-studies/
    force-n/
    roomease/
    ...
```

## TypeScript model

```ts
export type EvidenceStatus =
  | "verified"
  | "qualitative"
  | "estimated"
  | "reconstructed"
  | "redacted";

export type CaseStudyType =
  | "product-ux"
  | "systems-operations"
  | "visual-growth"
  | "research-strategy"
  | "technical"
  | "compact";

export type CaseStudyTier = "featured" | "standard" | "compact";

export interface CaseStudyMetric {
  value?: string;
  label: string;
  description?: string;
  evidenceStatus: EvidenceStatus;
  sourceNote?: string;
}

export interface CaseStudyArtifact {
  id: string;
  src: string;
  type: "image" | "video" | "diagram" | "document" | "table";
  title: string;
  alt: string;
  caption?: string;
  evidenceStatus: EvidenceStatus;
  confidentiality?: "public" | "redacted";
  width?: number;
  height?: number;
}

export interface CaseStudyMeta {
  slug: string;
  company?: string;
  project: string;
  title: string;
  summary: string;
  role: string;
  dates: string;
  timeline?: string;
  team?: string[];
  collaborators?: string[];
  tools?: string[];
  tags: string[];
  type: CaseStudyType;
  tier: CaseStudyTier;
  featured: boolean;
  heroArtifactId?: string;
  metrics?: CaseStudyMetric[];
  artifacts?: CaseStudyArtifact[];
  nextSlug?: string;
}
```

## Rendering principle
Content must be authored and reviewed before deployment. Selecting a project should render the corresponding stored case study. Do not generate public-facing prose live through an LLM at runtime.

---

# 14. Route and Interaction Behavior

Use a dedicated route:

```text
/work/[slug]
```

When a visitor selects an existing experience or project entry:
1. Navigate to the corresponding route.
2. Set focus to the page title.
3. Show the hero and overview immediately.
4. Load media responsively.
5. Preserve project browsing context for return navigation.
6. Provide next-project navigation at the end.

Optional:
- Use route transitions only when subtle.
- Use an image lightbox for artifact inspection.
- Allow video clips to play inline without autoplay sound.
- Use accordions only for secondary technical detail, not for the central story.

Do not hide the whole case study inside a modal. A dedicated route is easier to share, navigate, index, and read.

---

# 15. Content Assembly Algorithm

For each project:

## Step 1: Classify
Determine:
- Case-study type
- Depth tier
- Artifact strength
- Confidentiality level
- Central story
- Primary hiring signal

## Step 2: Select one narrative spine
Examples:
- Turning an unreliable workflow into a traceable system
- Making access to shared resources fairer and clearer
- Scaling a design system across retail channels
- Reducing uncertainty in a complex product decision

Everything on the page must support this spine.

## Step 3: Build the evidence table
Map every claim to:
- Source note
- Artifact
- Confirmed memory
- Metric source
- Evidence status

Remove unsupported claims.

## Step 4: Draft the top 20% of the details page
Write:
- Hero
- Snapshot
- Executive summary
- Central problem
- Strongest outcomes

A visitor should understand the work from this portion of the details page alone.

## Step 5: Choose process chapters
Use actual project phases, not a default template.

## Step 6: Identify key decisions
Select the 2-5 decisions that best demonstrate judgment.

## Step 7: Curate visuals
For every section, decide whether a visual:
- Orients
- Explains
- Compares
- Proves
- Humanizes

If it does none of these, omit it.

## Step 8: Write captions
Captions should explain what to notice and why it mattered.

## Step 9: Add reflection
Connect lessons to future product behavior.

## Step 10: Edit for scanning
- Short paragraphs
- Clear subheads
- Selective bolding
- No dense walls
- No repeated claims
- No redundant tool lists

## Step 11: Validate
Run the QA checklist in this document.

---

# 16. Project-Specific Portfolio Plan

This section defines how the generalized system should initially apply to Kamal's known work.

## ForceN
Classification:
- Systems / product operations
- Featured or strong standard case study
- Text-first with reconstructed visuals

Primary story:
- Creating structure, traceability, and clearer handoffs across the dev-kit process from procurement through assembly, calibration, and shipment.

Recommended visuals:
- Reconstructed current-state workflow
- Improved end-to-end lifecycle
- UID tracking model
- Status and responsibility map
- Redacted checklist or tracker structure
- Shipment/handoff timeline
- Outcome cards

Emphasize:
- Systems thinking
- Process ownership
- Documentation
- Roadmap and workflow planning
- Engineering, operations, and supply-chain coordination
- Fast learning without a deep mechanical background
- Adoption by the next co-op
- Verified efficiency, turnaround, and error outcomes only where evidence is approved

Do not:
- Invent product UI
- Present operational work as a UX app
- Use confidential hardware photos unless cleared

## RoomEase
Classification:
- Product / UX
- Featured case study
- Artifact-rich

Primary story:
- Designing a fairer, more transparent room-booking system for student clubs while balancing preferences, constraints, and administrative control.

Recommended visuals:
- Existing booking problem
- Stakeholder map
- Consolidated room dataset
- Ranking logic
- User flow
- Admin flow
- Wireframe progression
- System or sequence architecture
- Pseudocode
- Pilot roadmap

Emphasize:
- Product strategy
- Requirements and prioritization
- Fairness and transparency
- Data consolidation
- Manual override
- Feasibility demonstration
- Presentation and communication leadership
- Use of Claude Code, Cursor, Copilot, Figma, and Supabase planning as concrete workflows

Be precise:
- This was a prototype and feasibility demonstration, not a fully deployed backend.

## Greenhouse
Classification:
- Visual design / growth with product operations
- Featured or standard case study
- Strongest artifact library

Primary story:
- Building and adapting a coherent design and asset system across retail and ecommerce channels while supporting the operational workflow behind it.

Recommended visuals:
- Storefront and campaign assets
- Channel comparison
- Design variants
- Asset taxonomy
- Feedback iterations
- Inventory or UID workflow
- Final asset gallery
- Before/after production system

Emphasize:
- Visual craft
- Ecommerce constraints
- Design consistency
- Production speed
- Stakeholder feedback
- Retail channel adaptation
- Relationship between customer-facing assets and internal operations

## Hera
Classification:
- Product / UX
- Standard or featured depending on final artifact depth
- Second-strongest artifact library

Primary story:
- Select the most defensible user or product problem from the available work, then center the case study on the decisions and artifacts that address it.

Emphasize:
- UX/UI
- Product thinking
- Research or feedback
- Iteration
- Product operations
- Concrete use of ChatGPT or other tools only where the workflow is known

## HCI / Pill Pal
Classification:
- Product / UX academic project
- Standard case study
- Visually strong

Emphasize:
- User problem
- Human-computer interaction principles
- Research and usability
- Prototype evolution
- Accessibility
- Final design decisions
- What was validated versus proposed

## PathPeer
Classification:
- Compact project note until more artifacts exist

Keep:
- Clear context
- Exact contribution
- Strongest available artifacts
- 2-3 meaningful decisions
- Reflection

Do not position it as the leading visual case study.

## Informatica
Classification:
- Research / strategy or compact experience note

Emphasize:
- Research question
- Synthesis
- PM support
- Decision influence
- Evidence-backed deliverables

Do not fabricate visuals. Use a compact page, redacted research framework, or reconstructed insight flow when appropriate.

---

# 17. AI Workflow Section

AI use should appear as part of the working method, not as a universal marketing badge.

For each relevant project, capture:

```ts
type AIWorkflow = {
  tool: "Claude" | "Claude Code" | "ChatGPT" | "Copilot" | "Gemini" | "Cursor" | string;
  task: string;
  contextProvided: string;
  outputUsed: string;
  errorOrLimitation?: string;
  verification: string;
  finalImpact: string;
};
```

Good examples:
- Turning confirmed requirements into an initial prototype structure, then checking logic and state handling manually.
- Consolidating documentation drafts, then validating them against engineering and operations inputs.
- Generating first-pass code or queries, then testing outputs and correcting edge cases.
- Organizing large sets of notes into candidate themes, then reviewing the original evidence before accepting insights.

Every AI example should preserve Kamal's judgment and verification.

---

# 18. Scope Boundary

## In scope
- The dedicated details page opened after a project or experience is selected
- Case-study content, structure, visuals, components, routes, and responsive behavior
- Supporting artifact galleries, diagrams, outcomes, reflections, and next-project navigation
- Data and MDX required to render the details page

## Out of scope
- Project-card design
- Card copy, card thumbnails, card hover states, and card layout
- Homepage or work-index redesign
- Portfolio filtering or browsing behavior
- Replacing the existing card component system

The details page may receive data from the existing card selection, but it must not require the card UI to be redesigned.

# 19. Page Design Direction

The pages should feel like one portfolio, not a collection of unrelated templates.

## Overall
- Minimal, editorial, and deliberate
- Strong typography
- Generous but controlled whitespace
- Thin borders or subtle framing
- Restrained project accent
- Clear hierarchy
- Real artifacts over decorative imagery

## Hero
- Do not require a full-bleed image.
- Allow typographic or diagram-led heroes for text-first work.
- Keep metadata visible without making it resemble a resume table.

## Sections
- Alternate full-width artifacts with narrower reading columns.
- Use boxed modules selectively for decisions, metrics, and snapshots.
- Avoid placing every paragraph inside a card.
- Use numbered chapters for long featured studies.
- Keep section transitions visible but quiet.

## Responsive behavior
Desktop:
- 12-column layout
- Reading column around 7-8 columns
- Optional sticky TOC in 2-3 columns
- Full-width artifact breaks

Mobile:
- Single column
- Metadata stacks
- Horizontal galleries become swipeable or vertically stacked
- Sticky TOC becomes a compact disclosure
- No tiny side-by-side screenshots

---

# 20. Quality Assurance Checklist

## Truth
- [ ] Every metric is sourced or approved.
- [ ] Launch status is accurate.
- [ ] Personal ownership is distinguishable from team work.
- [ ] Reconstructed and redacted visuals are labeled.
- [ ] No confidential information is exposed.
- [ ] No artifact implies work that did not occur.

## Story
- [ ] The central problem is understandable in the first screen or two.
- [ ] The page has one narrative spine.
- [ ] The role and scope are explicit.
- [ ] At least two meaningful decisions are explained for featured work.
- [ ] Process sections show reasoning, not only activity.
- [ ] Outcomes are connected to actions.
- [ ] Reflection is specific.

## Visuals
- [ ] Every visual has a purpose.
- [ ] Screens are legible at the displayed size.
- [ ] Captions explain what to notice.
- [ ] There are no long unbroken text walls.
- [ ] Artifact treatment is consistent.
- [ ] Mobile layouts remain readable.
- [ ] Alt text is present.

## Writing
- [ ] No generic AI-sounding filler.
- [ ] No repeated introduction.
- [ ] Paragraphs are concise.
- [ ] "I" and "we" are used accurately.
- [ ] Generic words such as "seamless" and "leveraged" have been removed.
- [ ] Tools are connected to actual work.
- [ ] Technical detail supports the story rather than overwhelming it.

## Code
- [ ] Existing project cards remain unchanged.
- [ ] The details-page system works with the current card selection and slug structure.
- [ ] All routes build.
- [ ] Missing optional fields do not create empty sections.
- [ ] Images use optimized formats and responsive sizing.
- [ ] Components are keyboard accessible.
- [ ] Heading structure is semantic.
- [ ] Deep links to sections work.
- [ ] Previous/next navigation is correct.
- [ ] No source-note or internal evidence files ship publicly.

---

# 21. Claude Code Master Instruction

Copy the instruction below into Claude Code after placing this document in the repository.

```md
You are implementing the **project and experience details-page case-study system** for Kamal Ahsan's portfolio.

The project cards and browsing interface already exist. Do not redesign, replace, or expand them unless a separate instruction explicitly requests it.

Treat `PORTFOLIO_CASE_STUDY_SYSTEM.md` as the source of truth.

Your responsibilities are to:
1. Audit the selected project using its private source notes and artifact inventory.
2. Classify it by case-study type and depth tier.
3. Choose one central narrative spine.
4. Write a truthful, specific, first-person case study that explains context, ownership, constraints, reasoning, decisions, work, artifacts, collaboration, tools, outcomes, and reflection.
5. Use only verified or explicitly approved information.
6. Never invent metrics, quotes, responsibilities, research, launch status, technical implementation, or artifacts.
7. Mark reconstructed or redacted visuals in their captions.
8. Adapt the section sequence to the actual work rather than forcing a generic design process.
9. Keep the first 20% highly scannable and make deeper detail available below.
10. Implement the page using the shared case-study components and structured data model.
11. Render the case study at `/work/[slug]`.
12. Use actual project artifacts wherever possible.
13. Create restrained explanatory diagrams only when the project lacks public visuals.
14. Hide unsupported optional sections instead of rendering placeholders.
15. Preserve the portfolio's minimalist visual system and accessibility requirements.
16. Validate the result against the complete QA checklist before considering the case study finished.

Before editing code:
- Read this source-of-truth file.
- Read the selected project's source notes.
- Inspect all available artifacts.
- Produce a brief internal plan containing:
  - Case-study type
  - Depth tier
  - Narrative spine
  - Primary hiring signal
  - Proposed sections
  - Proposed visuals
  - Missing facts
  - Confidentiality risks

Do not begin implementation until the plan is internally consistent.

During writing:
- Prefer evidence, decisions, and concrete actions over adjectives.
- Use "I" only for Kamal's work and "we" for shared work.
- Explain how tools were used, including AI verification, instead of showing a logo wall.
- Distinguish designed, prototyped, validated, implemented, piloted, and shipped.
- Keep smaller projects compact.
- Do not over-feature PathPeer or Informatica without additional evidence.
- Preserve Greenhouse as the strongest artifact-backed visual work.
- Preserve ForceN as a strong systems-and-ownership story without fabricating visual product artifacts.
- Preserve RoomEase as a strong end-to-end product case study while accurately describing it as a prototype and feasibility demonstration.

After implementation:
- Run type checking, linting, and the production build.
- Test desktop and mobile layouts.
- Test keyboard navigation and heading order.
- Confirm every image has useful alt text.
- Confirm no private source notes are included in the production bundle.
- Report the files changed, the page structure, any unresolved `NEEDS_INPUT` items, and any claims excluded because they lacked evidence.
```

---

# 22. Definition of Done

A case study is complete when:
- A recruiter understands the project in under one minute.
- A hiring manager can examine the decisions and evidence in depth.
- Kamal's personal ownership is unmistakable.
- The page demonstrates product judgment, systems thinking, execution, and communication.
- The visuals feel authentic rather than generated for appearance.
- The story is as detailed as the evidence supports, but no longer.
- The implementation is reusable across all project types.
- Nothing on the page requires exaggeration to feel impressive.

---

# 23. Worked Content Example: ForceN

This section is a representative example of the level, type, and organization of information a finished case study may contain. It is not a rigid template and should not be copied mechanically into unrelated projects.

The example also demonstrates how to:
- Turn operational work into a compelling product and systems story.
- Explain personal ownership without overstating team outcomes.
- Use reconstructed diagrams when confidential or visual artifacts are limited.
- Separate verified claims from information that still needs confirmation.
- Describe tools as part of the workflow rather than as a decorative list.

## Recommended classification

- **Case-study type:** Systems / product operations
- **Depth tier:** Featured or strong standard case study
- **Primary hiring signal:** Systems thinking, ownership, product understanding, process design, and coordination across engineering, operations, inventory, and supply chain
- **Narrative spine:** Learning a technically unfamiliar product, mapping the complete Dev Kit operating system, and introducing the structure needed to make delivery more traceable and reliable
- **Visual approach:** Real redacted artifacts where available, supported by restrained reconstructed workflow diagrams

---

## Sample public-facing case-study content

# Turning a fragmented Dev Kit workflow into a traceable delivery system

At ForceN, I helped organize the internal process used to move Dev Kits from procurement through assembly, calibration, and shipment.

The challenge was not simply completing each individual task. Information, hardware, ownership, and dependencies had to move reliably between engineering, operations, inventory, and supply-chain stakeholders. I created the tracking, documentation, and coordination structure needed to make that full process easier to understand and manage.

### Role

Product Engineering Co-op

### Scope

Process design, product operations, documentation, tracking, and shipment coordination

### Collaborators

Engineering, operations, inventory, supply chain, and other internal stakeholders

### Tools

Google Sheets, internal documentation, standardized checklists, planning tools, and Gemini-assisted documentation workflows

### Outcome

A clearer and more traceable process for preparing and shipping Dev Kits, with documentation that remained useful after my term.

---

## The situation

ForceN's Dev Kits passed through several connected stages before they could reach a customer or partner:

**Procurement -> Assembly -> Calibration -> Final preparation -> Shipment**

Each stage depended on information and work completed by another person or team. A delay, missing update, or unclear handoff early in the process could create problems much later when a unit was being calibrated or prepared for shipment.

The process also had to account for **14 different types of units**, rather than one completely standardized configuration. That made it important to know exactly which unit was being handled, what work had been completed, what remained outstanding, and who needed to act next.

The underlying problem was visibility. There was no sufficiently reliable way to understand the complete state of a Dev Kit without gathering information from multiple people and sources.

> **Evidence note:** Confirm exactly what the number 14 represents before publication. It may refer to unit types, units shipped, shipment configurations, or another category.

---

## My role

My responsibility was to understand how the complete system worked and introduce more structure around it.

I worked across the Dev Kit lifecycle to:

- Consolidate process information that was spread across teams.
- Track individual units and their current status.
- Coordinate handoffs between engineering, operations, inventory, and shipment activities.
- Create checklists and documentation for recurring work.
- Surface blockers before they became shipment delays.
- Make the process understandable enough for someone else to continue after my co-op.

I entered the role without a deep mechanical background, so the first part of the work involved learning how the product and its supporting processes fit together. Rather than treating each assignment as an isolated task, I tried to understand how decisions in one stage affected the entire delivery system.

---

## Understanding the full system

My first priority was developing a complete picture of how a Dev Kit moved through the organization.

A unit could not simply be marked as "in progress" or "complete." Its actual readiness depended on several questions:

- Had the required components been procured?
- Was assembly complete?
- Had calibration been performed and documented?
- Were all accessories and supporting materials prepared?
- Was the unit assigned to the correct destination?
- Had the required shipment information been confirmed?
- Was there anything blocking the next handoff?

Mapping these dependencies helped me distinguish between a unit that physically existed and a unit that was actually ready to leave the facility.

### Recommended visual: How a Dev Kit moved through ForceN

Create a reconstructed swimlane diagram showing the movement of a unit across:

1. Procurement
2. Engineering and assembly
3. Calibration
4. Operations and inventory
5. Shipment preparation
6. Final handoff

Highlight:
- Where ownership changed
- What information moved with the unit
- Where delays or ambiguity could occur
- Where tracking or documentation was introduced

Caption:

> Reconstructed diagram based on the Dev Kit workflow I documented and supported. Confidential details have been simplified.

---

## Creating unit-level traceability

One of the most important changes was organizing tracking around the individual unit.

Rather than relying only on separate task lists or informal status updates, I used UID-based tracking to connect each physical unit to its progress through the workflow.

For each unit, the system could capture information such as:

- Unit identifier and type
- Current stage
- Assembly status
- Calibration status
- Outstanding requirements
- Shipment destination
- Responsible person or team
- Blockers and next actions

This created a more reliable source of truth. Instead of asking several people whether a kit was ready, the team had a clearer way to see what had been completed and what still required attention.

### Recommended visual: From scattered updates to unit-level tracking

Create a before-and-after comparison.

**Before**
- Status information distributed across messages, documents, and individual knowledge
- No consistent relationship between the physical unit and its complete status
- Readiness reconstructed manually from multiple sources

**After**
- Each UID connected to its current state
- Dependencies, owner, blockers, and next action visible together
- A clearer basis for coordinating calibration, preparation, and shipment

Where permission allows, show a redacted or reconstructed version of the tracker beside this diagram.

---

## Standardizing the handoffs

The largest risks often appeared between stages rather than within them.

Assembly could be complete while calibration documentation was missing. A calibrated unit could be ready while shipment information was still unclear. Inventory could appear available without all of the required accessories being prepared.

I introduced standardized checklists and clearer status definitions so that completing one stage also meant preparing the information required by the next stage.

The goal was not to create unnecessary administrative work. It was to define the minimum information needed for a handoff to be considered complete.

This made responsibilities easier to understand and reduced the need to repeatedly reconstruct the status of a unit.

### Recommended decision block

**Situation:** Different teams understood their own tasks, but the conditions for a complete handoff were not always visible.

**Evidence:** Missing or unclear information at one stage created follow-up work and uncertainty later in the process.

**Decision:** Define standard readiness criteria and recurring checklists around the transition between stages.

**Tradeoff:** The process required consistent manual updates, but the added structure was lightweight enough to adopt immediately.

**Result:** The team had a clearer way to determine what was complete, what was blocked, and what the next team needed.

---

## Choosing a lightweight solution

A major product decision was **not** to overengineer the solution.

The immediate problem did not require a custom application. The team needed a system that could be introduced quickly, edited as the workflow evolved, and understood by people across different functions.

Google Sheets and standardized documentation provided enough flexibility to establish the process without creating a new technical dependency.

The tradeoff was that the system still required consistent manual updates. However, it created a practical foundation that the team could adopt immediately and later translate into a more automated internal tool if the need justified it.

This decision demonstrates that the best product response is not necessarily to build more software. It is to choose the smallest system capable of improving visibility and execution.

### Recommended decision block

**Situation:** The workflow needed better visibility quickly, but a custom internal platform would require additional time, engineering capacity, and maintenance.

**Options considered:**
- Continue coordinating through existing informal channels
- Build a custom application
- Introduce a lightweight shared tracking and documentation system

**Decision:** Use flexible tools already accessible to the team.

**Tradeoff:** Manual upkeep remained necessary, but implementation and iteration were much faster.

**Result:** The process could be used and improved during the co-op rather than remaining a future software project.

---

## Treating shipment as part of the product

I also learned that shipping was not simply the final administrative step.

A product was not successfully delivered just because it had been assembled and calibrated. The destination, accessories, documentation, packaging, ownership, and timing all had to align.

I helped coordinate those final details and ensure that the physical unit matched the information associated with it.

That experience changed how I thought about product delivery. The product experience extends beyond the object itself; it includes every process required to place the correct product in the correct person's hands, in a usable state, at the expected time.

### Recommended visual: What "ready to ship" actually meant

Create a layered readiness model:

1. Hardware ready
2. Calibration verified
3. Accessories prepared
4. Documentation complete
5. Destination confirmed
6. Shipment coordinated

Use this visual to show why a simple binary "complete" status was insufficient.

---

## Working across teams

The Dev Kit process crossed several organizational boundaries. My role often involved translating information between people who viewed the product from different perspectives.

Engineering focused on technical readiness. Operations needed a predictable process. Inventory and supply-chain stakeholders needed accurate information about physical units and components. Shipment preparation required all of those inputs to come together at the correct time.

Do not summarize this only as "cross-functional collaboration." Show the actual interaction:

- What information engineering produced
- What operations required
- What inventory needed to confirm
- What had to be resolved before shipment
- How the tracker and documentation supported those handoffs
- Where Kamal coordinated, clarified, or followed up
- Which decisions remained owned by other functions

### Recommended visual: Responsibility and information map

Show the key functions around a central Dev Kit record. Connect each function to:
- Information supplied
- Decision owned
- Handoff received
- Risk created when information was missing

---

## Documentation as part of the operating system

The documentation was not an administrative record added after the work. It was part of how the process became repeatable.

Useful documentation may include:

- Unit-tracking fields
- Preparation checklists
- Calibration or readiness status definitions
- Shipment requirements
- Recurring process instructions
- Handoff notes
- Known blockers
- Escalation or follow-up guidance

The strongest artifact should show how documentation reduced dependence on memory and made it easier for another person to continue the process.

Where supported by the source material, explain how the documentation was used by the next co-op rather than merely stating that files were created.

---

## AI-assisted documentation workflow

AI should be included only when the exact workflow can be explained truthfully.

A possible structure is:

> I used Gemini as a drafting and organization aid while consolidating process documentation. I supplied the confirmed workflow details and used it to create an initial structure, but reviewed the output against the actual engineering and operations process before anything was treated as accurate. Where it generalized steps or missed hardware-specific dependencies, I corrected the documentation manually.

For the final page, confirm:

- What documents or plans Gemini helped draft
- What source information was supplied
- What Gemini misunderstood or oversimplified
- How the output was checked
- What time or organizational benefit it provided

Do not publish a vague statement such as "I leveraged AI to improve efficiency."

---

## Results

The work created a clearer operating structure around the Dev Kit lifecycle.

The strongest currently supported outcomes are:

- Improved traceability across procurement, assembly, calibration, and shipment
- Clearer ownership and next actions at each stage
- Less ambiguity when determining whether a unit was ready
- More consistent documentation for recurring work
- A process that could be understood and continued by the next co-op
- Support for multiple unit types and shipment configurations

Do not publish percentage improvements until the supporting source and definition for each metric have been verified.

Possible metrics requiring confirmation include:
- Turnaround-time improvement
- Delivery-efficiency improvement
- Reduction in shipment or preparation errors
- Number of units or shipments supported
- Number of distinct unit types
- Frequency of tracker or checklist adoption

Once verified, use only the strongest one or two metrics in the hero. The remaining outcomes can appear in the Results section.

---

## What I learned

### Learn the product before redesigning the process

It would have been easy to treat the assignment as a tracking problem and immediately create a spreadsheet. The more important work was understanding what each stage meant, why it existed, and what information the next person required.

The quality of the tracking system depended on the quality of my product understanding.

### Most process problems occur between responsibilities

Individual teams often understood their own work. The larger problem was how information and ownership moved between them.

That taught me to look closely at handoffs, dependencies, and unclear transitions when diagnosing a system.

### Technical gaps can be closed through curiosity and structure

I did not begin the role with deep mechanical knowledge. I learned by asking questions, consolidating information, and repeatedly connecting small details back to the complete system.

That experience reinforced that curiosity, determination, and a positive working attitude can help close an initial knowledge gap, especially when paired with strong documentation and systems thinking.

---

## What I would improve next

The next stage would be introducing selective automation without losing the flexibility of the original system.

Potential improvements could include:

- Automatic alerts when a unit remains blocked beyond a defined period
- Required-field validation before a handoff is completed
- A clearer dashboard for units at risk of shipment delay
- Integration between inventory, calibration records, and shipment information
- Historical reporting to identify recurring sources of delay

These should be presented as future opportunities, not as features already implemented.

---

## Internal `NEEDS_INPUT` list for the ForceN case study

Before publishing the final ForceN page, confirm:

1. Exact employment dates
2. Preferred public job title
3. Whether the number 14 refers to unit types, total units shipped, shipments, or another category
4. Definitions and sources for any 35%, 30%, or 25% improvement figures
5. Exact fields included in the UID tracker
6. Exact checklists and documentation Kamal personally created
7. One or two specific examples of bottlenecks or delayed handoffs
8. Which teams Kamal worked with directly
9. Which responsibilities he owned versus supported
10. Which artifacts may be shown publicly
11. Which artifacts require redaction or reconstruction
12. Exact Gemini workflow and verification process
13. Whether a manager or teammate provided feedback that may be paraphrased
14. What specifically was adopted or continued by the next co-op
15. Whether any final shipment, quality, or traceability outcomes can be quantified

Do not expose this list on the public case-study page.

---

## What this example is intended to teach Claude Code

When using this example as guidance:

- Preserve its level of specificity, not its exact wording.
- Adapt the content architecture to the selected project.
- Focus on the system and decisions rather than inflating the number of activities.
- Treat operational artifacts as product evidence.
- Use visuals to explain the real workflow, not to make the page resemble a software-design case study.
- Keep claims conservative until the source material supports stronger wording.
- Make the story compelling through clarity and judgment rather than exaggeration.

---

# 24. Amendments (added 2026-07-28, on top of the original draft)

## 24.1 Diagrams and illustrations are a priority, not a fallback

The original draft (Section 10, "Reconstructed visuals") already allows reconstructed diagrams when no real artifacts exist. This amendment makes it a **default preference, not a last resort**: for every process/systems-flavored case study (ForceN, Informatica, and any operational chapters inside otherwise visual case studies), actively build a diagram or illustration of the workflow, decision, or system being described — even where photos exist, a clean diagram is often the *clearer* artifact for explaining a process than a screenshot is. Treat "no real screenshots available" as permission to invest more in diagrams, not as a reason to fall back to plain text.

Every such diagram still follows the existing rules: captioned as reconstructed, built only from confirmed facts, no invented specifics, restrained visual style consistent with the rest of the portfolio (no glassmorphism/neon/obvious-AI-generated look, per Section 10's "Image treatment").

## 24.2 Known architecture mismatch to resolve before implementation

This spec's Section 12 (Component System) and Section 13 (Data Architecture) describe a *new* system — MDX case-study files, a `components/case-study/` library of ~18 components, a `data/case-studies.ts` + `data/artifacts.ts` split, `content/_source-notes/`.

The actual current codebase (as of 2026-07-28, after this session's Experience/Work merge and card redesign) already has a working, simpler system that this spec did not have visibility into:
- `lib/content/case-studies.ts` — single `CaseStudy` interface holding all case-study content directly (no MDX layer).
- `lib/content/theme.ts` — per-project visual theme (accent colors, gradients, icon).
- `app/work/[slug]/page.tsx` — the one existing detail-page renderer for all 7 projects.
- `components/CaseStudyCard.tsx`, `components/ProjectIcon.tsx`, `components/Tag.tsx` — the just-built card system (explicitly out of scope for this spec per Section 18, and should stay untouched).

Before writing real case-study content, we need to decide: extend the existing `CaseStudy` interface + detail-page template with new optional fields/sections (decisions, constraints, artifact figures, etc.) rather than introducing a parallel MDX system — or actually adopt this spec's MDX architecture wholesale, replacing the current renderer. The existing system is simpler and already working end-to-end for all 7 projects; the MDX system offers richer structure per Section 12/13 but is a bigger lift. **Not decided yet — resolve this before starting implementation.**

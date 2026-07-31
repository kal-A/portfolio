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

# 24. ForceN Details Page Implementation Plan (added 2026-07-31)

This section supersedes the earlier simplified ForceN framing (Section 23's worked example, and the "Turning production handoffs into a trackable system" title/spine used in early layout previews) wherever the two conflict.

The ForceN details page must not be presented primarily as a tracking or handoff cleanup project. The core story is the development of a ground-up operating roadmap for ForceN's standardized Dev Systems, designed to support an inventory-backed, off-the-shelf product line.

The existing project card and portfolio browsing experience are already designed and must remain unchanged. This plan applies only to the ForceN details page opened after the existing card is selected.

## 24.1 Central narrative

### Primary business objective

ForceN wanted Dev Systems to become a repeatable, off-the-shelf product line:

- Standard configurations would be produced ahead of demand.
- Completed units would be held in finished-product inventory.
- An incoming order could be fulfilled from available stock instead of triggering a new build from the beginning.
- The standard Dev System line would support a greater share of orders, reducing reliance on custom configurations as the default product path.

### Main project assignment

Kamal's principal task was to develop the operating roadmap that connected:

1. Product configuration
2. Component requirements
3. Inventory checks
4. Procurement
5. Assembly
6. Primary calibration
7. Rework after calibration failure
8. Lamination
9. Secondary calibration
10. Quality validation
11. Finished-product shelving
12. Finished-inventory updates
13. Order fulfilment
14. Shipment
15. Replenishment

### Narrative spine

> I helped design the operating system required to turn ForceN's Dev Systems into a standardized, inventory-backed product line rather than products that had to be assembled from the beginning whenever an order arrived.

Every section, visual, and result on the page should support this story.

## 24.2 Revised page title and hero

### Preferred title

> **Building an inventory-backed production system for ForceN's Dev Systems**

### Strong alternate title

> **Turning Dev Systems from order-triggered builds into a ready-to-ship product line**

### Avoid

- Turning production handoffs into a trackable system
- Status lived in people's heads as the primary headline
- Dev System transfer
- Generic titles centred only on tracking

Those ideas may appear as supporting issues, but they should not define the project.

### Hero supporting copy

> ForceN wanted its standard Dev Systems to become the default product offering: produced ahead of demand, held in finished inventory, and ready to ship when an order arrived. I developed the end-to-end operating roadmap connecting parts planning, procurement, assembly, calibration, documentation, finished-product inventory, and fulfilment.

### Hero metadata

- **Company:** ForceN
- **Role:** Product Engineer Intern
- **Location:** Toronto, ON
- **Dates:** Use confirmed dates only
- **Project type:** Product operations / process engineering / hardware product systems
- **Confidentiality note:** Internal trackers, scripts, and company-specific records are omitted or reconstructed

Do not use the confidentiality notice as a project tag.

## 24.3 Revised snapshot panel

Preserve the existing four-column visual treatment, but rewrite the content.

### Challenge

> ForceN needed a complete operating process for producing standardized Dev System configurations ahead of demand while maintaining the parts and finished-product inventory required to fulfil incoming orders.

### Contribution

> Developed the roadmap from configuration and component planning through procurement, assembly, calibration, quality validation, finished inventory, and shipment, with documentation and ownership requirements defined at each stage.

### Outcome

Until every percentage is fully verified, use:

> Created the operating foundation for an inventory-backed Dev System product line, reducing dependence on order-triggered production and undocumented process knowledge.

### Tools

List tools with purpose, not as an unexplained logo wall:

- **Arena:** part records, configuration references, and component identification
- **Confluence:** process and work-instruction documentation
- **Onshape:** product and assembly context
- **Calibration scripts:** sensor validation across configurations
- **Python / automation:** inventory checks, process support, or calibration logic where verified
- **AI tools:** documentation or workflow assistance only where the exact use can be explained and verified

Do not use the label `AI agents` unless the exact tool, task, output, and verification process are documented.

## 24.4 Revised details-page structure

### 01 — The product strategy behind the workflow

Explain:

- ForceN wanted Dev Systems to become the standardized, off-the-shelf product line.
- Standard configurations were intended to be built before an order arrived.
- Finished units would be placed into inventory and become available for immediate fulfilment.
- This approach reduced dependence on custom builds as the default order path.
- The production system therefore had to connect demand, component availability, assembly, quality, and replenishment.

Suggested heading:

> **From build-to-order to inventory readiness**

Suggested supporting sentence:

> The roadmap was not only about moving a unit between teams. It had to make standard Dev Systems producible, testable, stockable, and ready to fulfil an order without restarting the entire process.

### 02 — Mapping the complete production system

This section should contain the primary reconstructed system diagram.

#### Required high-level flow

```text
STANDARD DEV SYSTEM CONFIGURATION
                |
PARTS / BOM / ARENA REFERENCES
                |
COMPONENT INVENTORY CHECK
          |             |
Below threshold         Available
      |                    |
PROCUREMENT            ASSEMBLY
      |____________________|
                    PRIMARY CALIBRATION
                      |          |
                    Fail         Pass
                     |             |
              RETURN TO         LAMINATION
               ASSEMBLY             |
                         SECONDARY CALIBRATION
                                  |
                           QUALITY VALIDATION
                                  |
                         FINISHED-PRODUCT SHELF
                                  |
                       CONFIGURATION INVENTORY +1
                                  |
                           ORDER FULFILMENT
                                  |
                               SHIPMENT
                                  |
                    FINISHED-INVENTORY REVIEW
                                  |
                       REPLENISH AS REQUIRED
```

#### Required component-inventory loop

```text
PART DEDUCTION
      |
CHECK REMAINING STOCK
      |
IS STOCK BELOW THE MINIMUM THRESHOLD?
      |                      |
    Yes                      No
     |                        |
TRIGGER REPLENISHMENT    CONTINUE WORKFLOW
```

#### Visual requirements

Claude Code must:

- Distinguish component inventory from work in progress and finished-product inventory.
- Show calibration failure returning to assembly.
- Show lamination only after successful primary calibration.
- Show secondary calibration after lamination.
- Show finished inventory increasing only after quality validation.
- Show replenishment logic after component use.
- Show finished-product replenishment after fulfilment or when target stock is not met.
- Label the visual as reconstructed and public-safe.
- Avoid attaching unverified percentages directly to workflow stages.
- Build a responsive mobile layout that stacks vertically or supports accessible horizontal scrolling.
- Keep the current editorial visual language, warm palette, rounded borders, and restrained line work.

Suggested title:

> **How a Dev System moved from configuration to finished inventory**

Suggested caption:

> Reconstructed from the roadmap and documentation I developed. Internal tooling, thresholds, and product-specific details have been simplified for confidentiality.

### 03 — Designing the production and replenishment logic

Replace the current simplified "Standardizing the handoffs" framing with three operational decision modules.

#### Decision A — Standard configurations as repeatable products

**Situation:** ForceN wanted Dev Systems to support a greater share of orders instead of treating most incoming work as a custom unit or configuration.

**Decision:** Define repeatable configuration paths with known parts, assembly requirements, calibration procedures, and finished-inventory records.

**Why it mattered:** A standard product line can only be stocked ahead of demand when each configuration is sufficiently defined to be reproduced consistently.

**Result:** The roadmap connected product configuration to a repeatable production and inventory process.

#### Decision B — Replenishment triggered by actual component usage

**Situation:** A future build could be delayed even when the production roadmap was clear if a required substrate, Force Film, or other component was unavailable.

**Decision:** Connect part deductions to minimum-stock checks so inventory status was evaluated after component use and replenishment could begin before the next build was blocked.

**Why it mattered:** Inventory shortages had to be addressed upstream rather than discovered only when assembly was ready to begin.

**Result:** Component availability became part of the production logic instead of a separate, reactive activity.

#### Decision C — Calibration as a quality gate with a rework loop

**Situation:** A failed calibration could not be treated as an undefined exception.

**Decision:** Create an explicit route from failed calibration back to assembly for diagnosis and correction, followed by repeat testing. Allow only successful units to proceed to lamination and secondary calibration.

**Why it mattered:** Quality failures became part of the planned operating model rather than ad hoc interruptions.

**Result:** The process defined how a unit progressed, how it failed, and how it re-entered production.

### 04 — Making the system executable through documentation

The roadmap was not complete until every stage had the information required for another employee or team to execute it.

Create a documentation-system visual organized around one Dev System configuration.

#### Required documentation categories

- Configuration definition
- Arena part numbers
- Bill of materials or parts list
- Component inventory requirements
- Minimum stock thresholds
- Procurement instructions
- Assembly work instructions
- Calibration instructions
- Calibration scripts
- Acceptance criteria
- Lamination instructions
- Secondary-calibration procedure
- QA validation records
- Inventory deductions
- Finished-product inventory update
- Ownership and handoff requirements
- Shipment or fulfilment requirements

Suggested heading:

> **A roadmap only works when another person can execute it**

Suggested copy:

> Each step needed more than a status label. It needed the correct part references, work instructions, calibration procedure, quality record, inventory transaction, and ownership information so that the process could be repeated across teams and continued by future employees.

#### Visual concept

Show a central Dev System configuration card surrounded by its supporting documentation — assembly work instructions and Arena part references feeding in, calibration scripts alongside, inventory/QA/handoff records underneath. This should look like a connected operating-information system, not a decorative document gallery.

## 24.5 Additional product engineering responsibilities

Add a distinct section after the central roadmap story.

Suggested heading:

> **Additional product engineering responsibilities**

The section should make clear that these responsibilities supported the wider Dev System work but were not all separate case studies.

### Sensor calibration across configurations

Suggested copy:

> I calibrated sensors across multiple Dev System configurations, applying the appropriate setup and validation process for each unit. This gave me direct exposure to how configuration differences affected assembly, calibration, quality checks, and the production roadmap.

Show only verified details about: number or range of configurations, calibration equipment, acceptance criteria, failure analysis, records created. Do not imply ownership of the underlying calibration science unless confirmed.

### Calibration scripts

Suggested copy:

> I worked with calibration scripts used to validate sensor performance and support repeatable testing across configurations. The final case study should distinguish whether I ran, modified, debugged, parameterized, or authored each script, explain how the output was checked, and show how the scripts supported the production and QA process.

Claude must distinguish among: running existing scripts, updating script parameters, debugging, writing new scripts, automating outputs, interpreting calibration results. Do not collapse these into "built calibration automation" unless accurate.

### Dev System assembly work instructions

Suggested copy:

> I created and maintained assembly work-instruction documentation for Dev Systems, connecting the required parts, Arena references, assembly sequence, validation steps, and handoff expectations needed to reproduce a configuration consistently.

Possible artifacts: redacted work-instruction structure, reconstructed instruction-page layout, assembly step hierarchy, part-to-step relationship diagram, revision or approval flow.

### Web design input

Suggested copy:

> I also contributed product and design input to ForceN's web experience, helping communicate the product more clearly from the perspective of someone working closely with the Dev Systems, configurations, and supporting technical material.

Claude must confirm: which page or feature received input, whether the work involved UX feedback/content hierarchy/product messaging/visual design/implementation, what recommendation was made, whether it was adopted. Keep this responsibility proportionate — it should not distract from the operating-roadmap story unless artifacts and ownership justify deeper coverage.

## 24.6 Suggested design for the additional-responsibilities section

Use a quieter treatment than the primary roadmap.

Recommended layout: four-column row on large screens, two-by-two grid on tablets, single-column stack on mobile.

Each module should contain: responsibility title, one concise explanation, tool or method, optional artifact or diagram, scope note, evidence status where required.

Do not use generic icons as the only evidence. Prefer a calibration output excerpt, simplified script logic, redacted assembly instruction, or small web-design annotation. If artifacts cannot be shown, use restrained reconstructed diagrams with clear captions.

## 24.7 Revised results section

Preserve the existing dark visual treatment, but change the copy and evidence model.

### Remove

> Four numbers, each tied to a specific change above — not a repeat of the workflow counts, the actual before/after.

This sounds defensive and should not appear publicly.

### Recommended introduction

> The roadmap connected product configuration, component availability, production, quality, and finished inventory into one repeatable operating model.

### Qualitative outcomes to include

Use only those supported by the source material:

- Established a ground-up roadmap from component planning through finished inventory and shipment.
- Supported the shift toward producing standard Dev Systems ahead of incoming orders.
- Reduced the risk of assembly delays caused by missing components.
- Connected component deductions to minimum-stock replenishment logic.
- Defined a repeatable rework route for failed calibration.
- Clarified when a unit was ready to enter finished-product inventory.
- Created configuration-specific work instructions and process documentation.
- Improved continuity across engineering, operations, inventory, and future employees.
- Supported calibration and validation across Dev System configurations.

### Metric treatment

The existing figures may remain only after confirming baseline, measurement period, exact definition, source, and whether the figure was measured, estimated, or taken from the resume.

Potential figures currently shown: 35% turnaround-time reduction, 25% assembly-error reduction, 30% on-time-delivery improvement, 30% delivery-efficiency improvement, 14+ units, 6+ stakeholders.

Until verified: remove the metrics from the workflow diagram; either omit them from the public page or keep them disabled in draft data; do not map one metric to one stage merely because it is visually convenient; use qualitative results rather than unsupported numerical precision.

## 24.8 Revised reflection section

Replace the current tracking-centred cards with the following.

### Product strategy depends on the operating system behind it

> Making Dev Systems the standard offering was not only a product-positioning decision. It required an operating model capable of maintaining parts, producing repeatable configurations, verifying quality, and replenishing finished inventory ahead of demand.

### Inventory problems begin before the shelf is empty

> The most useful inventory check was not a periodic count after a shortage appeared. It was connecting every component deduction to a minimum threshold so replenishment could begin before the next build was blocked.

### Quality requires explicit feedback loops

> Calibration was not simply a final checkpoint. A failed result needed a defined route back to assembly, followed by correction and re-testing, so exceptions remained part of the planned workflow.

### A process is only scalable when someone new can execute it

> Arena references, assembly instructions, calibration procedures, scripts, inventory rules, and ownership records turned the roadmap from a diagram into a system that could be followed and improved by future employees.

### Confidentiality treatment

Do not use "This is a reconstructed version" as a reflection card. Place one small italic note beneath the primary workflow visual instead:

> Internal trackers, calibration materials, scripts, and company-specific documentation are omitted for confidentiality. The visuals on this page reconstruct the same process logic in a public-safe form.

## 24.9 Tool and AI treatment

The tools section must explain how each tool contributed:

- **Arena** — how part numbers or configuration records were referenced, how that supported repeatable assembly/procurement, whether Kamal entered/reviewed/relied on the records.
- **Confluence** — what process documentation or work instructions were created, who needed it, how it supported continuity/handoffs.
- **Onshape** — how product assemblies or technical models informed the work, whether reviewed/annotated/modified. Do not imply mechanical design ownership unless confirmed.
- **Calibration scripts / Python** — whether scripts were run, modified, debugged, or authored; input/output handled; how results were verified; how script use fit into QA and the roadmap.
- **AI-assisted workflow** — include only when the exact use is known, following the "confirmed tool + context supplied + output checked" structure already established in Section 9.12. Do not use vague phrases such as "AI agents," "leveraged AI," or "improved efficiency with AI" without a concrete workflow and verification method.

## 24.10 Claude Code implementation tasks

1. **Audit the current ForceN page** — identify existing components, route, text content, metric sources, reconstructed visuals, mobile behavior, and statements unsupported by source notes. Do not modify the project card.
2. **Replace the content model** — update the ForceN case-study data to reflect `projectType: "systems-operations"`, the inventory-backed central story, the main contribution (end-to-end operating roadmap), and supporting contributions (sensor calibration, calibration scripts, assembly work instructions, web design input).
3. **Rebuild the system diagram** — as reusable diagram data (nodes/edges), not hard-coded visual boxes. Required nodes: configuration definition, parts/Arena references, component inventory check, procurement, assembly, primary calibration, lamination, secondary calibration, QA validation, finished inventory, order fulfilment, shipment, finished-inventory review. Required loops: component inventory below threshold → procurement; primary calibration failure → assembly; finished inventory below target → production planning.
4. **Add a documentation-system visual** — a component showing how one configuration connects to parts, Arena numbers, assembly instructions, calibration instructions, scripts, QA records, inventory rules, and ownership/handoff requirements.
5. **Add supporting-responsibility modules** — sensor calibration, calibration scripts, assembly work instructions, web design input, each with description/tools/artifact/scope note/evidence status.
6. **Rewrite the results section** — preserve the dark editorial style, replace defensive copy, prioritize verified outcomes, hide unverified metric cards through data flags (`status`, `public` fields — only render `public: true`).
7. **Rewrite reflection** — use the four lessons in §24.8. Do not use confidentiality as a reflection lesson.
8. **Validate terminology** — use "Dev Systems," "Dev System configuration," "component inventory," "work in progress," "finished-product inventory," "production roadmap," "assembly," "primary/secondary calibration," "lamination," "quality validation," "fulfilment," "shipment" consistently. Avoid "Dev System transfer," "tracker" as the main project, or treating fulfilment/shipment as interchangeable.
9. **Test responsive behavior** — desktop preserves editorial split layouts/bordered panels with a legible workflow diagram; mobile stacks workflow stages vertically, preserves branches/loops, keeps text ≥16px, keeps diagram content available to screen readers, stacks supporting-responsibility modules one per row.
10. **Run QA** against the checklist in §20, plus: component inventory and finished inventory are visibly distinct; calibration failure visibly returns to assembly; lamination occurs after successful primary calibration; secondary calibration occurs after lamination; documentation is shown as part of the operating system; additional responsibilities present but don't overpower the main story; no unverified metrics appear publicly.

## 24.11 Internal `NEEDS_INPUT` list

Before publishing the final ForceN details page, confirm:

1. Exact dates and public title
2. Exact definition of "Dev Systems"
3. Which standard configurations were included
4. Whether the goal was minimum finished inventory, forecast inventory, or another replenishment model
5. Exact component inventory thresholds and whether they can be described publicly
6. Whether stock checks were fully automated, partially automated, or designed as automation requirements
7. Whether Kamal built the automation, specified it, or supported it
8. Exact role in procurement logic
9. Exact role in assembly
10. Exact role in primary and secondary calibration
11. Exact role with calibration scripts
12. Whether scripts were run, modified, debugged, parameterized, or created
13. Exact role in lamination
14. Exact Arena usage
15. Exact Confluence documentation created
16. Exact Onshape usage
17. Exact web-design input and whether it was adopted
18. Number of configurations calibrated
19. Number of units produced or supported
20. Number and type of stakeholders
21. Definitions and sources for all percentages
22. Which artifacts can be shown, redacted, or reconstructed
23. Whether the process was implemented fully, partially, piloted, or documented as a roadmap
24. What was handed off to future employees
25. What continued after Kamal's co-op

Do not expose this list publicly.

---

# 25. Amendments (added 2026-07-28, on top of the original draft)

## 25.1 Diagrams and illustrations are a priority, not a fallback

The original draft (Section 10, "Reconstructed visuals") already allows reconstructed diagrams when no real artifacts exist. This amendment makes it a **default preference, not a last resort**: for every process/systems-flavored case study (ForceN, Informatica, and any operational chapters inside otherwise visual case studies), actively build a diagram or illustration of the workflow, decision, or system being described — even where photos exist, a clean diagram is often the *clearer* artifact for explaining a process than a screenshot is. Treat "no real screenshots available" as permission to invest more in diagrams, not as a reason to fall back to plain text.

Every such diagram still follows the existing rules: captioned as reconstructed, built only from confirmed facts, no invented specifics, restrained visual style consistent with the rest of the portfolio (no glassmorphism/neon/obvious-AI-generated look, per Section 10's "Image treatment").

## 25.2 Known architecture mismatch — resolved 2026-07-30

This spec's Section 12 (Component System) and Section 13 (Data Architecture) describe a *new* system — MDX case-study files, a `components/case-study/` library of ~18 components, a `data/case-studies.ts` + `data/artifacts.ts` split, `content/_source-notes/`.

The actual current codebase (as of 2026-07-28, after this session's Experience/Work merge and card redesign) already has a working, simpler system that this spec did not have visibility into:
- `lib/content/case-studies.ts` — single `CaseStudy` interface holding all case-study content directly (no MDX layer).
- `lib/content/theme.ts` — per-project visual theme (accent colors, gradients, icon).
- `app/work/[slug]/page.tsx` — the one existing detail-page renderer for all 7 projects.
- `components/CaseStudyCard.tsx`, `components/ProjectIcon.tsx`, `components/Tag.tsx` — the just-built card system (explicitly out of scope for this spec per Section 18, and should stay untouched).

**Resolved 2026-07-30: extend, don't replace.** The existing `CaseStudy` interface and `app/work/[slug]/page.tsx` renderer were extended with new optional fields (`caseStudyType`, `tier`, `snapshot`, `constraints`, `decisions`, `figures`, `reflection`) and matching conditional sections, following the same pattern already used for `team`/`note`/`mockups`. No MDX layer, no `data/artifacts.ts` split, no `content/_source-notes/` directory. Diagrams are hand-built React/SVG components (see `components/case-study/Diagram.tsx`), not images or a separate content format.

## 25.3 Site-wide visual amendments (added 2026-07-31, from ForceN layout review)

These apply to every case-study details page, not just ForceN — they came out of iterating the ForceN layout preview but are meant as standing direction.

**Section dividers ("divots").** Between major sections, use a hand-drawn-feeling divider line (a gently irregular horizontal rule, not a straight `<hr>`) rather than plain whitespace or a dashed rule alone. Vary the divot's shape/curve per section break rather than repeating the identical line every time — the point is a small bit of organic, human flair between chapters, not a repeating decorative element. Keep it restrained: a single thin stroke in the page's ink or accent color, not a heavy illustration.

**Background continuity with `/` and `/work`.** The soft multi-stop gradient bloom already used on the homepage and `/work` index (radial color blooms over a linear base, `background-attachment: fixed`) is the established site-wide background language — detail pages should keep using it rather than reverting to flat cream, but each divot/section transition is a reasonable place to let the bloom shift slightly (a different bloom emphasis or intensity per chapter) so long scrolling pages still read as one continuous background, not stacked flat panels.

**Section numbers should read as a real visual element, not a caption.** Chapter numerals ("01", "02"...) were too small relative to the chapter titles next to them — they should be sized and weighted so they act as a genuine visual counterweight to the heading, not a small label easily missed.

**Edge margins.** Keep the reasoning for generous edge whitespace explicit rather than assumed: it exists so the reading column stays a comfortable line length on wide screens, matching the constrained reading columns used elsewhere on the site (e.g. the ~66ch body-text max-width already used in `/work/[slug]`). But that reasoning should be weighed against how wide the actual content column is at common desktop widths — if the margins read as excessive rather than intentional, widen the content column rather than just noting the rationale.

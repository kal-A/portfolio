# Portfolio Work Experience + Global Polish Pass

## Scope

Work on:
1. Shared/global UI
2. Home
3. Work grid
4. ForceN
5. Greenhouse
6. PathPeer
7. Hera Fertility
8. Informatica

Do not redesign RoomEase, Pill Pal, Chronicle, or About in this pass, except where a shared component change naturally affects them.

---

# Working rules

Use the available **UX/UI design** and **frontend design** skills throughout this pass.

Also follow the portfolio's existing:
- design-system guidance
- case-study guidance
- diagram/flowchart guide

Be careful with session limits:
- no subagents
- no new worktrees
- work sequentially
- do not reread unrelated folders
- inspect only the files needed for the page being edited
- prefer shared fixes when one change solves the same issue across pages
- do not repeatedly run full QA during implementation
- use checkpoint commits
- run one integrated QA pass at the end
- do not push

---

# Visual review screenshots

Review screenshots are here:

`D:\Full time Grind\Portfolio\review-reference\work-experience-pass\`

They supplement these instructions. A screenshot is **not required for every correction**.

Rules:
- If a screenshot is named below, use it.
- If no screenshot is named, inspect the named page/section directly.
- Do not search for screenshots that are not listed.
- Green arrows/boxes show the area, spacing, crop, width, or alignment being criticized.
- Screenshots show the current problem, not necessarily the exact target design.
- Do not use review screenshots as production assets.
- Do not commit them.

Current review files:

1. `01-work-page-background-transition.png`
2. `02-pillpal-work-grid-hero-placeholder.png`
3. `03-forcen-toc-hover-hierarchy.png`
4. `04-forcen-section-02-heading-composition.png`
5. `05-forcen-responsibilities-numbering-legibility.png`
6. `06-forcen-hero-logo-treatment.png`
7. `07-greenhouse-process-flow-layout.png`
8. `08-greenhouse-internal-design-background.png`
9. `09-pathpeer-summary-cards-spacing.png`
10. `10-pathpeer-section-01-storytelling-layout.png`
11. `11-pathpeer-section-02-product-flow.png`
12. `12-hera-payment-plan-full-reconstruction.png`
13. `13-hera-table-hover-hierarchy.png`
14. `14-hera-closing-note-width.png`
15. `15-informatica-table-and-copy-width.png`
16. `16-home-hero-art-size-reference.png`
17. `17-work-grid-roomease-forcen-media.png`

Use original logos, sketches, wireframes, screenshots, and design artifacts from the real source folders under:

`D:\Full time Grind\work exp\`

and, where needed:

`D:\Full time Grind\projects\`

Do not replace real source assets with review screenshots.

---

# Global design fixes

## Section numbering

Make section numbering consistent across all case studies.

Use one shared system for:
- size
- weight
- spacing
- alignment
- opacity
- responsive behavior

Large pale numbers are fine, but they must remain legible. Increase contrast or add a subtle outline/shadow if needed.

Do not allow one page to use a tiny section number while another uses a large one.

---

## Alignment and layout

Alignment is a priority.

- Comparable cards should align at the top and bottom.
- Use even rows/columns where possible.
- If four equal items fit naturally as 2x2, prefer 2x2 over 3+1.
- Do not let cards or paragraphs stop at arbitrary widths.
- Avoid accidental-looking whitespace.
- Use the available width instead of compressing important content.
- Main text should not be unnecessarily small or thin.

---

## Hover hierarchy

For nested hover states:

1. base surface
2. light container hover
3. darker exact row/item hover
4. strongest selected/current state

The item directly under the pointer must be the focal point.

Apply this to:
- table of contents
- tables
- nested cards
- any hoverable element inside another hoverable element

Maintain text/icon contrast in every state.

---

## Tables

- Highlight one row at a time.
- Keep the overall table hover subtle.
- Make the exact hovered row clearly darker/more distinct.
- Keep all text and badges legible.
- Preserve clean row/column alignment.

---

## Flowcharts and diagrams

Follow the diagram guide.

Every flow should have:
- aligned nodes
- logical rows
- clear point-to-point arrows
- visible arrowheads
- no arbitrary wrapping
- no isolated nodes dropped to a new line without reason
- enough spacing between nodes
- larger text/nodes where current versions are too small
- clear active/current state
- responsive stacking only when needed

Use available horizontal space on desktop.

---

## Text and content blocks

For important cards and outcome blocks:
- use stronger hierarchy
- bold metrics and key results
- use icons/checks where useful
- avoid bland walls of equal-weight text
- make important results easy to scan

Free-standing paragraphs should align to the surrounding section width instead of ending arbitrarily early.

---

## Reflections

Deepen shallow reflection sections.

Focus on:
- what changed in the user's thinking
- what assumption was challenged
- what tradeoff became clearer
- what would be done differently
- how the work changed product/design/systems thinking

Do not invent events, metrics, or outcomes.

---

## Icons

Use icons where they improve scanning and personality.

Prefer:
1. real logos/assets
2. existing icon library
3. locally available Flaticon-style assets if appropriate

Do not add fragile external dependencies just for icons.

---

# Home

Use:
- `16-home-hero-art-size-reference.png`

Increase the right-side hero art/image footprint.

Goal:
- stronger balance with the left text block
- less dead space
- larger visual presence
- preserve the existing gradient

Do not change the current overall color direction.

---

# Work page + work grid

Use:
- `01-work-page-background-transition.png`
- `02-pillpal-work-grid-hero-placeholder.png`
- `17-work-grid-roomease-forcen-media.png`

## Header-to-grid transition

The transition between the hero background and work-grid background is too abrupt.

Keep both colors.

Add a subtle transition using one of:
- gradient blend
- soft divider
- shallow overlapping shape
- thin accent rule with soft depth

Do not replace either background color.

## Hero media sizing

Increase the image/media area on work cards. Use more of the available card width/height.

### RoomEase
- Correct date to **Spring 2025 - Winter 2026**.
- Center the existing image better.
- Keep the important UI visible.

### ForceN
- Center the hardware/product image better.
- Use the real ForceN logo where appropriate.

### Hera
- Use the real Hera logo as the grid hero.
- Give it a suitable Hera-colored background.
- Use the original asset from the Hera work folder.

### Informatica
- Use the real Informatica Security and Privacy logo as the grid hero.
- Give it a suitable light-blue/red/off-white background.
- Use the original asset from the Informatica source material.

### Pill Pal
- Replace the current generic/paper-prototype treatment.
- Prefer a stronger Figma screen, iPad-style sketch, or interface/wireframe artifact already present in the Pill Pal source material.

---

# ForceN

Use:
- `03-forcen-toc-hover-hierarchy.png`
- `04-forcen-section-02-heading-composition.png`
- `05-forcen-responsibilities-numbering-legibility.png`
- `06-forcen-hero-logo-treatment.png`

## Table of contents
Apply the global hover hierarchy:
- light container hover
- darker exact row hover
- strongest selected state

## Process/system diagrams
Current elements are too small.

Increase:
- node size
- label size/weight
- connector weight
- spacing
- detail-panel size where needed

Use the available space.

## Section 02
Fix the composition.

The section number, heading, and supporting copy should feel intentionally related.

Remove the accidental empty-space feeling.

## Numbering
Use the shared numbering system.

## Logo
Use the real ForceN logo instead of the generic top icon where appropriate.

## Reflection
Deepen the reflection around:
- systems thinking across the production chain
- inventory readiness vs custom builds
- failed calibration as part of the operating model
- traceability
- handoffs
- learning unfamiliar mechanical/hardware context
- documentation continuity
- connecting product, operations, supply chain, assembly, calibration, scripts, and fulfillment

---

# Greenhouse

Use:
- `07-greenhouse-process-flow-layout.png`
- `08-greenhouse-internal-design-background.png`

## Process flow
Fix the wrapping.

The current newline/drop should not look accidental.

Use:
- logical rows
- clear arrows
- available width
- responsive stacking only when needed

## Design section backgrounds
The white content backgrounds beneath the section headings are too plain.

Use Greenhouse-aligned surfaces such as:
- pale beige
- warm off-white
- very light green

## E-commerce/email colors
Current red/orange treatment does not fit Greenhouse.

Shift these sections toward:
- greens
- warm beige/off-white
- restrained secondary accents

Keep the page visually varied without leaving the Greenhouse palette.

---

# PathPeer

Use:
- `09-pathpeer-summary-cards-spacing.png`
- `10-pathpeer-section-01-storytelling-layout.png`
- `11-pathpeer-section-02-product-flow.png`

## Role context
Keep accurate:

**Kamal was one of two developers/designers on PathPeer.**

Development used **Bubble.io**.

## Hero/summary spacing
Reduce excessive vertical spacing between:
- hero
- summary cards
- Section 01

## Section 01
Current layout is too plain.

Redesign it to communicate:
1. observed behavior
2. friction
3. evidence source
4. hypothesis
5. product response

Use stronger hierarchy and visual storytelling. Do not simply restyle two text boxes.

## Section 02
Improve the product reasoning flow:

**Behavior pattern -> Product problem -> Feature definition -> Delivery plan**

Improve:
- grouping
- arrows
- spacing
- active-state emphasis
- connection to the detail/synopsis panel

## Numbering and typography
Use the shared numbering system across all sections.

Do not use small/thin primary text when there is room for stronger typography.

## Expand the work shown

Include the broader grounded PathPeer work from the older resume and existing source material:

### Student Profile Timeline
- designed/developed a Student Profile Timeline page
- Figma + Bubble.io

### Hotjar
- reviewed **hundreds of Hotjar session recordings**
- connect findings to search, discovery, and shortlisting friction

### Product work
Include:
- mentor search/result improvements
- mentor discovery tags/taxonomy
- shortlisting improvements
- homepage flows for newly added mentors by career path
- company-based mentor discovery
- admin dashboard expansion
- mentor-search filtering/result presentation

## Metrics

Use the older-resume metrics where supported:

- **20% increase in user engagement**
- **25% decrease in bounce rate**
- **30% increase in usability / overall efficiency** for the expanded admin dashboard
- **50% improvement in search functionality** for optimized mentor-search filtering

Keep these separate from the later/platform-level figures:

- **50% increase in user engagement**
- **40% reduction in inactive-user drop-off**

Clearly label the scope of each metric.

Do not merge the two groups.

## Section 05 - Outcomes
Improve the section even though there is no dedicated review screenshot.

It currently underrepresents the work.

Show:
- broader product impact
- feature-specific metrics
- concrete product changes
- no-code validation value
- behavioral research value

Use a balanced metric grid plus concise outcome/decision blocks.

---

# Hera Fertility

Use:
- `12-hera-payment-plan-full-reconstruction.png`
- `13-hera-table-hover-hierarchy.png`
- `14-hera-closing-note-width.png`

## Payment-plan reconstruction
Use the real Hera artifacts under the Hera work folder.

Use the fuller payment-plan source image/sketch, not the partial image currently shown.

The reconstruction should show the full structure present in the source, including where supported:
1. treatment selection
2. concise treatment explanation
3. treatment details/basics
4. payment-plan comparison
5. price/term/what-is-included structure
6. CTA/next step
7. other steps present in the original flow

Keep it clearly labeled as reconstructed.

Do not invent unsupported prices or fields.

## Analytics Planning
Fix the flowchart even though there is no dedicated review screenshot.

The current layout looks unintentionally arranged.

Use:
- aligned stages
- horizontal space
- clean arrows
- no arbitrary wrapping
- clear current/selected stage
- detail panel visually tied to the flow

## Table hover
Apply the global table hierarchy:
- light table/background hover
- darker exact row hover
- strong legibility

## Closing note
The confidentiality/source note currently stops too early.

Align it with the width of the section/box above or intentionally center it within that width.

Do not leave it arbitrarily truncated.

---

# Informatica

Use:
- `15-informatica-table-and-copy-width.png`

## Table hover
Keep the existing table design but improve contrast:
- light overall hover
- darker exact row hover
- readable text/badges

## Text width
Free-standing paragraphs should not stop arbitrarily early.

Align them to the section grid/table width or another deliberate content width.

## Numbering
Use the shared numbering system.

## Automating Content Work
Fix this flow even though there is no dedicated review screenshot.

Use:
- logical rows
- aligned nodes
- available horizontal space
- clear connectors
- no arbitrary wrapping
- strong active/current state
- responsive stacking only when needed

---

# Content guardrails

- No em dashes in public copy.
- Do not invent metrics.
- Do not invent screenshots.
- Do not imply reconstructed work shipped unless the source says it shipped.
- Preserve reconstructed labels.
- Preserve confidentiality/source notes, but present them cleanly.
- Do not overclaim individual ownership where work was collaborative.
- Keep PathPeer's "one of two developers/designers" wording accurate.

---

# Execution order

## Pass 1 - shared system
Fix:
- numbering
- alignment/grid consistency
- hover hierarchy
- table hover
- diagram/flow primitives
- typography/legibility
- icon treatment
- text-width rules
- media sizing/cropping
- work-page transition

Commit.

## Pass 2 - Home + Work grid
Fix:
- Home hero art size
- work-page transition
- RoomEase date/centering
- ForceN image/logo
- Hera logo hero
- Informatica logo hero
- Pill Pal hero
- grid media sizing

Commit.

## Pass 3 - work experiences
In this order:
1. ForceN
2. Greenhouse
3. PathPeer
4. Hera
5. Informatica

Commit.

## Pass 4 - final QA

Run once:
- typecheck
- lint
- production build
- browser QA at 1440 / 768 / 390

Check:
- console errors
- horizontal overflow
- broken media
- responsive behavior
- numbering consistency
- alignment
- hover hierarchy
- table row hover
- keyboard focus
- diagram legibility
- Home/Work media
- all page-specific fixes above

If QA finds a problem, make the smallest targeted fix and recheck only that area.

Do not push.

---

# Final report

At completion report only:

1. shared/global changes
2. Home/Work changes
3. changes by work experience
4. metric/content corrections
5. QA result
6. anything requiring user judgment
7. commit hashes

Then stop.

# Portfolio Layout, Alignment & Legibility Finish Pass

## Purpose

This is a **strict visual-composition pass**. Do not treat these rules as optional polish.

The recurring problem is simple: important content is often compressed into part of the available width while large areas are left empty, or related elements do not share clear alignment lines. That makes sections look unfinished even when the content is correct.

Apply these rules across the **entire portfolio**, including shared components, work experiences, and project case studies.

Use the available **UX/UI design** and **frontend design** skills. Follow the existing portfolio design and diagram guides.

Do not rewrite correct content just to make a visual fix.

---

# 1. NON-NEGOTIABLE GLOBAL RULES

## A. Every section must have deliberate geometry

For every section, identify:
- the outer content container
- the main alignment grid
- the left and right boundaries
- the vertical alignment lines shared by related elements
- the intended relationship between text, cards, diagrams, media, and side panels

Nothing should look like it stopped halfway because of an arbitrary `max-width`, `col-span`, fixed width, or leftover grid column.

### Forbidden
- a paragraph occupying roughly half the section with a large blank area beside it for no reason
- a card or callout ending far before the main content boundary without an intentional adjacent element
- one item in a row starting or ending on a different alignment line from comparable items
- a side/detail panel hanging lower or higher than the structure it visually belongs to without a clear reason
- one diagram node dropping onto a new line simply because the layout was not tuned
- captions, confidentiality notes, or “what I’d improve” blocks using only part of a section when they are meant to conclude the whole section

### Required
If a section has unused horizontal space, do one of these:
1. widen the content to a readable extent,
2. redistribute the grid,
3. enlarge the visual/diagram/cards,
4. pair the text with an intentional secondary element,
5. center the composition within the full section.

Do **not** leave accidental dead space.

---

## B. Fill the section without making prose unreadably wide

“Use the available width” does **not** mean stretching long prose across the entire monitor.

For long prose:
- keep a readable line length,
- but place it inside a composition that uses the whole section,
- or widen it until it visually aligns with the major grid around it.

A lone text block should not sit at 50-60% width with an empty 40-50% beside it unless that empty area has a clear visual purpose.

Practical rule:
- primary prose: usually about 65-85 characters per line
- if the section is wider, use columns, a side panel, metric/card, media, or a centered composition rather than leaving blank space

---

## C. Alignment is more important than decorative flair

Related elements must share visible alignment lines.

Audit:
- left edges
- right edges
- card tops
- card bottoms
- section headings
- section numbers
- diagram rows
- table boundaries
- media boundaries
- captions
- notes
- footer/closing text

Comparable cards in one group should normally have equal widths and aligned tops/bottoms.

If four equal cards can be a balanced 2x2, use 2x2 rather than 3+1 unless there is a deliberate reason.

---

## D. Legibility is mandatory

No important information may rely on tiny, thin, pale text.

### Minimum hierarchy
- primary body copy: visually comfortable at desktop; do not shrink it to fit
- mobile body copy: never below a normal readable body size
- labels/captions may be smaller, but still clearly readable
- diagram labels must be readable without zooming
- section numbers may be pale, but must remain visible against the background
- arrows and connectors must be thick enough to read as structure, not hairlines

Use `clamp()` or responsive type where useful.

Do not solve overflow by reducing font size.

Solve the layout.

---

## E. Section numbering must be one system

Across every case study:
- same visual scale
- same weight
- same relationship to the heading
- same spacing
- same opacity/contrast logic
- same responsive behavior

Large pale numbers are acceptable, but they must be legible.

Do not allow some sections to use tiny eyebrow-style numbers while others use large chapter numbers unless they are genuinely different hierarchy levels.

---

## F. Nested hover states need clear hierarchy

For TOCs, tables, lists, or controls where a hover exists inside another hoverable surface:

1. base state
2. light parent/container hover
3. darker exact hovered row/item
4. strongest selected/current state

The exact item under the pointer must be the focal point.

Never let the parent hover make the child state harder to distinguish.

Maintain text/icon contrast in all states.

---

# 2. FLOWCHART / DIAGRAM RULES

These rules are strict.

## Desktop
Use horizontal space before wrapping.

A flow should not become:

`A -> B -> C`
then
`D -> E -> F`

unless that row break represents an actual stage boundary.

If it is one continuous flow, keep it visually continuous.

## Nodes
- large enough to read comfortably
- consistent padding
- consistent corner/radius treatment
- clear relationship between node size and text hierarchy
- no node should look like a floating label

## Connectors
- point directly from source to destination
- visible arrowheads
- consistent line weight
- no labels sitting on top of arrow lines
- no arrows colliding with cards
- no branch labels overlapping nodes or connectors
- feedback loops must clearly return to the correct earlier node

## Detail/synopsis panels
The detail panel must visually belong to the flow:
- align its top/bottom to the flow where practical
- do not let it arbitrarily extend far below the flow
- use available width
- ensure its text fits without clipping

If a line or section divider passes behind/through a detail card, fix the composition.

---

# 3. CARDS, METRICS, RESULTS & REFLECTIONS

## Metric blocks
Metrics should be prominent:
- large metric
- concise descriptor
- scope clearly stated
- balanced grid
- equal card heights where comparable

Do not leave a results introduction at half-width with a blank right side.

## Checklist/result rows
Use the full intended content width.

Rows should:
- align
- have consistent padding
- use icons/checks consistently
- emphasize the result, not decoration

## Reflection sections
Reflections must feel designed, not appended.

Use:
- balanced 2x2 or other intentional grids
- stronger hierarchy
- consistent card heights where reasonable
- enough breathing room
- a full-width or intentionally centered closing note

Closing confidentiality/source notes should align to the major section width. Do not leave them ending at 50-70% width with a blank remainder unless there is a deliberate adjacent element.

---

# 4. TARGETED CORRECTIONS FROM THE CURRENT REVIEW

These are examples of the global problem and must be fixed now.

## Hera Fertility

### Finding care nearby
The reconstructed concept + source sketch composition is generally good, but the “Original layout iterations” area leaves a large empty lower area in the left column.

Fix the layout so the four design iterations use the available canvas intentionally:
- rebalance the two columns,
- crop/size the source images appropriately,
- avoid a large empty block beneath Design 2,
- make the four iterations read as one coherent comparison.

Do not distort the artifacts.

### Analytics planning
The current flow + detail panel does not use the section cleanly.

Fix:
- use the full available width,
- align the detail panel with the flow,
- prevent the detail card from extending awkwardly below the main flow,
- remove accidental blank space,
- keep all 7 stages legible and clearly connected.

### Outcomes
The intro paragraph currently occupies only part of the width while the right side is empty.

Fix the composition:
- widen/center the intro to align with the metric grid,
- or pair it with an intentional supporting element,
- do not leave a blank right third.

Keep the metric cards balanced.

### Hero / table of contents
The left content and right TOC must share a deliberate bottom/alignment relationship.

Avoid a large unused band below the hero copy/tags.

Make the section transition feel composed, not like two independent columns ending at unrelated positions.

---

## RoomEase

### Section 04 intro
The intro copy uses only part of the width.

Use the section width intentionally. Either:
- widen the readable copy and align it with the diagram,
- or create a balanced two-part composition.

Do not leave the right side blank.

### Allocation flowchart
Fix connector/label collisions.

Specifically ensure:
- “Accepts”, “Back”, “Clear”, “Issues found”, and any similar edge labels do not overlap arrows or nodes,
- manual override/re-score loop clearly returns to scoring,
- request-changes loop clearly returns to the correct stage,
- arrowheads and labels are readable.

### Booking form video
The large video block should fill the content width cleanly and align with the diagram/card boundaries above.

Do not leave narrow arbitrary side gaps.

### Role videos
The three role cards may remain a three-column row because there are exactly three roles.

Ensure:
- equal widths,
- equal top/bottom alignment,
- large enough video area to interact with,
- consistent “What to notice” placement,
- no cramped text.

### Section 06 Technical feasibility
The intro paragraph is too narrow relative to the three cards.

Widen it or compose it with the section so the blank right side is not accidental.

The three cards should align and use the full row.

### Section 07 Validation and outcomes
The section currently uses only the left portion while a large right side is empty.

This is not acceptable.

Recompose it:
- use a wider video block,
- center it,
- or use a two-column layout with a purposeful supporting results/context element.

The section title, intro, video, and later metrics must feel like one full-width composition.

### Reflection
The “What I’d improve next” block and bottom team/source note currently end too early.

Make them:
- full-width within the reflection section,
- or intentionally centered at a clear width aligned to the cards above.

Do not leave a large empty right side.

---

## Informatica

### Hero
The hero/TOC layout should use the full composition cleanly.

Keep left narrative and right TOC aligned. Do not leave an arbitrary empty band between the hero content and the summary cards.

### Research flow
The flow + detail panel currently leaves too much unused space and the card/section divider relationship looks accidental.

Fix:
- use the horizontal space,
- align the flow rows,
- align the detail card,
- ensure the detail card does not collide with or cross a divider,
- keep the recommendation/requirement/plan continuation visually connected.

### Content automation flow
Apply the same correction:
- full use of width,
- aligned nodes,
- aligned detail panel,
- no card/divider collision,
- no accidental dead area.

### Outcomes
The outcomes intro is too narrow.

Align it to the metric grid/full section composition.

Keep the three metric cards equal and readable.

---

## ForceN

### Section 02
The heading/subheading composition still leaves unused space and looks detached.

Fix it so:
- the section number and heading form one left chapter block,
- the supporting statement uses the right area intentionally,
- the cards below align to the same overall grid,
- no large empty strip exists without purpose.

### Results
The intro sentence is too narrow relative to the metrics.

Align it to the results grid or intentionally center/widen it.

### Reflection
The bottom confidentiality/source note is too narrow.

Align it to the reflection grid width or center it deliberately.

Do not leave a large blank right side.

---

# 5. ENTIRE-SITE AUDIT RULE

Do not limit these fixes to the examples above.

Search the portfolio for the same structural problems:
- `max-w-*` applied to lone copy blocks
- `w-1/2`, `w-2/3`, `col-span-*` creating dead space
- fixed widths that stop content arbitrarily
- grids with unbalanced last rows
- media/cards not filling their intended cell
- section dividers crossing cards
- detail panels not aligned to their parent diagram
- captions/notes that stop far before surrounding content
- tiny labels used to make a cramped layout fit

Fix the shared component or shared style when possible instead of patching every page separately.

Do not flatten every page into the same layout. Preserve each case study's visual identity while enforcing the same geometry and legibility discipline.

---

# 6. SESSION-LIMIT EXECUTION PLAN

Do **not** restart completed work.

First:
1. `git status --short`
2. `git diff --stat`
3. preserve all current work
4. do not reset or discard anything

Then work in this order:

### Pass A - shared geometry
Fix shared:
- section widths
- numbering
- diagram layout primitives
- detail-panel behavior
- result/reflection closing widths
- nested hover hierarchy
- type/legibility

Commit.

### Pass B - targeted pages
Only inspect/edit:
1. Hera
2. RoomEase
3. Informatica
4. ForceN

Commit.

### Pass C - lightweight whole-site sweep
Do a quick code-level scan for the same anti-patterns across remaining pages.

Do not reread source documents.
Do not open unrelated project folders.
Do not rewrite content.

Fix only obvious layout/legibility violations.

Commit.

### QA
Run once at the end:
- typecheck
- lint
- production build

Browser QA:
- 1440px: Home, Work, all changed case studies
- 768px and 390px: shared components + changed sections only

Check:
- no horizontal overflow
- no clipped text
- no tiny labels
- no accidental half-width copy
- no large unexplained dead space
- no broken flowchart connectors
- no divider/card collisions
- equal/aligned comparable cards
- readable section numbering
- media fills intended containers
- hover hierarchy remains legible

Do not push.

---

# 7. DEFINITION OF DONE

A section is **not done** merely because it compiles.

It is done only when:
- the content clearly fills or intentionally composes the available space,
- related elements align,
- the hierarchy is readable,
- the page looks deliberately designed at first glance,
- there are no obvious “I could not get the layout to fit so I left it” moments.

If a recruiter can point to a large empty region and ask “why is nothing here?”, the layout is not done.

If text or diagram labels require zooming, the layout is not done.

If a row/card/detail panel appears to end at an arbitrary coordinate unrelated to the surrounding grid, the layout is not done.

Use visual judgment. Do not merely satisfy CSS syntax.

---

# Final report

Report only:
1. shared geometry fixes
2. targeted page fixes
3. whole-site violations found/fixed
4. QA result
5. anything still requiring user judgment
6. commit hashes

Then stop.

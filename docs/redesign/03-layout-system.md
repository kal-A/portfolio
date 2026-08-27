# Layout System

**Depends on:** [02 Design Language](./02-design-language.md)  
**Purpose:** Shared responsive structure for the homepage, index, case studies, diagrams, and components

## Layout model

The portfolio uses a page field, an outer container, a responsive grid, and a small set of readable content widths. Layout should feel composed and architectural, not centered by default.

## Breakpoints

Breakpoints describe layout changes, not specific devices.

| Name | Range | Grid | Outer gutter |
|---|---:|---:|---:|
| Compact | `< 640px` | 4 columns | `20–24px` |
| Medium | `640–1023px` | 8 columns | `40–48px` |
| Large | `1024–1439px` | 12 columns | `56–72px` |
| Wide | `≥ 1440px` | 12 columns | `80px` |

Use fluid behavior between breakpoints. Do not add a breakpoint to correct a single component unless its content genuinely changes mode.

## Containers

| Container | Max width | Use |
|---|---:|---|
| Page | `1600px` | Navigation, hero stage, full compositions |
| Standard | `1280px` | Most sections and project layouts |
| Reading | `760px` | Long-form prose |
| Narrow | `600px` | Intros, captions, focused statements |
| Full bleed | viewport | Rare atmospheric/media moments only |

Containers use logical inline padding and remain centered. Content may align asymmetrically inside them.

## Grid

- Column gap: `24px` compact, `28px` medium, `32px` large/wide.
- Major headings may span 7–9 of 12 columns.
- Body copy typically spans 5–7 columns.
- A text–media pair uses 4/8, 5/7, 6/6, 7/5, or 8/4 spans based on evidence, never arbitrary percentages.
- Align section labels, headings, media edges, captions, and diagram nodes to grid lines.
- Optical alignment is allowed for serif type and circular marks but should not become a new grid value.

## Vertical rhythm

Each page uses four scales:

1. **Inline:** `8–16px` within labels and controls.
2. **Component:** `24–48px` within a narrative unit.
3. **Section:** `72–112px` between related sections.
4. **Chapter:** `112–160px` between major changes in story.

Keep a paragraph close to the image or diagram it explains. Place whitespace after the complete pair.

## Global page anatomy

1. Navigation.
2. Page introduction or hero.
3. Evidence-led main content.
4. Next action or related project.
5. Minimal footer.

Skip repetitive title bands or decorative separators that do not improve orientation.

## Navigation

- Navigation sits on the page field, not inside the hero image.
- Desktop: identity at left; Work, About, Resume, and contact action at right.
- Compact: identity plus one menu control; the opened menu traps focus, closes with Escape, and restores focus.
- Current location is indicated through text and state, not color alone.
- Navigation remains visually quiet and does not become a floating glass card.
- Sticky behavior is allowed after the hero, provided it does not cover anchored headings.

## Homepage

Recommended structure:

1. Hero stage.
2. Selected-work index with 3–5 strongest projects.
3. Compact practice statement or capabilities evidence.
4. Optional short “currently / previously” context.
5. Contact invitation and footer.

Selected work should read as an editorial index, not a dashboard of equal cards. Each entry includes a project number, title, one-line outcome or problem, role/category, year, and a purposeful visual. The entire row/card is interactive but contains one semantic link.

## Case-study layout

Use three coordinated tracks:

- **Orientation track:** chapter number, section label, optional sticky progress.
- **Narrative track:** headings and readable copy.
- **Evidence track:** screenshots, diagrams, metrics, and captions.

Desktop narrative sections usually alternate text and media, but alternation is a rhythm—not a rule. Keep consecutive evidence on the same side when it improves comparison or reading order.

On compact screens, use semantic order:

1. section claim;
2. explanation;
3. evidence;
4. caption or takeaway.

Never preserve desktop visual alternation by putting evidence before its explanation on mobile.

## Hero stage

- Use real outer margins to create an inset cinematic stage.
- Desktop stage height: `min(820px, calc(100svh - navigation - outer margins))`, with a minimum of `680px`.
- Compact stage: content-led, minimum `620px`; never force exact viewport height when copy would overflow.
- Stage radius: `12–16px`; overflow clipped only for visual layers, never for focus rings or controls.
- Text occupies roughly 5–7 columns; the outline occupies roughly 30% of stage width on large screens.

See [04 Hero System](./04-hero-system.md) for layering and responsive rules.

## Full-bleed media

Use full bleed only when scale is necessary to understand the artifact or create one intentional pacing change. A full-bleed image must still include an accessible caption aligned to the standard container.

## Sticky and pinned behavior

Sticky layouts may be used for:

- a short chapter index;
- a diagram explanation tied to 2–4 states;
- before/after comparison with meaningful progression.

Do not use scroll hijacking. Sticky behavior must release naturally, preserve keyboard reading order, and collapse into a linear sequence on compact screens.

## Responsive rules

- Recompose; do not simply shrink.
- Keep body copy at `16px` or larger.
- Avoid horizontal scrolling except for a clearly labeled comparison/table region with an accessible alternative.
- Crop atmospheric imagery around light and silhouette, not arbitrary center points.
- Replace sticky and hover-dependent interactions with visible linear content.
- Maintain `44px` touch targets and safe areas.
- Test at `320`, `375`, `768`, `1024`, `1440`, and `1920px` widths.

## Implementation requirements

- Create shared `Container`, `Grid`, `Section`, and `Stack` primitives or equivalent utilities.
- Consolidate duplicated page wrappers and case-study templates.
- Use CSS Grid for page composition and Flexbox for one-dimensional control groups.
- Avoid page-specific negative margins and absolute positioning except within bounded visual stages.
- Anchor offsets must account for sticky navigation.
- DOM order follows reading order; CSS controls visual placement.

## Success criteria

- Homepage, index, and case studies align to the same grid.
- Related text and evidence remain visually connected at every width.
- No content is lost, clipped, or hover-only on compact screens.
- A new project page can be assembled from shared primitives without copying another page.
- Layout remains composed at both `320px` and wide desktop widths.

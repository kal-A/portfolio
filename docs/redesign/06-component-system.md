# Component System

**Depends on:** [02 Design Language](./02-design-language.md), [03 Layout System](./03-layout-system.md), [05 Motion System](./05-motion-system.md)  
**Purpose:** Consolidate duplicated UI patterns into a small, reusable vocabulary

## Architecture rules

- Shared components consume semantic tokens and expose purposeful variants.
- Content belongs in data/content files, not duplicated component markup.
- Composition is preferred over a component with dozens of boolean props.
- Page-specific components are allowed only when the pattern is genuinely unique and cannot be expressed through shared primitives.
- One component owns each visual pattern. Duplicate button, page wrapper, card, or case-study implementations are deprecated.

## Foundation primitives

### `Container`

Variants: `page`, `standard`, `reading`, `narrow`, `full`. Handles responsive inline gutters only.

### `Grid`

Responsive 4/8/12-column wrapper with standard gaps. Children declare semantic spans rather than raw widths.

### `Stack`

Vertical rhythm using design tokens. Variants: `compact`, `content`, `section`, `chapter`.

### `Section`

Semantic section wrapper with optional number, label, heading, intro, and anchor. Must render valid heading order.

### `Rule`

One border implementation for editorial dividers. Variants: `subtle`, `strong`, `accent`.

## Global components

### Navigation

Contains identity, core routes, resume, and contact. Avoid duplicate mobile and desktop link data. Support current state, keyboard navigation, menu focus management, and sticky offset.

### Footer

Contains a concise contact invitation, email or contact action, selected social/profile links, and copyright. No sitemap-sized footer is necessary.

### Button / text link

Use three action treatments:

| Variant | Use |
|---|---|
| `primary` | One dominant action in a region |
| `secondary` | Alternate action with visible boundary |
| `text` | Inline/editorial navigation |

Buttons are actions; links navigate. Do not style a non-interactive element as either. Icons are optional and must not alter the accessible name.

### Project index item

Required content:

- project number;
- title;
- one-line problem or outcome;
- role/category and year;
- purposeful thumbnail or media;
- project link.

Use a generous editorial row or large composition. Do not default to a grid of small equal cards. Variants may change media ratio, not the information hierarchy.

### Section header

Optional number/eyebrow, specific heading, and short thesis. Avoid generic headings such as “Overview” when a claim is available.

## Evidence components

### Metric

Render a large plain value with a concise label and optional qualifier/source. No card by default.

Requirements:

- state units and time period;
- distinguish measured result, proxy, estimate, and target;
- keep qualifier visible;
- use semantic text, not an image.

### Media frame

Supports image, video, prototype, or artifact with fixed aspect ratio, loading behavior, optional browser/device chrome, and caption. Device chrome is used only when device context matters.

### Figure and caption

Every non-decorative visual receives:

- a figure number when referenced later;
- a one-sentence description;
- a takeaway explaining why it matters;
- alternative text or a longer accessible description.

### Quote

Use only for attributed research evidence or a short reflective statement. Never use decorative customer quotes without provenance.

### Before / after

Supports side-by-side comparison on large screens and a labeled linear sequence on compact screens. Do not rely on a draggable divider as the only way to inspect either state.

### Decision block

Compact structure for `Signal → Interpretation → Decision → Consequence`. Use when a key judgment would otherwise be buried in prose. Avoid turning every paragraph into a card.

### Role and scope metadata

Standard fields: role, team, timeline, responsibilities, constraints, tools only when relevant, and status. Keep scope honest and concise.

## Navigation components inside case studies

### Chapter index

A short list of meaningful chapters with current-location indication. Sticky on large screens only when it improves orientation. Provide normal anchor links in the document.

### Next project

One deliberate next project with title, brief reason to continue, and preview. Avoid carousel controls and random recommendations.

## State requirements

Every interactive component documents:

- default;
- hover where available;
- focus-visible;
- active/current;
- disabled when applicable;
- loading/error when asynchronous;
- compact/touch behavior.

## Content API guidance

Prefer structured content objects for repeated patterns. Example fields for a project:

```yaml
slug: greenhouse
number: "01"
title: Greenhouse
summary: A one-sentence problem or outcome.
role: Product / UX
year: 2026
accent: "#C89B62"
heroMedia: /path/to/media
featured: true
```

Do not bind the system to this exact serialization if the current stack uses another content source; preserve the information model.

## Migration plan

1. Inventory all buttons, wrappers, cards, metadata blocks, media frames, and case-study templates.
2. Select the best semantic implementation of each pattern.
3. Map it to shared tokens and accessibility states.
4. Replace imports page by page without changing content.
5. Remove old implementations only after no active references remain.
6. Run visual and interaction regression checks.

## Non-goals

- A public component playground.
- A universal design system for unrelated products.
- Abstracting a pattern used once before its needs are understood.
- Cardifying every section for visual consistency.

## Success criteria

- One button API and one navigation source remain.
- Homepage and case studies share primitives and evidence components.
- New case studies require composition and content, not copied templates.
- Components remain accessible without page-level patches.
- Variants are named by purpose rather than appearance.

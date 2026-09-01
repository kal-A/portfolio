# Diagram System

**Depends on:** [02 Design Language](./02-design-language.md), [05 Motion System](./05-motion-system.md), [07 Case Study System](./07-case-study-system.md)  
**Purpose:** Turn complex workflows, systems, and decisions into legible evidence

## Goal

Use diagrams when relationships are materially easier to understand visually than in prose. A diagram must clarify sequence, hierarchy, causality, ownership, architecture, or state change. It is not decorative proof that systems thinking occurred.

## Choose the smallest useful form

| Question | Diagram |
|---|---|
| What happens in order? | Flow or timeline |
| Who owns what? | Swimlane or responsibility map |
| How do parts connect? | System/architecture map |
| Where does the experience break? | Journey or service blueprint |
| Why did we choose this? | Decision tree or tradeoff matrix |
| What changed? | Before/after state model |
| What causes the outcome? | Causal map |
| How are items grouped? | Taxonomy or hierarchy |

If a short list or table is clearer, use it instead.

## Visual grammar

### Nodes

- Default: simple label with an optional short supporting line.
- Use rectangles with `8–12px` radius only when boundaries matter.
- Use circles for start/end, people, or compact states—not decoration.
- Keep internal padding at `12–20px`.
- Avoid node shadows.

### Lines and arrows

- Default edge: `1–1.5px` using `--color-line`.
- Active or selected path: `--color-project-accent` or `--color-accent`.
- Use arrowheads only when direction is not otherwise obvious.
- Prefer orthogonal routes for systems and smooth curves for journeys; do not mix routing styles in one diagram.
- Minimize crossings. If crossings cannot be removed, reconsider the grouping.

### Labels

- Use body/UI type, not the display serif.
- Minimum rendered label size: `14px` desktop, `14–16px` compact.
- Use sentence case and short verbs.
- Put edge labels close to their line without covering it.

### Color

- Neutral structure first.
- One accent identifies the point under discussion.
- Status colors carry consistent meaning.
- Patterns, labels, or shapes accompany color distinctions.

## Composition

- Provide a specific diagram title that states the takeaway.
- Add a one-sentence setup before the figure.
- Add a caption after it explaining the implication.
- Align diagrams to the case-study grid.
- Use generous negative space, but keep nodes close enough to reveal grouping.
- Number multi-stage diagrams when text refers to their sequence.

## Diagram types

### Workflow

Show actors, actions, handoffs, and failure points. Use swimlanes only when ownership is part of the argument. Highlight the changed path, not every possible exception.

### System map

Group layers or domains. Use boundaries and labels before color. Annotate the dependency or bottleneck being discussed.

### Journey / service blueprint

Limit stages to the level necessary for the decision. Distinguish user action, frontstage experience, backstage operation, and evidence only when those layers matter.

### Decision diagram

Show criteria and rejected paths honestly. Do not produce a fake tree after the decision merely to make it look systematic.

### Before / after

Keep scale, labels, and orientation consistent between states. Highlight only changed relationships. State whether “after” is shipped, proposed, or tested.

## Motion

Motion is optional.

Use it when order is part of the explanation:

1. render the base structure;
2. reveal 2–5 meaningful stages;
3. emphasize the final active path;
4. stop with the complete diagram visible.

Do not draw every line merely because SVG makes it possible. No looping paths, moving particles, or scroll-scrubbed spaghetti. Reduced motion shows the final state immediately.

## Responsive behavior

- Reflow simple diagrams vertically on compact screens.
- Convert large swimlanes into stacked actor sections.
- Permit labeled horizontal scrolling only for comparisons that cannot reflow, with visible affordance and a text/table alternative.
- Never scale a desktop diagram until labels become unreadable.
- Keep the explanation adjacent to the relevant stage.

## Accessibility

Every meaningful diagram requires:

- concise alternative text stating its conclusion;
- a nearby caption;
- a structured text or table equivalent for complex relationships;
- DOM reading order that matches the visual sequence;
- no information conveyed only by color or animation.

Decorative line fragments should be hidden from assistive technology.

## Implementation

- Prefer semantic HTML/CSS for simple flows and comparisons.
- Use SVG for custom paths, dense relationships, and controlled scaling.
- Use the existing diagram library only if it supports accessible labels and the required visual grammar.
- Centralize diagram tokens for node fill, border, text, edge, accent, and spacing.
- Exported raster diagrams are a last resort and require high-resolution alternatives and accessible descriptions.
- Do not expose internal IDs, debug labels, or tool watermarks.

## Anti-patterns

- diagrams used as section decoration;
- tiny text inside oversized canvases;
- rainbow categories without semantic meaning;
- too many icons or illustrations inside nodes;
- unlabeled arrows;
- every research observation shown in one map;
- separate visual styles for every project;
- animation that is more memorable than the relationship.

## Review checklist

- Can the conclusion be stated in one sentence?
- Is a diagram clearer than prose or a table?
- Are direction, grouping, and ownership unambiguous?
- Are labels readable without zooming?
- Is the active evidence distinguishable without relying on color?
- Does the compact version preserve the same meaning?
- Is there an accessible equivalent?
- Does the caption explain why the diagram matters?

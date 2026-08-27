> **Partially superseded, 2026-08-18.** Execution order and content/truth QA
> remain authoritative. The "Design QA" section's shadow/border/gradient
> language is superseded by the design-freeze foundation's QA criteria. See
> [SUPERSEDED.md](SUPERSEDED.md).

# Overnight Execution Order and QA

Use this file to complete the three experiences without waiting for additional input.

## Execution order

### 1. Hera Fertility
Start here because it has the strongest artifact evidence.

- Audit the five supplied Hera PDFs and any existing Hera files in the repo.
- Build the narrative and page structure.
- Reconstruct selected handwritten concepts into polished product screens.
- Keep the originals visible alongside the reconstructions.
- Verify any existing retention, conversion, or drop-off claims before rendering them.

### 2. PathPeer
- Audit existing video and UI artifacts.
- Extract real stills where useful.
- Build a compact PM and UX story around analytics, Hotjar, feature planning, and no-code execution.
- Do not stretch limited evidence into a long page.

### 3. Informatica
- Audit resume copy and repo notes.
- Build an explanation-led research and planning story.
- Use reconstructed diagrams rather than fake screenshots.
- Emphasize planning, research, implementation choice, workflow organization, and AI-assisted content automation.

## Do not block on missing optional information

If a detail is uncertain:

1. Add it to `NEEDS_INPUT`.
2. Omit the unsupported public claim.
3. Continue implementation.

Do not leave visible placeholders.

## Outcome standard

For all three pages, prefer outcomes that answer:

- Did this save time?
- Did it reduce manual work?
- Did it reduce rework?
- Did it improve conversion, retention, or completion?
- Did it reduce third-party or operational cost?
- Did it accelerate delivery?
- Did it improve prioritization?
- Did it make ownership or handoffs clearer?
- Did it create a revenue opportunity?

Only quantify when the evidence supports the number.

A qualitative explanation of business value is stronger than a fabricated metric.

## Design QA

Confirm:

- All pages use the shared navigation and case-study shell.
- Each page has its own colour identity.
- Gradients are subtle and intentional.
- Section spacing is consistent.
- Cards have consistent borders, shadows, and corner radii.
- Pages do not feel like repeated templates.
- Hover states are obvious but restrained.
- Keyboard focus matches mouse interaction.
- Mobile layouts preserve the story.
- No large accidental empty spaces.
- Text line lengths remain readable.
- Images and reconstructed screens have useful captions.
- Reconstructed visuals are labeled.
- No em dashes appear in public copy.

## Content QA

Confirm:

- The hero explains the value of the work in under 30 seconds.
- Kamal's personal ownership is clear.
- Tools are connected to actual tasks.
- Outcomes explain why the employment mattered.
- Research is connected to decisions.
- Designs are connected to product reasoning.
- PM work is connected to delivery.
- No metric is included merely because it looks impressive.
- No unsupported claim remains.
- No page relies on generic filler.

## Final technical QA

Run the repository's existing type checking, linting, tests, and production build.

Then test desktop, tablet, mobile, keyboard navigation, focus order, gallery interactions, route navigation, image loading, and responsive diagrams.

At the end, produce a concise implementation report listing:
- files changed
- page structure
- visuals created
- verified metrics retained
- metrics removed
- `NEEDS_INPUT`
- follow-up suggestions

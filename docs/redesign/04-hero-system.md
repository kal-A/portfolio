# Hero System

**Depends on:** [01 Design Philosophy](./01-design-philosophy.md), [02 Design Language](./02-design-language.md), [03 Layout System](./03-layout-system.md)  
**Purpose:** Memorable, hiring-focused entry to the portfolio

## Goal

Communicate what Kamal does immediately, then establish a calm, editorial, cinematic, and architectural identity. The hero must support the headline. It must not become the story reviewers remember instead of the work.

## Required message hierarchy

1. Value proposition: what kinds of problems Kamal helps solve.
2. Supporting context: product/UX/system focus and the kind of impact pursued.
3. Primary action: view selected work.
4. Secondary action: contact or resume.
5. Visual motif: atmospheric stage and contour figure.

The headline and primary action are visible immediately. No loader or animation may delay them.

## Composition

- Navigation remains on the page field above the inset stage.
- Text anchors the left side and remains the highest-contrast element.
- Atmospheric light creates a bridge between copy and outline.
- The outline sits on the right, faces inward toward the text, and occupies roughly 25–35% of stage width.
- The stage has real page margins; it does not look like a generic full-bleed marketing header.
- The figure's pose communicates curiosity and forward attention—not conquest, victory, or drama.

## Layer architecture

Implement independent layers in this order:

1. **Stage field:** near-black base color.
2. **Atmospheric image:** fog, softened mountain forms, and one warm light source.
3. **Optional light/grain overlays:** subtle and non-essential.
4. **SVG contour:** custom, transparent, scalable, and animatable.
5. **HTML content:** headline, support copy, actions, status/availability if used.

Never bake text, outline, and atmosphere into one raster asset. Independent layers allow responsive cropping, accessible text, and replacement without rebuilding the hero.

## Atmospheric background

### Requirements

- Mostly dark with broad tonal shapes.
- Heavy fog and softened mountain-like depth.
- One warm beam or bloom of light.
- Minimal detail; atmosphere rather than illustration.
- Sufficient quiet area behind all text.
- No visible AI artifacts.

### Prohibited content

- castles, ruins, fantasy structures, obvious cliffs, or heroic peaks;
- trees, birds, props, or people as focal points;
- hyper-detailed matte painting;
- neon, sci-fi light, or surreal color;
- an image that requires text shadow to remain readable.

Use AVIF/WebP with a fallback where needed. Provide desktop and compact crops when one source cannot preserve the composition.

## SVG contour

The contour is a brand motif, not a portrait illustration.

### Form

- One primary continuous outline; a small number of paths is allowed only when necessary for clean reveal timing.
- No fill; the atmosphere remains visible through the figure.
- No facial features, texture, clothing wrinkles, beard detail, sunglasses, or props.
- A long modern overcoat creates an architectural, flowing silhouette.
- No robe, cape, backpack, messenger bag, water bottle, or performative “traveler” styling.
- The line may remain subtly open rather than closing mechanically.

### Styling

- Stroke: `var(--color-text)` / approximately `#F1E8DB`.
- Opacity: `60–75%`, tested across the image crop.
- Visual line weight: approximately `2.5–3px` at large scale.
- `vector-effect: non-scaling-stroke` only if it produces consistent optical weight across responsive sizes; otherwise tune by breakpoint.
- Round joins and caps; no glow.

The final identity asset should be manually cleaned or traced from an approved pose. Do not ship a first-pass AI-generated SVG. Build the architecture with a placeholder if necessary.

## Motion sequence

| Time | Behavior |
|---:|---|
| `0ms` | Background, text, and actions are visible and stable |
| `250ms` | Contour reveal begins |
| `250–1100ms` | Stroke, mask, and opacity reveal move subtly from lower figure upward |
| `1100ms` | Contour settles; no bounce or overshoot |
| `1200–1500ms` | Optional light bloom increases perceived brightness by only `3–5%` |
| End | No loop and no ambient movement |

The reveal should feel like the figure emerging from fog, not a hand literally drawing every line. Use the motion tokens in [05 Motion System](./05-motion-system.md).

## Reduced motion

With `prefers-reduced-motion: reduce`:

- render the final contour immediately;
- disable stroke/mask travel and light bloom;
- preserve all content and hierarchy;
- avoid crossfades longer than `100ms`.

## Responsive behavior

### Large

- Keep text left and figure right.
- Permit controlled overlap between outline and quiet atmospheric zones, not headline glyphs.
- Preserve the inward-facing pose.

### Medium

- Reduce figure to 25–30% width and shift it toward the right edge.
- Shorten authored headline lines if necessary.
- Keep actions visible without scrolling where practical.

### Compact

- Use a content-led stage; text stays first in DOM and visual order.
- Place the contour in the lower-right or as a low-contrast background layer.
- Crop rather than compress the figure.
- If the outline compromises readability below `360px`, show a purposeful fragment or static simplified mark—not a tiny full figure.
- Stack actions only when two buttons no longer fit with adequate targets.

## Accessibility

- The atmospheric image and contour are decorative when the headline conveys all meaning; use empty alternative text or hide them from assistive technology.
- Maintain AA contrast over every responsive crop.
- Buttons and links remain real semantic elements with visible focus.
- Do not use the hero to announce availability unless that status is accurate and maintained.

## Performance

- Reserve image and SVG dimensions to prevent layout shift.
- Preload only the primary above-fold atmosphere asset.
- Keep the SVG paths optimized without damaging animation quality.
- Avoid JavaScript animation when CSS or the existing motion library can perform the same finite sequence.
- Target no hero-caused CLS and an LCP asset appropriate for the viewport.

## Non-goals

- Recreating the removed book composition in another form.
- Making the person the dominant message.
- Multiple entrance sequences, scroll-scrubbed camera moves, or interactive particles.
- Replaying the animation on route return, hover, or scroll.
- Explaining the metaphor of the open contour in visible copy.

## Success criteria

- A reviewer can state Kamal's value before the contour finishes revealing.
- The text remains the first focal point; the outline is second; atmosphere is third.
- The hero feels distinctive when static.
- The composition works without bespoke fixes at test widths.
- Reviewers remember the cohesion and the work, not “the site with the AI landscape.”

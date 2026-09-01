# Design Language

**Depends on:** [00 Portfolio Vision](./00-portfolio-vision.md), [01 Design Philosophy](./01-design-philosophy.md)  
**Purpose:** Canonical tokens and visual rules

## Migration mandate

The current implementation contains competing color systems and duplicated styles. This document replaces them with one canonical language. Components must consume semantic tokens; page-level hard-coded color, type, radius, shadow, and spacing values are deprecated.

## Token ownership

Use four layers of styling authority:

1. **Foundation tokens** define the raw palette, type roles, spacing scale, radii, borders, and motion-independent visual values in this document.
2. **Semantic aliases** describe intent, such as page background, body text, divider, primary action, media frame, or section gap.
3. **Component tokens** map semantic aliases to a component without introducing a new design vocabulary.
4. **Project tokens** provide the single approved accent for a case study and never override global typography, page surfaces, spacing, or interaction states.

Define foundation tokens once at the global root. Prefer semantic aliases inside components so a future system adjustment does not require page-by-page edits. Framework defaults and page-local values do not outrank these tokens.

## Color

### Core tokens

| Token | Value | Use |
|---|---:|---|
| `--color-bg` | `#0B0C0F` | Page field and primary dark background |
| `--color-surface-1` | `#111318` | Raised or inset sections |
| `--color-surface-2` | `#171A20` | Interactive surfaces and media frames |
| `--color-text` | `#F1E8DB` | Primary warm-ivory text and hero outline |
| `--color-text-muted` | `#B8B1A7` | Secondary copy and metadata |
| `--color-text-subtle` | `#817D77` | Tertiary labels; never essential content |
| `--color-line` | `rgba(241,232,219,.16)` | Rules, borders, and diagram edges |
| `--color-line-strong` | `rgba(241,232,219,.30)` | Focused dividers and selected states |
| `--color-accent` | `#C89B62` | Links, selected data, and warm light cue |
| `--color-accent-soft` | `#E3C7A4` | Accent text on dark fields |
| `--color-focus` | `#8CCBFF` | Keyboard focus ring only |
| `--color-success` | `#79B892` | Verified positive status/data |
| `--color-warning` | `#D7AA68` | Caution or qualified result |
| `--color-danger` | `#D77B72` | Error or destructive action |

Use one project accent at a time. A case study may override `--color-project-accent`, but it must pass contrast checks and may only color small labels, selected paths, data marks, and links. It must not recolor the global page field or typography system.

### Color rules

- Warm ivory replaces pure white.
- Near-black replaces full black.
- Accent use should remain below roughly 10% of a viewport.
- Never use color as the only carrier of meaning.
- Gradients are reserved for natural light falloff, subtle image overlays, or data encoding—not buttons or decorative text.
- Film grain, if used, must be non-essential, under 4% opacity, and disabled when it harms image clarity.

## Typography

Use two families only:

- **Display/editorial:** `Newsreader`, Georgia, serif.
- **Body/UI:** `Onest`, Inter, system-ui, sans-serif.

If the implementation already contains equivalent licensed fonts, map them to these roles rather than introducing a third family.

| Style | Desktop | Mobile | Line height | Notes |
|---|---:|---:|---:|---|
| Display XL | `clamp(4rem, 8vw, 8.5rem)` | fluid | `.88–.94` | Hero only; tightly edited line breaks |
| Display L | `clamp(3rem, 5.5vw, 6rem)` | fluid | `.94–1` | Page titles |
| Heading 1 | `clamp(2.5rem, 4vw, 4.5rem)` | fluid | `1.02` | Major chapters |
| Heading 2 | `clamp(1.75rem, 2.6vw, 3rem)` | fluid | `1.08` | Section claim |
| Heading 3 | `1.25rem` | `1.125rem` | `1.25` | Component headings |
| Lead | `clamp(1.25rem, 1.8vw, 1.75rem)` | fluid | `1.45` | Page thesis or abstract |
| Body L | `1.125rem` | `1.0625rem` | `1.65` | Narrative copy |
| Body | `1rem` | `1rem` | `1.6` | General copy |
| Small | `.875rem` | `.875rem` | `1.5` | Captions and metadata |
| Label | `.75rem` | `.75rem` | `1.2` | Uppercase, `0.08em` tracking |
| Metric | `clamp(3rem, 6vw, 6.5rem)` | fluid | `.9` | Plain numeric outcomes |

### Type rules

- Body measure: `58–72ch`; lead measure: `38–52ch`.
- Prefer sentence case. Uppercase is limited to short labels.
- Do not justify text.
- Limit hero copy to one primary statement and one concise supporting sentence.
- Avoid widows in large headings through authored line breaks; do not force breaks that fail on mobile.
- Underlines and text decoration must remain visible on links.

## Spacing

Use a 4px base with semantic tokens:

| Token | Value | Typical use |
|---|---:|---|
| `--space-1` | `4px` | Optical adjustment |
| `--space-2` | `8px` | Label groups |
| `--space-3` | `12px` | Compact controls |
| `--space-4` | `16px` | Default internal gap |
| `--space-5` | `24px` | Text groups |
| `--space-6` | `32px` | Component padding |
| `--space-7` | `48px` | Large component separation |
| `--space-8` | `64px` | Section sub-groups |
| `--space-9` | `96px` | Section spacing |
| `--space-10` | `128px` | Chapter spacing |
| `--space-11` | `160px` | Major desktop transitions |

Responsive section spacing should use `clamp(72px, 10vw, 160px)`. Related text and media use `24–48px`; unrelated chapters use `96–160px`.

## Shape and borders

- Default radius: `12px` for media and substantial surfaces.
- Compact control radius: `999px` only for pills; do not apply pill styling to every button.
- Button radius: `8px`.
- Border: `1px solid var(--color-line)`.
- Avoid nested rounded rectangles. A section may be framed, or its contents may be framed, but rarely both.

## Elevation and texture

The system relies on contrast and overlap, not floating shadows.

- Default shadow: none.
- Image-stage shadow, if needed: `0 24px 80px rgba(0,0,0,.28)`.
- Do not use multiple shadow recipes.
- Blur is limited to atmospheric image layers and intentionally obscured non-text identity elements. Never blur body text or controls.

## Iconography and line work

- Use simple stroke icons at `1.5px`, with round caps and joins.
- Default sizes: `16`, `20`, and `24px`.
- Icons supplement labels; they do not replace unfamiliar actions.
- The signature contour line uses warm ivory at `60–75%` opacity and a visual weight equivalent to `2.5–3px` at desktop scale.

## Imagery

- Prefer real product evidence, prototypes, research artifacts, and purposeful editorial imagery.
- Place screenshots in consistent media frames with captions.
- Atmospheric imagery must remain soft, dark, and subordinate to text.
- No uncorrected AI artifacts, generic device mockups, decorative dashboards, or stock “teamwork” imagery.
- Apply one consistent image treatment per case study; do not mix glossy mockups, raw screenshots, and illustrations without narrative reason.

## Interaction states

All interactive components require default, hover, active, focus-visible, and disabled states.

- Hover may shift color, border, underline position, or media scale by at most `1.015`.
- Focus-visible uses a `2px` focus ring with `3px` offset.
- Disabled states remain readable and are never represented by opacity alone.
- Touch targets are at least `44 × 44px`.

## CSS implementation

Define tokens once at the global root. Components use semantic aliases such as `--button-bg`, `--section-gap`, and `--project-accent`. Do not embed project colors in shared component source. Document any intentional token exception beside the code that consumes it.

During migration, replace values by visual role rather than by nearest hexadecimal match. A legacy gray used for body copy should map to the body-text token even if another token is numerically closer. Remove a legacy token only after active references have been migrated and visually checked.

## Success criteria

- A search for old palette values shows no active page-level usage after migration.
- No page introduces a third font family.
- Spacing values map to tokens except for documented optical adjustments.
- Contrast meets WCAG AA for text and controls.
- Project identity remains possible without fragmenting the global system.

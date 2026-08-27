# Motion System

**Depends on:** [01 Design Philosophy](./01-design-philosophy.md), [02 Design Language](./02-design-language.md)  
**Purpose:** One restrained motion language for orientation, hierarchy, and state change

## Motion principles

1. **Content first:** Essential content is never delayed.
2. **Finite:** Entrance motion completes and stops.
3. **Explanatory:** Motion reveals sequence, state change, or relationship.
4. **Subtle:** Most transitions should be felt before they are noticed.
5. **Interruptible:** Navigation and controls respond immediately.
6. **Optional:** Reduced motion retains a complete experience.

## Tokens

### Duration

| Token | Value | Use |
|---|---:|---|
| `--duration-instant` | `100ms` | Pressed states and small color changes |
| `--duration-fast` | `180ms` | Hover, focus, underline, icon movement |
| `--duration-base` | `280ms` | Component enter/exit and disclosure |
| `--duration-slow` | `500ms` | Media reveal and chapter transition |
| `--duration-hero` | `850ms` | Signature contour reveal only |

### Easing

| Token | Value | Use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(.2,.8,.2,1)` | Most UI motion |
| `--ease-enter` | `cubic-bezier(.16,1,.3,1)` | Calm entrances |
| `--ease-exit` | `cubic-bezier(.4,0,1,1)` | Short exits |
| `--ease-linear` | `linear` | Progress and stroke dash only |

Do not add arbitrary easing curves at component level.

## Allowed patterns

### Interactive feedback

- Link underline: color/position change within `180ms`.
- Button: border/background change; optional icon translation up to `3px`.
- Project media: scale no greater than `1.015` with overflow safely clipped.
- Disclosure: animate height/opacity only when semantics and focus behavior remain correct.

### Section reveal

Use sparingly for major media or diagrams:

- opacity `0 → 1`;
- translate `8–16px → 0`;
- duration `280–500ms`;
- trigger once when the item becomes meaningfully visible.

Do not animate every paragraph, label, and card independently. Group related content.

### Diagram reveal

Reveal nodes and edges in reading order when sequence is important. Use 2–5 logical stages and keep the final diagram visible. Do not animate a diagram whose value is comparison at a glance.

### Page transitions

Default to native navigation or a brief content fade. Do not animate route transitions if they delay history navigation, break scroll restoration, or create a flash on slower devices.

### Hero signature

The SVG contour reveal is the one cinematic motion moment. It uses stroke, mask, and opacity over `850ms`, begins after `250ms`, plays once, and never loops. See [04 Hero System](./04-hero-system.md).

## Scroll behavior

- Native scrolling only.
- Smooth anchor scrolling may be used unless reduced motion is requested.
- Sticky narrative scenes must retain natural document progress and collapse to linear content on compact screens.
- No scroll hijacking, scrubbed camera moves, forced snapping, or content that only becomes readable at a precise scroll position.

## Staggering

- Maximum default stagger: `60ms`.
- Maximum items in a stagger group: `5`.
- Stagger by narrative order, not DOM accident.
- Skip staggering when it would make the final item arrive more than `400ms` after the first.

## Loading and asynchronous states

- Do not use a full-screen loader for static portfolio content.
- Reserve layout dimensions for media.
- Use a static placeholder, dominant color, or subtle skeleton for delayed media.
- Avoid shimmering skeletons on pages where loading normally completes quickly.

## Reduced motion implementation

At `prefers-reduced-motion: reduce`:

- set animation and transition durations to near-instant for non-essential effects;
- show final states immediately;
- disable transforms used only for entrance;
- disable smooth scrolling;
- retain visible focus and state changes.

Do not remove state feedback entirely.

## Performance requirements

- Animate `transform`, `opacity`, stroke properties, and masks where practical.
- Avoid animating layout-heavy properties across large regions.
- Disconnect observers after one-time reveals.
- Pause or remove offscreen non-essential media playback.
- Do not load a general animation library solely for hover transitions.
- Test motion on a mid-range mobile device and with CPU throttling.

## Prohibited patterns

- looping floats, pulses, glows, or background motion;
- bouncing easing and elastic overshoot;
- cursor followers, trails, and magnetic controls;
- particles and ornamental parallax;
- hidden content that requires scrolling to animate into existence;
- hover-only information;
- simultaneous large-scale movement in multiple viewport regions;
- animations that replay whenever an element re-enters the viewport.

## QA

For every animation ask:

1. What information or orientation does it add?
2. Is the duration proportional to the action?
3. Can the user interrupt it?
4. Does the final state remain clear?
5. Is the reduced-motion experience complete?
6. Does it remain smooth under realistic device constraints?

If question 1 has no strong answer, remove the animation.

# Final Homepage/Hero Spec — Approved, Ready to Implement

This supersedes the exploratory notes in
[12-visual-direction-decisions.md](12-visual-direction-decisions.md) with a
single clean spec of what was actually approved across ~16 mockup iterations.
If anything here conflicts with `12-visual-direction-decisions.md`, **this
file wins** — that one is the messy running log, this is the distilled result.

## Status: approved in mockup form, now being ported to real Next.js code.

## Page structure, top to bottom

1. **Hero** — pill tags, headline, subhead, CTAs, signature, photo stack
2. **Marquee strip** — subtle scrolling text of companies + skills/positions
3. **Selected case studies** — colored bordered cards
4. **Work experience** — asymmetric two-column timeline
5. **Craft manifesto / stat strip** — dark section with rotating headline + real stats
6. **CTA block** — "Let's connect," warm gradient, LinkedIn button
7. **Footer** — copyright, email/LinkedIn links, back-to-top button

Every section (and most individual elements within sections) is hidden until
scrolled into view, then reveals with a fade-up transition. **Nothing is
visible on initial page load except the hero** — this is not a cosmetic
nice-to-have, it's a specific, repeated requirement: the user wants deliberate
pacing so a reader has to scroll to see more, not have everything dumped on
them at once.

## 1. Hero

- **Pill tags**: 4 tags — Product Management, Product Design, Systems, UX/UI
  — each with a small colored dot (rust `#c8452c`, teal `#2c6e5e`, blue
  `#3a6b93`, gold `#c2900a`), sketchy black-border style (`1.5px solid
  #181614`, white/translucent background, fully rounded).
- **Headline**: serif, with one phrase in italic + rust color for emphasis
  (like "I design products for *messy real-world workflows.*") — not a flat
  color-highlighted phrase, an actual italic treatment.
- **Subhead**: short, one line is fine — full bio detail lives on /about.
- **CTAs**: "View case studies" (solid dark button), "See resume" (outlined
  button).
- **Signature**: an SVG hand-drawn signature-style stroke path that draws
  itself in (stroke-dasharray/dashoffset animation) **after** the headline,
  subhead, and CTAs have already appeared — like a painter signing a
  finished piece. Placed under the CTA row.
- **Photo stack**: 3 layered, tilted, dark-bordered photo-card frames behind
  each other (back rotated ~-9°, middle ~+6°, front ~-2°), giving a
  stacked-photos depth effect. Front card has a small file-name-style tag
  overlay (e.g. `KAMAL_01.JPG`). Sized larger than early drafts — should take
  meaningful visual weight, not be a small corner accessory.
  - **OPEN QUESTION, not yet answered**: what actually goes inside these
    frames — real photos of Kamal, work/product screenshots, or an
    illustrated/abstract treatment? Confirm before implementing with real
    imagery; placeholder gradients are fine until then.
- **Background**: not flat. Layered radial gradients — warm rust glow
  upper-left (`rgba(200,69,44,0.16)`), cool teal glow upper-right
  (`rgba(44,110,94,0.14)`), over a soft diagonal base gradient (warm cream →
  slightly cooler tone). Restrained, not a loud/saturated gradient.

## 2. Marquee strip

- **Not card-based.** Earlier draft used bordered "job chip" cards per
  company — rejected as taking too much space and feeling heavy for what's
  meant to be a subtle, continuous, lightweight element.
- Final version: a single thin strip, plain text items only — company names
  in bold/darker text, skills/positions in lighter/muted text, separated by
  small rust dots. Scrolls continuously left via CSS animation
  (`translateX(0)` → `translateX(-50%)` on a duplicated track, `linear
  infinite`, ~26s loop). Background is a slightly different neutral tone
  (`#f8f4ec`) than the page to set it apart as a strip, not another section.

## 3. Selected case studies

- Cards in a 2-column grid (or the alternating full-width row layout from
  earlier rounds — both were explored; card-grid-with-color is the version
  that survived the most recent rounds and should be the default unless
  revisited).
- **Border**: thicker than standard site borders — `2.5px solid #181614`,
  not the thin `0.5px`/`1.5px` hairlines used elsewhere.
- **Background color per card**, matching each project's theme color at low
  saturation (pale blue for RoomEase, pale pink for Hera, pale gold for
  Greenhouse, pale green for ForceN) — this doubles as the lightweight
  version of "per-case-study theming" discussed earlier; full custom themed
  detail pages are still a separate, later effort.
- **Hover behavior, two effects layered together**:
  1. Lift + shadow (translateY(-4px) + box-shadow) — the "pop" effect from
     earlier rounds, keep it.
  2. **Fill effect**: a colored overlay (same hue as the card's pale
     background, more saturated) scales up from the bottom (`transform:
     scaleY(0) → scaleY(1)`, `transform-origin: bottom`) to fill the card
     on hover, layered behind the text (z-index ordering: text stays on top).
- Icon block, title, company/project name at minimum; tags and a "View case
  study →" link are optional depending on final content density.

## 4. Work experience

- **Asymmetric two-column layout**, not a flat centered list. Left column:
  just a large serif label ("Work experience"), narrow, fixed width. Right
  column: the actual timeline, indented, taking the remaining width.
- **Timeline treatment**: a vertical dashed line (`1.5px dashed
  rgba(24,22,20,0.25)`) running down the left edge of the right column, with
  a small circular dot (outlined circle + solid rust center, matching the
  schematic-node style from the hero mind-map concept) marking each entry.
- **Per entry**: company name (serif, prominent), role/location/dates as a
  muted meta line, then a **short synthesized summary paragraph** (not the
  full resume bullet list inline), then a "Read more →" link that would
  expand the full bullet detail or link to the case study.
- This entirely replaces the earlier "boxed/carded" experience list — no
  outer box or card, no separate inner scroll area. It's just the next part
  of the normal page flow, revealed the same way as everything else.

## 5. Craft manifesto / stat strip

- Dark section (`#181614` background), placed **near the end of the page**,
  just before the CTA block/footer — not directly under the hero.
- Eyebrow: "Craft manifesto"
- Headline: "I build [rotating word/phrase]." — the phrase after "I build"
  **rotates through several options** on a timer (~3.2s interval), each
  transition a proper crossfade (outgoing fades/slides up out over 500ms,
  incoming fades/slides in over 500ms — not an abrupt swap), with a dashed
  rust underline that travels with the current phrase.
  - Draft rotation set: "systems people actually use." / "products people
    trust." / "flows that make sense." / "tools that cut the busywork." —
    open to revision, but the rotation mechanic itself is confirmed, not
    just the specific words.
- Below: 3 real stats in a row (not fabricated) — Internships (5), Case
  Studies (6), Building Since (2022) — using the schematic outlined-circle
  icon (matches hero mind-map node style) rather than generic colored icons.

## 6. CTA block

- Modeled on the reference "Get in Touch" section (warm gradient background,
  centered content, solid button).
- Background: warm gradient (`linear-gradient(135deg, #f0c9b8, #f6ded0)` or
  similar peach/rose tone) — this is the one place a stronger, warmer color
  wash is appropriate.
- Headline: "Let's connect." + one line of supporting text.
- Primary button: "Connect on LinkedIn ↗" (solid dark button).
- Small row of additional contact-channel icon slots below (email, etc.).

## 7. Footer

- Simple: copyright line, Email/LinkedIn text links, and a **back-to-top
  button** (circular, outlined, up-arrow) on the right side.

## Cross-cutting mechanics

- **Scroll reveal**: real `IntersectionObserver`-based reveal, not a
  timed/staged reveal on page load. Each reveal-tagged element starts at
  `opacity: 0; transform: translateY(~20px)` and transitions to
  `opacity: 1; transform: translateY(0)` over ~0.6s when it enters the
  viewport (threshold ~0.2–0.25). This should be a single reusable
  `Reveal`/`useInView` pattern applied consistently across the whole page,
  not reimplemented per section.
- **Node/mind-map style** (from earlier rounds, still valid, not yet placed
  in this exact page structure): schematic/blueprint style — faint grid
  background, outlined circles with a small solid center dot, monospace
  uppercase labels, "Systems" as a double-ringed hub node, monochrome with
  rust-accent hover pop. This was approved as a concept but hasn't been
  explicitly slotted into the final page structure above — likely candidate
  spots: somewhere in the hero (original placement) or as a visual motif
  reused elsewhere (e.g. the stat icons already borrow its outlined-circle
  language).
- **Color palette**: warm paper base (`#fdfaf5`), rust/coral primary accent
  (`#c8452c`), supporting colors per domain — teal/green (`#2c6e5e`), blue
  (`#3a6b93`), gold (`#c2900a`) — near-black (`#181614`) for dark sections
  and text. Pop of color is achieved through the gradients, card fills, and
  domain dot-colors — not through loud/saturated backgrounds everywhere.

## Explicitly rejected along the way (don't reintroduce without reason)

- Multi-color glossy 3D orb nodes (too "out of place," clashed with
  restrained direction)
- Decorative "square inside a square" filling hero whitespace
- Job-chip cards in the marquee (too heavy/spacious)
- A boxed/separately-scrollable "experience" sub-widget
- Case study rows/cards with mismatched box-height vs. text-length
- Flat/instant opacity swaps for the rotating manifesto word (needs a real
  crossfade)
- Using mockup scaffolding text (like a layout-technique description) as if
  it were real page copy

## Not yet resolved

- What's actually inside the photo-stack frames (see Hero section above)
- Whether the case study section uses the card-grid (current) or the
  alternating-full-width-row layout (explored earlier, not carried into the
  final rounds) — default to card-grid unless redirected
- Exact rotation content/count for the manifesto headline
- Whether/where the schematic mind-map node motif gets a final home in this
  structure

## Implementation notes for porting to real code

- `Reveal` wrapper: client component using `IntersectionObserver`, wraps
  children, toggles a class/state on first intersection (don't re-hide on
  scroll-out — reveal once, stay visible).
- Marquee: pure CSS animation, duplicate the track content once so the loop
  is seamless; pause-on-hover is a reasonable enhancement, not required.
- Signature SVG: hand-tune a stroke path once, reuse `stroke-dasharray` /
  `stroke-dashoffset` animation triggered by the same `Reveal` mechanism
  (only start drawing once it's in view AND after the rest of the hero has
  already revealed).
- Rotating manifesto word: small client component, `setInterval` swapping
  array index with a CSS transition on enter/leave, not React key-based
  remount flicker.
- Case study card fill-on-hover: CSS-only (`::before` pseudo-element
  `scaleY` transform on `:hover`), no JS needed.

# 11 — Case-Study Format Playbook

The practical, spatially-economical layout rules for a case-study page, distilled
from the Chronicle V2 build after several rounds of direct review. `07-case-study-system.md`
defines *what sections a case study has*; this doc defines *how to lay each one out* so the
page reads as deliberately designed, not templated — and never wastes horizontal space.

Reference bar (all verified live this engagement): **faizanlalva.com/work/grocerease**
(varies content shape every section; full-width media; a pull-quote beat; numbered
section tags) and the saved **NoCode.co** reference (`docs/reference/nocode-case-study-layout-reference.png`)
— "pair a paragraph tightly against its image at the same vertical position, alternating
sides each time; whitespace lives *between* pairs, never inside one."

---

## 0. The one rule everything else serves

**Every horizontal band is filled edge-to-edge with content.** The two failure modes,
both flagged repeatedly in review, are:

1. **A narrow column centred in a wide shell** — e.g. a 760px `reading` container inside a
   1600px `page` shell strands ~340px of dead margin on *both* sides.
2. **A capped paragraph pinned left with an empty right half** — a `max-width: var(--measure-body)`
   paragraph alone in a wide section leaves ~450px of blank canvas to its right.

If a band is not full, it is not done. Verify by measuring (see §9): every section's content
should span from the container's left inset to its right inset (~144px → ~1280px at a 1440px viewport).

---

## 1. Container width

- **Default every section to `standard` (1280px).** At 1440px this leaves ~72px margins —
  economical, not stranded. This is the correct default, not `page`.
- **`page` (1600px):** only for the cover/hero, or a genuinely full-bleed showcase moment.
  Do not use it for text sections — its width only makes the empty-right problem worse.
- **`reading` (760px):** essentially never on a case study. It centres a narrow column and
  creates symmetric dead margins. Fill the band with two columns instead.

## 2. Fill the band — the four layout patterns

Pick one per block; never leave a lone capped paragraph.

- **`NarrativeMedia` (alternating pairs).** Prose beside its screenshot, vertically centred on
  the same axis, media side **alternating** section to section (`flip`). The primary rhythm move.
  Whitespace lives *between* pairs, never inside one.
- **Side-by-side callout + prose.** Two related paragraphs (or a bordered callout + a paragraph)
  in a `grid lg:grid-cols-2`. Use when a section has two prose beats and no image — it fills the
  band and reads as composed. (Chronicle §4: disputed-relationships callout | review-status prose.)
- **Heading-rail intro.** A short display-serif statement in a ~320–340px left rail, the detailed
  prose filling the rest. Turns a long lead paragraph (which would strand the right) into a filled
  band. (Chronicle §9.)
- **Split-the-intro callout.** Take the strong constraint sentence out of a lead paragraph and make
  it an accent-bordered callout on the right; the setup prose sits left. Fills the band *and* adds a
  design beat. (Chronicle §6: reframe prose | "scope guardrail" callout.)

For lists and cards, always go multi-column so they fill the band: quick-facts/rules as a **3-up row**
(NoCode stat-band style), decisions/cards as a **2-col grid**, complete/next as **2 columns**.

## 3. Matched-height media (the tall-image trap)

A tall **portrait** image (ratio < ~0.8) beside a short paragraph overhangs it and dumps dead space
below the text — matched *widths*, mismatched *heights*. Fixes, in order of preference:

1. **Crop the image to match the text height** — give the frame a `aspect-square` (or landscape)
   and `object-cover` with an `objectPosition` chosen so the meaningful region stays in view. Keep
   the full-artifact provenance in the caption. (Chronicle §5: the portrait Vienna plate → square
   framed on Central Europe, which the caption already says the view "centers on.")
2. If the image genuinely must stay full/portrait, **shrink it** so its height ≈ the text height,
   or pair it with *more* text (fold an adjacent paragraph into the same column).
3. Last resort only: `items-center` so the height difference splits above+below and reads as
   intentional vertical centring rather than a bottom gap.

Landscape/near-square images (ratio ≥ ~1.0) don't hit this — a `[1fr_300px]` pair just works.

## 4. Section rhythm & wayfinding

- **Vary the shape section to section.** Prose+quote → alternating media pair → interactive diagram
  → side-by-side callouts → 2-col cards → stat band. Nothing should sit in the same shape twice in a row.
- **Category eyebrow on every section** ("05 · PIPELINE"): the section `label`, coloured with the
  accent (`accentLabel` on the shared `Section`). Doubles as wayfinding — reuse the exact TOC label.
- **One pull-quote per page.** A single strong line lifted from the prose to display scale, breaking
  the rhythm once. Do not repeat it — a second pull-quote cheapens the first.

## 5. Colour — deriving a legible accent

Project accents are tuned for light cards; most are **too dark to read as text on the near-black
case-study field** (Chronicle's `#2e4a6b` is ~2:1 on `#0b0c0f`). So:

- On the case-study root wrapper, alongside `--color-project-accent`, define
  **`--accent-bright: color-mix(in srgb, <accent> 55%, white)`** — a lightened accent (~6.6:1 contrast,
  passes AA for text). Everything colour-related references `var(--accent-bright, var(--color-project-accent))`
  so pages that haven't defined it fall back safely.
- **Apply accent to:** section eyebrows, uppercase sub-labels/subheadings, diagram node titles, callout
  left-borders (`border-l-[3px]`), the pull-quote mark, `StatusPill` in-progress tone, `DecisionBlock`
  left border. Thread it through *structure*, not decoration.
- **Keep neutral:** body prose, metric numbers, dividers, plain borders. Colour marks hierarchy; it
  does not sprinkle. (This satisfies "more colour" without violating "one surgical accent" — accent lives
  on labels/structure, ivory stays the reading colour.)

## 6. Interaction & hover consistency

**If two elements look alike, they must behave alike on hover.** Audit every card-like thing before shipping.

- **Surface-2 bordered cards** (role cards, foundation cards, reflection cards, diagram nodes, callouts) →
  `CARD_HOVER`: `-translate-y-0.5` + soft shadow + faint accent wash (`color-mix(... accent 6%, surface-2)`).
- **Top-border quick-facts** (`Metric`, snapshot items, 3-up rule cards) → hover wash to `--color-surface-2`.
- **List rows** (numbered lists) → the same surface-2 wash.
- **Images** → opt into `interactive` on `MediaFrame`: the frame becomes its own hover group so the
  built-in zoom fires, plus an accent border + shadow lift. Every content image pops the same way.
- **Real buttons** (`ProcessFlow`) → a resting fill + a distinctly stronger pressed/hover state.

The hover target is always **one tonal step above the band it sits on** (surface-2), so hover never
disappears silently on a tinted band.

## 7. Typography & spacing gotchas

- **JSX eats the space after an inline tag.** SWC/Turbopack trims the leading space of the text node
  right after `</span>` / `</em>`, so `<strong>Foo</strong> bar` renders "Foobar". Always write an
  explicit `{" "}` **after** the closing tag: `</span>{" "}bar`. (The `{" "}` before the tag is also
  needed when the tag starts a new source line.)
- **Space between pairs, not inside them.** Big vertical gap only at genuine section/beat breaks
  (`mt-12`/`mt-16`); tight gap (`mt-5`) between a paragraph and its own related sub-paragraph.
- Prose stays at `--measure-body` for line length *only when it's the full-width reading column*;
  inside a filled two-column band it takes the column width (no extra cap needed).

## 8. Shared-component discipline

When a layout need isn't met by a shared shell component, **add an opt-in prop, don't fork or restyle
in place** — so already-approved pages (Greenhouse) are untouched:

- `Section` gained `accentLabel?` (accent eyebrow).
- `MediaFrame` gained `interactive?` (hover pop).
- `DecisionBlock` / `StatusPill` reference `var(--accent-bright, ...)` with a safe fallback.

New defaults must be `false` / fall back to prior behaviour.

## 9. Verification checklist (before declaring a section done)

1. `npx tsc --noEmit` clean.
2. Route returns 200; **grep the *served HTML*** for a known string from the last section + the absence
   of `Build Error` / `Parsing ecmascript` / `Internal Server Error` — the browser console buffer is an
   unreliable stale HMR overlay on this worktree (WebSocket HMR flakes; a red overlay can persist over a
   page that actually compiles fine — a hard refresh clears it).
3. At a **1440px** emulated viewport, measure each band: content left edge ≈ 144px, right edge ≈ 1280px.
   Any band whose right edge falls short of ~1280 has a dead-space gap — fix it.
4. For any prose+media pair, measure both column heights — they should be within ~10–20% (see §3).
5. Confirm accent labels resolve to the bright value (not the dark raw accent) and pass contrast.
6. Confirm every card-like element shares the correct hover family (§6).

## 10. Rollout order (per IMPLEMENTATION-ROADMAP)

Chronicle is the reference implementation of this playbook. Remaining: RoomEase, Informatica, PathPeer
(ForceN/RoomEase carry bespoke diagram components — land shell + layout here, defer diagram-grammar
changes). Apply §1–§7 to each; reuse the `NarrativeMedia`, `PullQuote`, `NumberedList`, `CARD_HOVER`,
and `--accent-bright` patterns rather than reinventing them.

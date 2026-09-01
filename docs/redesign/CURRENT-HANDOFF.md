# Current Handoff

**Last updated:** 2026-08-25. Phase 11 (shared case-study shell,
Greenhouse pilot) is built and self-verified, not yet reviewed — see
"Phase 11 — Shared case-study shell (Greenhouse pilot)" near the end of
this file for what was built, what's pending review, and the temporary
preview route. The sections below this note (up to Phase 6) predate that
work and are kept for history; they were not re-verified as part of this
update.

**Last updated (prior):** 2026-08-19, end of Phase 6. The homepage now uses the
editorial project index and a concise Selected Experience section instead
of the equal-card grid and decorative timeline; `/about`, `/resume`,
`/contact`, and `/work`'s hero band are migrated to tokens; the root
body-background flip — deferred since Phase 3 — is done. Stopped for
approval before Phase 7.
**RESOLVED, 2026-08-19 — missing-foundation-documents risk.** The eleven
foundation documents were missing from this worktree specifically (confirmed
absent via `Glob`/`git log --all` at Phase 5's start) but existed all along
in the parent repo (`D:\Full time Grind\Portfolio\docs\redesign\`) — they
were simply never copied into this worktree. The user supplied the copy
command; all eleven are now present and confirmed on disk in this worktree's
`docs/redesign/` (verified via `wc -l` on each file, 2026-08-19 — currently
untracked, not yet committed) and have now been read in full. **Re-auditing
the completed Phase 5 hero against the real `04-hero-system.md` and
`05-motion-system.md` (Phase 5 had worked from the user's inline spec, since
the files weren't available yet) found five real gaps across two rounds —
three cosmetic (contour color/opacity/weight, missing light bloom, missing
route-return replay guard, fixed in the first round) and two structural
(contour reveal technique, contour composition/sizing, fixed in this
second round). All five are fixed and re-verified** — see "Post-Phase-5
correction" and "Post-Phase-5 correction, round 2" below. The "Known risks"
entry on this topic is kept for the historical record but is no longer an
open risk.
**Purpose:** let a fresh Claude Code, ChatGPT, or Codex session — with zero
access to any prior conversation — pick this project up and continue
correctly. Read this document first, before the foundation documents,
every session. **This is a living document: update it whenever a phase's
status changes, don't just read it.**

---

## Current redesign objective

Migrate Kamal Ahsan's portfolio (Next.js 16 App Router + Tailwind v4 +
TypeScript) from its current warm-paper/comic-box/multi-accent visual
system to the dark-field, warm-ivory, single-restrained-accent, editorial/
cinematic/architectural system defined by an eleven-document design-freeze
foundation. This is a full visual and structural migration, not an
incremental polish pass — see `SUPERSEDED.md`'s decision 1 (2026-08-18,
first set) for why the earlier polish-pass approach was paused in favor of
this.

## Authoritative reading order

Read in this order, every session, before making any decision:

0. **This file**, then `MIGRATION-INVENTORY.md` (Phase 1's verified
   baseline).
1. The eleven foundation documents, in order: `00-portfolio-vision.md` →
   `01-design-philosophy.md` → `02-design-language.md` →
   `03-layout-system.md` → `04-hero-system.md` → `05-motion-system.md` →
   `06-component-system.md` → `07-case-study-system.md` →
   `08-diagram-system.md` → `09-storytelling-system.md` →
   `10-review-checklist.md`.
2. `IMPLEMENTATION-ROADMAP.md` — read the phase named as "current phase"
   below before doing anything.
3. `PORTFOLIO_CASE_STUDY_SYSTEM.md` — remaining-authoritative sections only
   (§4–8, §13–14, §16, §17, §23–24, §26, §27); everything else in it is
   superseded — see `SUPERSEDED.md`'s mapping table.
4. `SUPERSEDED.md` — the full decision record and per-document status.
   **Never trust an older document's instruction without checking this
   file first** — several older documents contain instructions that were
   explicitly retired.
5. `00-INDEX.md` carries the same order as a short pointer; this file and
   `SUPERSEDED.md` are the detail behind it.

## Decisions already approved (chronological, see `SUPERSEDED.md` for full text)

1. **Migration scope** — proceed with the full redesign now, not a gradual
   layer. Legacy visual-polish passes are paused; their structural findings
   remain useful.
2. **Typography** — Newsreader (display) / Onest (body). Caveat removed
   from active use.
3. **Diagram architecture** — retain the current hybrid (semantic HTML/CSS
   + hand-built SVG + ELK only where it materially helps); no React Flow.
4. **Existing completed work preserved** — Hera's reconstruction, PathPeer's
   content work, and mobile fixes are visually migrated, not rebuilt.
5. **Spatial Composition Rules** (§27) — rules 1–9 and 11 approved as-is;
   rule 10 (secondary surface tinting) revised to use the new semantic
   surface tokens instead of pale project tints.
6. **PathPeer/Informatica** — both keep full case-study pages; homepage-
   featured status is evidence-gated (via `09`'s proof-map), not tier-gated.
   The old archive-only restriction is retired.
7. **Hero signature** — the Caveat handwritten signature is removed and not
   rebuilt as a separate graphic; the SVG contour figure is the one
   signature motif.
8. **Marquee** — removed. Useful wording may move into the static practice
   statement.
9. **Work Experience** — kept as a concise "Selected Experience" section
   after Selected Work (strongest/most relevant roles only, no decorative
   timeline) — the intentional implementation of `03`'s "currently/
   previously" context, not a placeholder for it.
10. **Rotating statement** — replaced with one static statement; not
    user-triggered, no alternate rotation mechanic.
11. **Metric presentation** — outcome metrics move to a large-plain-value
    treatment (no bordered comic-box card) — a structural component
    rebuild, not a token swap. Claims themselves are not altered.
12. **Homepage project index** — in scope; `06`'s "Project index item" spec
    supersedes `PORTFOLIO_CASE_STUDY_SYSTEM.md` §18's exclusion, but only
    for project-index presentation.
13. **Authorship language** — `07`'s five-tier taxonomy (owned / led
    collaboratively / influenced / contributed / team result) adopted, but
    never mechanically overwrites accurate existing phrasing (e.g.
    PathPeer's "one of two developers/designers" stays exactly as written).
14. **Roadmap approved** — `IMPLEMENTATION-ROADMAP.md`'s 12 phases, with a
    mandatory approval checkpoint after Phase 8 (Greenhouse pilot) before
    Phase 9 (rollout) may begin.
15. **Hero assets** — a temporary, clearly-marked, non-polished placeholder
    is approved for the SVG contour and atmospheric background in Phase 5.
    This is a standing **release blocker**: Phase 12 cannot pass until both
    are replaced with final, approved assets.
16. **`/work` project index** — uses the same shared editorial index
    component as the homepage, with purposeful variants (`selected` /
    `complete`), not a second card system.
17. **Documentation correction** — the foundation is **eleven** documents
    (`00`–`10`), not ten. Any older reference to "ten foundation documents"
    is a typo to be corrected on sight.
18. **`/about`, `/resume`, `/contact`, and `/work`'s own hero band** are
    folded into Phase 6 (they share one simple hero pattern with `/work`'s
    index, migrated at the same time) — closes the scope gap the roadmap
    originally flagged.

## Completed phases

- **Phase 1 — Current-state baseline and migration inventory.** Complete
  and approved. Findings recorded in `MIGRATION-INVENTORY.md`.
- **Phase 2 — Global tokens and font migration.** Complete. Only
  `app/layout.tsx` and `app/globals.css` were touched — confirmed via
  `git diff --stat`.
- **Phase 3 — Layout primitives and global shell.** The five primitives
  (`Container`, `Grid`, `Stack`, `Section`, `Rule` in `components/layout/`)
  are built and verified against real content in a live browser (computed
  styles, breakpoints, no console errors, no overflow at 375px/desktop).
  **The root body-background switch — the other half of Phase 3's original
  scope — was deliberately not done.** Checked page-by-page before
  attempting it: `/contact`'s links block and `/resume`'s entire top
  section have no explicit background and use `text-neutral-900` directly
  — flipping `<body>` to `--color-bg` now would put dark text on a
  near-black field in those two real, content-bearing regions, not just a
  cosmetic gap. This is exactly the outcome the standing instruction for
  this migration rules out. Deferred to immediately after Phase 6, once
  those two pages have real section backgrounds (now written into Phase
  6's own scope in the roadmap). Also fixed during this phase: `next.config.ts`
  now pins `turbopack.root`/`outputFileTracingRoot` to this worktree — see
  "Known risks" below for why this was necessary and out-of-original-scope
  but done anyway.
- **Phase 4 — Navigation, footer, actions, and interaction states.**
  Complete. `Nav.tsx` fully rebuilt on the new tokens, including a real
  compact/mobile menu that didn't exist before (see "Exact navigation/
  footer/action work completed" below for the full accessibility behavior
  built and verified). `Footer.tsx` migrated to tokens. New
  `components/ui/Action.tsx` — the shared primary/secondary/text action
  component — built and consumed by Footer for real. The body-background
  flip remains deferred (unchanged from Phase 3's decision).
- **Phase 5 — Homepage shell and SVG contour hero.** Complete. New
  `components/Hero.tsx`, a pure server component, implements all five
  documented layers with a clearly marked temporary placeholder atmosphere
  and SVG contour (decision 15 — still a standing Phase 12 release blocker).
  `Marquee.tsx`, `Signature.tsx`, `RotatingWord.tsx` deleted after a
  zero-reference grep. Rotating stat-strip headline replaced with a static
  statement using existing wording. See "Exact hero work completed" below.
  Two rounds of post-completion corrections against the real
  `04-hero-system.md`/`05-motion-system.md` are recorded further down.
- **Phase 6 — Editorial project index, concise Selected Experience, and
  secondary-page shells.** Complete. New `components/ui/ProjectIndexItem.tsx`
  replaces `CaseStudyCard.tsx` (deleted) on the homepage and `/work`. New
  `components/SelectedExperience.tsx` replaces the dashed-timeline Work
  Experience section. `/about`, `/resume`, `/contact`, `/work`'s hero band
  migrated to tokens. The deferred body-background flip is done as this
  phase's closing step. See "Exact Phase 6 work completed" below, including
  the proof-map table and the featured-set decision flagged for you.

## Current phase

**Phase 6 is done and stopped for approval. Do not start Phase 7 without
explicit go-ahead.**

If you are a fresh session picking this up:
- If the user has since approved Phase 7 in a message you can see, proceed
  to Phase 7 ("Shared case-study shell and evidence components") per
  `IMPLEMENTATION-ROADMAP.md`.
- If you have no record of approval, stop and ask — do not assume silence
  means approval. This project has been run as an explicit phase-by-phase
  approval loop throughout; treat that as the working agreement even if
  this specific instruction isn't repeated to you.
- The eleven foundation documents are now present in this worktree (copied
  from the parent repo, 2026-08-19 — see the note at the top of this file).
  Read them normally, in the canonical order. They are currently untracked
  (`git status` shows `??`) — not a blocker, just worth knowing before
  assuming `git diff`/`git log` will show anything about them.
- **A content decision is still open, not decided by this session:**
  whether to add Chronicle to the homepage featured set (currently
  roomease/forcen/greenhouse/pathpeer). See "Exact Phase 6 work completed"
  below for the full proof-map table and reasoning. Don't add it
  unilaterally in a future phase without the user confirming.
- **Environment note for whichever session next uses the browser tool:**
  this session's Browser pane never has real OS-level window focus
  (`document.hasFocus()` returns `false` throughout). `document.activeElement`
  tracking is fully reliable for verifying keyboard/focus-management *logic*
  (used extensively and successfully in Phase 4 — see below), but CSS
  `:focus`/`:focus-visible`/`:focus-within` pseudo-class *styling* never
  visually applies in this environment regardless of what the code does,
  because it depends on document-level focus. Don't mistake that for a
  code bug — verify visual focus-ring/focus-reveal styling by eye in a real
  browser instead, or trust the CSS if the selectors are structurally
  correct and the logic-level test passes.

## Verified technical baseline (repaired, 2026-08-18)

- **Dependency repair complete.** This worktree had no `node_modules` of
  its own and was resolving from the parent repo's (missing the
  transitive dependency `resolve`, breaking `eslint-plugin-react`). `npm ci`
  inside the worktree (strict restore from the committed
  `package-lock.json`, no dependency changes) fixed it by creating a
  worktree-local `node_modules`. No manifest/lockfile edit was needed.
- `npx tsc --noEmit` — clean, no errors.
- `npm run lint` — clean, exit 0.
- `npm run build` — succeeds; all 20 static routes generate correctly.
- No automated test suite exists in this repository (no Jest/Vitest/
  Playwright/Testing Library in `package.json`) — this remains true after
  the repair; it wasn't part of what was fixed.
- **Updated after Phase 3:** a second, unrelated environment problem
  surfaced mid-Phase-3 — `npm run build` began intermittently failing with
  the same corrupted parent-repo `node_modules` issue already on record
  from the dev server (see "Known risks" below), now hitting production
  builds too. Fixed by pinning `turbopack.root` / `outputFileTracingRoot`
  in `next.config.ts` to this worktree. Re-confirmed stable across three
  consecutive clean builds after the fix. Current state: `tsc` clean,
  `lint` clean, `build` clean and no longer flaky, all 20 routes generate,
  no workspace-root warning at all anymore (previously present even on
  successful builds).

## Exact token and font work completed (Phase 2, 2026-08-18)

- `app/globals.css`: added the complete `02-design-language.md` +
  `05-motion-system.md` token system (color, typography scale, spacing,
  shape/borders, elevation, motion durations/easings) inside `:root`,
  clearly delimited and commented as "defined but not yet consumed."
  Legacy tokens (`--background`, `--foreground`, `--ink`, `--ink-soft`, the
  six `--cs-*` comic-box variables) are byte-for-byte unchanged. `body{}`'s
  `background`/`color`/`overflow-x` are unchanged — only `font-family`
  changed. `.font-serif` now points at `var(--font-newsreader)` instead of
  `var(--font-dm-serif)`. `@theme inline`'s `--font-sans` now points at
  `var(--font-onest)`; `--font-mono` was removed (see Geist Mono below).
- `app/layout.tsx`: `Geist`, `Geist_Mono`, `DM_Serif_Display`, `Caveat`
  removed from `next/font/google` imports; `Newsreader` and `Onest` added.
  `<html>` className updated to the two new font variable classes. `<body>`'s
  `bg-[#fdfaf5] text-neutral-900` classes are **unchanged** — this is the
  deliberate compatibility decision, not an oversight; see the inline
  comment left in the file pointing at Phase 3.
- **Geist Mono verified unused before removal**, per Phase 2 authorization
  item 4: grepped the whole codebase for `font-mono`/`--font-geist-mono`
  and found only the font's own now-removed definition — no real consumer
  existed. Removed.
- **Caveat removed as instructed**, per decision 7. One known, documented,
  expected side effect: `components/Signature.tsx` (not deleted yet — dead-
  code removal is a later phase) still references `var(--font-caveat)`
  directly; since that variable no longer exists, the hand-drawn signature
  now renders in the body fallback font instead of a cursive script until
  Phase 5 removes the component entirely. This is visible but not broken —
  the text is still fully readable.
- Comic-box CSS (`.cs-box`, `.cs-pill`, `.cs-seam`, `.opn-link`,
  `.cs-hover-row`, `.cs-table`) — confirmed untouched by diff inspection.
- No component, page-composition, content, metric, or evidence file was
  touched — confirmed via `git diff --stat` (only `app/layout.tsx` and
  `app/globals.css` appear).

## Exact primitive work completed (Phase 3, 2026-08-18)

- Created `components/layout/Container.tsx`, `Grid.tsx`, `Stack.tsx`,
  `Section.tsx`, `Rule.tsx` — all five primitives from
  `06-component-system.md`, all built directly against the Phase 2 tokens
  (no new hardcoded values).
- Verified against real content in a live browser (production server, not
  the broken dev server): `Container`'s three tested variants render the
  correct `max-width` (1600/1280/760px) and nest without fighting each
  other's padding; `Grid` produces exactly 12 equal columns at desktop
  width with children's `col-span-*` rendering proportionally; `Stack`
  variants produce exact token gap values (128px for `chapter`, confirmed);
  `Section` renders valid heading order with token typography (confirmed
  `h2` computes to Newsreader); `Rule`'s three variants render the exact
  three token colors (`--color-line`, `--color-line-strong`,
  `--color-project-accent`, all confirmed via computed `border-top-color`).
  No console errors, no horizontal overflow at 375px or desktop.
- **The root body-background switch was not done.** See "Current phase"
  above and the roadmap's Phase 3 entry for the page-by-page evidence
  (`/contact`, `/resume` have no background under real text). `app/layout.tsx`
  and `app/globals.css` have zero additional changes since Phase 2 —
  confirmed via `git diff --stat` showing identical line counts to the
  Phase 2 report.
- **Also fixed, outside Phase 3's original scope but necessary:**
  `next.config.ts` now sets `turbopack.root` and `outputFileTracingRoot`
  to this worktree, resolving the workspace-root ambiguity between this
  worktree's and the parent repo's coexisting lockfiles. See "Known risks"
  below for the full reasoning and evidence.

## Exact navigation/footer/action work completed (Phase 4, 2026-08-18)

- **`components/ui/Action.tsx` (new):** one shared action component, three
  variants (`primary`/`secondary`/`text`). Renders a real Next `Link` when
  `href` is passed (navigation), a real `<button>` otherwise (action) — the
  DOM element itself changes based on behavior, not just styling. Full
  interaction states: default, hover, `focus-visible` (ring using
  `--color-focus`), active, `disabled`, `min-h-11` (44px) touch target
  baseline. Text variant keeps a visible underline at rest, not just on
  hover (non-color-only affordance).
- **`components/Nav.tsx` (rewritten):** one `routes` array is the single
  source consumed by both the desktop list and the compact menu. Identity
  left, Work/About/Resume/Contact right, `aria-current="page"` computed
  correctly per route (verified live, including on the identity link when
  on `/`). Header background is now the opaque `--color-surface-1` token —
  the old `backdrop-blur` + translucent-rgba treatment is gone (that was
  the "floating glass-card" pattern the philosophy doc explicitly bans).
  New compact menu, previously entirely missing:
  - Toggle button: `aria-expanded`, `aria-controls`, `aria-label` that
    flips between "Open menu"/"Close menu", `min-w-11 min-h-11`.
  - Panel: `role="dialog"` `aria-modal="true"`, always present in the DOM
    (stable `aria-controls` target) but `inert` when closed — removes it
    from the tab order and interaction with no manual bookkeeping.
  - Opens with focus moved to the first link; Tab/Shift+Tab trapped and
    wrapping correctly at both boundaries; Escape closes and returns focus
    to the trigger button; background scroll locked via `document.body.style.overflow`
    while open and restored on close; route selection closes it
    automatically (state adjusted during render on `pathname` change, per
    React's documented pattern — not an effect, to avoid a
    `react-hooks/set-state-in-effect` lint error caught during this phase).
  - Motion is a single opacity/translate CSS transition on
    `--duration-base`/`--ease-enter`, fully disabled under
    `prefers-reduced-motion` via `motion-reduce:transition-none` (confirmed
    compiled into the CSS output — see "Known risks" for why this couldn't
    be confirmed by literally toggling the OS setting in this browser
    environment). Menu open/close state is never gated on the animation
    finishing, so it stays usable with motion off.
  - Skip-to-content link, first focusable element on every page, using
    Tailwind's standard `sr-only`/`focus:not-sr-only` idiom, targeting the
    new `id="main-content"` on `app/layout.tsx`'s `<main>`.
- **`components/Footer.tsx` (rewritten):** same content as before — one
  contact invitation (new: "Let's connect." — the old footer had none, and
  the Phase 4 spec explicitly requires one), Email and LinkedIn (now via
  `Action variant="text"`), copyright, back-to-top (now via
  `Action variant="secondary"`, styled circular, confirmed exactly 44×44px
  live). Background is `--color-bg`; the old three-color decorative
  gradient top bar is gone (replaced with a single `--color-line` border —
  the multi-hue decorative gradient didn't fit the "gradients reserved for
  light-falloff/data" rule).
- **Two real ESLint errors were caught and fixed properly, not suppressed:**
  a `react-hooks/set-state-in-effect` violation (see above) and a
  `close` referenced before its declaration in the focus-trap effect
  (fixed by declaring it as a `useCallback` earlier in the component and
  adding it to that effect's dependency array).
- **Transitional visual note (not a defect):** Nav and Footer are now
  fully dark, self-contained, token-based surfaces (their own explicit
  background, not relying on `<body>`), sitting as bookends around the
  still-light-legacy page body. This is an intentional, visible mixed-
  system state through Phase 5/6, not an oversight — see "Transitional
  visual safety" in the Phase 4 authorization and the roadmap's Phase 4
  entry.

## Exact hero work completed (Phase 5, 2026-08-19)

- **`components/Hero.tsx` (new):** pure server component, no `"use client"`,
  no client-side JS at all for the reveal — the entrance motion is a
  self-contained `<style>` block with a CSS `@keyframes` rule, the same
  pattern already used by `components/Marquee.tsx` before it was removed.
  Five independent layers, in DOM order:
  1. **Stage field** — the `<section>`'s own `background: var(--color-bg)`.
  2. **Atmospheric wash (PLACEHOLDER)** — an `aria-hidden="true"`,
     `pointer-events-none` absolute div, a soft warm radial gradient.
  3. **Vignette (PLACEHOLDER, optional per spec)** — a second `aria-hidden`
     absolute div, an extremely subtle top-to-edge darkening.
  4. **SVG contour (PLACEHOLDER)** — an inline `<svg>` (not a raster image),
     a single abstract rounded head-and-shoulders outline path, stroke-only,
     `stroke="var(--color-accent)"`, no facial features/props/clothing
     detail. Wrapped in an `aria-hidden="true"` div.
  5. **Semantic content** — h1 (single, page-level), supporting paragraph,
     two `Action`s (`href="/work"` primary, `href="/resume"` secondary) —
     the DOM-first child of the row, so it renders immediately in the raw
     HTML with no client boundary gating it (confirmed via `curl` against
     the production build: the h1 text and "View case studies" link are
     present in the initial response body, and the file contains zero
     `"use client"` occurrences).
- **Reveal motion:** `.hero-contour-path` uses `stroke-dasharray`/
  `stroke-dashoffset` (a classic SVG line-draw technique) with
  `animation: hero-contour-draw var(--duration-hero) var(--ease-enter) 250ms
  1 forwards` — confirmed via computed styles in a live browser:
  `animationDelay: 0.25s`, `animationDuration: 0.85s` (the existing
  `--duration-hero` token, unchanged), plays once (`forwards`, no
  `infinite`), no scroll or hover trigger of any kind exists in the code, so
  it cannot replay on hover/scroll and only replays on a fresh mount (a
  route return to `/` is a fresh mount of this page component under the App
  Router, same as any other page — there is no session-level "already
  played" state; this is a judgment call, see "Any deviation" in the
  completion report). `@media (prefers-reduced-motion: reduce)` sets
  `animation: none; stroke-dashoffset: 0` — confirmed present in the served
  HTML's `<style>` block. Text/actions carry no animation at all, matching
  "essential content stable at 0ms."
- **Responsive composition**, verified live at each named breakpoint:
  - **1024px+ (`lg:`):** confirmed `display:flex; flex-direction:row` on
    the content row — text left, 300px-wide contour right, `self-center`.
  - **768–1023px (`md:`):** confirmed `flex-direction:column` (content
    first, contour below, not side-by-side), contour narrowed to 220px and
    right-aligned via `self-end` (confirmed via bounding-rect: contour's
    right edge sits at the container's right padding edge).
  - **<768px (compact, base):** contour further narrowed to 160px, still
    stacked below and right-aligned (`self-end`), confirmed lower-right via
    bounding rects (contour top well below the paragraph's bottom edge).
  - **<360px:** confirmed via bounding rects at 320px width — wrapper is a
    fixed 130×150px box with `overflow: hidden`; the SVG renders at its
    natural aspect ratio at 220px width (330px tall), so only the top ~45%
    (head/shoulder region) is visible — a purposeful crop, not the full
    figure shrunk to an unreadable size.
  - No horizontal overflow at any tested width (1440/1024/768/375/320 —
    `document.documentElement.scrollWidth === clientWidth` confirmed at
    each).
- **Content hierarchy and copy:** preserved existing verified wording
  exactly — h1 "I design products for messy real-world workflows."
  (emphasis now `--color-accent` instead of the retired `rose-500`, since
  the multi-accent system is gone), the same four-sentence supporting
  paragraph, "View case studies" → `/work`, "See resume" → `/resume`. No
  metric, availability claim, or role positioning was invented. One copy
  item is flagged for an editorial decision, not resolved unilaterally: the
  old hero's "Open to full-time roles" pill has no slot in the new five-item
  hierarchy (value prop / context / primary action / secondary action /
  contour) and was dropped rather than relocated — say if it should reappear
  somewhere (footer, `/contact`) or stay retired.
- **Superseded devices removed:** `components/Marquee.tsx`,
  `components/Signature.tsx`, `components/RotatingWord.tsx` deleted after
  re-confirming (grep, immediately before deletion, not assumed from the
  Phase 1 inventory) zero remaining references anywhere except their own
  files and one comment in `app/layout.tsx`, which was updated to describe
  the removal instead of anticipating it. `app/page.tsx`'s local `Tag` and
  `PhotoStack` helpers (only ever used by the old hero markup this phase
  replaced) were removed as dead code in the same file being rewritten —
  not a separate case-study-component dead-code pass, which remains
  out of scope per the roadmap. The rotating "I build [phrase]" headline is
  now the static "I build systems people actually use." — reusing the first
  (and most general) entry from the retired `manifestoWords` array verbatim,
  not new copy.
- **What did not change:** the Selected case studies grid, the Work
  experience timeline, the craft-manifesto stat values, and the CTA block —
  all explicitly out of scope for Phase 5 (Selected Experience/featured-set
  work is Phase 6) and confirmed untouched via diff review beyond the one
  headline-text edit above.

### Post-Phase-5 correction (2026-08-19, same day, after the eleven docs were copied in)

Once the real `04-hero-system.md` became available, three gaps between it
and the already-completed Hero.tsx were found and fixed immediately (small,
contained, re-validated — not treated as a new phase):

1. **Contour styling was wrong.** The doc requires `var(--color-text)`
   stroke at 60–75% opacity, ~2.5–3px weight. The original implementation
   used `--color-accent` at full opacity, 2px (a reasonable guess made
   without the real doc, but wrong). Fixed to `stroke="var(--color-text)"`,
   `strokeOpacity="0.7"`, `strokeWidth="2.75"`, `strokeLinecap="round"`.
   Confirmed live: computed `stroke: rgb(241, 232, 219)` (exactly
   `--color-text`), `strokeOpacity: 0.7`, `strokeWidth: 2.75px`.
2. **Missing the optional light bloom.** The doc's motion table specifies a
   1200–1500ms, 3–5% brightness increase after the contour settles at
   1100ms. Added a `hero-bloom` keyframe (`filter: brightness(1)` →
   `brightness(1.04)`) on the atmosphere layer, `animation-delay: 1200ms`,
   `animation-duration: 300ms`, `forwards`, disabled under
   `prefers-reduced-motion`. Confirmed live via computed style.
3. **"No replay on route return" is an explicit Non-goal in the doc**, not
   just an ambiguous phrase — the original Phase 5 report had flagged this
   as an open judgment call rather than fixing it. Added a small inline
   `<script>` (not a React client component — no hydration boundary, no
   effect on how fast the h1/actions render) that sets a
   `sessionStorage` flag on first hero view and adds a `hero-contour-skip`
   class to `<html>` on every subsequent one; a CSS rule under that class
   disables the contour-draw and bloom animations and jumps straight to
   their end state. Confirmed live: navigating away and back sets
   `htmlHasSkipClass: true`, `strokeDashoffset: 0px`,
   `animationName: "none"` on return, while a first-ever visit (fresh tab)
   still plays the full sequence.

Re-validated after these fixes: `tsc` clean, `lint` clean, `build` clean
(20/20 routes), and a fresh browser check confirmed all three corrections
live plus no console errors, no overflow (a couple of stale
`ERR_CONNECTION_REFUSED` console entries from the mid-check server restart
were ruled out via a brand-new tab, which loaded with zero console output).

### Post-Phase-5 correction, round 2 (2026-08-19, same day, after reading all eleven docs in full)

Per explicit instruction, all eleven foundation documents were read in full
before any further work, and Phase 5 was re-audited against the real
`04-hero-system.md` and `05-motion-system.md` specifically (not just
skimmed against the round-1 fixes). Two more material conflicts were found
— both structural, not cosmetic — and fixed:

1. **Contour composition/sizing conflicted with `04`'s explicit numbers.**
   `04-hero-system.md`: "The outline sits on the right... occupies roughly
   25–35% of stage width" (large) / "reduce figure to 25–30% width" (medium).
   The flex row had no `justify-content` set (`normal`, i.e. pack-left), so
   at 1440px the contour sat right next to the text with **435px of dead
   space** between it and the stage's right margin — nowhere near "on the
   right" — and measured only 21.1% of stage width, under the documented
   range. Root cause: a fixed-pixel contour width (`lg:w-[300px]`) inside a
   flex row with default `justify-content`. Fixed by adding
   `lg:justify-between` to the row (anchors text to the left edge and the
   contour to the right edge, exactly matching "text anchors the left side...
   the outline sits on the right") and switching the contour to percentage
   widths (`md:w-[27%] lg:w-[30%]`) so it lands inside the documented range
   at any viewport width instead of drifting at the extremes of a fixed-px
   value. Confirmed live at 1440px: `justifyContent: "space-between"`, only
   72px of space right of the contour (the container's own right page
   margin, not dead space), contour measuring 27.0% of stage width.
2. **The reveal technique itself was the exact anti-pattern `04` names.**
   `04-hero-system.md`'s motion table: "Stroke, mask, and opacity reveal
   move subtly from lower figure upward... The reveal should feel like the
   figure emerging from fog, **not a hand literally drawing every line**."
   Round 1's fix corrected the contour's color/opacity/weight but left the
   original `stroke-dasharray`/`stroke-dashoffset` line-draw technique in
   place — which is precisely "a hand literally drawing every line," the
   thing the document explicitly rules out. Replaced with a CSS `mask-image`
   (linear-gradient, soft-edged, `mask-position` animated upward) on the
   sizing wrapper combined with an opacity fade (`0 → 0.7`) on the path
   itself — genuinely combines stroke + mask + opacity as the doc specifies,
   and reads as an emergence rather than a trace. Same timing as before
   (250ms delay, 850ms duration, settles at 1100ms — untouched, was already
   correct), same reduced-motion and route-return-skip handling, now
   targeting the new animation names/properties instead of the old
   dash-offset ones. Confirmed live in a genuinely fresh browser tab (not
   reusing a tab that had already set the replay-skip flag): first visit
   plays `hero-contour-fade`/`hero-contour-sweep` with the correct
   0.25s delay/0.85s duration; a returning visit correctly shows both as
   `animationName: "none"` with the final settled state.

Re-validated again after these fixes: `tsc` clean, `lint` clean, `build`
clean (20/20 routes), live browser confirmation of both fixes as described
above, no console errors, no horizontal overflow. No other Phase 5 content
(copy, layout structure outside the contour, what did/didn't change) was
touched in this pass — per instruction, only material conflicts were
addressed, nothing was redone for its own sake.

## Exact Phase 6 work completed (2026-08-19)

### Proof-map exercise (09-storytelling-system.md)

Run against all eight case studies before touching the featured set:

| Project | Primary competency | Secondary competency | Memorable decision | Credible outcome | Limitation |
|---|---|---|---|---|---|
| RoomEase | Product/UX design | Systems thinking | Building a real conflict-prevention backend after Peer Critique showed frontend-only couldn't cut it | Measured usability/satisfaction/time/click deltas from controlled testing | Capstone prototype, not a production system |
| ForceN | Systems/process design | Cross-functional ops coordination | Standardizing tracking/QA across hardware configurations | Reduced turnaround/errors (qualitative in the case study body; % figures live only in `experience.ts`, not asserted here) | Reconstructed workflow; internal tooling omitted for confidentiality |
| Greenhouse | Visual/brand design | Product ops (inventory/UID tracking) | Treating each channel as its own format instead of one master file | Consistent brand across channels + shared tracking (no quantified metric — `metrics: []`) | No numeric outcome available |
| PathPeer | Product management | Behavioral/analytics research | Building a mentor tagging taxonomy from Hotjar+GA evidence | 50%/40% engagement/drop-off deltas (explicitly caveated as platform-wide, not feature-isolated) | Numbers aren't isolated to the specific feature work |
| Hera Fertility | 0-to-1 product design | UX research (Hotjar/GA) + competitive analysis | Collapsing a 4-field address step to 1 autofill field | Shipped segmentation flow + concrete process metrics | No preserved post-launch usability/analytics results |
| Informatica | Product operations | Cross-team research-to-decision translation | Splitting an ambiguous curriculum into 4 independently buildable tracks | 18%/20%/30% internship-wide metrics (internal reporting, explicitly not project-isolated) | Same isolation caveat as PathPeer |
| Pill Pal | HCI/usability evaluation | Accessibility-aware design | Prioritizing a confirmation step before emergency calls | 20 ranked, fix-mapped usability issues from a 4-evaluator heuristic eval | Course project, not shipped/real users |
| Chronicle | AI systems architecture | Product judgment (documented framing pivots) | Deterministic contracts + mock pipeline before any model call | Two investigations on one generic contract, a real local model wired end-to-end, 500+ passing tests | Agent layer not yet built; no human comprehension study yet |

**Featured set kept unchanged** (roomease, forcen, greenhouse, pathpeer):
they cover four genuinely distinct competencies — product/UX design,
systems/process ops, visual/brand craft, and analytics-driven PM — with no
real redundancy between them. **Chronicle is flagged, not added**: it is the
only project proving AI/technical-systems competency, which none of the
current four touch at all, and is arguably the most differentiated project
in the portfolio for a 2026 audience. Per the roadmap's explicit instruction
for this phase ("if [the proof-map exercise surfaces a different set], that's
a content decision worth surfacing back to you before locking it in"), this
was not decided unilaterally — see "Current phase" above.

### Components built

- **`components/ui/ProjectIndexItem.tsx` (new):** the shared editorial index
  row from `06-component-system.md` — number, title, one-line problem/
  outcome, role/category + year, one semantic link (the whole row is the
  `<Link>`, satisfying "entire row is interactive but contains one semantic
  link"). `selected`/`complete` variants change type scale and padding only,
  not the information hierarchy. **No thumbnail/media** — deliberately: no
  single visual asset exists consistently across all eight projects, and
  inventing placeholder imagery isn't a decision this pass should make. The
  large index numeral is the row's one purposeful visual instead. Flagged
  here as a content gap, not silently resolved.
- **`components/SelectedExperience.tsx` (new):** replaces the old dashed-line/
  circular-marker timeline with concise rule-separated rows — organization,
  role, period, one specific contribution (`experience.ts`'s existing
  `synopsis` field), optional "Read the case study" link. All five existing
  internships are shown; there is no larger pool to curate from, so "strongest/
  most relevant roles only" is satisfied by the existing record rather than
  by cutting real professional history.

### Pages changed

- **`app/page.tsx`:** "Selected case studies" (equal-card grid) replaced by
  "Selected work" using `ProjectIndexItem` (`selected` variant) for the
  featured four. "Work experience" (decorative timeline) replaced by
  "Selected Experience" using the new component. Craft-manifesto/stat-strip
  and the CTA block are untouched — not named in Phase 6's scope, already
  updated in Phase 5 for the static headline.
- **`app/work/page.tsx`:** hero band migrated to tokens/`Container`; the
  page's own `backgroundAttachment: fixed` decorative gradient (explicitly
  named as an anti-pattern in `01-design-philosophy.md`) removed in favor of
  `--color-bg`.
- **`components/WorkTabs.tsx`:** kept the existing Experience/Projects tab
  IA unchanged (real working behavior, not superseded by anything in the
  foundation docs) — only swapped `CaseStudyCard` for `ProjectIndexItem`
  (`complete` variant) inside both tabs, restyled the tab buttons to tokens,
  added `role="tab"`/`aria-selected`. The "in development, no case study yet"
  fallback path is preserved (currently unreachable — every entry in
  `projects.ts` has a case study today — but kept since removing an unused
  branch wasn't asked for and the data could change).
- **`app/about/page.tsx`, `app/resume/page.tsx`, `app/contact/page.tsx`:**
  hardcoded gradients/hex colors replaced with tokens; content, structure,
  and information unchanged. **`/resume`'s top section and `/contact`'s
  links block — the two gaps Phase 3 identified as blocking the
  body-background flip — now have real explicit section backgrounds**
  (previously relied entirely on the light legacy body).
- **`app/layout.tsx`:** `<body>` flipped from `bg-[#fdfaf5] text-neutral-900`
  to `style={{ background: "var(--color-bg)", color: "var(--color-text)" }}`
  — confirmed live: `getComputedStyle(document.body).backgroundColor` ===
  `rgb(11, 12, 15)` (`--color-bg`), `.color` === `rgb(241, 232, 219)`
  (`--color-text`), on every core route.
- **`components/CaseStudyCard.tsx` deleted** after re-grepping for zero
  remaining references (its only two call sites, the homepage and
  `WorkTabs.tsx`, were both already migrated). `Tag.tsx`/`ProjectIcon.tsx`
  were checked and are still actively used by several `*CaseStudy.tsx`
  detail components — left untouched.

### Case-study detail pages — confirmed unaffected

The eight bespoke `*CaseStudy.tsx` components (out of scope until Phase 7-9)
were **not** touched. Verified live on Greenhouse's page that the body flip
doesn't break them: their root sections already carry their own explicit
light background (e.g. `rgb(243, 246, 238)`, confirmed via computed style at
the first non-transparent ancestor), so they remain fully self-contained
light pages regardless of the now-dark `<body>` behind them — the same
conclusion Phase 3's original coverage check reached for these pages.

### Validation

`tsc` clean, `lint` clean, `build` clean (20/20 routes). Live browser checks
via a production server: homepage, `/work` (both tabs, switched via a
dispatched DOM click after the `computer` tool's coordinate click
unexpectedly landed on a case-study link twice in a row — worked around by
triggering the tab button's `.click()` directly via `javascript_tool` and
re-reading state after a tick), `/about`, `/resume` (download link/`Action`
integration confirmed), `/contact`, and one case-study detail page
(Greenhouse) — zero console errors on every route. No horizontal overflow at
320/375/768/1024/1440/1920px (all six roadmap-required widths, homepage).
Single `h1` confirmed on every core page. `ProjectIndexItem` rows confirmed
keyboard-focusable (`document.activeElement` check).

## Exact Phase 7 (audit) and Phase 8 (homepage reconcept) work completed (2026-08-19)

**Phase 7 was audit-only — no code changed.** Produced
`docs/redesign/REFERENCE-AUDIT.md`: a factual extraction of the current
implementation (via a research subagent reading every core file directly,
not from memory) against 7 live-reviewed Priority-1 reference portfolios
(Sam Dickie, Kane Sherwell, Havana Nguyen, Moritz Oesterlau, Gloria Lo,
Pratibha Joshi, Nicolas Backal, Aarron Walter) plus the already-verified
reference library from an earlier engagement (Meng To, Josh Warner, Matthew
Yu, Mercury, etc.) and the project's own foundation docs. Top finding:
`06-component-system.md` line 66 requires "purposeful thumbnail or media"
on every Project index item; `ProjectIndexItem.tsx` (built in Phase 6)
deliberately omitted it — the single biggest reason the homepage read as
generic. Full findings, the extended reference-translation table, and the
five-pass Phase 8 plan are in that document; not duplicated here.

**Between Phase 7 and Phase 8**, three homepage information-architecture
concepts were explored conversationally (not committed to files, per that
exercise's own "no code" instruction) — "The System View" (diagram-led),
"The Proof List" (credibility-led), "Before/After" (transformation-led) —
and a governing internal metaphor was identified: **cartography**, kept
strictly internal per your explicit instruction ("do not make the
portfolio about maps... treat cartography as an internal design metaphor,
not a visible brand"). The public-facing governing principle is
**"Reveal Structure"** — every implementation decision should make
ambiguity resolve into legibility, without ever surfacing map iconography,
literal metaphor language, or new decorative motifs. This reframes rather
than replaces the Phase 5 hero animation (the fog→legible-line reveal
already *is* Reveal Structure) and constrains every Phase 8 pass below.

### Phase 8 passes completed this session

1. **Token cleanup (Pass 1).** `app/page.tsx`'s two remaining raw-hex
   sections retokenized: the stat-strip's 3-stop decorative gradient
   → `var(--color-surface-1)` solid (also resolves
   `01-design-philosophy.md`'s "decorative gradients without semantic
   purpose" anti-pattern), and the CTA block's light peach gradient +
   raw `<a>` → `var(--color-surface-2)` + the shared `Action` component
   (closes a second gap: it wasn't using the one-button-API component
   before). All `text-neutral-*`/`font-serif` Tailwind utility classes in
   both sections replaced with the token set.
2. **Hero rewrite (Pass 2).** Headline changed from the generic
   `"I design products for messy real-world workflows"` template to
   `"I take what's fragmented, ambiguous, or hard to run and make it
   work"` — states the throughline directly instead of a role+audience
   formula. Subhead rewritten to front-load two named employers
   (ForceN, Greenhouse) and the University of Waterloo capstone, plus one
   hard measured number (RoomEase's 50%→88% usability jump), replacing the
   previous activity-list sentence that named no organization. No layout,
   animation, or structural change — copy-only, per the audit's own
   recommendation that the existing fog-reveal animation already embodies
   Reveal Structure and shouldn't be rebuilt.
3. **Project media (Pass 3).** Added `heroMedia?: { src, alt }` to the
   `CaseStudy` content type (`lib/content/case-studies.ts`) — matches
   `06-component-system.md`'s own documented content-API example field
   name (`heroMedia`). Populated for all 8 case studies using assets that
   already existed in `public/case-studies/` (no new photography/
   production): roomease→`hero.png`, forcen→`homepage-hero.png`,
   greenhouse→`greenhouse-hero-collage.jpg`, pathpeer→`pathpeer-hero-home.png`,
   hera-fertility→`source-payment-homepage-cards.png`, pill-pal→
   `figma-horizontal-prototype.png`, informatica→`informatica-logo.png`
   (no screenshot asset exists for this one; a client-name mark used as row
   media has direct precedent in Kane Sherwell's "My Works" list, which
   shows client logos), chronicle→`map-concert-of-europe-1815.jpg`.
   `ProjectIndexItem.tsx` now renders an optional `image` prop: a small
   fixed-aspect frame, hairline border, desaturated (`grayscale`) by
   default and resolving to full color on hover/focus using the *existing*
   `--duration-base`/`--ease-standard` hover tokens already used elsewhere
   (Action, Nav, WorkTabs) — not a new motion pattern, and a literal small-
   scale echo of the hero's own "resolves into legibility" move. Wired into
   both `app/page.tsx` (`selected` variant) and `WorkTabs.tsx`
   (`complete` variant, both tabs) so `/work` isn't left inconsistent.
4. **Weight break (Pass 4).** Added an `emphasis?: boolean` prop to
   `ProjectIndexItem`. When true, the row's media renders full-width at a
   wider `aspect-[21/9]` beneath the text instead of as a small inline
   thumbnail — changing media ratio only, per `06-component-system.md`'s
   explicit allowance ("Variants may change media ratio, not the
   information hierarchy"); title/description type scale are untouched.
   Applied to exactly one row: RoomEase, on the homepage only — chosen as
   the featured project with the clearest, most quantified fragmented→
   resolved story (34+ disconnected booking sites → one system; 50%→88%
   usability in controlled testing), not as "the favorite."
5. **Case-study token bridge (Pass 5) — not started.** Correctly scoped in
   `REFERENCE-AUDIT.md` as scoping-only, not full execution, given its size
   (7 case-study files + shared `blocks/`). Not attempted this session;
   remains future work, sequenced after this Phase 8 report is approved.

### Files changed this pass

`lib/content/case-studies.ts` (added `heroMedia` field to the interface and
all 8 entries), `components/ui/ProjectIndexItem.tsx` (added `image` and
`emphasis` props), `components/Hero.tsx` (headline/subhead copy only),
`app/page.tsx` (retokenized stat-strip/CTA, wired `image`/`emphasis` into
the featured rows, added an `Action` import), `components/WorkTabs.tsx`
(wired `image` into both tabs). No other files touched.

### Bug found and fixed during this pass's own QA

The non-emphasis image column had no grid-placement override below `md`:
`grid-cols-[auto_1fr]` only defines two explicit column tracks at compact
widths, so the image (a third grid child) became an unsized implicit
column instead of stacking full-width beneath the text as intended —
confirmed live via `getBoundingClientRect()` (thumbnails rendering at
44×33px instead of a real thumbnail size). Fixed by adding
`col-span-2 md:col-span-1` to that div. Re-verified at 375px, 777px
(this environment's native/desktop width), and on `/work`'s both tabs —
correct sizes and no horizontal overflow (`scrollWidth === innerWidth`)
at all three.

### Validation

`tsc --noEmit` clean, `npm run lint` clean, `npm run build` clean
(20/20 routes) — all re-run after the grid-placement fix above, not just
before it. Live checks via `next dev`: all 8 `heroMedia` image URLs
resolve `200` (fetched directly), homepage's 4 rows and `/work`'s both
tabs (Work experience: 5 rows, Projects: 3 rows) render images at correct
box sizes, RoomEase's emphasis row measured at the expected ~21:9 ratio on
both desktop and mobile, no horizontal overflow at 375px or this
environment's native desktop width. One pre-existing, unrelated console
warning (a dev-server-only hydration mismatch on `<html className>`,
present before any Phase 8 change and absent from the production build)
persists — not a regression, not investigated further per its established
status from earlier phases. This environment's Browser-pane screenshot
compositor is non-functional this session (times out on every capture,
independent of viewport size) — verification here is DOM/computed-style/
network-based, not pixel screenshots; disclosed rather than worked around
with a fabricated image.

## Known risks and placeholders

- ~~**Missing foundation-document files.**~~ — **resolved, 2026-08-19, same
  day.** The eleven documents were never missing from the project, only from
  this worktree — they existed all along at
  `D:\Full time Grind\Portfolio\docs\redesign\` (the parent repo checkout)
  and simply hadn't been copied over when this worktree was created. The
  user provided the copy command; all eleven now exist in this worktree's
  `docs/redesign/` (untracked as of this writing) and have been read in
  full. Two rounds of re-auditing Phase 5's Hero.tsx against the real docs
  found five real gaps total (contour color/opacity/weight, missing light
  bloom, missing route-return replay guard in round 1; contour composition/
  sizing and the reveal technique itself in round 2) — see both
  "Post-Phase-5 correction" sections above; all five are fixed and
  re-verified. **Lesson for future sessions:** if a cited governing document
  can't be found via `Glob`, check whether it exists in a sibling worktree
  or the parent repo checkout before assuming it was never written —
  `git worktree list` or checking the parent
  directory is a five-second check that would have caught this immediately
  at Phase 5's start instead of after the fact.
- **Hero assets are placeholders, not final — implemented Phase 5, still a
  release blocker.** The atmospheric wash and SVG contour in
  `components/Hero.tsx` are deliberately simple, clearly commented as
  `PLACEHOLDER`, and decorative/`aria-hidden`. Decision 15's requirements
  (independent layer architecture preserved even for the placeholder; not
  polished; not production-approved) were followed. Final assets remain a
  hard Phase 12 release blocker.
- **Resolved in Phase 4** — `Nav.tsx` now has a real, verified
  focus-trapped, Escape-closing compact menu; see the Phase 4 section
  above.
- **This browser automation environment never has real document focus**
  (`document.hasFocus()` is `false` throughout, confirmed 2026-08-18 during
  Phase 4). `document.activeElement`-based checks are fully trustworthy;
  CSS `:focus`/`:focus-visible`/`:focus-within` pseudo-class *styling*
  never visually engages here regardless of implementation correctness.
  Discovered the hard way: an initial skip-link implementation
  (`-translate-y-16` / `focus:translate-y-0`) looked broken under a
  DOM-level test and was replaced with the more standard
  `sr-only`/`focus:not-sr-only` idiom — the replacement is fine and is now
  the implementation, but the original was very possibly not actually
  broken; the test just couldn't tell. Don't over-trust an apparent
  focus-styling failure in this environment without checking
  `document.hasFocus()` first.
- ~~**Motion values already exceed the new spec** in `CaseStudyCard.tsx`
  (`scale-[1.02]` + `-0.4deg` rotate on hover...)~~ — **moot, Phase 6:**
  `CaseStudyCard.tsx` is deleted. **Still open:** `Reveal.tsx` (700ms/20px vs.
  `05-motion-system.md`'s 280–500ms/8–16px Section-reveal range) — still in
  active use site-wide (Hero-adjacent sections, case studies), needs tuning
  in a later phase, not rebuilding.
- **No automated regression tests** — every phase's validation leans on
  typecheck, lint, build, and manual/browser inspection. Be more careful
  with diffs than you would be with a test safety net.
- **Partially fixed in Phase 3 — production build/start now reliable;
  `npm run dev` still untested.** Root cause, diagnosed 2026-08-18: this
  worktree and the parent repo (`D:\Full time Grind\Portfolio`) both have
  their own `package-lock.json`. Next/Turbopack's workspace-root inference
  picked the **parent** as the root and resolved shared packages —
  including `next` itself — from the parent's `node_modules`, whose
  `next/dist/compiled/react` directory is corrupted at the OS level ("The
  file or directory is corrupted and unreadable," a pre-existing condition
  unrelated to anything this session touched — this session never wrote to
  the parent's `node_modules`). This first surfaced in `next dev` (Phase 2),
  then started intermittently hitting `next build` too during Phase 3
  (two build attempts with identical source failed this way, two others
  with zero source changes succeeded — genuinely non-deterministic, not
  reproducible on demand). Fixed by adding explicit `turbopack.root` and
  `outputFileTracingRoot` to `next.config.ts`, pinning both to this
  worktree — exactly what Next's own warning message recommended. Confirmed
  stable across three consecutive clean builds afterward, and the
  workspace-root warning no longer appears at all (previously present even
  on the builds that succeeded). **`npm run dev` itself was not
  re-tested after this fix** — Phase 3 verification used `npm run build` +
  `npm start` throughout, consistent with Phase 2. If a future phase wants
  live-reload dev-server access, try `npm run dev` again first; it may
  simply work now given the same config now governs both.
- **When testing via `npm start` on a specific port, verify the port is
  actually free first** (`netstat`) — this session hit a false-positive
  200-OK from an unrelated pre-existing process squatting on a chosen port,
  which briefly looked like a Phase 2 regression (stale Geist font showing
  up) before being traced to the wrong process entirely. Not a project bug.
- **The lint environment needed two repair passes in this session**: the
  first `npm ci` fixed the original "Cannot find module 'resolve'" error,
  but a subsequent lint run hit a second, unrelated failure — a genuinely
  corrupted file at `node_modules/@babel/parser/lib/index.js`
  (reproducible `SyntaxError`, not a transient read glitch). A full clean
  reinstall (`rm -rf node_modules && npm ci`) resolved it, confirmed stable
  across three subsequent lint runs. If lint fails again with a similarly
  strange in-file syntax error (not a missing-module error), suspect
  another corrupted install artifact and repeat the clean-reinstall step
  before suspecting the source code.

## Remaining roadmap phases (see `IMPLEMENTATION-ROADMAP.md` for full detail)

Renumbered 2026-08-19 to insert the audit/reconcept work actually done this
session (Phase 7 audit, Phase 8 homepage reconcept) ahead of the
originally-numbered case-study-shell work, which shifts down by two:

9. Shared case-study shell and evidence components *(current target once Phase 8 is approved)*
10. Greenhouse pilot migration — **mandatory approval checkpoint before Phase 11**
11. Rollout across the remaining seven case studies
12. Diagram-system migration
13. Storytelling and evidence-quality pass
14. Responsive, accessibility, performance, and production QA — **hero-asset replacement is a standing release blocker here**

Also still open, carried from Phase 8's audit and not resolved by it: **Pass
5** (case-study token bridge) was deliberately scoped-only, not executed —
`components/case-study/*` still uses the legacy `.cs-box` comic-panel
system entirely separate from the homepage's token system. This is the
largest remaining structural gap in the whole site (see
`REFERENCE-AUDIT.md`'s Case Study Audit #1) and should be sequenced
deliberately as part of Phase 9, not folded silently into it.

## Exact next action

Phase 8 (homepage reconcept, Passes 1–4 of the 5 scoped in
`REFERENCE-AUDIT.md`) is complete: token cleanup, hero copy rewrite, project
media on every `ProjectIndexItem` row, and one deliberate weight break on
RoomEase. Pass 5 (case-study token bridge) was intentionally left as a
scoping note only. The next action is: **wait for explicit approval, then
start Phase 9** ("Shared case-study shell and evidence components"). Read
`06-component-system.md` and `07-case-study-system.md` in full at the start
of that phase. Do not start Phase 9 without approval recorded in the
conversation. If picking this up cold with no visible approval, ask. Also
carry forward the open Chronicle featured-set question noted under "Current
phase" above — it's unresolved, not forgotten, and unaffected by Phase 8
(the featured four are unchanged; only their rows now carry real media).

## Files currently changed

Run `git status --short` for ground truth. As of this document's last
update:
- **Application code:** `app/layout.tsx` (Phase 2 font swap + Phase 6 body
  flip), `app/globals.css` (Phase 2), `next.config.ts` (Phase 3),
  `components/layout/{Container,Grid,Stack,Section,Rule}.tsx` (Phase 3),
  `components/Nav.tsx`, `components/Footer.tsx`, `components/ui/Action.tsx`
  (Phase 4), `components/Hero.tsx` (new, Phase 5, corrected twice post-
  completion), `app/page.tsx` (rewritten Phase 5, rewritten again Phase 6),
  `app/work/page.tsx`, `components/WorkTabs.tsx`, `app/about/page.tsx`,
  `app/resume/page.tsx`, `app/contact/page.tsx` (all Phase 6), new
  `components/ui/ProjectIndexItem.tsx`, `components/SelectedExperience.tsx`
  (Phase 6). Deleted: `components/Marquee.tsx`, `components/Signature.tsx`,
  `components/RotatingWord.tsx` (Phase 5), `components/CaseStudyCard.tsx`
  (Phase 6). **Phase 8 additions:** `lib/content/case-studies.ts`
  (`heroMedia` field, all 8 entries), `components/ui/ProjectIndexItem.tsx`
  (`image`/`emphasis` props), `components/Hero.tsx` (copy only), `app/page.tsx`
  (retokenized 2 sections + wired media/emphasis), `components/WorkTabs.tsx`
  (wired media). Confirmed via `git diff --stat`/`git status` — no other file
  under `app/`, `components/`, or `lib/` changed.
- **Documentation:** `docs/redesign/SUPERSEDED.md`, `00-INDEX.md`,
  `IMPLEMENTATION-ROADMAP.md`, `14-current-state-summary.md`,
  `MIGRATION-INVENTORY.md`, `CURRENT-HANDOFF.md` (this file),
  `REFERENCE-AUDIT.md` (new, Phase 7), the eleven
  foundation documents (`00-portfolio-vision.md` through
  `10-review-checklist.md`, copied in from the parent repo, currently
  untracked), plus the earlier round of supersession notices on
  `02-artifact-reality-and-treatment.md`, `03-homepage-and-hero.md`,
  `04-selected-case-studies.md`, `05-sections-design-work-how-i-work.md`,
  `06-project-card-types.md`, `08-metrics-audit.md`, `09-skills-section.md`,
  `10-visual-style.md`, `11-implementation-checklist.md`,
  `12-visual-direction-decisions.md`, `13-final-hero-homepage-spec.md`,
  `15-dark-section-gradient-options.md`, `CARD_REWRITE_INSTRUCTIONS.md`,
  `01_HERA_FERTILITY_IMPLEMENTATION.md`, `02_PATHPEER_IMPLEMENTATION.md`,
  `03_INFORMATICA_IMPLEMENTATION.md`, `04_OVERNIGHT_EXECUTION_AND_QA.md`,
  and root `PORTFOLIO_CASE_STUDY_SYSTEM.md` /
  `WORK_EXPERIENCE_AND_GLOBAL_POLISH_V3.md`.
- Nothing has been committed. `git status`/`git diff` are the live source
  of truth, not this list — re-run them rather than trusting this
  paragraph if any doubt.

## Approval checkpoints

- **Phase 8 is complete and awaiting approval right now** — do not begin
  Phase 9 until that approval is visible in the conversation.
- **Every phase requires explicit approval before the next one starts** —
  this project has been run phase-by-phase with a stop-and-report at the
  end of each one; don't assume approval carries forward.
- **Phase 10 → Phase 11 is a hard, named gate** (was numbered 8→9 before
  the Phase 7/8 insertion): side-by-side old/new comparison plus
  `10-review-checklist.md` results for Greenhouse specifically, presented
  and approved, before any of the other seven case studies are touched.
- ~~Phase 14 cannot pass with placeholder hero assets still in place.~~ —
  **resolved, 2026-08-25.** Final atmosphere + contour assets implemented
  in `components/Hero.tsx` (files copied to `public/hero/`). Hero copy is
  still the placeholder text pending separate approval — only the visual
  layers are final. See the "Hero final visual" section further below for
  what changed, including a real reveal-mask bug found and fixed during
  implementation (the old sweep technique never actually reached full
  reveal for a box this tall — it worked "well enough" for the old
  abstract placeholder shape only because that shape barely used its own
  top region).
- The "Reveal Structure" governing principle (see the Phase 7/8 section
  above) and the internal-only cartography metaphor behind it apply to
  every remaining phase, not just Phase 8 — carry it forward without
  re-deriving it, and never surface map iconography or literal metaphor
  language in the public-facing site.

---

## Phase 11 — Shared case-study shell (Greenhouse pilot)

**Status: built and self-verified, stopped for review.** No live route
changed. `components/case-study/GreenhouseCaseStudy.tsx` is untouched and
is still what `/work/greenhouse` renders.

**What was built** (`components/case-study/shell/`): `CaseStudyHero`,
`CaseStudyTOC`, `CaseStudySnapshot` (generic labeled-fact-block grid —
serves both the "at a glance" pattern and 07's Executive Summary),
`Metric` (structural rebuild per 06 — large plain value, no card),
`FigureCaption`, `Quote`, `BeforeAfter`, `DecisionBlock`,
`RoleScopeMetadata`, `NextProject` — every evidence component in 06's
list, typed, zero hardcoded project colors (accent comes from
`--color-project-accent`, set once per case study on its root wrapper).
`Quote`/`BeforeAfter`/`DecisionBlock`/`NextProject` exist and typecheck
but are **not exercised by Greenhouse's real content** — Greenhouse has
no attributed quotes, before/after states, explicit decision records, or
an assigned next-project recommendation today. They'll get their first
real content when a case study that has this content migrates.

**Retinted, not rebuilt** (same file name, moved to `shell/` rather than
edited in place — see below): `Chapter`, `ProcessFlow`, `CategoryGrid`.
Logic/interaction/spacing unchanged (`ProcessFlow`'s active-step state,
crossfade, and row alignment took several dedicated bugfix passes
historically — preserved exactly); only `.cs-box`/`--ink`/`font-serif`
moved onto the dark-field token set. `Icon.tsx` needed no change (already
`currentColor`, token-agnostic).

**Why duplicate files instead of editing `components/case-study/blocks/*`
in place:** those originals are still live-imported by the other seven
bespoke case-study components (ForceN, Hera, RoomEase, Pill Pal, PathPeer,
Informatica, Chronicle), none of which are in scope yet. Editing them in
place would have changed those seven pages' live rendering immediately —
exactly what this phase is not allowed to do. The `blocks/` originals get
deleted once every consumer has migrated onto `shell/`, per 06's own
migration plan (step 5: "remove old implementations only after no active
references remain").

**Composition:** `components/case-study/GreenhouseCaseStudyV2.tsx`, built
against Greenhouse's real content from `lib/content/case-studies.ts` and
`lib/content/greenhouse-channels.ts`. Two data-file corrections made as
part of this migration (moving existing content into its intended home,
not inventing anything): Greenhouse's `metrics` array was empty in the
data file while the live component hardcoded four real outcome
percentages inline — those four values are now in `cs.metrics` verbatim.
Similarly `cs.outcome` held a shorter, differently-worded 3-item list than
what the live page actually shows (its own hardcoded 4-item list) — the
data file's `outcome` field is now the real, live 4-item text verbatim.
Added `atAGlance?: {label, value}[]` to the `CaseStudy` interface for the
Role/Scope/Channels facts, populated for Greenhouse.

**Verification done:** `tsc --noEmit`, `npm run lint`, `npm run build` all
clean (21 routes generate, including the temp preview route below).
Browser-checked at 1440px and 375px: no horizontal overflow at either
width, DOM-verified section order (cover → at a glance → outcome metrics
→ visual design → behind the visuals → process → outcomes) with no
overlap, `ProcessFlow`'s tab interaction confirmed working (state updates
on click), all 9 images have alt text, exactly one `h1`, no skipped
heading levels. **Not yet done:** a full 10-review-checklist.md pass
(System/Story/Experience, per Phase 12's own validation step) — the check
above is a lighter spot-check, not that full pass; WCAG contrast
measurement; manual keyboard-only and screen-reader walkthrough.

**Temporary preview route:** `app/dev/greenhouse-v2/page.tsx` → renders
`GreenhouseCaseStudyV2` at `/dev/greenhouse-v2`. Not linked from any nav.
Delete once reviewed — either discarded, or Phase 12 promotes this
component into the live `/work/greenhouse` route.

**Stopped here per the hard gate above** ("Phase 10 → Phase 11" in this
document's older numbering, "Phase 12" in `IMPLEMENTATION-ROADMAP.md`'s
current numbering — same gate either way): do not cut the live
`/work/greenhouse` route over, and do not touch any of the other seven
case studies, without this comparison being reviewed and explicitly
approved first.
- Nothing in this project is committed to git unless explicitly requested,
  separately from implementation approval.

---

## Hero final visual — atmosphere + contour implemented (2026-08-25)

**Status: done.** Homepage architecture, section order, hero copy, and the
Selected Work grayscale-to-color hover are all unchanged — this pass only
replaced `components/Hero.tsx`'s layer-2 (atmosphere) and layer-4
(contour) content.

**Assets:** copied from the approved source into `public/hero/` — no
absolute Windows paths in any committed code:
- `public/hero/portfolio-hero-atmosphere-final.png` (1915×821 raster)
- `public/hero/portfolio-hero-contour-v5.svg` (1024×1536 viewBox, 21
  filled vector paths, no embedded raster, no background rect — approved
  geometry, untouched)

**Layering:** atmosphere is a `next/image` `fill` inside the existing
layer-2 wrapper (`object-cover`, `priority`, `quality={92}`) — the image's
own baked-in quiet-left/warm-right composition does the work, no extra
tonal overlay was needed on top of the existing layer-3 vignette. Contour
is two nested divs instead of the old inline `<svg><path>`: the outer
`.hero-contour-mask` (unchanged class name) still does the fog-reveal
sweep; the inner `.hero-contour-path` div has `background-color: #E5DCC9`
and the SVG file as its own `mask-image`/`-webkit-mask-image`
(`mask-size: contain`, `no-repeat`, `bottom right`) — so the file's vector
geometry recolors via CSS, never re-rasterized or edited.

**Bug found and fixed during implementation:** the original sweep-reveal
technique (an oversized gradient mask animating `mask-position`) never
actually reached a fully-revealed end state for a box this tall — at its
declared "settled" position the visible region only showed a thin sliver
near the bottom (confirmed by disabling the outer mask entirely, which
immediately showed the complete, correct figure). This had been invisible
with the old placeholder shape because that abstract blob barely used the
top of its own box. Replaced with an unambiguous technique: `mask-size`
height animates `8% → 130%` (`mask-position: bottom`, `mask-repeat:
no-repeat`), which has a provable fully-revealed end state instead of
relying on oversized-image/position arithmetic. Both the session-skip
state and the `prefers-reduced-motion` state were updated to the same new
end-state value. Same visual intent (soft upward sweep), same duration
token (`var(--duration-hero)`), same 250ms start delay — only the
mechanism changed.

**Sizing/positioning:** wrapper width `md:w-[29%] lg:w-[32%]` (was 27/30,
nudged to sit inside the requested 28-34% range), `aspect-[2/3]` matching
the SVG's exact viewBox ratio, `self-end` at every breakpoint (was
`self-end lg:self-center` — now grounded at the stage floor on desktop
too, per the approved composition). Below 360px, the same
crop-to-head/shoulder technique as before, just applied to the inner
mask div's explicit size instead of the old inline SVG's size.

**Verified:** `tsc --noEmit`, `npm run lint`, `npm run build` all clean.
Browser-checked at 1440 (desktop), 1024 (tablet/`lg` breakpoint), and 390
(mobile): full body uncropped and grounded at every width, no horizontal
overflow, text remains primary reading order on mobile with the figure
beneath it, Selected Work's `.hover-reveal-media` grayscale-at-rest filter
confirmed still present and unchanged (4 images), homepage `h2` sequence
confirmed unchanged ("Selected work", "Let's connect."). Reduced-motion
was verified by code inspection (its end-state value now matches the
proven-correct settled value) rather than a literal OS-level toggle, since
the available tooling doesn't expose that emulation directly.

**Known pre-existing, unrelated issue noticed during verification:** a
React hydration-mismatch warning on `<html className="newsreader_...">`
appears in the dev console. Confirmed present before any of this
session's edits (visible on the very first homepage screenshot taken this
session) and does not appear in `npm run build`'s output — a dev-mode/
Fast-Refresh artifact, not caused by or fixed in this pass.

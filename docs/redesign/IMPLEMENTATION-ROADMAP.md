# Implementation Roadmap

**Status:** Approved and in execution, 2026-08-19. Phases 1–8 complete;
Phase 8 is stopped for approval, Phase 9 is next once approved — gated on
explicit approval like every phase before it — see `CURRENT-HANDOFF.md` for
the live status. Phases 7 and 8 (reference audit, homepage reconcept) were
inserted this session ahead of the originally-numbered case-study-shell
work below, which shifted from 7–12 to 9–14 as a result — see
`REFERENCE-AUDIT.md` for the audit and `CURRENT-HANDOFF.md`'s Phase 7/8
section for exactly what was implemented.
**Governs:** the migration from the current warm-paper/comic-box/multi-accent
site to the dark-field/single-accent/editorial system defined in
`00-portfolio-vision.md` through `10-review-checklist.md`.
**Read first:** `SUPERSEDED.md` (decision record and per-document status),
then the eleven foundation documents.

## Scope note

The fourteen phases below cover the homepage, the shared design system, and
the eight case-study detail pages — the areas the foundation documents
directly address. (Originally twelve; Phase 7 and Phase 8 — reference
audit and homepage reconcept — were inserted 2026-08-19, shifting the
former Phase 7–12 to Phase 9–14.) `/about`, `/resume`, `/contact`, and
`/work`'s own hero
band are now explicitly folded into **Phase 6** (2026-08-18 decision — see
that phase's entry below) rather than left unscoped: all four share one
simple, repeated pattern (radial-gradient hero band + eyebrow + serif
`h1`) that migrates the same way at the same time as `/work`'s project
index. Note `/experience` is not listed here because it doesn't exist as
its own route — it was merged into `/work` before this audit; see
`MIGRATION-INVENTORY.md`.

## How to read this document

Each phase lists: objective, dependencies, likely files/component families,
what must change, what must explicitly remain unchanged, validation steps,
acceptance criteria, and known risks or required user input. Cross-cutting
guidance (mechanical vs. judgment-dependent work, commit boundaries, visual
comparison requirements, compatibility layers, dead-code timing, and the
Greenhouse approval checkpoint) follows the phase list.

---

## Phase 1 — Current-state baseline and migration inventory

**Objective:** Establish an exact, written record of what exists before
anything is changed, so later phases execute against a known list instead of
discovering scope mid-migration.

**Dependencies:** None. First phase.

**Likely files/component families:** read-only pass across `app/`,
`components/`, `lib/content/`, `app/globals.css`, `app/layout.tsx`,
`package.json`.

**What must change:** Nothing in application code. Produce a written
inventory (can live as a section in this file or a sibling
`MIGRATION-INVENTORY.md`) covering:
- every hardcoded color/gradient/shadow value and where it appears;
- every case-study component's shared-block-vs-bespoke-markup composition
  (already partly established: `ChronicleCaseStudy.tsx` 870 lines,
  `ForceNCaseStudy.tsx` 770, `GreenhouseCaseStudy.tsx` 421,
  `HeraCaseStudy.tsx` 1,287, `InformaticaCaseStudy.tsx` 876,
  `PathPeerCaseStudy.tsx` 942, `PillPalCaseStudy.tsx` 1,116,
  `RoomEaseCaseStudy.tsx` 940 — the generic renderer in
  `app/work/[slug]/page.tsx` is currently unreachable dead code, since every
  slug is special-cased);
- every current route (`/`, `/work`, `/work/[slug]`, `/experience`,
  `/about`, `/resume`, `/contact`);
- every font currently loaded (`Geist`, `Geist_Mono`, `DM_Serif_Display`,
  `Caveat` in `app/layout.tsx`) and every place each is referenced;
- confirmed usage sites for `components/Marquee.tsx`, `components/Signature.tsx`,
  `components/RotatingWord.tsx` (must be grepped, not assumed, before
  Phase 5 removes them).

**What must remain unchanged:** everything — this phase is observation
only.

**Validation:** cross-check the inventory against a fresh `grep`/`glob` pass
immediately before Phase 2 starts, in case anything changed between planning
and execution.

**Acceptance criteria:** every item above is enumerated with file paths; no
"probably" left in the inventory for anything Phase 2–4 depends on.

**Risks / required input:** none. An incomplete inventory here causes
rework later, so this phase should not be rushed even though it produces no
visible change.

---

## Phase 2 — Global tokens and font migration

**Objective:** Stand up `02-design-language.md`'s four-layer token system at
the global root and replace the font stack, per decision 2 (Newsreader
display / Onest body, Caveat retired).

**Dependencies:** Phase 1 inventory.

**Likely files:** `app/layout.tsx` (font imports and body class),
`app/globals.css` (root token definitions).

**What must change:**
- Replace `Geist`, `DM_Serif_Display`, `Caveat` imports with `Newsreader`
  (display/editorial) and `Onest` (body/UI) via `next/font/google`; drop the
  `Caveat` import entirely.
- Define foundation tokens at `:root` in `app/globals.css`: the full color
  table from `02-design-language.md` (`--color-bg`, `--color-surface-1/2`,
  `--color-text*`, `--color-line*`, `--color-accent*`, `--color-focus`,
  status colors), the type scale, the spacing scale (`--space-1` through
  `--space-11`), radius values, and the motion tokens from
  `05-motion-system.md` (durations, easings).
- Replace the hardcoded `bg-[#fdfaf5]` on `<body>` in `app/layout.tsx` with
  the `--color-bg` token.

**What must remain unchanged:** component markup. Pages keep referencing
their old hardcoded hex values until Phases 3–9 migrate them — this phase
is additive infrastructure, not a page-by-page reskin. Geist Mono may stay
if it's used anywhere for code/monospace display; confirm during Phase 1
before deciding.

**Validation:** production build succeeds; fonts render (this alone is the
first visible, sitewide change — do a full-page screenshot pass on `/` and
one case study to confirm nothing broke); no console errors from the font
loader; inspect computed styles in devtools to confirm tokens are present.

**Acceptance criteria:** every token in `02-design-language.md`'s tables
exists at `:root`; Newsreader and Onest render in place of the old display
and body fonts; no `Caveat` import remains anywhere in the codebase.

**Risks / required input:** none expected — both fonts are on Google
Fonts, so this is a mechanical `next/font/google` swap. The one thing worth
flagging: this phase alone will make the site look visibly "broken" (dark
tokens defined but nothing consumes them, new fonts on old light-mode pages)
for a short window until Phase 3 starts — acceptable as a transitional
state, not a shippable one.

---

## Phase 3 — Layout primitives and global shell

**Status: primitives complete; the background switch is deliberately
deferred — see "Outcome" below.**

**Objective:** Build the five foundation primitives from `06-component-system.md`
(`Container`, `Grid`, `Stack`, `Section`, `Rule`) and switch the root page
field to the dark background.

**Dependencies:** Phase 2 tokens.

**Likely files:** `components/layout/Container.tsx`, `Grid.tsx`, `Stack.tsx`,
`Section.tsx`, `Rule.tsx`; `app/layout.tsx` body background (not yet
touched — see below).

**What must change:** the five primitives are created, typed, and support
the documented variants (`Container`: `page`/`standard`/`reading`/`narrow`/`full`;
`Grid`: responsive 4/8/12-column; `Stack`: `compact`/`content`/`section`/`chapter`;
`Section`: number/label/heading/intro/anchor with valid heading order;
`Rule`: `subtle`/`strong`/`accent`). Root body background switches to
`--color-bg` — **deferred, see Outcome.**

**What must remain unchanged:** existing page components (`app/page.tsx`,
every `*CaseStudy.tsx`) keep rendering their old markup — unaffected either
way, since the background switch didn't happen this phase.

**Validation:** smoke-tested each primitive against a realistic content
shape via a temporary, non-routed-looking page
(`app/primitive-smoke-test-temp/`, removed after verification — note for
future phases: a leading underscore, e.g. `app/_foo/`, makes Next.js treat
a folder as a private/non-routable segment, so a scratch route needs a
plain name to actually be reachable for browser verification). Confirmed
via computed styles in a live browser: `Container` variants render correct
`max-width` and fluid padding and compose correctly when nested; `Grid`
produces the correct column count and gap at each breakpoint and children's
`col-span-*` renders proportionally; `Stack` variants produce the exact
token gap values; `Section` renders valid heading order with token
typography; `Rule` variants render the exact three token colors. No
horizontal overflow or console errors at 375px or desktop width.

**Acceptance criteria:** all five primitives exist, typed, and verified
against real content (accelerated from "by end of Phase 4" — verified
directly in this phase instead); no primitive introduces a prop not
specified in `06`.

**Outcome — background switch deferred, with evidence:** Before flipping
`<body>`'s background, its actual coverage was checked page by page (not
assumed). Two of the six core pages have real, non-cosmetic gaps: `/contact`'s
email/LinkedIn/phone links block and `/resume`'s entire top section
(headline, intro paragraph, PDF embed) have **no explicit background at
all** — they sit on transparent containers using `text-neutral-900` /
`text-neutral-600` directly. Flipping `<body>` to `--color-bg` (near-black)
now would put that dark text directly on a near-black field in those two
specific, content-bearing regions — exactly the "dark text on a dark
field" outcome the governing instructions for this migration explicitly
rule out. (`/about`'s two sections both already carry explicit gradient
backgrounds and would only show a ~20px inter-section gap in the new dark
tone — cosmetic, not a readability problem; homepage, `/work`, and case
studies were similarly checked and are gap-only.) **The body-background
switch is deferred to immediately after Phase 6**, once `/contact` and
`/resume` have real section-level backgrounds (folded into that phase's
existing secondary-page-shell work) — see Phase 6's updated entry. Do not
flip `<body>` before then without re-verifying coverage.

**Risks / required input:** this was the first phase introducing a
genuinely new abstraction with no prior art in the codebase — the
highest judgment-dependent risk of the early phases, since the primitives'
API shape affects every phase after it; kept the initial prop surface
minimal, exactly what `06` specifies. Separately: while validating this
phase, `npm run build` began intermittently failing with the same
parent-repo `node_modules` corruption already on record from the dev
server (see `CURRENT-HANDOFF.md`) — now hitting production builds too, not
just `next dev`. Fixed by adding `turbopack.root` /
`outputFileTracingRoot` to `next.config.ts`, pinning both explicitly to
this worktree, exactly as Next's own warning message recommended. This
wasn't in Phase 3's original scope but was necessary to keep validation
reliable for every phase from here on — see the completion report for full
reasoning.

---

## Phase 4 — Navigation, footer, actions, and interaction states

**Status: complete.** Nav rebuilt with a real compact menu (didn't exist
before), Footer migrated, `components/ui/Action.tsx` built and consumed by
Footer. Body-background flip remains deferred per Phase 3's decision, held
throughout this phase (`app/layout.tsx`'s `<body>` class unchanged except
for the unrelated `id="main-content"` addition — confirmed via diff). Full
detail in `CURRENT-HANDOFF.md`'s Phase 4 section. One process note worth
keeping: this session's browser-automation environment never has real
document-level focus (`document.hasFocus()` is `false` throughout), so
`document.activeElement`-based checks were used to verify all
focus-management *logic* (fully reliable), while CSS `:focus`-triggered
*visual* styling (skip link becoming visible, focus rings appearing)
couldn't be confirmed live in-tool — the code follows standard, structurally
correct patterns, but a human should spot-check the visual reveal in a real
browser when convenient.

**Objective:** Migrate `Nav`/`Footer` to the new tokens and primitives, and
consolidate every ad hoc button/link pattern into one `Button`/`TextLink`
implementation per `06`'s three-variant system.

**Dependencies:** Phase 2 (tokens), Phase 3 (primitives).

**Likely files:** `components/Nav.tsx`, `components/Footer.tsx`, new
`components/ui/Button.tsx` (or equivalent path). At least two distinct ad
hoc button patterns are already confirmed to exist (`app/page.tsx`'s solid
CTA button, `app/work/[slug]/page.tsx`'s outlined link button) — there are
likely more inside the eight bespoke case-study components, to be confirmed
during this phase.

**What must change:** Nav/Footer visual system (dark field, warm-ivory
text, restrained accent, `Container`-based layout); mobile menu keyboard
behavior (focus trap, Escape closes, focus restores to trigger) per
`03-layout-system.md`; one `Button` component covering `primary`/`secondary`/`text`
variants with all required interaction states (default, hover,
focus-visible, active, disabled).

**What must remain unchanged:** the navigation's information architecture
(identity, Work, About, Resume, contact action) — this is a visual/component
migration, not an IA change.

**Validation:** keyboard-only pass (tab order, Escape, focus restoration);
automated accessibility check on Nav/Footer in isolation; verify sticky
offset behavior doesn't cover anchored headings once case studies gain
sticky TOCs in Phase 9.

**Acceptance criteria:** one `Nav`, one `Footer`, one `Button` API; every
interactive state present per `06`'s "State requirements" list.

**Risks / required input:** focus-trap correctness inside the mobile menu
is easy to get subtly wrong and needs real keyboard testing, not just a
visual pass. No user input required.

---

## Phase 5 — Homepage shell and SVG contour hero

**Status: complete.** `components/Hero.tsx` built as a pure server component
(no client JS, no hydration boundary) with all five documented layers:
`--color-bg` stage, an aria-hidden radial-gradient atmosphere wash, an
aria-hidden vignette, an inline (not raster) SVG contour with a CSS-only
stroke-dashoffset draw animation (250ms delay, 850ms `--duration-hero`
duration, `forwards`, disabled under `prefers-reduced-motion`), and the
semantic content block (h1/p/two `Action`s) as the DOM-first child so it is
both visually first at compact widths and left-of-contour at `lg:`. Uses the
Phase 3 `Container` (`variant="page"`) and Phase 4 `Action` component, no new
dependency. `Marquee.tsx`, `Signature.tsx`, `RotatingWord.tsx` — all three
confirmed via grep to have zero remaining references after this phase's
edits — were deleted; the stat-strip's rotating headline was replaced with
the static, pre-existing phrase "I build systems people actually use."
(unchanged wording, pulled from the retired `manifestoWords` array, which
was also removed). The old hero's pill tags, `Tag` helper, and three-layer
`PhotoStack` were removed as part of the hero replacement. See
`CURRENT-HANDOFF.md`'s Phase 5 section for full validation detail and one
copy item flagged for an editorial decision (the old "Open to full-time
roles" pill has no slot in the new five-item content hierarchy and was
dropped from the hero, not relocated — needs a decision, not assumed).

**Objective:** Rebuild the hero per `04-hero-system.md`, and remove the two
components decision 2 and decision 3 retired (the Caveat signature, the
marquee).

**Dependencies:** Phases 2–4.

**Likely files:** `app/page.tsx` (hero section), `components/Signature.tsx`
(remove — confirm zero other usages first per Phase 1's inventory),
`components/Marquee.tsx` (remove — same confirmation), new hero components
for the layered architecture (`04`'s five layers: stage field, atmospheric
image, optional light/grain overlay, SVG contour, HTML content) — likely
`components/hero/HeroStage.tsx`, `HeroContour.tsx`, plus the new SVG asset
itself under `public/`.

**What must change:** the entire hero — pill tags, three-layer photo stack,
and hand-drawn signature are replaced by the atmospheric dark stage +
SVG-contour composition. Message hierarchy follows `04`'s required order
(value proposition, supporting context, primary action, secondary action,
visual motif — all visible immediately, no loader/animation delay). Motion
sequence follows `05`'s and `04`'s timing table exactly (250ms start,
850ms hero-only duration, settle at 1100ms, no loop).

**What must remain unchanged:** the underlying facts in the hero copy
(Kamal's actual background, roles, accomplishments) — only presentation
changes, not claims. The featured-case-study selection is **not** decided
in this phase (that's Phase 6); this phase builds the hero to stand alone.

**Validation:** five-second test per `09-storytelling-system.md` (a fresh
viewer states Kamal's value before the contour finishes revealing);
reduced-motion check (final contour renders immediately, no crossfade over
100ms); mobile crop check at 320/375px per `04`'s compact-behavior rules;
CLS/LCP check specifically on the hero, since it now carries a real image
and SVG asset.

**Acceptance criteria:** matches `10-review-checklist.md` §4 (Hero) in
full.

**Risks / required input:** a temporary development placeholder is
**approved** (decision of record, 2026-08-18) for both the SVG contour and
the atmospheric background — this phase is not blocked on sourcing final
assets. Requirements while using placeholders: preserve `04`'s independent
five-layer architecture even for placeholder content; mark placeholder
assets clearly in code (e.g. a `PLACEHOLDER —` filename/comment convention)
and note their placeholder status in this roadmap's Phase 14 entry; keep
them decorative and accessible (empty alt text / hidden from assistive
tech); do not spend implementation time polishing placeholder artwork; do
not treat them as production-approved. **The manually cleaned contour and
an approved atmospheric asset are required before Phase 14 can pass** — see
Phase 14's acceptance criteria.

---

## Phase 6 — Editorial project index, concise Selected Experience, and secondary-page shells

**Status: complete.** New `components/ui/ProjectIndexItem.tsx` (shared
editorial row, `selected`/`complete` variants) replaces `CaseStudyCard.tsx`
(deleted, zero references remained) on both the homepage and `/work`. New
`components/SelectedExperience.tsx` replaces the dashed-timeline Work
Experience section with concise rows (org/role/period/one contribution, no
decorative markers). `/about`, `/resume`, `/contact`, and `/work`'s hero band
are migrated to tokens; `/resume`'s top section and `/contact`'s links block
— the two gaps Phase 3 identified as blocking the body-background flip — now
have real explicit backgrounds. `app/layout.tsx`'s `<body>` flipped to
`--color-bg`/`--color-text` as the phase's closing step. The featured
homepage set (roomease/forcen/greenhouse/pathpeer) was re-run through
`09-storytelling-system.md`'s proof-map method and kept unchanged — see
`CURRENT-HANDOFF.md`'s Phase 6 section for the full table and for Chronicle,
flagged as a candidate addition rather than added unilaterally.

**Objective:** Replace the homepage's equal-card project grid with the
editorial index from `06-component-system.md`, apply `09`'s proof-map
method to confirm or revise the featured set, replace the rotating
stat-strip headline with a static statement (decision 5), build the
"Selected Experience" section per decision 4, and migrate the four
previously-unscoped simple pages (`/about`, `/resume`, `/contact`, and
`/work`'s own hero band above the index) to the new tokens/typography/
shell — added to this phase by the 2026-08-18 decision closing the earlier
scope gap, since all four share one simple radial-gradient-hero-band +
eyebrow + serif-`h1` pattern that migrates the same way at the same time as
`/work`'s index below it.

**Dependencies:** Phases 2–5 (this phase assumes the hero above it is
already migrated).

**Likely files:** `app/page.tsx` (index, practice-statement, and experience
sections), `app/work/page.tsx` (same component, denser variant, plus its own
hero band), `app/about/page.tsx`, `app/resume/page.tsx`,
`app/contact/page.tsx` (each ~50–100 lines, hero band + simple content —
low complexity, low risk), new `components/ProjectIndexItem.tsx` (replacing
`components/CaseStudyCard.tsx` on both `/` and `/work` — decision of
record, 2026-08-18: one shared component, not a second card system),
`components/RotatingWord.tsx` (remove — confirm zero other usages first),
new `components/SelectedExperience.tsx`, `lib/content/experience.ts` (read,
not necessarily changed — see "what must remain unchanged").

**What must change:**
- The equal-card grid is replaced everywhere by one editorial project-index
  component with two purposeful variants: `selected` (homepage — more
  spacious, 3–5 strongest projects) and `complete` (`/work` — denser, all
  eligible projects). Both variants share the same information hierarchy
  (project number, title, one-line problem/outcome, role/category, year,
  purposeful media, one semantic link), the same tokens, the same
  accessibility behavior, and the same interaction language — the density
  and selection differ, nothing else. This phase now covers both routes,
  not the homepage alone.
- The featured set is re-confirmed using `09`'s proof-map exercise
  (primary/secondary competency, one memorable decision, one credible
  outcome, one limitation per candidate project; choose the set for
  complementarity, not just individually-strongest projects). This may
  keep the current five (RoomEase, Hera, Greenhouse, Pill Pal, ForceN) or
  may not — the exercise should be run, not skipped because the old answer
  seems fine.
- The stat-strip's auto-rotating "I build [phrase]" headline becomes one
  fixed statement; any supporting facts that were true and useful may
  remain as static evidence.
- Work Experience becomes "Selected Experience": strongest/most relevant
  roles only, each showing organization, role, period, and one specific
  contribution; no decorative timeline; substantially shorter than a
  résumé.
- `/about`, `/resume`, `/contact`, and `/work`'s hero band each get their
  hardcoded hero gradient and typography replaced with the token/primitive
  system from Phases 2–3 — same content, same structure, new visual system.
  These are mechanical (see cross-cutting section below), not judgment
  calls, since none of them involve rewriting copy or changing information
  architecture.
- **Carried over from Phase 3, and now a hard requirement of this phase:**
  `/contact`'s email/LinkedIn/phone links block and `/resume`'s entire top
  section (headline, intro, PDF embed) currently have no explicit
  background — confirmed during Phase 3's pre-flip safety check. Give both
  areas real section-level backgrounds as part of this phase's migration
  (not a separate pass). Once every page has full section-level background
  coverage, flip `<body>`'s background/text in `app/layout.tsx` from the
  legacy `bg-[#fdfaf5] text-neutral-900` to the `--color-bg`/`--color-text`
  tokens as the closing step of this phase — re-verify coverage on all six
  core pages first, the same way Phase 3 did, rather than assuming it's
  now safe.

**What must remain unchanged:** the underlying facts in
`lib/content/experience.ts` and `lib/content/case-studies.ts` — this phase
changes selection and presentation, not the record of what happened. Full
case-study page availability for any project is untouched (already decided:
PathPeer and Informatica keep full pages regardless of homepage selection).
`/about`'s `toolGroups` content, `/resume`'s linked PDF and its target path,
and `/contact`'s email/LinkedIn details are copied over exactly — this
phase does not touch bio, skills-list, or contact-information content.

**Validation:** re-run the five-second test on the reordered/reselected
homepage; confirm Selected Experience entries are traceable to real
`experience.ts` records; keyboard/focus check on the new index (large
target, one semantic link per entry, no nested interactive controls per
`10-review-checklist.md` §8).

**Acceptance criteria:** matches `10-review-checklist.md` §5 (Homepage and
navigation) and §1 (Product and hiring goals, specifically "featured
project set demonstrates complementary competencies").

**Risks / required input:** the proof-map exercise may surface a different
featured-five than today's — if it does, that's a content decision worth
surfacing back to you before locking it in, not something to decide
unilaterally. (The `/work`-index scope question noted in the prior version
of this phase is resolved — see the decision above.)

---

## Phase 7 — Reference-grounded visual audit

**Status: complete.** Audit only, no code changed. Produced
`REFERENCE-AUDIT.md`: a factual extraction of the current implementation
against 7 live-reviewed Priority-1 portfolio references plus the
project's own foundation docs. See that document for the full findings,
extended reference-translation table, Keep/Remove/Add lists, and the
five-pass Phase 8 plan it produced.

---

## Phase 8 — Homepage reconcept (Passes 1–4 of `REFERENCE-AUDIT.md`'s plan)

**Status: complete** (Pass 5 deliberately scoped-only, not executed — see
below). Governing principle: **"Reveal Structure"** — an internal
cartography metaphor kept strictly non-visible, translated into: token
cleanup on the homepage's two remaining raw-hex sections; a hero copy
rewrite leading with named, credible facts instead of a generic value-
proposition template; a `heroMedia` field added to every case study and
a real (desaturated-to-color-on-hover) media slot added to
`ProjectIndexItem`, closing `06-component-system.md`'s "purposeful
thumbnail or media" requirement that Phase 6 had left unmet; and one
deliberate visual-weight break on RoomEase's row, chosen as the featured
project with the clearest, most quantified fragmented→resolved story. Full
implementation detail is in `CURRENT-HANDOFF.md`'s Phase 7/8 section, not
duplicated here. **Pass 5** (bridging `components/case-study/*` onto the
homepage's token system) was intentionally left as a scoping note only,
given its size — carried forward into Phase 9 below.

---

## Phase 11 — Shared case-study shell and evidence components

**Objective:** Build the full canonical case-study component set from `06`
and `07` — the shell and every evidence component — without yet cutting any
live route over to it. This phase produces working, tested components; it
does not touch `GreenhouseCaseStudy.tsx` or any other live page.

**Dependencies:** Phases 2–4 (tokens, primitives, Nav/Footer/Button).

**Likely files:** new `components/case-study/shell/` (or similar) directory:
`CaseStudyHero.tsx`, `CaseStudySnapshot.tsx`, `CaseStudyTOC.tsx`,
`Metric.tsx` (plain-value rewrite per decision 1 — see below), `MediaFrame.tsx`,
`FigureCaption.tsx`, `Quote.tsx`, `BeforeAfter.tsx`, `DecisionBlock.tsx`,
`RoleScopeMetadata.tsx`, `NextProject.tsx`. Existing blocks that already do
similar work (`SnapshotGrid.tsx`, `StatGrid.tsx`, `Chapter.tsx`) are
remapped/replaced rather than duplicated where their job overlaps a new
component.

**What must change:**
- **Metric presentation is a structural rebuild, not a token swap**
  (decision 1): large plain value, concise label, visible qualifier/evidence
  status, baseline/denominator/timeframe/source where applicable, laid out
  with spacing/rules/grid alignment — no bordered comic-box card. The
  underlying metric claims are copied verbatim from `lib/content/case-studies.ts`
  during this migration; none are altered, invented, or strengthened.
- `CaseStudyHero`/`CaseStudySnapshot`/`CaseStudyTOC` are net-new — today
  every case study hand-codes its own hero gradient and duplicates its own
  TOC data array with inline SVG icons (confirmed directly in
  `ForceNCaseStudy.tsx`). These three components are the highest-leverage,
  highest-duplication fix in the whole migration.
- The 11-section canonical structure from `07-case-study-system.md` is
  implemented as a composable page template, not hardcoded per project.

**What must remain unchanged:** no live route changes yet. `GreenhouseCaseStudy.tsx`
and the other seven bespoke components keep rendering exactly as they do
today throughout this phase.

**Validation:** build each component against Greenhouse's real content
(`lib/content/case-studies.ts`'s Greenhouse entry) as the first realistic
test case, without wiring it into the live `/work/greenhouse` route —
either a temporary preview route or local rendering is enough to verify
before Phase 10's actual cutover.

**Acceptance criteria:** every component in `06`'s evidence-component list
exists, is typed, uses semantic tokens (no hardcoded project colors inside
shared component source, per `06`'s architecture rule), and has been
visually checked against at least Greenhouse's real content.

**Risks / required input:** none expected — this phase is mechanical once
Phase 3's primitives exist, since `06` and `07` specify the API and content
shape precisely. The main risk is scope creep (building more than `06`
specifies "for future flexibility") — resist it per `06`'s own non-goal:
"Abstracting a pattern used once before its needs are understood."

---

## Phase 12 — Greenhouse pilot migration

**Objective:** Cut `GreenhouseCaseStudy.tsx` over to compose the Phase 9
shell/components, remove its bespoke hero/TOC/gradient code, and validate
the whole approach on one real page before touching the other seven.

**Dependencies:** Phase 9 (components must exist and be individually
verified first).

**Likely files:** `GreenhouseCaseStudy.tsx` (rewritten to compose shared
components), `app/work/[slug]/page.tsx` (routing unchanged — Greenhouse
keeps its own early-return, now pointing at the rebuilt component).

**What must change:** Greenhouse's entire rendering — hero, TOC, snapshot,
metrics, decisions, diagrams (Greenhouse has no dedicated diagram component
today, which is part of why it's the safest pilot), reflection, next-project
link — all now composed from Phase 9's shared components instead of hand-
rolled markup.

**What must remain unchanged:** every fact, metric, decision, and artifact
reference in Greenhouse's content — this phase changes how the page is
built, not what it says. `ChannelCollage.tsx` (Greenhouse-specific block)
may be kept if it does a job no shared component covers, per `06`'s "page-
specific components allowed only when genuinely unique" rule — confirm
during this phase rather than assuming it must go.

**Validation:** side-by-side visual comparison (old Greenhouse vs. new
Greenhouse, full page, desktop and mobile); run `10-review-checklist.md`'s
System pass, Story pass, and Experience pass specifically against this one
page; confirm no regression in any verified metric, decision, or artifact
caption.

**Acceptance criteria:** Greenhouse passes the same review-checklist bar
the finished site will need to pass; the page is visibly and structurally
the reference implementation for what every other case study will become.

**⛔ Mandatory checkpoint:** **this phase ends with an explicit stop.** Do
not begin Phase 11 without presenting the old/new comparison and the
review-checklist results and receiving explicit approval to apply the same
recipe to the remaining seven case studies. This is the single most
important checkpoint in the whole roadmap — everything in Phase 11 is a
repeated, mechanical application of whatever pattern gets approved here, so
an unnoticed problem at this stage propagates seven times over.

---

## Phase 13 — Rollout across the remaining case studies

**Objective:** Apply the approved Greenhouse recipe to ForceN, RoomEase,
Hera, Pill Pal, PathPeer, Informatica, and Chronicle.

**Dependencies:** Phase 10 approval (hard gate — do not start without it).

**Likely files:** `ForceNCaseStudy.tsx`, `RoomEaseCaseStudy.tsx`,
`HeraCaseStudy.tsx`, `PillPalCaseStudy.tsx`, `PathPeerCaseStudy.tsx`,
`InformaticaCaseStudy.tsx`, `ChronicleCaseStudy.tsx`.

**What must change:** same recipe as Phase 10, applied one page at a time.
Recommended order, smallest/lowest-risk first (mirrors the line-count and
content-stability ordering already used to pick Greenhouse as pilot):
Chronicle or ForceN next (content stable, ForceN's diagram deferred to
Phase 12), then RoomEase, Informatica, PathPeer, then the two largest and
most recently-changed pages last — Pill Pal and Hera (Hera's content was
substantially reworked this session and deserves the most settled
foundation underneath it before its visual migration).

**What must remain unchanged:** every project's verified facts, metrics,
decisions, and evidence labels. PathPeer's "one of two developers/designers"
wording and any other project-specific precise language stays exactly as
written — decision 3 authorizes clarifying authorship with the new
taxonomy, not rewriting accurate scope language.

**Validation:** the same side-by-side comparison and review-checklist pass
Phase 10 used, run **per page**, not once at the end. Each page is its own
checkpoint even if formal sign-off is only required at natural pause points
(e.g., after every two or three pages) rather than after every single one —
your call on cadence once Phase 10 is approved.

**Acceptance criteria:** all eight case studies (Greenhouse plus these
seven) compose the shared shell; zero bespoke hero/TOC/gradient code
remains outside project-specific evidence components that were confirmed
genuinely unique.

**Risks / required input:** ForceN and RoomEase each carry a dedicated
diagram component (`ForceNWorkflowDiagram.tsx`, `RoomEaseAllocationDiagram.tsx`)
— their page migration in this phase should land the shell/component
change only; leave diagram-specific visual-grammar changes to Phase 12 so
the two workstreams don't tangle. Hera's payment-plan reconstruction and
PathPeer's recently-completed content work are explicitly preserved per
decision 4 from the prior session — this phase must visually migrate them,
not rebuild their content from scratch.

---

## Phase 14 — Diagram-system migration

**Objective:** Remap `Diagram.tsx`, `ForceNWorkflowDiagram.tsx`, and
`RoomEaseAllocationDiagram.tsx` to `08-diagram-system.md`'s visual grammar,
within the hybrid architecture already confirmed (decision 3: semantic
HTML/CSS + hand-built SVG + ELK only where it materially helps, no React
Flow).

**Dependencies:** Phase 11's ForceN and RoomEase page migrations (the
diagrams live inside those page shells).

**Likely files:** `components/case-study/Diagram.tsx`,
`components/case-study/ForceNWorkflowDiagram.tsx`,
`components/case-study/RoomEaseAllocationDiagram.tsx`.

**What must change:** node/edge/label/color treatment per `08`'s grammar
(neutral structure first, one accent identifies the point under discussion,
no node shadows, `1–1.5px` default edges, orthogonal-or-curved but not
mixed within one diagram, minimum 14px labels, sentence case); accessibility
requirements (concise alt text stating the conclusion, nearby caption,
structured text/table equivalent for complex relationships, DOM order
matching visual sequence, decorative fragments hidden from assistive tech).

**What must remain unchanged:** the underlying process logic, node content,
and edge relationships already documented in
`PORTFOLIO_CASE_STUDY_SYSTEM.md` §26 (ForceN's node/port/gutter catalogue)
and the RoomEase allocation logic — this phase is a visual-grammar and
accessibility remap, not a re-diagramming of the actual workflows. `elkjs`
stays in the dependency tree for layout computation only, per decision 3.

**Validation:** run `08`'s review checklist verbatim against each diagram
(conclusion statable in one sentence, labels readable without zooming,
direction/grouping/ownership unambiguous, color not the only meaning
carrier, accessible equivalent present); confirm no regression against
`PORTFOLIO_CASE_STUDY_SYSTEM.md` §24's ForceN diagram detail, which was
flagged during documentation stabilization as not exhaustively reviewed —
do that review now, as part of this phase, rather than assuming no
conflict.

**Acceptance criteria:** both diagrams pass `10-review-checklist.md` §9
(Diagrams and media) in full.

**Risks / required input:** none expected — decision 3 already closed the
architecture question. The only open item is the deferred §24 cross-check
noted above.

---

## Phase 13 — Storytelling and evidence-quality pass

**Objective:** Apply `09-storytelling-system.md`'s argument structure, voice
rules, heading rules, caption rules, and evidence-language taxonomy to every
case study's actual prose — a content/writing pass, distinct from the
structural migration in Phases 7–9.

**Dependencies:** Phase 11 (structure should be settled before prose is
rewritten against it, so headings/captions are being written for their
final layout, not a soon-to-change one).

**Likely files:** `lib/content/case-studies.ts` (the actual copy), and any
inline copy still living in the per-project components after Phase 11.

**What must change:**
- Section headings rewritten to carry a claim where they currently don't
  (`09`'s "Scheduling failures began before users reached the calendar,"
  not "Research").
- Captions rewritten to state what's seen, what to notice, and why it
  matters — not just name the artifact.
- Metric labels reclassified using `09`'s Measured/Directional/Estimated/
  Target/Qualitative taxonomy (decision from the prior documentation pass),
  distinct from `PORTFOLIO_CASE_STUDY_SYSTEM.md` §4's artifact-provenance
  labels (verified/reconstructed/redacted), which stay in use for artifacts.
- Authorship language reviewed against `07`'s five-tier taxonomy
  (owned/led collaboratively/influenced/contributed/team result) — applied
  where it clarifies scope, **not** mechanically overwriting accurate
  existing phrasing (PathPeer's "one of two developers/designers" stays).
- Each case study's argument-unit logic (claim → evidence → interpretation
  → decision → consequence) checked section by section, even where it
  doesn't need new visible subheadings.

**What must remain unchanged:** every fact, metric value, date, and scope
claim. This phase changes how the truth is expressed, never what the truth
is. No metric gains a number it didn't already have; no claim gets stronger
language than the evidence supports.

**Validation:** `09`'s own "Editing process" (one-sentence argument per
page → 3–5 proof points → one primary artifact per proof point → headings
that work when scanned alone → draft body copy → remove repeated
context/method theater/unsupported claims → read captions and headings
alone to confirm the story survives → test with an unfamiliar reviewer).

**Acceptance criteria:** matches `10-review-checklist.md` §6 (Case-study
story) in full, and `09`'s "Success criteria" section.

**Risks / required input:** this phase is the most judgment-dependent in
the whole roadmap — rewriting headings/captions/reflections well is a
craft task, not a mechanical find-replace, and should be reviewed by you
per project rather than batch-approved.

---

## Phase 14 — Responsive, accessibility, performance, and production QA

**Objective:** Run `10-review-checklist.md`'s full four-pass review across
the entire migrated site and reach a ship decision.

**Dependencies:** all prior phases.

**What must change:** whatever the checklist surfaces — this phase is a
review-and-fix loop, not a fixed change list. Expect a final round of small
targeted fixes, not a rebuild.

**Passes, in order (per `10`):**
1. **System pass:** tokens, components, architecture — one active color
   system, one display/one body family, canonical spacing, one button/nav/
   footer/container/media-frame implementation, no active imports of
   deprecated components before their removal.
2. **Story pass:** message, evidence, authorship, outcomes — re-verify
   after Phase 13's rewrite.
3. **Experience pass:** visual hierarchy, responsive behavior (test at
   320/375/768/1024/1440/1920px), motion (reduced-motion tested, not just
   coded), accessibility (semantic landmarks, one `h1`, skip link, full
   keyboard navigation, AA contrast, 200% zoom, screen-reader spot check).
4. **Release pass:** performance (image formats, reserved media dimensions,
   font-display behavior, no unnecessary animation/icon libraries), no
   console/hydration errors, working routes on direct load and refresh,
   metadata/social previews, production build and tests passing.

**Validation:** the checklist itself, run to completion, with findings
classified Blocker/Required/Polish per `10`'s own rubric.

**Acceptance criteria — ship when:**
- the Phase 5 placeholder SVG contour and atmospheric background have been
  replaced with the manually cleaned/approved final assets — this is a
  standing release blocker per the 2026-08-18 hero-assets decision, not a
  Polish-level finding;
- all Blockers are closed;
- all Required items are closed or explicitly accepted with a documented
  reason;
- the production build succeeds;
- at least one reviewer unfamiliar with the project completes the
  five-second hero test and a five-minute case-study scan;
- the deployed site has been checked on a real phone and a real desktop
  browser.

**Risks / required input:** the unfamiliar-reviewer test genuinely needs a
person who hasn't seen this project before — flag this as a real scheduling
dependency, not something that can be simulated internally.

---

## Cross-cutting guidance

### Mechanical vs. judgment-dependent

**Mechanical** (low risk, no content/aesthetic judgment call required once
the foundation docs are followed): token definition, font swap, primitive
scaffolding (API is fully prescribed by `06`), Nav/Footer/Button token
remap, marquee/signature/rotating-word removal, the `/about`/`/resume`/
`/contact`/`/work`-hero token migration folded into Phase 6, evidence-
component scaffolding in Phase 9, diagram color/label/accessibility remap
in Phase 12, most of Phase 14's checklist execution.

**Judgment-dependent** (needs your review, not just correctness checking):
the SVG contour asset and atmospheric hero image (Phase 5); the proof-map
featured-set exercise and Selected Experience role selection (Phase 6); the
`/work` index scope decision (Phase 6); every case study's rewritten
headings/captions/reflections (Phase 13); acceptance of any Required
finding in Phase 14 with a documented exception instead of a fix.

### Safe commit boundaries

One reversible unit of visible (or structurally significant) change per
commit:
- tokens and font swap as two separate commits (a font issue shouldn't
  force reverting token work);
- each layout primitive its own commit;
- Nav, Footer, and Button each their own commit;
- hero rebuild separate from marquee/signature removal;
- each case-study page migration (Greenhouse, then each of the other
  seven) its own commit or small PR, so a regression in one page never
  entangles with another;
- each diagram file's remap its own commit;
- Phase 13's copy changes committed per project, not as one sitewide
  content commit.

### Pages requiring visual comparison before proceeding

Hero (Phase 5, highest-visibility/most subjective element), full homepage
(end of Phase 6), Greenhouse (Phase 10, mandatory gate before Phase 11), and
each of the other seven case studies individually during Phase 11 rollout —
not batched into one end-of-phase comparison.

### Where temporary compatibility layers are appropriate

- Phases 2–4: old hardcoded page styles coexisting with unused new tokens
  is an acceptable transitional state, time-boxed to before Phase 5/7
  starts.
- Phases 7–9: the existing per-slug early-return pattern already in
  `app/work/[slug]/page.tsx` (`if (cs.slug === "x") return <XCaseStudy />`)
  **is** the compatibility layer — it already lets each case study be
  migrated independently without touching the others' routing. No new
  mechanism needs to be built for this.
- Phase 5: the placeholder SVG contour and atmospheric background (approved
  2026-08-18) are themselves a sanctioned temporary compatibility layer —
  clearly marked, decorative, accessible, not polished, not
  production-approved, and tracked as a standing Phase 14 release blocker
  until replaced.

### When dead code can be removed safely

Only after zero active imports remain, per `06`'s own migration-plan step 5
— specifically: `Caveat` font import and `Signature.tsx` only after Phase 1
confirms no other usage and Phase 5 removes the hero's reference;
`Marquee.tsx` the same way; `RotatingWord.tsx` only after confirming (not
assuming) it isn't used anywhere besides the stat-strip; each bespoke case
study's old hero/TOC/gradient code only after that specific page's Phase 11
migration is verified and approved — never removed pre-emptively "because
the new version is close"; the currently-dead generic-renderer body in
`app/work/[slug]/page.tsx` is either repurposed into the new shared shell
in Phase 9 or deleted once repurposed, not left as orphaned dead code
alongside the new system.

### The Greenhouse checkpoint

Restated because it's the single hardest gate in this roadmap: **Phase 10
ends with a mandatory stop.** Present the old/new side-by-side comparison
and the review-checklist results for Greenhouse specifically, and wait for
explicit approval before Phase 11 begins. Everything in Phase 11 repeats
whatever pattern is approved here across seven more pages — an unnoticed
problem at this checkpoint is the most expensive place in the whole roadmap
for one to slip through.

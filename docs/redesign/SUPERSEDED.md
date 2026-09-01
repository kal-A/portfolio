# Document Status and Supersession Record

**Created:** 2026-08-18
**Purpose:** Canonical status for every pre-freeze redesign document, following
the design-freeze foundation approved 2026-08-18. This file is the source of
truth for whether an older document may still guide implementation. It does
not rewrite or delete any historical content — see each document's own
supersession notice and body for the original text.

## The foundation (authoritative, unconditional)

These eleven documents govern the redesign, complete as of 2026-08-18. Read
in this order. Nothing below outranks them:

1. [00-portfolio-vision.md](00-portfolio-vision.md) — product intent, precedence, decision filter
2. [01-design-philosophy.md](01-design-philosophy.md) — constitution, decision order, anti-patterns
3. [02-design-language.md](02-design-language.md) — tokens
4. [03-layout-system.md](03-layout-system.md) — responsive structure, grid, containers
5. [04-hero-system.md](04-hero-system.md) — the SVG-contour hero
6. [05-motion-system.md](05-motion-system.md) — motion tokens and rules
7. [06-component-system.md](06-component-system.md) — shared primitives and components
8. [07-case-study-system.md](07-case-study-system.md) — canonical case-study structure
9. [08-diagram-system.md](08-diagram-system.md) — diagram visual grammar and accessibility
10. [09-storytelling-system.md](09-storytelling-system.md) — argument structure, voice, captions, evidence language
11. [10-review-checklist.md](10-review-checklist.md) — the release gate

(Eleven files, `00` through `10` — the leading number in each filename runs
0–10, which is eleven documents, not ten.)

## Decisions of record, 2026-08-18

1. **Migration scope.** Proceed with the full redesign now. The dark
   near-black, warm-ivory, restrained-accent system is the target
   implementation, not a gradual layer over the current comic-box system.
   Legacy visual-polish passes (palette, gradient, tint, shadow instructions)
   are paused; their structural and content findings remain useful.
2. **Typography.** Display/editorial: Newsreader. Body/UI: Onest. Documented
   fallbacks retained. Caveat is removed from active use unless a later
   governing document explicitly identifies a justified exception.
3. **Diagram architecture.** Retain the current hybrid: semantic HTML/CSS for
   simple relationships, hand-built SVG for custom diagrams, ELK only where
   automatic layout materially improves a complex diagram, no React Flow or
   additional graph-rendering framework. The architecture question raised in
   `PORTFOLIO_CASE_STUDY_SYSTEM.md` §26.1 is resolved on this basis.
4. **Existing completed work.** Preserve completed content, functionality,
   evidence, responsive corrections, and truthful project information. Hera's
   reconstruction, PathPeer's completed content work, and existing mobile
   fixes are visually migrated to the new token system, not discarded or
   rebuilt without a documented reason.
5. **Spatial Composition Rules** (`PORTFOLIO_CASE_STUDY_SYSTEM.md` §27).
   Rules 1–9 and 11 are approved as structural guidance. Rule 10 (secondary
   surface tinting) is revised to use the new semantic hierarchy instead of
   pale project-tinted backgrounds:
   - page field: `--color-bg`
   - primary inset surface: `--color-surface-1`
   - interactive or evidence surface: `--color-surface-2`
   - borders: `--color-line` or `--color-line-strong`
   - project accent reserved for small semantic emphasis only
   Pale project-tinted section backgrounds, decorative gradients, and
   comic-box offset shadows are not preserved.

## Decisions of record, 2026-08-18 (second set — five prior conflicts resolved)

1. **PathPeer and Informatica.** Keep both as full case-study pages. A full
   case-study page does not guarantee homepage-featured status — homepage
   prominence is determined by evidence strength, role relevance, outcome
   credibility, and how well the featured set complements one another, not
   by page depth alone. The older archive-only restriction
   (`02-artifact-reality-and-treatment.md`, `06-project-card-types.md`,
   `11-implementation-checklist.md` step 13) is retired.
2. **Hero signature.** Remove the Caveat-based handwritten signature.
   Do not rebuild it as a separate graphic — the SVG contour figure is the
   portfolio's one signature visual motif; the hero does not need a second
   signature device.
3. **Marquee.** Remove the moving marquee strip. Any useful wording or
   evidence it contained may be edited into the static practice statement
   described by the homepage system. It is not preserved merely to retain
   motion or fill space.
4. **Work Experience.** Keep it as a concise, hiring-focused "Selected
   Experience" section placed after Selected Work: strongest/most relevant
   roles only, each showing organization, role, period, and one specific
   contribution or responsibility area; substantially shorter than a résumé;
   shared editorial system; no large decorative timeline. This is the
   intentional implementation of `03-layout-system.md`'s optional
   "currently / previously" context, not a lighter-weight stand-in for it.
5. **Rotating statement.** Replace the automatically rotating stat-strip
   headline with one strong static statement. Not user-triggered, no
   alternate rotation mechanic. Supporting facts may remain visible as
   static evidence if accurate and useful.

## Decisions of record, 2026-08-18 (third set — component-migration questions resolved)

1. **Metric presentation.** The plain metric treatment in `06-component-system.md`
   and `07-case-study-system.md` is intentional, not an oversight. Outcome
   metrics migrate away from bordered comic-box cards to: a large plain
   value, a concise label, a visible qualifier/evidence status, and
   baseline/denominator/timeframe/source where applicable — spacing, rules,
   or grid alignment instead of decorative containers. This is a structural
   component change (rebuild `StatGrid`/`Metric` rendering), not a token
   swap. The underlying metric claims themselves are not altered, invented,
   or strengthened during this migration.
2. **Homepage project index.** In scope. `06-component-system.md`'s "Project
   index item" spec supersedes `PORTFOLIO_CASE_STUDY_SYSTEM.md` §18's
   exclusion, but **only** for homepage project-index presentation — the
   equal-card dashboard (`CaseStudyCard.tsx`) is replaced by the documented
   editorial index (project number, title, one-line problem/outcome,
   role/category, year, purposeful media, one semantic link; generous
   editorial row, not a grid of small equal cards). Full case-study
   availability and homepage-featured status remain separate decisions —
   this does not reopen which projects get a detail page.
3. **Authorship language.** `07-case-study-system.md`'s five-tier taxonomy
   (owned / led collaboratively / influenced / contributed / team result) is
   adopted as the shared editorial standard, superseding the simpler "I" vs
   "we" convention in `PORTFOLIO_CASE_STUDY_SYSTEM.md` §4 and §11. This
   does not authorize mechanically replacing accurate project-specific
   language — PathPeer's "one of two developers/designers" wording (from
   `WORK_EXPERIENCE_AND_GLOBAL_POLISH_V3.md`) stays exactly as-is because it
   communicates scope more precisely than any of the five taxonomy labels
   alone. The taxonomy clarifies authorship; it must never inflate, flatten,
   or rewrite it.

Read 2026-08-18: `06-component-system.md`, `07-case-study-system.md`,
`08-diagram-system.md`, `09-storytelling-system.md`, `10-review-checklist.md`
— the foundation is now complete at eleven documents. Full supersession mapping
against `PORTFOLIO_CASE_STUDY_SYSTEM.md` is below.

## Decisions of record, 2026-08-18 (fourth set — roadmap approval + two additional decisions)

The implementation roadmap (`IMPLEMENTATION-ROADMAP.md`) is approved as
written, with these two additions:

1. **Hero assets.** A temporary development placeholder is approved for the
   SVG contour and the atmospheric background used in Phase 5. Requirements:
   preserve `04-hero-system.md`'s independent layer architecture even for
   the placeholder; mark placeholder assets clearly in code (e.g. a
   filename/comment convention such as `PLACEHOLDER —`) and in documentation;
   keep them decorative and accessible (empty alt text / hidden from
   assistive technology, per `04`'s accessibility section); do not spend
   implementation time polishing placeholder artwork; do not treat placeholder
   assets as production-approved. **This blocks final release** — Phase 12
   cannot pass until the manually cleaned contour and an approved atmospheric
   asset have replaced the placeholders.
2. **`/work` project index.** The full `/work` index uses the same shared
   editorial project-index system as the homepage, not a second card system.
   One component, two purposeful variants: homepage (`selected`, more
   spacious, 3–5 strongest projects) and `/work` (`complete`, denser, all
   eligible projects). Both variants share the same information hierarchy,
   tokens, accessibility behavior, and interaction language — this resolves
   the open `/work`-scope question flagged at the end of the prior
   documentation pass. `Phase 6` of the roadmap is updated accordingly.

## Supersession mapping: `PORTFOLIO_CASE_STUDY_SYSTEM.md` vs. the foundation

Section-by-section status against `06`–`10`, in addition to the §25.3/§25.4
(superseded) and §26.1 (resolved) notes already on record:

| Section | Status |
|---|---|
| §1 Goal | Compatible; `00`/`01`/`09` now more authoritative for tone and goal specifically. |
| §2 Combined case-study model | General inspiration compatible; specifics superseded by `07`'s canonical structure. |
| §3 Reading model (60s / full) | Superseded by `07`'s "Scan path / Deep path" — same idea, `07` is now the precise version. |
| §4 Evidence labels (verified/qualitative/estimated/reconstructed/redacted) | Authoritative for **artifact/claim provenance**. Distinct axis from `09`'s metric-confidence taxonomy — see note below. |
| §4 Ownership language ("I"/"we") | Superseded by `07`'s five-tier authorship taxonomy (decision 3 above). |
| §5 Case-study types A–F | Authoritative; not redefined by `06`–`10`. |
| §6 Depth tiers (word-count ranges) | Authoritative for tier selection; read alongside `07`'s per-section "Length guidance" (no reconciliation done between the two — both apply, sum roughly checks out, not formally cross-verified). |
| §7 Artifact audit / `ArtifactRecord` | Authoritative. |
| §8 Content intake template | Authoritative. |
| §9 Standard case-study architecture (16 subsections) | **Superseded** by `07`'s canonical structure (11 sections). Not a 1:1 remap — `07` compresses and notably promotes Outcome Metrics to section 3, right after the executive summary. |
| §10 Visual storytelling rules | Superseded, split across `08-diagram-system.md` (diagrams), `02-design-language.md` (imagery), and `09-storytelling-system.md` (captions). |
| §11 Writing style | Superseded/refined by `09`'s Voice section (same spirit, more precise, nearly identical avoid-list). |
| §12 Component system | Superseded by `06-component-system.md` (prior decision, restated here). |
| §13 Data architecture | Not superseded — already resolved by §25.2 (extend `lib/content/case-studies.ts`, no MDX layer). `06`'s Content API guidance is explicitly non-prescriptive about serialization and doesn't conflict. |
| §14 Route/interaction behavior | Authoritative; compatible with `03`'s navigation/sticky rules. |
| §15 Content assembly algorithm (11 steps) | Overlaps `09`'s "Editing process" (8 steps). Where they overlap, `09` governs (voice/argument). §15's artifact-inventory-specific steps remain complementary — `09` doesn't cover artifact-cataloguing mechanics. |
| §16 Project-specific plan | Mostly authoritative. PathPeer's "Type F, compact project note" framing and Informatica's "compact experience note" framing predate today's decision to keep both as full pages — the specific tier label is stale, though the underlying instruction (match depth to evidence, don't inflate) still applies. Needs a light re-read when either page is next touched, not a full rewrite. |
| §17 AI workflow section | Authoritative. |
| §18 Scope boundary | **Partially superseded** — decision 2 above: the homepage project-index exclusion no longer applies. Case-study detail-page scope (the rest of §18) is unaffected. |
| §19 Page design direction | Superseded by `03-layout-system.md` / `04-hero-system.md` (more precise, canonical). |
| §20 QA checklist | Superseded/absorbed by `10-review-checklist.md`, now the release gate. |
| §21 Claude Code master instruction | Historical — references the superseded §12 component system and pre-foundation architecture. Superseded operationally by `IMPLEMENTATION-ROADMAP.md`. |
| §22 Definition of done | Superseded by `00-portfolio-vision.md`'s own "Definition of done" (redundant, not contradictory). |
| §23 Worked example (ForceN) | Historical/illustrative only. Its "I"/"we" phrasing predates the `07` authorship taxonomy — read the taxonomy in if this example is ever reused verbatim as copy. |
| §24 (ForceN diagram specifics, between §23 and §25) | Not exhaustively reviewed against `08`'s grammar in this pass. Recommend a targeted re-check against `08-diagram-system.md` before ForceN's diagram is next touched. |
| §25.1 (diagrams as default preference) | Compatible with `08`, not superseded. |
| §25.2 (architecture: extend, don't replace) | Authoritative, unaffected. |
| §25.3 (background-bloom continuity) | Superseded by `02-design-language.md` (prior notice, restated). |
| §25.4 (comic-box shadow language) | Superseded by `02-design-language.md` (prior notice, restated). |
| §26 Interactive diagram system | §26.1 resolved (prior decision). The rest (data model, shapes, ports, ELK options, ForceN-specific gutters) remains authoritative as ForceN's implementation detail, now subordinate to `08`'s cross-project grammar — no direct conflicts found between the two on inspection. |
| §27 Spatial composition rules | Resolved in a prior decision set (rules 1–9, 11 approved; rule 10 revised). |

### Note: three overlapping evidence/metric taxonomies

Three documents each define a label set for classifying claims, and they are
**not identical**:

- `PORTFOLIO_CASE_STUDY_SYSTEM.md` §4: `verified / qualitative / estimated / reconstructed / redacted` — classifies **artifact and claim provenance** (is this a real screenshot, a reconstruction, redacted for confidentiality).
- `08-metrics-audit.md`: `verified / class-project-test-result / estimated / directional / needs-verification / remove` — an older, metrics-specific classification.
- `09-storytelling-system.md`: `Measured / Directional / Estimated / Target / Qualitative` — classifies **metric confidence** specifically (was this observed after release, an early signal, a model, or an intended future state).

Resolution: `09`'s taxonomy is authoritative for **metric confidence
labeling** going forward (it's the newest, most precise, and part of the
foundation). `PORTFOLIO_CASE_STUDY_SYSTEM.md` §4's taxonomy remains
authoritative for **artifact/visual provenance**, a different axis — a
diagram can be simultaneously "reconstructed" (§4) and show a "directional"
metric (`09`). `08-metrics-audit.md`'s classification is superseded by `09`
for metric labeling; its core rules (don't invent, don't show placeholders,
don't present estimates as hard results) remain authoritative regardless of
which label set is used.

## Canonical reading order for future sessions

This is final as of 2026-08-18 — the foundation is complete at eleven
documents and this order is not expected to be revised again except by
explicit new decision.

1. `00-portfolio-vision.md` → `10-review-checklist.md` (the eleven
   foundation documents, in order — see list above)
2. `IMPLEMENTATION-ROADMAP.md` — the phased plan; read the phase relevant to
   the current task before starting work
3. `PORTFOLIO_CASE_STUDY_SYSTEM.md` — remaining authoritative sections only:
   §4 (artifact evidence labels), §5–8 (types, tiers, artifact audit, intake
   template), §13–14 (data architecture, routing), §16 (project-specific
   plan, read with the stale-tier caveat noted above), §17 (AI workflow),
   §23–24 (worked examples, illustrative only), §26 (ForceN diagram
   implementation detail), §27 (spatial composition rules). See the mapping
   table above before treating any other section as authoritative.
4. `14-current-state-summary.md` — factual snapshot of what exists (routes,
   known bugs, component inventory). Read as historical state, not target
   state; its design-system section is pre-migration only.
5. The project-specific content document for whichever page is being worked
   on: `07-case-study-specifics.md`, `01_HERA_FERTILITY_IMPLEMENTATION.md`,
   `02_PATHPEER_IMPLEMENTATION.md`, `03_INFORMATICA_IMPLEMENTATION.md`,
   `04-selected-case-studies.md`, `02-artifact-reality-and-treatment.md`,
   `01-voice-and-positioning.md` — content, evidence, and narrative direction
   only, never their visual specifics where a notice says otherwise.
6. `08-metrics-audit.md` (core verification rules only — see the taxonomy
   note above), `CARD_REWRITE_INSTRUCTIONS.md` — copy and evidence rules.
7. `WORK_EXPERIENCE_AND_GLOBAL_POLISH_V3.md`,
   `PORTFOLIO_LAYOUT_LEGIBILITY_FINISH_PASS.md` — structural/alignment
   findings, filtered through the foundation for anything color- or
   shadow-specific.
8. This file, to confirm the status of anything not listed above before
   using it.

`00-INDEX.md` carries a short pointer to this same order; this file is the
authoritative detail behind it.

## Document status

### Authoritative (content/structure, no material conflict found)

- `01-voice-and-positioning.md` — voice, positioning lines, banned phrases;
  compatible with and supplemented by `09-storytelling-system.md`'s Voice
  section (near-identical avoid-list, more complete argument structure).
- `07-case-study-specifics.md` — per-project section content.
- `PORTFOLIO_LAYOUT_LEGIBILITY_FINISH_PASS.md` — alignment, dead-space, and
  legibility rules; no color/shadow-specific instructions were found in it
  that conflict with the foundation.

### Authoritative, supplemented by the foundation (no conflict, but read both)

- `04-selected-case-studies.md` — which five case studies were originally
  proposed; now supplemented by `09`'s "Portfolio proof map" as the
  evidence-based method for confirming/revising the featured set. See its
  own notice.
- `08-metrics-audit.md` — core verification rules remain authoritative; its
  classification list is superseded for metric labeling by `09`'s evidence
  language taxonomy. See its own notice and the taxonomy note above.
- `CARD_REWRITE_INSTRUCTIONS.md` — card copy format and banned words remain
  authoritative; the card-grid visual presentation it assumed is superseded
  by `06`'s Project index item spec. See its own notice.

### Authoritative for content/structure only (visual specifics superseded)

- `01_HERA_FERTILITY_IMPLEMENTATION.md` — page structure and narrative spine
  authoritative; its "Visual direction" section (sky/cauliflower blues, warm
  ivory/beige) is superseded by `02-design-language.md`'s token system.
- `02_PATHPEER_IMPLEMENTATION.md` — page structure and narrative spine
  authoritative; its "Visual direction" section (orange/blue/white,
  orange-to-blue gradients) is superseded.
- `03_INFORMATICA_IMPLEMENTATION.md` — page structure and narrative spine
  authoritative; its "Visual direction" section (sky blue/red palette) is
  superseded.
- `04_OVERNIGHT_EXECUTION_AND_QA.md` — execution order and content/truth QA
  authoritative; its "Design QA" section's shadow/border/gradient language is
  superseded by the foundation's QA criteria.
- `06-project-card-types.md` — the three card-type categories (visual /
  systems-process / archive) remain authoritative for content; their visual
  specifics (artifact-chip styling, etc.) route through the new token system.
- `WORK_EXPERIENCE_AND_GLOBAL_POLISH_V3.md` — structural fixes (numbering,
  alignment, hover hierarchy, table hover, diagram legibility, media sizing)
  authoritative; per-project color instructions (Greenhouse's pale
  beige/off-white/green, PathPeer's orange-to-blue gradients, Informatica's
  light-blue/red backgrounds) are superseded.
- `11-implementation-checklist.md` — the general implementation-step pattern
  and final-quality-check question format remain a useful pattern; steps 8–9
  (old homepage structure, old hero copy) are superseded by
  `03-layout-system.md` / `04-hero-system.md`. Its project-tier priority list
  (step 13, "keep PathPeer and Informatica in supporting/archive treatment")
  conflicts with the newer `00_MASTER_INSTRUCTIONS.md` implementation set —
  this is a pre-existing conflict the 2026-08-18 decisions do not resolve
  (see Unresolved conflicts below).
- `02-artifact-reality-and-treatment.md` — the artifact-strength ranking and
  truth/evidence rules remain authoritative; its PathPeer/Informatica
  archive-only tier instruction has the same pre-existing, unresolved
  conflict noted above.
- `PORTFOLIO_CASE_STUDY_SYSTEM.md` — see the full section-by-section
  supersession mapping table above (added 2026-08-18 against `06`–`10`).
  Summary: §9 (case-study architecture), §10 (visual storytelling), §11
  (writing style), §12 (components), §19 (page design), §20 (QA), §22
  (definition of done) are superseded by the newer, more precise foundation
  documents. §4's "I"/"we" ownership language is superseded by `07`'s
  authorship taxonomy. §18 is partially superseded (homepage project index
  only). Everything else in the mapping table remains authoritative.

### Historical/reference only (superseded, kept for record)

- `03-homepage-and-hero.md` — hero copy/structure superseded by
  `04-hero-system.md` and `03-layout-system.md`'s homepage section.
- `05-sections-design-work-how-i-work.md` — "Design Work" / "How I Work"
  sections were never implemented and have no equivalent slot in
  `03-layout-system.md`'s leaner homepage structure. Kept for the underlying
  content ideas only, not as a section spec.
- `09-skills-section.md` — skills-grouping content idea never implemented;
  no conflict with the foundation, but no current structural home either.
- `10-visual-style.md` — general visual-style direction superseded by the
  more precise `01-design-philosophy.md` and `02-design-language.md`.
- `12-visual-direction-decisions.md` — its own header already marks it as a
  messy running log superseded by `13-final-hero-homepage-spec.md`. Since 13
  is now itself historical (below), 12 is doubly so.
- `13-final-hero-homepage-spec.md` — was "approved, ready to implement"
  under the pre-freeze system. Conflicts with the foundation on: base
  palette (warm paper vs. near-black), simultaneous multi-accent pill/card
  colors vs. one accent family, decorative gradients (hero blooms, CTA
  gradient, dark stat-strip) vs. gradients reserved for light-falloff/data
  only, and the card fill-on-hover effect vs. no page-field recoloring. Its
  hero concept (pill tags, photo stack, hand-drawn signature) is fully
  replaced by `04-hero-system.md`'s atmospheric SVG-contour hero. Section
  order is superseded by `03-layout-system.md`'s homepage structure. Kept
  for historical record only.
- `15-dark-section-gradient-options.md` — moot: decorative section gradients
  are excluded by `01-design-philosophy.md`'s anti-pattern list and
  `02-design-language.md`'s gradient rule (light-falloff/data only).
- `14-current-state-summary.md` — its "Design system (current, locked in)"
  section describes the pre-migration palette/box-language/gradient system
  and is now historical only. Its site-structure, routes, and known-bug
  sections remain factually useful as a record of what exists.

## Unresolved conflicts not addressed by the 2026-08-18 decisions

All five conflicts previously listed here (PathPeer/Informatica depth tier,
hero signature motif, marquee strip, Work Experience section scope, rotating
stat-strip headline) were resolved in the second decision set above. None
remain open from the visual-migration decisions.

Open items introduced by reading `06-component-system.md`,
`07-case-study-system.md`, and `08-diagram-system.md` (2026-08-18) are not
yet formally recorded here — see the chat report from that reading session
for a preliminary list. They will be folded into this file once the
remaining storytelling and review documents are available.

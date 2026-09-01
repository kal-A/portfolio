# Portfolio Redesign — Instruction Index

This directory is the source of truth for the portfolio redesign.

> **Design freeze, 2026-08-18 — foundation complete.** Eleven documents
> (`00-portfolio-vision.md` through `10-review-checklist.md`) now govern the
> redesign and outrank every other document in this directory where they
> conflict. See [SUPERSEDED.md](SUPERSEDED.md) for the full status of every
> older document, the complete decision record, and the section-by-section
> supersession mapping. See
> [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md) for the phased
> implementation plan. This reading order is final.

**Precedence:** `00-portfolio-vision.md` defines the precedence rule for the
whole redesign: verified facts, then the vision/philosophy principles, then
the most specific governing document, then the current implementation. If
anything conflicts, `SUPERSEDED.md` records the resolution; if it isn't
recorded there, treat it as an open conflict and ask rather than guessing.

## Canonical reading order (final, 2026-08-18)

0. **Session continuity — read first, before the foundation, every session:**
   [`CURRENT-HANDOFF.md`](CURRENT-HANDOFF.md) (what phase implementation is
   actually in, right now, and the exact next action — this is the one
   document written to let a fresh session continue with zero prior
   context) and [`MIGRATION-INVENTORY.md`](MIGRATION-INVENTORY.md) (the
   verified Phase 1 baseline: routes, components, tokens, dead code,
   hardcoded-color counts, QA capability — ground truth for what exists).
   Both are living documents — update them, don't just read them, whenever
   a phase's status changes.
1. **Foundation — read in full, in order, before anything else:**
   [00-portfolio-vision.md](00-portfolio-vision.md) ·
   [01-design-philosophy.md](01-design-philosophy.md) ·
   [02-design-language.md](02-design-language.md) ·
   [03-layout-system.md](03-layout-system.md) ·
   [04-hero-system.md](04-hero-system.md) ·
   [05-motion-system.md](05-motion-system.md) ·
   [06-component-system.md](06-component-system.md) ·
   [07-case-study-system.md](07-case-study-system.md) ·
   [08-diagram-system.md](08-diagram-system.md) ·
   [09-storytelling-system.md](09-storytelling-system.md) ·
   [10-review-checklist.md](10-review-checklist.md)
2. [`IMPLEMENTATION-ROADMAP.md`](IMPLEMENTATION-ROADMAP.md) — the phased plan; read the relevant phase before starting work
3. [`PORTFOLIO_CASE_STUDY_SYSTEM.md`](../../PORTFOLIO_CASE_STUDY_SYSTEM.md) — remaining-authoritative sections only (§4–8, §13–14, §16, §17, §23–24, §26, §27) — see `SUPERSEDED.md`'s mapping table before treating any other section as authoritative
4. [14-current-state-summary.md](14-current-state-summary.md) — factual snapshot of what exists (routes, known bugs); its design-system section is pre-migration only
5. The relevant project-specific content document for the page being worked on: [07-case-study-specifics.md](07-case-study-specifics.md), `01_HERA_FERTILITY_IMPLEMENTATION.md`, `02_PATHPEER_IMPLEMENTATION.md`, `03_INFORMATICA_IMPLEMENTATION.md`, [04-selected-case-studies.md](04-selected-case-studies.md), [02-artifact-reality-and-treatment.md](02-artifact-reality-and-treatment.md), [01-voice-and-positioning.md](01-voice-and-positioning.md) — content/evidence direction only, per each document's notice
6. [08-metrics-audit.md](08-metrics-audit.md) (core rules only), [`CARD_REWRITE_INSTRUCTIONS.md`](CARD_REWRITE_INSTRUCTIONS.md) — copy and evidence rules
7. `WORK_EXPERIENCE_AND_GLOBAL_POLISH_V3.md`, `PORTFOLIO_LAYOUT_LEGIBILITY_FINISH_PASS.md` — structural/alignment findings, filtered through the foundation for anything color- or shadow-specific
8. [SUPERSEDED.md](SUPERSEDED.md) — check before treating anything not listed above as authoritative

Documents outside this list (`03-homepage-and-hero.md`,
`05-sections-design-work-how-i-work.md`, `09-skills-section.md`,
`10-visual-style.md`, `11-implementation-checklist.md`,
`12-visual-direction-decisions.md`, `13-final-hero-homepage-spec.md`,
`15-dark-section-gradient-options.md`) are historical only — see
`SUPERSEDED.md`.

## How to use this as a Claude Code session

Don't load everything into context up front. Instead:

- Starting fresh → read the eleven foundation documents in order, then
  `IMPLEMENTATION-ROADMAP.md`.
- Working on the homepage or hero → read `03-layout-system.md`,
  `04-hero-system.md`, `06-component-system.md`.
- Working on a specific case study → read `07-case-study-system.md`,
  `08-diagram-system.md` if it has a diagram, `09-storytelling-system.md`,
  the project's own implementation/specifics document (content only), and
  `PORTFOLIO_CASE_STUDY_SYSTEM.md`'s remaining-authoritative sections for
  that project.
- Working on motion of any kind → read `05-motion-system.md` first.
- Writing or editing copy → read `09-storytelling-system.md` and
  `01-voice-and-positioning.md`.
- Before calling anything done → run `10-review-checklist.md` and check
  `SUPERSEDED.md` for any unresolved conflict that touches the page you
  changed.

# Portfolio Redesign — Instruction Index

This directory is the source of truth for the portfolio redesign, split from
the original `# DESIGN_DIRECTION_INSTRUCTIONS.md.txt` into focused files so a
Claude Code session can load only what's relevant to the current step instead
of parsing one large document every time.

**Precedence:** If anything here conflicts with the older
[`CARD_REWRITE_INSTRUCTIONS.md`](../../CARD_REWRITE_INSTRUCTIONS.md) at the
repo root, **this directory wins**. The card-rewrite file's copy rules (avoid
list, card format) still apply and are compatible with this direction — this
directory adds full site structure, positioning, and per-project treatment on
top of it.

## Reading order

1. [01-voice-and-positioning.md](01-voice-and-positioning.md) — overall goal, voice, core positioning
2. [02-artifact-reality-and-treatment.md](02-artifact-reality-and-treatment.md) — which projects get which treatment, and why
3. [03-homepage-and-hero.md](03-homepage-and-hero.md) — homepage section structure + hero copy direction
4. [04-selected-case-studies.md](04-selected-case-studies.md) — the 5 featured case studies and their framing
5. [05-sections-design-work-how-i-work.md](05-sections-design-work-how-i-work.md) — "Design Work" and "How I Work" sections
6. [06-project-card-types.md](06-project-card-types.md) — visual card vs. systems/process card vs. archive card
7. [07-case-study-specifics.md](07-case-study-specifics.md) — per-project section-by-section instructions (ForceN, RoomEase, Greenhouse, Hera, HCI/Pill Pal, PathPeer, Informatica)
8. [08-metrics-audit.md](08-metrics-audit.md) — rules for verifying/rewriting every metric and claim
9. [09-skills-section.md](09-skills-section.md) — replacement for the generic skills grid
10. [10-visual-style.md](10-visual-style.md) — visual style direction, do/avoid
11. [11-implementation-checklist.md](11-implementation-checklist.md) — step-by-step implementation order + final quality check

## How to use this as a Claude Code session

Don't load all 11 files into context up front. Instead:

- Starting fresh → read `01`, `02`, `03` first to get oriented.
- Working on the homepage → read `03`, `05`, `09`, `10`.
- Working on a specific case study → read `04`, `07` (just that project's
  section), and `08` for metrics rules.
- Working on card components → read `06`, `10`.
- Before calling anything done → read `11` (final quality check section).

# Project Card Rewrite — Instructions for Claude Code

> **Superseded by [`docs/redesign/00-INDEX.md`](docs/redesign/00-INDEX.md)
> for anything beyond copy rules.** That directory is now the source of truth
> for full site structure, positioning, and per-project treatment. This file's
> card-format and banned-word rules below still apply and are compatible with
> it — read both, but `docs/redesign/` wins on conflicts.

## Goal

Rewrite the project cards in `lib/content/case-studies.ts` (and any card-rendering
components in `app/page.tsx`, `app/work/page.tsx`) so they read like grounded
case-study teasers instead of generic AI-generated portfolio copy.

## Per-card requirements

For each project card:

- Start with the real problem, not the buzzword.
- Show what was messy or unclear.
- Say what was actually done — plainly, not heroically.
- Only include metrics if they are verified (i.e. actually appear in a source
  document, resume, or other confirmed record).
- If a metric is not verified, replace it with a qualitative but concrete
  outcome instead of a fabricated or unverifiable number.
- Keep the writing sharp and human. No filler, no resume-speak.

## Card format

Each card should contain:

1. **Project name** — `Project Name — Role/Context`
2. **Small category label**
3. **One-line problem statement**
4. **2–3 sentence description** of what was messy and what was actually done
5. **3 tags**
6. **Evidence/impact line** — what actually backs this up (artifacts, systems,
   documents), not just a metric

## Words/phrases to avoid

- "0→1"
- "transformed"
- "revolutionized"
- "seamless"
- "leveraged"
- "cut drop-off in half" (unless verified)
- "2x retention" (unless verified)

## Worked examples

### ForceN (should be a focal point)

**ForceN — Product Engineering Co-op**

Turning production handoffs into a trackable system.

ForceN's dev kit process touched procurement, assembly, calibration,
inventory, and shipment. I helped make that workflow easier to track by
organizing unit status, clarifying handoffs, and coordinating across
engineering and operations so fewer details lived only in people's heads.

**Tags:** Product Operations · Hardware Workflow · Process Design

**Evidence:** internal tracking system, production workflow, shipped unit records

---

### RoomEase

**RoomEase — Capstone Project**

Making club room booking less scattered.

University clubs were piecing together room information from different
people, forms, and institutional constraints. I helped turn that messy
process into a structured booking flow: gathering requirements from student
organizations, mapping room data, designing the interface, and defining the
allocation logic behind it.

**Tags:** Product Requirements · UX Design · Systems Thinking

**Evidence:** Capstone report, Figma prototype, room dataset, presentation deck

---

## Design direction

See [`docs/redesign/10-visual-style.md`](docs/redesign/10-visual-style.md)
for full visual style direction.

## Scope

Apply this rewrite to all existing case studies: Hera Fertility, RoomEase,
Greenhouse Juices, Pill Pal, and add ForceN as a new featured card (currently
ForceN only exists in `lib/content/experience.ts` as an internship entry, not
as a full case study/card).

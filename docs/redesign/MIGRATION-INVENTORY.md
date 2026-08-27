# Migration Inventory — Phase 1 Baseline

**Produced:** 2026-08-18, as Phase 1 of `IMPLEMENTATION-ROADMAP.md`
("Current-state baseline and migration inventory"). Read-only findings —
no application code was changed to produce this document.
**Purpose:** exact, verified ground truth for what exists before Phase 2
onward starts changing it. Where a later phase's report contradicts this
file, trust the later phase's re-verification and update this file to match
— it is a snapshot, not a standing guarantee.

## Routes and renderers

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Hero, Marquee, Selected Case Studies, Work Experience, stat strip, CTA |
| `/work` | `app/work/page.tsx` | Renders `components/WorkTabs.tsx` (client component, "Work experience" / "Projects" tab toggle) |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | Generic renderer exists (267 lines) but is **dead code** — every current slug short-circuits to its own bespoke component before reaching it |
| `/work/greenhouse/[channel]` | `app/work/greenhouse/[channel]/page.tsx` | Third, Greenhouse-specific dynamic route for channel galleries; uses its own `GREEN_VARS` CSS-variable override object |
| `/about` | `app/about/page.tsx` | 97 lines; has its own `toolGroups` skills list |
| `/resume` | `app/resume/page.tsx` | 69 lines; links a static PDF at `/resume/Kamal-Ahsan-Resume.pdf` |
| `/contact` | `app/contact/page.tsx` | 54 lines |

**`/experience` does not exist as a separate route.** `14-current-state-summary.md`
documents it as one; that's now stale — it was merged into `/work` via
`WorkTabs.tsx`'s tab toggle at some point in the project's history (consistent
with `PORTFOLIO_CASE_STUDY_SYSTEM.md` §25.2's "after this session's
Experience/Work merge" note). See that document's own updated notice.

## Global fonts, tokens, styles, animation

- `app/layout.tsx` loads four fonts via `next/font/google`: `Geist`
  (`--font-geist-sans`), `Geist_Mono` (`--font-geist-mono`),
  `DM_Serif_Display` (`--font-dm-serif`), `Caveat` (`--font-caveat`, used
  only by `components/Signature.tsx`).
- `app/globals.css` is 188 lines total. Raw `:root` variables today:
  `--background: #ffffff`, `--foreground: #171717`, `--ink: #201c17`,
  `--ink-soft: #5c564c`, plus six `--cs-*` variables that set the default
  (ForceN-amber) comic-box tint: `--cs-wash-from/to`, `--cs-light-from/to`,
  `--cs-accent-deep`, `--cs-accent-wash-rgb`.
- Tailwind v4, CSS-first config (`@import "tailwindcss"` + `@theme inline`
  in `globals.css`). No separate `tailwind.config.*` file exists.
- The entire comic-box system (`.cs-box`, `.cs-pill`, `.cs-seam`,
  `.opn-link`, `.cs-hover-row`, `.cs-table`) lives in this one file —
  centralized, not duplicated per component.
- Per-project accent colors are injected via inline `style` objects that
  override the six `--cs-*` variables on a page's root wrapper (confirmed
  directly in `app/work/greenhouse/[channel]/page.tsx`'s `GREEN_VARS`
  object), not through `globals.css` selectors per project.
- `<body>` in `app/layout.tsx` hardcodes `bg-[#fdfaf5]` directly (Tailwind
  arbitrary-value class), not a token reference.

## Shared vs. duplicated components

**Genuinely shared, low migration risk:**
- `components/Reveal.tsx` — real `IntersectionObserver`, single-fire, 0.2
  threshold, 700ms duration, 20px translate. Close to but not exactly
  matching `05-motion-system.md`'s Section-reveal spec (280–500ms, 8–16px) —
  needs tuning, not rebuilding.
- `components/Nav.tsx`, `components/Footer.tsx` — small, single
  implementations each.
- ~~`components/CaseStudyCard.tsx` (115 lines) — already the **single** card
  component used by both the homepage and `/work` today.~~ — **superseded
  and removed, Phase 6.** Replaced by `components/ui/ProjectIndexItem.tsx`
  (the editorial index row from `06-component-system.md`) on both the
  homepage and `/work`; re-grepped for zero references immediately before
  deletion.
- `components/Metric.tsx` (18 lines) — renders inside `.cs-box`, i.e. a
  comic-box card. Confirms the Phase 9 metric rebuild (renumbered
  2026-08-19; was Phase 7 before the reference-audit/homepage-reconcept
  phases were inserted) is structural, not a token remap.
- `components/ProjectIcon.tsx`, `components/Tag.tsx` — small, already shared.
- `components/case-study/blocks/*` (10 files) — `Chapter.tsx` (37 lines) is
  already one shared section-numbering component (large pale numeral +
  heading + left border), reused across most case studies. `SnapshotGrid.tsx`,
  `StatGrid.tsx`, `ProcessFlow.tsx`, `Icon.tsx`, `VideoBlock.tsx`,
  `SketchPanel.tsx`, `ExpandableIssueList.tsx`, `CategoryGrid.tsx` are also
  shared; `ChannelCollage.tsx` (131 lines) appears Greenhouse-specific.
- `components/case-study/Diagram.tsx` (47 lines) — a thin dispatcher keyed
  by figure ID, with a visible "not built yet" fallback state for unbuilt
  diagrams.

**Duplicated, high migration value:** the eight top-level `*CaseStudy.tsx`
components each hand-build their own hero background gradient, their own
table-of-contents data array (with duplicated inline SVG icon paths —
confirmed directly inside `ForceNCaseStudy.tsx`), and their own page
composition, instead of composing shared primitives:

| Component | Lines | Hardcoded hex-color literals |
|---|---:|---:|
| `ChronicleCaseStudy.tsx` | 870 | 86 |
| `InformaticaCaseStudy.tsx` | 876 | 76 |
| `PillPalCaseStudy.tsx` | 1,116 | 75 |
| `RoomEaseCaseStudy.tsx` | 940 | 67 |
| `ForceNCaseStudy.tsx` | 770 | 67 |
| `HeraCaseStudy.tsx` | 1,287 | 58 |
| `PathPeerCaseStudy.tsx` | 942 | 51 |
| `GreenhouseCaseStudy.tsx` | 421 | 31 |

Greenhouse is the smallest by both line count and hardcoded-color count —
the two measures independently agree it's the safest migration pilot.

Other measured hex-literal counts: `app/page.tsx` 27, `CaseStudyCard.tsx`
10, `ForceNWorkflowDiagram.tsx` 14, `RoomEaseAllocationDiagram.tsx` 9,
`app/work/page.tsx` 7, `Footer.tsx` 5, `Nav.tsx` 4, `Diagram.tsx` 0.

~~**Not yet covered by any roadmap phase:** `/about`, `/contact`, `/resume`,
and `/work`'s own hero band...~~ — **done, Phase 6.** All four migrated to
tokens/primitives; `/resume`'s top section and `/contact`'s links block
(previously no explicit background at all) now have real section
backgrounds — see `IMPLEMENTATION-ROADMAP.md`'s Phase 6 entry and
`CURRENT-HANDOFF.md`.

## lib/content data files

`case-studies.ts` (640 lines, the `CaseStudy` interface and all 8 entries),
`theme.ts` (113 lines, `ProjectTheme` interface + 8 per-project theme
objects — clean, data-driven, one file), `experience.ts`, `projects.ts`,
`forcen-workflow.ts`, `greenhouse-channels.ts`.

## Diagrams and ELK usage

`elkjs` is a direct dependency, imported and used **only** inside
`components/case-study/ForceNWorkflowDiagram.tsx` (confirmed by grep — no
match in `RoomEaseAllocationDiagram.tsx` or `Diagram.tsx`). Matches
decision 3 (retain the hybrid: semantic HTML/CSS + hand-built SVG + ELK
only where it materially helps, no React Flow) with zero drift to correct.

## Dead/unreachable code (confirmed, not removed)

- ~~`components/Marquee.tsx`, `components/Signature.tsx`,
  `components/RotatingWord.tsx` — each imported and used in exactly one
  place, `app/page.tsx`, confirmed by grep across the whole `app/` and
  `components/` tree. Clean removal candidates for Phase 5/6.~~ —
  **resolved, Phase 5.** Re-grepped immediately before deletion (zero
  remaining references besides their own files and a comment in
  `app/layout.tsx`, which was updated); all three files deleted. See
  `CURRENT-HANDOFF.md`'s Phase 5 section.
- The generic-renderer body in `app/work/[slug]/page.tsx` (roughly lines
  39–266) — confirmed unreachable; every current slug returns early to its
  own bespoke component first.

## Test/lint/typecheck/build/browser-QA capability

- `package.json` scripts: `dev`, `build`, `start`, `lint`. **No test
  framework is installed** — no Jest/Vitest/Playwright/Testing Library.
  There is no automated regression test suite of any kind today.
- **Repaired, 2026-08-18 (Phase 1→2 transition):** this worktree had no
  `node_modules` of its own — Node was resolving modules from the parent
  repo's `node_modules` (`D:\Full time Grind\Portfolio\node_modules`),
  which was missing the transitive dependency `resolve`, breaking
  `eslint-config-next` → `eslint-plugin-react`. Running `npm ci` inside the
  worktree (restoring strictly from the committed `package-lock.json`, no
  dependency additions/upgrades) created a worktree-local `node_modules`
  and fully resolved it — no manifest/lockfile edit was needed. Verified
  `package.json`/`package-lock.json` unchanged before and after
  (`git status` clean on both).
- **Current baseline, all green:** `npx tsc --noEmit` — clean, no errors.
  `npm run lint` — clean, exit 0. `npm run build` — succeeds, all 20 static
  routes generate (`/`, `/about`, `/contact`, `/resume`, `/work`, all 8
  `/work/[slug]` case studies, all 4 `/work/greenhouse/[channel]` galleries,
  `/_not-found`). One benign warning: Next.js detects the two coexisting
  lockfiles (worktree + parent repo) and infers the parent as workspace
  root — not an error, not fixed (would mean touching `next.config`/
  removing a lockfile, out of scope here).
- Browser verification is available via `.claude/launch.json`'s
  `portfolio-dev` configuration (`npm run dev`, port 3000).
- **Updated, Phase 3:** this worktree and the parent repo
  (`D:\Full time Grind\Portfolio`) coexist with their own
  `package-lock.json` each, which made Next/Turbopack infer the parent as
  the workspace root and intermittently resolve `next` itself from the
  parent's `node_modules` — corrupted at the OS level there, independent of
  this session. This caused `next dev` to fail outright and `next build` to
  fail non-deterministically (same source, no changes, alternating
  pass/fail across consecutive runs). Fixed via `turbopack.root` /
  `outputFileTracingRoot` in `next.config.ts`, pinned to this worktree.
  `npm run build` + `npm start` confirmed stable afterward; `npm run dev`
  itself was not re-tested post-fix.

## Assets

86 real files under `public/case-studies/`: Greenhouse 35 (heaviest,
consistent with its documented artifact strength), Pill Pal 20,
Hera-fertility 8, RoomEase's video subfolder 7+7 (video + poster images),
RoomEase-root/PathPeer/ForceN/Chronicle 1–2 each, Informatica 1. No
placeholder-named asset files found on disk — the hero's "placeholder
gradients" (noted in prior-session memory) are CSS-generated inline, not
files, so there's nothing to clean up for them specifically. The Phase 5
hero's own placeholder SVG contour and atmospheric image do not exist yet
as of this writing.

## Highest-risk migration areas (carried into the roadmap)

1. The hero rebuild (Phase 5) — no existing component to extend from.
2. ~~`Nav.tsx` has no mobile menu at all today~~ — **resolved, Phase 4.**
   Built and verified: focus-trapped, Escape-closing, scroll-locked compact
   menu. See `CURRENT-HANDOFF.md`'s Phase 4 section.
3. The Metric/evidence-component rebuild (Phase 9, renumbered 2026-08-19) — the most-repeated
   component across every case study; a mistake here is the most expensive
   to unwind.
4. Motion values that already exceed the new spec:
   `CaseStudyCard.tsx`'s hover uses `scale-[1.02]` (over `05`'s ≤1.015 cap)
   plus a `-0.4deg` rotate not present in `05`'s allowed-patterns list at
   all; `Reveal.tsx`'s 700ms/20px exceed `05`'s 280–500ms/8–16px range.
5. The broken lint environment, addressed at the Phase 1→2 transition —
   see the handoff document for outcome.

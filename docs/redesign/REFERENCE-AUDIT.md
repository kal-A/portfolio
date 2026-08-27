# Reference-Grounded Visual Audit

**Status:** Phase 7 deliverable — audit only, no implementation
**Depends on:** [00-portfolio-vision.md](./00-portfolio-vision.md), [01-design-philosophy.md](./01-design-philosophy.md), [06-component-system.md](./06-component-system.md), [09-storytelling-system.md](./09-storytelling-system.md)
**Method:** Every external reference cited below was either opened live this session (get_page_text + accessibility-tree read + screenshot where the environment's screenshot compositor allowed it — noted per-site) or is carried forward from [reference_portfolio_design_library.md](../../../../../.claude/../memory) with the "actually opened and inspected in-browser" verification already on record. Nothing here is worked from training-data memory of what these sites "probably" look like. Every internal-implementation claim below was extracted by reading the actual current source files (`app/page.tsx`, `components/Hero.tsx`, `components/Nav.tsx`, `components/Footer.tsx`, `components/ui/ProjectIndexItem.tsx`, `components/SelectedExperience.tsx`, `app/work/page.tsx`, `components/WorkTabs.tsx`, `components/case-study/RoomEaseCaseStudy.tsx` and its `blocks/`, `app/globals.css`, `app/layout.tsx`), not summarized from memory of building them.

---

## Executive Summary

The system underneath this portfolio is sound. The token set in `app/globals.css` is disciplined, the type scale is considered, the motion system is genuinely restrained in the way [01-design-philosophy.md](./01-design-philosophy.md) asks for, and the editorial numbered-row pattern (`ProjectIndexItem`) is *the same pattern* used by Aarron Walter — ex-Mailchimp UX director, a genuinely credible reference — on his own site. This is not a case of the wrong direction. It's a case of a direction that was correctly specified and then **quietly under-built** at several specific, checkable points, each of which independently reads as "template" to a trained eye.

The single highest-leverage finding: **[06-component-system.md](./06-component-system.md) line 66 requires a "purposeful thumbnail or media" as required content for the Project index item.** The Phase 6 implementation of `ProjectIndexItem.tsx` explicitly and deliberately omits it (the component's own code comment says so). That is not a style disagreement — it is an unmet requirement in the project's own authoritative spec, and it is the reason the homepage's two most important sections ("Selected work," "Selected Experience") are nine rows of numeral + headline + paragraph with nothing else to look at. Every single reference site reviewed this session — from the most maximalist (Havana Nguyen) to the most restrained (Aarron Walter, Moritz Oesterlau) — pairs its work list with *something visual*: a photo, a project image, a brand-name credibility marker. Ours pairs it with nothing.

Layered on top of that gap: two sections of the homepage (`app/page.tsx` lines 90 and 113) still use hardcoded raw-hex gradients instead of the token system, creating a visible seam partway down the page; the case-study layer (`components/case-study/*`) is a completely different visual system from the homepage (comic-box borders, cream/amber palette, Tailwind arbitrary values) with no token bridge between them; every row at every density is identical in visual weight, so nothing on the page is allowed to be the loudest thing on the page; and the hero's headline follows the single most common portfolio-hero sentence template in existence ("I [verb] [nouns] for [audience]").

None of this requires a new design language. It requires finishing the one that's already specified, and it requires **subtraction before addition** — several sections should shrink or merge before anything new is added, per the brief's own instruction.

This audit does not propose new direction. Every correction below cites the existing foundation document, the existing reference table in [01-design-philosophy.md](./01-design-philosophy.md), or a specific live reference reviewed this session.

---

## Top 10 Reasons The Portfolio Still Feels AI-Generated

Ranked highest → lowest impact. Each cites the exact visual decision responsible, not a vague impression.

1. **Zero imagery in the two most important sections of the homepage.** "Selected work" (4 rows) and "Selected Experience" (5 rows) — nine rows total, the entire proof of Kamal's work — contain no photo, screenshot, render, or logo. `ProjectIndexItem.tsx` lines 13–17 state this is deliberate: *"no single visual asset exists uniformly across every project ... the large index numeral is the row's one purposeful visual instead."* But [06-component-system.md](./06-component-system.md) line 66 requires "purposeful thumbnail or media" as required content, not optional. A large serif numeral is typography, not media — it satisfies nothing an AI-generated template wouldn't also produce for free.

2. **Two raw-hex, non-token sections sitting directly inside the token system.** `app/page.tsx` line 90: `linear-gradient(160deg, #17232e 0%, #362d1a 55%, #1c2a1c 100%)`. Line 113: `linear-gradient(135deg,#f0c9b8,#f6ded0)`. Both use raw Tailwind classes (`text-neutral-50`, `text-neutral-900`, `font-serif`) instead of `--color-text`/`--font-display`. A page that is disciplined about tokens for 80% of its length and then abruptly isn't, twice, in its last two sections, reads exactly like several different people (or several different AI passes) touched the file at different times — because that's what happened.

3. **No real photograph, illustration, or likeness of the person anywhere on the site.** Every reference reviewed live this session that a senior reviewer would find credible — Sam Dickie, Kane Sherwell, Havana Nguyen, Nicolas Backal (implied), Pratibha Joshi — opens with a real photo, illustrated self-portrait, or a portrait-adjacent device (Kane Sherwell's photo is set against a hand-illustrated shape with hand-drawn squiggle accents). The current hero uses an abstract SVG head/shoulders contour instead. That's a defensible choice per [01-design-philosophy.md](./01-design-philosophy.md)'s explicit rejection of "cinematic hero" imagery — but it also forfeits the cheapest, most reliable "a specific human made this" signal that exists, and nothing replaces it elsewhere on the page.

4. **Every row, at every density, carries identical visual weight.** All 4 `ProjectIndexItem` rows are the same size regardless of which project is strongest. All 5 `SelectedExperience` rows are the same size regardless of tenure or seniority. Nothing on the homepage is allowed to be visually louder than its neighbor. Templated portfolio generators produce this by construction — uniform loops over a data array. Every reference reviewed breaks uniformity somewhere: Kane Sherwell's stat callouts float asymmetrically beside his photo at different scales; Havana Nguyen's hero type is cropped off both edges of the viewport; Aarron Walter's numbered list still varies in visual density between "MY WORK" (5 rows, brief) and the podcast section (rich metrics, guest photos, audio player).

5. **The hero headline is a template mad-lib.** *"I design products for messy real-world workflows."* The structure — first-person verb + object + "for" + audience descriptor — is the most common hero sentence in the entire portfolio genre; it's what a portfolio-generator's default placeholder text looks like. None of the seven references reviewed live this session use this structure. Gloria Lo: *"I design, sing, paint & write."* Sam Dickie: *"Hey. I'm Sam."* Nicolas Backal leads with title + employer, not a value-prop sentence at all. Pratibha Joshi leads with *"I'm Pratibha, a Product Designer at Google."* — name, then brand, then one plain sentence.

6. **No credible brand name appears above the fold.** ForceN, Greenhouse, Informatica, and Hera Fertility — Kamal's actual proof points — don't appear by name until "Selected Experience," multiple full scrolls down. Nicolas Backal's first sentence contains "Okta." Pratibha Joshi's first sentence contains "Google," "Microsoft," "Sprinklr." A reviewer skimming for five seconds (the portfolio's own stated success metric, [00-portfolio-vision.md](./00-portfolio-vision.md) line 131) currently sees zero recognizable proof before they start scrolling.

7. **Metronomic section rhythm with no pacing break.** Hero → eyebrow+h2+rows → eyebrow+h2+rows → stat-strip → CTA. Every section shares the same `Container variant="standard"` measure, same left alignment, same "small label above a heading" shape, same vertical rhythm token. There is no full-bleed moment, no alignment shift, no density change anywhere on the page to reset the reviewer's attention. [01-design-philosophy.md](./01-design-philosophy.md)'s own "visual character" list asks for "cinematic, not theatrical" — the current page is neither; it's uninterrupted.

8. **The one motion moment is too quiet to register.** The hero contour fade+mask-sweep (`components/Hero.tsx` lines 137–189) is well-built, spec-compliant, and genuinely restrained the way the motion system asks — but it animates a low-opacity (`0.7`) line-art silhouette that most reviewers will not consciously perceive as an entrance at all. It is also the *only* motion moment site-wide beyond hover states and scroll-reveal fades. One register, played quietly, is not memorable — it's just quiet.

9. **The case-study layer is a visually different product from the homepage.** Confirmed directly in `RoomEaseCaseStudy.tsx` and its `blocks/`: cream/amber `.cs-box` comic-box borders (`box-shadow: 5px 5px 0 var(--ink)`), raw hex constants, Tailwind arbitrary values — none of the `--color-*`/`--text-*` tokens the homepage uses. Clicking from the dark, serif, restrained homepage into a cream, bordered, comic-panel case study is a jarring identity switch that reads as "assembled from parts," directly against [00-portfolio-vision.md](./00-portfolio-vision.md)'s own definition-of-done: "shared tokens and components govern every active page."

10. **No small hand-touches anywhere.** Contrast: Aarron Walter's footer has a "FILE A BUG" colophon link. Moritz Oesterlau's CTA reads "LET'S W🚀RK T_G_TH_R" — a deliberate typographic wink. Sam Dickie's "Who Am I?" button is rotated a few degrees off-grid like a sticky note. Kane Sherwell's hero has a hand-drawn squiggle line as a pure decorative flourish. None of these are expensive. None require breaking restraint — they're single, deliberate, imperfect details inside an otherwise disciplined system. The current site has zero of them; every element is exactly where a grid would put it.

---

## Reference Translation Gaps

[01-design-philosophy.md](./01-design-philosophy.md) already has a Reference Translation table (Meng To, Kage, Josh Warner, Matthew Yu, QED Labs, Mercury, July Fund, NoCode, COS/Lemaire/Aesop). That table is authoritative and is **extended**, not replaced, below with the Priority-1 references reviewed this session.

| Reference | What makes it successful | How our portfolio differs | Exact correction |
|---|---|---|---|
| **Aarron Walter** (aarronwalter.com) | Numbered "MY WORK" list (01–05) — structurally identical to our `ProjectIndexItem` — but each entry sits inside a page that opens with a photo-free but *name-dense* hero ("advising the White House, WHO") and closes with a podcast section carrying live subscriber/episode counts and named guest credibility (Paula Scher, Tony Fadell). Personality comes from specificity of claim, not decoration. | Our numbered-row pattern is already correct. What's missing is the specificity: our rows already avoid generic phrasing per [09-storytelling-system.md](./09-storytelling-system.md), but nothing on the page states a hard, named credibility fact (a company name, a scale number) before the fold. | Pull one hard proof point (a company name, a user count, a scale number already documented in a case study) into the hero subhead or directly beneath it — not as a new metric, as a *relocation* of one that already exists in `Selected Experience`. |
| **Nicolas Backal** (nicolasbackal.com) | Leads with title + employer in sentence one ("Director of Product Design at Okta"). Selected-work entries are prose paragraphs with a single claim each, not bullet lists. A "Selected writing/talks" section builds authority through public contribution, separate from project work. | Homepage hero never names an employer or scale fact. Project rows already use single-claim prose (`cs.oneLiner`) — this part is already aligned. | No new section needed — see Aarron Walter correction above; the fix is the same relocation, not new content. |
| **Pratibha Joshi** (pratibhajoshi.com) | First sentence: name → current company (Google) → one plain sentence. Nothing else above the fold. Extreme restraint, but the credibility is front-loaded, not buried. | Our hero is equally restrained in length but spends its one sentence on a generic value-prop instead of a named fact. | Rewrite the hero's first line to follow name → most credible fact → plain sentence, matching this reference's information order without matching its literal wording. |
| **Gloria Lo** (glorialo.design) | Hero line: *"I design, sing, paint & write."* — a specific, personal, slightly surprising list, not a job-function sentence. | [00-portfolio-vision.md](./00-portfolio-vision.md)'s non-goals explicitly forbid "advertising hobbies as portfolio content" — so literal imitation is out of scope by the project's own rule. | Do not adopt the hobby-listing mechanic. Adopt the *underlying move*: replace a generic verb-phrase hero sentence with one built from something specific and true about how Kamal actually works (a real constraint, a real habit, a real number), not a hobby list. |
| **Sam Dickie** (samdickie.me) | Big, bold, colorful, illustrated — not our direction — but the one transferable technique is the "Who Am I?" button rendered at a slight rotation, like a sticky note dropped onto the page. One deliberately imperfect, off-grid element inside an otherwise gridded layout. | Every element in the current site sits exactly on-grid. Nothing is allowed to look placed rather than generated. | Introduce exactly one small, deliberate off-grid or asymmetric detail somewhere load-bearing (not decorative filler) — candidate: the hero's SVG contour anchor point, or a single pull-quote treatment in a case study. One instance, not a pattern. |
| **Kane Sherwell** (kanesherwell.com) | Real photo set against a hand-illustrated background shape, with stat callouts ("500+", "15+") floating asymmetrically at different scales beside the photo rather than in a uniform stat-strip. Hand-drawn squiggle-line accents purely for warmth. | Our stat strip (`app/page.tsx` lines 85–107) puts three stats in perfectly even columns with identical icon/number/label treatment each — the opposite of asymmetric. | If a stat strip stays, break its uniformity: vary size/position of at least one stat rather than three matched columns. Lower priority than items 1–4 above. |
| **Havana Nguyen** (havananguyen.com) | Maximalist: full-bleed photo over a graffiti-mural background, oversized type cropped off both viewport edges, hand-drawn marker doodles annotating the photo like a mood board. The opposite pole from our restrained direction — useful as a boundary marker, not a template. | N/A — not our direction, and correctly so per [01-design-philosophy.md](./01-design-philosophy.md)'s restraint principle. | Do not adopt. Cited only to establish that "personality" in this reference set spans from whisper-quiet (Aarron Walter) to maximalist (Havana Nguyen) — our target sits at the quiet end, but "quiet" in every other reference still contains at least one deliberate human touch, which ours currently lacks entirely. |
| **Moritz Oesterlau** (moritzoesterlau.de) | Sparse copy, generous use of emoji as punctuation-level accents (👋 🚀 🎓), and one playful typographic wink in the CTA ("LET'S W🚀RK T_G_TH_R"). Case-study cover lines lead with a specific claim ("Building a Website Concept Through Fast-Paced Workshops"), not a category label. | Our case-study index rows already lead with specific claims (per the RoomEase/ForceN/Greenhouse titles) — this part is aligned. Our copy has zero playful typographic moments anywhere. | Not a priority fix — cited to confirm our heading-writing discipline is already correct per [09-storytelling-system.md](./09-storytelling-system.md); no correction needed here. |
| **Meng To** *(carried forward, verified prior session)* | Newsreader serif, numbered "PLATES" index, image-dominant with a quiet caption beneath each plate, parchment-adjacent background. | We use the same serif (Newsreader) and the same numbered-index idea, but our rows have no image; Meng To's are "image-dominant." | This is the same gap as item 1 above, from the project's own primary reference. Adding purposeful media to `ProjectIndexItem` is simultaneously the fix for the component-system violation and the fix for matching our own master reference. |
| **Josh Warner** *(carried forward, verified prior session)* | Near-pure black void, whisper-thin type, one electric-green status dot as the *only* accent — restraint calibrated so that the one accent color reads as a deliberate choice, not a leftover default. Hero stage is inset with real page margins, not full-bleed. | Our accent (`--color-accent: #c89b62`) is used consistently, which is correct — but it appears in enough places (hero headline span, "Read the case study" links, tab actives, focus rings via a separate blue) that it doesn't read as singular the way Josh Warner's single dot does. | Lower priority. Audit `--color-accent` usage sitewide before Phase 8 and confirm it's reserved for genuinely singular moments rather than general-purpose emphasis. |

---

## Homepage Audit

Ranked by impact. Format: area → what references accomplish → what we currently do → failed principle → exact fix → impact.

| # | Area | References accomplish | We currently do | Principle that failed to translate | Exact fix | Impact |
|---|---|---|---|---|---|---|
| 1 | **Selected Work imagery** | Pair every work-list entry with a photo, render, or screenshot (Meng To, Aarron Walter implicitly via case links, nearly all references) | `ProjectIndexItem` renders numeral + title + one-liner + meta only — zero media (confirmed in component source, lines 13–17) | [06-component-system.md](./06-component-system.md) line 66: "purposeful thumbnail or media" is *required* content, not optional | Add one image/media slot per row using assets that already exist (`roomease/hero.png`, `forceN/homepage-hero.png`, `greenhouse/*`, `pathpeer-hero-home.png` all already exist in `public/case-studies/`) — a small fixed-aspect frame beside or above the text, not full-bleed | **HIGH** |
| 2 | **Hero credibility** | Front-load a company name or hard number in the first sentence (Nicolas Backal, Pratibha Joshi, Aarron Walter) | Hero subhead lists activities ("shipped a fintech onboarding flow, run sprints...") without naming ForceN/Hera/Greenhouse or a number until scroll | [09-storytelling-system.md](./09-storytelling-system.md): "Project summaries should be specific enough to distinguish the stories" — currently true only once you reach the rows | Name one employer and one number directly in the hero subhead (content already exists in `Selected Experience` data — relocation, not invention) | **HIGH** |
| 3 | **Hero headline template** | Avoid the generic "I [verb] for [audience]" sentence shape entirely (all 7 live references) | *"I design products for messy real-world workflows"* follows that exact shape | [01-design-philosophy.md](./01-design-philosophy.md) principle 1, "Let competence be inferred" — a value-prop sentence asserts rather than shows | Rewrite as a claim about something specific and true (an approach, a habit, a real constraint Kamal works within), not a role + audience formula | **HIGH** |
| 4 | **Token consistency at the fold between sections 3 and 4** | N/A — a consistency requirement, not a reference-borrowed idea | `app/page.tsx` lines 90 and 113 use raw hex gradients and raw Tailwind neutral-* classes instead of `--color-*`/`--font-display` tokens | [00-portfolio-vision.md](./00-portfolio-vision.md) Quality success measure: "No competing color, spacing, button, or case-study systems remain" | Rewrite both sections' backgrounds and typography to consume the existing token set — no new tokens needed, the values already exist (`--color-bg`, `--color-surface-2`, `--color-accent`, `--font-display`) | **HIGH** |
| 5 | **Row/section visual weight uniformity** | Break uniformity at least once (Kane Sherwell's asymmetric stat placement, Havana Nguyen's cropped type, Aarron Walter's density shift between the numbered list and the podcast block) | All 4 Selected Work rows and all 5 Selected Experience rows are structurally and visually identical regardless of project importance | [01-design-philosophy.md](./01-design-philosophy.md) principle 3, "Structure carries personality" — identical structure repeated 9 times reads as a loop, not a decision | Let the single strongest project (per the proof map already documented in `CURRENT-HANDOFF.md`) render larger or with more visual presence than the other three — a size/weight variant, not a new component | **MEDIUM** |
| 6 | **Section pacing/rhythm break** | At least one full-bleed, alignment-shifted, or density-different moment between the hero and the footer (nearly every reference reviewed) | Every section uses `Container variant="standard"`, same left-aligned eyebrow+h2 shape, same spacing token, in sequence | [01-design-philosophy.md](./01-design-philosophy.md) visual-character goal: "cinematic, not theatrical" — currently neither, just uninterrupted | Introduce one genuine pacing break — most natural candidate is the imagery added in fix #1, if given enough scale to interrupt the rhythm rather than sitting inline at row height | **MEDIUM** |
| 7 | **Stat strip uniformity** | Kane Sherwell floats mismatched-scale stats asymmetrically beside a photo rather than in matched columns | `Stat` component (`app/page.tsx` lines 133–143) renders 3 identical ring-icon + number + label columns | [01-design-philosophy.md](./01-design-philosophy.md) principle 3 again — same failure mode as row uniformity, smaller scale | Lower priority than #5; if the stat strip section survives the subtraction pass below, vary at least one stat's visual treatment | **LOW** |
| 8 | **Single accent discipline** | Josh Warner's one-electric-green-dot restraint | `--color-accent` appears in the hero span, case-study links, active tab state, plus a separate `--color-focus` blue for focus rings | [01-design-philosophy.md](./01-design-philosophy.md) principle 2, "Restraint creates confidence" — accent is used correctly per-instance but not singularly | Audit only — likely no change needed once imagery is added, since imagery will carry more visual weight than color can | **LOW** |
| 9 | **Micro hand-touch** | One small deliberate imperfection somewhere load-bearing (Sam Dickie's rotated button, Moritz Oesterlau's typographic wink) | Zero anywhere on the page | [01-design-philosophy.md](./01-design-philosophy.md) principle 3 | Not urgent enough to spend a whole Phase-8 pass on; fold into whichever pass touches the CTA or footer | **LOW** |

---

## Work Page Audit

| # | Area | References accomplish | We currently do | Principle that failed to translate | Exact fix | Impact |
|---|---|---|---|---|---|---|
| 1 | **Row imagery in "complete" density** | Same as homepage — a denser list still carries a small visual per entry (Meng To's "PLATES" stay image-dominant even in a dense index) | `WorkTabs.tsx` renders `ProjectIndexItem variant="complete"` — same zero-media component as the homepage, just tighter padding | [06-component-system.md](./06-component-system.md) line 69: "Variants may change media ratio, not the information hierarchy" — implies media exists at every density, just at a different ratio | Same fix as Homepage #1; the `complete` variant should use a smaller media frame, not no media | **HIGH** (inherits from the homepage-level gap) |
| 2 | **Tab-switch as the only interaction** | N/A | "Work experience"/"Projects" toggle is the page's only interactive moment beyond links | Not a documented principle violation — flagged only because it compounds finding #7 (one register) from the Top 10 list | No independent fix needed; resolves itself once imagery gives the page more to look at | **LOW** |
| 3 | **Intro copy specificity** | Front-load a scope claim (Moritz Oesterlau's category tags per case study) | `/work`'s lead paragraph ("Every internship, capstone, and course project...") is already specific and non-generic | Already aligned with [09-storytelling-system.md](./09-storytelling-system.md) | None needed | — |

---

## Case Study Audit

Based on a full read of `RoomEaseCaseStudy.tsx` (941 lines) and every shared block it uses (`Chapter`, `SnapshotGrid`, `StatGrid`, `ProcessFlow`, `VideoBlock`, `Icon`). This is the most complete case study in the codebase and is treated as representative.

| # | Area | References accomplish | We currently do | Principle that failed to translate | Exact fix | Impact |
|---|---|---|---|---|---|---|
| 1 | **System continuity from homepage** | N/A — this is an internal consistency requirement | Case studies use an entirely separate visual system: `.cs-box` comic-panel borders (`box-shadow: 5px 5px 0 var(--ink)`), cream/amber palette, raw hex constants, Tailwind arbitrary type sizes — none of the homepage's `--color-*`/`--text-*` tokens | [00-portfolio-vision.md](./00-portfolio-vision.md) definition of done: "shared tokens and components govern every active page" | This is a large, separately-scoped migration (touches 7 case-study files + shared blocks) — correctly out of scope for a single Phase 8 pass; flagged here as the largest remaining structural gap in the whole site, to be sequenced deliberately, not folded into a homepage pass | **HIGH**, but sequence separately |
| 2 | **Artifact presentation is already strong** | Media framed in a bordered card with real evidence (screenshots, videos with posters, hand-built SVG diagrams with click-to-inspect nodes) | RoomEase already does this: `hero.png` framed in `cs-box white`, 7 real video/poster pairs via `VideoBlock`, a genuinely interactive hand-positioned SVG allocation diagram with typed node shapes (event/process/decision/document) | This is a **Keep**, not a gap — flagged to make clear the case-study layer's problem is *token consistency*, not craft quality | No fix needed here | — |
| 3 | **Metrics/outcomes presentation** | Plain large numbers, no card, per [01-design-philosophy.md](./01-design-philosophy.md)'s NoCode reference row ("Plain large metrics... Reject: Card grids around every piece of content") | `StatGrid` wraps every metric in a `cs-box light` card | [01-design-philosophy.md](./01-design-philosophy.md)'s own reference table already flags this exact anti-pattern | Sequence alongside the token-migration pass in #1 — not urgent standalone, since the cards are visually well-executed even if the wrapper itself is against the documented preference | **MEDIUM**, bundle with #1 |
| 4 | **Reflection/ending section** | Match Informatica's structural standard per prior project decision (see project memory on case-study ending alignment) | RoomEase's ending (section 08) already follows the 4-card + "what I'd improve" + closing-note structure | Already aligned, per the standard set in an earlier session | None needed for RoomEase specifically; worth re-confirming Hera/PathPeer still match once the token-migration pass touches those files | — |

---

## Mobile Audit

Only genuine issues — no busywork.

| # | Issue | Evidence | Impact |
|---|---|---|---|
| 1 | **Every gap above compounds on mobile, nothing new appears.** The zero-imagery rows, the two raw-hex sections, and the uniform row weight are all still present at 375px — mobile doesn't introduce a distinct problem, it just has less space to hide the existing ones in. | Confirmed live this session at the `mobile` (375×812) preset: nav collapses correctly to a hamburger, hero stacks correctly, but "Selected work" rows are still bare numeral+text at mobile width, same as desktop. | **HIGH** — but it's the same fix as Homepage #1, not a separate mobile-specific task |
| 2 | **No mobile-specific issues found.** Nav collapse, focus trap, body-scroll lock, and touch-target sizing were all previously verified working (Phase 6 QA) and were spot-checked again this session with no regressions. | `components/Nav.tsx` lines 46–92 (focus trap/scroll lock), confirmed live. | — |

---

## Keep

Everything below is already correct and should not be touched in Phase 8:

- The token system itself (`app/globals.css` color/type/spacing/motion scales) — disciplined, complete, and matches the documented spec in [02-design-language.md](./02-design-language.md).
- Newsreader/Onest as the two-typeface system — matches Meng To, the project's own primary reference.
- The `ProjectIndexItem`/numbered-row *pattern* itself — structurally identical to Aarron Walter's "MY WORK" list, a genuinely credible precedent. The pattern isn't the problem; the missing media slot is.
- The hero's motion technique (mask-sweep fade, not stroke-dasharray line-draw) — correctly avoids the "hand literally drawing every line" anti-pattern the project's own motion spec explicitly rules out, and is well-implemented (verified live: fresh-tab plays once, returning tab skips, reduced-motion disables cleanly).
- Case-study artifact craft: real usability-test videos with posters, a genuinely interactive hand-built SVG diagram with typed node shapes, real before/after usability numbers (RoomEase's 50%→88% usability score etc.) — this is exactly the "evidence before assertion" principle working as intended.
- Heading/copy discipline: project one-liners and case-study section headings already avoid the generic "The Problem"/"Research" labels [09-storytelling-system.md](./09-storytelling-system.md) explicitly forbids (confirmed: "Making club room booking less scattered," "Designing the customer-facing experience and the systems behind it," etc.).
- Navigation and footer — both minimal, both accessible (skip link, focus trap, `inert` on the closed mobile panel), both correctly scoped per [06-component-system.md](./06-component-system.md)'s "no sitemap-sized footer" guidance. No changes needed.
- Accessibility posture generally: focus-visible rings, semantic heading order, reduced-motion handling, keyboard nav — all verified working in Phase 6 QA and not flagged again here.

---

## Remove

Subtraction before addition, per the brief. Ranked by confidence:

1. **The two raw-hex homepage sections should not simply be re-tokenized — reconsider whether both need to exist at their current length.** The "What I build" stat-strip (`app/page.tsx` lines 85–107) and the "Let's connect" CTA block (lines 110–128) together add a second full scroll's worth of content after "Selected Experience" already made the case. If the imagery fix (Homepage #1) gives "Selected Work" more visual presence, the stat-strip's 3 numbers may become redundant with information already implied by 4 case studies + 5 experience rows — consider cutting it rather than re-skinning it.
2. **The uniform 4-column "Requirements" and "Feasibility" card grids inside case studies** (RoomEase sections 02 and 06) are exactly the "cardifying every section for visual consistency" anti-pattern [06-component-system.md](./06-component-system.md)'s own non-goals list warns against. Not urgent, but a candidate for simplification whenever that file is next touched — several of these cards could be a plain list per [01-design-philosophy.md](./01-design-philosophy.md)'s stated preference for "plain large metrics" over cards.
3. **`--color-focus` as a second accent-adjacent color.** Once the imagery fix reduces reliance on `--color-accent` for visual interest, re-confirm whether a second blue is still pulling its weight against the "one accent family" principle, or whether it can collapse into a single accent used consistently for both emphasis and focus states.

Nothing else met the bar for removal — the rest of the site is either correctly scoped already or a genuine content gap (missing media), not excess to cut.

---

## Add

Only additions supported by multiple references, and only where subtraction doesn't already solve the problem:

1. **A media slot on `ProjectIndexItem`.** Supported by: Meng To (image-dominant plates), Aarron Walter (numbered list still pairs with credibility markers elsewhere on the page), the project's own [06-component-system.md](./06-component-system.md) requirement. Assets already exist for all 4 featured projects.
2. **One named credibility fact in the hero.** Supported by: Nicolas Backal, Pratibha Joshi, Aarron Walter. No new content — relocates a fact that already exists in `SelectedExperience`'s data.
3. **One deliberate break in row-weight uniformity.** Supported by: Kane Sherwell, Havana Nguyen, Aarron Walter's density shift. Apply to the single strongest featured project only, not a new pattern applied everywhere.

Everything else proposed in the Reference Translation Gaps table above is either a **Keep** (no action), a **Remove** candidate (subtract, don't add), or explicitly marked low-priority/optional in this session's judgment.

---

## Five Highest ROI Improvements

Ranked by transformational impact, not polish:

1. **Give every `ProjectIndexItem` row real media.** This single fix closes the project's own unmet component-system requirement, matches the primary reference (Meng To), and is the direct answer to "why does it feel AI-generated" reason #1. Assets already exist; no new photography or production needed.
2. **Rewrite the hero's first sentence to lead with a named, credible fact instead of a generic value-proposition template.** Answers Top-10 reasons #5 and #6 simultaneously. Zero new content — a rewrite plus a relocation of an existing fact.
3. **Retokenize the two raw-hex homepage sections (or cut them, per the Remove section).** Closes the most visible internal-consistency seam on the page and is a small, bounded, low-risk change.
4. **Break visual-weight uniformity once, deliberately, on the single strongest featured project.** Turns "four identical rows" into "four rows plus one moment," the cheapest available fix for the site's single-register problem.
5. **Bridge the case-study visual system to the homepage token system.** The largest single gap found, correctly sequenced last because it's the largest and riskiest — but it's the difference between "one product with several stories" ([00-portfolio-vision.md](./00-portfolio-vision.md)'s own success statement) and what currently exists, which is two products.

---

## Phase 8 Implementation Plan

Maximum five passes. Each has one objective, avoids micro-adjustments, and is sequenced so earlier passes don't get undone by later ones.

### Pass 1 — Homepage token consistency
**Objective:** Eliminate every raw-hex/non-token value in `app/page.tsx`.
Retokenize (or, per the Remove section, cut) the stat-strip and CTA sections so the entire homepage consumes only `--color-*`/`--text-*`/`--font-*` tokens, with zero exceptions. This is the smallest, lowest-risk pass and should land first so every later pass works against a fully consistent base.

### Pass 2 — Hero rewrite
**Objective:** Replace the generic value-proposition sentence with a named-fact-led opening.
Rewrite the hero headline and subhead to lead with a specific, credible, already-true fact (an employer name, a scale number) rather than a "[verb] for [audience]" template. Content-only change — no new components, no layout change.

### Pass 3 — Project media
**Objective:** Add a purposeful media slot to `ProjectIndexItem`, closing the [06-component-system.md](./06-component-system.md) gap.
Design and implement a media frame variant for both `selected` and `complete` densities, using assets that already exist in `public/case-studies/`. This is the single highest-ROI pass and the most involved — budget accordingly.

### Pass 4 — Deliberate weight break
**Objective:** Give the single strongest featured project more visual presence than its three peers.
Using the proof map already documented in `CURRENT-HANDOFF.md`, apply a size/weight variant to exactly one `ProjectIndexItem` row. Depends on Pass 3 landing first (the break should be most visible in the new media treatment, not just typography).

### Pass 5 — Case-study token bridge (scoping pass only)
**Objective:** Produce a scoped migration plan — not a full migration — for bringing `components/case-study/*` onto the shared token system.
Given the size (7 case-study files + shared blocks), this pass should audit and produce a sequenced sub-plan (which file first, what maps cleanly vs. what needs a genuine decision) rather than attempt the full migration in one pass. Treat it as the bridge between this audit and a dedicated future phase.

---

## Final note

No new design language is proposed anywhere in this document. Every correction above maps directly to a rule already written in [00-portfolio-vision.md](./00-portfolio-vision.md), [01-design-philosophy.md](./01-design-philosophy.md), [06-component-system.md](./06-component-system.md), or [09-storytelling-system.md](./09-storytelling-system.md) — the gap this audit found is a translation gap, not a direction gap, exactly as framed at the start of this phase.

Awaiting approval before any Phase 8 implementation begins.

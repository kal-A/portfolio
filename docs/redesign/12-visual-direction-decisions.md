# Visual Direction — Decisions So Far (Live Log)

This tracks decisions made during mockup review, before any of it is built
into the real site. Update this file as decisions change; don't rely on
chat history to carry this forward.

## Status: mockups reviewed, not yet implemented in real code

Everything below was explored as standalone HTML/CSS mockups (via the
`visualize` tool), not yet ported into the actual Next.js site. The content
rewrite and homepage restructure in `app/page.tsx` / `lib/content/case-studies.ts`
**is** implemented and committed — this file is about the next layer:
color, motion, and layout polish on top of that.

## Decided

- **Base palette:** warm paper background (`#fdfaf5`), not stark white.
- **Accent colors, plural, not one rose color repeated everywhere.** Rust/coral
  (`#c8452c` / `#a8341a`) as primary accent, plus supporting colors per
  context: teal/green (`#2c6e5e` / `#215446`), gold (`#f2b705`/`#c2900a`),
  near-black (`#181614`) for a "Product Mgmt" node. Overall: "pop of color,
  still mostly minimalist" — not a saturated/neon direction.
- **Motion:** staggered fade-up reveal on load/scroll (elements animate in
  with increasing delay), not everything appearing at once. On the real
  site this should be scroll-triggered per section (Intersection Observer),
  not a single page-load timer.
- **Hero corner element:** an **interactive mind map** of skill progression,
  not a static shape or generic diagram. Nodes, roughly in the order
  learned: Software → Design → AI → Systems → Product Management, with a
  smaller "Ops" node branching off Systems. Systems is the largest/most
  central node (matches the "systems-minded" positioning from
  [01-voice-and-positioning.md](01-voice-and-positioning.md)).
  - Nodes need **real depth** — radial gradients + soft drop shadows,
    "something Apple would do," not flat solid circles.
  - Hover interaction: node scales up slightly.
  - Connecting lines draw themselves in on load (dash-offset animation).
- **Case study layout: reject the 2-column grid.** Replace with **full-width
  alternating rows** (image/swatch on one side, text on the other, flipping
  side each row) so projects don't get force-fit into identical-looking
  boxes. A visually bigger/more important project can take more space.
- **Per-case-study theming lives on each case study's own detail page, not
  the homepage.** The homepage can hint at a project's theme on hover (e.g.
  a slow liquid-fill wipe on the Greenhouse swatch) but shouldn't fully
  commit to the theme — that's reserved for the actual case study page.

## Per-case-study theme concepts (not yet built, ranked by what to try first)

Build ForceN and RoomEase first, confirm the feel is right, then extend to
the rest.

1. **ForceN** — muted steel/gray palette. A thin animated line-diagram
   tracing a workflow (not a literal robot) through the process stages
   (procurement → assembly → calibration → shipment) as the user scrolls.
   Ties back to the actual case study content, not decoration for its own
   sake.
2. **RoomEase** — cool blue/structured-grid palette. A floor-plan or
   room-grid motif that fills in / resolves as the user scrolls, mirroring
   the "structure from scatter" narrative of the case study.
3. **Greenhouse** — warm green/citrus palette. A bottle silhouette or
   liquid-pour motif tracing down the page alongside campaign asset
   thumbnails.
4. Hera Fertility and Pill Pal — not yet discussed in detail; revisit after
   ForceN/RoomEase land.

## Rejected / reverted

- A decorative "square inside a square" shape filling hero whitespace —
  read as empty decoration, not tied to anything. Replaced by the mind map.
- Using the "editorial layout instead of a grid" section label and
  layout-technique description as if it were real on-page copy — that was
  mockup scaffolding accidentally left in, not real content. Real case
  study rows must use actual project copy, never a description of the
  layout choice itself.
- The subheading was accidentally overwritten with mockup instructional
  text ("Hover a node...") in one iteration — the real subheading is fixed
  content, not something that changes per mockup experiment:
  > Management Engineering, University of Waterloo. I map the messy parts
  > of a workflow first, then turn them into clearer flows, prototypes,
  > tools, and handoffs.

## Open feedback not yet resolved

- **Diction still reads "too AI-y" in places.** Specific culprits called
  out: word choice/diction generally, layout feeling templated, and
  em dashes/hyphens used as clause separators. A full site-wide copy pass
  (not just the banned-word list in
  [01-voice-and-positioning.md](01-voice-and-positioning.md)) is still
  needed — read every sentence, not just check against the avoid-list.
- **Em dashes:** most were removed from titles, metadata titles, and
  visible homepage/nav copy in commit `39394aa`. Body paragraphs inside
  case study `problem`/`process`/`outcome` arrays in
  `lib/content/case-studies.ts` still contain some — need a full sweep
  (`grep -rn "—"` across `lib/content/` and `app/`) before this is done.
- Spacing inside case-study card/row text blocks needs a real pass once
  this is built in actual code (mockup padding/line-height was called out
  as "awful" in one iteration, partially fixed in the last version, but
  should be checked against real content length, which runs longer than
  mockup placeholder text).
- Exact interaction design for the homepage-card "theme hint on hover"
  (e.g. Greenhouse liquid-fill) is conceptual only, not detailed enough to
  implement yet — needs its own design pass before building.

## Next steps when resuming

1. Do the full copy/em-dash audit across `lib/content/*.ts` (see Open
   feedback above).
2. Decide whether to implement the mind map / alternating-row layout
   directly in code now, or mock up one more iteration first.
3. If proceeding to code: mind map as an SVG component (likely
   `components/SkillsMindMap.tsx`), alternating-row case study list
   replacing the current grid in `app/page.tsx`'s Design Work section and
   possibly `app/work/page.tsx`.
4. Pick ForceN or RoomEase to prototype the first per-case-study theme
   before committing to a pattern for the rest.

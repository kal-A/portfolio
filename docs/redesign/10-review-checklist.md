# Portfolio Review Checklist

**Depends on:** All preceding redesign documents  
**Purpose:** Final design, content, accessibility, performance, and implementation gate

## How to use this checklist

Review in four passes:

1. **System pass:** tokens, components, and architecture.
2. **Story pass:** message, evidence, authorship, and outcomes.
3. **Experience pass:** visual hierarchy, responsive behavior, motion, and accessibility.
4. **Release pass:** performance, metadata, links, analytics, and production behavior.

Classify findings:

- **Blocker:** prevents launch or damages credibility/accessibility.
- **Required:** must be fixed before calling the redesign complete.
- **Polish:** safe to address during the small-tweaks period.

Do not delay launch for subjective polish after all blockers and required items pass.

## 1. Product and hiring goals

- [ ] The hero states Kamal's value within five seconds.
- [ ] Employment is the primary call to action; graduate relevance appears through evidence, not competing messaging.
- [ ] The featured project set demonstrates complementary competencies.
- [ ] Contact and resume actions are easy to find.
- [ ] Every page has a clear purpose and next action.
- [ ] Personal influences enrich the tone without becoming the subject.

## 2. Design-system consolidation

- [ ] One active color system remains.
- [ ] One display family and one body/UI family remain.
- [ ] Spacing uses the canonical scale except documented optical adjustments.
- [ ] One button, navigation, footer, page container, and media-frame implementation remain.
- [ ] Duplicate case-study templates have been migrated.
- [ ] Shared components use semantic tokens rather than project-specific values.
- [ ] Homepage and case studies visibly belong to the same product.
- [ ] Deprecated implementations have no active imports before removal.

## 3. Visual hierarchy and craft

- [ ] Each viewport has one dominant focal point.
- [ ] Headings, labels, body copy, and captions are clearly differentiated.
- [ ] Body line length stays within the documented measure.
- [ ] Related text and media are close; chapter spacing separates ideas.
- [ ] Grid lines and media edges align intentionally.
- [ ] Warm ivory and near-black replace harsh pure white/black.
- [ ] Accent color is sparse and semantic.
- [ ] Borders, radii, and shadows use documented recipes.
- [ ] No decorative card, gradient, blur, or icon lacks a purpose.

## 4. Hero

- [ ] Headline and actions are visible immediately.
- [ ] Text is the primary focal point, contour second, atmosphere third.
- [ ] Background is soft, dark, minimal, and free of visible AI artifacts.
- [ ] Contour faces toward the text and uses a transparent interior.
- [ ] Figure reads as modern flowing outerwear, not a robe or fantasy character.
- [ ] No facial details, props, bag, or water bottle appear.
- [ ] Final SVG is cleaned/traced rather than a raw generated path.
- [ ] Reveal begins after roughly `250ms`, completes once, and does not loop.
- [ ] Light bloom is subtle and non-essential.
- [ ] Reduced motion renders a stable final state.
- [ ] Mobile crop protects headline contrast and reading order.
- [ ] Hero reserves dimensions and causes no layout shift.

## 5. Homepage and navigation

- [ ] Navigation contains only essential routes and a clear current state.
- [ ] Mobile menu supports keyboard focus, Escape, and focus restoration.
- [ ] Selected work reads as an editorial index, not a generic card dashboard.
- [ ] Every project entry names a distinct problem, outcome, or proof point.
- [ ] Project links have large targets and one clear semantic destination.
- [ ] Homepage sections do not repeat case-study content unnecessarily.
- [ ] Footer is concise and provides a final contact path.

## 6. Case-study story

- [ ] Cover thesis names the problem, contribution, and outcome or limitation.
- [ ] Executive summary supports a five-minute review.
- [ ] Role, team, timeline, and constraints are explicit.
- [ ] “I” and “we” accurately distinguish authorship.
- [ ] At least two consequential decisions show evidence and tradeoffs.
- [ ] Research methods are connected to insights and changed decisions.
- [ ] Screens and artifacts are annotated or captioned with a takeaway.
- [ ] Outcomes separate shipped output, measurement, observation, and uncertainty.
- [ ] Metrics include unit, baseline/denominator, timeframe, source, and qualifier where relevant.
- [ ] Reflection identifies a specific changed belief or future behavior.
- [ ] Headings and captions alone communicate the complete argument.
- [ ] Confidential or recreated evidence is labeled honestly.

## 7. Layout and responsiveness

- [ ] Tested at `320`, `375`, `768`, `1024`, `1440`, and `1920px` widths.
- [ ] DOM order matches reading order at every width.
- [ ] Text appears before the evidence it explains on compact screens.
- [ ] No unintended horizontal scroll exists.
- [ ] No text, focus ring, media, or anchored heading is clipped.
- [ ] Sticky content releases naturally and becomes linear on compact screens.
- [ ] Touch targets are at least `44 × 44px`.
- [ ] Full-bleed media retains captions aligned to a readable container.
- [ ] Tables and complex comparisons provide a compact-screen strategy.

## 8. Components and interaction

- [ ] Links navigate and buttons perform actions semantically.
- [ ] Interactive elements include hover, focus-visible, active/current, and disabled states as applicable.
- [ ] Focus styles are visible against every surface.
- [ ] Hover is enhancement only; no essential information is hover-only.
- [ ] Project cards/rows avoid nested interactive controls.
- [ ] External links are identified when behavior could surprise the user.
- [ ] Error and loading states preserve layout and provide useful language.

## 9. Diagrams and media

- [ ] Every diagram is clearer than prose or a table for its purpose.
- [ ] Diagram title states the takeaway.
- [ ] Labels remain readable without zooming.
- [ ] Direction, grouping, and ownership are unambiguous.
- [ ] Color is not the only carrier of meaning.
- [ ] Complex diagrams include a structured text/table equivalent.
- [ ] Compact diagrams reflow rather than shrinking to illegibility.
- [ ] Every meaningful image has useful alternative text or an accessible description.
- [ ] Decorative media is hidden appropriately from assistive technology.
- [ ] Videos have controls, captions where speech matters, and no forced autoplay with sound.

## 10. Motion

- [ ] Every animation has a stated purpose.
- [ ] Essential content is visible without waiting.
- [ ] Entrance motion plays once and stops.
- [ ] No particles, cursor trails, bounce, looping float, or scroll hijacking remains.
- [ ] Staggers are short and follow narrative order.
- [ ] Reduced-motion behavior has been tested, not merely coded.
- [ ] Motion remains smooth on a realistic mid-range mobile device.
- [ ] Observers and animation work stop when no longer needed.

## 11. Accessibility

- [ ] Semantic landmarks and one logical `h1` exist per page.
- [ ] Heading levels do not skip for visual styling.
- [ ] A skip link is visible on focus.
- [ ] Full keyboard navigation succeeds in a logical order.
- [ ] Screen-reader names match visible control labels.
- [ ] Text and interactive contrast meet WCAG AA.
- [ ] Zoom at 200% preserves content and functionality.
- [ ] Browser text resizing does not break the layout.
- [ ] Form fields, if any, have labels, instructions, and errors.
- [ ] Current states and status are not conveyed by color alone.
- [ ] Automated checks pass and a manual keyboard/screen-reader spot check is complete.

## 12. Performance and technical quality

- [ ] Above-fold image formats and responsive sources are optimized.
- [ ] Width/height or aspect ratio is reserved for all media.
- [ ] Only required fonts/weights are loaded; font display behavior avoids invisible text.
- [ ] No unnecessary animation or icon library is shipped.
- [ ] No console errors, hydration errors, broken imports, or missing assets remain.
- [ ] Internal and external links have been checked.
- [ ] Routes work on direct load and refresh.
- [ ] Page titles, descriptions, canonical URLs, and social previews are accurate.
- [ ] Favicon and theme color are set.
- [ ] Sitemap and robots behavior match launch intent.
- [ ] Contact links and resume download/open behavior work.
- [ ] Analytics, if used, respect privacy and do not block rendering.
- [ ] Production build and tests pass.

## 13. Content QA

- [ ] Names, dates, roles, metrics, and links are accurate.
- [ ] Spelling and grammar are reviewed manually.
- [ ] Terminology stays consistent across pages.
- [ ] No placeholder, lorem ipsum, debug label, or internal note remains.
- [ ] No unsupported superlative or causal claim remains.
- [ ] Captions do not merely repeat visible UI.
- [ ] Resume and portfolio tell a consistent story.

## Release decision

Ship when:

- all blockers are closed;
- all required items are closed or explicitly accepted with a documented reason;
- the production build succeeds;
- at least one unfamiliar reviewer completes the five-second hero test and five-minute case-study scan;
- the deployed site is checked on a real phone and desktop browser.

After launch, collect observations as a short backlog. Do not reopen the design language for isolated taste feedback; revise the system only when evidence shows a recurring problem.

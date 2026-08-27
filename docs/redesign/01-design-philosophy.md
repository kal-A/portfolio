# Design Philosophy

**Depends on:** [00-portfolio-vision.md](./00-portfolio-vision.md)  
**Purpose:** The constitution for visual and interaction decisions

## Core idea

The portfolio is **an editorial publication documenting the design of systems**.

Its language combines three influences:

- **Editorial:** hierarchy, typography, pacing, captions, and confident whitespace.
- **Cinematic:** atmosphere, light, depth, and one memorable moment of restrained motion.
- **Architectural:** grids, proportion, alignment, structure, and diagrammatic reasoning.

Personal interests in architecture, fashion, history, geopolitics, and fantasy may influence the vocabulary, but are not the subject. Monumentality becomes scale. Tailoring becomes proportion. Maps become information structure. Atmosphere becomes depth. None should become costume or theme.

## Governing principles

### 1. Let competence be inferred

Do not announce “great designer,” “strategic thinker,” or “systems thinker.” Create a sequence of precise decisions, well-edited evidence, and honest reflections that makes the conclusion unavoidable.

### 2. Restraint creates confidence

The site should not perform expertise. Use few type styles, one accent family, one entrance motif, and a limited component vocabulary. A quiet page with excellent hierarchy is preferable to a busy page with more features.

### 3. Structure carries personality

Identity comes from recurring choices: numbered sections, warm serif display type, precise sans-serif UI, generous rhythm, architectural rules, considered captions, and contour-line imagery. Personality should survive even when the hero image is removed.

### 4. Atmosphere supports meaning

Dark fields, fog, light, grain, and depth are supporting material. They establish emotional tone but never reduce readability or become the portfolio's subject.

### 5. The artifact is not the story

Screenshots, research boards, and flows are evidence. Each must be framed by a claim, decision, or learning. Uncaptioned galleries are not storytelling.

### 6. Motion communicates progression

Motion may reveal hierarchy, show state change, or preserve orientation. It must be brief, calm, and finite. The site should be fully understandable with motion disabled.

### 7. Whitespace expresses relationships

Keep related text and media close. Put larger space between narrative chapters, not inside a text–image pair. Whitespace separates ideas; it must not disconnect evidence from its explanation.

### 8. Honesty is part of craft

State constraints, scope, authorship, uncertainty, and limitations. Never inflate a team result into an individual claim or turn a proxy metric into business impact.

### 9. Accessibility is compositional quality

Contrast, focus, readable line lengths, semantic structure, reduced motion, and responsive ordering are part of the design—not cleanup work.

### 10. Systems should disappear in use

Tokens and components must create consistency without making every project feel identical. The system is successful when reviewers notice the work and feel the cohesion.

## Decision order

When several principles compete, protect them in this order:

1. factual accuracy, accessibility, and semantic meaning;
2. hiring clarity and comprehension;
3. evidence and narrative continuity;
4. consistency with the shared system;
5. editorial, cinematic, and architectural character;
6. motion and decorative finish.

This order does not make craft optional. It ensures craft strengthens the reviewer's understanding instead of competing with it. A visually quieter solution that makes the evidence clearer is the more on-brand solution.

## Design tensions

Use these rules when priorities compete.

| Tension | Default decision |
|---|---|
| Clarity vs. atmosphere | Protect clarity |
| Evidence vs. brevity | Keep the strongest evidence; layer detail |
| Personality vs. professionalism | Express personality through structure and tone |
| Consistency vs. project identity | Keep the system; vary only the project accent and evidence |
| Motion vs. speed | Prefer immediate content and finite enhancement |
| Novelty vs. maintainability | Prefer a durable pattern |
| Desktop drama vs. mobile comprehension | Protect mobile comprehension |

## Reference translation

References are ingredients, not templates.

| Reference | Adopt | Reject |
|---|---|---|
| Meng To | Editorial hierarchy, serif/sans contrast, numbered index, restraint | Heavy gradients and direct imitation |
| Kage | Near-black field, restrained typography, chapter navigation | Aesthetic opacity that hides content |
| Josh Warner | Inset hero stage, real page margins, confident scale | Copying the 3D-object concept |
| Matthew Yu | Layering and depth used as identity | Blur that weakens legibility |
| QED Labs / Meng To Towers | Draw-on reveal and diagram choreography | Complex or continuous hero choreography |
| Mercury | Typography integrated with imagery, one accent | Startup-marketing tone |
| July Fund | Color as categorization | Multiple competing palettes |
| NoCode case-study reference | Plain large metrics and alternating paired narrative | Card grids around every piece of content |
| COS / Lemaire / Aesop | Proportion, material restraint, flowing silhouette | Fashion-editorial self-promotion |

## Visual character

The experience should feel:

- calm, not passive;
- cinematic, not theatrical;
- editorial, not magazine-themed;
- architectural, not rigid;
- warm, not nostalgic;
- polished, not sterile;
- personal, not performative.

## Anti-patterns

Do not ship:

- decorative gradients without semantic purpose;
- glassmorphism, neon glow, or excessive blur;
- floating cards with arbitrary shadows;
- a different design language for each case study;
- generic “AI-built” icon-and-card sections;
- full-screen loaders or content-delaying animation;
- parallax, particles, cursor trails, or looping hero effects;
- faux-historical, fantasy, robe, explorer, or “person conquering a mountain” imagery;
- vague labels such as “The Challenge” without a specific claim;
- multiple fonts, palettes, or button implementations competing on one page.

## Implementation rule

When an existing pattern conflicts with this philosophy, first map it to the shared tokens and components. Replace it only when mapping cannot preserve clarity, accessibility, or narrative intent. This keeps the redesign focused and avoids unnecessary churn.

Implementation should preserve the reason behind a rule, not only its surface appearance. Before introducing an exception, identify the user or content need that the exception serves, confirm that an existing pattern cannot serve it, and document the exception where it is implemented.

## Success criteria

- A screenshot from any page is recognizable as the same portfolio.
- The page remains compelling when animation is disabled.
- Typography, spacing, and evidence provide more identity than decorative effects.
- Reviewers can explain why each major visual or section exists.
- New projects can be added by applying the system rather than inventing a new one.

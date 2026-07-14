# Current State Summary — Read This First When Resuming

This is the single up-to-date summary of the portfolio project. If context
gets cleared, start here. It supersedes the blow-by-blow logs in
`12-visual-direction-decisions.md` and `13-final-hero-homepage-spec.md` —
those are historical record of *how* we got here; this file is *where we are*.

## What this project is

Kamal Ahsan's personal portfolio site: Next.js 16 (App Router, Turbopack) +
Tailwind + TypeScript, deployed from [github.com/kal-A/portfolio](https://github.com/kal-A/portfolio)
(public repo, `main` branch). Local path: `D:\Full time Grind\Portfolio`.
Dev server: `npm run dev` (or use the `dev` preview config in
`.claude/launch.json`), runs on port 3000.

Kamal has **graduated** (Management Engineering, University of Waterloo,
2021–2026) and is looking for **full-time** roles (product management, TPM,
product design) — not co-ops. All copy should reflect this, not
student/co-op framing.

## Site structure (all implemented, all live)

- `/` — Homepage: Hero, Marquee, Selected Case Studies, Work Experience,
  "What I build" stat strip, CTA block
- `/work` — Case Studies index (all 5, reverse-chronological)
- `/work/[slug]` — Case study detail pages (roomease, forcen, greenhouse,
  hera-fertility, pill-pal)
- `/experience` — Full work timeline + Quick Synopsis (Work/Projects toggle)
- `/about` — Bio + Skills & Tools
- `/resume` — Embedded PDF + education/experience snapshot
- `/contact` — Email/LinkedIn/phone

## Design system (current, locked in)

- **Base background:** warm paper `#fdfaf5`, site-wide default (not white)
- **Accent colors:** rust/coral `#c8452c` (primary), plus per-domain colors:
  teal `#2c6e5e`, blue `#3a6b93`, gold `#c2900a`
- **Per-case-study theme colors** (`lib/content/theme.ts`): each project has
  a `bg`/`fill`/`icon`/`mark` (2-letter monogram: RE, FN, GH, HF, PP) used
  for card icons, hover fills, and case-study-detail header bands
- **Box language, used everywhere there's a bordered box with text:** thick
  border (`2px`–`2.5px solid #181614`), colored background, hover = lift +
  color-fill-from-bottom animation. Applies to case study cards, Synopsis
  cards, Contact link cards, Metric boxes.
- **Color rhythm:** every page alternates plain paper sections with visibly
  saturated pastel gradient bands (not washed-out/near-white — this was
  explicitly corrected after being too subtle). Homepage: Hero(gradient) →
  Marquee(gold/pink/blue strip) → Case Studies(plain) →
  Work Experience(blue/tan/green gradient) → dark stat strip → CTA(peach
  gradient). Same alternating pattern applied to About, Experience, Resume,
  Contact, Work index, and case study detail pages.
- **Type scale, kept consistent across peer sections:** page h1 = `text-5xl`,
  major section h2 = `text-4xl`–`text-6xl` (Selected Case Studies and Work
  Experience headings must match each other), body text sized up generally
  (this was a repeated complaint — err toward bigger/more commanding, not
  shy/small)
- **Hero specifics:**
  - Pill tags (Product Management / Product Design / Systems / UX/UI) with
    colored dots, plus a small solid "Open to full-time roles" badge
  - Headline with italic rust-colored emphasis phrase
  - Subhead leads with **concrete accomplishments** (fintech onboarding,
    sprint leadership, hardware ops, capstone platform) — never just state
    "looking for work," that reads as bland/uninspired per explicit feedback
  - Hand-drawn cursive signature ("Kamal Ahsan" in Caveat font) that wipes in
    via clip-path after the rest of the hero has revealed
  - 3-layer tilted photo-card stack (currently placeholder gradients, not
    real photos — see Open Items)
- **Scroll reveal:** `components/Reveal.tsx`, real `IntersectionObserver`,
  nothing appears until scrolled into view, fade-up transition. Applied
  consistently via the `Reveal` wrapper — this was a hard requirement
  (rejected any "boxed sub-scroll" or "all visible on load" approach)
- **Rotating word component** (`components/RotatingWord.tsx`): used in the
  "What I build [rotating phrase]" stat strip, proper crossfade (not instant
  swap), underline is part of the same fading element as the text (fixed a
  bug where it used to stay static while text swapped under it)
- **Marquee** (`components/Marquee.tsx`): continuous auto-scroll, plain text
  (not cards) — company names bold, skills/positions muted, separated by
  small rust dots. Bug fixed: duplicated tracks need a `gap` between them or
  the loop seam reads as cramped ("•ForceN").

## Content rules (from the original redesign spec, still active)

Full detail in `docs/redesign/01-voice-and-positioning.md` through
`11-implementation-checklist.md` — key points:
- Avoid: "0→1", "transformed", "revolutionized", "seamless", "leveraged",
  unverified metrics like "2x retention" or "cut drop-off in half"
- Every metric shown must be labeled with its verification context
  ("internal analytics", "usability testing", etc.) — see
  `lib/content/case-studies.ts`
- ForceN is a public-safe systems case study (no real screenshots exist,
  confidentiality note included) — don't fabricate artifacts for it
- No em dashes in visible copy (titles, metadata, prose) — use periods,
  commas, or colons instead

## Known pre-existing bug fixed this session (worth remembering)

`app/work/[slug]/page.tsx` used to destructure `params` synchronously, which
Next.js 16 requires to be `await`ed — every case study page was silently
404ing before the fix. If a similar dynamic route is ever added, remember:
`params: Promise<{ slug: string }>`, then `const { slug } = await params`.

## Open items / not yet resolved

1. **Photo stack content**: still placeholder gradients. Never settled
   whether it should be a real photo of Kamal, work/product screenshots, or
   stays abstract/illustrated.
2. **Schematic mind-map concept** (Software → Design → AI → Systems →
   Product Management, blueprint/grid style, outlined nodes with center
   dots) was explored and approved in early mockup rounds but was **not**
   carried into the final implemented hero — it got replaced by the
   pill-tags + photo-stack + signature direction instead. Not currently
   planned to be added; mention if the user brings it up again.
2. **Per-case-study custom illustrated themes** (ForceN: mechanical workflow
   diagram; RoomEase: floor-plan grid; Greenhouse: liquid-pour motif) were
   discussed as a future layer beyond the current flat color-band treatment.
   Not built yet — current case study pages only get a color-tinted header
   band, not a custom illustration/animation per project.
3. Keep checking for "still too bland/plain" feedback — this has been a
   repeated note across multiple rounds (spacing too tight, then too washed
   out, then font too small). Err toward bigger/bolder/more saturated by
   default rather than restrained, based on the pattern of feedback so far.

## How to resume

1. `git pull`, `npm install` if needed, `npm run dev`
2. Read this file first, then skim `13-final-hero-homepage-spec.md` for the
   original hero spec if touching that section again
3. Everything is committed and pushed as of commit `292137a` on `main`

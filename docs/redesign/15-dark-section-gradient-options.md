# Dark section gradient options

Reference for the background used on the "What I build" and "Selected case studies"
sections on the homepage ([app/page.tsx](../../app/page.tsx)). Kept here in case we
ever want to revisit one of the alternatives explored alongside the one currently
in use.

**Currently live: Option J.**

## Option J (in use)

Dark mirror of the Work Experience section's own blue → gold → green diagonal
(`#d7e3ee → #ede2c4 → #d9ecc9`), same hues, just deepened. No charcoal, no
introduced colors — the darkest, most direct "family match" to Work Experience.

```css
background: linear-gradient(160deg, #17232e 0%, #362d1a 55%, #1c2a1c 100%);
```

## Option K

Dark mirror of the Hero section's cream diagonal (`#fbe9dd → #f3e3cc → #e2ecd8`),
with the same soft rust + green radial blooms the hero already uses, at the same
low opacity. Closest literal echo of the hero specifically.

```css
background:
  radial-gradient(circle at 12% 8%, rgba(200,69,44,0.20) 0%, transparent 48%),
  radial-gradient(circle at 88% 15%, rgba(44,110,94,0.18) 0%, transparent 52%),
  linear-gradient(160deg, #3a281d 0%, #362c1a 55%, #232a1e 100%);
```

## Option L

Option J's blue/gold/green diagonal with one soft rust bloom added in the
top-left corner — nods to both the hero and Work Experience palettes at once.

```css
background:
  radial-gradient(circle at 12% 0%, rgba(200,69,44,0.22) 0%, transparent 50%),
  linear-gradient(160deg, #17232e 0%, #362d1a 55%, #1c2a1c 100%);
```

## Earlier directions considered (rejected)

- **Flat `bg-neutral-900`** — the original, too cool/harsh against the warm palette.
- **Cream gradient** — same tone family as the rest of the page; no contrast, sections lost their identity as anchors.
- **Deep terracotta/rust** — too drastic a jump for a full section background.
- **Charcoal + rust/green radial blooms** — decent, but read as "dark UI" more than "warm"; the two blooms felt like separate spotlights rather than one smooth wash.
- **Violet + soft pink (Options D–I)** — worked well and stayed readable, but introduces hues (violet, pink) that don't otherwise appear in the hero/Work Experience sections. Parked in favor of darkened versions of the site's *own* palette instead.

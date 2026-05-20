# Memoamor — Instagram Styleguide for AI Image Generation

Brief this entire document to the image-generation AI before each post (or paste into the system prompt of the tool you use). Memoamor sells personalized memory pages for couples — premium, romantic, sophisticated. Posts must feel like a love letter, not an ad.

Format: **square 1080×1080** for all feed posts.

---

## 1. Brand identity (one-liner)

> Memoamor is a Brazilian SaaS that turns a couple's story into a personalized web page — photos, music, animations, shareable link. Tone: romantic, intimate, sophisticated, slow. Never tacky, never loud, never generic-stock-romance.

---

## 2. Palette — choose based on post type

### A. Light palette — "Cream + wine" (emotional, testimonial, story posts)

Use for: love quotes, real-story testimonials, soft emotional moments, delivered-page previews, anniversary content.

| Token       | Hex       | Role                                    |
| ----------- | --------- | --------------------------------------- |
| Cream       | `#FAF7F2` | Background                              |
| Light       | `#F4EFE6` | Alt background / soft tint              |
| Wine        | `#7A2825` | Headings, brand mark (deep romantic)    |
| Brand red   | `#C9504E` | Accent / CTA buttons                    |
| Rose        | `#E8C9B5` | Borders, subtle decorative fills        |
| Blush       | `#F0D5C0` | Lightest decorative tint                |
| Mauve       | `#C9504E` | Same as brand — used for muted accents  |
| Text        | `#1A1614` | Body text                               |
| Text muted  | `#6B5D52` | Secondary text                          |

### B. Midnight rose — "Dark" (promotional, CTA, premium feature posts)

Use for: product launches, pricing announcements, "criar agora" CTAs, premium plan highlights, late-night romantic mood.

| Token       | Hex       | Role                                    |
| ----------- | --------- | --------------------------------------- |
| Midnight    | `#14111C` | Background (primary)                    |
| Raised      | `#1F1A2A` | Cards, raised surfaces                  |
| Plum        | `#2A2235` | Subtle tint, dividers                   |
| Rose        | `#E8A4B5` | Headings, italic accents, primary brand |
| Brand pink  | `#E8748A` | CTA buttons (warm rose)                 |
| Rose gold   | `#C9A0A8` | Decorative accents, muted highlights    |
| Text        | `#F0E4EC` | Primary text                            |
| Text muted  | `#C9BCCE` | Secondary text (lilac mist)             |
| Deep mauve  | `#5C3A4A` | Borders, dim accents                    |

**Never mix the two palettes inside one post.** A carousel may alternate slide-by-slide if intentional.

---

## 3. Typography

Four fonts. Never mix more than two in a single post (the wordmark counts as one).

| Font            | Use for                                                   | Personality              |
| --------------- | --------------------------------------------------------- | ------------------------ |
| **Parisienne**  | The Memoamor wordmark/logo ONLY                           | Script. Premium, perfume-brand |
| **Fraunces**    | Headlines, emotional phrases. ALWAYS italic, light weight | Serif. Soft, literary, romantic |
| **Inter**       | Small caption text, eyebrows, CTAs, dates, UI-style       | Sans. Clean, modern, neutral |
| **Caveat**      | Hand-written accents — names, dates, "♡"                  | Handwritten cursive      |

**Rules:**
- Fraunces is the hero — large, italic, light weight, generous line-height (1.1–1.2). Use it for the emotional headline.
- Inter is small, uppercase, tracked out (`letter-spacing: 0.15–0.25em`) for eyebrows like `UMA HISTÓRIA DE AMOR`.
- Caveat is sparingly — one handwritten word or signature per post max.
- Body copy in Inter, regular weight, line-height 1.6–1.8.

**Type pattern that always works:**
```
SMALL EYEBROW (Inter, tracked, uppercase)
↓
Big italic headline. (Fraunces, italic, light)
↓
Supporting paragraph in soft secondary text. (Inter, regular)
↓
ana & pedro (Caveat, handwritten signature — optional)
```

---

## 4. Visual motifs (Memoamor signatures)

These reappear across the brand — include 1–2 per post, never all at once.

- **♡ heart glyph** — never use clip-art hearts. Use the typographic `♡` (U+2661) or a SVG outline heart.
- **Loose petals** — soft pink/peach ellipses, scattered, low opacity (0.15–0.30). Floating, never grid-aligned.
- **Stars / constellations** — tiny dots connected by thin lines, low opacity, premium feel.
- **Hand-drawn wavy underline** under a key word in the headline — like a thin SVG squiggle, brand-colored, 0.6–0.8 opacity.
- **Radial gradient glow** — soft ellipse bloom in a corner, brand-tinted, very subtle (8–20% opacity).
- **Heart-shaped particles drifting upward** — only for full-bleed compositions, never the focus.

Motifs are *whispered*, not shouted. If you can see the motif at 30% zoom-out, it's too strong.

---

## 5. Composition rules (1080×1080)

- **Safe area:** keep critical content inside 920×920 (80px margin all sides). Instagram crops aggressively in feed previews.
- **Whitespace:** at least 40% of the canvas is empty. The brand reads as quiet and premium.
- **Hierarchy:** one focal point per post. Eyebrow → headline → support → CTA, top to bottom or center-anchored.
- **Asymmetry > centered grid.** Off-center the focal point slightly. Motifs balance the negative space.
- **Soft shadows only.** Never hard drop-shadow. Use `0 20px 60px rgba(0,0,0,0.25)` on dark, `0 8px 24px rgba(122,63,63,0.08)` on light.
- **No photo borders.** If using a photo, full-bleed it or soft-mask with rounded corners (radius 16–24px).

---

## 6. Copywriting (always Portuguese-BR)

- Voice is **second-person plural** when addressing the couple: *"a história de vocês"*, *"o presente perfeito pra ela"*.
- Lowercase casual when emotional. Capitalize for emphasis only.
- Never use exclamation marks — replace with `♡`, `·`, or em-dash for emotional cadence.
- Avoid clichés: *"amor verdadeiro"*, *"para sempre juntos"*, *"alma gêmea"*. Prefer specific: *"o cheiro do café que ela faz"*, *"a primeira vez que viajamos juntos"*.
- Italicize emotional phrases via Fraunces. Don't bold-shout.

**Headline patterns that work:**
- *A história de vocês, em uma página.*
- *Pra surpreender de verdade.*
- *Alguns momentos ficam pra sempre.*
- *Conte a história de vocês.*

**Avoid:**
- "OFERTA!!!", "GRÁTIS HOJE", "ÚLTIMA CHANCE" — kills premium feel.
- English mixed in unless it's a song lyric.

---

## 7. AI prompt template (paste and fill)

```
Generate a 1080×1080 Instagram post for Memoamor — a Brazilian SaaS for personalized
romantic memory pages for couples.

PALETTE: [Light / Midnight] — use the exact hexes from the styleguide.

CONTENT:
- Eyebrow (Inter, uppercase, tracked): [e.g., UMA HISTÓRIA DE AMOR]
- Headline (Fraunces, italic, light): [e.g., A história de vocês, em uma página.]
- Support (Inter, regular): [optional 1-line paragraph]
- Signature/handwritten (Caveat): [optional, e.g., ana & pedro]

MOTIFS: include [1–2 of: loose petals / constellations / wavy underline /
radial glow / drifting hearts] — subtle, low opacity.

COMPOSITION:
- Off-center focal point
- 40%+ whitespace
- Soft shadow only
- Safe area 920×920

TONE: romantic, intimate, sophisticated, slow. Never tacky, never loud,
never generic stock romance. Premium feel — think editorial wedding magazine.
```

---

## 8. Do / Don't

**Do:**
- Generous whitespace. Quiet is premium.
- One emotional phrase per post — let it breathe.
- Soft, low-opacity motifs that frame the headline.
- Off-center anchor with intentional negative space.
- Real specifics in copy ("o jeito que ela ri") over abstractions ("amor eterno").

**Don't:**
- Stock-photo couple silhouettes.
- Saturated reds, primary colors, gradient rainbows.
- Multiple fonts crowded together.
- Hard drop-shadows or 3D effects.
- Emoji except `♡` (typographic).
- Bold all-caps shouting — the brand whispers.
- Clip-art hearts or roses.
- Auto-generated AI faces. If a couple appears, use silhouette, hands, back-of-head, or abstract.

---

## 9. Reference moods

If the AI tool accepts mood references, lean toward:
- *Kinfolk* magazine layouts
- Wedding stationery (Minted, Paper Source aesthetic)
- French perfume editorial print ads (Chanel, Diptyque)
- Hand-lettered ketubahs / wedding vows
- Late-night candle-lit photography for the dark palette

Avoid:
- Hallmark card aesthetic
- Valentine's Day grocery-store design
- Cartoon couples
- Anything from generic "love stickers" packs

---

## 10. Quick checklist before publishing

- [ ] Palette is consistent (light OR dark, not mixed)
- [ ] No more than 2 fonts visible
- [ ] At least 40% whitespace
- [ ] One emotional focal phrase
- [ ] Motifs are subtle (would not survive 30% zoom-out as primary content)
- [ ] Copy is Portuguese-BR, lowercase casual, no exclamation marks
- [ ] Logo or `memoamor.app` URL placed discreetly in a corner (Inter, small, tracked)
- [ ] Safe area respected (critical content inside 920×920)

# You, Me & a Date 💌

A cute, mobile-first, no-database date invitation flow — Nuxt 3 + Vue 3 + Tailwind CSS 3.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

To build a static/production version:

```bash
npm run build
node .output/server/index.mjs
```

## How it works

1. **Modal — your name & your crush's number.** Blocking modal on first load, collects your name and your crush's WhatsApp number. Stored only in-memory (no backend, no database).
2. **Menu — food bubbles → basket.** 20 food bubbles you can drag (press-and-drag, works with touch and mouse via Pointer Events) into the basket, max 3. Tapping a bubble also adds it directly — a friendly fallback for quick mobile taps.
3. **Date & time.** Native `<input type="date">` and `<input type="time">` for the best mobile picker experience, wrapped in the app's own styling.
4. **Overview card.** A downloadable card (name → food icons → highlighted date) rendered with `html-to-image`.
   - **Download** saves the card as a PNG.
   - **Send** tries the native Web Share API first (lets you pick WhatsApp directly and attach the image in one step, on supporting mobile browsers). If that's not available, it downloads the PNG and opens a WhatsApp chat with your crush's number pre-filled with a message — just attach the image that was saved.

   Note: WhatsApp's `wa.me` links can only pre-fill text, not images, so the download+attach fallback is the most reliable way to get the picture over without a backend/WhatsApp Business API.

## Structure

```
components/
  BgDecor.vue          — soft pastel blobs + halftone accents
  steps/NameStep.vue    — step 1
  steps/FoodPicker.vue — step 2 (drag & drop)
  steps/DatePicker.vue — step 3
  steps/Overview.vue   — step 4 (card + export)
  ui/FoodBubble.vue, ui/Basket.vue, ui/StepDots.vue
composables/
  useInvitation.ts     — shared state + food catalog
pages/index.vue         — flow orchestration
```

## Design notes

- Palette: white/light-gray base (`cloud`, `mist`) with pastel lavender (`lav`) and sky-blue (`sky`), plus two pop-art accents (`pop-pink`, `pop-yellow`) used sparingly on buttons/highlights.
- Type: **Baloo 2** for playful display headings, **Caveat** for the handwriting-style name on the card, **Poppins** for body text.
- Pop-art touches: thick "comic" outlines + hard offset shadows (`shadow-pop`) on buttons/cards, halftone dot textures in corners, sticker-style bubbles.

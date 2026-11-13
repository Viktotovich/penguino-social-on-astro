# Penguino design system

One friendly, cold-weather brand: deep ink, ice and snow, with a single warm accent taken from the penguin's beak.
Tokens live in `src/assets/app.css`. Use the Tailwind classes they create; never hard-code a colour.

## Logo

| File | Use |
| --- | --- |
| `src/assets/brand/logo-mark.svg` | the mark on light backgrounds |
| `src/assets/brand/logo-mark-inverse.svg` | the mark on ink (dark) backgrounds, such as the header |
| `public/favicon.svg` | the browser tab icon (same as the mark) |

The mark is the concept sketch redrawn: a dome head with spiral eyes, an orange beak, and two flippers crossed
behind it. The wordmark is the word `{penguino}` in lowercase, braces included, set in the display font, bold.
Place the wordmark to the right of the mark, vertically centred, with a gap of half the mark's height.

- Minimum size: 24px for the mark, 16px for the favicon.
- Clear space around the logo: at least a quarter of the mark's height.
- Don't recolour, rotate, stretch or outline the mark, and don't put it on a busy photo.
- The mark always has `alt="Penguino"` when it appears without the wordmark; with the wordmark, it is
  decorative (`alt=""`).

## Colour

| Token | Tailwind | Value | Use |
| --- | --- | --- | --- |
| Ink | `bg-ink` `text-ink` | `oklch(0.27 0.055 262)` | text, header, primary buttons |
| Tide | `text-tide` | `oklch(0.5 0.14 258)` | links, focus, highlights |
| Ice | `bg-ice` | `oklch(0.93 0.025 245)` | secondary surfaces, secondary buttons |
| Snow | `bg-snow` | `oklch(0.99 0.004 240)` | page background |
| Beak | `bg-beak` | `oklch(0.74 0.16 58)` | one call to action per screen, badges |
| Aurora | `text-aurora` | `oklch(0.55 0.15 300)` | the brand gradient's second stop |

The shadcn tokens (`primary`, `secondary`, `accent`, `muted`, `border`, `ring` and the others) map onto these, so
generated components follow the brand without changes. The brand gradient is `bg-linear-to-r from-tide to-aurora`.
Text on Ink is Snow; text on Beak, Ice and Snow is Ink. Each of these pairs meets WCAG AA for body text.

## Type

- Display: **Nunito** (`font-display`), weights 700 and 800, for headings and the wordmark.
- Body: **Inter** (`font-sans`), weights 400, 500 and 600.
- Load both from Google Fonts in `src/layouts/PublicLayout.astro`, with `display=swap`.
- Scale: `text-sm` (captions), `text-base` (body), `text-lg`, `text-2xl` (section titles), `text-4xl` to `text-5xl`
  (page titles). Body text is at most `max-w-[65ch]` wide.

## Shape, space and motion

- Radius: `rounded-lg` (0.75rem) for cards and inputs, `rounded-full` for buttons, badges and avatars.
- Spacing follows the **8-point grid** below.
- Shadows: `shadow-sm` at rest, `shadow-md` on hover, nothing heavier.
- Motion: 150–200ms ease-out for hovers and menus. Respect `prefers-reduced-motion`: no movement, only fades.

## Spacing: the 8-point grid

Every margin, padding, gap and fixed size is a multiple of 8px. In Tailwind (1 step = 4px) that means **even
steps only**: `2` (8px), `4` (16), `6` (24), `8` (32), `10` (40), `12` (48), `16` (64), `20` (80), `24` (96),
`32` (128), `40` (160). Odd steps (`1`, `3`, `5`, `7`, ...) and arbitrary values (`pt-53`, `p-[13px]`) are not
allowed, with one exception: step `1` (4px) for the gap between an icon and its text.

| Token | Classes | Use |
| --- | --- | --- |
| Page sides | `px-6 md:px-12 xl:px-24` | Every full-width block: header, sections, footer |
| Below the header | `pt-32 md:pt-40` | First block of every page (the header is absolute, 96px tall) |
| Section | `py-16 md:py-24` | Vertical padding of a page section; also the bottom of the last one |
| Stack, tight | `gap-2` | Label and field, heading and its subtitle |
| Stack | `gap-4` | Paragraphs, form fields, a row of buttons |
| Group | `gap-8` | Between groups inside a section |
| Card | `p-6 md:p-8` | Inside cards and forms |
| Control height | `h-12` | Buttons and inputs (48px, also the minimum touch target) |

Headings take their space from the stack they are in, not from their own margins: no `mb-*` or `pb-*` on text.

## Mobile

- Design for 360px wide first, then add `md:` (768px) and `xl:` (1280px). Nothing may scroll sideways at 360px.
- Rows of buttons stack on phones: `flex flex-col gap-4 sm:flex-row`, and stacked buttons are full width
  (`w-full sm:w-auto`).
- Page headings: `text-3xl md:text-5xl`. Body text is `text-base`, never smaller than `text-sm`.
- Every tap target (buttons, menu links, the menu toggle) is at least 48px tall: `h-12` with `items-center`.
- Two-column layouts become one column below `md:`.

## Components

- **Buttons**: primary is Ink with Snow text; secondary is Ice with Ink text; the one call to action that matters
  most on a screen may use Beak. All are `rounded-full`, `inline-flex h-12 items-center justify-center px-6`, `font-semibold`.
- **Cards**: white, `rounded-lg`, `border border-border`, `shadow-sm`, padding `p-6`.
- **Inputs**: `rounded-lg`, `border-input`, a 2px Tide ring on focus, the label above the field.
- **Links**: Tide, underlined on hover.

## Accessibility

- Every interactive element has a visible focus ring (`ring`).
- Colour is never the only signal: errors also have text, and active nav links also have weight or an underline.
- Images have `alt` text, and decorative images have `alt=""`.
- Tap targets are at least 44px.

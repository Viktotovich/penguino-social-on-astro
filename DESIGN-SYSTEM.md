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
- Spacing follows Tailwind's 4px scale. Sections use `py-16 md:py-24`, page sides use `px-6 md:px-12 xl:px-24`
  (the header's own padding).
- Shadows: `shadow-sm` at rest, `shadow-md` on hover, nothing heavier.
- Motion: 150–200ms ease-out for hovers and menus. Respect `prefers-reduced-motion`: no movement, only fades.

## Components

- **Buttons**: primary is Ink with Snow text; secondary is Ice with Ink text; the one call to action that matters
  most on a screen may use Beak. All are `rounded-full`, `px-6 py-3`, `font-semibold`.
- **Cards**: white, `rounded-lg`, `border border-border`, `shadow-sm`, padding `p-6`.
- **Inputs**: `rounded-lg`, `border-input`, a 2px Tide ring on focus, the label above the field.
- **Links**: Tide, underlined on hover.

## Accessibility

- Every interactive element has a visible focus ring (`ring`).
- Colour is never the only signal: errors also have text, and active nav links also have weight or an underline.
- Images have `alt` text, and decorative images have `alt=""`.
- Tap targets are at least 44px.

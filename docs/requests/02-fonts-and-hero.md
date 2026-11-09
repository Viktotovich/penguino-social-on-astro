Load the brand fonts and restyle the home page hero to the design system (DESIGN-SYSTEM.md).

- In `src/layouts/PublicLayout.astro`, inside `<head>`, add Google Fonts `preconnect` links for
  `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (with `crossorigin`), then a stylesheet link for
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Nunito:wght@700;800&display=swap`.
  Also fix the body class typo `antialised` to `antialiased`, and add `bg-snow font-sans`.
- In `src/sections/homepage/Hero.tsx`:
  - The `<h1>` uses `font-display font-extrabold text-ink` instead of `text-black`, and the sizes
    `text-4xl md:text-5xl`.
  - Fix the typo `entrepenurial` to `entrepreneurial`.
  - The `FREE` underline gradient uses `from-tide to-aurora` instead of `from-purple-500 to-blue-500`.
  - The paragraph uses `text-muted-foreground`.
- In `src/components/buttons/AnchorButton.tsx`, the primary style is `bg-ink text-snow`, the secondary style is
  `bg-ice text-ink`, both `rounded-full px-6 py-3 font-semibold`, with `transition-shadow duration-200
  hover:shadow-md` and a visible focus ring `focus-visible:ring-2 focus-visible:ring-ring`. Remove the TODO comment.
- Add `tests/anchor-button.test.tsx`: render both variants with `renderToStaticMarkup` and check the classes
  `bg-ink` and `bg-ice`, and that the `href` and text are output.
- Bump `version` in `package.json` to `0.3.0`.

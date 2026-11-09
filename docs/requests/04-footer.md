Add a site footer.

- `src/components/nav/Footer.tsx` exports a default React component `Footer` (no props) that renders a `<footer>`
  with classes `bg-ink text-snow px-6 py-12 md:px-12 xl:px-24`, containing:
  - `<Logo variant="dark" />` from `src/components/brand/Logo.tsx`.
  - A `<nav aria-label="Footer">` with links: `Penguino?` to `/about`, `Resources` to `/resources`, `Community` to
    `/community`, and `GitHub` to `https://github.com/Viktotovich/penguino-social-on-astro`. Links are
    `text-snow/80 hover:text-snow hover:underline`.
  - A line `© <current year> Penguino. Open source.` in `text-sm text-snow/60`, where the year comes from
    `new Date().getFullYear()`.
- In `src/layouts/PublicLayout.astro`, render `<Footer />` after `<main>`.
- Add `tests/footer.test.tsx`: render `Footer` with `renderToStaticMarkup` and check the four link hrefs, the
  `aria-label="Footer"`, and that the current year appears.
- Bump `version` in `package.json` to `0.4.0`.

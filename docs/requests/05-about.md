Add an About page at `/about`.

- `src/pages/about.astro` uses `PublicLayout` from `src/layouts/PublicLayout.astro` and renders a `<main>` section
  with classes `px-6 pt-40 pb-24 md:px-12 xl:px-24`, containing:
  - An `<h1>` `What is Penguino?` with `font-display text-4xl font-extrabold text-ink md:text-5xl`.
  - Three paragraphs, each `max-w-[65ch] text-muted-foreground`: what Penguino is (a free community platform for
    entrepreneurs to connect, ask for advice and find partners), who it is for (members of the Penguino Telegram
    community and anyone building a business), and that it is open source and built in the open.
  - Two `AnchorButton`s from `src/components/buttons/AnchorButton.tsx` in a `flex gap-4` row: `Join now` to
    `/register` (primary) and `See the community` to `/community` (secondary).
- Add `tests/about.test.ts`: render the page with the Astro container API
  (`experimental_AstroContainer` from `astro/container`) and check the `<h1>` text and both link hrefs.
- Bump `version` in `package.json` to `0.5.0`.

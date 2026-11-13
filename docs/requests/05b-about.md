Add an About page at `/about`. (Request 05 failed on the test; this request spells out how to test the page.)

- `src/pages/about.astro` uses `PublicLayout` from `src/layouts/PublicLayout.astro` and renders a `<main>` section
  with classes `px-6 pt-40 pb-24 md:px-12 xl:px-24`, containing:
  - An `<h1>` `What is Penguino?` with `font-display text-4xl font-extrabold text-ink md:text-5xl`.
  - Three paragraphs, each `max-w-[65ch] text-muted-foreground`: what Penguino is (a free community platform for
    entrepreneurs to connect, ask for advice and find partners), who it is for (members of the Penguino Telegram
    community and anyone building a business), and that it is open source and built in the open.
  - Two `AnchorButton`s from `src/components/buttons/AnchorButton.tsx` in a `flex gap-4` row: `Join now` to
    `/register` (primary) and `See the community` to `/community` (secondary).
- Add `tests/about.test.ts` that renders the page with the Astro container API. Use exactly this setup; it is
  known to work in this project, because the layout needs the React renderer and `Astro.locals`:

  ```ts
  import { experimental_AstroContainer as AstroContainer } from "astro/container";
  import { loadRenderers } from "astro:container";
  import { getContainerRenderer } from "@astrojs/react";
  import { expect, test } from "vitest";
  import About from "@/pages/about.astro";

  test("about page", async () => {
    const renderers = await loadRenderers([getContainerRenderer()]);
    const container = await AstroContainer.create({ renderers });
    const html = await container.renderToString(About, {
      locals: { contexturl: new URL("http://localhost/about"), user: null, session: null },
    });
    // checks go here
  });
  ```

  Check that `html` contains `What is Penguino?`, `href="/register"` and `href="/community"`.
  Do not search `node_modules`: everything needed is above.
- Bump `version` in `package.json` to `0.8.0`.

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
  expect(html).toContain("What is Penguino?");
  expect(html).toContain('href="/register"');
  expect(html).toContain('href="/community"');
});

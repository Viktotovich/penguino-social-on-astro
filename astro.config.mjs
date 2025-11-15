// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: "xgztagdf",
      dataset: "production",
      useCdn: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
});

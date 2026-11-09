// Vitest through Astro's Vite config, so tests can use the Astro container API and the @/ alias.
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});

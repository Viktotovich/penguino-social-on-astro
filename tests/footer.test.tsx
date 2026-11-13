import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Footer from "@/components/nav/Footer";

describe("Footer", () => {
  it("renders with correct links, aria-label, and year", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('aria-label="Footer"');
    expect(html).toContain('<a href="/about"');
    expect(html).toContain('<a href="/resources"');
    expect(html).toContain('<a href="/community"');
    expect(html).toContain('<a href="https://github.com/Viktotovich/penguino-social-on-astro"');
    expect(html).toMatch(/© \d{4} Penguino\. Open source\./);
  });
});

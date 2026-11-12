import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Logo from "@/components/brand/Logo";

function renderLogo(variant?: "light" | "dark") {
  return renderToStaticMarkup(createElement(Logo, variant ? { variant } : {}));
}

describe("Logo", () => {
  it("renders the home anchor with a label and an empty alt attribute", () => {
    const html = renderLogo();
    expect(html).toContain('href="/"');
    expect(html).toContain('aria-label="Penguino home"');
    expect(html).toContain('alt=""');
  });

  it("renders the {penguino} wordmark", () => {
    expect(renderLogo()).toContain("{penguino}");
  });

  it("uses the text-snow class for variant=dark", () => {
    expect(renderLogo("dark")).toContain("text-snow");
  });

  it("uses the text-ink class for the default light variant", () => {
    expect(renderLogo()).toContain("text-ink");
    expect(renderLogo()).not.toContain("text-snow");
  });
});

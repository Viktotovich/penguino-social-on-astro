import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AnchorButton from "@/components/buttons/AnchorButton";

function renderButton(
  options: { href: string; cta: string; isPrimary: boolean },
) {
  return renderToStaticMarkup(createElement(AnchorButton, options));
}

describe("AnchorButton", () => {
  it("renders the primary variant with bg-ink", () => {
    const html = renderButton({
      href: "/register",
      cta: "Join Now",
      isPrimary: true,
    });
    expect(html).toContain("bg-ink");
    expect(html).toContain("/register");
    expect(html).toContain("Join Now");
  });

  it("renders the secondary variant with bg-ice", () => {
    const html = renderButton({
      href: "/community",
      cta: "See the community",
      isPrimary: false,
    });
    expect(html).toContain("bg-ice");
    expect(html).toContain("/community");
    expect(html).toContain("See the community");
  });
});

import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Header from "@/components/nav/Header";

function renderHeader(options: {
  pathname: string;
  user: null | { name: string; image?: string | null };
}) {
  return renderToStaticMarkup(createElement(Header, options));
}

describe("Header", () => {
  it("renders with user=null showing /login and /register links", () => {
    const html = renderHeader({ pathname: "/", user: null });
    expect(html).toContain('href="/login"');
    expect(html).toContain('href="/register"');
  });

  it("renders with user={name:'ada',image:null} showing Account menu aria-label, letter A, and no /register link", () => {
    const html = renderHeader({
      pathname: "/",
      user: { name: "ada", image: null },
    });
    expect(html).toContain('aria-label="Account menu"');
    expect(html).toContain("A");
    expect(html).not.toContain('href="/register"');
  });

  it("renders the mobile menu closed by default", () => {
    const html = renderHeader({ pathname: "/", user: null });
    expect(html.split('href="/about"').length - 1).toBe(1);
  });

  it("renders no mobile nav when closed", () => {
    const html = renderHeader({ pathname: "/", user: null });
    expect(html).not.toContain("pb-4");
  });
});

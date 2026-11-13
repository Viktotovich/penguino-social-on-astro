import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import LoginForm from "@/components/forms/LoginForm";

function renderLoginForm() {
  return renderToStaticMarkup(createElement(LoginForm));
}

describe("LoginForm", () => {
  it("renders heading with font-display class", () => {
    const html = renderLoginForm();
    expect(html).toContain("font-display");
  });
});

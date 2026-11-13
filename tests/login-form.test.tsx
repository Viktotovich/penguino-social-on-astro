import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import LoginForm from "@/components/forms/LoginForm";

describe("LoginForm", () => {
  it("renders with the email input, password input, Log in button, Continue with Google button, and Sign up link", () => {
    const html = renderToStaticMarkup(createElement(LoginForm));
    expect(html).toContain('id="email"');
    expect(html).toContain('id="password"');
    expect(html).toContain("Log in");
    expect(html).toContain("Continue with Google");
    expect(html).toContain('href="/register"');
  });
});

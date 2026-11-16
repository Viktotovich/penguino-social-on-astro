import { describe, it, expect } from "vitest";
import { hasRole, requiredRole, guard, ROLES } from "@/lib/auth/roles";

describe("ROLES", () => {
  it("should be the expected list", () => {
    expect(ROLES).toEqual(["USER", "EDITOR", "MODERATOR", "ADMIN", "SUPERADMIN"]);
  });
});

describe("hasRole", () => {
  it("ADMIN >= MODERATOR is true", () => {
    expect(hasRole("ADMIN", "MODERATOR")).toBe(true);
  });

  it("USER < MODERATOR is false", () => {
    expect(hasRole("USER", "MODERATOR")).toBe(false);
  });

  it("MODERATOR == MODERATOR is true", () => {
    expect(hasRole("MODERATOR", "MODERATOR")).toBe(true);
  });

  it("OWNER (unknown) returns false", () => {
    expect(hasRole("OWNER", "USER")).toBe(false);
  });
});

describe("requiredRole", () => {
  it("/ is null", () => {
    expect(requiredRole("/")).toBe(null);
  });

  it("/admin returns ADMIN", () => {
    expect(requiredRole("/admin")).toBe("ADMIN");
  });

  it("/admin/users returns ADMIN", () => {
    expect(requiredRole("/admin/users")).toBe("ADMIN");
  });

  it("/administrator returns null", () => {
    expect(requiredRole("/administrator")).toBe(null);
  });

  it("/account returns USER", () => {
    expect(requiredRole("/account")).toBe("USER");
  });
});

describe("guard", () => {
  it("/about with null role is allow", () => {
    expect(guard("/about", null)).toBe("allow");
  });

  it("/account with null role is login", () => {
    expect(guard("/account", null)).toBe("login");
  });

  it("/admin with USER role is forbidden", () => {
    expect(guard("/admin", "USER")).toBe("forbidden");
  });

  it("/moderation with ADMIN role is allow", () => {
    expect(guard("/moderation", "ADMIN")).toBe("allow");
  });

  it("/admin with SUPERADMIN role is allow", () => {
    expect(guard("/admin", "SUPERADMIN")).toBe("allow");
  });
});

export const ROLES = ["USER", "EDITOR", "MODERATOR", "ADMIN", "SUPERADMIN"] as const;
export type Role = (typeof ROLES)[number];

export function hasRole(role: string, minimum: Role): boolean {
  if (!ROLES.includes(role as Role)) return false;
  return ROLES.indexOf(role as Role) >= ROLES.indexOf(minimum);
}

export const ROUTE_RULES: { prefix: string; minimum: Role }[] = [
  { prefix: "/admin", minimum: "ADMIN" },
  { prefix: "/moderation", minimum: "MODERATOR" },
  { prefix: "/account", minimum: "USER" },
];

export function requiredRole(pathname: string): Role | null {
  for (const rule of ROUTE_RULES) {
    if (pathname === rule.prefix || pathname.startsWith(rule.prefix + "/")) {
      return rule.minimum;
    }
  }
  return null;
}

export function guard(
  pathname: string,
  role: string | null
): "allow" | "login" | "forbidden" {
  if (!role) {
    if (requiredRole(pathname) === null) return "allow";
    return "login";
  }
  const minimum = requiredRole(pathname);
  if (!minimum) return "allow";
  return hasRole(role, minimum) ? "allow" : "forbidden";
}

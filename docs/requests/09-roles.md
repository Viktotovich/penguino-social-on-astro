Guard pages by role. The `Role` enum (`USER`, `EDITOR`, `MODERATOR`, `ADMIN`, `SUPERADMIN`) and the `role` field on
`user` already exist in `prisma/schema.prisma`: do not change the schema and add no migration. The work is: expose the
role on the session, a small role module with the rules, the middleware that applies them, and a 403 page.

- `src/lib/auth/auth.ts`: add a `user` option to the `betterAuth({ ... })` call so the role is returned with the
  session. Put it after `emailAndPassword` and keep everything else as it is:

  ```ts
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "USER", input: false },
    },
  },
  ```

- New file `src/lib/auth/roles.ts`, with no imports, exporting exactly these:
  - `export const ROLES = ["USER", "EDITOR", "MODERATOR", "ADMIN", "SUPERADMIN"] as const;` and
    `export type Role = (typeof ROLES)[number];`
  - `export function hasRole(role: string, minimum: Role): boolean`: true when `role` is in `ROLES` and its index is
    greater than or equal to the index of `minimum`. An unknown role string returns false.
  - `export const ROUTE_RULES: { prefix: string; minimum: Role }[]` with these three entries, in this order:
    `{ prefix: "/admin", minimum: "ADMIN" }`, `{ prefix: "/moderation", minimum: "MODERATOR" }`,
    `{ prefix: "/account", minimum: "USER" }`.
  - `export function requiredRole(pathname: string): Role | null`: the `minimum` of the first rule where `pathname`
    equals `prefix` or starts with `prefix + "/"`; `null` when no rule matches. So `/admin` and `/admin/users` match
    `/admin`, but `/administrator` does not.
  - `export function guard(pathname: string, role: string | null): "allow" | "login" | "forbidden"`: `role` is `null`
    when nobody is signed in. Return `"allow"` when `requiredRole(pathname)` is `null`; otherwise `"login"` when
    `role` is `null`, `"forbidden"` when `hasRole(role, minimum)` is false, and `"allow"` when it is true.
- `src/middleware/index.ts`: keep the existing code that fills `context.locals`. After it and before
  `return next();`, add:

  ```ts
  const role = isAuthed
    ? ((isAuthed.user as { role?: string }).role ?? "USER")
    : null;
  const verdict = guard(context.url.pathname, role);
  if (verdict === "login") return context.redirect("/login");
  if (verdict === "forbidden") return context.redirect("/403");
  ```

  and import `guard` from `@/lib/auth/roles`.
- New page `src/pages/403.astro`, built like `src/pages/about.astro` (same `PublicLayout`, same `<main>` classes,
  `export const prerender = false;`). It has an `<h1>` "You can't open this page" with the classes of the about page's
  `<h1>`, one paragraph "Your account doesn't have access to it." with `class="max-w-[65ch] text-muted-foreground"`,
  and one `AnchorButton` with `href="/"`, `cta="Back to home"` and `isPrimary={true}` inside
  `<div class="mt-4 flex flex-col gap-4 sm:flex-row">`.
- New test file `tests/roles.test.ts` (vitest, import from `@/lib/auth/roles`) with these cases:
  - `hasRole("ADMIN", "MODERATOR")` is true, `hasRole("USER", "MODERATOR")` is false,
    `hasRole("MODERATOR", "MODERATOR")` is true, `hasRole("OWNER", "USER")` is false.
  - `requiredRole("/")` is null, `requiredRole("/admin")` is `"ADMIN"`, `requiredRole("/admin/users")` is `"ADMIN"`,
    `requiredRole("/administrator")` is null, `requiredRole("/account")` is `"USER"`.
  - `guard("/about", null)` is `"allow"`, `guard("/account", null)` is `"login"`, `guard("/admin", "USER")` is
    `"forbidden"`, `guard("/moderation", "ADMIN")` is `"allow"`, `guard("/admin", "SUPERADMIN")` is `"allow"`.
- Bump `version` in `package.json` from `0.8.3` to `0.9.0`. Change nothing else in that file.

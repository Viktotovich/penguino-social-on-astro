On phones the closed mobile menu still adds 16px under the header, because the empty `<nav>` keeps its `pb-4`. Fix
it in `src/components/nav/Header.tsx` only:

- Move `{mobileOpen && (` so it wraps the whole mobile `<nav className="h-full space-y-2 px-6 pb-4 md:hidden">`
  element, not the links inside it. When the menu is closed, no mobile `<nav>` is rendered at all.
- Keep the links, their `className="flex h-12 items-center"`, the "Sign out" link and every other class exactly as
  they are. Remove the `<>` and `</>` fragment that is no longer needed.
- Add one test to `tests/header.test.tsx` named "renders no mobile nav when closed" that renders with
  `{ pathname: "/", user: null }` and checks `expect(html).not.toContain("pb-4");`.
- Bump `version` in `package.json` to `0.8.3`.

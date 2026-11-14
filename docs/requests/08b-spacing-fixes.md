Fix four mistakes from the 0.8.1 spacing change. Only change what is listed; do not change any text, link or prop.

- `src/components/nav/Header.tsx`: the mobile menu must only render when it is open. Wrap the mobile `<nav
  className="h-full space-y-2 px-6 pb-4 md:hidden">` again in `{mobileOpen && ( ... )}`, as it was before. Inside it,
  replace `<span className="flex h-12 items-center">{link.label}</span>` with just `{link.label}`. Keep
  `className="flex h-12 items-center"` on each `NavLinkWithCB`.
- `tests/header.test.tsx`: replace the test "mobile menu links have flex h-12 items-center classes" with a test named
  "renders the mobile menu closed by default" that renders with `{ pathname: "/", user: null }` and checks that
  `href="/about"` appears exactly once:
  `expect(html.split('href="/about"').length - 1).toBe(1);`
- `src/sections/homepage/Hero.tsx`: add `gap-4` to the `<section>` classes (keep all its other classes). Add `mt-4` to
  the `<div>` that holds the two `AnchorButton`s (keep its other classes).
- `src/components/forms/LoginForm.tsx`:
  - The `<form>` uses `p-6 md:p-8` again (not `p-8 md:p-8`).
  - The `<div>` around the "Welcome back" heading uses `gap-2` again (not `gap-4`).
  - Both `<Button>`s that now have `className="h-12"` get `className="h-12 hover:cursor-pointer"`.
- Bump `version` in `package.json` to `0.8.2`.

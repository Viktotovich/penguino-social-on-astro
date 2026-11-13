Make the header aware of the signed-in user, with an account menu and sign-out.

- In `src/components/nav/Header.tsx`, add a prop `user: { name: string; image?: string | null } | null` next to
  `pathname`.
  - When `user` is null, the links are as now, plus `Log in` to `/login` before `Join now`.
  - When `user` is set, drop `Join now` and render, after the desktop nav, a `<button>` with
    `aria-label="Account menu"` and `aria-expanded` set from a `menuOpen` state. Inside it show the user's image
    as a `rounded-full size-9` `<img alt="">` when `image` is set, otherwise the first letter of `name` in upper case
    in a `rounded-full size-9 bg-ice text-ink font-semibold` circle.
  - When the menu is open, show a small panel (`absolute right-6 mt-2 rounded-lg bg-snow p-2 shadow-md`) with the
    user's name and a `Sign out` button that awaits `new AuthService().signOut()` from
    `src/lib/auth/auth-service.ts` and then sets `window.location.href = "/"`.
  - The mobile menu shows the same links, and a `Sign out` button when `user` is set.
- In `src/layouts/PublicLayout.astro`, pass `user={Astro.locals.user ? { name: Astro.locals.user.name, image:
  Astro.locals.user.image } : null}` to `Header`. Change nothing else there.
- Add `tests/header.test.tsx`: with `renderToStaticMarkup`, render `Header` with `pathname="/"` and `user={null}` and
  check `href="/login"` and `href="/register"`; render it with `user={{ name: "ada", image: null }}` and check
  `aria-label="Account menu"`, the letter `A`, and that `href="/register"` is absent.
- Bump `version` in `package.json` to `0.7.0`.

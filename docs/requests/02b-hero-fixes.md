Finish request 02 (docs/requests/02-fonts-and-hero.md): the hero heading lost its centring and two files fail prettier.

- In `src/sections/homepage/Hero.tsx`, the `<h1>` must keep `text-center` (it was removed by mistake); keep all its other classes.
- Format `src/components/buttons/AnchorButton.tsx` and `tests/anchor-button.test.tsx` so they pass `prettier --check`
  (for example the trailing space after `"bg-ink text-snow";` and lines that are too long), without changing what they do.
- Bump `version` in `package.json` to `0.3.1`.

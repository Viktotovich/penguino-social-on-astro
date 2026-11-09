Add a `Logo` component and use it in the header.

- `src/components/brand/Logo.tsx` exports a default React component `Logo` with an optional prop
  `variant: "light" | "dark"` (default `"light"`).
- It renders an `<a href="/" aria-label="Penguino home">` containing:
  - an `<img>` of the mark, `alt=""`, 32px wide and high: import `src/assets/brand/logo-mark-inverse.svg` for
    `variant="dark"` and `src/assets/brand/logo-mark.svg` for `variant="light"`, and use the import's `.src`.
  - a `<span>` with the wordmark text `{penguino}`, classes `font-display text-xl font-extrabold`,
    `text-snow` for `variant="dark"` and `text-ink` for `variant="light"`.
  - The anchor uses `inline-flex items-center gap-3`.
- In `src/components/nav/Header.tsx`, replace the `<a href="/">` block that shows the text `Logo` with
  `<Logo variant="dark" />`.
- Add `tests/logo.test.tsx`: render `Logo` with `renderToStaticMarkup` from `react-dom/server` and check that it
  contains `{penguino}`, `aria-label="Penguino home"` and `alt=""`, and that `variant="dark"` uses the
  `text-snow` class.
- Bump `version` in `package.json` to `0.2.0`.

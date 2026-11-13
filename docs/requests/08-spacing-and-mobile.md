Put every page on the 8-point spacing grid, make the pages work on phones, and keep the footer at the bottom of the
window. The rules are in DESIGN-SYSTEM.md, sections "Spacing: the 8-point grid" and "Mobile": read them first. Only
change classes and wrapper elements; do not change any text, link, prop or behaviour.

- `src/layouts/PublicLayout.astro`: the footer must sit at the bottom of the window when the page is shorter than the
  window (for example when zoomed out). Give `<body>` the classes `flex min-h-svh flex-col` (keep its other classes)
  and give the layout's `<main>` the class `flex-1`. Change nothing else in this file.
- `src/components/buttons/AnchorButton.tsx`: replace `py-3` with `inline-flex h-12 items-center justify-center`, and
  add `w-full sm:w-auto`. Keep every other class.
- `src/sections/homepage/Hero.tsx`:
  - The `<section>` uses `px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24 xl:px-24` instead of `px-6 pt-53 pb-32`, and
    `gap-4` for its children (keep `flex flex-col items-center`).
  - The `<h1>` uses `text-3xl md:text-5xl` instead of `text-4xl md:text-5xl`, and loses `pb-4`.
  - The paragraph loses `mb-8` and uses `text-base` instead of `text-sm md:text-base`.
  - The row that holds the two `AnchorButton`s uses `flex w-full flex-col gap-4 sm:w-auto sm:flex-row`, with `mt-4`
    above it.
  - Replace any other odd spacing step (`1`, `3`, `5`, ...) in this file with the even step next to it.
- `src/pages/about.astro`: its `<main>` uses `flex flex-col gap-4 px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24
  xl:px-24` instead of `px-6 pt-40 pb-24 md:px-12 xl:px-24`; the `<h1>` uses `text-3xl md:text-5xl` instead of
  `text-4xl md:text-5xl`; the button row uses `flex flex-col gap-4 sm:flex-row` with `mt-4`.
- `src/pages/login.astro` and `src/pages/register.astro`: the `<main>` uses `px-6 pt-32 pb-16 md:px-12 md:pt-40
  md:pb-24 xl:px-24` instead of `px-6 pt-53 pb-32`, and the inner wrapper drops `min-h-svh` and `p-6 md:p-10` (keep
  `flex flex-col items-center justify-center`).
- `src/components/forms/LoginForm.tsx`: replace odd spacing steps (`gap-3`, `p-3`, `py-3`, ...) with the even step
  next to it, and give the email and password inputs and the buttons `h-12`.
- `src/components/nav/Header.tsx`: the menu toggle button gets `size-12 inline-flex items-center justify-center`;
  mobile menu links get `flex h-12 items-center`. Keep everything else.
- `src/components/nav/Footer.tsx`: the `<nav>` uses `flex flex-wrap justify-center gap-x-8 gap-y-4` so the links wrap
  on phones. Keep everything else.
- Update the tests in `tests/` only if a class they check changed. Add no new test files.
- Bump `version` in `package.json` to `0.8.1`.

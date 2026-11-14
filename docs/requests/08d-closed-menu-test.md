Finish request 08c. The code change is done; two parts were skipped.

- Add one test to `tests/header.test.tsx`, inside the existing `describe("Header", ...)` block, named "renders no
  mobile nav when closed". It renders with `{ pathname: "/", user: null }` using the existing `renderHeader` helper
  and checks `expect(html).not.toContain("pb-4");`. Change nothing else in that file.
- Bump `version` in `package.json` from `0.8.2` to `0.8.3`. Change nothing else in that file.

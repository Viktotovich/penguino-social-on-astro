Update `README.md` for how Penguino is now built.

- Replace the whole `## Pull Requests` section with a `## How Penguino is built` section that says:
  - Penguino is built with vb-harness (https://github.com/Viktotovich/vb-harness-for-agentic-building), a harness
    that lets a local model plan, write, test and review small changes. It is a showcase for the harness's agent
    mode.
  - Each change starts as a request in `docs/requests/`, and `PLAN.md` lists the order and versions.
  - Commits follow Conventional Commits, and versions follow semver: `0.x` is pre-release, `1.0.0` the first release.
  - Pull requests are welcome; keep them small and descriptive, and follow DESIGN-SYSTEM.md for anything visual.
- Under `# Goals`, change "the first time that I will be using NextJS in production" to say Astro and React,
  since the app uses Astro.
- Add a `## Design` section after `# Goals` linking DESIGN-SYSTEM.md and naming the logo files in
  `src/assets/brand/`.
- Bump `version` in `package.json` to `0.3.1`.

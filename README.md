# Goals

Penguino is an open-source web app I am planning to build for one of the entrepreneurial groups/community that I am a part of.

It is a way to say thanks and give back to the amazing community that they have built over the course of a few weeks, additionally - this project
will be the first time that I will be using Astro and React in production - as my go to stack for the past 12/13 projects is strictly Inertia Adonis React, or Astro and React.

It is both meant to be a fun app to interact with while still being useful, and also a great learning resource for junior developers to see what a fullstack application
could look like (avoiding the word should, as I am a human, and I make mistakes).

## Design

Penguino uses [TailwindCSS](https://tailwindcss.com/) for styling. The logo files are in `src/assets/brand/`:

- `logo-mark.svg` - the primary logo mark (light background)
- `logo-mark-inverse.svg` - the primary logo mark (dark background)
- `public/favicon.svg` - the browser tab icon (same as the mark)

## How Penguino is built

Penguino is built with [vb-harness](https://github.com/Viktotovich/vb-harness-for-agentic-building), a harness
that lets a local model plan, write, test and review small changes. It is a showcase for the harness's agent
mode.

Each change starts as a request in `docs/requests/`, and `PLAN.md` lists the order and versions.

Commits follow Conventional Commits, and versions follow semver: `0.x` is pre-release, `1.0.0` the first release.

Pull requests are welcome; keep them small and descriptive, and follow [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for anything visual.

### To start

Prerequisites

- Node.js (v20+ LTS recommended)
- npm (We are running npm rather than pnpm or yarn)
- Git

1. Clone the repo and cd into it

```bash
git clone git@github.com:Viktotovich/penguino-social-on-astro.git
cd penguino
```

2. Install deps

```bash
npm install
```

3. Run

```bash
npm run dev
```

4. CLI usage (TODO: RECREATE THE CLI)

```bash
npm run penguino
```

To see the currently available commands for scaffolding

Contrary to the CLI output, don't run

```bash
npm run penguino <command> --help
```

The options are not as descriptive

CI/CD pipelines and testing will come later

### Current TODOs

- Refer to BACKLOG.md

#### Usage

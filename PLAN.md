# Penguino build plan

Penguino is built with [vb-harness](https://github.com/Viktotovich/vb-harness-for-agentic-building) and a local
model (Qwopus3.8 27B) in agent mode. Each step below is one harness request in `docs/requests/`, run on its own,
reviewed, and merged into `main`. Design rules: [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Versioning and commits

- Commits follow Conventional Commits: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `style`, `perf`.
- Semver in `package.json`. The `0.x.y` series is pre-release; `1.0.0` is the first release.
  - A request that adds a feature bumps the minor version (`0.2.0` to `0.3.0`).
  - A request that only fixes, restyles or documents bumps the patch version (`0.3.0` to `0.3.1`).
- The harness commits each task as `<type>: <title>`, with the trailer
  `Commit by Qwopus from vb-harness <version>. <n> checks passed`.

## Phase 1: brand and shell (0.1 to 0.5)

| Version | Request | What |
| --- | --- | --- |
| 0.1.0 | (done by hand) | Design system, tokens, logo mark, favicon |
| 0.1.1 | (done by hand) | Test and check tooling: vitest, astro check |
| 0.2.0 | `01-logo.md` | `Logo` component, used in the header |
| 0.3.0 | `02-fonts-and-hero.md` | Brand fonts and a restyled hero |
| 0.3.1 | `02b-hero-fixes.md` | Hero centring and formatting fixes from 02 |
| 0.3.2 | `03-readme.md` | README: how the app is built, design system link |
| 0.4.0 | `04-footer.md` | Site footer |
| 0.8.0 | `05b-about.md` | `/about` page (05 failed; rerun after 07). Versions after this move up one minor. |
| 0.8.1 | `08-spacing-and-mobile.md` | 8-point spacing grid, phone layouts, footer kept at the bottom |

## Phase 2: accounts (0.6 to 0.8)

| Version | What |
| --- | --- |
| 0.6.0 | `06-login.md`: Login page with email and Google sign-in (better-auth), matching the signup form |
| 0.7.0 | `07-session-header.md`: Session-aware header: avatar menu and sign-out |
| 0.9.0 | `09-roles.md`: role on the session, middleware that guards pages by role, a 403 page |

## Phase 3: community (0.10 to 0.13)

The `post`, `postLike` and `postComment` models were already in the schema; 10 fixes their ids and cascades. The SQL
migration needs a real database and is made outside the harness.

| Version | What |
| --- | --- |
| 0.10.0 | `10-posts-feed-api.md`: model fixes, pagination helper, one-query feed (no N+1), `GET /api/posts` |
| 0.11.0 | The `/community` feed page with "load more" |
| 0.12.0 | Create, edit and delete your own posts and comments |
| 0.13.0 | Moderator and admin tools: edit or remove any post or comment |

## Phase 4: polish and release (0.13 to 1.0)

| Version | What |
| --- | --- |
| 0.13.0 | Metadata, Open Graph tags and a sitemap |
| 0.14.0 | `/resources` page from the CMS (Sanity) |
| 0.14.x | Accessibility and performance pass, fixes from review |
| 1.0.0 | Release: user and admin docs, contribution guide |

Requests for phases 2 to 4 are written when the previous phase is merged, so each one names files that exist.

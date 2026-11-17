Add the `/community` page: the first page of posts rendered on the server, and a "Load more" button that fetches the
next page from `GET /api/posts`. Use only what exists: `listPosts` in `src/lib/db/posts.ts`, `DEFAULT_LIMIT` and
`nextOffset` in `src/lib/posts/pagination.ts`. Follow DESIGN-SYSTEM.md (8-point grid, cards, mobile). Do not change
any existing file except `package.json`.

- New file `src/lib/posts/types.ts`, with no imports:

  ```ts
  export type FeedPost = {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    author: { id: string; name: string; image: string | null };
    _count: { comments: number; likes: number };
  };
  ```

- New file `src/components/cards/PostCard.tsx`: `export default function PostCard({ post }: { post: FeedPost })`.
  It renders one `<article>` with the classes `flex flex-col gap-2 rounded-lg border border-border bg-white p-6
  shadow-sm`, containing in this order:
  - `<h2 className="font-display text-xl font-extrabold text-ink">` with `post.title`.
  - `<p className="text-sm text-muted-foreground">` with `{post.author.name} · {date}`, where `date` is
    `new Date(post.createdAt).toISOString().slice(0, 10)` (for example `2026-11-17`).
  - `<p className="line-clamp-3 text-base text-ink">` with `post.body`.
  - `<p className="text-sm text-muted-foreground">` with `{post._count.comments} comments · {post._count.likes}
    likes`.
- New file `src/components/feed/CommunityFeed.tsx`:
  `export default function CommunityFeed({ initialPosts, initialNextOffset }: { initialPosts: FeedPost[];
  initialNextOffset: number | null })`.
  - State: `posts` (starts at `initialPosts`), `next` (starts at `initialNextOffset`), `loading` (starts `false`).
  - When `posts` is empty, render `<p className="text-muted-foreground">No posts yet.</p>` instead of the list.
  - Otherwise render `<div className="flex flex-col gap-4">` with one `PostCard` per post (`key={post.id}`).
  - Below it, when `next !== null`, a `<button type="button">` with the text "Load more" and the classes
    `inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-semibold text-snow
    hover:cursor-pointer sm:w-auto disabled:opacity-50`, `disabled={loading}`.
  - On click: set `loading` to true, `fetch(`/api/posts?offset=${next}`)`, read the JSON
    `{ posts: FeedPost[]; nextOffset: number | null }`, append its `posts` to `posts`, set `next` to its
    `nextOffset`, and set `loading` back to false in a `finally`.
  - Wrap everything in `<div className="flex flex-col gap-8">`.
- New page `src/pages/community.astro`, built like `src/pages/about.astro` (same `PublicLayout` and `<main>`
  classes). In the frontmatter:

  ```ts
  import { listPosts } from "@/lib/db/posts";
  import { DEFAULT_LIMIT, nextOffset } from "@/lib/posts/pagination";
  import type { FeedPost } from "@/lib/posts/types";
  import CommunityFeed from "@/components/feed/CommunityFeed";

  let posts: FeedPost[] = [];
  try {
    const rows = await listPosts({ offset: 0, limit: DEFAULT_LIMIT });
    posts = rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
  } catch {
    posts = [];
  }
  const next = nextOffset(0, DEFAULT_LIMIT, posts.length);
  ```

  The page has an `<h1>` "Community" with the about page's `<h1>` classes, a paragraph "Questions, advice and
  partnerships from the Penguino community." with `class="max-w-[65ch] text-muted-foreground"`, and then
  `<CommunityFeed client:load initialPosts={posts} initialNextOffset={next} />`.
- New test file `tests/post-card.test.tsx` (vitest, `renderToStaticMarkup` from `react-dom/server`, like
  `tests/footer.test.tsx`): render a `PostCard` with the post `{ id: "p1", title: "Hello", body: "First post",
  createdAt: "2026-11-17T10:00:00.000Z", author: { id: "u1", name: "Ada", image: null }, _count: { comments: 2,
  likes: 5 } }` and check the HTML contains `Hello`, `Ada · 2026-11-17`, `First post` and `2 comments · 5 likes`.
- New test file `tests/community-feed.test.tsx`: render `CommunityFeed` with `initialPosts: []` and
  `initialNextOffset: null` and check it contains `No posts yet.` and not `Load more`; render it with the post above
  and `initialNextOffset: 10` and check it contains `Hello` and `Load more`.
- Bump `version` in `package.json` from `0.10.0` to `0.11.0`. Change nothing else in that file.

Add the data layer for the community feed: fix the post models, a pagination helper, one query that loads a page of
posts, and a JSON API route. No pages or components change in this request.

- `prisma/schema.prisma`, models `post`, `postLike` and `postComment` only (change no other model):
  - Their `id` fields become `id String @id @default(cuid())`.
  - In `post` and `postComment`, `updatedAt DateTime @default(now())` becomes `updatedAt DateTime @updatedAt`.
  - In `postComment`, the `post` relation gets `onDelete: Cascade`:
    `post post @relation(fields: [postId], references: [id], onDelete: Cascade)`.
  - Do not add a migration and do not run any prisma command.
- New file `src/lib/posts/pagination.ts`, with no imports, exporting exactly these:
  - `export const DEFAULT_LIMIT = 10;` and `export const MAX_LIMIT = 50;`
  - `export function parsePage(params: URLSearchParams): { offset: number; limit: number }`. Read `offset` and
    `limit` with `Number.parseInt(value, 10)`. `offset` is the parsed number when it is an integer of 0 or more,
    otherwise 0. `limit` is the parsed number when it is an integer from 1 to `MAX_LIMIT`, `MAX_LIMIT` when it is
    larger than `MAX_LIMIT`, otherwise `DEFAULT_LIMIT`.
  - `export function nextOffset(offset: number, limit: number, returned: number): number | null`: `offset + limit`
    when `returned === limit`, otherwise `null` (a short page means there is nothing more).
- New file `src/lib/db/posts.ts` exporting
  `export async function listPosts(page: { offset: number; limit: number })`. It makes exactly one query (no query
  in a loop, so no N+1):

  ```ts
  return prisma.post.findMany({
    where: { hidden: false },
    orderBy: { createdAt: "desc" },
    skip: page.offset,
    take: page.limit,
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });
  ```

  with `import prisma from "./prisma";` at the top.
- New file `src/pages/api/posts.ts`:

  ```ts
  import type { APIRoute } from "astro";
  import { listPosts } from "@/lib/db/posts";
  import { nextOffset, parsePage } from "@/lib/posts/pagination";

  export const GET: APIRoute = async ({ url }) => {
    const page = parsePage(url.searchParams);
    const posts = await listPosts(page);
    return Response.json({
      posts,
      nextOffset: nextOffset(page.offset, page.limit, posts.length),
    });
  };
  ```

- New test file `tests/pagination.test.ts` (vitest, import from `@/lib/posts/pagination`) with these cases:
  - `parsePage(new URLSearchParams(""))` equals `{ offset: 0, limit: 10 }`.
  - `parsePage(new URLSearchParams("offset=20&limit=5"))` equals `{ offset: 20, limit: 5 }`.
  - `parsePage(new URLSearchParams("offset=-3&limit=0"))` equals `{ offset: 0, limit: 10 }`.
  - `parsePage(new URLSearchParams("offset=abc&limit=xyz"))` equals `{ offset: 0, limit: 10 }`.
  - `parsePage(new URLSearchParams("limit=500"))` equals `{ offset: 0, limit: 50 }`.
  - `nextOffset(0, 10, 10)` is `10`, `nextOffset(20, 10, 10)` is `30`, `nextOffset(0, 10, 4)` is `null`,
    `nextOffset(0, 10, 0)` is `null`.
- Bump `version` in `package.json` from `0.9.0` to `0.10.0`. Change nothing else in that file.

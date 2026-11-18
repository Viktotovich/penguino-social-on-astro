Finish request 11 (docs/requests/11-community-feed.md): the "Load more" button on `/community` does nothing.
Change only `src/components/feed/CommunityFeed.tsx` and delete `tests/CommunityFeed.astro`. Do not change any other
file, and do not change the version.

- In `src/components/feed/CommunityFeed.tsx`, keep the props and the markup, and add state with `useState` from
  `"react"`:
  - `posts`, starting at `initialPosts`;
  - `next`, starting at `initialNextOffset`;
  - `loading`, starting at `false`.
- Render from state, not from the props: the empty check is `posts.length === 0`, the list maps `posts`, and the
  button shows when `next !== null`.
- The button is:

  ```tsx
  <button
    type="button"
    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-semibold text-snow hover:cursor-pointer sm:w-auto disabled:opacity-50"
    disabled={loading}
    onClick={loadMore}
  >
    Load more
  </button>
  ```

- `loadMore` is:

  ```ts
  async function loadMore() {
    if (next === null) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?offset=${next}`);
      const data: { posts: FeedPost[]; nextOffset: number | null } = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setNext(data.nextOffset);
    } finally {
      setLoading(false);
    }
  }
  ```

- Delete `tests/CommunityFeed.astro`. It was not requested and nothing uses it.
- The existing tests in `tests/community-feed.test.tsx` must still pass unchanged.

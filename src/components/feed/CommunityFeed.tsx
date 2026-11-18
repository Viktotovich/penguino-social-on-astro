import type { FeedPost } from "@/lib/posts/types";
import PostCard from "@/components/cards/PostCard";
import { useState } from "react";

export default function CommunityFeed({
  initialPosts,
  initialNextOffset,
}: {
  initialPosts: FeedPost[];
  initialNextOffset: number | null;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [next, setNext] = useState(initialNextOffset);
  const [loading, setLoading] = useState(false);

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

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {next !== null && (
        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 font-semibold text-snow hover:cursor-pointer sm:w-auto disabled:opacity-50"
          disabled={loading}
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
}

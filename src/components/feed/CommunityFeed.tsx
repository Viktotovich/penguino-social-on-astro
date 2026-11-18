import React from "react";
import PostCard from "@/components/cards/PostCard";
import type { FeedPost } from "@/lib/posts/types";

export default function CommunityFeed({
  initialPosts,
  initialNextOffset,
}: {
  initialPosts: FeedPost[];
  initialNextOffset: number | null;
}) {
  const [posts, setPosts] = React.useState<FeedPost[]>(initialPosts);
  const [next, setNext] = React.useState<number | null>(initialNextOffset);
  const [loading, setLoading] = React.useState(false);

  const loadMore = async () => {
    if (next === null) return;
    setLoading(true);
    const response = await fetch(`/api/posts?offset=${next}`);
    const data = await response.json();
    setPosts((prev) => [...prev, ...data.posts]);
    setNext(data.nextOffset);
    setLoading(false);
  };

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
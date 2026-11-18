import type { FeedPost } from "@/lib/posts/types";
import PostCard from "@/components/cards/PostCard";

export default function CommunityFeed({
  initialPosts,
  initialNextOffset,
}: {
  initialPosts: FeedPost[];
  initialNextOffset: number | null;
}) {
  if (initialPosts.length === 0) {
    return <p className="text-muted-foreground">No posts yet.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {initialNextOffset !== null && (
        <button type="button">
          Load more
        </button>
      )}
    </div>
  );
}

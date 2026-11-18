import type { FeedPost } from "@/lib/posts/types";

export default function PostCard({ post }: { post: FeedPost }) {
  const date = new Date(post.createdAt).toISOString().slice(0, 10);

  return (
    <article className="flex flex-col gap-2 rounded-lg border border-border bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl font-extrabold text-ink">{post.title}</h2>
      <p className="text-sm text-muted-foreground">{post.author.name} · {date}</p>
      <p className="line-clamp-3 text-base text-ink">{post.body}</p>
      <p className="text-sm text-muted-foreground">{post._count.comments} comments · {post._count.likes} likes</p>
    </article>
  );
}
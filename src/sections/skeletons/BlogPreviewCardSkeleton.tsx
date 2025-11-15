//Components
import BlogPreviewCardSkeleton from "@/components/skeletons/BlogPreviewCardSkeleton";

export default function BlogPreviewListSkeleton() {
  return (
    <ul className="flex gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <li key={idx}>
          <BlogPreviewCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

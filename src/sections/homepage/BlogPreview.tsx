//Components
import BlogPreviewList from "./BlogPreviewList";

//Skeleton + loader
import { Suspense } from "react";
import BlogPreviewListSkeleton from "../skeletons/BlogPreviewCardSkeleton";

export default async function BlogPreview() {
  return (
    <section className="px-6 py-12 md:px-12 xl:px-24">
      <Suspense fallback={<BlogPreviewListSkeleton />}>
        <BlogPreviewList />
      </Suspense>
    </section>
  );
}

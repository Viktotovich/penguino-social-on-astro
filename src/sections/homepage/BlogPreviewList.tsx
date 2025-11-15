//Types
import { type SanityDocument } from "@sanity/client";

// Components
import BlogPreviewCard from "@/components/cards/BlogPreviewCard";

// Sanity provider
import { sanityClient } from "sanity:client";

//1:1 Docs for fetching
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, image, body, title, slug, publishedAt}`;

export default async function BlogPreviewList() {
  const posts = await fetchBlogs();

  async function fetchBlogs() {
    return await sanityClient.fetch<SanityDocument[]>(POSTS_QUERY, {});
  }

  return (
    <ul className="flex gap-4">
      {posts.length !== 0 ? (
        posts.map((post) => (
          <li key={post._id}>
            <BlogPreviewCard
              image={post.image}
              title={post.title}
              publishedAt={post.publishedAt}
              slug={post.slug.current}
            />
          </li>
        ))
      ) : (
        <p>No posts yet.</p>
      )}
    </ul>
  );
}

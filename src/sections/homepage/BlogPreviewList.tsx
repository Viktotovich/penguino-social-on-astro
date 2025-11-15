// Components
import BlogPreviewCard from "@/components/cards/BlogPreviewCard";

export default async function BlogPreviewList() {
  const posts = await fetchBlogs();

  async function fetchBlogs() {
    let blogs;
    setTimeout(() => {
      blogs = [
        {
          image: "",
          title: "Test blog title",
          publishedAt: "2025-11-15T00:00:00+00:00",
          slug: "testslug",
        },
      ];

      return blogs;
    }, 2000);

    return blogs;
  }

  return (
    <ul className="flex gap-4">
      {posts.map((post) => (
        <li key={post._id}>
          <BlogPreviewCard
            image={post.image}
            title={post.title}
            publishedAt={post.publishedAt}
            slug={post.slug.current}
          />
        </li>
      ))}
    </ul>
  );
}

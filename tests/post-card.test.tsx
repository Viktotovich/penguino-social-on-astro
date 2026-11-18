import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import PostCard from "@/components/cards/PostCard";

describe("PostCard", () => {
  it("renders the post title, author date, body and comment/like counts", () => {
    const post = {
      id: "p1",
      title: "Hello",
      body: "First post",
      createdAt: "2026-11-17T10:00:00.000Z",
      author: { id: "u1", name: "Ada", image: null },
      _count: { comments: 2, likes: 5 },
    };
    const html = renderToStaticMarkup(<PostCard post={post} />);
    expect(html).toContain("Hello");
    expect(html).toContain("Ada · 2026-11-17");
    expect(html).toContain("First post");
    expect(html).toContain("2 comments · 5 likes");
  });
});

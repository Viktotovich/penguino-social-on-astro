import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import CommunityFeed from "@/components/feed/CommunityFeed";

describe("CommunityFeed", () => {
  it("renders no posts message when empty", () => {
    const html = renderToStaticMarkup(
      <CommunityFeed initialPosts={[]} initialNextOffset={null} />
    );
    expect(html).toContain("No posts yet.");
    expect(html).not.toContain("Load more");
  });

  it("renders post and Load more button", () => {
    const post = {
      id: "p1",
      title: "Hello",
      body: "First post",
      createdAt: "2026-11-17T10:00:00.000Z",
      author: { id: "u1", name: "Ada", image: null },
      _count: { comments: 2, likes: 5 },
    };
    const html = renderToStaticMarkup(
      <CommunityFeed initialPosts={[post]} initialNextOffset={10} />
    );
    expect(html).toContain("Hello");
    expect(html).toContain("Load more");
  });
});

import type { APIRoute } from "astro";
import { listPosts } from "@/lib/db/posts";
import { nextOffset, parsePage } from "@/lib/posts/pagination";

export const GET: APIRoute = async ({ url }) => {
  const page = parsePage(url.searchParams);
  const posts = await listPosts(page);
  return Response.json({
    posts,
    nextOffset: nextOffset(page.offset, page.limit, posts.length),
  });
};

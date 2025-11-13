import { auth } from "@/lib/auth/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async (ctx) => {
  //part 1 of Rate limiting as per docs >> but TODO: take a closer look
  ctx.request.headers.set("x-forwarded-for", ctx.clientAddress);
  return auth.handler(ctx.request);
};

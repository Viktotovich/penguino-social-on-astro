import prisma from "./prisma";

export async function listPosts(page: { offset: number; limit: number }) {
  return prisma.post.findMany({
    where: { hidden: false },
    orderBy: { createdAt: "desc" },
    skip: page.offset,
    take: page.limit,
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, likes: true } },
    },
  });
}

export type FeedPost = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
  _count: { comments: number; likes: number };
};

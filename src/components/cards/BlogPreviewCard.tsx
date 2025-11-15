import AnchorButton from "../buttons/AnchorButton";

type BlogPreviewCardProps = {
  image: string | null;
  title: string;
  slug: string;
  publishedAt: string;
};

export default function BlogPreviewCard({
  image,
  title,
  slug,
  publishedAt,
}: BlogPreviewCardProps) {
  return (
    <div className="rounded-2xl px-4 py-4">
      <div className="mb-5">
        <img
          src={
            image ??
            "https://res.cloudinary.com/dxryzhwxi/image/upload/v1762602836/new_blog_iwckbf.png"
          }
          className="w-full rounded-2xl"
          alt="Blog Image"
          width="100"
          height="300"
          loading="lazy"
        />
      </div>
      <div className="flex gap-4">
        <div>
          <h3>{title}</h3>
          <p className="text-sm text-slate-400">
            {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>
        <AnchorButton
          href={`/posts/${slug}/`}
          cta="Read More"
          isPrimary={false}
        />
      </div>
    </div>
  );
}

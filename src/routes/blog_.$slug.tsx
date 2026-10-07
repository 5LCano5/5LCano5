import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/server/lunar";

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: params.slug });
    if (!post) throw notFound();
    return { post };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const paragraphs = post.body.split(/\n\n+/);
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs text-primary">{post.category}</p>
      <h1 className="mt-3 text-4xl">{post.title}</h1>
      {post.cover ? (
        <img src={post.cover} alt="" className="mt-8 w-full rounded-xl object-cover" />
      ) : null}
      <div className="mt-8 space-y-4 text-muted">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <Button asChild variant="outline" className="mt-10">
        <Link to="/blog">بازگشت به بلاگ</Link>
      </Button>
    </article>
  );
}

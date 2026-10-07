import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site-shell";
import { listPosts } from "@/lib/server/lunar";

export const Route = createFileRoute("/blog")({
  loader: async () => ({ posts: await listPosts() }),
  component: BlogPage,
});

function BlogPage() {
  const { posts } = Route.useLoaderData();
  return (
    <>
      <PageHero
        kicker="LOG"
        title="بلاگ لونار"
        subtitle="آپدیت فصل، اقتصاد، آنتی‌چیت و لانچر — گزارش مدار از قلب ماه."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="lunar-card overflow-hidden">
              {post.cover ? (
                <img src={post.cover} alt="" className="aspect-video w-full object-cover" />
              ) : null}
              <div className="p-6">
                <p className="text-xs text-primary">{post.category}</p>
                <h2 className="mt-2 text-2xl">{post.title}</h2>
                <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

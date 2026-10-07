import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-shell";
import { MODES } from "@/lib/content";

export const Route = createFileRoute("/modes")({
  component: ModesPage,
});

function ModesPage() {
  return (
    <>
      <PageHero
        kicker="GAME MODES"
        title="گیم‌مودهای مدار ماه"
        subtitle="هر مود پلاگین و مپ خودش را دارد. پینگ ایران، آنتی‌چیت مشترک، و فصل‌های هماهنگ."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6">
        {MODES.map((mode, i) => (
          <article
            key={mode.id}
            id={mode.id}
            className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2"
          >
            <img
              src={mode.image}
              alt={mode.title}
              className={`w-full rounded-xl object-cover ${i % 2 === 1 ? "lg:order-2" : ""}`}
            />
            <div>
              <p className="en-mark text-xs text-primary">{mode.en}</p>
              <h2 className="mt-2 text-3xl">{mode.title}</h2>
              <p className="mt-4 text-muted">{mode.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {mode.tags.map((tag) => (
                  <li key={tag} className="rounded-sm bg-raised px-3 py-1 text-sm text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

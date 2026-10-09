import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RankMoon } from "@/components/rank-moon";
import { PageHero } from "@/components/site-shell";
import { createOrder, listRanks, type Rank } from "@/lib/server/lunar";

export const Route = createFileRoute("/shop")({
  loader: async () => ({
    ranks: await listRanks(),
  }),
  component: Shop,
});

function ColoredPerk({ perk }: { perk: string }) {
  const colors: Record<string, string> = {
    "آبی": "#3B82F6",
    "قرمز": "#EF4444",
    "سبز": "#22C55E",
    "بنفش": "#A855F7",
    "زرد": "#EAB308",
    "صورتی": "#EC4899",
    "طلایی": "#D6CAA5",
    "نارنجی": "#F97316",
    "فیروزه‌ای": "#06B6D4",
    "سفید": "#FFFFFF",
  };

  for (const [name, color] of Object.entries(colors)) {
    if (perk.includes(name)) {
      const parts = perk.split(name);

      return (
        <>
          {parts[0]}
          <span style={{ color }}>{name}</span>
          {parts.slice(1).join(name)}
        </>
      );
    }
  }

  return perk;
}

function Shop() {
  const { ranks } = Route.useLoaderData();

  async function buy(rank: Rank) {
    try {
      const order = await createOrder({ data: rank.id });
      window.location.href = `/checkout/${order.id}`;
    } catch (error) {
      console.error(error);
      toast.error("خطا در ایجاد سفارش");
    }
  }

  return (
    <main>
      <PageHero
        kicker="SHOP"
        title="فروشگاه لونار سیتی"
        description="رنک موردنظرت رو انتخاب کن و امکانات بیشتری در سرور داشته باش."
        image="/images/shop-banner.jpg"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ranks.map((rank) => (
            <article
              key={rank.id}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6"
            >
              {rank.popular && (
                <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  محبوب‌ترین
                </div>
              )}

              <div className="flex items-center gap-4">
                <RankMoon id={rank.id} className="size-14" />

                <div>
                  <h2 className="text-xl font-bold">{rank.nameFa}</h2>
                  <p className="en-mark text-xs text-primary">{rank.nameEn}</p>
                </div>
              </div>

              <p className="mt-4 min-h-10 text-sm text-muted">
                {rank.tagline}
              </p>

              <div className="mt-5">
                <div className="text-2xl font-black">
                  {rank.priceToman.toLocaleString("fa-IR")} تومان
                </div>
                <div className="mt-1 text-xs text-muted">
                  اعتبار {rank.durationDays} روزه
                </div>
              </div>

              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                {rank.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    <ColoredPerk perk={perk} />
                  </li>
                ))}
              </ul>

              <Button className="mt-6 w-full" onClick={() => buy(rank)}>
                خرید {rank.nameFa}
              </Button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

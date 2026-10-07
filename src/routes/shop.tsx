import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RankMoon } from "@/components/rank-moon";
import { PageHero } from "@/components/site-shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { createOrder, listRanks, type Rank } from "@/lib/server/lunar";
import { formatToman, toFaDigits } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  loader: async () => ({ ranks: await listRanks() }),
  component: Shop,
});

function Shop() {
  const { ranks } = Route.useLoaderData();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);

  async function buy(rank: Rank) {
    if (isPending) return;
    if (!user) {
      await navigate({ to: "/login", search: { next: "/shop" } });
      return;
    }
    setBusy(rank.id);
    try {
      const res = await createOrder({ data: rank.id });
      await navigate({ to: "/checkout/$orderId", params: { orderId: String(res.orderId) } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خرید انجام نشد");
    } finally {
      setBusy(null);
    }
  }

  return (
    <>
      <PageHero
        kicker="SHOP"
        title="فروشگاه رنک لونار"
        subtitle="رنک‌ها ماهانه فعال می‌شوند، پیشوند چت و کیت همان لحظه بعد از پرداخت روی حساب ماینکرافت‌تان می‌نشیند. فقط ارتقا ممکن است؛ رنک پایین‌تر خریده نمی‌شود."
      />
      <div className="relative">
        <img
          src="/images/shop-banner.jpg"
          alt=""
          className="h-40 w-full object-cover opacity-50 sm:h-56"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-5 md:grid-cols-2">
          {ranks.map((rank) => (
            <article
              key={rank.id}
              className={`lunar-card flex flex-col p-5 ${rank.popular ? "ring-1 ring-primary/60" : ""}`}
            >
              {rank.popular ? (
                <p className="mb-3 text-center text-xs text-primary">پیشنهاد لونار</p>
              ) : (
                <p className="mb-3 h-4" />
              )}
              <RankMoon id={rank.id} className="mx-auto h-10 w-12" />
              <p className="en-mark mt-3 text-center text-[10px] text-primary">{rank.nameEn}</p>
              <h2 className="text-center text-2xl">{rank.nameFa}</h2>
              <p className="mt-2 text-center text-sm text-muted">{rank.tagline}</p>
              <p className="mt-4 text-center text-xl text-primary">{formatToman(rank.priceToman)}</p>
              <p className="text-center text-xs text-muted">{toFaDigits(rank.durationDays)} روز</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted">
                {rank.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={rank.popular ? "primary" : "outline"}
                disabled={busy === rank.id}
                onClick={() => void buy(rank)}
              >
                {busy === rank.id ? "ساخت سفارش…" : user ? "خرید رنک" : "ورود و خرید"}
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          پرداخت روی درگاه ماه لونار شبیه‌سازی می‌شود و رنک روی پنل فعال می‌گردد. نام کاربری ماینکرافت را قبل از خرید در پنل چک کنید.
        </p>
      </div>
    </>
  );
}

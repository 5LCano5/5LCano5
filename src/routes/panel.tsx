import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site-shell";
import { RankMoon } from "@/components/rank-moon";
import { RedirectToSignIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyPanel, updateMcUsername, type PanelData } from "@/lib/server/lunar";
import { formatToman } from "@/lib/utils";

export const Route = createFileRoute("/panel")({
  component: PanelPage,
});

function PanelPage() {
  const { user, isPending } = useCurrentUserState();
  const [panel, setPanel] = useState<PanelData | null>(null);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    void getMyPanel()
      .then((p) => {
        setPanel(p);
        setName(p.mcUsername);
      })
      .catch(() => toast.error("پنل بارگذاری نشد"));
  }, [isPending, user]);

  if (isPending) return <div className="px-4 py-20 text-center text-muted">در حال ورود به پنل…</div>;
  if (!user) return <RedirectToSignIn to="/login" />;

  async function saveName(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await updateMcUsername({ data: name });
      const fresh = await getMyPanel();
      setPanel(fresh);
      toast.success("نام کاربری ذخیره شد");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ذخیره نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        kicker="PANEL"
        title={`سلام ${user.displayName ?? "بازیکن"}`}
        subtitle="رنک، سفارش‌ها، تیکت‌ها و نام کاربری ماینکرافت — همه در مدار حساب شما."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <section className="lunar-card p-6 lg:col-span-1">
          <p className="text-sm text-muted">رنک فعال</p>
          {panel?.rank ? (
            <div className="mt-4">
              <RankMoon id={panel.rank.id} className="h-10 w-12" />
              <h2 className="mt-3 text-2xl">{panel.rank.nameFa}</h2>
              <p className="en-mark text-xs text-primary">{panel.rank.nameEn}</p>
              {panel.rankExpiresAt ? (
                <p className="mt-2 text-xs text-muted">انقضا: {panel.rankExpiresAt.slice(0, 16)}</p>
              ) : null}
            </div>
          ) : (
            <div className="mt-4">
              <p>هنوز رنکی ندارید.</p>
              <Button asChild className="mt-4">
                <Link to="/shop">خرید رنک</Link>
              </Button>
            </div>
          )}
          <div className="mt-8">
            <UserButton />
          </div>
        </section>
        <section className="lunar-card p-6 lg:col-span-2">
          <h2 className="text-xl">نام کاربری ماینکرافت</h2>
          <p className="mt-2 text-sm text-muted">رنک خریداری‌شده روی همین نام اعمال می‌شود.</p>
          <form onSubmit={(e) => void saveName(e)} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={16} />
            <Button type="submit" disabled={busy}>
              ذخیره
            </Button>
          </form>
        </section>
        <section className="lunar-card p-6 lg:col-span-2">
          <h2 className="text-xl">سفارش‌ها</h2>
          {panel && panel.orders.length === 0 ? (
            <p className="mt-3 text-sm text-muted">سفارشی ندارید.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {panel?.orders.map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <span>
                    #{o.id} · {o.rankName}
                  </span>
                  <span className="text-muted">{formatToman(o.amountToman)}</span>
                  <span className={o.status === "paid" ? "text-primary" : "text-muted"}>
                    {o.status === "paid" ? "پرداخت‌شده" : "در انتظار"}
                  </span>
                  {o.status !== "paid" ? (
                    <Link to="/checkout/$orderId" params={{ orderId: String(o.id) }} className="text-primary">
                      پرداخت
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="lunar-card p-6">
          <h2 className="text-xl">تیکت‌ها</h2>
          {panel && panel.tickets.length === 0 ? (
            <p className="mt-3 text-sm text-muted">تیکتی نیست.</p>
          ) : (
            <ul className="mt-4 space-y-2 text-sm">
              {panel?.tickets.map((t) => (
                <li key={t.id}>
                  <Link to="/support/$id" params={{ id: String(t.id) }} className="hover:text-primary">
                    {t.subject}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/support">پشتیبانی</Link>
          </Button>
        </section>
      </div>
    </>
  );
}

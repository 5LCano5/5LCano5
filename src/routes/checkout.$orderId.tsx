import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getOrder, payOrder } from "@/lib/server/lunar";
import { formatToman } from "@/lib/utils";

export const Route = createFileRoute("/checkout/$orderId")({
  component: Checkout,
});

type OrderView = NonNullable<Awaited<ReturnType<typeof getOrder>>>;

function Checkout() {
  const { orderId } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [order, setOrder] = useState<OrderView | "loading" | "missing">("loading");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = Number(orderId);

  useEffect(() => {
    if (isPending || !user || Number.isNaN(id)) return;
    void getOrder({ data: id })
      .then((o) => setOrder(o ?? "missing"))
      .catch(() => setOrder("missing"));
  }, [id, isPending, user]);

  if (isPending) return <div className="mx-auto max-w-lg px-4 py-20 text-muted">در حال بررسی حساب…</div>;
  if (!user) return <RedirectToSignIn to="/login" />;
  if (order === "loading") {
    return <div className="mx-auto max-w-lg px-4 py-20 text-muted">بارگذاری سفارش…</div>;
  }
  if (Number.isNaN(id) || order === "missing") {
    return (
      <PageHero kicker="CHECKOUT" title="سفارش پیدا نشد" subtitle="از فروشگاه دوباره رنک را انتخاب کنید." />
    );
  }
  const paid = order.status === "paid";

  async function pay() {
    setPaying(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 900));
      await payOrder({ data: id });
      const fresh = await getOrder({ data: id });
      setOrder(fresh ?? "missing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "پرداخت ناموفق");
    } finally {
      setPaying(false);
    }
  }

  return (
    <>
      <PageHero
        kicker="MOON GATEWAY"
        title={paid ? "پرداخت موفق" : "درگاه پرداخت ماه"}
        subtitle={paid ? "رنک روی حساب شما فعال شد." : "سفارش را بررسی کنید و پرداخت را تکمیل کنید."}
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <div className="lunar-card p-6">
          <p className="en-mark text-xs text-primary">{order.rankEn}</p>
          <h2 className="mt-2 text-2xl">رنک {order.rankName}</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">شماره سفارش</dt>
              <dd>{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">مبلغ</dt>
              <dd className="text-primary">{formatToman(order.amountToman)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">وضعیت</dt>
              <dd>{paid ? "پرداخت‌شده" : "در انتظار پرداخت"}</dd>
            </div>
          </dl>
          {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
          {paid ? (
            <Button asChild className="mt-6 w-full">
              <Link to="/panel">رفتن به پنل</Link>
            </Button>
          ) : (
            <Button className="mt-6 w-full" disabled={paying} onClick={() => void pay()}>
              {paying ? "اتصال به درگاه…" : "پرداخت و فعال‌سازی رنک"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

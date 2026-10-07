import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { PageHero } from "@/components/site-shell";
import { FAQS } from "@/lib/content";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { createTicket, listMyTickets, type Ticket } from "@/lib/server/lunar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

const CATS = ["عمومی", "فروشگاه", "حساب بازی", "تقلب/بن", "فنی"];

function SupportPage() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(CATS[0] ?? "عمومی");
  const [body, setBody] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    void listMyTickets()
      .then(setTickets)
      .catch(() => setTickets([]));
  }, [isPending, user]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("اول وارد حساب شوید");
      return;
    }
    setBusy(true);
    try {
      const res = await createTicket({ data: { subject, category, body } });
      toast.success("تیکت ثبت شد");
      await navigate({ to: "/support/$id", params: { id: String(res.ticketId) } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "ارسال نشد");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        kicker="SUPPORT"
        title="پشتیبانی مدار"
        subtitle="سؤال‌های پرتکرار را بخوانید یا برای استاف تیکت باز کنید. پاسخ‌ها داخل همین سایت ثبت می‌شود."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl">پرسش‌های پرتکرار</h2>
          <div className="mt-6 space-y-2">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="lunar-card overflow-hidden">
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between px-4 py-3 text-right text-sm"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="text-primary">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i ? <p className="px-4 pb-4 text-sm text-muted">{faq.a}</p> : null}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl">تیکت جدید</h2>
          {isPending ? (
            <p className="mt-4 text-sm text-muted">بررسی حساب…</p>
          ) : user ? (
            <form onSubmit={(e) => void send(e)} className="mt-6 space-y-4 lunar-card p-5">
              <label className="block text-sm">
                موضوع
                <Input className="mt-1" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </label>
              <label className="block text-sm">
                دسته
                <select
                  className="mt-1 min-h-11 w-full rounded-md bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                پیام
                <Textarea className="mt-1" value={body} onChange={(e) => setBody(e.target.value)} required />
              </label>
              <Button type="submit" disabled={busy} className="w-full">
                {busy ? "در حال ارسال…" : "ارسال تیکت"}
              </Button>
            </form>
          ) : (
            <div className="lunar-card mt-6 p-5">
              <p className="text-sm text-muted">برای ارسال تیکت باید وارد حساب شوید.</p>
              <Button asChild className="mt-4">
                <Link to="/login" search={{ next: "/support" }}>
                  ورود / ثبت‌نام
                </Link>
              </Button>
            </div>
          )}
          {tickets.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg">تیکت‌های شما</h3>
              <ul className="mt-3 space-y-2">
                {tickets.map((t) => (
                  <li key={t.id}>
                    <Link
                      to="/support/$id"
                      params={{ id: String(t.id) }}
                      className={cn("lunar-card flex items-center justify-between p-4 text-sm")}
                    >
                      <span>{t.subject}</span>
                      <span className="text-xs text-muted">{t.status === "open" ? "باز" : t.status}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

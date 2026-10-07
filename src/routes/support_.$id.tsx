import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getTicketThread, replyTicket, type Ticket, type TicketMessage } from "@/lib/server/lunar";

export const Route = createFileRoute("/support_/$id")({
  component: TicketPage,
});

function TicketPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const ticketId = Number(id);
  const [data, setData] = useState<{ ticket: Ticket; messages: TicketMessage[] } | null | "loading">(
    "loading",
  );
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending || !user || Number.isNaN(ticketId)) return;
    void getTicketThread({ data: ticketId })
      .then(setData)
      .catch(() => setData(null));
  }, [isPending, user, ticketId]);

  if (isPending) return <div className="px-4 py-20 text-center text-muted">در حال بارگذاری…</div>;
  if (!user) return <RedirectToSignIn to="/login" />;
  if (data === "loading") return <div className="px-4 py-20 text-center text-muted">بارگذاری تیکت…</div>;
  if (!data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p>تیکت پیدا نشد.</p>
        <Button asChild className="mt-4" variant="outline">
          <Link to="/support">بازگشت</Link>
        </Button>
      </div>
    );
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await replyTicket({ data: { ticketId, body } });
      setBody("");
      const fresh = await getTicketThread({ data: ticketId });
      setData(fresh);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs text-primary">{data.ticket.category}</p>
      <h1 className="mt-2 text-3xl">{data.ticket.subject}</h1>
      <div className="mt-8 space-y-3">
        {data.messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-lg p-4 ${m.isStaff ? "bg-raised text-fg" : "lunar-card"}`}
          >
            <p className="text-xs text-primary">{m.isStaff ? "استاف لونار" : "شما"}</p>
            <p className="mt-2 text-sm">{m.body}</p>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => void send(e)} className="mt-8 space-y-3">
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="پاسخ شما…" required />
        <Button type="submit" disabled={busy}>
          {busy ? "ارسال…" : "ارسال پاسخ"}
        </Button>
      </form>
    </div>
  );
}

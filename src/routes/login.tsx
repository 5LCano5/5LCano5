import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site-shell";
import { updateMcUsername } from "@/lib/server/lunar";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" && s.next.startsWith("/") ? s.next : "/panel",
  }),
  component: Login,
});

function Login() {
  const { next } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const [tab, setTab] = useState<"in" | "up">("up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mcUsername, setMcUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    return <Navigate to={next} />;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (tab === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: mcUsername || email.split("@")[0] || "player",
        });
        if (err) throw new Error(err.message ?? "ثبت‌نام انجام نشد");
        if (mcUsername) {
          try {
            await updateMcUsername({ data: mcUsername });
          } catch {
            /* profile can be completed in panel */
          }
        }
      } else {
        const { error: err } = await authClient.signIn.email({ email, password });
        if (err) throw new Error(err.message ?? "ورود انجام نشد");
      }
      await authClient.getSession();
      window.location.assign(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHero
        kicker="ACCOUNT"
        title={tab === "up" ? "ثبت‌نام در مدار لونار" : "ورود به حساب"}
        subtitle="برای خرید رنک، تیکت پشتیبانی و پنل کاربری یک حساب بسازید. ورود با ایمیل، گوگل یا X."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <img
          src="/images/shop-banner.jpg"
          alt="ماه کامل مدار لونار"
          className="hidden h-full min-h-80 rounded-xl object-cover lg:block"
        />
        <div className="lunar-card p-6 sm:p-8">
          <div className="mb-6 grid grid-cols-2 rounded-md bg-raised p-1">
            <button
              type="button"
              className={`min-h-11 rounded-sm text-sm ${tab === "up" ? "bg-surface text-primary" : "text-muted"}`}
              onClick={() => setTab("up")}
            >
              ثبت‌نام
            </button>
            <button
              type="button"
              className={`min-h-11 rounded-sm text-sm ${tab === "in" ? "bg-surface text-primary" : "text-muted"}`}
              onClick={() => setTab("in")}
            >
              ورود
            </button>
          </div>
          {authEnabled ? (
            <form onSubmit={(e) => void submit(e)} className="space-y-4">
              {tab === "up" ? (
                <label className="block text-sm">
                  نام کاربری ماینکرافت
                  <Input
                    className="mt-1"
                    value={mcUsername}
                    onChange={(e) => setMcUsername(e.target.value)}
                    placeholder="Steve"
                    minLength={3}
                    maxLength={16}
                    required
                  />
                </label>
              ) : null}
              <label className="block text-sm">
                ایمیل
                <Input
                  className="mt-1"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>
              <label className="block text-sm">
                رمز عبور
                <Input
                  className="mt-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete={tab === "up" ? "new-password" : "current-password"}
                />
              </label>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "لطفاً صبر کنید…" : tab === "up" ? "ساخت حساب" : "ورود"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted">ثبت‌نام فعلاً غیرفعال است.</p>
          )}
          <div className="my-6 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            یا
            <span className="h-px flex-1 bg-border" />
          </div>
          {authEnabled ? (
            <div className="grid gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => void signIn(p.providerId, { callbackURL: next })}
                >
                  ادامه با {p.label === "Google" ? "گوگل" : "X"}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

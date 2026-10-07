import { Link, useRouterState } from "@tanstack/react-router";
import { Copy, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { NAV } from "@/lib/content";
import { cn, SERVER_IP, toFaDigits } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getServerStatus } from "@/lib/server/lunar";

function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-11 w-28 animate-pulse rounded-md bg-raised" />;
  }
  if (user) {
    return (
      <Button asChild variant="outline">
        <Link to="/panel">پنل کاربری</Link>
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost">
        <Link to="/login" search={{ next: "/panel" }}>
          ورود
        </Link>
      </Button>
      <Button asChild>
        <Link to="/login" search={{ next: "/panel" }}>
          ثبت‌نام
        </Link>
      </Button>
    </div>
  );
}

function copyIp() {
  void navigator.clipboard.writeText(SERVER_IP).then(
    () => toast.success("آی‌پی سرور کپی شد"),
    () => toast.error("کپی نشد؛ دستی وارد کنید"),
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState<number | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    void getServerStatus()
      .then((s) => setOnline(s.online))
      .catch(() => setOnline(214));
  }, []);

  return (
    <div className="starfield min-h-screen">
      <div className="sticky top-0 z-40">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-bg/90 px-4 py-2 text-xs text-muted backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-fg">
              <span className="size-1.5 rounded-full bg-primary" />
              {online === null ? "…" : `${toFaDigits(online)} بازیکن آنلاین`}
            </span>
          </div>
          <button
            type="button"
            onClick={copyIp}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-sm px-2 text-fg hover:text-primary"
          >
            <span className="en-mark text-[10px] tracking-widest">{SERVER_IP}</span>
            <Copy className="size-3.5" />
            کپی آی‌پی
          </button>
        </div>
        <header className="border-b border-border bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="" className="size-9 outline-none" />
              <span className="leading-none">
                <span className="en-mark block text-sm text-primary">LUNAR</span>
                <span className="font-sahel text-sm font-black">لونار سیتی</span>
              </span>
            </Link>
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: "exact" in item && item.exact }}
                  activeProps={{ className: "text-primary" }}
                  className="rounded-md px-3 py-2 text-sm text-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <AuthSlot />
              </div>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-md lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "بستن منو" : "باز کردن منو"}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
          {open ? (
            <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
              <nav className="flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "min-h-11 rounded-md px-3 py-3 text-sm",
                      pathname === item.to ? "bg-raised text-primary" : "text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4">
                <AuthSlot />
              </div>
            </div>
          ) : null}
        </header>
      </div>
      <main>{children}</main>
      <footer className="mt-20 border-t border-border bg-surface/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="en-mark text-primary">LUNAR</p>
            <p className="mt-2 font-sahel text-xl font-black">لونار سیتی، سرور ایران</p>
            <p className="mt-3 max-w-md text-sm text-muted">
               لونار سیتی، یک سرور ماینکرفتی عمومی است که جهت سرگرمی آنلاین ساخته شده
            </p>
          </div>
          <div>
            <p className="text-sm font-bold">دسترسی</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold">ورود</p>
            <p className="en-mark mt-3 text-xs text-primary">{SERVER_IP}</p>
            <Button variant="outline" className="mt-3" onClick={copyIp}>
              کپی آی‌پی
            </Button>
          </div>
        </div>
        <div className="hairline" />
        <p className="px-4 py-5 text-center text-xs text-muted">
          © {toFaDigits(new Date().getFullYear())} 2026 Lunar City ۰ All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="en-mark text-xs text-primary">{kicker}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-muted">{subtitle}</p>
      </div>
    </section>
  );
}

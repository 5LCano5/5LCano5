import { createFileRoute } from "@tanstack/react-router";
import { Download, Gauge, Shield, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site-shell";
import { SERVER_IP } from "@/lib/utils";

export const Route = createFileRoute("/launcher")({
  component: LauncherPage,
});

const FEATURES = [
  { icon: Sparkles, title: "رابط مدرن", body: "تم تیره مدار ماه، ساده و سریع. همه چیز سر جایش است." },
  { icon: Gauge, title: "اجرای سبک", body: "حتی روی سیستم ضعیف بالا می‌آید. زمان لود کوتاه‌تر از لانچرهای سنگین." },
  { icon: Zap, title: "آپدیت خودکار", body: "نسخه جدید از CDN می‌آید. لازم نیست دستی دانلود کنید." },
  { icon: Shield, title: "بدون اکانت اضافه", body: "لانچر اطلاعات شخصی نمی‌خواهد. نصب کن و وارد play.lunar.ir شو." },
];

function fakeDownload(os: string) {
  toast.success(`لینک نسخه ${os} به‌زودی در دیسکورد لونار هم منتشر می‌شود — آی‌پی ${SERVER_IP} همین حالا کار می‌کند.`);
}

function LauncherPage() {
  return (
    <>
      <PageHero
        kicker="LAUNCHER"
        title="لونار لانچر"
        subtitle="لانچر اختصاصی ماینکرافت لونار؛ رابط مدرن، سرعت بالا، به‌روزرسانی خودکار و ورود یک‌کلیکه به مدار."
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-muted">
            لونار لانچر فقط یک اجراکننده نیست. مجموعه ابزار ورود به شبکه است: انتخاب نسخه، تنظیم گرافیک بر اساس سخت‌افزار،
            و دکمه ورود مستقیم به سرور.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => fakeDownload("ویندوز")}>
              <Download className="size-4" />
              دانلود ویندوز
            </Button>
            <Button variant="outline" onClick={() => fakeDownload("اندروید")}>
              اندروید
            </Button>
            <Button variant="outline" onClick={() => fakeDownload("لینوکس")}>
              لینوکس
            </Button>
          </div>
        </div>
        <img src="/images/launcher.jpg" alt="پیش‌نمایش لونار لانچر" className="w-full rounded-xl object-cover" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2">
        {FEATURES.map((f) => (
          <article key={f.title} className="lunar-card p-6">
            <f.icon className="size-5 text-primary" />
            <h2 className="mt-4 text-xl">{f.title}</h2>
            <p className="mt-2 text-sm text-muted">{f.body}</p>
          </article>
        ))}
      </div>
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl">نصب در سه قدم</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { n: "۰۱", t: "دانلود", d: "نسخه سیستم‌عامل خود را بگیرید." },
              { n: "۰۲", t: "نصب", d: "فایل را اجرا کنید؛ نسخه سبک برای سیستم ضعیف موجود است." },
              { n: "۰۳", t: "ورود", d: "دکمه ورود به لونار را بزنید. آی‌پی دستی لازم نیست." },
            ].map((s) => (
              <li key={s.n} className="lunar-card p-5">
                <p className="en-mark text-primary">{s.n}</p>
                <h3 className="mt-2 text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

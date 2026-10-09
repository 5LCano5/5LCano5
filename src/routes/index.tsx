import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Copy, Download, Shield, Sparkles, Swords, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RankMoon } from "@/components/rank-moon";
import { FEATURES, JOIN_STEPS, MODES, STAFF } from "@/lib/content";
import { getServerStatus, listPosts, listRanks, type Post, type Rank } from "@/lib/server/lunar";
import { formatToman, SERVER_IP, toFaDigits } from "@/lib/utils";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [ranks, posts, status] = await Promise.all([listRanks(), listPosts(), getServerStatus()]);
    return { ranks, posts, status };
  },
  component: Home,
});

function Home() {
  const { ranks, posts, status } = Route.useLoaderData();
  return (
    <>
      <Hero status={status} />
      <Join />
      <Modes />
      <RanksPreview ranks={ranks} />
      <About />
      <Features />
      <BlogPreview posts={posts.slice(0, 3)} />
      <Staff />
    </>
  );
}

function Hero({ status }: { status: { online: number; max: number; ip: string } }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="en-mark text-xs text-primary">LUNAR NETWORK</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">
            <span style={{ color: "#D6CAA5" }}>لونار سیتی</span>، تجربه ای باور نکردنی
          </h1>
          <p className="mt-5 max-w-xl text-muted">
            <strong className="text-fg">لونار</strong> تجربه‌ای فراتر از ماینکرفت معمولی. هر گیم‌مود یک مدار دور ماه است؛ با
            چالش‌ها، پلاگین‌های اختصاصی و مکانیک‌هایی که بازی را از حالت تکراری درمی‌آورند. از بقای اقتصادی تا مون‌وارز،
            آرنا و بتل‌پس فصلی — همیشه یک فاز تازه در راه است.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button onClick={() => void copyIp()}>
              <Copy className="size-4" />
              کپی آی‌پی سرور
            </Button>
            <Button asChild variant="outline">
              <Link to="/launcher">
                <Download className="size-4" />
                دانلود لانچر
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-sm">
            <span className="text-primary">{toFaDigits(status.online)}</span>
            <span className="text-muted"> بازیکن · </span>
            <span className="en-mark text-[11px] text-fg">{status.ip}</span>
          </p>
        </div>
        <div className="relative">
          <img
            src="/images/hero.jpg"
            alt="منظره پایگاه لونار روی سطح ماه"
            className="aspect-video w-full rounded-xl object-cover shadow-[var(--shadow-border)]"
          />
          <div className="absolute bottom-3 left-3 rounded-md bg-bg/80 px-3 py-2 text-xs backdrop-blur-sm">
            ظرفیت {toFaDigits(status.online)} از {toFaDigits(status.max)}
          </div>
        </div>
      </div>
      <div className="hairline" />
    </section>
  );
}

function Join() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="en-mark text-xs text-primary">HOW TO JOIN</p>
      <h2 className="mt-2 text-3xl">آموزش ورود به سرور لونار سیتی</h2>
      <p className="mt-3 max-w-2xl text-muted">
        برای ورود به سرور ماینکرافت لونار و شروع بازی، این سه مرحله را دنبال کنید.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {JOIN_STEPS.map((step) => (
          <article key={step.n} className="lunar-card p-6">
            <p className="en-mark text-primary">{step.n}</p>
            <h3 className="mt-3 text-xl">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
            {"cta" in step && step.cta ? (
              <Button asChild variant="outline" className="mt-5">
                <Link to={step.cta.to}>{step.cta.label}</Link>
              </Button>
            ) : (
              <p className="en-mark mt-5 text-xs text-primary">{SERVER_IP}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Modes() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="en-mark text-xs text-primary">GAME MODES</p>
            <h2 className="mt-2 text-3xl">گیم مود های لونار سیتی</h2>
            <p className="mt-3 max-w-2xl text-muted">
              تجربه متفاوت از دنیای ماینکرافت، بازی با دوستان و رقابت — هر مود با پلاگین اختصاصی و بهینه برای پینگ ایران.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/modes">
              همه مودها
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODES.map((mode) => (
            <Link key={mode.id} to="/modes" hash={mode.id} className="lunar-card group overflow-hidden">
              <img src={mode.image} alt={mode.title} className="aspect-photo w-full object-cover" />
              <div className="p-5">
                <p className="en-mark text-[10px] text-primary">{mode.en}</p>
                <h3 className="mt-1 text-xl">{mode.title}</h3>
                <p className="mt-2 text-sm text-muted">{mode.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mode.tags.map((tag) => (
                    <span key={tag} className="rounded-sm bg-raised px-2 py-1 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RanksPreview({ ranks }: { ranks: Rank[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="en-mark text-xs text-primary">RANKS</p>
          <h2 className="mt-2 text-3xl">فروش رنک</h2>
          <p className="mt-3 max-w-2xl text-muted">رنک های متفاوت و قابلیت های متفاوت</p>
        </div>
        <Button asChild>
          <Link to="/shop">ورود به فروشگاه</Link>
        </Button>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {ranks.map((rank) => (
          <article key={rank.id} className={`lunar-card p-5 ${rank.popular ? "shadow-[var(--shadow-border-hover)]" : ""}`}>
            <RankMoon id={rank.id} className="h-8 w-10" />
            <p className="en-mark mt-3 text-[10px] text-primary">{rank.nameEn}</p>
            <h3 className="text-xl">{rank.nameFa}</h3>
            <p className="mt-3 text-lg text-primary">{formatToman(rank.priceToman)}</p>
            {rank.popular ? <p className="mt-2 text-xs text-primary">پیشنهادی</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <img
          className="w-full rounded-xl object-cover"
        />
        <div>
          <p className="en-mark text-xs text-primary">ABOUT</p>
          <h2 className="mt-2 text-3xl">درباره ما</h2>
          <p className="mt-4 text-muted">
            سرور لونار با هدف ساختن فضایی حرفه‌ای، پایدار و هیجان‌انگیز برای بازیکنان ماینکرافت ایران راه افتاده است. با
            گیم‌مودهای متنوع، پشتیبانی فارسی و به‌روزرسانی مداوم، مدار ماه را برای شما روشن نگه می‌داریم. لونار فقط یک
            سرور نیست؛ جامعه‌ای از بازیکن‌هایی است که شب را روی دهانه‌ها می‌گذرانند.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { n: "۶", l: "گیم‌مود" },
              { n: "۲۴/۷", l: "آپ‌تایم" },
              { n: "۵۰۰", l: "ظرفیت اسلات" },
            ].map((s) => (
              <div key={s.l} className="rounded-md bg-raised px-2 py-4">
                <p className="font-sahel text-2xl font-black text-primary">{s.n}</p>
                <p className="text-xs text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const icons = [Shield, Sparkles, Zap, Swords, Shield, Sparkles];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="en-mark text-xs text-primary">WHY LUNAR</p>
      <h2 className="mt-2 text-3xl">چه چیزی ما را خاص می‌کند؟</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = icons[i] ?? Shield;
          return (
            <article key={f.title} className="lunar-card p-6">
              <Icon className="size-5 text-primary" />
              <h3 className="mt-4 text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function BlogPreview({ posts }: { posts: Post[] }) {
  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="en-mark text-xs text-primary">LOG</p>
            <h2 className="mt-2 text-3xl">بلاگ و اخبار مدار</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/blog">همه نوشته‌ها</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="lunar-card overflow-hidden">
              {post.cover ? (
                <img src={post.cover} alt="" className="aspect-video w-full object-cover" />
              ) : null}
              <div className="p-5">
                <p className="text-xs text-primary">{post.category}</p>
                <h3 className="mt-2 text-lg">{post.title}</h3>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Staff() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="en-mark text-xs text-primary">STAFF</p>
      <h2 className="mt-2 text-3xl">تیم پشتیبانی لونار</h2>
      <p className="mt-3 max-w-2xl text-muted">
        تیم پشتیبانی لونار همراه شماست و سعی می‌کند در اولین فرصت به سؤال‌ها پاسخ بدهد.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAFF.map((s) => (
          <article key={s.name} className="lunar-card p-6 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-raised font-sahel text-2xl font-black text-primary">
              {s.initial}
            </div>
            <h3 className="mt-4 text-lg">{s.name}</h3>
            <p className="text-sm text-muted">{s.role}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link to="/support">ارسال تیکت</Link>
        </Button>
      </div>
    </section>
  );
}

function copyIp() {
  return navigator.clipboard.writeText(SERVER_IP).then(
    () => toast.success("آی‌پی سرور کپی شد"),
    () => toast.error("کپی نشد"),
  );
}

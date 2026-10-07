-- LUNAR app schema: ranks, profiles, orders, tickets, blog

create table if not exists ranks (
  id text primary key,
  name_fa text not null,
  name_en text not null,
  tagline text not null,
  price_toman integer not null,
  duration_days integer not null default 30,
  sort_order integer not null,
  popular boolean not null default false,
  perks text not null
);

create table if not exists profiles (
  user_id text primary key,
  mc_username text not null,
  rank_id text,
  rank_expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id serial primary key,
  user_id text not null,
  rank_id text not null,
  amount_toman integer not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);

create table if not exists tickets (
  id serial primary key,
  user_id text not null,
  subject text not null,
  category text not null,
  status text not null default 'open',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists tickets_user_id_idx on tickets (user_id);

create table if not exists ticket_messages (
  id serial primary key,
  ticket_id integer not null,
  user_id text not null,
  body text not null,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists ticket_messages_ticket_id_idx on ticket_messages (ticket_id);

create table if not exists posts (
  slug text primary key,
  title text not null,
  excerpt text not null,
  body text not null,
  cover text,
  category text not null,
  published_at timestamptz not null default now()
);

insert into ranks (id, name_fa, name_en, tagline, price_toman, duration_days, sort_order, popular, perks)
values
  ('helal', 'هلال', 'HELAL', 'شروع مسیر ماه', 49000, 30, 1, false,
   '["پیشوند [هلال] در چت","۳ خانه (/sethome)","کیت هلال هر ۲۴ ساعت","دسترسی به /hat","۵ اسلات انداچست"]'),
  ('rob', 'ربع', 'ROB', 'نور بیشتر، قدرت بیشتر', 99000, 30, 2, false,
   '["همه امکانات هلال","پیشوند [ربع] رنگی","۶ خانه","کیت ربع هر ۱۲ ساعت","/fly در لابی و بقا","رنگ‌بندی چت","۱۰ اسلات انداچست"]'),
  ('badr', 'بدر', 'BADR', 'ماه کامل — انتخاب اکثر بازیکن‌ها', 179000, 30, 3, true,
   '["همه امکانات ربع","پیشوند [بدر] طلایی","۱۰ خانه","کیت بدر هر ۸ ساعت","فلای در همه گیم‌مودها","نیک‌نیم رنگی","پت ماه","ورود به ایونت‌های VIP"]'),
  ('super', 'سوپرنون', 'SUPERMOON', 'نزدیک‌ترین فاصله تا ماه', 279000, 30, 4, false,
   '["همه امکانات بدر","پیشوند [سوپرنون]","۱۵ خانه","کیت سوپرنون هر ۶ ساعت","دبل XP ایونت","کرییت ذرات ماه","اولویت ورود هنگام فول بودن سرور","دسترسی زودهنگام به بتل‌پس"]'),
  ('lunarplus', 'لونار+', 'LUNAR+', 'تاج شبکه لونار', 449000, 30, 5, false,
   '["همه امکانات سوپرنون","پیشوند اختصاصی [LUNAR+]","خانه نامحدود","کیت لونار هر ۳ ساعت","فلای دائمی","ساخت جزیره خصوصی","همراهی مستقیم با استاف","رنگ چت اختصاصی طلایی","باکس ماهانه آیتم نادر"]')
on conflict (id) do nothing;

insert into posts (slug, title, excerpt, body, cover, category, published_at)
values
  ('season-3-eclipse', 'فصل سوم: ماه‌گرفتگی آغاز شد',
   'بتل‌پس فصل سوم با ۳۰ مرحله، آیتم‌های انحصاری هلال و ایونت ماه‌گرفتگی جمعه شب.',
   E'فصل سوم لونار با عنوان «ماه‌گرفتگی» از امروز روی همه گیم‌مودها فعال است.\n\nبتل‌پس این فصل ۳۰ مرحله دارد و دو مسیر آزاد و طلایی. مسیر طلایی با رنک بدر به بالا به‌صورت خودکار آنلاک می‌شود.\n\nایونت ماه‌گرفتگی هر جمعه ساعت ۲۱ به وقت ایران در آرنا برگزار می‌شود: دبل دراپ، باس ماه و صندوق‌های نادر.\n\nاگر رنک فعال دارید، کیت فصل را با دستور /kit eclipse بگیرید.',
   '/images/shop-banner.jpg', 'ایونت', now() - interval '2 days'),
  ('anti-cheat-update', 'آپدیت ضدقچ و پایداری پینگ ایران',
   'موتور آنتی‌چیت لونار بازنویسی شد؛ کاهش فالس‌بن و بهینه‌سازی برای پینگ داخلی.',
   E'نسخه ۴ آنتی‌چیت لونار روی بقای ماه، آرنا و مون‌وارز دیپلوی شد.\n\nتمرکز این آپدیت روی کاهش فالس‌بن برای بازیکن‌های با پینگ بالای ۶۰ و تشخیص دقیق‌تر کیلاورا و فلای است.\n\nاگر بن اشتباه گرفتید از پنل کاربری تیکت «اعتراض به محرومیت» باز کنید. بررسی معمولاً زیر دو ساعت انجام می‌شود.',
   '/images/mode-arena.jpg', 'آپدیت', now() - interval '6 days'),
  ('economy-rebalance', 'بازنشانی اقتصاد بقا؛ قیمت‌ها واقعی‌تر شد',
   'بازار بازمانده‌ها بازطراحی شد تا فارم بی‌نهایت ارزش سکه را خراب نکند.',
   E'اقتصاد بقای ماه از این هفته با نرخ جدید فروشگاه ادمین و سقف روزانه فروش کار می‌کند.\n\nآیتم‌های فارم‌پذیر مثل نی‌شکر و بامبو سقف فروش دارند. معدن‌های نادر بدون سقف باقی ماندند.\n\nسکه فعلی شما صفر نمی‌شود. فقط نرخ خرید/فروش تغییر کرده است.',
   '/images/mode-survival.jpg', 'اقتصاد', now() - interval '12 days'),
  ('launcher-2', 'لونار لانچر ۲؛ ورود یک‌کلیکه به سرور',
   'نسخه جدید لانچر برای ویندوز، اندروید و لینوکس با آپدیت خودکار از CDN.',
   E'لونار لانچر ۲ با رابط تیره، انتخاب نسخه و اتصال یک‌کلیکه منتشر شد.\n\nدیگر لازم نیست آی‌پی را دستی وارد کنید. بعد از نصب، دکمه «ورود به لونار» شما را مستقیم به play.lunar.ir می‌برد.\n\nنسخه سبک برای سیستم‌های ضعیف هم در صفحه لانچر قرار گرفته است.',
   '/images/launcher.jpg', 'لانچر', now() - interval '18 days')
on conflict (slug) do nothing;

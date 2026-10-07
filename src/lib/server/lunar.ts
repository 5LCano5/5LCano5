import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { SERVER_IP } from "@/lib/utils";

export type Rank = {
  id: string;
  nameFa: string;
  nameEn: string;
  tagline: string;
  priceToman: number;
  durationDays: number;
  sortOrder: number;
  popular: boolean;
  perks: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover: string | null;
  category: string;
  publishedAt: string;
};

export type Order = {
  id: number;
  rankId: string;
  rankName: string;
  amountToman: number;
  status: string;
  createdAt: string;
};

export type Ticket = {
  id: number;
  subject: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TicketMessage = {
  id: number;
  body: string;
  isStaff: boolean;
  createdAt: string;
};

export type PanelData = {
  mcUsername: string;
  rank: Rank | null;
  rankExpiresAt: string | null;
  createdAt: string;
  orders: Order[];
  tickets: Ticket[];
};

type RankRow = {
  id: string;
  name_fa: string;
  name_en: string;
  tagline: string;
  price_toman: number;
  duration_days: number;
  sort_order: number;
  popular: boolean;
  perks: string;
};

function mapRank(row: RankRow): Rank {
  let perks: string[] = [];
  try {
    const parsed = JSON.parse(row.perks) as unknown;
    if (Array.isArray(parsed)) perks = parsed.filter((x) => typeof x === "string");
  } catch {
    perks = [];
  }
  return {
    id: row.id,
    nameFa: row.name_fa,
    nameEn: row.name_en,
    tagline: row.tagline,
    priceToman: Number(row.price_toman),
    durationDays: Number(row.duration_days),
    sortOrder: Number(row.sort_order),
    popular: Boolean(row.popular),
    perks,
  };
}

async function ranksById(sql: Awaited<ReturnType<typeof getSql>>) {
  const rows = await sql<RankRow>`select * from ranks order by sort_order`;
  return rows.map(mapRank);
}

export const listRanks = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  return ranksById(sql);
});

export const getServerStatus = createServerFn({ method: "GET" }).handler(async () => {
  const hour = new Date().getUTCHours();
  const online = 92 + (hour % 10) * 11 + Math.floor((Date.now() / 60000) % 19);
  return { online, max: 500, ip: SERVER_IP };
});

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    cover: string | null;
    category: string;
    published_at: string;
  }>`select slug, title, excerpt, body, cover, category, published_at::text as published_at from posts order by published_at desc`;
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    body: r.body,
    cover: r.cover,
    category: r.category,
    publishedAt: r.published_at,
  })) satisfies Post[];
});

export const getPost = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const sql = await getSql();
    const rows = await sql<{
      slug: string;
      title: string;
      excerpt: string;
      body: string;
      cover: string | null;
      category: string;
      published_at: string;
    }>`select slug, title, excerpt, body, cover, category, published_at::text as published_at from posts where slug = ${slug} limit 1`;
    const r = rows[0];
    if (!r) return null;
    return {
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      body: r.body,
      cover: r.cover,
      category: r.category,
      publishedAt: r.published_at,
    } satisfies Post;
  });

async function ensureProfileRow(
  sql: Awaited<ReturnType<typeof getSql>>,
  userId: string,
  fallbackName: string,
) {
  const existing = await sql<{
    user_id: string;
    mc_username: string;
    rank_id: string | null;
    rank_expires_at: string | null;
    created_at: string;
  }>`select user_id, mc_username, rank_id, rank_expires_at::text as rank_expires_at, created_at::text as created_at from profiles where user_id = ${userId} limit 1`;
  if (existing[0]) return existing[0];
  const username = fallbackName.replace(/\s+/g, "_").slice(0, 16) || `lunar_${userId.slice(0, 6)}`;
  await sql`insert into profiles (user_id, mc_username) values (${userId}, ${username})`;
  const created = await sql<{
    user_id: string;
    mc_username: string;
    rank_id: string | null;
    rank_expires_at: string | null;
    created_at: string;
  }>`select user_id, mc_username, rank_id, rank_expires_at::text as rank_expires_at, created_at::text as created_at from profiles where user_id = ${userId} limit 1`;
  return created[0];
}

export const getMyPanel = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const profile = await ensureProfileRow(sql, context.userId, "player");
    const ranks = await ranksById(sql);
    const rank = profile?.rank_id ? ranks.find((r) => r.id === profile.rank_id) ?? null : null;
    const orderRows = await sql<{
      id: number;
      rank_id: string;
      amount_toman: number;
      status: string;
      created_at: string;
      name_fa: string;
    }>`select o.id, o.rank_id, o.amount_toman, o.status, o.created_at::text as created_at, r.name_fa
       from orders o join ranks r on r.id = o.rank_id
       where o.user_id = ${context.userId} order by o.id desc`;
    const ticketRows = await sql<{
      id: number;
      subject: string;
      category: string;
      status: string;
      created_at: string;
      updated_at: string;
    }>`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
       from tickets where user_id = ${context.userId} order by id desc`;
    return {
      mcUsername: profile?.mc_username ?? "player",
      rank,
      rankExpiresAt: profile?.rank_expires_at ?? null,
      createdAt: profile?.created_at ?? "",
      orders: orderRows.map((o) => ({
        id: Number(o.id),
        rankId: o.rank_id,
        rankName: o.name_fa,
        amountToman: Number(o.amount_toman),
        status: o.status,
        createdAt: o.created_at,
      })),
      tickets: ticketRows.map((t) => ({
        id: Number(t.id),
        subject: t.subject,
        category: t.category,
        status: t.status,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
      })),
    } satisfies PanelData;
  });

export const updateMcUsername = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((mcUsername: string) => mcUsername.trim())
  .handler(async ({ context, data: mcUsername }) => {
    if (mcUsername.length < 3 || mcUsername.length > 16) {
      throw new Error("نام کاربری ماینکرافت باید ۳ تا ۱۶ کاراکتر باشد.");
    }
    if (!/^[A-Za-z0-9_]+$/.test(mcUsername)) {
      throw new Error("فقط حروف انگلیسی، عدد و زیرخط.");
    }
    const sql = await getSql();
    await ensureProfileRow(sql, context.userId, mcUsername);
    await sql`update profiles set mc_username = ${mcUsername} where user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const createOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((rankId: string) => rankId)
  .handler(async ({ context, data: rankId }) => {
    const sql = await getSql();
    const ranks = await ranksById(sql);
    const rank = ranks.find((r) => r.id === rankId);
    if (!rank) throw new Error("رنک پیدا نشد.");
    const profile = await ensureProfileRow(sql, context.userId, "player");
    if (profile?.rank_id) {
      const current = ranks.find((r) => r.id === profile.rank_id);
      if (current && current.sortOrder > rank.sortOrder) {
        throw new Error("رنک فعلی شما بالاتر است. فقط می‌توانید ارتقا بدهید.");
      }
    }
    const inserted = await sql<{ id: number }>`
      insert into orders (user_id, rank_id, amount_toman, status)
      values (${context.userId}, ${rank.id}, ${rank.priceToman}, 'pending')
      returning id`;
    const id = Number(inserted[0]?.id);
    return { orderId: id, rank, amountToman: rank.priceToman };
  });

export const getOrder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((orderId: number) => orderId)
  .handler(async ({ context, data: orderId }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      rank_id: string;
      amount_toman: number;
      status: string;
      created_at: string;
      name_fa: string;
      name_en: string;
    }>`select o.id, o.rank_id, o.amount_toman, o.status, o.created_at::text as created_at, r.name_fa, r.name_en
       from orders o join ranks r on r.id = o.rank_id
       where o.id = ${orderId} and o.user_id = ${context.userId} limit 1`;
    const o = rows[0];
    if (!o) return null;
    return {
      id: Number(o.id),
      rankId: o.rank_id,
      rankName: o.name_fa,
      rankEn: o.name_en,
      amountToman: Number(o.amount_toman),
      status: o.status,
      createdAt: o.created_at,
    };
  });

export const payOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((orderId: number) => orderId)
  .handler(async ({ context, data: orderId }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      rank_id: string;
      status: string;
      duration_days: number;
    }>`select o.id, o.rank_id, o.status, r.duration_days
       from orders o join ranks r on r.id = o.rank_id
       where o.id = ${orderId} and o.user_id = ${context.userId} limit 1`;
    const order = rows[0];
    if (!order) throw new Error("سفارش پیدا نشد.");
    if (order.status === "paid") return { ok: true as const, already: true };
    await sql`update orders set status = 'paid' where id = ${orderId} and user_id = ${context.userId}`;
    await ensureProfileRow(sql, context.userId, "player");
    await sql.query(
      "update profiles set rank_id = $1, rank_expires_at = now() + ($2 * interval '1 day') where user_id = $3",
      [order.rank_id, Number(order.duration_days), context.userId],
    );
    return { ok: true as const, already: false };
  });

export const createTicket = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { subject: string; category: string; body: string }) => ({
    subject: input.subject.trim(),
    category: input.category.trim(),
    body: input.body.trim(),
  }))
  .handler(async ({ context, data }) => {
    if (data.subject.length < 4) throw new Error("موضوع خیلی کوتاه است.");
    if (data.body.length < 8) throw new Error("متن پیام را کامل‌تر بنویسید.");
    const sql = await getSql();
    const inserted = await sql<{ id: number }>`
      insert into tickets (user_id, subject, category, status)
      values (${context.userId}, ${data.subject}, ${data.category}, 'open')
      returning id`;
    const id = Number(inserted[0]?.id);
    await sql`insert into ticket_messages (ticket_id, user_id, body, is_staff)
      values (${id}, ${context.userId}, ${data.body}, false)`;
    await sql`insert into ticket_messages (ticket_id, user_id, body, is_staff)
      values (${id}, ${context.userId}, ${"تیکت شما در مدار پشتیبانی لونار ثبت شد. یک گیم‌مستر به‌زودی پاسخ می‌دهد. تا آن زمان آی‌پی، نام کاربری و شماره سفارش را اگر مرتبط است همین‌جا بفرستید."}, true)`;
    return { ticketId: id };
  });

export const listMyTickets = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      subject: string;
      category: string;
      status: string;
      created_at: string;
      updated_at: string;
    }>`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
       from tickets where user_id = ${context.userId} order by id desc`;
    return rows.map((t) => ({
      id: Number(t.id),
      subject: t.subject,
      category: t.category,
      status: t.status,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
    })) satisfies Ticket[];
  });

export const getTicketThread = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((ticketId: number) => ticketId)
  .handler(async ({ context, data: ticketId }) => {
    const sql = await getSql();
    const tickets = await sql<{
      id: number;
      subject: string;
      category: string;
      status: string;
      created_at: string;
      updated_at: string;
    }>`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
       from tickets where id = ${ticketId} and user_id = ${context.userId} limit 1`;
    const ticket = tickets[0];
    if (!ticket) return null;
    const messages = await sql<{
      id: number;
      body: string;
      is_staff: boolean;
      created_at: string;
    }>`select id, body, is_staff, created_at::text as created_at from ticket_messages
       where ticket_id = ${ticketId} order by id`;
    return {
      ticket: {
        id: Number(ticket.id),
        subject: ticket.subject,
        category: ticket.category,
        status: ticket.status,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
      } satisfies Ticket,
      messages: messages.map((m) => ({
        id: Number(m.id),
        body: m.body,
        isStaff: Boolean(m.is_staff),
        createdAt: m.created_at,
      })) satisfies TicketMessage[],
    };
  });

export const replyTicket = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { ticketId: number; body: string }) => ({
    ticketId: input.ticketId,
    body: input.body.trim(),
  }))
  .handler(async ({ context, data }) => {
    if (data.body.length < 2) throw new Error("پیام خالی است.");
    const sql = await getSql();
    const owned = await sql<{ id: number }>`select id from tickets where id = ${data.ticketId} and user_id = ${context.userId} limit 1`;
    if (!owned[0]) throw new Error("تیکت پیدا نشد.");
    await sql`insert into ticket_messages (ticket_id, user_id, body, is_staff)
      values (${data.ticketId}, ${context.userId}, ${data.body}, false)`;
    await sql`update tickets set status = 'open', updated_at = now() where id = ${data.ticketId} and user_id = ${context.userId}`;
    return { ok: true as const };
  });

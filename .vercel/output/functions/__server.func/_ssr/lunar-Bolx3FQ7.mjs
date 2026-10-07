import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { n as authMiddleware, s as getSql, t as SERVER_IP } from "./utils-yz82pC2_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lunar-Bolx3FQ7.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function mapRank(row) {
	let perks = [];
	try {
		const parsed = JSON.parse(row.perks);
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
		perks
	};
}
async function ranksById(sql) {
	return (await sql`select * from ranks order by sort_order`).map(mapRank);
}
var listRanks_createServerFn_handler = createServerRpc({
	id: "2a174f6dab2be4da1a7abcee270c8dc9ecabfaf5df617cccb2e51ff0256bc98d",
	name: "listRanks",
	filename: "src/lib/server/lunar.ts"
}, (opts) => listRanks.__executeServer(opts));
var listRanks = createServerFn({ method: "GET" }).handler(listRanks_createServerFn_handler, async () => {
	return ranksById(await getSql());
});
var getServerStatus_createServerFn_handler = createServerRpc({
	id: "ba49f60c66f2dfbcc4f56406e7315cdbb129e5bd14906f2ff1ef5d42abd6a410",
	name: "getServerStatus",
	filename: "src/lib/server/lunar.ts"
}, (opts) => getServerStatus.__executeServer(opts));
var getServerStatus = createServerFn({ method: "GET" }).handler(getServerStatus_createServerFn_handler, async () => {
	return {
		online: 92 + (/* @__PURE__ */ new Date()).getUTCHours() % 10 * 11 + Math.floor(Date.now() / 6e4 % 19),
		max: 500,
		ip: SERVER_IP
	};
});
var listPosts_createServerFn_handler = createServerRpc({
	id: "ec5a43af626c866e558b24af4a4cbceccec9bd77b61ceab3ca81e6f39c939e76",
	name: "listPosts",
	filename: "src/lib/server/lunar.ts"
}, (opts) => listPosts.__executeServer(opts));
var listPosts = createServerFn({ method: "GET" }).handler(listPosts_createServerFn_handler, async () => {
	return (await (await getSql())`select slug, title, excerpt, body, cover, category, published_at::text as published_at from posts order by published_at desc`).map((r) => ({
		slug: r.slug,
		title: r.title,
		excerpt: r.excerpt,
		body: r.body,
		cover: r.cover,
		category: r.category,
		publishedAt: r.published_at
	}));
});
var getPost_createServerFn_handler = createServerRpc({
	id: "fb99997787cbac477f33986b045ffae1dde475552318d33a24a17405bb1a2e7e",
	name: "getPost",
	filename: "src/lib/server/lunar.ts"
}, (opts) => getPost.__executeServer(opts));
var getPost = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getPost_createServerFn_handler, async ({ data: slug }) => {
	const r = (await (await getSql())`select slug, title, excerpt, body, cover, category, published_at::text as published_at from posts where slug = ${slug} limit 1`)[0];
	if (!r) return null;
	return {
		slug: r.slug,
		title: r.title,
		excerpt: r.excerpt,
		body: r.body,
		cover: r.cover,
		category: r.category,
		publishedAt: r.published_at
	};
});
async function ensureProfileRow(sql, userId, fallbackName) {
	const existing = await sql`select user_id, mc_username, rank_id, rank_expires_at::text as rank_expires_at, created_at::text as created_at from profiles where user_id = ${userId} limit 1`;
	if (existing[0]) return existing[0];
	await sql`insert into profiles (user_id, mc_username) values (${userId}, ${fallbackName.replace(/\s+/g, "_").slice(0, 16) || `lunar_${userId.slice(0, 6)}`})`;
	return (await sql`select user_id, mc_username, rank_id, rank_expires_at::text as rank_expires_at, created_at::text as created_at from profiles where user_id = ${userId} limit 1`)[0];
}
var getMyPanel_createServerFn_handler = createServerRpc({
	id: "70f46fdc729f53af9a6f1d2b54dbabf38c95ab0377f9fa78720a4d4c043f57c4",
	name: "getMyPanel",
	filename: "src/lib/server/lunar.ts"
}, (opts) => getMyPanel.__executeServer(opts));
var getMyPanel = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyPanel_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const profile = await ensureProfileRow(sql, context.userId, "player");
	const ranks = await ranksById(sql);
	const rank = profile?.rank_id ? ranks.find((r) => r.id === profile.rank_id) ?? null : null;
	const orderRows = await sql`select o.id, o.rank_id, o.amount_toman, o.status, o.created_at::text as created_at, r.name_fa
       from orders o join ranks r on r.id = o.rank_id
       where o.user_id = ${context.userId} order by o.id desc`;
	const ticketRows = await sql`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
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
			createdAt: o.created_at
		})),
		tickets: ticketRows.map((t) => ({
			id: Number(t.id),
			subject: t.subject,
			category: t.category,
			status: t.status,
			createdAt: t.created_at,
			updatedAt: t.updated_at
		}))
	};
});
var updateMcUsername_createServerFn_handler = createServerRpc({
	id: "8117f437b76ff9d708b9bba404639c502ab852467511b7538f82093835bb28a0",
	name: "updateMcUsername",
	filename: "src/lib/server/lunar.ts"
}, (opts) => updateMcUsername.__executeServer(opts));
var updateMcUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((mcUsername) => mcUsername.trim()).handler(updateMcUsername_createServerFn_handler, async ({ context, data: mcUsername }) => {
	if (mcUsername.length < 3 || mcUsername.length > 16) throw new Error("نام کاربری ماینکرافت باید ۳ تا ۱۶ کاراکتر باشد.");
	if (!/^[A-Za-z0-9_]+$/.test(mcUsername)) throw new Error("فقط حروف انگلیسی، عدد و زیرخط.");
	const sql = await getSql();
	await ensureProfileRow(sql, context.userId, mcUsername);
	await sql`update profiles set mc_username = ${mcUsername} where user_id = ${context.userId}`;
	return { ok: true };
});
var createOrder_createServerFn_handler = createServerRpc({
	id: "a9531b43d073345525429d37211736bd5cb7481c541a6c9b51a197c6104e6d89",
	name: "createOrder",
	filename: "src/lib/server/lunar.ts"
}, (opts) => createOrder.__executeServer(opts));
var createOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((rankId) => rankId).handler(createOrder_createServerFn_handler, async ({ context, data: rankId }) => {
	const sql = await getSql();
	const ranks = await ranksById(sql);
	const rank = ranks.find((r) => r.id === rankId);
	if (!rank) throw new Error("رنک پیدا نشد.");
	const profile = await ensureProfileRow(sql, context.userId, "player");
	if (profile?.rank_id) {
		const current = ranks.find((r) => r.id === profile.rank_id);
		if (current && current.sortOrder > rank.sortOrder) throw new Error("رنک فعلی شما بالاتر است. فقط می‌توانید ارتقا بدهید.");
	}
	const inserted = await sql`
      insert into orders (user_id, rank_id, amount_toman, status)
      values (${context.userId}, ${rank.id}, ${rank.priceToman}, 'pending')
      returning id`;
	return {
		orderId: Number(inserted[0]?.id),
		rank,
		amountToman: rank.priceToman
	};
});
var getOrder_createServerFn_handler = createServerRpc({
	id: "d7cd2276ecaa6b8ed508d04142ebb067242626a91f740e3f3c021b095bc1a2be",
	name: "getOrder",
	filename: "src/lib/server/lunar.ts"
}, (opts) => getOrder.__executeServer(opts));
var getOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((orderId) => orderId).handler(getOrder_createServerFn_handler, async ({ context, data: orderId }) => {
	const o = (await (await getSql())`select o.id, o.rank_id, o.amount_toman, o.status, o.created_at::text as created_at, r.name_fa, r.name_en
       from orders o join ranks r on r.id = o.rank_id
       where o.id = ${orderId} and o.user_id = ${context.userId} limit 1`)[0];
	if (!o) return null;
	return {
		id: Number(o.id),
		rankId: o.rank_id,
		rankName: o.name_fa,
		rankEn: o.name_en,
		amountToman: Number(o.amount_toman),
		status: o.status,
		createdAt: o.created_at
	};
});
var payOrder_createServerFn_handler = createServerRpc({
	id: "0810fc13bf389f710b4fc7331f773832379e16b1d602232213408666847c6bf9",
	name: "payOrder",
	filename: "src/lib/server/lunar.ts"
}, (opts) => payOrder.__executeServer(opts));
var payOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((orderId) => orderId).handler(payOrder_createServerFn_handler, async ({ context, data: orderId }) => {
	const sql = await getSql();
	const order = (await sql`select o.id, o.rank_id, o.status, r.duration_days
       from orders o join ranks r on r.id = o.rank_id
       where o.id = ${orderId} and o.user_id = ${context.userId} limit 1`)[0];
	if (!order) throw new Error("سفارش پیدا نشد.");
	if (order.status === "paid") return {
		ok: true,
		already: true
	};
	await sql`update orders set status = 'paid' where id = ${orderId} and user_id = ${context.userId}`;
	await ensureProfileRow(sql, context.userId, "player");
	await sql.query("update profiles set rank_id = $1, rank_expires_at = now() + ($2 * interval '1 day') where user_id = $3", [
		order.rank_id,
		Number(order.duration_days),
		context.userId
	]);
	return {
		ok: true,
		already: false
	};
});
var createTicket_createServerFn_handler = createServerRpc({
	id: "5b19c55c972653bc7d6f6daf8447090c2f0459880992d893a6764930c57eaaa2",
	name: "createTicket",
	filename: "src/lib/server/lunar.ts"
}, (opts) => createTicket.__executeServer(opts));
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	subject: input.subject.trim(),
	category: input.category.trim(),
	body: input.body.trim()
})).handler(createTicket_createServerFn_handler, async ({ context, data }) => {
	if (data.subject.length < 4) throw new Error("موضوع خیلی کوتاه است.");
	if (data.body.length < 8) throw new Error("متن پیام را کامل‌تر بنویسید.");
	const sql = await getSql();
	const inserted = await sql`
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
var listMyTickets_createServerFn_handler = createServerRpc({
	id: "970d57b9f5184e5e9d952bf14dfa4a7bdf2efaf7bfe5176ea9169e4231917b3f",
	name: "listMyTickets",
	filename: "src/lib/server/lunar.ts"
}, (opts) => listMyTickets.__executeServer(opts));
var listMyTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyTickets_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
       from tickets where user_id = ${context.userId} order by id desc`).map((t) => ({
		id: Number(t.id),
		subject: t.subject,
		category: t.category,
		status: t.status,
		createdAt: t.created_at,
		updatedAt: t.updated_at
	}));
});
var getTicketThread_createServerFn_handler = createServerRpc({
	id: "6d5a33678ccf950b3aff9789dcc9398eb4e1fb58715973830113e8ca8d5c6fae",
	name: "getTicketThread",
	filename: "src/lib/server/lunar.ts"
}, (opts) => getTicketThread.__executeServer(opts));
var getTicketThread = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((ticketId) => ticketId).handler(getTicketThread_createServerFn_handler, async ({ context, data: ticketId }) => {
	const sql = await getSql();
	const ticket = (await sql`select id, subject, category, status, created_at::text as created_at, updated_at::text as updated_at
       from tickets where id = ${ticketId} and user_id = ${context.userId} limit 1`)[0];
	if (!ticket) return null;
	const messages = await sql`select id, body, is_staff, created_at::text as created_at from ticket_messages
       where ticket_id = ${ticketId} order by id`;
	return {
		ticket: {
			id: Number(ticket.id),
			subject: ticket.subject,
			category: ticket.category,
			status: ticket.status,
			createdAt: ticket.created_at,
			updatedAt: ticket.updated_at
		},
		messages: messages.map((m) => ({
			id: Number(m.id),
			body: m.body,
			isStaff: Boolean(m.is_staff),
			createdAt: m.created_at
		}))
	};
});
var replyTicket_createServerFn_handler = createServerRpc({
	id: "c3987894f71c76a92d41409af75a761260a0b274186098b67b298b0b68dbb45f",
	name: "replyTicket",
	filename: "src/lib/server/lunar.ts"
}, (opts) => replyTicket.__executeServer(opts));
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	ticketId: input.ticketId,
	body: input.body.trim()
})).handler(replyTicket_createServerFn_handler, async ({ context, data }) => {
	if (data.body.length < 2) throw new Error("پیام خالی است.");
	const sql = await getSql();
	if (!(await sql`select id from tickets where id = ${data.ticketId} and user_id = ${context.userId} limit 1`)[0]) throw new Error("تیکت پیدا نشد.");
	await sql`insert into ticket_messages (ticket_id, user_id, body, is_staff)
      values (${data.ticketId}, ${context.userId}, ${data.body}, false)`;
	await sql`update tickets set status = 'open', updated_at = now() where id = ${data.ticketId} and user_id = ${context.userId}`;
	return { ok: true };
});
//#endregion
export { createOrder_createServerFn_handler, createTicket_createServerFn_handler, getMyPanel_createServerFn_handler, getOrder_createServerFn_handler, getPost_createServerFn_handler, getServerStatus_createServerFn_handler, getTicketThread_createServerFn_handler, listMyTickets_createServerFn_handler, listPosts_createServerFn_handler, listRanks_createServerFn_handler, payOrder_createServerFn_handler, replyTicket_createServerFn_handler, updateMcUsername_createServerFn_handler };

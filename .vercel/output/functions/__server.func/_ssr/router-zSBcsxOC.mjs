import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { Z as notFound, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, m as useRouterState, p as HeadContent, v as lazyRouteComponent, w as require_jsx_runtime, x as Link, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { c as toFaDigits, n as authMiddleware, r as cn, t as SERVER_IP } from "./utils-yz82pC2_.mjs";
import { n as auth } from "./server-DyPznFr8.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as authClient } from "./client-1vAx-gM_.mjs";
import { n as X, r as TriangleAlert, s as Menu, u as Copy } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lunar-D560uqxV.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[box-shadow,background-color,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4 text-sm", {
	variants: { variant: {
		primary: "bg-primary text-primary-fg hover:bg-primary/90",
		outline: "text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] bg-surface/60",
		ghost: "text-fg hover:bg-raised",
		moon: "bg-moon text-bg hover:bg-moon/90",
		danger: "bg-danger text-fg hover:bg-danger/90"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listRanks = createServerFn({ method: "GET" }).handler(createSsrRpc("2a174f6dab2be4da1a7abcee270c8dc9ecabfaf5df617cccb2e51ff0256bc98d"));
var getServerStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("ba49f60c66f2dfbcc4f56406e7315cdbb129e5bd14906f2ff1ef5d42abd6a410"));
var listPosts = createServerFn({ method: "GET" }).handler(createSsrRpc("ec5a43af626c866e558b24af4a4cbceccec9bd77b61ceab3ca81e6f39c939e76"));
var getPost = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("fb99997787cbac477f33986b045ffae1dde475552318d33a24a17405bb1a2e7e"));
var getMyPanel = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("70f46fdc729f53af9a6f1d2b54dbabf38c95ab0377f9fa78720a4d4c043f57c4"));
var updateMcUsername = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((mcUsername) => mcUsername.trim()).handler(createSsrRpc("8117f437b76ff9d708b9bba404639c502ab852467511b7538f82093835bb28a0"));
var createOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((rankId) => rankId).handler(createSsrRpc("a9531b43d073345525429d37211736bd5cb7481c541a6c9b51a197c6104e6d89"));
var getOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((orderId) => orderId).handler(createSsrRpc("d7cd2276ecaa6b8ed508d04142ebb067242626a91f740e3f3c021b095bc1a2be"));
var payOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((orderId) => orderId).handler(createSsrRpc("0810fc13bf389f710b4fc7331f773832379e16b1d602232213408666847c6bf9"));
var createTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	subject: input.subject.trim(),
	category: input.category.trim(),
	body: input.body.trim()
})).handler(createSsrRpc("5b19c55c972653bc7d6f6daf8447090c2f0459880992d893a6764930c57eaaa2"));
var listMyTickets = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("970d57b9f5184e5e9d952bf14dfa4a7bdf2efaf7bfe5176ea9169e4231917b3f"));
var getTicketThread = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((ticketId) => ticketId).handler(createSsrRpc("6d5a33678ccf950b3aff9789dcc9398eb4e1fb58715973830113e8ca8d5c6fae"));
var replyTicket = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	ticketId: input.ticketId,
	body: input.body.trim()
})).handler(createSsrRpc("c3987894f71c76a92d41409af75a761260a0b274186098b67b298b0b68dbb45f"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-BYyFvsCd.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/content-CqG-c7YQ.js
var NAV = [
	{
		to: "/",
		label: "خانه",
		exact: true
	},
	{
		to: "/shop",
		label: "فروشگاه"
	},
	{
		to: "/modes",
		label: "گیم‌مودها"
	},
	{
		to: "/rules",
		label: "قوانین"
	},
	{
		to: "/blog",
		label: "بلاگ"
	},
	{
		to: "/support",
		label: "پشتیبانی"
	},
	{
		to: "/launcher",
		label: "لانچر"
	}
];
var JOIN_STEPS = [
	{
		n: "۰۱",
		title: "ورود به ماینکرفت",
		body: "اول برنامه ی TLauncher را باز کنید سپس بین ورژن های 1.8 تا 1.21.4 یک ورژن را نصب کنید (پیشنهادی : 1.20.6) سپس Enter The Game را بزنید و صبر کنید تا بازی اجرا شود"
	},
	{
		n: "۰۲",
		title: "ورود به سرور",
		body: "بعد از اجرای ماینکرافت، Multiplayer را باز کنید، Add Server بزنید و آی‌پی play.lunar.ir را وارد کنید. Join Server."
	},
	{
		n: "۰۳",
		title: "ساخت حساب داخل بازی",
		body: "اولین ورود با دستور /register رمز رمز. ورودهای بعدی /login رمز. نام کاربری همان اسکین شماست؛ رمز را فراموش نکنید."
	}
];
var MODES = [
	{
		id: "survival",
		title: " اسلایم فان / سروایول",
		en: "Slimefun",
		image: "/images/mode-survival.jpg",
		blurb: "اینجا باید بقا کنید و زنده بمانید، تیم جمع کنید و باهم به بازی کردن ادامه دهید",
		tags: [
			"اقتصاد",
			"بقا",
			"هیجانی"
		]
	},
	{
		id: "skyblock",
		title: "بزودی | اسکای‌ماین",
		en: "SkyMine",
		image: "/images/mode-skyblock.jpg",
		blurb: "اینجا باید با وسایله اولیه، از کیوب های مختلف منابع جمع کنید و وسایل خود را آپگرید کنید",
		tags: [
			"ماین",
			"جزیره",
			"کوآپ"
		]
	},
	{
		id: "moonwars",
		title: "بزودی | بدوارز",
		en: "BEDWARS",
		image: "/images/mode-moonwars.jpg",
		blurb: "باید تخت های حریف را بشکنید و آنها را بکشید",
		tags: [
			"استراتژی",
			"هیجانی",
			"پی‌وی‌پی"
		]
	},
	{
		id: "donut",
		title: "دونات اس‌ام‌پی",
		en: "DonutSMP",
		image: "/images/mode-donut.jpg",
		blurb: "در اینجا باید سروایول کنید، اما هیچ وقت در امان نیستید",
		tags: [
			"PvP",
			"بقا",
			"کپی‌رایت"
		]
	}
];
var FEATURES = [
	{
		title: "امنیت و ثبات",
		body: "آنتی‌چیت نسل ۴، بکاپ ساعتی و هسته اختصاصی. تقلب جایی در مدار ماه ندارد."
	},
	{
		title: "جامعه فعال",
		body: "ایونت هفتگی، بتل‌پس فصلی و پشتیبانی فارسی. لونار سرور نیست؛ مدار است."
	},
	{
		title: "پینگ ایران",
		body: "نود داخلی، بهینه‌شده برای پینگ پایین. نسخه محبوب ماینکرافت ساپورت می‌شود."
	},
	{
		title: "پلاگین اختصاصی",
		body: "اقتصاد، لند، کیت و ایونت را خودمان نوشتیم. کپی سرورهای خارجی نیست."
	},
	{
		title: "پشتیبانی ۲۴/۷",
		body: "تیکت داخل سایت، دیسکورد و استاف داخل بازی. اولین پاسخ معمولاً زیر یک ساعت."
	},
	{
		title: "فصل و سفارشی‌سازی",
		body: "هر فصل پوسته‌ها، کیت‌ها و مپ‌ها عوض می‌شود. نیک‌نیم، پت و ذرات ماه."
	}
];
var STAFF = [
	{
		name: "آرتمیس",
		role: "مدیریت شبکه",
		initial: "آ"
	},
	{
		name: "کاسینی",
		role: "سرپرست پشتیبانی",
		initial: "ک"
	},
	{
		name: "سلن",
		role: "گیم‌مستر",
		initial: "س"
	},
	{
		name: "هادلی",
		role: "آنتی‌چیت",
		initial: "ه"
	}
];
var RULE_SECTIONS = [
	{
		id: "general",
		title: "قوانین عمومی",
		items: [
			"ورود به سرور لونار سیتی، به‌معنای پذیرش کامل قوانین است و ابراز بی‌اطلاعی پذیرفته نخواهد شد",
			"هر بازیکن فقط می تواند با ۲ اکانت وارد سرور شود",
			"خرید و فروش با پول واقعی (IRL Trading) ممنوع است",
			"تبلیغ کردن ممنوع است",
			"احترام به استف و پلیر الزامی‌ست و استفاده از هرگونه از کلمات فحاشی، پیگرد دارد"
		]
	},
	{
		id: "chat",
		title: "چت و ارتباط",
		items: [
			"اسپم، کپ‌لاک بی‌رویه، تبلیغ سرور دیگر و لینک مشکوک ممنوع است.",
			"مباحث سیاسی، تفرقه و محتوای خلاف شئونات در چت عمومی مجاز نیست.",
			"احترام به بازیکن و استاف الزامی است. توهین، تهدید و آزار پیگرد دارد.",
			"زبان فارسی و فینگلیش در چت عمومی اولویت دارد؛ فحش فیلترشده هم شامل مجازات است.",
			"احترام به بازیکن و استاف الزامی است. توهین، تهدید و آزار پیگرد دارد."
		]
	},
	{
		id: "cheat",
		title: "تقلب و کلاینت",
		items: [
			"هر کلاینت، مود یا اسکریپتی که برتری ناعادلانه بدهد ممنوع است: کیلاورا، فلای، X-Ray، اتو‌تاور، ماکرو.",
			"بافت‌پک ریپ، فول‌برایت افراطی و ESP در حکم تقلب است.",
			"سوءاستفاده از باگ را فوراً به استاف گزارش دهید. سوءاستفاده غیرقانونی می‌باشد.",
			"اعتراض به بن فقط از تیکت پنل با مدرک."
		]
	},
	{
		id: "economy",
		title: "اقتصاد و ساخت",
		items: [
			"اسکمر، فریب در معامله و دزدی از منطقه بدون دسترسی = بازگردانی + محرومیت.",
			"فارم‌های لگ‌زا و ماشین‌های پرچانک بدون هماهنگی حذف می‌شوند.",
			"کلیم لند دیگران، تخریب و واترپلیس در مناطق عمومی ممنوع است.",
			"قیمت گذاری آزاد است؛ جهت تجربه ی بهتر قیمت ها باید عادلانه باشند "
		]
	},
	{
		id: "punish",
		title: "مجازات‌ها",
		items: [
			"انواع پانیشمنت ها: بن - آیپی‌بن بن دائمی - میوت - کیک - وارن(اخطار) - همه موارد بصورت موقت",
			"رنک خریداری‌شده مجوز قانون‌شکنی نیست و هنگام بن بازپرداخت نمی‌شود.",
			"توهین به استاف مجازات سنگین‌تری دارد.",
			"دور زدن بن با VPN یا اکانت جدید، بن آی‌پی و سخت‌افزار دارد."
		]
	}
];
var FAQS = [
	{
		q: "آی‌پی سرور چیست؟",
		a: "play.lunar.ir — از دکمه کپی بالای سایت استفاده کنید یا لونار لانچر را نصب کنید تا یک‌کلیکه وارد شوید."
	},
	{
		q: "رنک را چطور می‌گیرم؟",
		a: "وارد حساب سایت شوید، فروشگاه را باز کنید، رنک را بخرید و پرداخت را تکمیل کنید. رنک معمولاً زیر یک دقیقه روی نام‌تان فعال می‌شود. نام کاربری ماینکرافت را در پنل درست وارد کنید."
	},
	{
		q: "پرداخت انجام شد ولی رنک نیامد؟",
		a: "از پنل، بخش سفارش‌ها را چک کنید. اگر وضعیت «پرداخت‌شده» است و رنک نیست، تیکت دسته «فروشگاه» باز کنید و شماره سفارش را بفرستید."
	},
	{
		q: "رمز داخل بازی را فراموش کردم.",
		a: "تیکت «حساب بازی» باز کنید و مالکیت اسکین/ایمیل را ثابت کنید. استاف رمز را ریست می‌کند؛ رمز را در چت عمومی نفرستید."
	},
	{
		q: "کدام نسخه ماینکرافت؟",
		a: "پیشنهادی: ۱.۲۰ تا ۱.۲۱ از طریق لونار لانچر. نسخه‌های ۱.۱۶ به بالا هم وصل می‌شوند اما گیم‌پلی روی نسخه پیشنهادی بهتر است."
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-zSBcsxOC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "en-mark text-xs text-primary",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-3xl",
				children: "این مدار پیدا نشد"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "صفحه حذف شده یا آدرس اشتباه است."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "بازگشت به خانه"
				})
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
function PreviewHostBridge() {
	(0, import_react.useEffect)(() => installPreviewHostBridge(), []);
	return null;
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-28 animate-pulse rounded-md bg-raised" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/panel",
			children: "پنل کاربری"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "ghost",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				search: { next: "/panel" },
				children: "ورود"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				search: { next: "/panel" },
				children: "ثبت‌نام"
			})
		})]
	});
}
function copyIp() {
	navigator.clipboard.writeText(SERVER_IP).then(() => toast.success("آی‌پی سرور کپی شد"), () => toast.error("کپی نشد؛ دستی وارد کنید"));
}
function SiteShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [online, setOnline] = (0, import_react.useState)(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		getServerStatus().then((s) => setOnline(s.online)).catch(() => setOnline(214));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "starfield min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 border-b border-border bg-bg/90 px-4 py-2 text-xs text-muted backdrop-blur-md sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" }), online === null ? "…" : `${toFaDigits(online)} بازیکن آنلاین`]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: copyIp,
						className: "inline-flex min-h-8 items-center gap-1.5 rounded-sm px-2 text-fg hover:text-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "en-mark text-[10px] tracking-widest",
								children: SERVER_IP
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
							"کپی آی‌پی"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-border bg-bg/80 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/logo.svg",
									alt: "",
									className: "size-9 outline-none"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "leading-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en-mark block text-sm text-primary",
										children: "LUNAR"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sahel text-sm font-black",
										children: "لونار سیتی"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden items-center gap-1 lg:flex",
								children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									activeOptions: { exact: "exact" in item && item.exact },
									activeProps: { className: "text-primary" },
									className: "rounded-md px-3 py-2 text-sm text-muted hover:text-fg",
									children: item.label
								}, item.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-11 place-items-center rounded-md lg:hidden",
									onClick: () => setOpen((v) => !v),
									"aria-label": open ? "بستن منو" : "باز کردن منو",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})]
							})
						]
					}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border bg-surface px-4 py-4 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-col gap-1",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("min-h-11 rounded-md px-3 py-3 text-sm", pathname === item.to ? "bg-raised text-primary" : "text-fg"),
								children: item.label
							}, item.to))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
						})]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-20 border-t border-border bg-surface/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "md:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en-mark text-primary",
										children: "LUNAR"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-sahel text-xl font-black",
										children: "لونار سیتی، سرور ایران"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 max-w-md text-sm text-muted",
										children: "لونار سیتی، یک سرور ماینکرفتی عمومی است که جهت سرگرمی آنلاین ساخته شده"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: "دسترسی"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2 text-sm text-muted",
								children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									className: "hover:text-fg",
									children: item.label
								}) }, item.to))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold",
									children: "ورود"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "en-mark mt-3 text-xs text-primary",
									children: SERVER_IP
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "mt-3",
									onClick: copyIp,
									children: "کپی آی‌پی"
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "px-4 py-5 text-center text-xs text-muted",
						children: [
							"© ",
							toFaDigits((/* @__PURE__ */ new Date()).getFullYear()),
							" 2026 Lunar City ۰ All rights reserved."
						]
					})
				]
			})
		]
	});
}
function PageHero({ kicker, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-b border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-20 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-muted",
					children: subtitle
				})
			]
		})]
	});
}
var styles_default = "/assets/styles-D9AgTCq4.css";
var APP_NAME = "لونار سیتی";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#07090f"
			},
			{
				name: "description",
				content: "لونار، سرور ماینکرافت ایرانی با تم ماه. فروش رنک، پنل کاربری، گیم‌مودها، قوانین و پشتیبانی."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://cdn.jsdelivr.net/gh/rastikerdar/sahel-font@v3.4.0/dist/font-face.css"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				dir: "rtl",
				position: "bottom-left"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$11 = () => import("./routes-DpQTJ8-N.mjs");
var Route$12 = createFileRoute("/")({
	loader: async () => {
		const [ranks, posts, status] = await Promise.all([
			listRanks(),
			listPosts(),
			getServerStatus()
		]);
		return {
			ranks,
			posts,
			status
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./blog-Bt2Fz48T.mjs");
var Route$11 = createFileRoute("/blog")({
	loader: async () => ({ posts: await listPosts() }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./launcher-D0-P8Isq.mjs");
var Route$10 = createFileRoute("/launcher")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./login-DS9YQudS.mjs");
var Route$9 = createFileRoute("/login")({
	validateSearch: (s) => ({ next: typeof s.next === "string" && s.next.startsWith("/") ? s.next : "/panel" }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./modes-BZQOTO2u.mjs");
var Route$8 = createFileRoute("/modes")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./panel-C-0K766F.mjs");
var Route$7 = createFileRoute("/panel")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./rules-CRwm-G_1.mjs");
var Route$6 = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./shop-Ke52wLm9.mjs");
var Route$5 = createFileRoute("/shop")({
	loader: async () => ({ ranks: await listRanks() }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./support-CstxRCFv.mjs");
var Route$4 = createFileRoute("/support")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./blog_._slug-1Hagk13G.mjs");
var Route$3 = createFileRoute("/blog_/$slug")({
	loader: async ({ params }) => {
		const post = await getPost({ data: params.slug });
		if (!post) throw notFound();
		return { post };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./checkout._orderId-BsvyRYnR.mjs");
var Route$2 = createFileRoute("/checkout/$orderId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./support_._id-D02m_NoQ.mjs");
var Route$1 = createFileRoute("/support_/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$12.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$13
	}),
	BlogRoute: Route$11.update({
		id: "/blog",
		path: "/blog",
		getParentRoute: () => Route$13
	}),
	LauncherRoute: Route$10.update({
		id: "/launcher",
		path: "/launcher",
		getParentRoute: () => Route$13
	}),
	LoginRoute: Route$9.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$13
	}),
	ModesRoute: Route$8.update({
		id: "/modes",
		path: "/modes",
		getParentRoute: () => Route$13
	}),
	PanelRoute: Route$7.update({
		id: "/panel",
		path: "/panel",
		getParentRoute: () => Route$13
	}),
	RulesRoute: Route$6.update({
		id: "/rules",
		path: "/rules",
		getParentRoute: () => Route$13
	}),
	ShopRoute: Route$5.update({
		id: "/shop",
		path: "/shop",
		getParentRoute: () => Route$13
	}),
	SupportRoute: Route$4.update({
		id: "/support",
		path: "/support",
		getParentRoute: () => Route$13
	}),
	BlogSlugRoute: Route$3.update({
		id: "/blog_/$slug",
		path: "/blog/$slug",
		getParentRoute: () => Route$13
	}),
	CheckoutOrderIdRoute: Route$2.update({
		id: "/checkout/$orderId",
		path: "/checkout/$orderId",
		getParentRoute: () => Route$13
	}),
	SupportIdRoute: Route$1.update({
		id: "/support_/$id",
		path: "/support/$id",
		getParentRoute: () => Route$13
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$13
	})
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { getTicketThread as C, updateMcUsername as D, replyTicket as E, getOrder as S, payOrder as T, useCurrentUserState as _, Route$5 as a, createTicket as b, Route$12 as c, FEATURES as d, JOIN_STEPS as f, useCurrentUser as g, STAFF as h, Route$3 as i, PageHero as l, RULE_SECTIONS as m, Route$1 as n, Route$9 as o, MODES as p, Route$2 as r, Route$11 as s, router_exports as t, FAQS as u, Button as v, listMyTickets as w, getMyPanel as x, createOrder as y };

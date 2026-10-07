import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useNavigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatToman, c as toFaDigits } from "./utils-yz82pC2_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useCurrentUserState, a as Route$5, l as PageHero, v as Button, y as createOrder } from "./router-zSBcsxOC.mjs";
import { t as RankMoon } from "./rank-moon-mlM8HX61.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-Ke52wLm9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { ranks } = Route$5.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function buy(rank) {
		if (isPending) return;
		if (!user) {
			await navigate({
				to: "/login",
				search: { next: "/shop" }
			});
			return;
		}
		setBusy(rank.id);
		try {
			const res = await createOrder({ data: rank.id });
			await navigate({
				to: "/checkout/$orderId",
				params: { orderId: String(res.orderId) }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "خرید انجام نشد");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "SHOP",
			title: "فروشگاه رنک لونار",
			subtitle: "رنک‌ها ماهانه فعال می‌شوند، پیشوند چت و کیت همان لحظه بعد از پرداخت روی حساب ماینکرافت‌تان می‌نشیند. فقط ارتقا ممکن است؛ رنک پایین‌تر خریده نمی‌شود."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/shop-banner.jpg",
				alt: "",
				className: "h-40 w-full object-cover opacity-50 sm:h-56"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 lg:grid-cols-5 md:grid-cols-2",
				children: ranks.map((rank) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: `lunar-card flex flex-col p-5 ${rank.popular ? "ring-1 ring-primary/60" : ""}`,
					children: [
						rank.popular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-center text-xs text-primary",
							children: "پیشنهاد لونار"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mb-3 h-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMoon, {
							id: rank.id,
							className: "mx-auto h-10 w-12"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "en-mark mt-3 text-center text-[10px] text-primary",
							children: rank.nameEn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-center text-2xl",
							children: rank.nameFa
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-sm text-muted",
							children: rank.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-center text-xl text-primary",
							children: formatToman(rank.priceToman)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-xs text-muted",
							children: [toFaDigits(rank.durationDays), " روز"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex-1 space-y-2 text-sm text-muted",
							children: rank.perks.map((perk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-primary" }), perk]
							}, perk))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 w-full",
							variant: rank.popular ? "primary" : "outline",
							disabled: busy === rank.id,
							onClick: () => void buy(rank),
							children: busy === rank.id ? "ساخت سفارش…" : user ? "خرید رنک" : "ورود و خرید"
						})
					]
				}, rank.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-sm text-muted",
				children: "پرداخت روی درگاه ماه لونار شبیه‌سازی می‌شود و رنک روی پنل فعال می‌گردد. نام کاربری ماینکرافت را قبل از خرید در پنل چک کنید."
			})]
		})
	] });
}
//#endregion
export { Shop as component };

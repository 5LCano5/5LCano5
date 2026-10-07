import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatToman } from "./utils-yz82pC2_.mjs";
import { S as getOrder, T as payOrder, _ as useCurrentUserState, l as PageHero, r as Route$2, v as Button } from "./router-zSBcsxOC.mjs";
import { t as RedirectToSignIn } from "./gates-Frj7hCfb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout._orderId-BsvyRYnR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const { orderId } = Route$2.useParams();
	const { user, isPending } = useCurrentUserState();
	const [order, setOrder] = (0, import_react.useState)("loading");
	const [paying, setPaying] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const id = Number(orderId);
	(0, import_react.useEffect)(() => {
		if (isPending || !user || Number.isNaN(id)) return;
		getOrder({ data: id }).then((o) => setOrder(o ?? "missing")).catch(() => setOrder("missing"));
	}, [
		id,
		isPending,
		user
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-muted",
		children: "در حال بررسی حساب…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	if (order === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-muted",
		children: "بارگذاری سفارش…"
	});
	if (Number.isNaN(id) || order === "missing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "CHECKOUT",
		title: "سفارش پیدا نشد",
		subtitle: "از فروشگاه دوباره رنک را انتخاب کنید."
	});
	const paid = order.status === "paid";
	async function pay() {
		setPaying(true);
		setError(null);
		try {
			await new Promise((r) => setTimeout(r, 900));
			await payOrder({ data: id });
			const fresh = await getOrder({ data: id });
			setOrder(fresh ?? "missing");
		} catch (err) {
			setError(err instanceof Error ? err.message : "پرداخت ناموفق");
		} finally {
			setPaying(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "MOON GATEWAY",
		title: paid ? "پرداخت موفق" : "درگاه پرداخت ماه",
		subtitle: paid ? "رنک روی حساب شما فعال شد." : "سفارش را بررسی کنید و پرداخت را تکمیل کنید."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-lg px-4 py-10 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lunar-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: order.rankEn
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-2 text-2xl",
					children: ["رنک ", order.rankName]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "شماره سفارش"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: order.id })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "مبلغ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-primary",
								children: formatToman(order.amountToman)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "وضعیت"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: paid ? "پرداخت‌شده" : "در انتظار پرداخت" })]
						})
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-danger",
					children: error
				}) : null,
				paid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/panel",
						children: "رفتن به پنل"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full",
					disabled: paying,
					onClick: () => void pay(),
					children: paying ? "اتصال به درگاه…" : "پرداخت و فعال‌سازی رنک"
				})
			]
		})
	})] });
}
//#endregion
export { Checkout as component };

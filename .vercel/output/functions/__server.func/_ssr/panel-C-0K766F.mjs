import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatToman } from "./utils-yz82pC2_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as updateMcUsername, _ as useCurrentUserState, l as PageHero, v as Button, x as getMyPanel } from "./router-zSBcsxOC.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./gates-Frj7hCfb.mjs";
import { t as Input } from "./input-CHch-f70.mjs";
import { t as RankMoon } from "./rank-moon-mlM8HX61.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/panel-C-0K766F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PanelPage() {
	const { user, isPending } = useCurrentUserState();
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		getMyPanel().then((p) => {
			setPanel(p);
			setName(p.mcUsername);
		}).catch(() => toast.error("پنل بارگذاری نشد"));
	}, [isPending, user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-20 text-center text-muted",
		children: "در حال ورود به پنل…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	async function saveName(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await updateMcUsername({ data: name });
			const fresh = await getMyPanel();
			setPanel(fresh);
			toast.success("نام کاربری ذخیره شد");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "ذخیره نشد");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "PANEL",
		title: `سلام ${user.displayName ?? "بازیکن"}`,
		subtitle: "رنک، سفارش‌ها، تیکت‌ها و نام کاربری ماینکرافت — همه در مدار حساب شما."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lunar-card p-6 lg:col-span-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "رنک فعال"
					}),
					panel?.rank ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMoon, {
								id: panel.rank.id,
								className: "h-10 w-12"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl",
								children: panel.rank.nameFa
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en-mark text-xs text-primary",
								children: panel.rank.nameEn
							}),
							panel.rankExpiresAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: ["انقضا: ", panel.rankExpiresAt.slice(0, 16)]
							}) : null
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "هنوز رنکی ندارید." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								children: "خرید رنک"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lunar-card p-6 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "نام کاربری ماینکرافت"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "رنک خریداری‌شده روی همین نام اعمال می‌شود."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void saveName(e),
						className: "mt-4 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							maxLength: 16
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: "ذخیره"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lunar-card p-6 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl",
					children: "سفارش‌ها"
				}), panel && panel.orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "سفارشی ندارید."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border",
					children: panel?.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-2 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"#",
								o.id,
								" · ",
								o.rankName
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: formatToman(o.amountToman)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: o.status === "paid" ? "text-primary" : "text-muted",
								children: o.status === "paid" ? "پرداخت‌شده" : "در انتظار"
							}),
							o.status !== "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/checkout/$orderId",
								params: { orderId: String(o.id) },
								className: "text-primary",
								children: "پرداخت"
							}) : null
						]
					}, o.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lunar-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "تیکت‌ها"
					}),
					panel && panel.tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "تیکتی نیست."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm",
						children: panel?.tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/support/$id",
							params: { id: String(t.id) },
							className: "hover:text-primary",
							children: t.subject
						}) }, t.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/support",
							children: "پشتیبانی"
						})
					})
				]
			})
		]
	})] });
}
//#endregion
export { PanelPage as component };

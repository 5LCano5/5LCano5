import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useNavigate, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as cn } from "./utils-yz82pC2_.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useCurrentUserState, b as createTicket, l as PageHero, u as FAQS, v as Button, w as listMyTickets } from "./router-zSBcsxOC.mjs";
import { n as Textarea, t as Input } from "./input-CHch-f70.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-CstxRCFv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATS = [
	"عمومی",
	"فروشگاه",
	"حساب بازی",
	"تقلب/بن",
	"فنی"
];
function SupportPage() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	const [subject, setSubject] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)(CATS[0] ?? "عمومی");
	const [body, setBody] = (0, import_react.useState)("");
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		listMyTickets().then(setTickets).catch(() => setTickets([]));
	}, [isPending, user]);
	async function send(e) {
		e.preventDefault();
		if (!user) {
			toast.error("اول وارد حساب شوید");
			return;
		}
		setBusy(true);
		try {
			const res = await createTicket({ data: {
				subject,
				category,
				body
			} });
			toast.success("تیکت ثبت شد");
			await navigate({
				to: "/support/$id",
				params: { id: String(res.ticketId) }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "ارسال نشد");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "SUPPORT",
		title: "پشتیبانی مدار",
		subtitle: "سؤال‌های پرتکرار را بخوانید یا برای استاف تیکت باز کنید. پاسخ‌ها داخل همین سایت ثبت می‌شود."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl",
			children: "پرسش‌های پرتکرار"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-2",
			children: FAQS.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lunar-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex min-h-11 w-full items-center justify-between px-4 py-3 text-right text-sm",
					onClick: () => setOpenFaq(openFaq === i ? null : i),
					children: [faq.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: openFaq === i ? "−" : "+"
					})]
				}), openFaq === i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 pb-4 text-sm text-muted",
					children: faq.a
				}) : null]
			}, faq.q))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "تیکت جدید"
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "بررسی حساب…"
			}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void send(e),
				className: "mt-6 space-y-4 lunar-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["موضوع", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-1",
							value: subject,
							onChange: (e) => setSubject(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["دسته", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "mt-1 min-h-11 w-full rounded-md bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)]",
							value: category,
							onChange: (e) => setCategory(e.target.value),
							children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["پیام", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "mt-1",
							value: body,
							onChange: (e) => setBody(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						className: "w-full",
						children: busy ? "در حال ارسال…" : "ارسال تیکت"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lunar-card mt-6 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "برای ارسال تیکت باید وارد حساب شوید."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: { next: "/support" },
						children: "ورود / ثبت‌نام"
					})
				})]
			}),
			tickets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg",
					children: "تیکت‌های شما"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/support/$id",
						params: { id: String(t.id) },
						className: cn("lunar-card flex items-center justify-between p-4 text-sm"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: t.status === "open" ? "باز" : t.status
						})]
					}) }, t.id))
				})]
			}) : null
		] })]
	})] });
}
//#endregion
export { SupportPage as component };

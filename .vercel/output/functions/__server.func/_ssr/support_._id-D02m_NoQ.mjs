import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as getTicketThread, E as replyTicket, _ as useCurrentUserState, n as Route$1, v as Button } from "./router-zSBcsxOC.mjs";
import { t as RedirectToSignIn } from "./gates-Frj7hCfb.mjs";
import { n as Textarea } from "./input-CHch-f70.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support_._id-D02m_NoQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TicketPage() {
	const { id } = Route$1.useParams();
	const { user, isPending } = useCurrentUserState();
	const ticketId = Number(id);
	const [data, setData] = (0, import_react.useState)("loading");
	const [body, setBody] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user || Number.isNaN(ticketId)) return;
		getTicketThread({ data: ticketId }).then(setData).catch(() => setData(null));
	}, [
		isPending,
		user,
		ticketId
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-20 text-center text-muted",
		children: "در حال بارگذاری…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, { to: "/login" });
	if (data === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-4 py-20 text-center text-muted",
		children: "بارگذاری تیکت…"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-4 py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "تیکت پیدا نشد." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-4",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/support",
				children: "بازگشت"
			})
		})]
	});
	async function send(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await replyTicket({ data: {
				ticketId,
				body
			} });
			setBody("");
			const fresh = await getTicketThread({ data: ticketId });
			setData(fresh);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-primary",
				children: data.ticket.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-3xl",
				children: data.ticket.subject
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-3",
				children: data.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `rounded-lg p-4 ${m.isStaff ? "bg-raised text-fg" : "lunar-card"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary",
						children: m.isStaff ? "استاف لونار" : "شما"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: m.body
					})]
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => void send(e),
				className: "mt-8 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					placeholder: "پاسخ شما…",
					required: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy,
					children: busy ? "ارسال…" : "ارسال پاسخ"
				})]
			})
		]
	});
}
//#endregion
export { TicketPage as component };

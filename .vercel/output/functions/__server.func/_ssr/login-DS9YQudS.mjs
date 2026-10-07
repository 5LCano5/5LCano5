import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as Navigate, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-DyPznFr8.mjs";
import { r as signIn, t as authClient } from "./client-1vAx-gM_.mjs";
import { D as updateMcUsername, _ as useCurrentUserState, l as PageHero, o as Route$9, v as Button } from "./router-zSBcsxOC.mjs";
import { t as Input } from "./input-CHch-f70.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DS9YQudS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { next } = Route$9.useSearch();
	const { user, isPending } = useCurrentUserState();
	const [tab, setTab] = (0, import_react.useState)("up");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [mcUsername, setMcUsername] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: next });
	async function submit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (tab === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: mcUsername || email.split("@")[0] || "player"
				});
				if (err) throw new Error(err.message ?? "ثبت‌نام انجام نشد");
				if (mcUsername) try {
					await updateMcUsername({ data: mcUsername });
				} catch {}
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password
				});
				if (err) throw new Error(err.message ?? "ورود انجام نشد");
			}
			await authClient.getSession();
			window.location.assign(next);
		} catch (err) {
			setError(err instanceof Error ? err.message : "خطا");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "ACCOUNT",
		title: tab === "up" ? "ثبت‌نام در مدار لونار" : "ورود به حساب",
		subtitle: "برای خرید رنک، تیکت پشتیبانی و پنل کاربری یک حساب بسازید. ورود با ایمیل، گوگل یا X."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/images/shop-banner.jpg",
			alt: "ماه کامل مدار لونار",
			className: "hidden h-full min-h-80 rounded-xl object-cover lg:block"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lunar-card p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 grid grid-cols-2 rounded-md bg-raised p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-sm text-sm ${tab === "up" ? "bg-surface text-primary" : "text-muted"}`,
						onClick: () => setTab("up"),
						children: "ثبت‌نام"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `min-h-11 rounded-sm text-sm ${tab === "in" ? "bg-surface text-primary" : "text-muted"}`,
						onClick: () => setTab("in"),
						children: "ورود"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => void submit(e),
					className: "space-y-4",
					children: [
						tab === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["نام کاربری ماینکرافت", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								value: mcUsername,
								onChange: (e) => setMcUsername(e.target.value),
								placeholder: "Steve",
								minLength: 3,
								maxLength: 16,
								required: true
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["ایمیل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								required: true,
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["رمز عبور", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								required: true,
								minLength: 8,
								autoComplete: tab === "up" ? "new-password" : "current-password"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: busy,
							children: busy ? "لطفاً صبر کنید…" : tab === "up" ? "ساخت حساب" : "ورود"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
						"یا",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						className: "w-full",
						onClick: () => void signIn(p.providerId, { callbackURL: next }),
						children: ["ادامه با ", p.label === "Google" ? "گوگل" : "X"]
					}, p.providerId))
				})
			]
		})]
	})] });
}
//#endregion
export { Login as component };

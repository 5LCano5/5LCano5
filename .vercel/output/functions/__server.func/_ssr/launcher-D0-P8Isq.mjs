import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SERVER_IP } from "./utils-yz82pC2_.mjs";
import { a as Sparkles, c as Gauge, l as Download, o as Shield, t as Zap } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as PageHero, v as Button } from "./router-zSBcsxOC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/launcher-D0-P8Isq.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Sparkles,
		title: "رابط مدرن",
		body: "تم تیره مدار ماه، ساده و سریع. همه چیز سر جایش است."
	},
	{
		icon: Gauge,
		title: "اجرای سبک",
		body: "حتی روی سیستم ضعیف بالا می‌آید. زمان لود کوتاه‌تر از لانچرهای سنگین."
	},
	{
		icon: Zap,
		title: "آپدیت خودکار",
		body: "نسخه جدید از CDN می‌آید. لازم نیست دستی دانلود کنید."
	},
	{
		icon: Shield,
		title: "بدون اکانت اضافه",
		body: "لانچر اطلاعات شخصی نمی‌خواهد. نصب کن و وارد play.lunar.ir شو."
	}
];
function fakeDownload(os) {
	toast.success(`لینک نسخه ${os} به‌زودی در دیسکورد لونار هم منتشر می‌شود — آی‌پی ${SERVER_IP} همین حالا کار می‌کند.`);
}
function LauncherPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			kicker: "LAUNCHER",
			title: "لونار لانچر",
			subtitle: "لانچر اختصاصی ماینکرافت لونار؛ رابط مدرن، سرعت بالا، به‌روزرسانی خودکار و ورود یک‌کلیکه به مدار."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "لونار لانچر فقط یک اجراکننده نیست. مجموعه ابزار ورود به شبکه است: انتخاب نسخه، تنظیم گرافیک بر اساس سخت‌افزار، و دکمه ورود مستقیم به سرور."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => fakeDownload("ویندوز"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "دانلود ویندوز"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => fakeDownload("اندروید"),
						children: "اندروید"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => fakeDownload("لینوکس"),
						children: "لینوکس"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/launcher.jpg",
				alt: "پیش‌نمایش لونار لانچر",
				className: "w-full rounded-xl object-cover"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-2",
			children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "lunar-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-xl",
						children: f.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: f.body
					})
				]
			}, f.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl",
					children: "نصب در سه قدم"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-4 md:grid-cols-3",
					children: [
						{
							n: "۰۱",
							t: "دانلود",
							d: "نسخه سیستم‌عامل خود را بگیرید."
						},
						{
							n: "۰۲",
							t: "نصب",
							d: "فایل را اجرا کنید؛ نسخه سبک برای سیستم ضعیف موجود است."
						},
						{
							n: "۰۳",
							t: "ورود",
							d: "دکمه ورود به لونار را بزنید. آی‌پی دستی لازم نیست."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "lunar-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en-mark text-primary",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: s.d
							})
						]
					}, s.n))
				})]
			})
		})
	] });
}
//#endregion
export { LauncherPage as component };

import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as PageHero, p as MODES } from "./router-zSBcsxOC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modes-BZQOTO2u.js
var import_jsx_runtime = require_jsx_runtime();
function ModesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "GAME MODES",
		title: "گیم‌مودهای مدار ماه",
		subtitle: "هر مود پلاگین و مپ خودش را دارد. پینگ ایران، آنتی‌چیت مشترک، و فصل‌های هماهنگ."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6",
		children: MODES.map((mode, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			id: mode.id,
			className: "grid scroll-mt-28 items-center gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: mode.image,
				alt: mode.title,
				className: `w-full rounded-xl object-cover ${i % 2 === 1 ? "lg:order-2" : ""}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: mode.en
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: mode.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: mode.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 flex flex-wrap gap-2",
					children: mode.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-sm bg-raised px-3 py-1 text-sm text-muted",
						children: tag
					}, tag))
				})
			] })]
		}, mode.id))
	})] });
}
//#endregion
export { ModesPage as component };

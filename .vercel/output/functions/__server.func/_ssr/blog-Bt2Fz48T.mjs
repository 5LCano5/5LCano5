import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as PageHero, s as Route$11 } from "./router-zSBcsxOC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-Bt2Fz48T.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPage() {
	const { posts } = Route$11.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "LOG",
		title: "بلاگ لونار",
		subtitle: "آپدیت فصل، اقتصاد، آنتی‌چیت و لانچر — گزارش مدار از قلب ماه."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 md:grid-cols-2",
			children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog/$slug",
				params: { slug: post.slug },
				className: "lunar-card overflow-hidden",
				children: [post.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: post.cover,
					alt: "",
					className: "aspect-video w-full object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-primary",
							children: post.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: post.excerpt
						})
					]
				})]
			}, post.slug))
		})
	})] });
}
//#endregion
export { BlogPage as component };

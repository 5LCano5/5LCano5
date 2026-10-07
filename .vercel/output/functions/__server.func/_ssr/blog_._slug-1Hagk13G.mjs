import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3, v as Button } from "./router-zSBcsxOC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog_._slug-1Hagk13G.js
var import_jsx_runtime = require_jsx_runtime();
function PostPage() {
	const { post } = Route$3.useLoaderData();
	const paragraphs = post.body.split(/\n\n+/);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-primary",
				children: post.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-4xl",
				children: post.title
			}),
			post.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.cover,
				alt: "",
				className: "mt-8 w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4 text-muted",
				children: paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					children: "بازگشت به بلاگ"
				})
			})
		]
	});
}
//#endregion
export { PostPage as component };

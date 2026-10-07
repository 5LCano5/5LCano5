import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as toFaDigits, r as cn } from "./utils-yz82pC2_.mjs";
import { l as PageHero, m as RULE_SECTIONS } from "./router-zSBcsxOC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-CRwm-G_1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RulesPage() {
	const [active, setActive] = (0, import_react.useState)("general");
	const section = RULE_SECTIONS.find((s) => s.id === active) ?? RULE_SECTIONS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		kicker: "RULES",
		title: "قوانین شبکه لونار",
		subtitle: "ورود به سرور و سایت به معنی پذیرش این قوانین است. رنک خریداری‌شده مجوز قانون‌شکنی نیست."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: RULE_SECTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setActive(s.id),
				className: cn("min-h-11 rounded-md px-4 text-sm", active === s.id ? "bg-primary text-primary-fg" : "bg-raised text-muted hover:text-fg"),
				children: s.title
			}, s.id))
		}), section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 space-y-4",
			children: section.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "lunar-card flex gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "en-mark text-sm text-primary",
					children: toFaDigits(i + 1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item })]
			}, item))
		}) : null]
	})] });
}
//#endregion
export { RulesPage as component };

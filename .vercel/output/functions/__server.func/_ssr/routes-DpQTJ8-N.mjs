import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatToman, c as toFaDigits, t as SERVER_IP } from "./utils-yz82pC2_.mjs";
import { a as Sparkles, d as ArrowLeft, i as Swords, l as Download, o as Shield, t as Zap, u as Copy } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Route$12, d as FEATURES, f as JOIN_STEPS, h as STAFF, p as MODES, v as Button } from "./router-zSBcsxOC.mjs";
import { t as RankMoon } from "./rank-moon-mlM8HX61.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DpQTJ8-N.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { ranks, posts, status } = Route$12.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { status }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Join, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modes, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RanksPreview, { ranks }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogPreview, { posts: posts.slice(0, 3) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Staff, {})
	] });
}
function Hero({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: "LUNAR NETWORK"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl sm:text-5xl lg:text-6xl",
					children: "لونار سیتی، تجربه ای باور نکردنی"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 max-w-xl text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "text-fg",
						children: "لونار"
					}), " تجربه‌ای فراتر از ماینکرفت معمولی. هر گیم‌مود یک مدار دور ماه است؛ با چالش‌ها، پلاگین‌های اختصاصی و مکانیک‌هایی که بازی را از حالت تکراری درمی‌آورند. از بقای اقتصادی تا مون‌وارز، آرنا و بتل‌پس فصلی — همیشه یک فاز تازه در راه است."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void copyIp(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "کپی آی‌پی سرور"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/launcher",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "دانلود لانچر"]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: toFaDigits(status.online)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: " بازیکن · "
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "en-mark text-[11px] text-fg",
							children: status.ip
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/hero.jpg",
					alt: "منظره پایگاه لونار روی سطح ماه",
					className: "aspect-video w-full rounded-xl object-cover shadow-[var(--shadow-border)]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 rounded-md bg-bg/80 px-3 py-2 text-xs backdrop-blur-sm",
					children: [
						"ظرفیت ",
						toFaDigits(status.online),
						" از ",
						toFaDigits(status.max)
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" })]
	});
}
function Join() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "en-mark text-xs text-primary",
				children: "HOW TO JOIN"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-3xl",
				children: "آموزش ورود به سرور لونار"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "برای ورود به سرور ماینکرافت لونار و شروع بازی، این سه مرحله را دنبال کنید."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: JOIN_STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lunar-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "en-mark text-primary",
							children: step.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-xl",
							children: step.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: step.body
						}),
						"cta" in step && step.cta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: step.cta.to,
								children: step.cta.label
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "en-mark mt-5 text-xs text-primary",
							children: SERVER_IP
						})
					]
				}, step.n))
			})
		]
	});
}
function Modes() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-surface/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "en-mark text-xs text-primary",
						children: "GAME MODES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl",
						children: "گیم مود های لونار سیتی"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "تجربه متفاوت از دنیای ماینکرافت، بازی با دوستان و رقابت — هر مود با پلاگین اختصاصی و بهینه برای پینگ ایران."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/modes",
						children: ["همه مودها", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/modes",
					hash: mode.id,
					className: "lunar-card group overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: mode.image,
						alt: mode.title,
						className: "aspect-photo w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en-mark text-[10px] text-primary",
								children: mode.en
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-xl",
								children: mode.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: mode.blurb
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: mode.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-sm bg-raised px-2 py-1 text-xs text-muted",
									children: tag
								}, tag))
							})
						]
					})]
				}, mode.id))
			})]
		})
	});
}
function RanksPreview({ ranks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: "RANKS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: "فروش رنک"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-muted",
					children: "رنک های متفاوت و قابلیت های متفاوت"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					children: "ورود به فروشگاه"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",
			children: ranks.map((rank) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: `lunar-card p-5 ${rank.popular ? "shadow-[var(--shadow-border-hover)]" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankMoon, {
						id: rank.id,
						className: "h-8 w-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "en-mark mt-3 text-[10px] text-primary",
						children: rank.nameEn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl",
						children: rank.nameFa
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg text-primary",
						children: formatToman(rank.priceToman)
					}),
					rank.popular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-primary",
						children: "پیشنهادی"
					}) : null
				]
			}, rank.id))
		})]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-surface/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "w-full rounded-xl object-cover" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: "ABOUT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: "درباره ما"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted",
					children: "سرور لونار با هدف ساختن فضایی حرفه‌ای، پایدار و هیجان‌انگیز برای بازیکنان ماینکرافت ایران راه افتاده است. با گیم‌مودهای متنوع، پشتیبانی فارسی و به‌روزرسانی مداوم، مدار ماه را برای شما روشن نگه می‌داریم. لونار فقط یک سرور نیست؛ جامعه‌ای از بازیکن‌هایی است که شب را روی دهانه‌ها می‌گذرانند."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-3 gap-3 text-center",
					children: [
						{
							n: "۶",
							l: "گیم‌مود"
						},
						{
							n: "۲۴/۷",
							l: "آپ‌تایم"
						},
						{
							n: "۵۰۰",
							l: "ظرفیت اسلات"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-raised px-2 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-sahel text-2xl font-black text-primary",
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: s.l
						})]
					}, s.l))
				})
			] })]
		})
	});
}
function Features() {
	const icons = [
		Shield,
		Sparkles,
		Zap,
		Swords,
		Shield,
		Sparkles
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "en-mark text-xs text-primary",
				children: "WHY LUNAR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-3xl",
				children: "چه چیزی ما را خاص می‌کند؟"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: FEATURES.map((f, i) => {
					const Icon = icons[i] ?? Shield;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "lunar-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-xl",
								children: f.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: f.body
							})
						]
					}, f.title);
				})
			})
		]
	});
}
function BlogPreview({ posts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-border bg-surface/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en-mark text-xs text-primary",
					children: "LOG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl",
					children: "بلاگ و اخبار مدار"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog",
						children: "همه نوشته‌ها"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/blog/$slug",
					params: { slug: post.slug },
					className: "lunar-card overflow-hidden",
					children: [post.cover ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.cover,
						alt: "",
						className: "aspect-video w-full object-cover"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-primary",
								children: post.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg",
								children: post.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: post.excerpt
							})
						]
					})]
				}, post.slug))
			})]
		})
	});
}
function Staff() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "en-mark text-xs text-primary",
				children: "STAFF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-3xl",
				children: "تیم پشتیبانی لونار"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted",
				children: "تیم پشتیبانی لونار همراه شماست و سعی می‌کند در اولین فرصت به سؤال‌ها پاسخ بدهد."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: STAFF.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "lunar-card p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto grid size-16 place-items-center rounded-full bg-raised font-sahel text-2xl font-black text-primary",
							children: s.initial
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: s.role
						})
					]
				}, s.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/support",
						children: "ارسال تیکت"
					})
				})
			})
		]
	});
}
function copyIp() {
	return navigator.clipboard.writeText(SERVER_IP).then(() => toast.success("آی‌پی سرور کپی شد"), () => toast.error("کپی نشد"));
}
//#endregion
export { Home as component };

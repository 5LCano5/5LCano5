import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site-shell";
import { RULE_SECTIONS } from "@/lib/content";
import { cn, toFaDigits } from "@/lib/utils";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
});

function RulesPage() {
  const [active, setActive] = useState<(typeof RULE_SECTIONS)[number]["id"]>("general");
  const section = RULE_SECTIONS.find((s) => s.id === active) ?? RULE_SECTIONS[0];

  return (
    <>
      <PageHero
        kicker="RULES"
        title="قوانین شبکه لونار"
        subtitle="ورود به سرور و سایت به معنی پذیرش این قوانین است. رنک خریداری‌شده مجوز قانون‌شکنی نیست."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {RULE_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "min-h-11 rounded-md px-4 text-sm",
                active === s.id ? "bg-primary text-primary-fg" : "bg-raised text-muted hover:text-fg",
              )}
            >
              {s.title}
            </button>
          ))}
        </div>
        {section ? (
          <ol className="mt-8 space-y-4">
            {section.items.map((item, i) => (
              <li key={item} className="lunar-card flex gap-4 p-5">
                <span className="en-mark text-sm text-primary">{toFaDigits(i + 1)}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </>
  );
}

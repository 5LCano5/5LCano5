import { cn } from "@/lib/utils";

export function RankMoon({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 36" className={cn("text-primary", className)} aria-hidden>
      {id === "helal" ? (
        <>
          <circle cx="24" cy="18" r="12" fill="currentColor" />
          <circle cx="29" cy="18" r="10" fill="var(--color-surface)" />
        </>
      ) : null}
      {id === "rob" ? (
        <>
          <circle cx="24" cy="18" r="12" fill="currentColor" />
          <rect x="24" y="4" width="16" height="28" fill="var(--color-surface)" />
        </>
      ) : null}
      {id === "badr" ? <circle cx="24" cy="18" r="12" fill="currentColor" /> : null}
      {id === "super" ? (
        <>
          <circle cx="24" cy="18" r="14" fill="currentColor" opacity="0.35" />
          <circle cx="24" cy="18" r="11" fill="currentColor" />
        </>
      ) : null}
      {id === "lunarplus" ? (
        <>
          <circle cx="24" cy="18" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="18" r="10" fill="currentColor" />
        </>
      ) : null}
    </svg>
  );
}

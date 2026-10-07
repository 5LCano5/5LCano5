import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-[box-shadow,background-color,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 min-h-11 px-4 text-sm",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary/90",
        outline: "text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] bg-surface/60",
        ghost: "text-fg hover:bg-raised",
        moon: "bg-moon text-bg hover:bg-moon/90",
        danger: "bg-danger text-fg hover:bg-danger/90",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

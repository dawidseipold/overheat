import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
  variants: {
    variant: {
      display: "font-display text-display uppercase",
      h1: "font-heading text-h1 font-bold uppercase",
      h2: "font-heading text-h2 font-bold uppercase",
      h3: "font-heading text-h3 font-semibold uppercase",
      label: "font-data text-label uppercase tracking-label",
      body: "font-sans text-body",
      "body-sm": "font-sans text-body-sm",
      data: "font-data text-data tabular-nums",
    },
    tone: {
      default: "text-foreground",
      secondary: "text-oh-secondary",
      muted: "text-oh-muted",
      accent: "text-oh-violet",
      success: "text-oh-success",
      danger: "text-oh-danger",
      warning: "text-oh-warning",
    },
  },
  defaultVariants: { variant: "body", tone: "default" },
});

// Domyślny znacznik HTML dla każdego wariantu (zmienisz go przez asChild)
const defaultElement = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  label: "span",
  body: "p",
  "body-sm": "p",
  data: "span",
} as const;

function Text({
  className,
  variant,
  tone,
  asChild = false,
  ...props
}: React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & { asChild?: boolean }) {
  const Comp: React.ElementType = asChild ? Slot : defaultElement[variant ?? "body"];
  return <Comp className={cn(textVariants({ variant, tone, className }))} {...props} />;
}

export { Text, textVariants };

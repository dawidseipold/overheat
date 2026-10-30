import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-1 font-data text-label uppercase tracking-label",
  {
    variants: {
      variant: {
        neutral: "border-border bg-card text-oh-muted",
        accent: "border-oh-violet/40 bg-oh-violet/10 text-oh-plasma",
        success: "border-oh-success/40 bg-oh-success/10 text-oh-success",
        warning: "border-oh-warning/40 bg-oh-warning/10 text-oh-warning",
        danger: "border-oh-danger/40 bg-oh-danger/10 text-oh-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

export { Badge, badgeVariants };

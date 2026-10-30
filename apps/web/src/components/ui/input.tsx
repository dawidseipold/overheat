import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full min-w-0 rounded-md border border-input bg-oh-void px-3 font-sans text-body text-foreground transition-[color,border-color,box-shadow] duration-(--motion-micro) outline-none placeholder:text-oh-muted",
        "focus-visible:border-oh-violet focus-visible:ring-2 focus-visible:ring-oh-violet/20",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "disabled:pointer-events-none disabled:opacity-35",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

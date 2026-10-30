import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

function ModeCard({
  className,
  title,
  description,
  selected = false,
  ...props
}: React.ComponentProps<"button"> & {
  title: string;
  description: string;
  selected?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "w-full rounded-sm border p-3 text-left transition-colors duration-(--motion-micro) outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-35",
        selected
          ? "border-oh-violet bg-oh-violet/15"
          : "border-border bg-oh-elevated hover:border-oh-plasma/50",
        className,
      )}
      {...props}
    >
      <Text variant="h3" className="block text-button" asChild>
        <span>{title}</span>
      </Text>
      <Text variant="body-sm" tone="muted" className="block" asChild>
        <span>{description}</span>
      </Text>
    </button>
  );
}

export { ModeCard };

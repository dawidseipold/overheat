import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-4", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text variant="h3" className={cn("text-button", className)} {...props} />;
}

function CardLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text variant="label" tone="muted" className={className} {...props} />;
}

export { Card, CardHeader, CardLabel, CardTitle };

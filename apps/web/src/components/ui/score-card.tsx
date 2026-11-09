import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

function ScoreCard({
  className,
  place,
  score,
  ...props
}: React.ComponentProps<"div"> & { place: string; score: number }) {
  return (
    <div
      className={cn("rounded-sm border border-border bg-oh-elevated p-3", className)}
      {...props}
    >
      <Text variant="label" tone="accent" className="block">
        {place}
      </Text>
      <Text variant="h3" className="block text-button tabular-nums" asChild>
        <span>{score.toLocaleString("en-US")}</span>
      </Text>
    </div>
  );
}

export { ScoreCard };

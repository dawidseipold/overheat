import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

// 68 sekund → "01:08"
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function Timer({
  className,
  seconds,
  total,
  warningAt = 5,
  ...props
}: React.ComponentProps<"div"> & { seconds: number; total?: number; warningAt?: number }) {
  const isLow = seconds <= warningAt;
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <Text variant="data" tone={isLow ? "warning" : "accent"} role="timer" className="block">
        {formatTime(seconds)}
      </Text>
      {total !== undefined && (
        <div className="h-1 bg-oh-elevated">
          <div
            className={cn(
              "h-full transition-[width] duration-(--motion-micro)",
              isLow ? "bg-oh-warning" : "bg-oh-violet",
            )}
            style={{ width: `${(seconds / total) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}

export { Timer };

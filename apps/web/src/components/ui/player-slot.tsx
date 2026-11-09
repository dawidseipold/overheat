import * as React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./badge";
import { Text } from "./typography";

// Bez nickname to wolne miejsce w pokoju
function PlayerSlot({
  className,
  nickname,
  isHost = false,
  isReady = false,
  isConnected = true,
  ...props
}: React.ComponentProps<"div"> & {
  nickname?: string;
  isHost?: boolean;
  isReady?: boolean;
  isConnected?: boolean;
}) {
  const isEmpty = nickname === undefined;
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-sm border border-border p-3",
        isEmpty ? "border-dashed" : "bg-oh-elevated",
        className,
      )}
      {...props}
    >
      <Text
        variant="body-sm"
        tone={isEmpty ? "muted" : "default"}
        className="w-full truncate uppercase"
      >
        {isEmpty ? "Empty slot" : nickname}
        {isHost && " / Host"}
      </Text>
      {isEmpty ? (
        <Badge>Open</Badge>
      ) : !isConnected ? (
        <Badge variant="danger">Offline</Badge>
      ) : isReady ? (
        <Badge variant="success">Ready</Badge>
      ) : (
        <Badge variant="warning">Not ready</Badge>
      )}
    </div>
  );
}

export { PlayerSlot };

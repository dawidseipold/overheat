import * as React from "react";

import { cn } from "@/lib/utils";

import { Text } from "./typography";

// Pasek na górze każdego ekranu gry: logo po lewej, informacja po prawej
function GameHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header className={cn("flex items-center justify-between gap-4", className)} {...props}>
      <span className="font-display text-button uppercase tracking-wider">
        Overheat<span className="text-oh-violet">.</span>
      </span>
      {children && (
        <Text variant="label" tone="muted">
          {children}
        </Text>
      )}
    </header>
  );
}

export { GameHeader };

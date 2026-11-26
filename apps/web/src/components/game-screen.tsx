import * as React from "react";

import { cn } from "@/lib/utils";

import { GameHeader } from "./ui/game-header";

// Wspólna rama każdego ekranu gry: tło, poświata, nagłówek i miejsce na treść
function GameScreen({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<"main"> & { label?: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-oh-void">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-96 opacity-40"
        style={{ background: "radial-gradient(circle at top right, var(--oh-violet), transparent 70%)" }}
      />
      <div className="relative mx-auto flex w-full max-w-app flex-1 flex-col gap-8 p-6 md:p-12">
        <GameHeader>{label}</GameHeader>
        <main className={cn("flex flex-1 flex-col", className)} {...props}>
          {children}
        </main>
      </div>
    </div>
  );
}

export { GameScreen };

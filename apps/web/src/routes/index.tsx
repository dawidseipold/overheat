import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { GameScreen } from "@/components/game-screen";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

export const Route = createFileRoute("/")({
  component: MainMenu,
});

function MainMenu() {
  return (
    // "Online" to na razie udawana liczba, prawdziwą da serwer
    <GameScreen label="Online / 12,492" className="items-center justify-center text-center">
      <Text variant="label" tone="muted">
        Fast multiplayer quiz mayhem
      </Text>
      <Text variant="display" className="mt-3 text-h1 italic md:text-display">
        Overheat
      </Text>
      <Text variant="label" tone="muted" className="mt-2">
        Same brains. Higher temperatures.
      </Text>
      {/* Przyciski zamienimy na linki, gdy powstaną ekrany /create i /join */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button>
          <PlusIcon />
          Create room
        </Button>
        <Button variant="outline">
          <ArrowRightIcon />
          Join room
        </Button>
      </div>
    </GameScreen>
  );
}

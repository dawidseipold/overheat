import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

export const Route = createFileRoute("/design-system")({
  component: DesignSystem,
});

function DesignSystem() {
  // Udawane zapytanie do serwera (1,5 s), żeby pokazać stan ładowania przycisku
  const join = useMutation({
    mutationFn: () => new Promise((resolve) => setTimeout(resolve, 1500)),
  });

  return (
    <main className="space-y-12">
      <Text variant="display">Overheat</Text>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Typography
        </Text>
        <Text variant="h1">The game is on</Text>
        <Text variant="h2">Choose your mode</Text>
        <Text variant="h3">Waiting for players</Text>
        <Text variant="label" tone="accent">
          Fast multiplayer quiz
        </Text>
        <Text>Every second matters. Think quickly and outplay your friends.</Text>
        <Text variant="body-sm" tone="secondary">
          Invite your friends, select a mode and hit start.
        </Text>
        <Text variant="data" tone="warning">
          00:08
        </Text>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Buttons
        </Text>
        <div className="grid grid-cols-2 gap-3">
          <Button>
            <PlusIcon />
            Create room
          </Button>
          <Button variant="outline" loading={join.isPending} onClick={() => join.mutate()}>
            <ArrowRightIcon />
            Join room
          </Button>
          <Button variant="secondary">Settings</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
        <Text variant="body-sm" tone="secondary">
          Click "Join room" to preview the loading state.
        </Text>
      </section>
    </main>
  );
}

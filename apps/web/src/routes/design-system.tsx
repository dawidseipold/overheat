import { createFileRoute } from "@tanstack/react-router";

import { Text } from "@/components/ui/typography";

export const Route = createFileRoute("/design-system")({
  component: DesignSystem,
});

function DesignSystem() {
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
    </main>
  );
}

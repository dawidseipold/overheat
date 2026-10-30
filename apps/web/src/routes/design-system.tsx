import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/typography";

export const Route = createFileRoute("/design-system")({
  component: DesignSystem,
});

// Kod pokoju: dokładnie 6 wielkich liter lub cyfr
const RoomCodeSchema = v.pipe(
  v.string(),
  v.length(6, "Room code must be exactly 6 characters"),
  v.regex(/^[A-Z0-9]+$/, "Only letters and digits"),
);

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

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Form controls
        </Text>
        <JoinRoomForm />
      </section>
    </main>
  );
}

function JoinRoomForm() {
  const form = useForm({
    defaultValues: { roomCode: "", soundEnabled: true },
    // Udawane wysłanie do serwera (1,5 s)
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <form.Field
        name="roomCode"
        validators={{ onBlur: RoomCodeSchema, onSubmit: RoomCodeSchema }}
        children={(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Room code</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              placeholder="XK92QP"
              maxLength={6}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value.toUpperCase())}
              aria-invalid={!field.state.meta.isValid}
            />
            {field.state.meta.isValid ? (
              <FieldDescription>6 letters or digits from your host.</FieldDescription>
            ) : (
              <FieldError errors={field.state.meta.errors} />
            )}
          </Field>
        )}
      />

      <form.Field
        name="soundEnabled"
        children={(field) => (
          <Field className="flex-row items-center gap-3">
            <Switch
              id={field.name}
              name={field.name}
              checked={field.state.value}
              onBlur={field.handleBlur}
              onCheckedChange={field.handleChange}
            />
            <Text asChild>
              <label htmlFor={field.name}>
                Sound effects {field.state.value ? "enabled" : "disabled"}
              </label>
            </Text>
          </Field>
        )}
      />

      <form.Subscribe

        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button type="submit" variant="outline" loading={isSubmitting}>
            <ArrowRightIcon />
            Join room
          </Button>
        )}
      />
    </form>
  );
}

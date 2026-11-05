import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import * as v from "valibot";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AnswerOption } from "@/components/ui/answer-option";
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


      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Answer options
        </Text>
        <AnswerOptionsDemo />
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Badges
        </Text>
        <div className="flex flex-wrap gap-2">
          <Badge>Open</Badge>
          <Badge variant="accent">Host</Badge>
          <Badge variant="success">Ready</Badge>
          <Badge variant="warning">Low time</Badge>
          <Badge variant="danger">Error</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Feedback states
        </Text>
        <div className="space-y-3">
          <Alert variant="success" label="Success">
            Correct answer
          </Alert>
          <Alert variant="danger" label="Error">
            Wrong answer
          </Alert>
          <Alert variant="warning" label="Warning">
            Timer running low
          </Alert>
          <Alert label="Info">Waiting for players</Alert>
        </div>
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

const answers = [
  { letter: "A", text: "Venus" },
  { letter: "B", text: "Saturn" },
  { letter: "C", text: "Earth" },
  { letter: "D", text: "Mars" },
];
const correctLetter = "B";

function AnswerOptionsDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  function getState(letter: string) {
    if (!revealed) return selected === letter ? "selected" : "default";
    if (letter === correctLetter) return "correct";
    return selected === letter ? "wrong" : "default";
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {answers.map((answer) => (
          <AnswerOption
            key={answer.letter}
            letter={answer.letter}
            state={getState(answer.letter)}
            disabled={revealed}
            onClick={() => setSelected(answer.letter)}
          >
            {answer.text}
          </AnswerOption>
        ))}
      </div>
      <Button
        variant="secondary"
        disabled={selected === null}
        onClick={() => {
          if (revealed) setSelected(null);
          setRevealed(!revealed);
        }}
      >
        {revealed ? "Play again" : "Reveal answer"}
      </Button>
    </div>
  );
}

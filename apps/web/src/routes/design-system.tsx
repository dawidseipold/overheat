import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import * as v from "valibot";

import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AnswerOption } from "@/components/ui/answer-option";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardLabel, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { GameHeader } from "@/components/ui/game-header";
import { Input } from "@/components/ui/input";
import { ModeCard } from "@/components/ui/mode-card";
import { PlayerSlot } from "@/components/ui/player-slot";
import { ScoreCard } from "@/components/ui/score-card";
import { Switch } from "@/components/ui/switch";
import { Timer } from "@/components/ui/timer";
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

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Card
        </Text>
        <Card>
          <CardHeader>
            <CardTitle>Room rules</CardTitle>
            <CardLabel>Classic</CardLabel>
          </CardHeader>
          <Text variant="body-sm" tone="secondary">
            Ten rounds, eight seconds per question.
          </Text>
        </Card>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Timer
        </Text>
        <TimerDemo />
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Game header
        </Text>
        <GameHeader>Room / XK92QP</GameHeader>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Player slots
        </Text>
        <div className="grid grid-cols-2 gap-2">
          <PlayerSlot nickname="You" isHost isReady />
          <PlayerSlot nickname="Phantom" isReady />
          <PlayerSlot nickname="Pixelwolf" />
          <PlayerSlot nickname="Nomad" isConnected={false} />
          <PlayerSlot />
        </div>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Score cards
        </Text>
        <div className="grid grid-cols-3 gap-2">
          <ScoreCard place="1st" score={4250} />
          <ScoreCard place="2nd" score={3800} />
          <ScoreCard place="3rd" score={2450} />
        </div>
      </section>

      <section className="space-y-4">
        <Text variant="label" tone="muted">
          Mode cards
        </Text>
        <ModeCardsDemo />
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

function TimerDemo() {
  const total = 15;
  const [seconds, setSeconds] = useState(total);

  // Co sekundę odejmuje jeden, aż dojdzie do zera
  useEffect(() => {
    if (seconds === 0) return;
    const timeout = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timeout);
  }, [seconds]);

  return (
    <div className="space-y-4">
      <Timer seconds={seconds} total={total} />
      <Button variant="secondary" onClick={() => setSeconds(total)}>
        Restart
      </Button>
    </div>
  );
}

const modes = [
  { title: "Classic", description: "Fast-paced knowledge duel" },
  { title: "Survival", description: "One life. No second chances." },
  { title: "Blind rank", description: "Predict your top five." },
];

function ModeCardsDemo() {
  const [selectedMode, setSelectedMode] = useState("Classic");

  return (
    <div className="space-y-2">
      {modes.map((mode) => (
        <ModeCard
          key={mode.title}
          title={mode.title}
          description={mode.description}
          selected={selectedMode === mode.title}
          onClick={() => setSelectedMode(mode.title)}
        />
      ))}
    </div>
  );
}

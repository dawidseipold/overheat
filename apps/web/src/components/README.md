# Komponenty OVERHEAT

Komponenty UI gry oparte na design systemie OVERHEAT
(https://overheat-design-studio--dawidson09.replit.app/).
Podgląd wszystkich komponentów: `bun run dev:web` → http://localhost:5173/design-system

## Struktura

- `apps/web/src/index.css`: tokeny design systemu
- `apps/web/src/lib/utils.ts`: funkcja `cn()` do łączenia klas
- `apps/web/src/components/ui/`: komponenty
- `apps/web/src/routes/design-system.tsx`: strona podglądu

## Zasady

- Styluj tokenami, nie wpisuj wartości na sztywno (`bg-oh-surface`, nie `bg-[#1A1924]`).
- Każdy komponent: funkcja + `React.ComponentProps`, `cn()` do klas, eksport nazwany. Warianty przez `cva`, gdy jest ich kilka.
- Komponenty tylko wyglądają. Dane i logika należą do strony, która ich używa.
- Nowy token rozmiaru tekstu, czcionki lub trackingu trzeba dopisać w `index.css` **i** w `lib/utils.ts`. Inaczej `cn()` może go usunąć.
- Ikony z `lucide-react`, nie znaki tekstowe. Czcionki nie mają np. strzałki `→`.

## Tokeny

### Kolory

Klasy: `bg-oh-*`, `text-oh-*`, `border-oh-*`. Prefiks `oh-` chroni przed konfliktami z nazwami shadcn i Tailwinda.

| Token | Wartość | Użycie |
|---|---|---|
| `oh-void` | `#09090E` | główne tło |
| `oh-base` | `#111118` | tło aplikacji |
| `oh-surface` | `#1A1924` | karty i panele |
| `oh-elevated` | `#252131` | elementy wyniesione |
| `oh-violet` | `#A56BE8` | akcent marki, używać oszczędnie |
| `oh-plasma` | `#C596FF` | highlight, hover |
| `oh-ghost` | `#F1EEF2` | główny tekst |
| `oh-secondary` | `#B6B0C0` | opisy |
| `oh-muted` | `#9995A6` | cichy tekst |
| `oh-border` | `#393143` | separatory |
| `oh-success` | `#75D8AD` | poprawna odpowiedź |
| `oh-danger` | `#F07382` | błędna odpowiedź |
| `oh-warning` | `#F2BC72` | kończy się czas |

Paleta jest podpięta pod zmienne shadcn (`--background`, `--primary`, `--border`...), więc nowe komponenty shadcn od razu mają kolory OVERHEAT.
Proporcje (orientacyjnie): 65% void, 23% surfaces, 9% treść, 3% akcent.

### Typografia

| Klasa | Czcionka | Rozmiar / linia |
|---|---|---|
| `text-display` | Anton (`font-display`) | 112 / 112 |
| `text-h1` | Barlow Condensed (`font-heading`) | 72 / 76 |
| `text-h2` | Barlow Condensed | 48 / 54 |
| `text-h3` | Barlow Condensed | 32 / 38 |
| `text-button` | Barlow Condensed | 24 / 29 |
| `text-label` | IBM Plex Mono (`font-data`) | 12 / 18 |
| `text-body` | Inter (domyślna) | 16 / 25 |
| `text-body-sm` | Inter | 14 / 22 |
| `text-data` | IBM Plex Mono | 56 / 62 |

Wielkie litery w nagłówkach i kontrolkach. `tracking-label` (0.12em) dla etykiet, `tracking-button` (0.06em) dla przycisków. Cyfry tabelaryczne (`tabular-nums`) w timerach i wynikach.

### Pozostałe

- **Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Pokrywa się z domyślną skalą Tailwinda: `1, 2, 3, 4, 6, 8, 12, 16, 24` (np. `p-4`, `gap-6`).
- **Zaokrąglenia:** `rounded-sm` 2px, `rounded-md` 4px, `rounded-lg` 8px. Kanciasto, domyślnie bez „pigułek”.
- **Siatka desktop:** 12 kolumn, `max-w-app` (1280px), odstępy 24px.
- **Przyciski:** minimum 48px wysokości, warianty biały i fioletowy.
- **Ruch:** `--motion-micro` (200ms, zakres 120–350ms) dla mikrointerakcji, `--motion-screen` (650ms, zakres 400–900ms) dla przejść ekranów, `ease-back-out`.
- **Kontrast:** czytelność pytań i odpowiedzi ważniejsza niż ozdoby w tle.

## Komponenty

Import: `import { Button } from "@/components/ui/button";`

### Text (`typography.tsx`)

Propsy: `variant` (`display`, `h1`, `h2`, `h3`, `label`, `body`, `body-sm`, `data`), `tone` (`default`, `secondary`, `muted`, `accent`, `success`, `danger`, `warning`), `asChild`.

```tsx
<Text variant="h2">Choose your mode</Text>
<Text variant="label" tone="accent" asChild>
  <label htmlFor="code">Room code</label>
</Text>
```

### Button (`button.tsx`)

Propsy: `variant` (`default`, `outline`, `secondary`, `destructive`, `ghost`, `link`), `size` (`default`, `lg`, `sm`, `icon`), `loading`, `asChild`.

```tsx
<Button>
  <PlusIcon />
  Create room
</Button>
<Button variant="outline" loading={mutation.isPending}>Join room</Button>
```

### Input (`input.tsx`) i Field (`field.tsx`)

Części: `Field`, `FieldLabel`, `FieldDescription`, `FieldError`. `FieldError` przyjmuje błędy prosto z TanStack Form.

```tsx
<form.Field
  name="roomCode"
  validators={{ onBlur: RoomCodeSchema }}
  children={(field) => (
    <Field>
      <FieldLabel htmlFor={field.name}>Room code</FieldLabel>
      <Input
        id={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={!field.state.meta.isValid}
      />
      <FieldError errors={field.state.meta.errors} />
    </Field>
  )}
/>
```

### Switch (`switch.tsx`)

Radix Switch. Propsy: `checked`, `onCheckedChange`.

```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### AnswerOption (`answer-option.tsx`)

Propsy: `letter`, `state` (`default`, `selected`, `correct`, `wrong`) + propsy przycisku.

```tsx
<AnswerOption letter="B" state="selected" onClick={onSelect}>
  Saturn
</AnswerOption>
```

### Badge (`badge.tsx`)

Propsy: `variant` (`neutral`, `accent`, `success`, `warning`, `danger`).

```tsx
<Badge variant="success">Ready</Badge>
```

### Alert (`alert.tsx`)

Propsy: `variant` (`success`, `danger`, `warning`, `info`), `label` (opcjonalna plakietka).

```tsx
<Alert variant="warning" label="Warning">Timer running low</Alert>
```

### Card (`card.tsx`)

Części: `Card`, `CardHeader`, `CardTitle`, `CardLabel`.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Room rules</CardTitle>
    <CardLabel>Classic</CardLabel>
  </CardHeader>
  ...
</Card>
```

### Timer (`timer.tsx`)

Tylko pokazuje czas, nie odlicza. Propsy: `seconds`, `total` (pasek postępu, opcjonalny), `warningAt` (domyślnie 5).

```tsx
<Timer seconds={8} total={15} />
```

### PlayerSlot (`player-slot.tsx`)

Propsy: `nickname` (bez niego to wolne miejsce), `isHost`, `isReady`, `isConnected`.

```tsx
<PlayerSlot nickname="Phantom" isHost isReady />
<PlayerSlot />
```

### ScoreCard (`score-card.tsx`)

Propsy: `place`, `score`.

```tsx
<ScoreCard place="1st" score={4250} />
```

### ModeCard (`mode-card.tsx`)

Propsy: `title`, `description`, `selected` + propsy przycisku.

```tsx
<ModeCard title="Classic" description="Fast-paced knowledge duel" selected />
```

### GameHeader (`game-header.tsx`)

Logo po lewej, opcjonalna informacja po prawej.

```tsx
<GameHeader>Room / XK92QP</GameHeader>
```

## Do zrobienia

- `ScreenTransition`: przejścia między ekranami (wymaga biblioteki Motion).

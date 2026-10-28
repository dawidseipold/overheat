# Starter

Monorepo full-stack na **Bun Workspaces**: Elysia + React, ze wspólnymi typami i schematami Valibot.

| Warstwa | Technologie |
| --- | --- |
| Runtime / pakiety | Bun |
| Backend (`apps/server`) | Elysia, TypeScript, Valibot, WebSocket |
| Frontend (`apps/web`) | React, Vite, TanStack Router / Query / Form, Tailwind CSS v4, shadcn/ui |
| Współdzielone (`packages/shared`) | schematy Valibot + typy TS |

## Wymagania

[Bun](https://bun.sh) ≥ 1.3

## Start

```bash
bun install
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
bun run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3000/api/health (w dev dostępne też przez proxy Vite: `localhost:5173/api/*`)
- WebSocket: `ws://localhost:5173/api/ws`

## Skrypty (z roota)

| Komenda | Działanie |
| --- | --- |
| `bun run dev` | frontend + backend równolegle |
| `bun run dev:web` / `dev:server` | tylko jedna aplikacja |
| `bun run build` | build obu aplikacji (`apps/*/dist`) |
| `bun run typecheck` | sprawdzenie typów w całym monorepo |

## Struktura

```
apps/
  server/src/
    app.ts       # definicja Elysia + eksport typu App (bez .listen)
    index.ts     # start serwera
    env.ts       # walidacja zmiennych środowiskowych (Valibot)
  web/src/
    routes/      # file-based routing (TanStack Router); routeTree.gen.ts jest generowany
    components/ui/  # komponenty shadcn/ui
    lib/api.ts   # typowany klient Eden Treaty (typy z backendu)
packages/shared/src/schemas.ts   # wspólne schematy Valibot
```

## Jak to działa

- **Wspólne typy:** `import { ChatMessageSchema } from "@app/shared"` działa w obu aplikacjach. Frontend dodatkowo importuje typ `App` z `@app/server` (Eden Treaty), więc wywołania API są w pełni otypowane.
- **Aliasy:** `@/*` → `src/*` w każdej aplikacji (tsconfig + Vite). W `apps/server/src/app.ts` używaj importów względnych, bo ten plik jest współdzielony z frontendem.
- **Zmienne środowiskowe:** `.env` są ignorowane przez git, wzorce w `.env.example`. Zmienne frontendu muszą mieć prefiks `VITE_`.
- **shadcn/ui:** `components.json` jest skonfigurowany, dodawaj komponenty przez `bunx shadcn@latest add <nazwa>` w `apps/web`.

import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { ChatMessageSchema } from "@app/shared";

/**
 * Definicja aplikacji — bez `.listen()`, dzięki czemu frontend może
 * zaimportować typ `App` (Eden Treaty) bez uruchamiania serwera.
 *
 * Uwaga: w tym pliku używaj importów względnych (nie aliasu `@/`),
 * bo jego typy są importowane także przez `apps/web`.
 */
export const app = new Elysia({ prefix: "/api" })
  .use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }))
  .get("/health", () => ({ status: "ok" as const, time: new Date().toISOString() }))
  .post("/echo", ({ body }) => body, { body: ChatMessageSchema })
  .ws("/ws", {
    body: ChatMessageSchema,
    open(ws) {
      ws.subscribe("chat");
    },
    message(ws, message) {
      // Rozgłoś wiadomość do wszystkich (łącznie z nadawcą)
      ws.publish("chat", message);
      ws.send(message);
    },
  });

export type App = typeof app;

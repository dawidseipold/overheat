import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

export const app = new Elysia({ prefix: "/api" })
  .use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }))
  .get("/health", () => ({
    status: "ok" as const,
    time: new Date().toISOString(),
  }));

export type App = typeof app;

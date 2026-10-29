import * as v from "valibot";

const EnvSchema = v.object({
  PORT: v.optional(
    v.pipe(v.string(), v.transform(Number), v.integer(), v.minValue(1)),
    "3000",
  ),
  CORS_ORIGIN: v.optional(v.string(), "http://localhost:5173"),
  SURREAL_URL: v.optional(v.string(), "ws://127.0.0.1:8000/rpc"),
  SURREAL_NAMESPACE: v.optional(v.string(), "app"),
  SURREAL_DATABASE: v.optional(v.string(), "app"),
  SURREAL_USER: v.optional(v.string(), "root"),
  SURREAL_PASS: v.optional(v.string(), "root"),
});

// Bun automatycznie wczytuje apps/server/.env
export const env = v.parse(EnvSchema, process.env);

import * as v from "valibot";

const EnvSchema = v.object({
  PORT: v.optional(v.pipe(v.string(), v.transform(Number), v.integer(), v.minValue(1)), "3000"),
  CORS_ORIGIN: v.optional(v.string(), "http://localhost:5173"),
});

// Bun automatycznie wczytuje apps/server/.env
export const env = v.parse(EnvSchema, process.env);

import * as v from "valibot";

/**
 * Współdzielone schematy Valibot + typy wywnioskowane z nich.
 * Importuj w obu aplikacjach: `import { ... } from "@app/shared"`.
 */

export const ChatMessageSchema = v.object({
  user: v.pipe(v.string(), v.minLength(1), v.maxLength(32)),
  text: v.pipe(v.string(), v.minLength(1), v.maxLength(500)),
});

export type ChatMessage = v.InferOutput<typeof ChatMessageSchema>;

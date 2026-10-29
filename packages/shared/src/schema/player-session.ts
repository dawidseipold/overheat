import * as v from "valibot";
import { TimestampSchema, UuidSchema } from "./common";

export const PlayerSessionSchema = v.object({
  id: UuidSchema,
  player_id: UuidSchema,
  token_hash: v.pipe(v.string(), v.minLength(1)),
  created_at: TimestampSchema,
  expires_at: TimestampSchema,
});
export type PlayerSession = v.InferOutput<typeof PlayerSessionSchema>;

export const CreatePlayerSessionSchema = v.pick(PlayerSessionSchema, [
  "player_id",
  "token_hash",
  "expires_at",
]);
export type CreatePlayerSession = v.InferOutput<typeof CreatePlayerSessionSchema>;
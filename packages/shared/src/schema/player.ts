import * as v from "valibot";
import { TimestampSchema, UuidSchema } from "./common";

export const PlayerSchema = v.object({
  id: UuidSchema,
  nickname: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(32)),
  created_at: TimestampSchema,
  last_seen_at: TimestampSchema,
});
export type Player = v.InferOutput<typeof PlayerSchema>;

export const CreatePlayerSchema = v.pick(PlayerSchema, ["nickname"]);
export type CreatePlayer = v.InferOutput<typeof CreatePlayerSchema>;
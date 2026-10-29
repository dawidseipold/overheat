import * as v from "valibot";
import { TimestampSchema, UuidSchema } from "./common";

export const RoomSchema = v.object({
  id: UuidSchema,
  code: v.pipe(v.string(), v.minLength(1), v.maxLength(16)),
  host_player_id: UuidSchema,
  created_at: TimestampSchema,
});
export type Room = v.InferOutput<typeof RoomSchema>;

export const CreateRoomSchema = v.pick(RoomSchema, ["code", "host_player_id"]);
export type CreateRoom = v.InferOutput<typeof CreateRoomSchema>;
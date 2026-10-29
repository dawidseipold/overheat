import * as v from "valibot";
import { TimestampSchema, UuidSchema } from "./common";

export const ConnectionStateSchema = v.picklist(["connected", "disconnected"]);
export type ConnectionState = v.InferOutput<typeof ConnectionStateSchema>;

export const RoomMemberSchema = v.object({
  id: UuidSchema,
  room_id: UuidSchema,
  player_id: UuidSchema,
  joined_at: TimestampSchema,
  connection_state: ConnectionStateSchema,
  disconnected_at: v.nullable(TimestampSchema),
  is_ready: v.boolean(),
});
export type RoomMember = v.InferOutput<typeof RoomMemberSchema>;

export const CreateRoomMemberSchema = v.pick(RoomMemberSchema, ["room_id", "player_id"]);
export type CreateRoomMember = v.InferOutput<typeof CreateRoomMemberSchema>;
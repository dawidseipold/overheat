import {
  CreatePlayerSchema,
  CreatePlayerSessionSchema,
  CreateRoomMemberSchema,
  CreateRoomSchema,
  PlayerSchema,
  PlayerSessionSchema,
  RoomMemberSchema,
  RoomSchema,
} from "@app/shared";
import { createRepo } from "./repo";

export const players = createRepo("player", {
  row: PlayerSchema,
  create: CreatePlayerSchema,
});

export const playerSessions = createRepo("player_session", {
  row: PlayerSessionSchema,
  create: CreatePlayerSessionSchema,
  refs: { player_id: "player" },
});

export const rooms = createRepo("room", {
  row: RoomSchema,
  create: CreateRoomSchema,
  refs: { host_player_id: "player" },
});

export const roomMembers = createRepo("room_member", {
  row: RoomMemberSchema,
  create: CreateRoomMemberSchema,
  refs: { room_id: "room", player_id: "player" },
});
import { api } from "./client"
import type { CreateRoomPayload, CreateSubmissionPayload, Room } from "./interfaces"

export type { CreateRoomPayload, CreateSubmissionPayload, Room, RoomStatus, Player, Challenge, Example } from "./interfaces"

export const rooms = {
  create: (payload: CreateRoomPayload) =>
    api.post<{ roomId: string; hostToken: string }>("/rooms", payload),
  getById: (roomId: string) => api.get<Room>(`/rooms/${roomId}`),
}

export const submissions = {
  create: (payload: CreateSubmissionPayload, mode: "test" | "submit") =>
    api.post(`/submissions?mode=${mode}`, payload),
}

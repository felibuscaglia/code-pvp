import { api } from "./client"
import type { CreateRoomPayload, CreateSubmissionPayload, Room, SubmissionResult } from "./interfaces"

export type { CreateRoomPayload, CreateSubmissionPayload, Room, RoomStatus, Player, Challenge, Example, TestCaseResult, SubmissionResult } from "./interfaces"

export const rooms = {
  create: (payload: CreateRoomPayload) =>
    api.post<{ roomId: string; hostToken: string }>("/rooms", payload),
  getById: (roomId: string) => api.get<Room>(`/rooms/${roomId}`),
}

export const submissions = {
  create: (payload: CreateSubmissionPayload, mode: "test" | "submit") =>
    api.post<SubmissionResult>(`/submissions?mode=${mode}`, payload),
}

import { api } from "./client"

export interface CreateRoomPayload {
  name: string
  mode: "ffa" | "2v2"
  rounds: number
  roundTime: number
  difficulty: string
  languages: string[]
  maxPlayers?: number
  public: boolean
}

export interface Room {
  name: string
  mode: "ffa" | "2v2"
  rounds: number
  roundTime: number
  difficulty: string
  languages: string[]
  maxPlayers?: number
  public: boolean
  players: Map<string, Player>
}

export interface Player {
  id: string
  displayName: string
  avatar: string
}

export const rooms = {
  create: (payload: CreateRoomPayload) =>
    api.post<{ roomId: string }>("/rooms", payload),
  getById: (roomId: string) => api.get<Room>(`/rooms/${roomId}`),
}

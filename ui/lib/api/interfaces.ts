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

export type RoomStatus = "waiting" | "in_progress" | "finished"

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
  status: RoomStatus
}

export interface Player {
  id: string
  displayName: string
  avatar: string
}

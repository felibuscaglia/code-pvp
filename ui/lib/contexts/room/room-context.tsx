"use client"

import { createContext, useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { rooms, type Room, type Player, type Challenge, type RoundResult, type GameResult } from "@/lib/api/services"
import { socket } from "@/lib/api/socket"

export class RoomError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export interface RoomContextValue {
  room: Room | null
  player: Player | null
  challenge: Challenge | null
  roundResult: RoundResult | null
  roundHistory: RoundResult[]
  gameResult: GameResult | null
  isLoading: boolean
}

export const RoomContext = createContext<RoomContextValue | null>(null)

export function RoomProvider({
  roomId,
  children,
}: {
  roomId: string
  children: React.ReactNode
}) {
  const [room, setRoom] = useState<Room | null>(null)
  const [player, setPlayer] = useState<Player | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null)
  const [roundHistory, setRoundHistory] = useState<RoundResult[]>([])
  const [gameResult, setGameResult] = useState<GameResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<RoomError | null>(null)

  useEffect(() => {
    rooms
      .getById(roomId)
      .then(({ data }) => {
        setRoom({ ...data, id: roomId, players: new Map(Object.entries(data.players)) })
      },
      )
      .catch((err) => {
        const status = isAxiosError(err) ? (err.response?.status ?? 500) : 500
        setError(new RoomError(err.message, status))
      })
      .finally(() => setIsLoading(false))
  }, [roomId])

  useEffect(() => {
    // "room-joined" is sent back to the client who just joined.
    // "player-joined" is broadcast to everyone else already in the room.
    // Both funnel into addPlayer so the players map stays in sync for all clients.

    function addPlayer(player: Player) {
      setRoom((prev) => {
        if (!prev) return prev
        const players = new Map(prev.players)
        players.set(player.id, player)
        return { ...prev, players }
      })
    }

    function handlePlayerJoined(player: Player) {
      addPlayer(player)
    }

    function handleRoomJoined({
      player,
      players,
    }: {
      roomId: string
      player: Player
      players: Player[]
    }) {
      setRoom((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          players: new Map(players.map((p) => [p.id, p])),
        }
      })
      setPlayer(player)
    }

    function handlePlayerLeft(playerId: string) {
      setRoom((prev) => {
        if (!prev) return prev
        const players = new Map(prev.players)
        players.delete(playerId)
        return { ...prev, players }
      })
    }

    function handleStartRound({ round, challenge }: { round: number; challenge: Challenge }) {
      setRoundResult(null)
      setRoom((prev) => {
        if (!prev) return prev
        const status = prev.status === "in_progress" ? prev.status : "in_progress" as const
        const rounds = [...prev.rounds, { startedAt: Date.now(), submittedPlayerIds: [] }]
        return { ...prev, status, currentRound: round, rounds }
      })
      setChallenge(challenge)
    }

    function handleEndRound(result: RoundResult) {
      setRoundResult(result)
      setRoundHistory((prev) => [...prev, result])
    }

    function handleEndGame(result: GameResult) {
      setGameResult(result)
      setRoom((prev) => (prev ? { ...prev, status: "finished" as const } : prev))
    }

    function handlePlayerSubmitted({ playerId }: { playerId: string }) {
      setRoom((prev) => {
        if (!prev) return prev
        const rounds = [...prev.rounds]
        const currentRound = rounds[prev.currentRound - 1]
        if (!currentRound) return prev
        rounds[prev.currentRound - 1] = {
          ...currentRound,
          submittedPlayerIds: [...currentRound.submittedPlayerIds, playerId],
        }
        return { ...prev, rounds }
      })
    }

    function handleException(err: { message?: string }) {
      setError(new RoomError(err?.message ?? "Failed to join room", 409))
    }

    socket.on("player-joined", handlePlayerJoined)
    socket.on("room-joined", handleRoomJoined)
    socket.on("player-left", handlePlayerLeft)
    socket.on("start-round", handleStartRound)
    socket.on("player-submitted", handlePlayerSubmitted)
    socket.on("end-round", handleEndRound)
    socket.on("end-game", handleEndGame)
    socket.on("exception", handleException)
    return () => {
      socket.off("player-joined", handlePlayerJoined)
      socket.off("room-joined", handleRoomJoined)
      socket.off("player-left", handlePlayerLeft)
      socket.off("start-round", handleStartRound)
      socket.off("player-submitted", handlePlayerSubmitted)
      socket.off("end-round", handleEndRound)
      socket.off("end-game", handleEndGame)
      socket.off("exception", handleException)
    }
  }, [])

  if (error) throw error

  return (
    <RoomContext.Provider value={{ room, player, challenge, roundResult, roundHistory, gameResult, isLoading }}>
      {children}
    </RoomContext.Provider>
  )
}

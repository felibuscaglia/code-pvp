"use client"

import { createContext, useEffect, useState } from "react"
import { isAxiosError } from "axios"
import { rooms, type Room, type Player } from "@/lib/api/services"
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<RoomError | null>(null)

  useEffect(() => {
    rooms
      .getById(roomId)
      .then((res) => setRoom({ ...res.data, players: new Map() }))
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

    function handleRoomJoined({ player }: { roomId: string; player: Player }) {
      addPlayer(player)
    }

    socket.on("player-joined", handlePlayerJoined)
    socket.on("room-joined", handleRoomJoined)
    return () => {
      socket.off("player-joined", handlePlayerJoined)
      socket.off("room-joined", handleRoomJoined)
    }
  }, [])

  if (error) throw error

  return (
    <RoomContext.Provider value={{ room, isLoading }}>
      {children}
    </RoomContext.Provider>
  )
}

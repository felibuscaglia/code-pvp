"use client"

import { useRoom } from "@/lib/contexts/room"
import { WaitingLobby } from "./waiting-lobby"

interface RoomContentProps {
  roomId: string
}

export function RoomContent({ roomId }: RoomContentProps) {
  const { room, isLoading } = useRoom()

  if (isLoading || !room) return null

  switch (room.status) {
    case "waiting":
      return <WaitingLobby roomId={roomId} />
    case "in_progress":
      return null
    case "finished":
      return null
  }
}

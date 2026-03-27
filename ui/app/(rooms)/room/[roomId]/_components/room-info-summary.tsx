"use client"

import { useRoom } from "@/lib/contexts/room"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { RotateCw, Timer, Signal } from "lucide-react"
import { RoomPlayers } from "./room-players"

interface RoomInfoSummaryProps {
  roomId: string
}

const difficultyColor: Record<string, string> = {
  easy: "bg-success/15 text-success border-success/25",
  medium: "bg-warning/15 text-warning border-warning/25",
  hard: "bg-danger/15 text-danger border-danger/25",
}

export function RoomInfoSummary({ roomId }: RoomInfoSummaryProps) {
  const { room, isLoading } = useRoom()

  if (isLoading) {
    return (
      <div className="flex items-center gap-4 border-b border-border/50 bg-card/80 px-5 py-3 backdrop-blur-sm">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-24" />
        <div className="ml-auto flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    )
  }

  if (!room) return null

  return (
    <div className="flex items-center gap-4 border-b border-border/50 bg-card/80 px-5 py-3 backdrop-blur-sm">
      <h1 className="max-w-48 truncate font-heading text-sm font-bold">
        {room.name}
      </h1>

      <div className="hidden items-center gap-2 sm:flex">
        <Badge variant="secondary" className="gap-1 text-xs font-normal">
          <RotateCw className="size-3" />
          {room.rounds} {room.rounds === 1 ? "round" : "rounds"}
        </Badge>
        <Badge variant="secondary" className="gap-1 text-xs font-normal">
          <Timer className="size-3" />
          {room.roundTime} min
        </Badge>
        <Badge
          variant="outline"
          className={`text-xs font-medium capitalize ${difficultyColor[room.difficulty] ?? ""}`}
        >
          <Signal className="size-3" />
          {room.difficulty}
        </Badge>
      </div>

      <div className="ml-auto">
        <RoomPlayers />
      </div>
    </div>
  )
}

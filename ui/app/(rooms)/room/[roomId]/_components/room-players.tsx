"use client"

import { useRoom } from "@/lib/contexts/room"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function RoomPlayers() {
  const { room } = useRoom()
  const players = room ? Array.from(room.players.values()) : []

  console.log({ room, players });

  return (
    <AvatarGroup>
      {players.map((player) => (
        <Tooltip key={player.id}>
          <TooltipTrigger asChild>
            <Avatar className="transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-110">
              <AvatarFallback>{player.avatar}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="bottom">{player.displayName}</TooltipContent>
        </Tooltip>
      ))}
    </AvatarGroup>
  )
}

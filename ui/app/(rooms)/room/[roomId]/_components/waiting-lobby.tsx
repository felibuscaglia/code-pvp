import { Users } from "lucide-react"
import { useRoom } from "@/lib/contexts/room"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PlayerSlot } from "./player-slot"
import { CopyRoomLinkButton } from "./copy-room-link-button"
import { StartGameButton } from "./start-game-button"

interface WaitingLobbyProps {
  roomId: string
}

export function WaitingLobby({ roomId }: WaitingLobbyProps) {
  const { room } = useRoom()

  if (!room) return null

  const players = Array.from(room.players.values())
  const totalSlots = room.mode === "2v2" ? 4 : (room.maxPlayers ?? 8)
  const emptySlots = Math.max(0, totalSlots - players.length)
  const hasEnoughPlayers = players.length >= 2

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-2xl font-bold">{room.name}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />
          <span>
            {players.length} / {totalSlots} players
          </span>
          <Badge variant="secondary">Waiting</Badge>
        </div>
      </div>

      <Separator className="max-w-sm" />

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Players in lobby</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {players.map((player) => (
            <PlayerSlot key={player.id} player={player} />
          ))}
          {Array.from({ length: emptySlots }).map((_, i) => (
            <PlayerSlot key={`empty-${i}`} />
          ))}
        </div>
      </div>

      <Separator className="max-w-sm" />

      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Share this room so others can join
        </p>
        <CopyRoomLinkButton />
      </div>

      <div className="flex flex-col items-center gap-2">
        <StartGameButton roomId={roomId} disabled={!hasEnoughPlayers} />
        {!hasEnoughPlayers && (
          <p className="text-xs text-muted-foreground">
            At least 2 players needed to start
          </p>
        )}
      </div>
    </div>
  )
}

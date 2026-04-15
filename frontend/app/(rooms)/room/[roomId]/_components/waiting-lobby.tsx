import { Users } from "lucide-react"
import { useRoom } from "@/lib/contexts/room"
import { Badge } from "@/components/ui/badge"
import { PlayerSlot } from "./player-slot"
import { CopyRoomLinkButton } from "./copy-room-link-button"
import { StartGameButton } from "./start-game-button"
import { ChatPanel } from "./chat-panel"

interface WaitingLobbyProps {
  roomId: string
}

export function WaitingLobby({ roomId }: WaitingLobbyProps) {
  const { room, player } = useRoom()

  if (!room) return null

  const players = Array.from(room.players.values())
  const totalSlots = room.maxPlayers ?? 8
  const emptySlots = Math.max(0, totalSlots - players.length)
  const hasEnoughPlayers = players.length >= 1

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left column — Players & controls */}
      <div className="flex flex-1 flex-col overflow-y-auto p-6 lg:p-8">
        {/* Room title and status */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-xl font-bold">{room.name}</h2>
            {hasEnoughPlayers ? (
              <Badge className="bg-success/15 text-success border-success/25 gap-1.5">
                <span className="inline-block size-1.5 rounded-full bg-success animate-pulse" />
                Ready
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1.5">
                <span className="dot-pulse inline-flex gap-0.5">
                  <span className="inline-block size-1 rounded-full bg-muted-foreground" />
                  <span className="inline-block size-1 rounded-full bg-muted-foreground" />
                  <span className="inline-block size-1 rounded-full bg-muted-foreground" />
                </span>
                Waiting for players
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>
              {players.length} / {totalSlots} players
            </span>
          </div>
        </div>

        {/* Player grid */}
        <div className="mb-8">
          <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
            Players in lobby
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {players.map((p) => (
              <PlayerSlot
                key={p.id}
                player={p}
                isCurrentPlayer={p.id === player?.id}
              />
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <PlayerSlot key={`empty-slot-${i}`} />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-border/50">
          <div className="flex flex-wrap items-center gap-3">
            <CopyRoomLinkButton />
            {player?.isHost && (
              <StartGameButton roomId={roomId} disabled={!hasEnoughPlayers} />
            )}
          </div>
        </div>
      </div>

      {/* Right column — Chat */}
      <div className="hidden w-80 flex-shrink-0 border-l border-border/50 lg:flex lg:w-96">
        <ChatPanel />
      </div>
    </div>
  )
}

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Player } from "@/lib/api/services"

interface PlayerSlotProps {
  player?: Player
}

export function PlayerSlot({ player }: PlayerSlotProps) {
  if (!player) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="lg"
          className="border-2 border-dashed border-muted-foreground/30"
        >
          <AvatarFallback className="bg-transparent text-lg text-muted-foreground/30">
            ?
          </AvatarFallback>
        </Avatar>
        <span className="text-xs text-muted-foreground/50">Empty</span>
      </div>
    )
  }

  return (
    <div className="flex animate-in flex-col items-center gap-2 duration-300 fade-in slide-in-from-bottom-2">
      <Avatar size="lg">
        <AvatarFallback className="text-lg">{player.avatar}</AvatarFallback>
      </Avatar>
      <span className="max-w-[80px] truncate text-xs font-medium text-foreground">
        {player.displayName}
      </span>
    </div>
  )
}

import { Play } from "lucide-react"
import { socket } from "@/lib/api/socket"
import { Button } from "@/components/ui/button"

interface StartGameButtonProps {
  roomId: string
  disabled: boolean
}

export function StartGameButton({ roomId, disabled }: StartGameButtonProps) {
  function handleStart() {
    socket.emit("start-game", { roomId })
  }

  return (
    <Button size="lg" disabled={disabled} onClick={handleStart}>
      <Play className="size-4" />
      Start Game
    </Button>
  )
}

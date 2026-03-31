"use client"

import { useState } from "react"
import { Play, Loader2 } from "lucide-react"
import { socket } from "@/lib/api/socket"
import { Button } from "@/components/ui/button"

interface StartGameButtonProps {
  roomId: string
  disabled: boolean
}

export function StartGameButton({ roomId, disabled }: StartGameButtonProps) {
  const [isStarting, setIsStarting] = useState(false)

  function handleStart() {
    setIsStarting(true)
    socket.emit("start-game", { roomId })
  }

  return (
    <Button
      size="lg"
      disabled={disabled || isStarting}
      onClick={handleStart}
      className={!disabled && !isStarting ? "glow-primary animate-pulse-glow" : ""}
      style={{ cursor: 'pointer' }}
    >
      {isStarting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Play className="size-4" />
      )}
      {isStarting ? "Starting..." : "Start Game"}
    </Button>
  )
}

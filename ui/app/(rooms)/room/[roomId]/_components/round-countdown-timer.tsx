"use client"

import { useState, useEffect, useCallback } from "react"
import { Timer, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { socket } from "@/lib/api/socket"

const AUTO_ADVANCE_SECONDS = 60

interface RoundCountdownTimerProps {
  isHost: boolean
  roomId: string
}

export function RoundCountdownTimer({ isHost, roomId }: RoundCountdownTimerProps) {
  const [remaining, setRemaining] = useState(AUTO_ADVANCE_SECONDS)
  const [advanced, setAdvanced] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNextRound = useCallback(() => {
    socket.emit("start-game", { roomId })
    setAdvanced(true)
  }, [roomId])

  if (advanced) return null

  return (
    <div className="flex flex-col items-center gap-3">
      {isHost && (
        <Button onClick={handleNextRound} className="gap-2 animate-pulse-glow">
          Next Round
          <ChevronRight className="size-4" />
        </Button>
      )}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Timer className="size-3.5" />
        <span>
          Next round in{" "}
          <span className="font-mono font-semibold text-foreground tabular-nums">
            {remaining}s
          </span>
        </span>
      </div>
    </div>
  )
}

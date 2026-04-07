"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { Trophy, CheckCircle, Cpu, Gauge, HardDrive, FileCode } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRoom } from "@/lib/contexts/room"
import { RoundCountdownTimer } from "./round-countdown-timer"

export function RoundResultsScreen() {
  const { room, player, roundResult } = useRoom()
  const confettiFired = useRef(false)

  const isWinner = player?.id === roundResult?.winner
  const isHost = player?.isHost ?? false
  const isLastRound = room ? room.currentRound >= room.roundCount : false

  useEffect(() => {
    if (!isWinner || confettiFired.current) return
    confettiFired.current = true

    const end = Date.now() + 2000

    function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#fbbf24", "#f59e0b", "#d97706"],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    frame()
  }, [isWinner])

  useEffect(() => {
    confettiFired.current = false
  }, [roundResult])

  if (!room || !roundResult) return null

  const ranked = Object.entries(roundResult.scores)
    .map(([playerId, score]) => {
      const p = room.players.get(playerId)
      return {
        playerId,
        displayName: p?.displayName ?? "Unknown",
        avatar: p?.avatar ?? "?",
        score,
      }
    })
    .sort((a, b) => b.score.total - a.score.total)

  const winner = ranked[0]

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-8">
      {/* Winner highlight */}
      <div className="mb-8 flex animate-fade-in-up flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-3 animate-pulse rounded-full bg-amber-400/20 blur-xl" />
          <Avatar size="lg" className="relative ring-4 ring-amber-400/60">
            <AvatarFallback className="text-2xl">{winner.avatar}</AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-amber-400 shadow-lg">
            <Trophy className="size-3.5 text-amber-900" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-bold text-amber-400">{winner.displayName}</span>
          <span className="text-sm text-muted-foreground">
            Round {room.currentRound} Winner
          </span>
          <span className="font-mono text-2xl font-bold text-foreground tabular-nums">
            {winner.score.total.toFixed(0)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">pts</span>
          </span>
        </div>
      </div>

      {/* Leaderboard table */}
      <div className="w-full max-w-4xl animate-fade-in-up rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm [animation-delay:200ms]">
        <div className="border-b border-border/50 px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">
            Round {room.currentRound} Leaderboard
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle className="size-3.5" />
                  <span>Pass Rate</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Cpu className="size-3.5" />
                  <span>Time</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Gauge className="size-3.5" />
                  <span>Speed</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <HardDrive className="size-3.5" />
                  <span>Memory</span>
                </div>
              </TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <FileCode className="size-3.5" />
                  <span>Length</span>
                </div>
              </TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ranked.map((entry, rank) => {
              const isFirst = rank === 0
              const isMe = entry.playerId === player?.id
              return (
                <TableRow
                  key={entry.playerId}
                  className={
                    isFirst
                      ? "bg-amber-400/5 hover:bg-amber-400/10"
                      : isMe
                        ? "bg-success/5 hover:bg-success/10"
                        : ""
                  }
                >
                  <TableCell className="text-center">
                    {isFirst ? (
                      <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-400/20 text-xs font-bold text-amber-400">
                        1
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">{rank + 1}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className={isFirst ? "ring-2 ring-amber-400/50" : ""}>
                        <AvatarFallback>{entry.avatar}</AvatarFallback>
                      </Avatar>
                      <span
                        className={`text-sm font-medium ${isFirst ? "text-amber-400" : "text-foreground"}`}
                      >
                        {entry.displayName}
                      </span>
                      {isMe && <span className="text-[10px] text-success">(You)</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono text-sm tabular-nums ${isFirst ? "text-amber-300" : "text-muted-foreground"}`}>
                      {entry.score.passRate.toFixed(0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono text-sm tabular-nums ${isFirst ? "text-amber-300" : "text-muted-foreground"}`}>
                      {entry.score.timeScore.toFixed(0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono text-sm tabular-nums ${isFirst ? "text-amber-300" : "text-muted-foreground"}`}>
                      {entry.score.speedScore.toFixed(0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono text-sm tabular-nums ${isFirst ? "text-amber-300" : "text-muted-foreground"}`}>
                      {entry.score.memoryScore.toFixed(0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-mono text-sm tabular-nums ${isFirst ? "text-amber-300" : "text-muted-foreground"}`}>
                      {entry.score.lengthScore.toFixed(0)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-mono text-sm font-bold tabular-nums ${isFirst ? "text-amber-400" : "text-foreground"}`}
                    >
                      {entry.score.total.toFixed(0)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Next round countdown */}
      {!isLastRound && (
        <div className="mt-8 animate-fade-in-up [animation-delay:400ms]">
          <RoundCountdownTimer isHost={isHost} roomId={room.id} />
        </div>
      )}
    </div>
  )
}

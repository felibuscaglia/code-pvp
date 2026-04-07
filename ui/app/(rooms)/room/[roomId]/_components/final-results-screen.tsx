"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef } from "react"
import confetti from "canvas-confetti"
import { Crown, Ghost, Home, Medal, Trophy } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRoom } from "@/lib/contexts/room"
import { RoundBreakdownList } from "./round-breakdown-list"
import { ScoreTrajectoryChart } from "./score-trajectory-chart"

const PODIUM_ORDER = [1, 0, 2] as const

const PODIUM_STYLES = [
  {
    text: "text-amber-400",
    ring: "ring-amber-400/60",
    border: "border-amber-400",
    gradient: "from-amber-400/30 to-amber-400/0",
    height: "h-40",
  },
  {
    text: "text-slate-300",
    ring: "ring-slate-300/60",
    border: "border-slate-300",
    gradient: "from-slate-300/30 to-slate-300/0",
    height: "h-32",
  },
  {
    text: "text-orange-500",
    ring: "ring-orange-500/60",
    border: "border-orange-500",
    gradient: "from-orange-500/30 to-orange-500/0",
    height: "h-24",
  },
] as const

export function FinalResultsScreen() {
  const { room, player, gameResult, roundHistory } = useRoom()
  const confettiFired = useRef(false)

  const isWinner = !!gameResult && player?.id === gameResult.winner

  useEffect(() => {
    if (!isWinner || confettiFired.current) return
    confettiFired.current = true

    const end = Date.now() + 4000

    function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ["#fbbf24", "#f59e0b", "#d97706", "#fde68a"],
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ["#fbbf24", "#f59e0b", "#d97706", "#fde68a"],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }

    frame()
  }, [isWinner])

  const stats = useMemo(() => {
    if (!room || !gameResult) return []
    return gameResult.standings.map(({ playerId, total }) => {
      const p = room.players.get(playerId)
      let roundsWon = 0
      let bestRoundScore = 0
      for (const round of roundHistory) {
        if (round.winner === playerId) roundsWon++
        const s = round.scores[playerId]?.total ?? 0
        if (s > bestRoundScore) bestRoundScore = s
      }
      return {
        playerId,
        displayName: p?.displayName ?? "Unknown",
        avatar: p?.avatar ?? "?",
        total,
        roundsWon,
        bestRoundScore,
      }
    })
  }, [room, gameResult, roundHistory])

  if (!room || !gameResult) return null

  const hasWinner = gameResult.winner !== null
  const podiumPlayers = stats.slice(0, 3)

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 py-10">
      <div className="mb-2 flex animate-fade-in-up flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <Trophy className="size-3.5 text-amber-400" />
          <span>Session Summary</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">{room.name}</h1>
      </div>

      {!hasWinner && (
        <div className="mb-8 mt-8 flex animate-fade-in-up flex-col items-center gap-3 [animation-delay:150ms]">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-muted-foreground/10 blur-xl" />
            <Avatar size="lg" className="relative ring-4 ring-muted-foreground/30">
              <AvatarFallback className="text-2xl">
                <Ghost className="size-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-muted-foreground">No winner</span>
            <span className="text-sm text-muted-foreground">
              Nobody scored points this session
            </span>
          </div>
        </div>
      )}

      {/* Podium */}
      {hasWinner && (
      <div className="mb-12 mt-8 flex w-full max-w-3xl animate-fade-in-up items-end justify-center gap-6 [animation-delay:150ms]">
        {PODIUM_ORDER.map((rank) => {
          const entry = podiumPlayers[rank]
          if (!entry) return <div key={`podium-empty-${rank}`} className="w-28" />
          const styles = PODIUM_STYLES[rank]
          const isFirst = rank === 0
          const isMe = entry.playerId === player?.id
          return (
            <div key={entry.playerId} className="flex w-28 flex-col items-center gap-3">
              <div className="relative">
                {isFirst && (
                  <Crown className="absolute -top-7 left-1/2 size-6 -translate-x-1/2 animate-bounce text-amber-400" />
                )}
                {isFirst && (
                  <div className="absolute -inset-3 animate-pulse rounded-full bg-amber-400/20 blur-xl" />
                )}
                <Avatar
                  size={isFirst ? "lg" : "default"}
                  className={`relative ring-4 ${styles.ring}`}
                >
                  <AvatarFallback className={isFirst ? "text-2xl" : "text-lg"}>
                    {entry.avatar}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className={`text-sm font-semibold ${styles.text}`}>
                  {entry.displayName}
                  {isMe && <span className="ml-1 text-[10px] text-success">(You)</span>}
                </span>
                <span className="font-mono text-xl font-bold text-foreground tabular-nums">
                  {(entry.total * 100).toFixed(1)}
                </span>
              </div>
              <div
                className={`flex w-full flex-col items-center justify-start rounded-t-lg bg-gradient-to-t ${styles.gradient} ${styles.height} border-t-2 ${styles.border} pt-2`}
              >
                <span className={`text-2xl font-black ${styles.text}`}>{rank + 1}</span>
              </div>
            </div>
          )
        })}
      </div>
      )}

      {/* Session leaderboard */}
      <div className="mb-10 w-full max-w-4xl animate-fade-in-up rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm [animation-delay:300ms]">
        <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
          <Medal className="size-3.5 text-amber-400" />
          <h2 className="text-sm font-semibold text-foreground">Final Standings</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">#</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-center">Rounds Won</TableHead>
              <TableHead className="text-center">Best Round</TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((entry, rank) => {
              const isFirst = rank === 0 && hasWinner
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
                    <span className="font-mono text-sm tabular-nums text-foreground">
                      {entry.roundsWon}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-mono text-sm tabular-nums text-muted-foreground">
                      {(entry.bestRoundScore * 100).toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-mono text-sm font-bold tabular-nums ${isFirst ? "text-amber-400" : "text-foreground"}`}
                    >
                      {(entry.total * 100).toFixed(1)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Performance chart */}
      <div className="mb-10 w-full max-w-4xl animate-fade-in-up [animation-delay:450ms]">
        <ScoreTrajectoryChart />
      </div>

      {/* Round-by-round breakdown */}
      <div className="mb-10 w-full max-w-4xl animate-fade-in-up [animation-delay:550ms]">
        <RoundBreakdownList />
      </div>

      {/* Back to home */}
      <div className="animate-fade-in-up [animation-delay:650ms]">
        <Button asChild size="lg" className="gap-2">
          <Link href="/">
            <Home className="size-4" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  )
}

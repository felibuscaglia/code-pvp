"use client"

import { useRoom } from "@/lib/contexts/room"
import { Skeleton } from "@/components/ui/skeleton"
import { WaitingLobby } from "./waiting-lobby"
import { ArenaView } from "./arena-view"
import { RoundResultsScreen } from "./round-results-screen"
import { FinalResultsScreen } from "./final-results-screen"

interface RoomContentProps {
  roomId: string
}

function LobbySkeleton() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="mb-4 h-3 w-28" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={`skel-slot-${i}`} className="h-28 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="hidden w-80 border-l border-border/50 lg:block lg:w-96">
        <div className="p-4">
          <Skeleton className="mb-4 h-3 w-12" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={`skel-msg-${i}`} className="h-8 w-3/4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function RoomContent({ roomId }: RoomContentProps) {
  const { room, roundResult, gameResult, isLoading } = useRoom()

  if (isLoading || !room) return <LobbySkeleton />

  if (gameResult) return <FinalResultsScreen />

  console.log({ roundResult });

  if (roundResult) return <RoundResultsScreen />

  switch (room.status) {
    case "waiting":
      return <WaitingLobby roomId={roomId} />
    case "in_progress":
      return <ArenaView />
    case "finished":
      return <FinalResultsScreen />
  }
}

"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { socket } from "@/lib/api/socket"
import { useRoom } from "@/lib/contexts/room"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const AVATARS = [
  { id: "ninja", emoji: "\u{1F977}", label: "Ninja" },
  { id: "robot", emoji: "\u{1F916}", label: "Robot" },
  { id: "alien", emoji: "\u{1F47E}", label: "Alien" },
  { id: "wizard", emoji: "\u{1F9D9}", label: "Wizard" },
  { id: "astronaut", emoji: "\u{1F9D1}\u200D\u{1F680}", label: "Astronaut" },
  { id: "hacker", emoji: "\u{1F468}\u200D\u{1F4BB}", label: "Hacker" },
  { id: "pirate", emoji: "\u{1F3F4}\u200D\u2620\uFE0F", label: "Pirate" },
  { id: "dragon", emoji: "\u{1F432}", label: "Dragon" },
  { id: "ghost", emoji: "\u{1F47B}", label: "Ghost" },
] as const

interface JoinRoomModalProps {
  roomId: string
}

export function JoinRoomModal({ roomId }: JoinRoomModalProps) {
  const { room, player } = useRoom()
  const [displayName, setDisplayName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [isJoining, setIsJoining] = useState(false)
  const [open, setOpen] = useState(true)

  const canJoin =
    displayName.trim().length > 0 && selectedAvatar !== null && !isJoining

  useEffect(() => {
    if (player) setOpen(false)
  }, [player])

  function handleJoin() {
    if (!canJoin) return

    const avatar = AVATARS.find((a) => a.id === selectedAvatar)!.emoji
    const hostToken = sessionStorage.getItem(`hostToken:${roomId}`)

    setIsJoining(true)
    socket.connect()
    socket.emit("join-room", {
      roomId,
      displayName: displayName.trim(),
      avatar,
      ...(hostToken && { hostToken }),
    })
  }

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Enter the Arena
          </DialogTitle>
          <DialogDescription>
            {room?.name
              ? `Joining "${room.name}". Pick a name and avatar.`
              : "Pick a name and avatar before joining the room."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 pt-2">
          <fieldset className="flex flex-col gap-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              placeholder="e.g. Neo"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={20}
              className="h-9"
              autoFocus
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <Label>Choose your avatar</Label>
            <div className="grid grid-cols-3 gap-2">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all hover:bg-accent/10 ${
                    selectedAvatar === avatar.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30 scale-[1.02] glow-primary"
                      : "border-border/50"
                  }`}
                >
                  <span
                    className="text-3xl"
                    role="img"
                    aria-label={avatar.label}
                  >
                    {avatar.emoji}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {avatar.label}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <Button
            size="lg"
            disabled={!canJoin}
            onClick={handleJoin}
            className={`w-full ${canJoin ? "glow-primary" : ""}`}
          >
            {isJoining ? (
              <>
                Entering the arena
                <Loader2 data-icon="inline-end" className="animate-spin" />
              </>
            ) : (
              <>
                Join Battle
                <ArrowRight data-icon="inline-end" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

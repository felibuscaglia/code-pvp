"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { socket } from "@/lib/api/socket"
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
] as const

interface JoinRoomModalProps {
  roomId: string
}

export function JoinRoomModal({ roomId }: JoinRoomModalProps) {
  const [displayName, setDisplayName] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [open, setOpen] = useState(true)

  const canJoin = displayName.trim().length > 0 && selectedAvatar !== null

  function handleJoin() {
    if (!canJoin) return

    const avatar = AVATARS.find((a) => a.id === selectedAvatar)!.emoji

    socket.connect()
    socket.emit("join-room", {
      roomId,
      displayName: displayName.trim(),
      avatar,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <DialogContent
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Welcome to the arena
          </DialogTitle>
          <DialogDescription>
            Pick a name and avatar before joining the room.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 pt-2">
          <fieldset className="flex flex-col gap-2">
            <Label htmlFor="display-name">Display name</Label>
            <Input
              id="display-name"
              placeholder="e.g. ByteSlayer"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={20}
              className="h-9"
              autoFocus
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <Label>Choose your avatar</Label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar.id}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition-all hover:bg-accent/10 ${
                    selectedAvatar === avatar.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                      : "border-border/50"
                  }`}
                >
                  <span
                    className="text-2xl"
                    role="img"
                    aria-label={avatar.label}
                  >
                    {avatar.emoji}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
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
            className="w-full"
          >
            Join Room
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

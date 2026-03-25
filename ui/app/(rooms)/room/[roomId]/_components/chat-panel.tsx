"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, Send } from "lucide-react"
import { socket } from "@/lib/api/socket"
import { useRoom } from "@/lib/contexts/room"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  playerName: string
  message: string
  timestamp: number
  error?: boolean
}

export function ChatPanel() {
  const { room, player } = useRoom()
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (msg: Message) => setMessages((prev) => [...prev, msg])

    socket.on("new-message", handler)
    return () => {
      socket.off("new-message", handler)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!room || !player) return null

  function send() {
    const text = draft.trim()
    if (!text || !player) return

    const msg: Message = {
      playerName: player.displayName,
      message: text,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, msg])
    setDraft("")

    socket.timeout(5000).emit(
      "send-message",
      {
        roomId: room!.id,
        message: text,
        playerName: player.displayName,
      },
      (err: Error | null) => {
        if (err) {
          setMessages((prev) =>
            prev.map((m) => (m === msg ? { ...m, error: true } : m)),
          )
        }
      },
    )
  }

  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border h-64">
      <ScrollArea className="flex-1 p-3">
        {messages.map((m, i) => (
          <div key={`message-${i}`} className="mb-1 flex items-center gap-1 text-sm">
            <span className="font-semibold">{m.playerName}: </span>
            <span className="text-muted-foreground">{m.message}</span>
            {m.error && (
              <AlertCircle className="size-3 shrink-0 text-destructive" />
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </ScrollArea>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="flex items-center gap-2 border-t p-2"
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message…"
          className="flex-1"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  )
}

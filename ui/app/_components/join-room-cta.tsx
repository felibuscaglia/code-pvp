"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function JoinRoomCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    // TODO: Navigate to room with invite code
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={() => setIsOpen(true)}
      >
        Join Room
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <div className="relative">
        <Input
          ref={inputRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste invite code or link"
          className="h-9 w-56 pr-8"
        />
        <button
          type="button"
          onClick={() => {
            setIsOpen(false)
            setCode("")
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Cancel"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <Button type="submit" size="lg" disabled={!code.trim()}>
        Join
        <ArrowRight data-icon="inline-end" />
      </Button>
    </form>
  )
}

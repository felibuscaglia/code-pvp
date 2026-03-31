"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowRight, Plus, Users, Globe, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

export function HeroActions() {
  const [joinOpen, setJoinOpen] = useState(false)
  const [code, setCode] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (joinOpen) {
      inputRef.current?.focus()
    }
  }, [joinOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      {/* Primary action */}
      <Button size="lg" className="glow-primary h-12 w-full text-sm" asChild>
        <Link href="/create">
          <Plus className="size-4" />
          Create Room
        </Link>
      </Button>

      <div className="flex gap-3">
        {/* Join action */}
        {!joinOpen ? (
          <Button
            variant="outline"
            size="lg"
            className="h-12 flex-1 text-sm"
            onClick={() => setJoinOpen(true)}
          >
            <Users className="size-4" />
            Join Room
          </Button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 overflow-hidden rounded-lg border border-border bg-background"
          >
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste invite code or link"
                className="h-12 rounded-none border-0 px-4 text-sm shadow-none focus-visible:ring-0"
              />
              <button
                type="button"
                onClick={() => {
                  setJoinOpen(false)
                  setCode("")
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Cancel"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={!code.trim()}
              className="h-12 rounded-l-none"
            >
              Join
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>
        )}

        {/* Browse action */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="h-12 flex-1 text-sm"
              disabled
            >
              <Globe className="size-4" />
              Browse Rooms
            </Button>
          </TooltipTrigger>
          <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

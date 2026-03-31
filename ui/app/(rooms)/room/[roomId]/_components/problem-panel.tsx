"use client"

import Markdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Circle } from "lucide-react"
import { CountdownTimer } from "./countdown-timer"
import { useRoom } from "@/lib/contexts/room"

const DIFFICULTY_STYLES = {
  easy: "bg-success/15 text-success border-success/25",
  medium: "bg-warning/15 text-warning border-warning/25",
  hard: "bg-danger/15 text-danger border-danger/25",
}

export function ProblemPanel() {
  const { room, challenge } = useRoom()

  if (!room || !challenge) return null

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-3">
        <h2 className="font-heading text-base font-bold">{challenge.title}</h2>
        <CountdownTimer totalSeconds={room.roundTime * 60} />
      </div>

      {/* Body */}
      <ScrollArea className="flex-1">
        <div className="p-5 pb-8">
          {/* Description */}
          <Markdown
            components={{
              p: ({ children }) => (
                <p className="mb-4 text-sm leading-relaxed text-foreground/90 last:mb-0">
                  {children}
                </p>
              ),
              code: ({ children }) => (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[13px] text-primary">
                  {children}
                </code>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
            }}
          >
            {challenge.description}
          </Markdown>

          <Separator className="my-6" />

          {/* Examples */}
          <div className="space-y-4">
            {challenge.examples.map((example, idx) => (
              <div
                key={example.id}
                className="overflow-hidden rounded-lg border border-border/50 bg-muted/30"
              >
                <div className="border-b border-border/30 px-4 py-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Example {idx + 1}
                  </span>
                </div>
                <div className="space-y-2 px-4 py-3 font-mono text-[13px]">
                  <div className="flex gap-2">
                    <span className="shrink-0 text-muted-foreground">Input:</span>
                    <span className="text-foreground">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="shrink-0 text-muted-foreground">Output:</span>
                    <span className="font-semibold text-primary">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="flex gap-2 pt-1 text-muted-foreground">
                      <span className="shrink-0">Note:</span>
                      <span className="italic">{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {challenge.constraints && challenge.constraints.length > 0 && (
            <>
              <Separator className="my-6" />

              {/* Constraints */}
              <div>
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Constraints
                </h3>
                <ul className="space-y-1.5">
                  {challenge.constraints.map((constraint) => (
                    <li
                      key={constraint}
                      className="flex items-start gap-2 font-mono text-[13px] text-foreground/80"
                    >
                      <span className="mt-1.5 block size-1 shrink-0 rounded-full bg-muted-foreground/50" />
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

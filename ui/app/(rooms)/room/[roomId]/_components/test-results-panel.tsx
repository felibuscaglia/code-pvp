"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useRoom } from "@/lib/contexts/room"

export function TestResultsPanel() {
  const { challenge } = useRoom()
  const testCases = challenge?.test_cases.public ?? []

  return (
    <div className="flex h-full flex-col border-t border-border/50">
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Test Cases
        </span>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {testCases.map((tc, idx) => (
            <div
              key={`tc-${idx}`}
              className="rounded-md border border-border/30 bg-muted/20 p-2.5"
            >
              <span className="text-xs font-medium">Case {idx + 1}</span>
              <div className="mt-2 space-y-1">
                <div className="rounded bg-background/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground/50">Input: </span>
                  {JSON.stringify(tc.input)}
                </div>
                <div className="rounded bg-background/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground/50">Expected: </span>
                  {JSON.stringify(tc.expected)}
                </div>
              </div>
            </div>
          ))}
          {testCases.length === 0 && (
            <p className="py-4 text-center text-xs text-muted-foreground">
              No test cases available
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

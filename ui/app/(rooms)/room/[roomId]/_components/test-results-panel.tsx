"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useRoom } from "@/lib/contexts/room"
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { formatValue } from "@/lib/formatters"
import type { TestCaseResult } from "@/lib/api/services"

interface TestResultsPanelProps {
  results: TestCaseResult[] | null
  isRunning: boolean
}

export function TestResultsPanel({ results, isRunning }: TestResultsPanelProps) {
  const { challenge } = useRoom()
  const testCases = challenge?.test_cases.public ?? []

  const passedCount = results?.filter((r) => r.passed).length ?? 0
  const totalCount = results?.length ?? 0

  return (
    <div className="flex h-full flex-col border-t border-border/50">
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Test Cases
        </span>
        {isRunning && (
          <Skeleton className="h-3 w-20" />
        )}
        {!isRunning && results && (
          <span className="text-xs text-muted-foreground">
            {passedCount}/{totalCount} passed
          </span>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {testCases.map((tc, idx) => {
            const result = results?.find((r) => r.case === idx)

            if (isRunning) {
              return (
                <div
                  key={`tc-${idx}`}
                  className="rounded-md border border-border/30 bg-muted/20 p-2.5"
                >
                  <Skeleton className="h-3 w-16" />
                  <div className="mt-2 space-y-1">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                </div>
              )
            }

            return (
              <div
                key={`tc-${idx}`}
                className="rounded-md border border-border/30 bg-muted/20 p-2.5"
              >
                <div className="flex items-center gap-1.5">
                  {result ? (
                    result.passed ? (
                      <CheckCircle2 className="size-3.5 text-green-500" />
                    ) : (
                      <XCircle className="size-3.5 text-red-500" />
                    )
                  ) : null}
                  <span className="text-xs font-medium">Case {idx + 1}</span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="rounded bg-background/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                    <span className="text-foreground/50">Input: </span>
                    {JSON.stringify(tc.input)}
                  </div>
                  <div className="rounded bg-background/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                    <span className="text-foreground/50">Expected: </span>
                    {formatValue(tc.expected)}
                  </div>
                  {result && (
                    <>
                      <div
                        className={`rounded px-2.5 py-1.5 font-mono text-[11px] ${
                          result.passed
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        <span className="opacity-60">Output: </span>
                        {formatValue(result.result)}
                      </div>
                      {result.error && (
                        <div className="flex items-start gap-1.5 rounded bg-red-500/10 px-2.5 py-1.5 font-mono text-[11px] text-red-400">
                          <AlertTriangle className="mt-0.5 size-3 shrink-0" />
                          <span className="break-all">{result.error}</span>
                        </div>
                      )}
                      {result.logs.length > 0 && (
                        <div className="rounded bg-background/50 px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                          <span className="text-foreground/50">Logs: </span>
                          {result.logs.map((log, logIdx) => (
                            <div key={`log-${idx}-${logIdx}`}>{log}</div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
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

"use client"

import { useEffect, useState } from "react"

export function BattlePreview() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-card/80 shadow-2xl shadow-primary/5 backdrop-blur-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-foreground/15" />
          <div className="size-2 rounded-full bg-foreground/15" />
          <div className="size-2 rounded-full bg-foreground/15" />
        </div>
        <span className="text-[10px] text-muted-foreground/50">
          battle — round 1 of 3
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] font-medium tabular-nums text-warning">
            04:32
          </span>
          <div className="h-1 w-12 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-warning/80 transition-all duration-[1.5s] ease-out"
              style={{ width: mounted ? "62%" : "100%" }}
            />
          </div>
        </div>
      </div>

      {/* Split panel layout */}
      <div className="flex divide-x divide-border/30">
        {/* Problem panel (left) */}
        <div className="flex w-[45%] flex-col gap-2.5 p-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-foreground/90">
              Two Sum
            </span>
            <span className="rounded bg-success/15 px-1.5 py-0.5 text-[9px] font-medium text-success">
              Easy
            </span>
          </div>
          <div className="space-y-1.5 text-[10px] leading-relaxed text-muted-foreground">
            <p>
              Given an array of integers <code className="rounded bg-muted px-1 py-0.5 text-[9px] text-foreground/70">nums</code> and
              an integer <code className="rounded bg-muted px-1 py-0.5 text-[9px] text-foreground/70">target</code>, return
              indices of the two numbers that add up to target.
            </p>
          </div>
          <div className="mt-1 rounded-lg border border-border/40 bg-background/60 p-2.5">
            <div className="text-[9px] font-medium text-muted-foreground/60">
              Example
            </div>
            <div className="mt-1.5 space-y-1 font-mono text-[9px] text-muted-foreground">
              <div>
                <span className="text-foreground/50">Input:</span>{" "}
                [2, 7, 11, 15], 9
              </div>
              <div>
                <span className="text-foreground/50">Output:</span>{" "}
                <span className="text-success">[0, 1]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code editor panel (right) */}
        <div className="flex w-[55%] flex-col">
          {/* Editor toolbar */}
          <div className="flex items-center justify-between border-b border-border/30 px-3 py-1.5">
            <span className="rounded bg-muted/60 px-2 py-0.5 text-[9px] text-muted-foreground">
              JavaScript
            </span>
            <div className="flex gap-1.5">
              <span className="rounded bg-muted/60 px-2 py-0.5 text-[9px] text-muted-foreground">
                Run
              </span>
              <span className="rounded bg-primary/15 px-2 py-0.5 text-[9px] font-medium text-primary">
                Submit
              </span>
            </div>
          </div>

          {/* Code area */}
          <div className="p-3">
            <div className="space-y-0.5 font-mono text-[10px] leading-relaxed">
              <div>
                <span className="text-primary">function</span>{" "}
                <span className="text-foreground/80">twoSum</span>
                <span className="text-muted-foreground">(nums, target) {"{"}</span>
              </div>
              <div className="pl-4">
                <span className="text-primary">const</span>{" "}
                <span className="text-foreground/80">seen</span>{" "}
                <span className="text-muted-foreground">= new Map();</span>
              </div>
              <div className="pl-4">
                <span className="text-primary">for</span>{" "}
                <span className="text-muted-foreground">
                  (const [i, n] of nums.entries()) {"{"}
                </span>
              </div>
              <div className="flex items-center pl-8">
                <span className="text-primary">if</span>{" "}
                <span className="text-muted-foreground">
                  (seen.has(target - n))
                </span>
                <span className="animate-blink ml-0.5 inline-block h-3.5 w-[5px] bg-primary/70" />
              </div>
            </div>
          </div>

          {/* Submission status */}
          <div className="mt-auto flex items-center gap-2 border-t border-border/30 px-3 py-1.5">
            <span className="text-[9px] text-muted-foreground/50">
              1 of 2 submitted
            </span>
            <div className="flex gap-1">
              <span className="size-1.5 rounded-full bg-success/60" />
              <span className="size-1.5 rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

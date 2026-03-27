"use client"

import { Check } from "lucide-react"
import { Label } from "@/components/ui/label"

const DIFFICULTIES = [
  { value: "easy", label: "Easy", color: "border-border/40 bg-card/50 text-muted-foreground hover:border-success/40 hover:bg-success/10 hover:text-success", activeColor: "border-success bg-success/20 text-success ring-2 ring-success/30" },
  { value: "medium", label: "Medium", color: "border-border/40 bg-card/50 text-muted-foreground hover:border-warning/40 hover:bg-warning/10 hover:text-warning", activeColor: "border-warning bg-warning/20 text-warning ring-2 ring-warning/30" },
  { value: "hard", label: "Hard", color: "border-border/40 bg-card/50 text-muted-foreground hover:border-danger/40 hover:bg-danger/10 hover:text-danger", activeColor: "border-danger bg-danger/20 text-danger ring-2 ring-danger/30" },
] as const

interface DifficultySelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function DifficultySelector({ value, onValueChange }: DifficultySelectorProps) {
  return (
    <fieldset className="flex flex-col gap-3">
      <Label>Difficulty</Label>
      <div className="flex gap-2">
        {DIFFICULTIES.map((d) => {
          const isActive = value === d.value
          return (
            <button
              key={d.value}
              type="button"
              onClick={() => onValueChange(d.value)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                isActive ? d.activeColor : d.color
              }`}
            >
              {isActive && <Check className="size-3.5 shrink-0" />}
              {d.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

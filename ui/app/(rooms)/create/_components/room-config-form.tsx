"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Loader2, Globe, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { rooms } from "@/lib/api/services"
import { DifficultySelector } from "./difficulty-selector"
import { LanguageSelector } from "./language-selector"

const ROUND_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1)
const TIME_OPTIONS = [5, 10, 15, 20, 30]
const PLAYER_OPTIONS = [2, 3, 4, 5, 6, 7, 8]

export function RoomConfigForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState("")
  const [rounds, setRounds] = useState(3)
  const [roundTime, setRoundTime] = useState(10)
  const [difficulty, setDifficulty] = useState("medium")
  const [languages, setLanguages] = useState<string[]>(["javascript"])
  const [maxPlayers, setMaxPlayers] = useState(4)
  const [isPublic, setIsPublic] = useState(true)

  function toggleLanguage(lang: string, checked: boolean) {
    setLanguages((prev) =>
      checked ? [...prev, lang] : prev.filter((l) => l !== lang)
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await rooms.create({
        name,
        roundCount: rounds,
        roundTime,
        difficulty,
        languages,
        public: isPublic,
        maxPlayers,
      })
      sessionStorage.setItem(`hostToken:${data.roomId}`, data.hostToken)
      router.push(`/room/${data.roomId}`)
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col divide-y divide-border/40 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm"
    >
      {/* Room name */}
      <div className="px-6 py-5">
        <Label htmlFor="room-name" className="mb-2 block">
          Room name
        </Label>
        <Input
          id="room-name"
          placeholder="e.g. Two Devs One Challenge"
          className="h-10"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Rounds — pill selector */}
      <div className="px-6 py-5">
        <Label className="mb-3 block">Rounds</Label>
        <div className="flex flex-wrap gap-1.5">
          {ROUND_OPTIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRounds(r)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                rounds === r
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Time per round — chip selector */}
      <div className="px-6 py-5">
        <Label className="mb-3 block">Time per round</Label>
        <div className="flex flex-wrap gap-1.5">
          {TIME_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setRoundTime(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                roundTime === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {t} min
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="px-6 py-5">
        <DifficultySelector value={difficulty} onValueChange={setDifficulty} />
      </div>

      {/* Languages */}
      <div className="px-6 py-5">
        <LanguageSelector value={languages} onToggle={toggleLanguage} />
      </div>

      {/* Max players — pill selector */}
      <div className="px-6 py-5">
        <Label className="mb-3 block">Max players</Label>
        <div className="flex flex-wrap gap-1.5">
          {PLAYER_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setMaxPlayers(p)}
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                maxPlayers === p
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Visibility toggle */}
      <div className="px-6 py-5">
        <Label className="mb-3 block">Visibility</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsPublic(true)}
            className={`flex flex-1 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
              isPublic
                ? "border-primary/50 bg-primary/10 ring-2 ring-primary/20"
                : "border-border/50 bg-muted/30 hover:border-border hover:bg-muted/50"
            }`}
          >
            <Globe
              className={`size-4 shrink-0 ${isPublic ? "text-primary" : "text-muted-foreground"}`}
            />
            <div>
              <div
                className={`text-sm font-medium ${isPublic ? "text-foreground" : "text-muted-foreground"}`}
              >
                Public
              </div>
              <div className="text-[11px] text-muted-foreground">
                Anyone can find and join
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setIsPublic(false)}
            className={`flex flex-1 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
              !isPublic
                ? "border-primary/50 bg-primary/10 ring-2 ring-primary/20"
                : "border-border/50 bg-muted/30 hover:border-border hover:bg-muted/50"
            }`}
          >
            <Lock
              className={`size-4 shrink-0 ${!isPublic ? "text-primary" : "text-muted-foreground"}`}
            />
            <div>
              <div
                className={`text-sm font-medium ${!isPublic ? "text-foreground" : "text-muted-foreground"}`}
              >
                Private
              </div>
              <div className="text-[11px] text-muted-foreground">
                Invite link required
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="px-6 py-5">
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className={`h-11 w-full ${!isLoading ? "glow-primary" : ""}`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Create Room
              <ArrowRight data-icon="inline-end" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

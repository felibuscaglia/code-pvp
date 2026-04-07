"use client"

import { useEffect, useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Play, Send, Loader2, Clock } from "lucide-react"
import { ArenaLanguageSelector } from "./arena-language-selector"
import { TestResultsPanel } from "./test-results-panel"
import { SubmissionStatusBar } from "./submission-status-bar"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { SubmissionWaitingDialog } from "./submission-waiting-dialog"
import { useRoom } from "@/lib/contexts/room"
import { useParams } from "next/navigation"
import { submissions, type TestCaseResult } from "@/lib/api/services"
import { socket } from "@/lib/api/socket"

const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python",
}

export function CodeEditorPanel() {
  const { room, challenge } = useRoom()
  const { roomId } = useParams<{ roomId: string }>()
  const starterCode = challenge?.starter_code ?? {}
  const defaultLanguage = room?.languages[0] ?? "javascript"
  const [language, setLanguage] = useState(defaultLanguage)
  const [code, setCode] = useState(starterCode[defaultLanguage] ?? "")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [testResults, setTestResults] = useState<TestCaseResult[] | null>(null)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)

  useEffect(() => {
    if (cooldownSeconds <= 0) return
    const timer = setTimeout(() => setCooldownSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldownSeconds])

  function handleLanguageChange(lang: string) {
    setLanguage(lang)
    setCode(starterCode[lang] ?? "")
  }

  async function handleRunTests() {
    if (!challenge || isRunning || cooldownSeconds > 0) return
    setIsRunning(true)
    try {
      const { data } = await submissions.create(
        { challengeId: challenge.id, language, code, roomId },
        "test",
      )
      setTestResults(data.testCases)
    } catch (error) {
      const response = (error as { response?: { status?: number; headers?: Record<string, string> } }).response
      if (response?.status === 429) {
        const retryAfter = Number(response.headers?.["retry-after"]) || 2
        setCooldownSeconds(retryAfter)
      } else {
        throw error
      }
    } finally {
      setIsRunning(false)
    }
  }

  function handleSubmit() {
    if (!challenge || isSubmitting) return
    setIsSubmitting(true)
    socket.emit("submit-solution", {
      roomId,
      challengeId: challenge.id,
      language,
      code,
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
        <ArenaLanguageSelector value={language} onLanguageChange={handleLanguageChange} />
        <div className="flex items-center gap-2 ml-auto">
          <Tooltip open={cooldownSeconds > 0 ? true : false}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunTests}
                disabled={isRunning || !challenge || cooldownSeconds > 0}
                aria-label={cooldownSeconds > 0 ? `Rate limited, retry in ${cooldownSeconds} seconds` : "Run tests"}
              >
                {isRunning ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : cooldownSeconds > 0 ? (
                  <Clock className="size-3.5" />
                ) : (
                  <Play className="size-3.5" />
                )}
                {cooldownSeconds > 0 ? `Wait ${cooldownSeconds}s` : "Run Tests"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Slow down — too many runs. Try again in {cooldownSeconds}s.
            </TooltipContent>
          </Tooltip>
          <Button size="sm" onClick={handleSubmit} disabled={isSubmitting || !challenge}>
            {isSubmitting ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
            Submit
          </Button>
        </div>
      </div>

      {/* Editor + Test Results (vertically resizable) */}
      <ResizablePanelGroup orientation="vertical" className="flex-1">
        <ResizablePanel defaultSize={65} minSize={30}>
          <Editor
            language={LANGUAGE_MAP[language]}
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              fontSize: 13,
              fontFamily: "var(--font-mono), JetBrains Mono, monospace",
              minimap: { enabled: false },
              lineNumbers: "on",
              tabSize: 2,
              automaticLayout: true,
              scrollBeyondLastLine: false,
              padding: { top: 12, bottom: 12 },
              suggestOnTriggerCharacters: true,
              quickSuggestions: true,
              wordBasedSuggestions: "currentDocument",
              renderLineHighlight: "line",
              cursorBlinking: "smooth",
              smoothScrolling: true,
              bracketPairColorization: { enabled: true },
            }}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35} minSize={15}>
          <TestResultsPanel results={testResults} isRunning={isRunning} />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status bar */}
      <div className="border-t border-border/50 px-3 py-2">
        <SubmissionStatusBar />
      </div>

      <SubmissionWaitingDialog open={isSubmitting} />
    </div>
  )
}

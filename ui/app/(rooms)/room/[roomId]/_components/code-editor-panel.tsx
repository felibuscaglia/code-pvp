"use client"

import { useState } from "react"
import Editor from "@monaco-editor/react"
import { Button } from "@/components/ui/button"
import { Play, Send, Loader2 } from "lucide-react"
import { ArenaLanguageSelector } from "./arena-language-selector"
import { TestResultsPanel } from "./test-results-panel"
import { SubmissionStatusBar } from "./submission-status-bar"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { useRoom } from "@/lib/contexts/room"
import { useParams } from "next/navigation"
import { submissions } from "@/lib/api/services"

const LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  python: "python",
}

export function CodeEditorPanel() {
  const { challenge } = useRoom()
  const { roomId } = useParams<{ roomId: string }>()
  const starterCode = challenge?.starter_code ?? {}
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState(starterCode["javascript"] ?? "")
  const [isRunning, setIsRunning] = useState(false)

  function handleLanguageChange(lang: string) {
    setLanguage(lang)
    setCode(starterCode[lang] ?? "")
  }

  async function handleRunTests() {
    if (!challenge || isRunning) return
    setIsRunning(true)
    try {
      await submissions.create(
        { challengeId: challenge.id, language, code, roomId },
        "test",
      )
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-border/50 px-3 py-2">
        <ArenaLanguageSelector onLanguageChange={handleLanguageChange} />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRunTests} disabled={isRunning || !challenge}>
            {isRunning ? <Loader2 className="size-3.5 animate-spin" /> : <Play className="size-3.5" />}
            Run Tests
          </Button>
          <Button size="sm">
            <Send className="size-3.5" />
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
          <TestResultsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Status bar */}
      <div className="border-t border-border/50 px-3 py-2">
        <SubmissionStatusBar submitted={3} total={6} />
      </div>
    </div>
  )
}

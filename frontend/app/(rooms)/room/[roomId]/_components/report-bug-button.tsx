"use client"

import { useState } from "react"
import * as Sentry from "@sentry/nextjs"
import { Bug, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ReportBugButtonProps {
  /** Identifies where the report came from. Sent as the `report_source` Sentry tag. */
  source: string
  /** Extra Sentry tags merged onto the captured message. */
  tags?: Record<string, string | number | undefined>
  /** Extra fields merged into the `report` Sentry context. */
  extraContext?: Record<string, unknown>
  /** Optional label override for the trigger button. Defaults to "Report". */
  triggerLabel?: string
}

export function ReportBugButton({
  source,
  tags,
  extraContext,
  triggerLabel = "Report",
}: ReportBugButtonProps) {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (!description.trim()) return

    Sentry.captureMessage("User bug report", {
      level: "warning",
      tags: {
        report_source: source,
        ...tags,
      },
      contexts: {
        report: {
          description,
          ...extraContext,
        },
      },
    })

    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setDescription("")
      setSubmitted(false)
    }, 1200)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Bug className="size-3.5" />
          <span className="hidden sm:inline">{triggerLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report a bug</DialogTitle>
          <DialogDescription>
            Tell us what went wrong. We&apos;ll attach diagnostic context automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bug-description">What happened?</Label>
          <Textarea
            id="bug-description"
            placeholder="My submission ran but never scored…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            disabled={submitted}
          />
        </div>

        <DialogFooter>
          {submitted ? (
            <Button disabled className="gap-1.5">
              <Check className="size-4" />
              Sent — thanks!
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!description.trim()}>
              Send report
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

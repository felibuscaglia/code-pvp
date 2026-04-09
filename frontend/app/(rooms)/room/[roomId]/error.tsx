"use client"

import { useEffect } from "react"
import Link from "next/link"
import * as Sentry from "@sentry/nextjs"
import { ArrowLeft, AlertCircle, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/ui/logo"
import { RoomError } from "@/lib/contexts/room/room-context"
import { ReportBugButton } from "./_components/report-bug-button"

export default function RoomErrorPage({ error }: { error: Error }) {
  const isRoomError = error instanceof RoomError

  useEffect(() => {
    // Skip expected user-facing states (404, join conflicts) — only report unexpected crashes.
    if (isRoomError) return
    Sentry.captureException(error)
  }, [error, isRoomError])

  const isNotFound = isRoomError && error.status === 404
  const heading = isNotFound
    ? "Room not found"
    : isRoomError
      ? error.message
      : "Unable to join room"
  const description = isNotFound
    ? "This room doesn't exist or has already ended. Check the invite link and try again."
    : null;

  return (
    <div className="bg-grid relative flex min-h-svh flex-col items-center justify-center px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[400px] w-[600px] rounded-full bg-danger/5 blur-[120px]" />
      </div>

      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <LogoIcon className="size-12 text-primary" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2 text-danger">
            <AlertCircle className="size-5" />
            <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {heading}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Back to home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/browse">
              <Globe data-icon="inline-start" />
              Browse rooms
            </Link>
          </Button>
        </div>

        {!isRoomError && (
          <ReportBugButton
            source="room_error_page"
            triggerLabel="Report this error"
            tags={{
              error_name: error.name,
            }}
            extraContext={{
              errorName: error.name,
              errorMessage: error.message,
              errorStack: error.stack,
            }}
          />
        )}
      </div>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"
import { AlertCircle, RotateCcw, Home } from "lucide-react"

import "./globals.css"
import { Button } from "@/components/ui/button"
import { LogoIcon } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { ReportBugButton } from "./(rooms)/room/[roomId]/_components/report-bug-button"

const geistMonoHeading = Geist_Mono({ subsets: ["latin"], variable: "--font-heading" })
const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html
      lang="en"
      className={cn(
        "antialiased dark",
        fontSans.variable,
        "font-mono",
        jetbrainsMono.variable,
        geistMonoHeading.variable,
      )}
    >
      <body>
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
                  Something broke
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                An unexpected error crashed the app. Our team has been notified. You can try
                again, or head back home.
              </p>
              {error.digest ? (
                <p className="font-mono text-xs text-muted-foreground/70">
                  ref: {error.digest}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                <Home data-icon="inline-start" />
                Back to home
              </Button>
              <Button onClick={() => reset()}>
                <RotateCcw data-icon="inline-start" />
                Try again
              </Button>
            </div>

            <ReportBugButton
              source="global_error_page"
              triggerLabel="Report this error"
              tags={{
                error_name: error.name,
                error_digest: error.digest,
              }}
              extraContext={{
                errorName: error.name,
                errorMessage: error.message,
                errorDigest: error.digest,
                errorStack: error.stack,
              }}
            />
          </div>
        </div>
      </body>
    </html>
  )
}

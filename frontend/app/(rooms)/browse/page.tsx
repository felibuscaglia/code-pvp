import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { BrowseRooms } from "./_components/browse-rooms"

export const metadata: Metadata = {
  title: "Browse Public Rooms",
  description:
    "Find and join open coding battles. Compete against developers in real-time LeetCode-style challenges — no invite needed.",
  openGraph: {
    title: "Browse Public Rooms | CodePvP",
    description:
      "Find and join open coding battles. Compete against developers in real-time LeetCode-style challenges.",
    url: "/browse",
  },
  alternates: {
    canonical: "/browse",
  },
}

export default function BrowseRoomsPage() {
  return (
    <div className="relative flex min-h-svh flex-col bg-grid px-6 py-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2"
      >
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
        {/* Nav */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Back
            </Link>
          </Button>
          <Logo />
        </div>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Browse public sessions
          </h1>
          <p className="text-sm text-muted-foreground">
            Jump into an open room and start competing in seconds.
          </p>
        </div>

        <BrowseRooms />
      </div>
    </div>
  )
}

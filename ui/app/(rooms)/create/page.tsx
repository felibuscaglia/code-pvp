import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { RoomConfigForm } from "./_components/room-config-form"

export default function CreateRoomPage() {
  return (
    <div className="relative flex min-h-svh flex-col bg-grid px-6 py-8">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2"
      >
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8">
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
            Create a room
          </h1>
          <p className="text-sm text-muted-foreground">
            Set up your battle in seconds. Share the link and start competing.
          </p>
        </div>

        <RoomConfigForm />
      </div>
    </div>
  )
}

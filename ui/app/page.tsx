import type { Metadata } from "next"
import {
  Zap,
  Trophy,
  Users,
  Globe,
  Repeat,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo, LogoIcon } from "@/components/ui/logo"
import { JoinRoomCTA } from "./_components/join-room-cta"

export const metadata: Metadata = {
  title: "CodeArena — Real-Time Competitive Coding Battles",
  description:
    "Race head-to-head in real-time coding challenges. Create a room, invite friends, and compete on correctness, performance, and code quality. Supports 1v1, 2v2 team mode with shared editor and voice chat, and public matchmaking.",
  keywords: [
    "competitive coding",
    "coding battles",
    "real-time coding",
    "code challenges",
    "programming competition",
    "pair programming",
    "coding arena",
  ],
  openGraph: {
    title: "CodeArena — Real-Time Competitive Coding Battles",
    description:
      "Race head-to-head in real-time coding challenges. Create rooms, invite friends, and prove you write the best code under pressure.",
    type: "website",
  },
}

const features = [
  {
    icon: Zap,
    title: "Real-Time Battles",
    description:
      "Race head-to-head solving coding challenges. Watch opponents' progress live as every second counts.",
    tag: "Core",
  },
  {
    icon: Trophy,
    title: "Smart Scoring",
    description:
      "Scored on correctness, execution speed, and code quality. The best code wins — not just the fastest.",
    tag: "Scoring",
  },
  {
    icon: Users,
    title: "2v2 Team Mode",
    description:
      "Pair up with a friend. Collaborate in a shared editor with built-in voice chat to crush the competition.",
    tag: "Multiplayer",
  },
  {
    icon: Globe,
    title: "Public Matchmaking",
    description:
      "No friends online? Jump into public rooms and compete against coders from around the world.",
    tag: "Matchmaking",
  },
  {
    icon: Repeat,
    title: "Multi-Round Format",
    description:
      "Battle across multiple rounds with escalating difficulty. Consistency crowns the true champion.",
    tag: "Competitive",
  },
  {
    icon: LinkIcon,
    title: "Instant Rooms",
    description:
      "Create a room and share a link. Your arena is one click away — no sign-up walls, no friction.",
    tag: "Access",
  },
]

const steps = [
  {
    number: "01",
    title: "Create or Join",
    description:
      "Start a new room or paste an invite link to jump into an existing battle.",
  },
  {
    number: "02",
    title: "Solve & Compete",
    description:
      "Race to solve challenges while your solution is scored in real time.",
  },
  {
    number: "03",
    title: "Claim Victory",
    description:
      "Top the leaderboard across rounds and prove your coding prowess.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Logo />
          <Button variant="ghost" size="sm" asChild>
            <a href="#features">Learn more</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-6 pt-14">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 py-32 text-center">
          <Badge variant="secondary" className="gap-1.5 font-mono text-xs">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Now in early access
          </Badge>

          <div className="flex flex-col gap-4">
            <h1 className="font-heading text-4xl leading-[1.1] font-bold tracking-tight [word-spacing:-0.3em] sm:text-5xl md:text-6xl">
              Code. <br />Compete.{" "}<br />
              <span className="text-primary">Conquer.</span>
            </h1>
            <p className="mx-auto max-w-lg text-base text-muted-foreground sm:text-lg">
              Real-time competitive coding where speed meets quality. Create a
              room, challenge your friends, and prove you write the best code
              under pressure.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">
              Create Room
              <ArrowRight data-icon="inline-end" />
            </Button>
            <JoinRoomCTA />
            <Button variant="ghost" size="lg">
              Browse Public Rooms
            </Button>
          </div>

          <p className="text-xs text-muted-foreground/70">
            Free to play — no account required to join a room
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Built for competitive coders
            </h2>
            <p className="max-w-md text-muted-foreground">
              Everything you need to host and compete in real-time coding
              battles, from solo duels to team showdowns.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col gap-3 rounded-xl border border-border/50 p-6 transition-colors hover:border-border hover:bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-4" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/50 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 flex flex-col items-center gap-3 text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Three steps to your first battle
            </h2>
            <p className="max-w-md text-muted-foreground">
              Get from zero to competing in under a minute.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col gap-3">
                <span className="font-heading text-4xl font-bold text-primary/20">
                  {step.number}
                </span>
                <h3 className="font-heading text-sm font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-5 left-full hidden w-8 border-t border-dashed border-border/50 sm:block lg:w-full lg:max-w-24"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border/50 px-6 py-16">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8 text-center">
          {[
            { value: "< 1s", label: "Room creation" },
            { value: "3", label: "Scoring dimensions" },
            { value: "∞", label: "Rounds per match" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border/50 px-6 py-24">
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
          <LogoIcon className="size-12 text-primary" />
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to compete?
          </h2>
          <p className="text-muted-foreground">
            Create a room and send the link. Your first battle starts now.
          </p>
          <div className="flex gap-3">
            <Button size="lg">
              Create Room
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="outline" size="lg">
              Browse Public Rooms
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Logo className="opacity-60" />
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeArena
          </p>
        </div>
      </footer>
    </div>
  )
}

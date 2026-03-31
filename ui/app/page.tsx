import type { Metadata } from "next"
import {
  Zap,
  Trophy,
  Globe,
  Repeat,
  Link as LinkIcon,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Logo, LogoIcon } from "@/components/ui/logo"
import { HeroActions } from "./_components/hero-actions"
import { BattlePreview } from "./_components/battle-preview"

export const metadata: Metadata = {
  title: "CodeArena — Real-Time Competitive Coding Battles",
  description:
    "Race head-to-head in real-time coding challenges. Create a room, invite friends, and compete on correctness, performance, and code quality.",
  keywords: [
    "competitive coding",
    "coding battles",
    "real-time coding",
    "code challenges",
    "programming competition",
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
    color: "text-primary bg-primary/10",
  },
  {
    icon: Trophy,
    title: "Smart Scoring",
    description:
      "Scored on correctness, execution speed, and code quality. The best code wins — not just the fastest.",
    tag: "Scoring",
    color: "text-success bg-success/10",
  },
  {
    icon: Globe,
    title: "Public Matchmaking",
    description:
      "No friends online? Jump into public rooms and compete against coders from around the world.",
    tag: "Matchmaking",
    color: "text-warning bg-warning/10",
  },
  {
    icon: Repeat,
    title: "Multi-Round Format",
    description:
      "Battle across multiple rounds with escalating difficulty. Consistency crowns the true champion.",
    tag: "Competitive",
    color: "text-danger bg-danger/10",
  },
  {
    icon: LinkIcon,
    title: "Instant Rooms",
    description:
      "Create a room and share a link. Your arena is one click away — no sign-up walls, no friction.",
    tag: "Access",
    color: "text-primary bg-primary/10",
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

const highlights = [
  "No signup required",
  "Real-time scoring",
  "1–10 rounds",
]

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-grid">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Logo />
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pt-14">
        {/* Background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-[600px] w-[900px] rounded-full bg-primary/8 blur-[150px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-1/4"
        >
          <div className="h-[400px] w-[500px] rounded-full bg-success/5 blur-[120px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0"
        >
          <div className="h-[300px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-16 py-16 lg:grid-cols-2">
          {/* Left — Copy & Actions */}
          <div className="flex flex-col items-center gap-8 lg:items-start">
            <Badge
              variant="secondary"
              className="animate-fade-in-up gap-1.5 font-mono text-xs"
            >
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-success" />
              Now in early access
            </Badge>

            <div
              className="flex flex-col gap-5 text-center animate-fade-in-up lg:text-left"
              style={{ animationDelay: "0.1s" }}
            >
              <h1 className="font-heading text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Code.
                <br />
                Compete.
                <br />
                <span className="text-primary">Conquer.</span>
              </h1>
              <p className="max-w-md text-base text-muted-foreground sm:text-lg">
                Real-time competitive coding where speed meets quality. Create a
                room, challenge your friends, and prove you write the best code
                under pressure.
              </p>
            </div>

            {/* Actions */}
            <div
              className="flex w-full max-w-lg flex-col items-center animate-fade-in-up lg:items-start"
              style={{ animationDelay: "0.2s" }}
            >
              <HeroActions />
              <p className="mt-4 text-xs text-muted-foreground/60">
                Free to play — no account required
              </p>
            </div>
          </div>

          {/* Right — Battle Preview */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Glow behind the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-8 rounded-3xl bg-primary/5 blur-3xl"
            />
            <BattlePreview />
          </div>
        </div>

        {/* Highlights bar pinned to bottom of hero */}
        <div
          className="absolute bottom-0 left-0 w-full border-t border-border/50 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 px-6 py-5">
            {highlights.map((text) => (
              <Badge
                key={text}
                variant="secondary"
                className="gap-1.5 px-3 py-1 text-xs font-normal"
              >
                <Check className="size-3 text-success" />
                {text}
              </Badge>
            ))}
          </div>
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
              battles.
            </p>
          </div>

          {/* Featured pair */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {features.slice(0, 2).map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-border hover:bg-muted/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${feature.color}`}
                  >
                    <feature.icon className="size-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="font-heading text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Remaining three */}
          <div className="grid gap-4 sm:grid-cols-3">
            {features.slice(2).map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col gap-3 rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:border-border hover:bg-muted/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${feature.color}`}
                  >
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
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-heading text-sm font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading text-sm font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-5 left-full hidden w-8 border-t border-dashed border-primary/20 sm:block lg:w-full lg:max-w-24"
                  />
                )}
              </div>
            ))}
          </div>
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
          <HeroActions />
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

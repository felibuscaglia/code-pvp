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
  title: "CodePvP — Real-Time Competitive Coding Battles",
  description:
    "Race head-to-head in real-time coding challenges or train solo. Create a room, invite friends, and compete on correctness, performance, and code quality.",
  keywords: [
    "competitive coding",
    "coding battles",
    "real-time coding",
    "code challenges",
    "programming competition",
    "code pvp",
    "codepvp",
    "leetcode multiplayer",
    "coding competition online",
    "competitive programming practice",
    "solo coding practice",
  ],
  openGraph: {
    title: "CodePvP — Real-Time Competitive Coding Battles",
    description:
      "Race head-to-head in real-time coding challenges or sharpen your skills solo. Create rooms, invite friends, and prove you write the best code under pressure.",
    url: "/",
  },
  alternates: {
    canonical: "/",
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
      "Create a room and share a link — or jump in solo. Your arena is one click away, no sign-up walls, no friction.",
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
  "Solo or multiplayer",
  "1–10 rounds",
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "CodePvP",
      url: "https://codepvp.com",
      description:
        "Real-time competitive coding platform. Race head-to-head in LeetCode-style challenges or train solo, scored on correctness, speed, and code quality.",
    },
    {
      "@type": "SoftwareApplication",
      name: "CodePvP",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "A multiplayer coding battle platform where developers compete in real-time on algorithm challenges — solo practice supported.",
    },
  ],
}

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                room, challenge your friends, or train solo and prove you write
                the best code under pressure.
              </p>
            </div>

            {/* Actions */}
            <div
              className="flex w-full max-w-lg flex-col items-center animate-fade-in-up lg:items-start"
              style={{ animationDelay: "0.2s" }}
            >
              <HeroActions />
              <p className="my-4 text-xs text-muted-foreground/60">
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
            Create a room, send the link — or go solo. Your first battle starts now.
          </p>
          <HeroActions />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo className="opacity-60" />
          <a
            href="https://discord.gg/xtszbMqC9H"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join the CodePvP community on Discord"
            className="group inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10 hover:text-[#5865F2] hover:shadow-lg hover:shadow-[#5865F2]/10"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-3.5 fill-current"
            >
              <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
            </svg>
            <span className="font-medium">Join our Discord</span>
          </a>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CodePvP
          </p>
        </div>
      </footer>
    </div>
  )
}

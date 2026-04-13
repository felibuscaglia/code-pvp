import type { Metadata } from "next"
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://codepvp.com"),
  title: {
    default: "CodePvP — Real-Time Competitive Coding Battles",
    template: "%s | CodePvP",
  },
  description:
    "Race head-to-head in real-time coding challenges. Create a room, invite friends, and compete on correctness, performance, and code quality.",
  openGraph: {
    siteName: "CodePvP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const geistMonoHeading = Geist_Mono({subsets:['latin'],variable:'--font-heading'});

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, "font-mono", jetbrainsMono.variable, geistMonoHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

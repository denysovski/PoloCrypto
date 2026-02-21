"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { Activity, Clock3, Newspaper, Shield } from "lucide-react"

const tradingStories = [
  {
    id: 1,
    tag: "Execution",
    time: "6 min read",
    title: "Build an Execution Plan Before Any Entry",
    summary:
      "Strong traders define entry trigger, invalidation, and exit ladder before placing orders. This prevents emotional changes once price starts moving and keeps decisions consistent across volatile sessions.",
  },
  {
    id: 2,
    tag: "Risk",
    time: "5 min read",
    title: "Size by Invalidation, Not by Conviction",
    summary:
      "Position size should come from how far your stop is from entry, not from confidence level. The same idea can be great and still fail in the short term. Controlled downside keeps you in the game.",
  },
  {
    id: 3,
    tag: "Process",
    time: "4 min read",
    title: "Review Weekly to Remove Repeating Mistakes",
    summary:
      "Track your setup type, execution quality, and post-trade behavior. Weekly review surfaces errors like late entries or poor exits and lets you improve one variable at a time.",
  },
]

const deskNotes = [
  {
    title: "Macro Pulse",
    text: "Rate expectations and liquidity shifts can change trend strength faster than chart patterns suggest.",
    icon: Activity,
  },
  {
    title: "Session Quality",
    text: "Use higher-liquidity hours for entries to reduce spread and slippage costs.",
    icon: Clock3,
  },
  {
    title: "Platform Risk",
    text: "Operational security and venue reliability matter as much as setup quality.",
    icon: Shield,
  },
]

export function TradingGuideSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Trading Education
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Trade Efficiently
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Editorial feed focused on practical execution, risk-first sizing, and repeatable improvement loops.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="space-y-4">
            <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Newspaper className="size-4" /> Editor Desk
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {tradingStories.map((story, index) => (
                  <article
                    key={story.id}
                    className={`rounded-xl border border-border/60 bg-background/35 p-5 ${index === 0 ? "md:col-span-2" : ""}`}
                  >
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-mono uppercase tracking-wider text-primary">{story.tag}</span>
                      <span>{story.time}</span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-foreground">{story.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{story.summary}</p>
                  </article>
                ))}
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {deskNotes.map((note) => {
                const Icon = note.icon
                return (
                  <Card key={note.title} className="dynamic-card border border-border/70 bg-card/25 p-4 backdrop-blur-sm">
                    <div className="mb-2 inline-flex rounded-lg bg-primary/10 p-2">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <p className="font-mono text-sm font-bold text-foreground">{note.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{note.text}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

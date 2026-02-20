"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import {
  Lightbulb,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react"

const tradingTips = [
  {
    icon: TrendingUp,
    title: "Start Small & Scale Up",
    description:
      "Begin with a small investment to understand market dynamics. As your confidence grows, gradually increase your position sizes while maintaining proper risk management.",
  },
  {
    icon: Clock,
    title: "Timing is Everything",
    description:
      "Don't try to catch the exact bottom or top. Focus on consistent entry and exit points. Use technical analysis and stop-losses to protect against sudden reversals.",
  },
  {
    icon: Shield,
    title: "Risk Management First",
    description:
      "Never invest more than you can afford to lose. Use stop-loss orders, diversify your portfolio, and maintain an emergency fund separate from crypto investments.",
  },
  {
    icon: Lightbulb,
    title: "Do Your Research",
    description:
      "Understand the fundamentals of projects you invest in. Read whitepapers, follow team updates, and stay informed about market trends and regulatory changes.",
  },
]

export function TradingGuideSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Trading Education
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How to Trade Efficiently
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Master the fundamentals of cryptocurrency trading with proven strategies and best practices.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tradingTips.map((tip, index) => {
          const Icon = tip.icon
          return (
            <ScrollReveal key={tip.title} delay={index * 50} direction="up">
              <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm transition-all hover:bg-card/50">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 font-mono text-base font-bold text-foreground">
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tip.description}
                </p>
              </Card>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}

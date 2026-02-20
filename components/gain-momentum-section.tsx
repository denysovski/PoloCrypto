"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import {
  Rocket,
  BarChart3,
  Coins,
  AlertCircle,
} from "lucide-react"

const momentumStrategies = [
  {
    icon: BarChart3,
    title: "Accumulation Phase",
    description:
      "Identify cryptocurrencies in the accumulation phase where smart investors build positions. Look for consolidation patterns and volume analysis to confirm buyer interest.",
  },
  {
    icon: Rocket,
    title: "Breakout Confirmation",
    description:
      "Wait for confirmed breakouts above resistance levels with strong volume. Enter positions only after the breakout is confirmed to avoid false signals.",
  },
  {
    icon: Coins,
    title: "Dollar-Cost Averaging",
    description:
      "Use DCA strategy to reduce timing risk. Invest fixed amounts periodically regardless of price, smoothing your average cost and reducing emotional decisions.",
  },
  {
    icon: AlertCircle,
    title: "Momentum Indicators",
    description:
      "Use RSI, MACD, and Stochastic indicators to identify overbought/oversold conditions. Combine multiple indicators for stronger confirmation signals.",
  },
]

export function GainMomentumSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Growth Strategy
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How to Gain Momentum When Trading
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Build wealth through strategic position sizing, timing, and technical analysis principles.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {momentumStrategies.map((strategy, index) => {
          const Icon = strategy.icon
          return (
            <ScrollReveal key={strategy.title} delay={index * 50} direction="up">
              <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm transition-all hover:bg-card/50">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 font-mono text-base font-bold text-foreground">
                  {strategy.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {strategy.description}
                </p>
              </Card>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}

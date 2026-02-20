"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import {
  Zap,
  Users,
  LineChart,
  Target,
} from "lucide-react"

const selectCriteriaProps = [
  {
    icon: Target,
    title: "Market Cap & Liquidity",
    description:
      "Look for cryptocurrencies with strong market capitalization and adequate trading volume. Higher liquidity means easier entry and exit without significant slippage.",
  },
  {
    icon: LineChart,
    title: "Technical Analysis",
    description:
      "Study price charts, support/resistance levels, and trading volume patterns. Identify strong trends and momentum to time your entries effectively.",
  },
  {
    icon: Users,
    title: "Team & Community",
    description:
      "Research the development team's experience and track record. Active communities, transparent communication, and regular updates indicate a healthy project.",
  },
  {
    icon: Zap,
    title: "Use Case & Innovation",
    description:
      "Evaluate the project's real-world utility and technological innovation. Projects solving genuine problems have better long-term potential than pure speculation.",
  },
]

export function FindCryptoSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Research Guide
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How to Find the Best Crypto for You
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Evaluate cryptocurrencies using fundamental and technical analysis to make informed investment decisions.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {selectCriteriaProps.map((prop, index) => {
          const Icon = prop.icon
          return (
            <ScrollReveal key={prop.title} delay={index * 50} direction="up">
              <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm transition-all hover:bg-card/50">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 font-mono text-base font-bold text-foreground">
                  {prop.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </Card>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}

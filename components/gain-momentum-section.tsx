"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { ArrowRight, Gauge, Milestone } from "lucide-react"

const phases = [
  {
    id: 1,
    name: "Base",
    window: "W1-W3",
    trigger: "Range stabilization with contracting volatility",
    action: "Probe small and wait for structure confirmation.",
  },
  {
    id: 2,
    name: "Break",
    window: "W3-W6",
    trigger: "Resistance break with rising participation",
    action: "Add on successful retest; keep invalidation tight.",
  },
  {
    id: 3,
    name: "Run",
    window: "W6-W12",
    trigger: "Higher highs and higher lows hold",
    action: "Trail risk under structure and avoid overtrading noise.",
  },
  {
    id: 4,
    name: "Distribute",
    window: "W12+",
    trigger: "Momentum divergence and narrowing breadth",
    action: "Scale out in tiers and protect residual size.",
  },
]

export function GainMomentumSection() {
  const [active, setActive] = useState(1)

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Growth Strategy
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Gain Momentum When Trading
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Use a stage model with clear transition signals to avoid late entries and undisciplined exits.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Milestone className="size-4" /> Momentum Roadmap
            </p>

            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div key={phase.id} className="grid gap-3 md:grid-cols-[140px_1fr_auto] md:items-center">
                  <button
                    onClick={() => setActive(index)}
                    className={`rounded-lg border px-3 py-2 text-left transition-all ${
                      active === index
                        ? "border-primary/45 bg-primary/15 text-foreground"
                        : "border-border/60 bg-background/35 text-muted-foreground hover:bg-background/55 hover:text-foreground"
                    }`}
                  >
                    <p className="font-mono text-sm font-bold">{phase.name}</p>
                    <p className="text-xs">{phase.window}</p>
                  </button>

                  <div className={`rounded-lg border p-4 ${active === index ? "border-primary/35 bg-primary/5" : "border-border/50 bg-background/30"}`}>
                    <p className="text-xs uppercase tracking-wider text-primary">Trigger</p>
                    <p className="mt-1 text-sm text-muted-foreground">{phase.trigger}</p>
                    <p className="mt-3 text-xs uppercase tracking-wider text-primary">Action</p>
                    <p className="mt-1 text-sm text-muted-foreground">{phase.action}</p>
                  </div>

                  <div className="hidden md:flex md:items-center">
                    <ArrowRight className={`size-4 ${active === index ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-primary/25 bg-primary/10 p-4">
              <p className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                <Gauge className="size-4" /> Active Focus
              </p>
              <p className="text-sm text-foreground">{phases[active].name} · {phases[active].window}</p>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

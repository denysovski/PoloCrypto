"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { Brain, BriefcaseBusiness, CircleAlert, GraduationCap, ShieldAlert } from "lucide-react"

const personas = [
  {
    id: 1,
    title: "Capital Foundation",
    icon: BriefcaseBusiness,
    stance: "Proceed only with long-horizon risk capital.",
    detail:
      "If short-term obligations depend on this money, crypto volatility is misaligned with your needs. Prioritize emergency reserves and debt quality first.",
  },
  {
    id: 2,
    title: "Behavior Profile",
    icon: Brain,
    stance: "Operate from rules, not headlines.",
    detail:
      "Frequent emotional reactions to price usually reduce edge. A written plan and predefined risk boundaries are required before scaling exposure.",
  },
  {
    id: 3,
    title: "Knowledge Profile",
    icon: GraduationCap,
    stance: "Understand custody, liquidity, and cycle behavior.",
    detail:
      "If you cannot explain why an asset should exist and where it can fail, position size should remain small while research improves.",
  },
]

export function IsCryptoForYouSection() {
  const [active, setActive] = useState(0)
  const current = personas[active]
  const CurrentIcon = current.icon

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Personal Fit Analysis
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Is Crypto Really for You?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Decision panel based on capital readiness, behavior control, and knowledge depth.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="grid gap-4 lg:grid-cols-3">
            {personas.map((persona, index) => {
              const Icon = persona.icon
              return (
                <button
                  key={persona.id}
                  onClick={() => setActive(index)}
                  className={`dynamic-card rounded-xl border p-5 text-left backdrop-blur-sm transition-all ${
                    active === index
                      ? "border-primary/45 bg-primary/10"
                      : "border-border/70 bg-card/25 hover:bg-card/35"
                  }`}
                >
                  <Icon className="mb-3 size-5 text-primary" />
                  <p className="font-mono text-base font-bold text-foreground">{persona.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{persona.stance}</p>
                </button>
              )
            })}

            <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm lg:col-span-3">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CurrentIcon className="size-5 text-primary" />
                </div>
                <h3 className="font-mono text-xl font-bold text-foreground">{current.title}</h3>
              </div>

              <p className="text-sm font-semibold text-primary/85">{current.stance}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.detail}</p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                  <p className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-destructive">
                    <ShieldAlert className="size-4" /> Red Flag
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Increase caution when risk depends on borrowed money, panic behavior, or weak platform security assumptions.
                  </p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4">
                  <p className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                    <CircleAlert className="size-4" /> Practical Rule
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Start with smaller exposure and increase only after process discipline and research quality remain consistent.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

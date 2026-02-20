"use client"

import { ArrowRight, Cpu, Globe, Lock, Shield, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

const featureHighlights = [
  {
    icon: <Zap className="size-5" />,
    title: "Lightning Execution",
    metric: "<1ms",
    description: "Low-latency order routing for fast entries and exits.",
  },
  {
    icon: <Shield className="size-5" />,
    title: "Defense Stack",
    metric: "$500M",
    description: "Cold storage architecture with layered withdrawal controls.",
  },
  {
    icon: <Cpu className="size-5" />,
    title: "Automation API",
    metric: "99.99%",
    description: "Stable endpoints for bots, alerts, and strategy engines.",
  },
]

const capabilityList = [
  {
    icon: <Lock className="size-4" />,
    label: "Self-custody mode for advanced users",
  },
  {
    icon: <Globe className="size-4" />,
    label: "Localized fiat ramps in 180+ regions",
  },
  {
    icon: <Cpu className="size-4" />,
    label: "AI-assisted watchlists and volatility alerts",
  },
]

export function FeatureCards() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Why NexVault</p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A More Tactical Trading Stack
            </h2>
          </div>
          <Button variant="outline" className="border-border bg-transparent hover:bg-secondary">
            Learn More
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal direction="left" delay={80}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.8rem] border border-border bg-card/35 p-5 backdrop-blur-sm sm:row-span-2 sm:p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Core Engine</p>
              <h3 className="mt-3 font-mono text-2xl font-bold text-foreground">Speed + Security</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Institutional-grade infrastructure without enterprise complexity. Built for precision under pressure.
              </p>
              <div className="mt-6 rounded-2xl border border-border/80 bg-background/60 p-4">
                <p className="font-mono text-3xl font-extrabold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">Monitored market infrastructure</p>
              </div>
            </div>

            {featureHighlights.map((feature) => (
              <div key={feature.title} className="rounded-[1.6rem] border border-border bg-card/35 p-5 backdrop-blur-sm">
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <p className="font-mono text-lg font-bold text-foreground">{feature.title}</p>
                <p className="mt-1 text-sm text-primary">{feature.metric}</p>
                <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={140}>
          <div className="rounded-[2rem] border border-border bg-card/35 p-6 backdrop-blur-sm sm:p-7">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Capabilities List</p>
            <h3 className="mt-3 font-mono text-2xl font-bold text-foreground">Built Beyond Basic Cards</h3>
            <ul className="mt-5 space-y-3">
              {capabilityList.map((item) => (
                <li key={item.label} className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/50 px-3 py-3 text-sm text-foreground">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">{item.icon}</span>
                  {item.label}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full">
              Explore Feature Docs
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

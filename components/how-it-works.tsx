"use client"

import { ArrowRight, ShieldCheck, TrendingUp, UserPlus, Wallet } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    icon: <UserPlus className="size-5" />,
    title: "Create Account",
    description: "Register with email or wallet and complete security verification.",
  },
  {
    step: "02",
    icon: <Wallet className="size-5" />,
    title: "Fund Wallet",
    description: "Deposit crypto or fiat using transfer, card, or mobile checkout.",
  },
  {
    step: "03",
    icon: <TrendingUp className="size-5" />,
    title: "Trade & Track",
    description: "Use live leaderboard cues and advanced chart overlays to execute trades.",
  },
  {
    step: "04",
    icon: <ShieldCheck className="size-5" />,
    title: "Secure & Scale",
    description: "Activate automation, alerts, and custody protections as portfolio grows.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">How It Works</p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              A Clear Trading Onboarding Path
            </h2>
          </div>
          <Button variant="outline" className="border-border bg-transparent hover:bg-secondary">
            Learn More
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ScrollReveal direction="left" delay={100}>
          <ol className="space-y-4">
            {steps.map((step) => (
              <li key={step.step} className="relative overflow-hidden rounded-[1.6rem] border border-border bg-card/35 p-5 backdrop-blur-sm sm:p-6">
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex size-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary">
                    {step.step}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{step.icon}</span>
                      <h3 className="font-mono text-lg font-bold text-foreground">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={140}>
          <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[2rem] border border-border bg-card/35 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Average Setup Time</p>
              <p className="mt-3 font-mono text-4xl font-extrabold text-foreground">2m 14s</p>
              <p className="mt-2 text-sm text-muted-foreground">from sign-up to first watchlist</p>
            </div>
            <div className="rounded-[2rem] border border-border bg-card/35 p-6 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Success Pattern</p>
              <p className="mt-3 font-mono text-2xl font-bold text-foreground">Fund → Watch → Trade</p>
              <Button className="mt-5 w-full">
                View Onboarding Guide
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

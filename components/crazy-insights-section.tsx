"use client"

import { Sparkles, Orbit, RadioTower } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useEffect, useState } from "react"

const rotatingLabels = [
  "Signal Fusion",
  "Velocity Mapping",
  "Liquidity Pulse",
  "Trend Magnet",
]

export function CrazyInsightsSection() {
  const [activeLabel, setActiveLabel] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLabel((prev) => (prev + 1) % rotatingLabels.length)
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-16">
      <div className="pointer-events-none absolute left-1/3 top-1/2 size-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-12 top-16 size-56 rounded-full bg-chart-2/10 blur-[90px]" />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ScrollReveal direction="left">
          <div className="dynamic-card relative rounded-4xl border border-border bg-card/35 p-6 backdrop-blur-sm sm:p-8">
            <div className="pointer-events-none absolute right-6 top-6 size-24 rounded-full border border-primary/30" style={{ animation: "spin 18s linear infinite" }} />
            <p className="text-xs uppercase tracking-widest text-primary">Crazy Mode</p>
            <h2 className="mt-3 font-mono text-3xl font-extrabold text-foreground sm:text-4xl">
              Reactor Analytics Core
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A visual intelligence block that loops forever and keeps surfacing market states as living signals.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="dynamic-card rounded-3xl border border-border/70 bg-background/45 p-4">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Orbit className="size-4" />
                  <span className="text-xs uppercase tracking-widest">Orbital Layer</span>
                </div>
                <p className="font-mono text-xl font-bold text-foreground">{rotatingLabels[activeLabel]}</p>
              </div>
              <div className="dynamic-card rounded-3xl border border-border/70 bg-background/45 p-4">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <RadioTower className="size-4" />
                  <span className="text-xs uppercase tracking-widest">Live Stream</span>
                </div>
                <p className="font-mono text-xl font-bold text-foreground">Always Looping</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" delay={120}>
          <div className="relative grid gap-4">
            <div className="dynamic-card rounded-[2rem] border border-border bg-background/45 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Sparkles className="size-4" />
                <span className="text-xs uppercase tracking-widest">Chroma Field</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-border/40">
                <div
                  className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,oklch(0.75_0.18_165),oklch(0.65_0.15_200),oklch(0.8_0.15_140))]"
                  style={{ animation: "ticker-scroll 6s linear infinite" }}
                />
              </div>
            </div>

            <div className="dynamic-card rounded-[2rem] border border-border bg-background/45 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Dynamic Signal Map</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border/70 bg-background/40 p-3"
                    style={{
                      animation: `pulse-glow ${2 + (index % 4)}s ease-in-out infinite`,
                      animationDelay: `${index * 0.15}s`,
                    }}
                  >
                    <div className="size-2 rounded-full bg-primary/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

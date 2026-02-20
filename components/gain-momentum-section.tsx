"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const strategyPhases = [
  {
    id: 1,
    phase: "Accumulation",
    duration: "Weeks 1-4",
    headline: "Building Your Position Silently",
    detail:
      "Watch for coins consolidating after a decline. Volume should be low with bounces off support. This is when whales silently buy without pumping the price. Look for daily closes above key moving averages (50-day, 200-day). Enter on dip buys with tight stops below the consolidation range. Size each position at 1-2% of portfolio. Don't rush—the best entry signals take time to form. Use limit orders to buy gradually, averaging in over 2-3 weeks rather than one lump sum.",
  },
  {
    id: 2,
    phase: "Confirmation",
    duration: "Weeks 4-8",
    headline: "Breakouts Signal Institutional Interest",
    detail:
      "When price breaks above consolidation with volume 2-3x average, momentum is real. The breakout confirms buyers are committed. Add 30-50% to your position immediately on this signal. Set your stop just below the breakout point. Now your position is 3-5% of portfolio. Watch for pullbacks to the old resistance (now support)—these are golden buying opportunities where weak hands sell. Volume should remain elevated. If volume drops on the breakout, it's a false signal; exit the trade.",
  },
  {
    id: 3,
    phase: "Momentum",
    duration: "Weeks 8-16",
    headline: "Exponential Growth Phase",
    detail:
      "The trend is now established. Price makes higher highs and higher lows on daily/weekly charts. Every dip gets bought. This is the 'easy money' phase where you hold and watch it grow. No new capital needed here. Instead, tighten your stop-loss to recent support levels, locking in gains as you go. You're now in 'free profit' on half your position while letting the other half run. Watch for volume spikes on down-days—they can signal trend exhaustion. Moving averages should be stacking (50-day above 200-day above 365-day).",
  },
  {
    id: 4,
    phase: "Profit Taking",
    duration: "Weeks 16+",
    headline: "Knowing When to Exit",
    detail:
      "Trends don't last forever. Exit signals: price breaks below 50-day moving average on high volume, RSI shows divergence (price up but momentum indicator flat), or you've hit your profit target (300%+ gains warrant caution). Sell half at your predetermined target. Hold the other half with a trailing stop at 8-10% below recent highs. History repeats: what goes up 300-500% often corrects 40-60%. Lock those gains. A 30% profit is better than a 100% profit that becomes a 50% loss from greed.",
  },
]

export function GainMomentumSection() {
  const [activePhase, setActivePhase] = useState(0)
  const current = strategyPhases[activePhase]

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Growth Strategy
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Gain <br /> Momentum When Trading
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A 4-phase strategy cycle showing exactly when to buy, hold, add, and sell for maximum returns. Structure beats emotion.
            </p>

            <div className="mt-8 space-y-3">
              {strategyPhases.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActivePhase(index)}
                  className={`w-full text-left px-4 py-4 rounded-lg transition-all border ${
                    activePhase === index
                      ? "bg-primary/20 border-primary/40 text-foreground"
                      : "bg-background/40 border-border/50 text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-sm font-bold">{item.phase}</p>
                      <p className="text-xs mt-1 opacity-75">{item.duration}</p>
                    </div>
                    {activePhase === index && <ArrowRight className="size-4 mt-1" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <Card className="dynamic-card border border-border/70 bg-card/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
                  <p className="text-xs font-bold text-primary">Phase {activePhase + 1}</p>
                </span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{current.duration}</p>
              </div>
              <h3 className="font-mono text-2xl font-bold text-foreground">{current.phase}</h3>
              <p className="text-primary text-sm font-semibold mt-2">{current.headline}</p>
            </div>

            <div className="border-t border-border/30 pt-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {current.detail}
              </p>

              <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs font-mono font-bold text-primary mb-2">KEY METRIC TO WATCH:</p>
                <p className="text-sm text-primary/80">
                  {activePhase === 0 && "Volume below 50% of 30-day average = Safe accumulation"}
                  {activePhase === 1 && "Volume 2-3x average on breakout = Institutional confirmation"}
                  {activePhase === 2 && "RSI 70+ with rising price = Healthy momentum, not overbought"}
                  {activePhase === 3 && "RSI divergence or 50-MA break = Exit signal forming"}
                </p>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

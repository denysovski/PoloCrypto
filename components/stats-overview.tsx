"use client"

import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { useMarketSim } from "@/hooks/use-market-sim"

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

export function StatsOverview() {
  const { leaderboard, marketCap, marketVolume } = useMarketSim(2200)

  const positiveCount = leaderboard.filter((coin) => coin.change24h > 0).length
  const avgChange =
    leaderboard.length > 0
      ? leaderboard.reduce((sum, coin) => sum + coin.change24h, 0) / leaderboard.length
      : 0
  const strongestCoin = leaderboard[0]
  const weakestCoin = leaderboard[leaderboard.length - 1]
  const spread = strongestCoin && weakestCoin ? strongestCoin.change24h - weakestCoin.change24h : 0
  const volatilityIndex =
    leaderboard.length > 0
      ? leaderboard.reduce((sum, coin) => sum + Math.abs(coin.momentum), 0) / leaderboard.length
      : 0
  const volumeToCap = marketCap > 0 ? (marketVolume / marketCap) * 100 : 0

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-16">
      <div className="pointer-events-none absolute inset-0 animate-gradient bg-[linear-gradient(135deg,oklch(0.12_0.015_165),oklch(0.1_0.005_260),oklch(0.11_0.01_200),oklch(0.1_0.005_260))] bg-size-[300%_300%]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-130 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal direction="down">
          <div className="rounded-4xl border border-border bg-background/35 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Macro Snapshot</p>
            <h3 className="mt-3 font-mono text-3xl font-extrabold text-foreground">Market Momentum</h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-full border border-border/80 bg-background/60 p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Total Cap</p>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">${formatCompact(marketCap)}</p>
              </div>
              <div className="rounded-full border border-border/80 bg-background/60 p-6 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">24h Volume</p>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">${formatCompact(marketVolume)}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Volume/Cap Ratio</p>
                <p className="mt-1 font-mono text-xl font-bold text-foreground">{volumeToCap.toFixed(2)}%</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Volatility Index</p>
                <p className="mt-1 font-mono text-xl font-bold text-foreground">{volatilityIndex.toFixed(2)}</p>
              </div>
            </div>

            <Button className="mt-6 w-full">
              Learn More Metrics
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="zoom" delay={120}>
          <div className="rounded-4xl border border-border bg-background/35 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Breadth & Direction</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Coins in green</span>
                <span className="font-mono text-lg font-bold text-chart-1">
                  {positiveCount}/{leaderboard.length}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Average 24h move</span>
                <span className={`font-mono text-lg font-bold ${avgChange >= 0 ? "text-chart-1" : "text-destructive"}`}>
                  {avgChange > 0 ? "+" : ""}
                  {avgChange.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Current leader</span>
                <span className="font-mono text-lg font-bold text-foreground">{leaderboard[0]?.symbol ?? "--"}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 px-4 py-3">
                <span className="text-sm text-muted-foreground">Strength spread</span>
                <span className="font-mono text-lg font-bold text-foreground">{spread.toFixed(2)}%</span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/70 bg-background/45 p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Insight Feed</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between text-muted-foreground">
                  <span>Top momentum</span>
                  <span className="font-mono text-foreground">{strongestCoin?.symbol ?? "--"}</span>
                </li>
                <li className="flex items-center justify-between text-muted-foreground">
                  <span>Weakest trend</span>
                  <span className="font-mono text-foreground">{weakestCoin?.symbol ?? "--"}</span>
                </li>
                <li className="flex items-center justify-between text-muted-foreground">
                  <span>Market state</span>
                  <span className="font-mono text-foreground">
                    {avgChange >= 0 ? "Risk-On" : "Risk-Off"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

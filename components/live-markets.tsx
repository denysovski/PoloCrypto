"use client"

import { ArrowRight, Crown, TrendingDown, TrendingUp } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { useMarketSim } from "@/hooks/use-market-sim"

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

function formatPrice(value: number) {
  if (value >= 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }

  if (value >= 1) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })
}

export function LiveMarkets() {
  const { assets, leaderboard, marketCap, marketVolume } = useMarketSim(2200)

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Real-Time Crypto Pulse
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Market Leaderboard & Price List
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-border bg-transparent text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-secondary"
          >
            Learn More Insights
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <ScrollReveal direction="left">
          <div className="dynamic-card relative overflow-hidden rounded-4xl border border-border bg-card/30 p-6 backdrop-blur-sm sm:p-8">
            <div className="pointer-events-none absolute -left-12 -top-14 size-56 rounded-full bg-primary/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 right-0 size-64 rounded-full bg-chart-2/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-mono text-xl font-bold text-foreground">
                  Best Crypto Right Now
                </h3>
                <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  updates every 2.2s
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                {leaderboard.slice(0, 3).map((coin, index) => (
                  <div
                    key={coin.symbol}
                    className="dynamic-card group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Crown className="size-4" />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>

                    <p className="font-mono text-xl font-bold text-foreground">
                      {coin.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">{coin.name}</p>

                    <p className="mt-3 font-mono text-lg font-semibold text-foreground">
                      ${formatPrice(coin.price)}
                    </p>
                    <p
                      className={`mt-1 flex items-center gap-1 text-sm font-semibold ${
                        coin.change24h >= 0 ? "text-chart-1" : "text-destructive"
                      }`}
                    >
                      {coin.change24h >= 0 ? (
                        <TrendingUp className="size-3.5" />
                      ) : (
                        <TrendingDown className="size-3.5" />
                      )}
                      {coin.change24h > 0 ? "+" : ""}
                      {coin.change24h.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="dynamic-card rounded-2xl border border-border/80 bg-background/40 p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Total Simulated Market Cap
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-foreground">
                    ${formatCompact(marketCap)}
                  </p>
                </div>
                <div className="dynamic-card rounded-2xl border border-border/80 bg-background/40 p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Total 24h Volume
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-foreground">
                    ${formatCompact(marketVolume)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal direction="right" delay={120}>
            <div className="dynamic-card rounded-[1.75rem] border border-border bg-card/40 p-4 backdrop-blur-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between px-1">
                <h3 className="font-mono text-lg font-bold text-foreground">Live Market List</h3>
                <Button variant="ghost" className="h-8 px-2 text-xs text-primary hover:bg-primary/10">
                  Learn More
                </Button>
              </div>

              <div className="space-y-2">
                {assets.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="dynamic-card grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-3 py-2.5"
                  >
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">{coin.symbol}</p>
                      <p className="text-xs text-muted-foreground">{coin.name}</p>
                    </div>
                    <p className="font-mono text-sm font-semibold text-foreground">${formatPrice(coin.price)}</p>
                    <p
                      className={`text-xs font-semibold ${
                        coin.change24h >= 0 ? "text-chart-1" : "text-destructive"
                      }`}
                    >
                      {coin.change24h > 0 ? "+" : ""}
                      {coin.change24h.toFixed(2)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={180}>
            <div className="dynamic-card rounded-[1.75rem] border border-border bg-card/40 p-4 backdrop-blur-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between px-1">
                <h3 className="font-mono text-lg font-bold text-foreground">Price List (Spot Fees)</h3>
                <Button variant="ghost" className="h-8 px-2 text-xs text-primary hover:bg-primary/10">
                  Learn More
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  { tier: "Starter", monthly: "$0", fee: "0.12%", perk: "Basic analytics" },
                  { tier: "Active", monthly: "$29", fee: "0.08%", perk: "Pro chart suite" },
                  { tier: "Pro", monthly: "$99", fee: "0.04%", perk: "Bot API + alerts" },
                ].map((plan, index) => (
                  <div
                    key={plan.tier}
                    className={`dynamic-card relative overflow-hidden rounded-2xl border border-border/70 px-4 py-3 ${
                      index === 1 ? "bg-primary/10" : "bg-background/40"
                    }`}
                  >
                    <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                      <div>
                        <p className="font-mono text-sm font-bold text-foreground">{plan.tier}</p>
                        <p className="text-xs text-muted-foreground">{plan.perk}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-semibold text-foreground">{plan.monthly}/mo</p>
                        <p className="text-xs text-primary">{plan.fee} trade fee</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

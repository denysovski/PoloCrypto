"use client"

import { ArrowRight, BookOpen, ChevronDown, CirclePlay, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useMarketSim } from "@/hooks/use-market-sim"
import { useEffect, useState } from "react"

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

export function HeroSection() {
  const { leaderboard, marketVolume } = useMarketSim(2200)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let frameId = 0

    const onScroll = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const parallaxOffset = Math.min(scrollY * 0.08, 28)

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:px-8 sm:pt-24 lg:px-16">
      <div
        className="absolute inset-0 animate-gradient bg-[linear-gradient(135deg,oklch(0.12_0.02_260),oklch(0.08_0.03_200),oklch(0.1_0.04_165),oklch(0.06_0.02_280),oklch(0.12_0.02_260))] bg-size-[300%_300%]"
        style={{ transform: `translateY(${parallaxOffset * -0.35}px)` }}
      />
      <div
        className="pointer-events-none absolute left-1/3 top-20 size-72 rounded-full bg-primary/10 blur-[90px]"
        style={{ transform: `translateY(${parallaxOffset * -0.6}px)` }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-10 size-80 rounded-full bg-chart-2/10 blur-[110px]"
        style={{ transform: `translateY(${parallaxOffset * 0.45}px)` }}
      />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ScrollReveal direction="left">
          <div className="rounded-[2.2rem] border border-border/70 bg-background/45 p-6 backdrop-blur-md sm:p-8 lg:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="size-3.5" />
              Live Market Intelligence
            </div>

            <h1 className="font-mono text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              Trade Crypto
              <br />
              With Real-Time
              <br />
              Edge
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              React-powered live statistics, rotating opportunity leaderboard, and fast
              execution tools built for modern crypto traders.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="px-7 py-6 text-base font-bold">
                Start Trading
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-7 py-6 text-base">
                <CirclePlay className="mr-2 size-4" />
                Watch Demo
              </Button>
              <Button size="lg" variant="ghost" className="px-7 py-6 text-base text-primary hover:bg-primary/10">
                <BookOpen className="mr-2 size-4" />
                Learn More
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Best Performer</p>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">{leaderboard[0]?.symbol}</p>
                <p className="text-sm text-chart-1">
                  {leaderboard[0]?.change24h ? `${leaderboard[0].change24h > 0 ? "+" : ""}${leaderboard[0].change24h.toFixed(2)}%` : "--"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">24h Volume</p>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">${formatCompact(marketVolume)}</p>
                <p className="text-sm text-muted-foreground">simulated live feed</p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Assets</p>
                <p className="mt-2 font-mono text-2xl font-bold text-foreground">{leaderboard.length}</p>
                <p className="text-sm text-muted-foreground">auto-refreshing</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal direction="right" delay={120}>
            <div className="relative overflow-hidden rounded-4xl border border-border/70 bg-card/35 p-6 backdrop-blur-sm">
              <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full border border-primary/20" />
              <div className="pointer-events-none absolute right-4 top-4 size-28 rounded-full bg-primary/10 blur-xl" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Spheric Alpha Block</p>
              <h3 className="mt-3 font-mono text-2xl font-bold text-foreground">Opportunity Radar</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Track momentum reversals and trend continuation with visual pulses tuned for volatility.
              </p>
              <Button variant="outline" className="mt-5">
                Learn More
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={180}>
            <div className="grid grid-cols-2 gap-4">
              {leaderboard.slice(0, 2).map((coin, index) => (
                <div key={coin.symbol} className="rounded-[1.6rem] border border-border/70 bg-background/45 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Top {index + 1}</p>
                  <p className="mt-2 font-mono text-xl font-bold text-foreground">{coin.symbol}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{coin.name}</p>
                  <p className={`mt-2 text-sm font-semibold ${coin.change24h >= 0 ? "text-chart-1" : "text-destructive"}`}>
                    {coin.change24h > 0 ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
          })
        }
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs tracking-wide text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:text-foreground md:inline-flex"
      >
        Scroll Down
        <ChevronDown className="size-4 animate-bounce" />
      </button>
    </section>
  )
}

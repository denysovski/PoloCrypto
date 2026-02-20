"use client"

import { useEffect, useMemo, useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type CoinKey = "bitcoin" | "ethereum" | "solana"

type HistoryPoint = {
  timestamp: number
  dateLabel: string
  price: number
}

const coins: { key: CoinKey; label: string; symbol: string }[] = [
  { key: "bitcoin", label: "Bitcoin", symbol: "BTC" },
  { key: "ethereum", label: "Ethereum", symbol: "ETH" },
  { key: "solana", label: "Solana", symbol: "SOL" },
]

function formatPrice(value: number) {
  if (value >= 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
}

export function SixMonthHistory() {
  const [selectedCoin, setSelectedCoin] = useState<CoinKey>("bitcoin")
  const [points, setPoints] = useState<HistoryPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchHistory = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=max&interval=daily`,
          { cache: "no-store" }
        )

        const data = await response.json()
        if (!active) return

        const now = Date.now()
        const cutoff = now - 180 * 24 * 60 * 60 * 1000

        const history: HistoryPoint[] = (data.prices ?? [])
          .map((entry: [number, number]) => {
            const date = new Date(entry[0])
            return {
              timestamp: entry[0],
              price: entry[1],
              dateLabel: date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              }),
            }
          })
          .filter((point: HistoryPoint) => point.timestamp >= cutoff)

        setPoints(history)
      } catch {
        if (!active) return
        setPoints([])
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchHistory()

    return () => {
      active = false
    }
  }, [selectedCoin])

  const selectedMeta = useMemo(
    () => coins.find((coin) => coin.key === selectedCoin) ?? coins[0],
    [selectedCoin]
  )

  const first = points[0]?.price ?? 0
  const latest = points[points.length - 1]?.price ?? 0
  const performance = first > 0 ? ((latest - first) / first) * 100 : 0

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Full Market History Window
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Last 6 Months Trend
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Pulls complete history from CoinGecko and displays the latest 180 days.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {coins.map((coin) => (
              <button
                key={coin.key}
                type="button"
                onClick={() => setSelectedCoin(coin.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCoin === coin.key
                    ? "border-primary/40 bg-primary/15 text-primary"
                    : "border-border bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {coin.symbol}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <div className="dynamic-card rounded-4xl border border-border bg-card/35 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <div className="dynamic-card rounded-2xl border border-border/70 bg-background/45 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Asset</p>
              <p className="mt-1 font-mono text-xl font-bold text-foreground">{selectedMeta.label}</p>
            </div>
            <div className="dynamic-card rounded-2xl border border-border/70 bg-background/45 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Latest Price</p>
              <p className="mt-1 font-mono text-xl font-bold text-foreground">${formatPrice(latest)}</p>
            </div>
            <div className="dynamic-card rounded-2xl border border-border/70 bg-background/45 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">6M Performance</p>
              <p className={`mt-1 font-mono text-xl font-bold ${performance >= 0 ? "text-chart-1" : "text-destructive"}`}>
                {performance >= 0 ? "+" : ""}
                {performance.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="h-72 w-full sm:h-96">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "oklch(0.75 0.18 165)",
                },
              }}
              className="h-full w-full"
            >
              <LineChart data={points} margin={{ left: 12, right: 12, top: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="dateLabel" tickLine={false} axisLine={false} minTickGap={22} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={74}
                  tickFormatter={(value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_, payload) => {
                        const row = payload?.[0]?.payload as HistoryPoint | undefined
                        return row ? `Date: ${row.dateLabel}` : ""
                      }}
                      formatter={(value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  strokeWidth={2.4}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={900}
                />
              </LineChart>
            </ChartContainer>
          </div>

          {loading && <p className="mt-3 text-xs text-muted-foreground">Loading 6-month history...</p>}
        </div>
      </ScrollReveal>
    </section>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type CoinKey = "bitcoin" | "ethereum" | "solana"

type PricePoint = {
  timestamp: number
  price: number
  timeLabel: string
}

const coinOptions: { key: CoinKey; label: string; symbol: string }[] = [
  { key: "bitcoin", label: "Bitcoin", symbol: "BTC" },
  { key: "ethereum", label: "Ethereum", symbol: "ETH" },
  { key: "solana", label: "Solana", symbol: "SOL" },
]

function formatCompactPrice(value: number) {
  if (value >= 1000) {
    return value.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
}

export function LiveCoinChart() {
  const [selectedCoin, setSelectedCoin] = useState<CoinKey>("bitcoin")
  const [points, setPoints] = useState<PricePoint[]>([])
  const [change24h, setChange24h] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadSeries = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=1&interval=hourly`,
          { cache: "no-store" }
        )
        const data = await response.json()

        if (!isMounted) return

        const series: PricePoint[] = (data.prices ?? []).map((entry: [number, number]) => {
          const time = new Date(entry[0])
          return {
            timestamp: entry[0],
            price: entry[1],
            timeLabel: time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        })

        setPoints(series.slice(-36))
      } catch {
        if (!isMounted) return
        setPoints([])
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadSeries()

    return () => {
      isMounted = false
    }
  }, [selectedCoin])

  useEffect(() => {
    let active = true

    const pollLivePrice = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd&include_24hr_change=true`,
          { cache: "no-store" }
        )
        const data = await response.json()
        if (!active) return

        const livePrice = data?.[selectedCoin]?.usd
        const dayChange = data?.[selectedCoin]?.usd_24h_change

        if (typeof livePrice === "number") {
          const now = Date.now()
          const time = new Date(now)

          setPoints((prev) => {
            const next = [
              ...prev,
              {
                timestamp: now,
                price: livePrice,
                timeLabel: time.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]
            return next.slice(-45)
          })
        }

        if (typeof dayChange === "number") {
          setChange24h(dayChange)
        }
      } catch {
        // Silent fail to keep chart resilient
      }
    }

    pollLivePrice()
    const interval = setInterval(pollLivePrice, 15000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [selectedCoin])

  const selectedMeta = useMemo(
    () => coinOptions.find((coin) => coin.key === selectedCoin) ?? coinOptions[0],
    [selectedCoin]
  )

  const latestPrice = points[points.length - 1]?.price ?? 0

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Live Market API Feed
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Real-Time Coin Line
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Data source: CoinGecko public API (live market pricing).
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {coinOptions.map((coin) => (
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

      <ScrollReveal direction="up" delay={120}>
        <div className="dynamic-card rounded-4xl border border-border bg-card/30 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected Asset</p>
              <p className="font-mono text-2xl font-bold text-foreground">{selectedMeta.label}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Price</p>
              <p className="font-mono text-2xl font-bold text-foreground">${formatCompactPrice(latestPrice)}</p>
              <p className={`text-sm font-semibold ${change24h >= 0 ? "text-chart-1" : "text-destructive"}`}>
                {change24h >= 0 ? "+" : ""}
                {change24h.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="h-70 w-full sm:h-85">
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "oklch(0.75 0.18 165)",
                },
              }}
              className="h-full w-full"
            >
              <LineChart data={points} margin={{ left: 12, right: 12, top: 12, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="timeLabel"
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                  width={72}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      labelFormatter={(_, payload) => {
                        const row = payload?.[0]?.payload as PricePoint | undefined
                        return row ? `Time: ${row.timeLabel}` : ""
                      }}
                      formatter={(value) => `$${Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="var(--color-price)"
                  strokeWidth={2.3}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={650}
                />
              </LineChart>
            </ChartContainer>
          </div>

          {isLoading && (
            <p className="mt-3 text-xs text-muted-foreground">Loading market series...</p>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type PricePoint = {
  timestamp: number
  price: number
  timeLabel: string
}

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
  const [points, setPoints] = useState<PricePoint[]>([])
  const [change1h, setChange1h] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadLastHourSeries = async () => {
      if (!active) return
      setIsLoading(true)

      try {
        const nowSec = Math.floor(Date.now() / 1000)
        const oneHourAgoSec = nowSec - 60 * 60

        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${oneHourAgoSec}&to=${nowSec}`,
          { cache: "no-store" }
        )

        const data = await response.json()
        if (!active) return

        const parsed: PricePoint[] = (data.prices ?? [])
          .map((entry: [number, number]) => {
            const date = new Date(entry[0])
            return {
              timestamp: entry[0],
              price: entry[1],
              timeLabel: date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          })
          .sort((a: PricePoint, b: PricePoint) => a.timestamp - b.timestamp)

        const deduped = parsed.filter(
          (point, index) => index === 0 || point.timestamp !== parsed[index - 1].timestamp
        )

        setPoints(deduped)

        if (deduped.length >= 2) {
          const first = deduped[0].price
          const last = deduped[deduped.length - 1].price
          setChange1h(((last - first) / first) * 100)
        } else {
          setChange1h(0)
        }
      } catch {
        if (!active) return
        setPoints([])
        setChange1h(0)
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadLastHourSeries()
    const interval = setInterval(loadLastHourSeries, 15000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  const latestPrice = points[points.length - 1]?.price ?? 0
  const pointCount = useMemo(() => points.length, [points])

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Live Market API Feed
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Bitcoin Last Hour Line
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Data source: CoinGecko range endpoint, refreshed every 15s.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={120}>
        <div className="dynamic-card rounded-4xl border border-border bg-card/30 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Asset</p>
              <p className="font-mono text-2xl font-bold text-foreground">Bitcoin (BTC)</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Price</p>
              <p className="font-mono text-2xl font-bold text-foreground">${formatCompactPrice(latestPrice)}</p>
              <p className={`text-sm font-semibold ${change1h >= 0 ? "text-chart-1" : "text-destructive"}`}>
                {change1h >= 0 ? "+" : ""}
                {change1h.toFixed(2)}% (1h)
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
              className="h-full w-full aspect-auto!"
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
                  connectNulls={true}
                  isAnimationActive={true}
                  animationDuration={650}
                />
              </LineChart>
            </ChartContainer>
          </div>

          {isLoading && (
            <p className="mt-3 text-xs text-muted-foreground">Loading Bitcoin last-hour history...</p>
          )}
          {!isLoading && pointCount < 2 && (
            <p className="mt-3 text-xs text-muted-foreground">Waiting for enough points to draw full line...</p>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}

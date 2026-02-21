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
  const [isConnected, setIsConnected] = useState(false)

  const hourMs = 60 * 60 * 1000

  useEffect(() => {
    let socket: WebSocket | null = null

    const connect = () => {
      socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade")

      socket.onopen = () => {
        setIsConnected(true)
      }

      socket.onclose = () => {
        setIsConnected(false)
      }

      socket.onerror = () => {
        setIsConnected(false)
      }

      socket.onmessage = (event) => {
        const payload = JSON.parse(event.data) as {
          p: string
          T: number
        }

        const price = Number(payload.p)
        const secondStamp = Math.floor(payload.T / 1000) * 1000
        const label = new Date(secondStamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })

        setPoints((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]

          if (last && last.timestamp === secondStamp) {
            next[next.length - 1] = {
              timestamp: secondStamp,
              price,
              timeLabel: label,
            }
          } else {
            next.push({ timestamp: secondStamp, price, timeLabel: label })
          }

          const cutoff = secondStamp - hourMs
          return next.filter((point) => point.timestamp >= cutoff)
        })
      }
    }

    connect()

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close()
      }
    }
  }, [])

  const latestPrice = points[points.length - 1]?.price ?? 0
  const pointCount = useMemo(() => points.length, [points])
  const priceChange =
    points.length > 1
      ? ((points[points.length - 1].price - points[0].price) / points[0].price) *
        100
      : 0

  const timeTicks = useMemo(() => {
    if (points.length < 2) return [] as number[]

    const latestTimestamp = points[points.length - 1].timestamp
    const startTimestamp = latestTimestamp - hourMs
    const firstTenMinuteMark = Math.ceil(startTimestamp / 600000) * 600000
    const ticks: number[] = []

    for (let tick = firstTenMinuteMark; tick <= latestTimestamp; tick += 600000) {
      ticks.push(tick)
    }

    return ticks
  }, [points, hourMs])

  const yDomain = useMemo(() => {
    if (points.length < 2) return [0, 1]
    const prices = points.map((p) => p.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min || min * 0.001 || 1
    // Use dynamic padding: 10% for large ranges, 5% for medium ranges, 2% for tight ranges
    const padPercent = range > min * 0.05 ? 0.1 : range > min * 0.01 ? 0.05 : 0.02
    const pad = Math.max(range * padPercent, min * 0.001)
    return [min - pad, max + pad]
  }, [points])

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Live Market API Feed
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Bitcoin Live Tick Line
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Data source: Binance real-time trade stream (updates every second).
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
              <p className={`mt-1 text-xs font-semibold ${isConnected ? "text-chart-1" : "text-destructive"}`}>
                {isConnected ? "Live stream connected" : "Reconnecting..."}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Live Price</p>
              <p className="font-mono text-2xl font-bold text-foreground">${formatCompactPrice(latestPrice)}</p>
              <p className={`text-sm font-semibold ${priceChange >= 0 ? "text-chart-1" : "text-destructive"}`}>
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}% (window)
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
              <LineChart data={points} margin={{ left: 12, right: 12, top: 32, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  type="number"
                  scale="time"
                  domain={["dataMin", "dataMax"]}
                  ticks={timeTicks}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                  tickFormatter={(value) =>
                    new Date(Number(value)).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  }
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={yDomain as [number, number]}
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
                  strokeWidth={2.8}
                  dot={false}
                  connectNulls={true}
                  isAnimationActive={true}
                  animationDuration={280}
                />
              </LineChart>
            </ChartContainer>
          </div>

          {pointCount < 2 && (
            <p className="mt-3 text-xs text-muted-foreground">Waiting for live ticks to render line...</p>
          )}
        </div>
      </ScrollReveal>
    </section>
  )
}

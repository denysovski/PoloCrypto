"use client"

import { useEffect, useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TrendingDown, TrendingUp } from "lucide-react"

type MarketCoin = {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

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
  const [coins, setCoins] = useState<MarketCoin[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const fetchTopByMarketCap = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h",
          { cache: "no-store" }
        )

        const data = (await response.json()) as MarketCoin[]
        if (!active) return

        setCoins(data)
      } catch {
        if (!active) return
        setCoins([])
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchTopByMarketCap()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Full Market History Window
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Last 6 Months Trend
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Top 10 cryptocurrencies by market cap (live ranking from CoinGecko).
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={100}>
        <div className="dynamic-card rounded-4xl border border-border bg-card/35 p-4 backdrop-blur-sm sm:p-6">
          <div className="overflow-hidden rounded-3xl border border-border/70">
            <div className="hidden grid-cols-[3rem_1.4fr_1fr_1fr] border-b border-border/70 bg-background/45 px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground sm:grid">
              <span>#</span>
              <span>Asset</span>
              <span className="text-right">Price</span>
              <span className="text-right">24h</span>
            </div>

            <div className="divide-y divide-border/60">
              {coins.map((coin, index) => (
                <div
                  key={coin.id}
                  className="dynamic-card grid grid-cols-[2.2rem_1fr] items-center gap-3 bg-background/35 px-4 py-3 sm:grid-cols-[3rem_1.4fr_1fr_1fr]"
                >
                  <span className="font-mono text-sm text-muted-foreground">{index + 1}</span>
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="size-6 rounded-full" />
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">{coin.name}</p>
                      <p className="text-xs uppercase text-muted-foreground">{coin.symbol}</p>
                    </div>
                  </div>
                  <p className="text-right font-mono text-sm font-semibold text-foreground">
                    ${formatPrice(coin.current_price)}
                  </p>
                  <p
                    className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                      coin.price_change_percentage_24h >= 0 ? "text-chart-1" : "text-destructive"
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="size-3.5" />
                    ) : (
                      <TrendingDown className="size-3.5" />
                    )}
                    {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {loading && <p className="mt-3 text-xs text-muted-foreground">Loading top market-cap list...</p>}
        </div>
      </ScrollReveal>
    </section>
  )
}

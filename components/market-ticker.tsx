"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useMarketSim } from "@/hooks/use-market-sim"

function formatPrice(price: number) {
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 2 })
  if (price >= 1) return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return price.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function TickerItem({
  symbol,
  price,
  change,
  up,
}: {
  symbol: string
  price: number
  change: number
  up: boolean
}) {
  return (
    <div className="flex items-center gap-2 px-4 sm:gap-4 sm:px-6">
      <span className="font-mono text-xs font-bold text-foreground sm:text-sm">
        {symbol}
      </span>
      <span className="text-xs text-muted-foreground sm:text-sm">
        ${formatPrice(price)}
      </span>
      <span
        className={`flex items-center gap-1 text-[10px] font-semibold sm:text-xs ${
          up ? "text-chart-1" : "text-destructive"
        }`}
      >
        {up ? (
          <TrendingUp className="size-2.5 sm:size-3" />
        ) : (
          <TrendingDown className="size-2.5 sm:size-3" />
        )}
        {change > 0 ? "+" : ""}
        {change.toFixed(2)}%
      </span>
    </div>
  )
}

export function MarketTicker() {
  const { assets } = useMarketSim(1800)

  return (
    <div className="overflow-hidden border-b border-border bg-card/50 py-2.5 backdrop-blur-sm sm:py-3">
      <div className="animate-ticker flex w-max">
        {[...assets, ...assets].map((item, i) => (
          <TickerItem
            key={`${item.symbol}-${i}`}
            symbol={item.symbol}
            price={item.price}
            change={item.change24h}
            up={item.change24h >= 0}
          />
        ))}
      </div>
    </div>
  )
}

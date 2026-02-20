"use client"

import { useEffect, useMemo, useState } from "react"

export type MarketAsset = {
  symbol: string
  name: string
  price: number
  previousPrice: number
  baselinePrice: number
  marketCap: number
  volume24h: number
}

const seedAssets: MarketAsset[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 97432.18,
    previousPrice: 96800,
    baselinePrice: 96210,
    marketCap: 1.92e12,
    volume24h: 48.2e9,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3421.56,
    previousPrice: 3382,
    baselinePrice: 3330,
    marketCap: 411.3e9,
    volume24h: 18.7e9,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 187.92,
    previousPrice: 183.2,
    baselinePrice: 178,
    marketCap: 86.4e9,
    volume24h: 4.8e9,
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 612.34,
    previousPrice: 614,
    baselinePrice: 617,
    marketCap: 91.2e9,
    volume24h: 2.1e9,
  },
  {
    symbol: "XRP",
    name: "Ripple",
    price: 2.87,
    previousPrice: 2.81,
    baselinePrice: 2.74,
    marketCap: 164.5e9,
    volume24h: 8.3e9,
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.94,
    previousPrice: 0.95,
    baselinePrice: 0.98,
    marketCap: 33.1e9,
    volume24h: 1.8e9,
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: 42.18,
    previousPrice: 41.5,
    baselinePrice: 39.8,
    marketCap: 17.5e9,
    volume24h: 1.4e9,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: 18.67,
    previousPrice: 18.2,
    baselinePrice: 17.6,
    marketCap: 11.7e9,
    volume24h: 780e6,
  },
]

function randomDrift(symbol: string) {
  const volatilityBias: Record<string, number> = {
    BTC: 0.004,
    ETH: 0.005,
    SOL: 0.009,
    BNB: 0.004,
    XRP: 0.01,
    ADA: 0.011,
    AVAX: 0.012,
    LINK: 0.01,
  }

  const range = volatilityBias[symbol] ?? 0.006
  return (Math.random() * 2 - 1) * range
}

export function useMarketSim(tickMs = 2200) {
  const [assets, setAssets] = useState<MarketAsset[]>(seedAssets)

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          const drift = randomDrift(asset.symbol)
          const momentum = (asset.price - asset.baselinePrice) / asset.baselinePrice
          const correction = momentum * -0.05
          const nextPrice = Math.max(0.0001, asset.price * (1 + drift + correction))
          const capChange = 1 + drift * 0.7
          const volumeChange = 1 + Math.abs(drift) * 6

          return {
            ...asset,
            previousPrice: asset.price,
            price: nextPrice,
            marketCap: Math.max(1, asset.marketCap * capChange),
            volume24h: Math.max(1, asset.volume24h * volumeChange),
          }
        })
      )
    }, tickMs)

    return () => clearInterval(interval)
  }, [tickMs])

  const enrichedAssets = useMemo(
    () =>
      assets.map((asset) => {
        const change24h = ((asset.price - asset.baselinePrice) / asset.baselinePrice) * 100
        const momentum = ((asset.price - asset.previousPrice) / asset.previousPrice) * 100

        return {
          ...asset,
          change24h,
          momentum,
          isUp: change24h >= 0,
        }
      }),
    [assets]
  )

  const leaderboard = useMemo(
    () => [...enrichedAssets].sort((a, b) => b.change24h - a.change24h),
    [enrichedAssets]
  )

  return {
    assets: enrichedAssets,
    leaderboard,
    marketVolume: enrichedAssets.reduce((sum, asset) => sum + asset.volume24h, 0),
    marketCap: enrichedAssets.reduce((sum, asset) => sum + asset.marketCap, 0),
  }
}

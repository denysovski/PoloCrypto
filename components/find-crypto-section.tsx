"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"

const cryptoGuidelines = [
  {
    id: 1,
    category: "Bitcoin (BTC)",
    level: "Conservative",
    description:
      "The original and most mature cryptocurrency. Perfect for risk-averse investors. Bitcoin has a fixed 21M supply cap, making it a true store of value like digital gold. Institutional adoption is strong with companies like Tesla and Microstrategy holding on balance sheets. Regulatory clarity is improving globally. Bitcoin dominance in the market gives it defensive characteristics during altcoin downturns.",
    pros: ["Established 15+ year history", "Greatest network security", "Institutional adoption", "Clear supply cap", "Proven store of value"],
    cons: ["Slower transactions", "Lower upside potential", "No smart contracts capability"],
  },
  {
    id: 2,
    category: "Ethereum (ETH)",
    level: "Moderate Risk",
    description:
      "The smart contract platform powering DeFi, NFTs, and 1000s of dApps. Ethereum has real utility with billions locked in protocols. The 2022 merge to Proof-of-Stake significantly reduced energy usage and enabled staking rewards (4-5% APY). With upcoming upgrades, scalability continues improving. Projects like Uniswap, Aave, and OpenSea depend entirely on Ethereum.",
    pros: ["Dominant platform", "Staking income", "DeFi ecosystem", "Layer 2 scaling solutions", "Developer activity"],
    cons: ["Network congestion during peaks", "Regulatory uncertainty", "Complexity vs Bitcoin"],
  },
  {
    id: 3,
    category: "Layer 2s (SOL, ARB, OPT)",
    level: "Moderate-High Risk",
    description:
      "Solana, Arbitrum, and Optimism offer faster and cheaper transactions than Ethereum mainnet. Solana processes 65,000 TPS with $0.0001 fees. These tokens power the future of DeFi and gaming. However, Layer 2s depend on their respective ecosystems gaining traction. Solana had network outages (now more stable), while Arbitrum/Optimism compete directly.",
    pros: ["High speed and low cost", "Growing DeFi ecosystem", "Gaming and NFT adoption", "Developer incentives"],
    cons: ["Execution risk", "Ethereum dependency (L2s)", "Smaller ecosystems"],
  },
  {
    id: 4,
    category: "High-Growth Projects",
    level: "High Risk",
    description:
      "Emerging cryptocurrencies with strong use cases but unproven market staying power. Look for: Clear problem solved (e.g., privacy, interoperability). Experienced team with shipped product. Active development (check GitHub). Real adoption, not just hype. Low debt/funding burn rate. Examples: Monero (privacy), Cosmos (interoperability), Chainlink (oracles). Never risk capital you can't afford to lose in this category.",
    pros: ["Massive upside potential", "Innovation-driven", "Early adoption advantage"],
    cons: ["High failure rate", "Regulatory risk", "Liquidity concerns", "Team execution risk"],
  },
]

export function FindCryptoSection() {
  const [activeTab, setActiveTab] = useState(0)
  const data = cryptoGuidelines[activeTab]

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Research Guide
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Find <br /> the Best Crypto
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A systematic approach to evaluating cryptocurrency projects based on fundamentals, team quality, and market readiness. Not all coins are equal.
            </p>

            <div className="mt-8 space-y-2">
              {cryptoGuidelines.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === index
                      ? "bg-primary/20 border border-primary/40 text-foreground"
                      : "bg-background/40 border border-border/50 text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <p className="font-mono text-sm font-bold">{item.category}</p>
                  <p className="text-xs mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      item.level === "Conservative"
                        ? "bg-chart-1/20 text-chart-1"
                        : item.level === "Moderate Risk"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : item.level === "Moderate-High Risk"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {item.level}
                    </span>
                  </p>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <Card className="dynamic-card border border-border/70 bg-card/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <p className="text-xs font-semibold text-primary">{data.category}</p>
              </div>
              <h3 className="font-mono text-2xl font-bold text-foreground">{data.category}</h3>
              <p className="text-sm text-muted-foreground mt-3">{data.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="font-mono text-sm font-bold text-chart-1 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="size-4" /> Advantages
                </h4>
                <ul className="space-y-2">
                  {data.pros.map((pro, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-chart-1 mt-1">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-sm font-bold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="size-4" /> Risks
                </h4>
                <ul className="space-y-2">
                  {data.cons.map((con, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

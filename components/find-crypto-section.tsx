"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { AlertTriangle, BarChart2, Layers3, ShieldCheck, Table2 } from "lucide-react"

const assets = ["BTC", "ETH", "Mid-Caps"]

const matrix = [
  {
    factor: "Liquidity Depth",
    btc: "High",
    eth: "High",
    mid: "Medium",
  },
  {
    factor: "Security Maturity",
    btc: "High",
    eth: "High",
    mid: "Low-Med",
  },
  {
    factor: "Upside Potential",
    btc: "Medium",
    eth: "Med-High",
    mid: "High",
  },
  {
    factor: "Drawdown Risk",
    btc: "Medium",
    eth: "Med-High",
    mid: "High",
  },
]

const legends = [
  { icon: Layers3, title: "Role", text: "Define whether each asset is core or satellite in your allocation." },
  { icon: ShieldCheck, title: "Resilience", text: "Prefer assets that survive stress periods with strong liquidity." },
  { icon: AlertTriangle, title: "Invalidation", text: "Document what would make the thesis wrong before entering." },
]

export function FindCryptoSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Research Guide
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Find the Best Crypto
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Use a comparison matrix to rank assets by quality, risk profile, and portfolio function.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="space-y-4">
            <Card className="dynamic-card border border-border/70 bg-card/30 p-6 backdrop-blur-sm">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Table2 className="size-4" /> Research Matrix
              </p>

              <div className="overflow-x-auto">
                <div className="min-w-[560px] rounded-xl border border-border/60 bg-background/35">
                  <div className="grid grid-cols-4 border-b border-border/60 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground">
                    <span>Factor</span>
                    {assets.map((asset) => (
                      <span key={asset} className="text-center font-semibold text-foreground">{asset}</span>
                    ))}
                  </div>

                  {matrix.map((row) => (
                    <div key={row.factor} className="grid grid-cols-4 items-center border-b border-border/40 px-4 py-3 text-sm last:border-b-0">
                      <span className="font-mono font-semibold text-foreground">{row.factor}</span>
                      <span className="text-center text-muted-foreground">{row.btc}</span>
                      <span className="text-center text-muted-foreground">{row.eth}</span>
                      <span className="text-center text-muted-foreground">{row.mid}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">
                  Build with a quality core first (BTC/ETH), then add smaller growth exposure only when market breadth and liquidity improve.
                </p>
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {legends.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.title} className="dynamic-card border border-border/70 bg-card/25 p-4 backdrop-blur-sm">
                    <Icon className="mb-2 size-4 text-primary" />
                    <p className="font-mono text-sm font-bold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

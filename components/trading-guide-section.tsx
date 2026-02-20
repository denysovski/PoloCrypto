"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const tradingArticles = [
  {
    id: 1,
    title: "Position Sizing Strategy",
    preview: "The 2% Rule and Risk Management",
    content:
      "Professional traders follow the 2% rule: never risk more than 2% of your total capital on a single trade. This means if you have $10,000, your maximum loss per trade should be $200. This approach protects your portfolio from catastrophic losses during inevitable downturns. Calculate your position size by dividing your risk amount by the distance to your stop-loss. For example, if you're willing to lose $200 and your stop is $500 away, you trade 0.4 BTC. This mathematical discipline separates successful traders from gamblers who chase volatile moves.",
  },
  {
    id: 2,
    title: "Entry and Exit Points",
    preview: "Technical Levels that Matter",
    content:
      "Success isn't about perfect timing—it's about trading at levels that work. Identify support and resistance by looking at where price has bounced multiple times. Enter on breaks above resistance with volume confirmation. Set your stop below the recent swing low. Take profits at previous resistance levels, not just at arbitrary percentages. Many traders use the 3:1 risk-reward ratio: if risking $200, they aim for $600 profit minimum. This ensures your winners significantly outweigh your losers over time, creating profitability despite being right only 40% of the time.",
  },
  {
    id: 3,
    title: "Emotional Discipline",
    preview: "Why Most Traders Fail",
    content:
      "Studies show 90% of retail traders lose money, not due to poor strategy but poor execution. Fear and greed are your worst enemies. When you're wrong, your emotions tell you to hold hoping for recovery. When you're right, your emotions tell you to exit early out of fear. The solution: pre-plan everything before entering. Write down your entry, stop-loss, and target before you even buy. Then execute mechanically without watching every tick. Use alerts instead of staring at charts. This removes emotion from the equation and lets your system work. Take breaks when frustrated—trading with an upset mind guarantees losses.",
  },
  {
    id: 4,
    title: "Portfolio Construction",
    preview: "Diversification and Balance",
    content:
      "Don't put all eggs in one crypto. A balanced portfolio might be: 40% Bitcoin (store of value, least volatile), 30% Large-cap alts (Ethereum, SOL—established projects), 20% Mid-cap altcoins (higher growth potential), 10% experimental tokens (highest risk/reward). Rebalance quarterly: if Bitcoin grows to 55%, sell some and rebuy underperformers. This forces you to 'buy low, sell high' automatically. Never chase hype while ignoring your allocation plan. The boring, diversified portfolio outperforms single-coin bets over multiple market cycles because it survives downturns and captures recovery systematically.",
  },
]

export function TradingGuideSection() {
  const [activeArticle, setActiveArticle] = useState(0)
  const article = tradingArticles[activeArticle]

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Trading Education
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              How to Trade <br /> Efficiently
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Learn the core principles that separate professional traders from casual speculators. These proven techniques have worked across multiple market cycles.
            </p>

            <div className="mt-8 space-y-2">
              {tradingArticles.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveArticle(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeArticle === index
                      ? "bg-primary/20 border border-primary/40 text-foreground"
                      : "bg-background/40 border border-border/50 text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <p className="font-mono text-sm font-bold">{item.title}</p>
                  <p className="text-xs mt-1 opacity-75">{item.preview}</p>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <Card className="dynamic-card border border-border/70 bg-card/30 p-8 backdrop-blur-sm h-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Article {activeArticle + 1} of {tradingArticles.length}
                </p>
                <h3 className="font-mono text-2xl font-bold text-foreground mt-2">
                  {article.title}
                </h3>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-primary/80 font-semibold mb-4">{article.preview}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {article.content}
            </p>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

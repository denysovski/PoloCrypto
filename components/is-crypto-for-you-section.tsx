"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"

const assessmentCriteria = [
  {
    id: 1,
    category: "Financial Readiness",
    icon: "💰",
    evaluation: [
      { criterion: "Emergency fund (3-6 months expenses)", required: true, yours: null },
      { criterion: "No high-interest debt (credit cards)", required: true, yours: null },
      { criterion: "Stable income for next 2+ years", required: true, yours: null },
      { criterion: "Risk capital not needed within 5 years", required: false, yours: null },
      { criterion: "Net worth > $50k (scaling advantage)", required: false, yours: null },
    ],
    content:
      "Crypto is only for money you can afford to lose completely. If it disappears, would it impact your lifestyle? If yes, don't invest yet. Build emergency savings first. You need stable income because crypto requires patience through downturns—you can't panic sell if you need the money next month. A $5k investment on $50k income is risky; on $500k income it's prudent. Context matters.",
  },
  {
    id: 2,
    category: "Psychological Readiness",
    icon: "🧠",
    evaluation: [
      { criterion: "Can watch 50% losses without panic selling", required: true, yours: null },
      { criterion: "Won't check price daily (reduces FOMO)", required: true, yours: null },
      { criterion: "Can ignore social media hype/FUD", required: true, yours: null },
      { criterion: "Understand losses are education, not failure", required: false, yours: null },
      { criterion: "Have a plan and can stick to it", required: false, yours: null },
    ],
    content:
      "Most people fail at crypto not due to bad strategy but bad psychology. Bitcoin dropped 65% in 2022. Those who panic sold lost. Those who held (or bought more) made 100%+ since. Can you watch your $10k become $5k and sleep? Can you ignore friends bragging about 'quick 10x coins'? Discipline > everything. Set rules before investing: 'If down 30%, I hold. If up 200%, I sell half.' Then execute those rules regardless of emotions.",
  },
  {
    id: 3,
    category: "Knowledge Requirements",
    icon: "📚",
    evaluation: [
      { criterion: "Understand blockchain basics", required: true, yours: null },
      { criterion: "Know difference between Bitcoin and alt-coins", required: true, yours: null },
      { criterion: "Can research a project independently", required: true, yours: null },
      { criterion: "Understanding of tax implications", required: false, yours: null },
      { criterion: "Study market cycles (bull/bear)", required: false, yours: null },
    ],
    content:
      "Crypto ignorance is expensive. People lose millions to scams they don't understand. You don't need a PhD, but understand: What's a blockchain? How does Bitcoin get its value? What's the difference between holding and staking? You should be able to read a project's GitHub or whitepaper. Follow major crypto news sources (CoinTelegraph, The Block). Join communities and learn from others. Education is a one-time cost; ignorance is a recurring one.",
  },
  {
    id: 4,
    category: "Risk Tolerance Framework",
    icon: "⚡",
    evaluation: [
      { criterion: "Net worth to crypto ratio < 20%", required: true, yours: null },
      { criterion: "Okay with zero downside in worst case", required: true, yours: null },
      { criterion: "Can explain your strategy to others", required: true, yours: null },
      { criterion: "Have exit targets, not just 'hodl forever'", required: false, yours: null },
      { criterion: "Appreciate Bitcoin but understand leverage kills", required: false, yours: null },
    ],
    content:
      "A $10k crypto investment is different at $50k net worth vs $1M net worth. The first is 20% of wealth (risky). The second is 1% (prudent). Diversification matters. Never leverage or margin trade if you value sleep. Never put more than 20% of net worth in crypto, even if bullish. The best cryptonomist in the world can lose 100% on leverage. On spot holdings, you lose at most your investment—you learn from it and rebuild.",
  },
]

export function IsCryptoForYouSection() {
  const [activeTab, setActiveTab] = useState(0)
  const data = assessmentCriteria[activeTab]

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        <ScrollReveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Self Assessment
            </p>
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Is Crypto Really <br /> for You?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              An honest evaluation framework to determine if you're ready for cryptocurrency. Most people aren't, and that's okay.
            </p>

            <div className="mt-8 space-y-2">
              {assessmentCriteria.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all border ${
                    activeTab === index
                      ? "bg-primary/20 border-primary/40 text-foreground"
                      : "bg-background/40 border-border/50 text-muted-foreground hover:bg-background/60 hover:text-foreground"
                  }`}
                >
                  <p className="text-2xl mb-1">{item.icon}</p>
                  <p className="font-mono text-sm font-bold">{item.category}</p>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <Card className="dynamic-card border border-border/70 bg-card/30 p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="font-mono text-2xl font-bold text-foreground flex items-center gap-3 mb-4">
                <span className="text-3xl">{data.icon}</span>
                {data.category}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {data.content}
              </p>
            </div>

            <div className="border-t border-border/30 pt-6">
              <h4 className="font-mono text-sm font-bold text-primary mb-4">Your Checklist:</h4>
              <div className="space-y-3">
                {data.evaluation.map((item, i) => (
                  <label key={i} className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 accent-primary"
                      defaultChecked={item.yours}
                    />
                    <span className={`text-sm leading-relaxed transition-colors ${
                      item.required
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground"
                    }`}>
                      {item.criterion}
                      {item.required && <span className="text-primary ml-2">*</span>}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                <span className="text-primary">* Required</span> for responsible crypto participation
              </p>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

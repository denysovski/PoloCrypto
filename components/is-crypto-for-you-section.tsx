"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { Card } from "@/components/ui/card"
import {
  CheckCircle2,
  XCircle,
  Heart,
  Lightbulb,
} from "lucide-react"

const considerationItems = [
  {
    icon: CheckCircle2,
    title: "Right If You Have...",
    isPositive: true,
    description:
      "Emergency fund (3-6 months savings), stable income, risk tolerance, and long-term investment horizon. Crypto can be a wealth-building tool when you're financially prepared.",
  },
  {
    icon: XCircle,
    title: "Risky If You...",
    isPositive: false,
    description:
      "Invest money you need soon, borrowed funds with obligation, or lack emergency savings. Never use leverage if you don't fully understand the risks involved.",
  },
  {
    icon: Heart,
    title: "Emotional Resilience",
    isPositive: true,
    description:
      "Can you handle 50% drawdowns without panic selling? Crypto volatility tests emotional discipline. Success requires patience, conviction, and emotional control.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge is Power",
    isPositive: true,
    description:
      "Invest in learning continuously. Understand blockchain, tokenomics, security practices, and tax implications. An educated investor makes better decisions.",
  },
]

export function IsCryptoForYouSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Self Assessment
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Is Crypto Really for You?
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Honestly evaluate if cryptocurrency investing aligns with your financial situation and goals.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {considerationItems.map((item, index) => {
          const Icon = item.icon
          return (
            <ScrollReveal key={item.title} delay={index * 50} direction="up">
              <Card 
                className={`dynamic-card border backdrop-blur-sm transition-all hover:bg-card/50 p-6 ${
                  item.isPositive 
                    ? "border-chart-1/30 bg-chart-1/5" 
                    : "border-destructive/30 bg-destructive/5"
                }`}
              >
                <div 
                  className={`mb-4 rounded-lg p-3 w-fit ${
                    item.isPositive 
                      ? "bg-chart-1/10" 
                      : "bg-destructive/10"
                  }`}
                >
                  <Icon 
                    className={`size-6 ${
                      item.isPositive ? "text-chart-1" : "text-destructive"
                    }`} 
                  />
                </div>
                <h3 className="mb-2 font-mono text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}

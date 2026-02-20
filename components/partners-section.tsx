"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

const partners = [
  "Chainlink",
  "Polygon",
  "Arbitrum",
  "Optimism",
  "Aave",
  "Uniswap",
]

export function PartnersSection() {
  return (
    <section className="border-b border-border px-6 py-16 sm:px-8 lg:px-16">
      <ScrollReveal>
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by leading protocols & institutions
        </p>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner, i) => (
          <ScrollReveal key={partner} delay={i * 80}>
            <div className="group flex h-16 items-center justify-center rounded-xl border border-border/50 bg-card/30 px-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/60">
              <span className="font-mono text-sm font-bold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {partner}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

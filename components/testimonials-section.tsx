"use client"

import { Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HoverGlowCard } from "@/components/hover-glow-card"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Portfolio Manager",
    company: "Apex Capital",
    initials: "SC",
    quote:
      "NexVault's analytics suite is unmatched. The real-time data and AI signals have transformed how our fund approaches crypto markets.",
    stars: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "DeFi Developer",
    company: "Web3 Labs",
    initials: "MR",
    quote:
      "The API is incredibly well-documented and the WebSocket feeds are lightning fast. Best developer experience in the crypto exchange space.",
    stars: 5,
  },
  {
    name: "Emma Johansson",
    role: "Retail Trader",
    company: "Independent",
    initials: "EJ",
    quote:
      "Switched from three other exchanges. The fees are transparent, execution is instant, and I finally feel like my assets are actually secure.",
    stars: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Trusted by Traders</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hear from professionals and traders who rely on NexVault every day.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 120} direction="up">
            <HoverGlowCard className="h-full rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
              <div className="flex h-full flex-col p-6 sm:p-8">
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </HoverGlowCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

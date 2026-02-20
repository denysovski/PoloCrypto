"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export function CTASection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal direction="scale">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          {/* Gradient background */}
          <div className="absolute inset-0 animate-gradient bg-[linear-gradient(135deg,oklch(0.15_0.03_165),oklch(0.1_0.02_200),oklch(0.12_0.03_260),oklch(0.08_0.02_165))] bg-[length:300%_300%]" />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] sm:size-[500px] sm:blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 size-[300px] translate-y-1/2 rounded-full bg-chart-2/5 blur-[80px]" />

          <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-16 lg:py-28">
            <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-6xl">
              <span className="text-balance">Ready to Start Trading?</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
              Join over 2 million traders already using NexVault. Create your
              free account in under 2 minutes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <Button
                size="lg"
                className="w-full bg-primary px-10 py-6 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_40px_oklch(0.75_0.18_165_/_0.3)] sm:w-auto"
              >
                Create Free Account
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-border bg-transparent px-10 py-6 text-base font-medium text-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-secondary sm:w-auto"
              >
                Contact Sales
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground sm:text-sm">
              No credit card required. Start with $0 fees for 30 days.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

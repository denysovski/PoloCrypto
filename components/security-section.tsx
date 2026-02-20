"use client"

import {
  Shield,
  Lock,
  Fingerprint,
  Eye,
  Server,
  KeyRound,
} from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { HoverGlowCard } from "@/components/hover-glow-card"

const securityFeatures = [
  {
    icon: <Shield className="size-6" />,
    title: "SOC 2 Type II",
    description: "Independently audited security controls and data protection.",
  },
  {
    icon: <Lock className="size-6" />,
    title: "Cold Storage",
    description: "95% of assets stored in air-gapped, multi-sig cold wallets.",
  },
  {
    icon: <Fingerprint className="size-6" />,
    title: "Biometric Auth",
    description: "Face ID, fingerprint, and hardware key authentication.",
  },
  {
    icon: <Eye className="size-6" />,
    title: "Real-Time Monitoring",
    description: "24/7 threat detection with AI-powered anomaly analysis.",
  },
  {
    icon: <Server className="size-6" />,
    title: "DDoS Protection",
    description: "Enterprise-grade infrastructure with global CDN shielding.",
  },
  {
    icon: <KeyRound className="size-6" />,
    title: "Insurance Fund",
    description: "$500M reserve fund covering potential security incidents.",
  },
]

export function SecuritySection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-16">
      <ScrollReveal>
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Security First
          </p>
          <h2 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">Enterprise-Grade Protection</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Your assets are protected by the same security infrastructure trusted by banks and institutions.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {securityFeatures.map((feature, i) => (
          <ScrollReveal key={feature.title} delay={i * 80} direction="up">
            <HoverGlowCard className="h-full rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
              <div className="flex items-start gap-4 p-6">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-mono text-base font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </HoverGlowCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

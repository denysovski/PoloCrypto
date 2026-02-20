"use client"

import { Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const footerLinks = [
  {
    title: "Products",
    links: [
      "Spot Trading",
      "Derivatives",
      "DeFi",
      "NFTs",
      "Earn",
      "Launchpad",
    ],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "API Reference",
      "Academy",
      "Blog",
      "Research",
      "Status",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Partners", "Legal", "Contact"],
  },
  {
    title: "Support",
    links: [
      "Help Center",
      "Community",
      "Bug Bounty",
      "Fees",
      "Terms",
      "Privacy",
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-16 sm:px-8 lg:px-16">
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <ScrollReveal className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_oklch(0.75_0.18_165_/_0.2)]">
              <Zap className="size-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-lg font-bold text-foreground">
              NexVault
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The next generation crypto platform for serious traders and
            institutions.
          </p>
          {/* Social links */}
          <div className="mt-6 flex gap-3">
            {["X", "GH", "DC", "TG"].map((label) => (
              <a
                key={label}
                href="#"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-xs font-bold text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Links */}
        {footerLinks.map((section, i) => (
          <ScrollReveal key={section.title} delay={i * 80}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {section.title}
            </p>
            <ul className="flex flex-col gap-3">
              {section.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:translate-x-0.5"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 NexVault. All rights reserved. Cryptocurrency trading involves
            risk.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </footer>
  )
}

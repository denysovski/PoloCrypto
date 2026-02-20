import { SidebarNav } from "@/components/sidebar-nav"
import { MobileNav } from "@/components/mobile-nav"
import { MarketTicker } from "@/components/market-ticker"
import { HeroSection } from "@/components/hero-section"
import { PartnersSection } from "@/components/partners-section"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import { LiveMarkets } from "@/components/live-markets"
import { StatsOverview } from "@/components/stats-overview"
import { SecuritySection } from "@/components/security-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { CustomCursor } from "@/components/custom-cursor"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SidebarNav />
      </div>

      {/* Mobile navigation */}
      <MobileNav />

      {/* Main content */}
      <main className="flex-1 pt-20 lg:ml-72 lg:pt-0">
        <MarketTicker />
        <HeroSection />
        <PartnersSection />
        <FeatureCards />
        <HowItWorks />
        <LiveMarkets />
        <StatsOverview />
        <SecuritySection />
        <TestimonialsSection />
        <CTASection />
        <SiteFooter />
      </main>
    </div>
  )
}

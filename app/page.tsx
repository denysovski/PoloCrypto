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
import { ScrollTopButton } from "@/components/scroll-top-button"
import { NetworkBackground } from "@/components/network-background"
import { LiveCoinChart } from "@/components/live-coin-chart"
import { CrazyInsightsSection } from "@/components/crazy-insights-section"

export default function Home() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-480 overflow-x-hidden">
      <NetworkBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SidebarNav />
      </div>

      {/* Mobile navigation */}
      <MobileNav />

      {/* Main content */}
      <main className="relative z-10 min-w-0 flex-1 pt-20 lg:ml-20 lg:pt-0">
        <MarketTicker />
        <HeroSection />
        <PartnersSection />
        <FeatureCards />
        <HowItWorks />
        <LiveCoinChart />
        <LiveMarkets />
        <StatsOverview />
        <CrazyInsightsSection />
        <SecuritySection />
        <TestimonialsSection />
        <CTASection />
        <SiteFooter />
      </main>

      <ScrollTopButton />
    </div>
  )
}

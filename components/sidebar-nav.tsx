"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  ArrowLeftRight,
  BarChart3,
  Shield,
  Settings,
  HelpCircle,
  ChevronDown,
  Zap,
  Globe,
  PieChart,
  Bell,
  Users,
  BookOpen,
  Gem,
} from "lucide-react"

interface NavItem {
  label: string
  icon: React.ReactNode
  href?: string
  badge?: string
  children?: { label: string; href: string }[]
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        icon: <LayoutDashboard className="size-5" />,
        href: "#",
      },
      {
        label: "Markets",
        icon: <TrendingUp className="size-5" />,
        href: "#",
        badge: "Live",
      },
      {
        label: "Portfolio",
        icon: <PieChart className="size-5" />,
        href: "#",
      },
    ],
  },
  {
    title: "Trading",
    items: [
      {
        label: "Spot Trading",
        icon: <ArrowLeftRight className="size-5" />,
        children: [
          { label: "BTC/USD", href: "#" },
          { label: "ETH/USD", href: "#" },
          { label: "SOL/USD", href: "#" },
          { label: "All Pairs", href: "#" },
        ],
      },
      {
        label: "Derivatives",
        icon: <BarChart3 className="size-5" />,
        children: [
          { label: "Futures", href: "#" },
          { label: "Options", href: "#" },
          { label: "Perpetuals", href: "#" },
        ],
      },
      {
        label: "DeFi",
        icon: <Gem className="size-5" />,
        badge: "New",
        children: [
          { label: "Staking", href: "#" },
          { label: "Yield Farming", href: "#" },
          { label: "Liquidity Pools", href: "#" },
        ],
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        label: "Wallet",
        icon: <Wallet className="size-5" />,
        href: "#",
      },
      {
        label: "Earn",
        icon: <Zap className="size-5" />,
        href: "#",
        badge: "8.5% APY",
      },
      {
        label: "Launchpad",
        icon: <Globe className="size-5" />,
        href: "#",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Security",
        icon: <Shield className="size-5" />,
        href: "#",
      },
      {
        label: "Notifications",
        icon: <Bell className="size-5" />,
        href: "#",
      },
      {
        label: "Referrals",
        icon: <Users className="size-5" />,
        href: "#",
      },
      {
        label: "Learn",
        icon: <BookOpen className="size-5" />,
        href: "#",
      },
      {
        label: "Settings",
        icon: <Settings className="size-5" />,
        href: "#",
      },
      {
        label: "Support",
        icon: <HelpCircle className="size-5" />,
        href: "#",
      },
    ],
  },
]

export function SidebarNav({ collapsible = true }: { collapsible?: boolean }) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "Spot Trading": true,
  })
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [isHovered, setIsHovered] = useState(false)

  const isExpanded = !collapsible || isHovered

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen transition-[width] duration-300 ease-out",
        collapsible ? (isExpanded ? "w-72" : "w-20") : "w-72"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary shadow-[0_0_20px_oklch(0.75_0.18_165/0.25)] transition-shadow duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.18_165/0.4)]">
          <Zap className="size-5 text-primary-foreground" />
        </div>
        <div
          className={cn(
            "overflow-hidden whitespace-nowrap transition-all duration-300",
            isExpanded ? "w-42.5 opacity-100" : "w-0 opacity-0"
          )}
        >
          <h1 className="font-mono text-xl font-bold tracking-tight text-sidebar-foreground">
            NexVault
          </h1>
          <p className="text-xs text-muted-foreground">Crypto Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="menu-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <p
              className={cn(
                "mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-opacity duration-200",
                isExpanded ? "opacity-100" : "opacity-0"
              )}
            >
              {section.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpand(item.label)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          expandedItems[item.label]
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        )}
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          {item.icon}
                        </span>
                        <span
                          className={cn(
                            "flex-1 overflow-hidden whitespace-nowrap transition-all duration-300",
                            isExpanded ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
                          )}
                        >
                          {item.label}
                        </span>
                        {item.badge && isExpanded && (
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                            {item.badge}
                          </span>
                        )}
                        <span
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isExpanded ? "w-4 opacity-100" : "w-0 opacity-0"
                          )}
                          style={{
                            transform: expandedItems[item.label]
                              ? "rotate(0deg)"
                              : "rotate(-90deg)",
                          }}
                        >
                          <ChevronDown className="size-4" />
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300 ease-out"
                        style={{
                          maxHeight: isExpanded && expandedItems[item.label]
                            ? `${item.children.length * 44}px`
                            : "0px",
                          opacity: isExpanded && expandedItems[item.label] ? 1 : 0,
                        }}
                      >
                        <ul className="ml-5 mt-1 flex flex-col gap-0.5 border-l border-sidebar-border pl-4">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-all duration-150 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:translate-x-0.5"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setActiveItem(item.label)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        activeItem === item.label
                          ? "bg-primary/10 text-primary shadow-[inset_0_0_20px_oklch(0.75_0.18_165/0.05)]"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      {item.icon}
                      <span
                        className={cn(
                          "flex-1 overflow-hidden whitespace-nowrap transition-all duration-300",
                          isExpanded ? "max-w-40 opacity-100" : "max-w-0 opacity-0"
                        )}
                      >
                        {item.label}
                      </span>
                      {item.badge && isExpanded && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            item.badge === "Live"
                              ? "bg-chart-1/20 text-chart-1 animate-pulse"
                              : "bg-primary/20 text-primary"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-4">
        <div
          className={cn(
            "group flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-3 transition-all duration-300 hover:bg-sidebar-accent"
          )}
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/20 font-mono text-sm font-bold text-primary ring-2 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-[0_0_15px_oklch(0.75_0.18_165/0.2)]">
            JD
          </div>
          <div
            className={cn(
              "flex-1 overflow-hidden whitespace-nowrap transition-all duration-300",
              isExpanded ? "max-w-35 opacity-100" : "max-w-0 opacity-0"
            )}
          >
            <p className="text-sm font-semibold text-sidebar-foreground">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground">Pro Account</p>
          </div>
          <Settings
            className={cn(
              "size-4 text-muted-foreground transition-all duration-300 group-hover:rotate-90",
              isExpanded ? "opacity-100" : "w-0 opacity-0"
            )}
          />
        </div>
      </div>
      </div>
    </aside>
  )
}

"use client"

import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { SidebarNav } from "@/components/sidebar-nav"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed left-1/2 top-1.25 z-50 flex w-4/5 -translate-x-1/2 items-center justify-between rounded-full border border-border bg-background/80 px-4 py-2.5 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_12px_oklch(0.75_0.18_165/0.3)]">
            <Zap className="size-4 text-primary-foreground" />
          </div>
          <span className="font-mono text-lg font-bold text-foreground">
            NexVault
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex size-10 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-all duration-200 hover:bg-secondary/80"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span
            className="transition-transform duration-200"
            style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md transition-opacity duration-300 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 top-16 z-50 animate-slide-in-left lg:hidden">
            <SidebarNav collapsible={false} />
          </div>
        </>
      )}
    </>
  )
}

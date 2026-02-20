"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-[90] flex size-12 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-[0_8px_24px_oklch(0.75_0.18_165/0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  )
}

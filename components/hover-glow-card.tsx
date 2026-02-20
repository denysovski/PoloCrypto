"use client"

import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface HoverGlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function HoverGlowCard({
  children,
  className,
  glowColor = "oklch(0.75 0.18 165)",
}: HoverGlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setGlowPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  return (
    <div
      ref={ref}
      data-hover
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("group relative overflow-hidden", className)}
    >
      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, ${glowColor} / 0.12, transparent 60%)`
            : "none",
        }}
      />
      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, ${glowColor} / 0.25, transparent 60%)`
            : "none",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

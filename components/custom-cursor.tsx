"use client"

import { useEffect, useState, useCallback } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    if (!visible) setVisible(true)
  }, [visible])

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", () => setIsClicking(true))
    window.addEventListener("mouseup", () => setIsClicking(false))
    window.addEventListener("mouseleave", () => setVisible(false))
    window.addEventListener("mouseenter", () => setVisible(true))

    const handleHoverElements = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, [data-hover]"
      )
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true))
        el.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    handleHoverElements()
    const observer = new MutationObserver(handleHoverElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      observer.disconnect()
    }
  }, [onMouseMove])

  // Only show on non-touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      {/* Outer ring */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 transition-all duration-200 ease-out"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: "oklch(0.75 0.18 165)",
          transform: `translate(${position.x - (isHovering ? 24 : 16)}px, ${position.y - (isHovering ? 24 : 16)}px)`,
          opacity: visible ? (isHovering ? 0.9 : 0.7) : 0,
          backgroundColor: isClicking ? "oklch(0.75 0.18 165 / 0.15)" : "transparent",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full transition-all duration-100 ease-out"
        style={{
          width: isClicking ? 6 : 4,
          height: isClicking ? 6 : 4,
          backgroundColor: "oklch(0.75 0.18 165)",
          transform: `translate(${position.x - (isClicking ? 3 : 2)}px, ${position.y - (isClicking ? 3 : 2)}px)`,
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  )
}

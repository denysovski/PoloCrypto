"use client"

import { useEffect, useRef } from "react"

interface NodePoint {
  x: number
  y: number
  vx: number
  vy: number
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let frameId = 0
    let nodes: NodePoint[] = []

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const count = Math.max(28, Math.floor(window.innerWidth / 56))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x <= 0 || node.x >= window.innerWidth) node.vx *= -1
        if (node.y <= 0 || node.y >= window.innerHeight) node.vy *= -1
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const nodeA = nodes[i]

        context.beginPath()
        context.arc(nodeA.x, nodeA.y, 1.4, 0, Math.PI * 2)
        context.fillStyle = "oklch(0.75 0.18 165 / 0.22)"
        context.fill()

        for (let j = i + 1; j < nodes.length; j += 1) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const alpha = (1 - distance / 120) * 0.13
            context.beginPath()
            context.moveTo(nodeA.x, nodeA.y)
            context.lineTo(nodeB.x, nodeB.y)
            context.strokeStyle = `oklch(0.75 0.18 165 / ${alpha})`
            context.lineWidth = 0.7
            context.stroke()
          }
        }
      }

      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] opacity-35">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

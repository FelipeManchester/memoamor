'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseOpacity: number
  currentOpacity: number
  color: string
  rotation: number
  rotVel: number
}

const PALETTE = ['#7a3f3f', '#c49a8a', '#b56060', '#cc8877', '#e8c4b8']

function drawHeart(ctx: CanvasRenderingContext2D, p: Particle) {
  const r = p.size / 4
  ctx.save()
  ctx.globalAlpha = p.currentOpacity
  ctx.fillStyle = p.color
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.beginPath()
  ctx.arc(-r, -r, r, Math.PI, 0)
  ctx.arc(r, -r, r, Math.PI, 0)
  ctx.lineTo(0, r * 2.3)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function HeroHeartsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const dpr = window.devicePixelRatio || 1

    function resize() {
      w = canvas!.offsetWidth
      h = canvas!.offsetHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeParticle(startY?: number): Particle {
      return {
        x: Math.random() * w,
        y: startY ?? Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(Math.random() * 0.22 + 0.06),
        size: Math.random() * 14 + 6,
        baseOpacity: Math.random() * 0.07 + 0.03,
        currentOpacity: 0,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        rotation: Math.random() * Math.PI * 2,
        rotVel: (Math.random() - 0.5) * 0.005,
      }
    }

    function init() {
      resize()
      const count = Math.max(22, Math.min(45, Math.floor((w * h) / 20000)))
      particlesRef.current = Array.from({ length: count }, () => makeParticle())
    }

    init()

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    const section = canvas.parentElement
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    section?.addEventListener('mousemove', onMouseMove)
    section?.addEventListener('mouseleave', onMouseLeave)

    function tick() {
      ctx!.clearRect(0, 0, w, h)
      const { x: mx, y: my } = mouseRef.current

      for (const p of particlesRef.current) {
        const dx = p.x - mx
        const dy = p.y - my
        const d2 = dx * dx + dy * dy
        const R = 150

        // Gentle mouse repulsion
        if (d2 < R * R && d2 > 0) {
          const d = Math.sqrt(d2)
          const strength = ((R - d) / R) * 0.6
          p.vx += (dx / d) * strength * 0.05
          p.vy += (dy / d) * strength * 0.05
        }

        // Damp toward slow upward drift
        p.vx *= 0.96
        p.vy = p.vy * 0.97 - 0.001
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotVel

        // Slightly brighten hearts near cursor
        const nearMouse = d2 < (R * 1.6) ** 2
        const targetOp = nearMouse ? Math.min(p.baseOpacity * 2.2, 0.18) : p.baseOpacity
        p.currentOpacity += (targetOp - p.currentOpacity) * 0.05

        // Reset when floated off-screen
        if (p.y < -p.size * 3) {
          Object.assign(p, makeParticle(h + p.size))
        }
        if (p.x < -p.size * 2) p.x = w + p.size
        if (p.x > w + p.size * 2) p.x = -p.size

        drawHeart(ctx!, p)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      section?.removeEventListener('mousemove', onMouseMove)
      section?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  pulseSpeed: number
  pulseOffset: number
}

const STAR_COUNT = 60
const CONNECTION_DISTANCE = 18

function createStar(): Star {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.6 + 0.2,
    opacity: Math.random() * 0.5 + 0.2,
    pulseSpeed: Math.random() * 0.02 + 0.005,
    pulseOffset: Math.random() * Math.PI * 2,
  }
}

export default function ConstellationBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef<number>(0)
  const starEls = useRef<SVGCircleElement[]>([])
  const lineEls = useRef<SVGLineElement[]>([])
  const frameRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    starsRef.current = Array.from({ length: STAR_COUNT }, createStar)

    const svg = svgRef.current
    if (!svg) return

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('width', '100')
    rect.setAttribute('height', '100')
    rect.setAttribute('fill', '#1a0f0f')
    svg.appendChild(rect)

    starsRef.current.forEach((star, i) => {
      starsRef.current.forEach((other, j) => {
        if (j <= i) return
        const dist = Math.hypot(star.x - other.x, star.y - other.y)
        if (dist < CONNECTION_DISTANCE) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', String(star.x))
          line.setAttribute('y1', String(star.y))
          line.setAttribute('x2', String(other.x))
          line.setAttribute('y2', String(other.y))
          line.setAttribute('stroke', '#c49a8a')
          line.setAttribute('stroke-width', '0.15')
          line.setAttribute('opacity', String((1 - dist / CONNECTION_DISTANCE) * 0.25))
          svg.appendChild(line)
          lineEls.current.push(line)
        }
      })
    })

    starsRef.current.forEach((star) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(star.x))
      circle.setAttribute('cy', String(star.y))
      circle.setAttribute('r', String(star.size))
      circle.setAttribute('fill', '#e8c4b8')
      circle.setAttribute('opacity', String(star.opacity))
      svg.appendChild(circle)
      starEls.current.push(circle)
    })

    if (prefersReduced) return

    function animate() {
      frameRef.current++
      starsRef.current.forEach((star, i) => {
        const pulse =
          star.opacity * 0.6 +
          Math.sin(frameRef.current * star.pulseSpeed + star.pulseOffset) * star.opacity * 0.4
        starEls.current[i]?.setAttribute('opacity', String(pulse))
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  )
}

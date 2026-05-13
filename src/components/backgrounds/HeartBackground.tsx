'use client'

import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  size: number
  opacity: number
  speedY: number
  speedX: number
  rotation: number
  speedR: number
}

const HEART_COUNT = 14

function createHeart(): Heart {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    opacity: Math.random() * 0.15 + 0.05,
    speedY: Math.random() * 0.012 + 0.004,
    speedX: (Math.random() - 0.5) * 0.006,
    rotation: Math.random() * 360,
    speedR: (Math.random() - 0.5) * 0.05,
  }
}

export default function HeartBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const heartsRef = useRef<Heart[]>([])
  const rafRef = useRef<number>(0)
  const groupsRef = useRef<SVGGElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    heartsRef.current = Array.from({ length: HEART_COUNT }, createHeart)

    const svg = svgRef.current
    if (!svg) return

    heartsRef.current.forEach((heart, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('opacity', String(heart.opacity))
      g.setAttribute('transform', `translate(${heart.x}, ${heart.y}) rotate(${heart.rotation})`)

      const s = heart.size
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute(
        'd',
        `M0,${s * 0.4} C0,${-s * 0.2} ${-s},${-s * 0.2} ${-s},${s * 0.4} C${-s},${s * 0.9} 0,${s * 1.4} 0,${s * 1.8} C0,${s * 1.4} ${s},${s * 0.9} ${s},${s * 0.4} C${s},${-s * 0.2} 0,${-s * 0.2} 0,${s * 0.4}Z`,
      )
      path.setAttribute('fill', '#c49a8a')

      g.appendChild(path)
      svg.appendChild(g)
      groupsRef.current[i] = g
    })

    function animate() {
      heartsRef.current.forEach((heart, i) => {
        heart.y -= heart.speedY
        heart.x += heart.speedX
        heart.rotation += heart.speedR

        if (heart.y < -5) {
          heart.y = 105
          heart.x = Math.random() * 100
        }
        if (heart.x < -5) heart.x = 105
        if (heart.x > 105) heart.x = -5

        groupsRef.current[i]?.setAttribute(
          'transform',
          `translate(${heart.x}, ${heart.y}) rotate(${heart.rotation})`,
        )
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      groupsRef.current.forEach((g) => g?.remove())
      groupsRef.current = []
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

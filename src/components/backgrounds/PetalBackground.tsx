'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  speedY: number
  speedX: number
  speedR: number
}

const PETAL_COUNT = 18

function createPetal(): Petal {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 7,
    opacity: Math.random() * 0.18 + 0.06,
    rotation: Math.random() * 360,
    speedY: Math.random() * 0.012 + 0.004,
    speedX: (Math.random() - 0.5) * 0.006,
    speedR: (Math.random() - 0.5) * 0.06,
  }
}

export default function PetalBackground() {
  const svgRef = useRef<SVGSVGElement>(null)
  const petalsRef = useRef<Petal[]>([])
  const rafRef = useRef<number>(0)
  const groupsRef = useRef<SVGGElement[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    petalsRef.current = Array.from({ length: PETAL_COUNT }, createPetal)

    const svg = svgRef.current
    if (!svg) return

    petalsRef.current.forEach((petal, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('opacity', String(petal.opacity))
      g.setAttribute('transform', `translate(${petal.x}, ${petal.y}) rotate(${petal.rotation})`)

      const s = petal.size
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path1.setAttribute(
        'd',
        `M0,0 C${s * 0.6},${-s * 0.3} ${s * 0.8},${s * 1.2} 0,${s * 2} C${-s * 0.8},${s * 1.2} ${-s * 0.6},${-s * 0.3} 0,0`,
      )
      path1.setAttribute('fill', '#d4a8a0')

      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path2.setAttribute(
        'd',
        `M0,${s * 0.3} C${s * 0.25},${s * 0.5} ${s * 0.2},${s * 1.3} 0,${s * 1.8} C${-s * 0.2},${s * 1.3} ${-s * 0.25},${s * 0.5} 0,${s * 0.3}`,
      )
      path2.setAttribute('fill', '#e8c4b8')
      path2.setAttribute('opacity', '0.6')

      g.appendChild(path1)
      g.appendChild(path2)
      svg.appendChild(g)
      groupsRef.current[i] = g
    })

    function animate() {
      petalsRef.current.forEach((petal, i) => {
        petal.y += petal.speedY
        petal.x += petal.speedX
        petal.rotation += petal.speedR

        if (petal.y > 105) {
          petal.y = -5
          petal.x = Math.random() * 100
        }
        if (petal.x < -5) petal.x = 105
        if (petal.x > 105) petal.x = -5

        const el = groupsRef.current[i]
        if (el) {
          el.setAttribute(
            'transform',
            `translate(${petal.x}, ${petal.y}) rotate(${petal.rotation})`,
          )
        }
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

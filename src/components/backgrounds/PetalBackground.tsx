'use client'

import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  speedY: number
  swayAmp: number
  swaySpeed: number
  swayOffset: number
  speedR: number
}

const LARGE_COUNT = 5
const SMALL_COUNT = 35

function makePetal(large: boolean): Petal {
  return {
    x: Math.random() * 100,
    y: Math.random() * 110 - 5,
    size: large ? Math.random() * 3 + 4 : Math.random() * 1.8 + 0.5,
    opacity: large ? Math.random() * 0.04 + 0.02 : Math.random() * 0.22 + 0.10,
    rotation: Math.random() * 360,
    speedY: large ? Math.random() * 0.003 + 0.001 : Math.random() * 0.006 + 0.002,
    swayAmp: Math.random() * 0.5 + 0.2,
    swaySpeed: Math.random() * 0.005 + 0.002,
    swayOffset: Math.random() * Math.PI * 2,
    speedR: (Math.random() - 0.5) * (large ? 0.03 : 0.08),
  }
}

const SMALL_COLORS = ['#d4a8a0', '#e8bdb5', '#c99090', '#dab0a8', '#f0c0b8', '#c88080']
const LARGE_COLORS = ['#e8d0c8', '#f0d8d0', '#dcc0b8']

export default function PetalBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let mounted = true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapInstance: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tickerFn: any = null
    const groups: SVGGElement[] = []

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    filter.setAttribute('id', 'petalSoft')
    filter.setAttribute('x', '-10%')
    filter.setAttribute('y', '-10%')
    filter.setAttribute('width', '120%')
    filter.setAttribute('height', '120%')
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    blur.setAttribute('stdDeviation', '0.07')
    filter.appendChild(blur)
    defs.appendChild(filter)
    svg.appendChild(defs)

    const petals = [
      ...Array.from({ length: LARGE_COUNT }, () => makePetal(true)),
      ...Array.from({ length: SMALL_COUNT }, () => makePetal(false)),
    ]

    petals.forEach((petal, i) => {
      const isLarge = i < LARGE_COUNT
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('opacity', String(petal.opacity))
      if (!isLarge) g.setAttribute('filter', 'url(#petalSoft)')

      const s = petal.size
      const colorArr = isLarge ? LARGE_COLORS : SMALL_COLORS
      const col = colorArr[i % colorArr.length]

      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path1.setAttribute(
        'd',
        `M0,0 C${s * 0.55},${-s * 0.25} ${s * 0.75},${s * 1.1} 0,${s * 2} C${-s * 0.75},${s * 1.1} ${-s * 0.55},${-s * 0.25} 0,0`,
      )
      path1.setAttribute('fill', col)

      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path2.setAttribute(
        'd',
        `M0,${s * 0.25} C${s * 0.2},${s * 0.45} ${s * 0.15},${s * 1.2} 0,${s * 1.75} C${-s * 0.15},${s * 1.2} ${-s * 0.2},${s * 0.45} 0,${s * 0.25}`,
      )
      path2.setAttribute('fill', '#f8ede8')
      path2.setAttribute('opacity', '0.4')

      g.appendChild(path1)
      g.appendChild(path2)
      svg.appendChild(g)
      groups[i] = g
    })

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      petals.forEach((p, i) => {
        groups[i]?.setAttribute('transform', `translate(${p.x}, ${p.y}) rotate(${p.rotation})`)
      })
      return
    }

    void (async () => {
      const { gsap } = await import('gsap')
      if (!mounted) return
      gsapInstance = gsap
      let frame = 0

      tickerFn = () => {
        frame++
        petals.forEach((p, i) => {
          p.y += p.speedY
          p.x += Math.sin(frame * p.swaySpeed + p.swayOffset) * p.swayAmp * 0.012
          p.rotation += p.speedR
          if (p.y > 108) {
            p.y = -8 - Math.random() * 10
            p.x = Math.random() * 100
          }
          if (p.x < -5) p.x = 105
          if (p.x > 105) p.x = -5
          groups[i]?.setAttribute(
            'transform',
            `translate(${p.x.toFixed(2)}, ${p.y.toFixed(2)}) rotate(${p.rotation.toFixed(2)})`,
          )
        })
      }
      gsap.ticker.add(tickerFn)
    })()

    return () => {
      mounted = false
      if (gsapInstance && tickerFn) gsapInstance.ticker.remove(tickerFn)
      while (svg.firstChild) svg.removeChild(svg.firstChild)
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

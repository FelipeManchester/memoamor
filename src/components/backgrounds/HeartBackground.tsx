'use client'

import { useEffect, useRef } from 'react'

interface Heart {
  x: number
  y: number
  size: number
  opacity: number
  speedY: number
  swayAmp: number
  swaySpeed: number
  swayOffset: number
  rotation: number
  speedR: number
  outline: boolean
  color: string
}

const HEART_COUNT = 28
const HEART_COLORS = ['#e0305c', '#ff4d7a', '#c91f4a', '#ff3366', '#b5173e', '#ff608a']

function heartPath(s: number): string {
  return (
    `M0,${s * 0.4} ` +
    `C0,${-s * 0.2} ${-s},${-s * 0.2} ${-s},${s * 0.4} ` +
    `C${-s},${s * 1.0} 0,${s * 1.55} 0,${s * 1.8} ` +
    `C0,${s * 1.55} ${s},${s * 1.0} ${s},${s * 0.4} ` +
    `C${s},${-s * 0.2} 0,${-s * 0.2} 0,${s * 0.4}Z`
  )
}

function makeHeart(): Heart {
  const outline = Math.random() < 0.35
  const base = Math.random() * 2.5 + 1
  return {
    x: Math.random() * 100,
    y: Math.random() * 110,
    size: outline ? base * 1.4 : base,
    opacity: outline ? Math.random() * 0.28 + 0.12 : Math.random() * 0.22 + 0.08,
    speedY: -(Math.random() * 0.006 + 0.0025),
    swayAmp: Math.random() * 0.6 + 0.2,
    swaySpeed: Math.random() * 0.006 + 0.003,
    swayOffset: Math.random() * Math.PI * 2,
    rotation: Math.random() * 30 - 15,
    speedR: (Math.random() - 0.5) * 0.04,
    outline,
    color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
  }
}

export default function HeartBackground() {
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

    // Defs
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')

    // Background radial gradient
    const bgGrad = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient')
    bgGrad.setAttribute('id', 'heartBg')
    bgGrad.setAttribute('cx', '50%')
    bgGrad.setAttribute('cy', '45%')
    bgGrad.setAttribute('r', '75%')
    ;[
      ['0%', '#2e0a1b'],
      ['55%', '#1c0610'],
      ['100%', '#0e0208'],
    ].forEach(([offset, color]) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop')
      stop.setAttribute('offset', offset)
      stop.setAttribute('stop-color', color)
      bgGrad.appendChild(stop)
    })

    // Glow filter using feMerge
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'filter')
    glow.setAttribute('id', 'hglow')
    glow.setAttribute('x', '-50%')
    glow.setAttribute('y', '-50%')
    glow.setAttribute('width', '200%')
    glow.setAttribute('height', '200%')
    const feBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur')
    feBlur.setAttribute('in', 'SourceGraphic')
    feBlur.setAttribute('stdDeviation', '0.5')
    feBlur.setAttribute('result', 'blur')
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge')
    ;['blur', 'SourceGraphic'].forEach((inVal) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')
      node.setAttribute('in', inVal)
      feMerge.appendChild(node)
    })
    glow.appendChild(feBlur)
    glow.appendChild(feMerge)

    defs.appendChild(bgGrad)
    defs.appendChild(glow)
    svg.appendChild(defs)

    // Background rect
    const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    bgRect.setAttribute('width', '100')
    bgRect.setAttribute('height', '100')
    bgRect.setAttribute('fill', 'url(#heartBg)')
    svg.appendChild(bgRect)

    const hearts = Array.from({ length: HEART_COUNT }, makeHeart)

    hearts.forEach((heart, i) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttribute('opacity', String(heart.opacity))
      g.setAttribute('filter', 'url(#hglow)')
      g.setAttribute('transform', `translate(${heart.x}, ${heart.y}) rotate(${heart.rotation})`)

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', heartPath(heart.size))

      if (heart.outline) {
        path.setAttribute('fill', 'none')
        path.setAttribute('stroke', heart.color)
        path.setAttribute('stroke-width', String(heart.size * 0.1))
      } else {
        path.setAttribute('fill', heart.color)
      }

      g.appendChild(path)
      svg.appendChild(g)
      groups[i] = g
    })

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    void (async () => {
      const { gsap } = await import('gsap')
      if (!mounted) return
      gsapInstance = gsap
      let frame = 0

      tickerFn = () => {
        frame++
        hearts.forEach((h, i) => {
          h.y += h.speedY
          h.x += Math.sin(frame * h.swaySpeed + h.swayOffset) * h.swayAmp * 0.01
          h.rotation += h.speedR
          if (h.y < -12) {
            h.y = 110 + Math.random() * 10
            h.x = Math.random() * 100
          }
          if (h.x < -5) h.x = 105
          if (h.x > 105) h.x = -5
          groups[i]?.setAttribute(
            'transform',
            `translate(${h.x.toFixed(2)}, ${h.y.toFixed(2)}) rotate(${h.rotation.toFixed(2)})`,
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

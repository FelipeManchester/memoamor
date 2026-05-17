'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  vx: number
  vy: number
  pulsePhase: number
  pulseSpeed: number
  color: string
}

interface StarEl {
  g: SVGGElement
  glow: SVGCircleElement
  core: SVGCircleElement
}

const STAR_COUNT = 65
const CONNECTION_DIST = 13
const LINE_POOL = 160
const LINE_UPDATE_FRAMES = 3

const STAR_COLORS = ['#ffffff', '#e8d8ff', '#ffd8b0', '#c8e8ff', '#ffc8e0', '#d8f0ff']

function makeStar(): Star {
  const angle = Math.random() * Math.PI * 2
  const speed = Math.random() * 0.007 + 0.001
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 0.45 + 0.12,
    baseOpacity: Math.random() * 0.6 + 0.25,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: Math.random() * 0.025 + 0.006,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }
}

export default function ConstellationBackground() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let mounted = true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsapInstance: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tickerFn: any = null
    let shootTimer: ReturnType<typeof setTimeout> | null = null
    const starEls: StarEl[] = []
    const lineEls: SVGLineElement[] = []

    const ns = 'http://www.w3.org/2000/svg'

    // Defs
    const defs = document.createElementNS(ns, 'defs')

    const bgGrad = document.createElementNS(ns, 'radialGradient')
    bgGrad.setAttribute('id', 'spaceBg')
    bgGrad.setAttribute('cx', '40%')
    bgGrad.setAttribute('cy', '35%')
    bgGrad.setAttribute('r', '80%')
    ;[
      ['0%', '#120a2a'],
      ['45%', '#0a051c'],
      ['100%', '#04020e'],
    ].forEach(([offset, color]) => {
      const stop = document.createElementNS(ns, 'stop')
      stop.setAttribute('offset', offset)
      stop.setAttribute('stop-color', color)
      bgGrad.appendChild(stop)
    })
    defs.appendChild(bgGrad)

    svg.appendChild(defs)

    // Background
    const bgRect = document.createElementNS(ns, 'rect')
    bgRect.setAttribute('width', '100')
    bgRect.setAttribute('height', '100')
    bgRect.setAttribute('fill', 'url(#spaceBg)')
    svg.appendChild(bgRect)

    // Line pool
    const lineGroup = document.createElementNS(ns, 'g')
    svg.appendChild(lineGroup)
    for (let i = 0; i < LINE_POOL; i++) {
      const line = document.createElementNS(ns, 'line')
      line.setAttribute('stroke', '#b090e0')
      line.setAttribute('stroke-width', '0.09')
      line.setAttribute('opacity', '0')
      lineGroup.appendChild(line)
      lineEls.push(line)
    }

    const stars = Array.from({ length: STAR_COUNT }, makeStar)

    // Stars rendered as glow + core circles in a group
    const starGroup = document.createElementNS(ns, 'g')
    svg.appendChild(starGroup)

    stars.forEach((star) => {
      const g = document.createElementNS(ns, 'g')
      g.setAttribute('transform', `translate(${star.x}, ${star.y})`)

      const glowEl = document.createElementNS(ns, 'circle')
      glowEl.setAttribute('r', String(star.size * 3.5))
      glowEl.setAttribute('fill', star.color)
      glowEl.setAttribute('opacity', '0.09')

      const coreEl = document.createElementNS(ns, 'circle')
      coreEl.setAttribute('r', String(star.size))
      coreEl.setAttribute('fill', star.color)
      coreEl.setAttribute('opacity', String(star.baseOpacity))

      g.appendChild(glowEl)
      g.appendChild(coreEl)
      starGroup.appendChild(g)
      starEls.push({ g, glow: glowEl, core: coreEl })
    })

    function updateLines() {
      let li = 0
      outer: for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          if (li >= LINE_POOL) break outer
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const op = (1 - dist / CONNECTION_DIST) * 0.3
            const line = lineEls[li]
            line.setAttribute('x1', stars[i].x.toFixed(2))
            line.setAttribute('y1', stars[i].y.toFixed(2))
            line.setAttribute('x2', stars[j].x.toFixed(2))
            line.setAttribute('y2', stars[j].y.toFixed(2))
            line.setAttribute('opacity', op.toFixed(3))
            li++
          }
        }
      }
      for (let k = li; k < LINE_POOL; k++) lineEls[k].setAttribute('opacity', '0')
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      updateLines()
      return
    }

    void (async () => {
      const { gsap } = await import('gsap')
      if (!mounted) return
      gsapInstance = gsap

      function launchShootingStar() {
        if (!mounted) return
        const line = document.createElementNS(ns, 'line')
        const sx = 5 + Math.random() * 80
        const sy = 5 + Math.random() * 40
        const angle = (18 + Math.random() * 30) * (Math.PI / 180)
        const dist = 10 + Math.random() * 14
        const ex = sx + Math.cos(angle) * dist
        const ey = sy + Math.sin(angle) * dist

        line.setAttribute('x1', String(sx))
        line.setAttribute('y1', String(sy))
        line.setAttribute('x2', String(sx))
        line.setAttribute('y2', String(sy))
        line.setAttribute('stroke', 'white')
        line.setAttribute('stroke-width', '0.18')
        line.setAttribute('stroke-linecap', 'round')
        line.setAttribute('opacity', '0')
        svg!.appendChild(line)

        const tl = gsap.timeline({ onComplete: () => line.remove() })
        tl.to(line, { opacity: 0.9, duration: 0.07 })
          .to(line, { attr: { x2: ex, y2: ey }, duration: 0.22, ease: 'none' }, 0)
          .to(line, { attr: { x1: ex, y1: ey }, opacity: 0, duration: 0.2, ease: 'power2.in' }, '>-0.06')

        shootTimer = setTimeout(() => {
          if (mounted) launchShootingStar()
        }, (3.5 + Math.random() * 5) * 1000)
      }

      shootTimer = setTimeout(launchShootingStar, (1 + Math.random() * 2) * 1000)

      let frame = 0
      tickerFn = () => {
        frame++
        stars.forEach((star, i) => {
          star.x += star.vx
          star.y += star.vy
          if (star.x < -2) star.x = 102
          if (star.x > 102) star.x = -2
          if (star.y < -2) star.y = 102
          if (star.y > 102) star.y = -2

          const pulse = star.baseOpacity * (0.6 + Math.sin(frame * star.pulseSpeed + star.pulsePhase) * 0.4)
          const el = starEls[i]
          if (el) {
            el.g.setAttribute('transform', `translate(${star.x.toFixed(2)}, ${star.y.toFixed(2)})`)
            el.core.setAttribute('opacity', pulse.toFixed(3))
            el.glow.setAttribute('opacity', (pulse * 0.12).toFixed(4))
          }
        })
        if (frame % LINE_UPDATE_FRAMES === 0) updateLines()
      }
      gsap.ticker.add(tickerFn)
    })()

    return () => {
      mounted = false
      if (shootTimer) clearTimeout(shootTimer)
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

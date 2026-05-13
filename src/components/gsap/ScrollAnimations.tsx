'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      // Detecta a direção de cada elemento e anima
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        const fromLeft = el.classList.contains('from-left')
        const fromRight = el.classList.contains('from-right')
        const scaleIn = el.classList.contains('scale-in')

        const from: gsap.TweenVars = {
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        }

        if (fromLeft) from.x = -50
        else if (fromRight) from.x = 50
        else if (scaleIn) from.scale = 0.93
        else from.y = 50

        gsap.from(el, from)
      })

      // Parallax nas fotos de memória
      gsap.utils.toArray<HTMLElement>('.memory-img').forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [])

  return null
}

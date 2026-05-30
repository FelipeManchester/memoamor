'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    let refreshTimeout: ReturnType<typeof setTimeout> | undefined
    let onLoad: (() => void) | undefined

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
            start: 'top 95%',
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

      // Recalcula posições após o layout estabilizar. O evento 'load' NÃO
      // dispara em navegação client-side (SPA), então não dependemos só dele:
      // - duplo rAF garante refresh depois do paint
      // - timeout cobre fontes/imagens que chegam um pouco depois
      const refresh = () => ScrollTrigger.refresh()
      requestAnimationFrame(() => requestAnimationFrame(refresh))
      refreshTimeout = setTimeout(refresh, 300)
      onLoad = refresh
      window.addEventListener('load', onLoad, { once: true })
    }

    init()

    return () => {
      if (refreshTimeout) clearTimeout(refreshTimeout)
      if (onLoad) window.removeEventListener('load', onLoad)
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [])

  return null
}

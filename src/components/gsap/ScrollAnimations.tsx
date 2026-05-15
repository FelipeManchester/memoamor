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

      // Galeria — reveal cinematográfico por foto
      gsap.utils.toArray<HTMLElement>('.gallery-photo').forEach((el) => {
        const mask = el.querySelector('.gallery-photo__mask')
        const img = el.querySelector('.gallery-photo__img')
        const counter = el.querySelector('.gallery-photo__counter')

        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })

        if (mask) {
          tl.fromTo(
            mask,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0 0)', duration: 1.1, ease: 'power3.out' }
          )
        }
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.18 },
            { scale: 1, duration: 1.4, ease: 'expo.out' },
            '<'
          )
        }
        if (counter) {
          tl.fromTo(
            counter,
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.4'
          )
        }
      })

      // Galeria — stagger das palavras do cabeçalho
      const headingWords = gsap.utils.toArray<HTMLElement>('.gallery-heading__word')
      if (headingWords.length > 0) {
        gsap.from(headingWords, {
          y: 30,
          opacity: 0,
          skewY: 4,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-heading', start: 'top 90%' },
        })
        gsap.fromTo(
          '.gallery-heading__rule',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.gallery-heading', start: 'top 85%' },
          }
        )
      }

      // Galeria — barra de progresso lateral
      const progress = document.querySelector('.gallery-progress')
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.gallery-section',
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: true,
            },
          }
        )
      }

      // Galeria — parallax de profundidade (apenas desktop)
      ScrollTrigger.matchMedia({
        '(min-width: 768px)': () => {
          gsap.utils.toArray<HTMLElement>('.gallery-photo--depth-near').forEach((el) => {
            gsap.to(el, {
              yPercent: -8,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })
          gsap.utils.toArray<HTMLElement>('.gallery-photo--depth-far').forEach((el) => {
            gsap.to(el, {
              yPercent: -16,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
          })
        },
      })

      // Recalcula posições após fontes/imagens carregarem
      requestAnimationFrame(() => ScrollTrigger.refresh())
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
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

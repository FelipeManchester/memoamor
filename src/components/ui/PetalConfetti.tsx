'use client'

import { useEffect } from 'react'

export default function PetalConfetti() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    import('canvas-confetti').then(({ default: confetti }) => {
      const petalShape = confetti.shapeFromPath({
        path: 'M0 0 C-6-8-6-20 0-22 C6-20 6-8 0 0Z',
      })

      const colors = ['#f0d4ca', '#e8c4b8', '#f2ddd5', '#c49a8a', '#d4785a', '#b85a5a']

      function burst(angle: number, originX: number, count: number, delay: number) {
        setTimeout(() => {
          confetti({
            particleCount: count,
            angle,
            spread: 70,
            origin: { x: originX, y: 0.55 },
            colors,
            shapes: [petalShape],
            scalar: 1.4,
            gravity: 0.7,
            drift: 0.2,
            ticks: 280,
            startVelocity: 38,
          })
        }, delay)
      }

      burst(60, 0.1, 25, 0)
      burst(90, 0.5, 30, 180)
      burst(120, 0.9, 25, 360)
      burst(75, 0.3, 15, 900)
      burst(105, 0.7, 15, 1100)
    })
  }, [])

  return null
}

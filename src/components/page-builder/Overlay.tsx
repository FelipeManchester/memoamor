'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { TemplateId } from '@/types'

interface OverlayProps {
  nameA: string
  nameB: string
  template?: TemplateId
  onOpen: () => void
}

const BTN_BG: Record<TemplateId, string> = {
  petals: 'var(--color-wine)',
  hearts: '#c888aa',
  constellations: '#a080c8',
}

const PALETTES: Record<TemplateId, string[]> = {
  petals: ['#7a3f3f', '#cc8877', '#e8c4b8', '#c49a8a', '#f2ddd5', '#7a3f3f', '#b56060'],
  hearts: ['#c01850', '#e0305c', '#ff4d7a', '#8d0e35', '#ff608a', '#c91f4a', '#ff3366'],
  constellations: ['#9060e0', '#c4a0e0', '#7040b0', '#e8d8ff', '#b090f0', '#8050d0', '#d0b8ff'],
}

// Deterministic heart layout — no Math.random() to avoid hydration mismatch
const HEARTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: ((i * 3.33) % 92) + 3,
  size: 10 + (i * 17 % 48),
  opacity: 0.28 + (i % 6) * 0.12,
  driftX: ((i % 9) - 4) * 16,
  duration: 0.72 + (i % 7) * 0.09,
  rotate: ((i % 7) - 3) * 14,
}))

const HEART_PATH =
  'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151 1.018 5.719 4.955 1.566-3.937 4.406-4.955 5.719-4.955 2.213 0 5.281 1.4 5.281 5.191 0 4.105-5.374 8.863-11 14.402z'

export default function Overlay({ nameA, nameB, template = 'petals', onOpen }: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heartsRef = useRef<HTMLDivElement>(null)
  const fired = useRef(false)

  const palette = PALETTES[template]

  // Lock background scroll while overlay is mounted so the page stays at the top
  // when "Abrir memórias" is clicked, regardless of touch/wheel attempts behind it.
  useEffect(() => {
    const { body, documentElement } = document
    const prevBodyOverflow = body.style.overflow
    const prevHtmlOverflow = documentElement.style.overflow

    window.scrollTo(0, 0)
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = prevBodyOverflow
      documentElement.style.overflow = prevHtmlOverflow
    }
  }, [])

  function handleOpen() {
    if (fired.current) return
    fired.current = true

    const container = containerRef.current
    if (!container) return

    // Read the template-specific flush color from the inherited CSS variable
    const flushColor =
      getComputedStyle(container).getPropertyValue('--overlay-flush-bg').trim() || '#f5e6df'

    const tl = gsap.timeline({ onComplete: onOpen })
    const heartEls = heartsRef.current ? Array.from(heartsRef.current.children) : []

    // ── Hearts rise from bottom ──────────────────────────
    if (heartEls.length > 0) {
      tl.to(
        heartEls,
        {
          y: '-120vh',
          x: (i: number) => HEARTS[i]?.driftX ?? 0,
          rotation: (i: number) => HEARTS[i]?.rotate ?? 0,
          opacity: (i: number) => HEARTS[i]?.opacity ?? 0.4,
          scale: 1.15,
          duration: (i: number) => HEARTS[i]?.duration ?? 0.9,
          ease: 'power1.out',
          stagger: {
            amount: 0.38,
            from: 'random',
          },
        },
        0
      )
    }

    // ── Overlay content fades up and out ─────────────────
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -32,
        duration: 0.42,
        ease: 'power3.in',
      },
      0.05
    )

    // ── Background flushes to template tone, then fades ──
    tl.to(container, { backgroundColor: flushColor, duration: 0.5, ease: 'power1.inOut' }, 0.12)
    tl.to(container, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.82)
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1400] flex items-center justify-center text-center"
      style={{ backgroundColor: 'var(--overlay-bg, var(--color-cream))' }}
    >
      {/* ── Heart particles — start below viewport, animate upward ── */}
      <div ref={heartsRef} className="absolute inset-0 pointer-events-none">
        {HEARTS.map((h) => (
          <svg
            key={h.id}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={palette[h.id % palette.length]}
            className="absolute"
            style={{
              left: `${h.left}%`,
              bottom: -h.size - 8,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
            aria-hidden="true"
          >
            <path d={HEART_PATH} />
          </svg>
        ))}
      </div>

      {/* ── Decorative corner shapes ── */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-0 left-0 w-[200px] opacity-[0.12] pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>
      <svg
        viewBox="0 0 200 200"
        className="absolute bottom-0 right-0 w-[200px] opacity-[0.12] pointer-events-none rotate-180"
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>

      {/* ── Content ── */}
      <div ref={contentRef} className="flex flex-col items-center relative z-10 p-6">
        <p
          className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-6 opacity-0"
          style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.2s' }}
        >
          Uma surpresa para você
        </p>

        <h1
          className="font-serif font-light italic text-wine leading-[1.1] mb-4 opacity-0"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            animation: 'fadeUp 0.9s ease forwards',
            animationDelay: '0.4s',
          }}
        >
          {nameA}
          <br />
          <span className="text-[0.5em] text-mauve">&</span>
          <br />
          {nameB}
        </h1>

        <div
          className="w-12 h-px my-6 mx-auto opacity-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
            animation: 'fadeIn 1s ease forwards',
            animationDelay: '0.7s',
          }}
        />

        <button
          onClick={handleOpen}
          className="font-sans text-[0.72rem] tracking-[0.3em] uppercase text-cream border-none py-4 px-10 rounded-sm cursor-pointer transition-all duration-200 opacity-0 hover:opacity-[0.85] hover:-translate-y-0.5"
          style={{ backgroundColor: BTN_BG[template], animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.9s' }}
        >
          Abrir memórias ♡
        </button>
      </div>
    </div>
  )
}

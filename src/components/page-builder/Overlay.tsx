'use client'

import { useEffect, useRef, useState } from 'react'
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

// Envelope body colors per template — [top, bottom] for the paper gradient.
const ENVELOPE: Record<TemplateId, [string, string]> = {
  petals: ['#b56060', '#7a3f3f'],
  hearts: ['#e0305c', '#8d0e35'],
  constellations: ['#9060e0', '#5a2fa0'],
}

// Warm paper tone for the letter, and a gold wax seal (reads luxe on every template).
const PAPER = '#fbf5ec' // warm cream
const WAX_TOP = '#e8c478'
const WAX_BOTTOM = '#b8893a'

// Button label evolves with each click so the gesture feels like progress.
const STAGE_LABEL = ['Abrir memórias ♡', 'Continuar ♡', 'Revelar ♡']

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

  // Envelope parts
  const envelopeRef = useRef<HTMLDivElement>(null)
  const flapRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)

  const [stage, setStage] = useState(0)
  const busy = useRef(false)
  const fired = useRef(false)

  const palette = PALETTES[template]
  const [envTop, envBottom] = ENVELOPE[template]

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

  // ── Final reveal: letter slides out into a light burst, hearts rise, flush, fade ──
  function runFinale() {
    if (fired.current) return
    fired.current = true

    const container = containerRef.current
    if (!container) return onOpen()

    const flushColor =
      getComputedStyle(container).getPropertyValue('--overlay-flush-bg').trim() || '#f5e6df'

    const tl = gsap.timeline({ onComplete: onOpen })
    const heartEls = heartsRef.current ? Array.from(heartsRef.current.children) : []

    // The open flap drifts further away
    tl.to(flapRef.current, { y: '-40%', opacity: 0, duration: 0.5, ease: 'power2.in' }, 0)

    // Letter slides up out of the envelope
    tl.to(letterRef.current, { y: '-34%', scale: 1.06, duration: 0.5, ease: 'power2.out' }, 0.05)

    // Light bursts from inside
    if (flashRef.current) {
      tl.fromTo(
        flashRef.current,
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 2.8, duration: 0.6, ease: 'power2.out' },
        0.12
      )
    }

    // Hearts rise from bottom
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
          stagger: { amount: 0.38, from: 'random' },
        },
        0.12
      )
    }

    // Text fades up and out
    tl.to(contentRef.current, { opacity: 0, y: -32, duration: 0.42, ease: 'power3.in' }, 0.22)

    // Background flushes to template tone, then the whole overlay fades
    tl.to(container, { backgroundColor: flushColor, duration: 0.5, ease: 'power1.inOut' }, 0.32)
    tl.to(container, { opacity: 0, duration: 0.34, ease: 'power2.in' }, 0.98)
  }

  function handleClick() {
    if (busy.current || fired.current) return

    // Start the music on the FIRST interaction so iOS counts it as a user gesture
    // (playVideo must run synchronously inside the tap that started it).
    if (stage === 0) {
      ;(document.getElementById('player-play-btn') as HTMLButtonElement | null)?.click()
    }

    // Honor reduced-motion: skip the multi-step ritual, reveal immediately.
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      runFinale()
      return
    }

    busy.current = true
    const env = envelopeRef.current
    if (env) env.style.animation = 'none' // stop idle bob so GSAP owns the transform

    if (stage === 0) {
      // ── Click 1: break the wax seal ──
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false
          setStage(1)
        },
      })
      tl.to(env, { scale: 0.96, duration: 0.1, ease: 'power2.out' })
        .to(env, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
        .to(sealRef.current, { scale: 1.18, duration: 0.12, ease: 'power2.out' }, 0)
        .to(
          sealRef.current,
          { y: 70, rotation: 38, scale: 0.85, opacity: 0, duration: 0.5, ease: 'power2.in' },
          0.12
        )
    } else if (stage === 1) {
      // ── Click 2: lift the flap open ──
      const tl = gsap.timeline({
        onComplete: () => {
          busy.current = false
          setStage(2)
        },
      })
      tl.to(env, { scale: 0.94, duration: 0.12, ease: 'power2.out' })
        .to(env, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' })
        .to(
          flapRef.current,
          { rotationX: -168, duration: 0.7, ease: 'power3.inOut' },
          0
        )
        // a sliver of the letter peeks up as the flap clears it
        .to(letterRef.current, { y: '-6%', duration: 0.5, ease: 'power2.out' }, 0.25)
    } else {
      // ── Click 3: the letter rises into the light → finale ──
      busy.current = false
      runFinale()
    }
  }

  const envW = 'clamp(220px, 60vw, 320px)'
  const envH = 'clamp(146px, 40vw, 212px)'

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1400] flex items-center justify-center text-center"
      style={{ backgroundColor: 'var(--overlay-bg, var(--color-cream))' }}
    >
      {/* ── Heart particles — start below viewport, animate upward in the finale ── */}
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
          className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4 opacity-0"
          style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.2s' }}
        >
          Uma carta para você
        </p>

        <h1
          className="font-serif font-light italic text-wine leading-[1.05] mb-5 opacity-0"
          style={{
            fontSize: 'clamp(2.2rem, 6.5vw, 4.5rem)',
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

        {/* ── The envelope ── */}
        <button
          type="button"
          onClick={handleClick}
          aria-label={STAGE_LABEL[stage]}
          className="relative bg-transparent border-none cursor-pointer p-0 opacity-0"
          style={{
            width: envW,
            height: envH,
            perspective: '1000px',
            animation: 'fadeUp 0.9s ease forwards',
            animationDelay: '0.6s',
          }}
        >
          <div
            ref={envelopeRef}
            className="animate-float"
            style={{
              position: 'absolute',
              inset: 0,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            {/* Light burst that shows through when the letter rises */}
            <div
              ref={flashRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '55%',
                height: '70%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,250,240,0.95) 0%, rgba(255,245,230,0.4) 45%, transparent 70%)',
                opacity: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Envelope back */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                background: `linear-gradient(160deg, ${envTop} 0%, ${envBottom} 100%)`,
                boxShadow: '0 18px 36px rgba(0,0,0,0.28)',
              }}
            />

            {/* The letter (tucked inside) */}
            <div
              ref={letterRef}
              style={{
                position: 'absolute',
                left: '8%',
                top: '8%',
                width: '84%',
                height: '88%',
                borderRadius: '3px',
                background: PAPER,
                boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8%',
                // faint ruled lines
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0, transparent 14px, rgba(122,63,63,0.08) 15px)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={envBottom} aria-hidden="true">
                <path d={HEART_PATH} />
              </svg>
              <span
                className="font-serif italic"
                style={{ fontSize: '0.8rem', color: envBottom, opacity: 0.65 }}
              >
                para sempre
              </span>
            </div>

            {/* Front pocket — hides the lower half of the letter, with envelope seams */}
            <svg
              viewBox="0 0 100 66"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
              aria-hidden="true"
            >
              {/* bottom flap */}
              <polygon points="0,66 100,66 50,30" fill={envBottom} />
              {/* left + right side flaps (subtle shading over the base) */}
              <polygon points="0,8 50,38 0,66" fill={envTop} opacity="0.9" />
              <polygon points="100,8 50,38 100,66" fill={envTop} opacity="0.78" />
              {/* seam highlights */}
              <line x1="0" y1="8" x2="50" y2="38" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
              <line x1="100" y1="8" x2="50" y2="38" stroke="rgba(0,0,0,0.12)" strokeWidth="0.6" />
              <line x1="0" y1="66" x2="50" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
              <line x1="100" y1="66" x2="50" y2="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
            </svg>

            {/* Top flap — hinged at the top edge, folds open on click 2 */}
            <div
              ref={flapRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '58%',
                background: `linear-gradient(165deg, ${envTop} 0%, ${envBottom} 130%)`,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                zIndex: 3,
              }}
            />

            {/* Wax seal — breaks off on click 1 */}
            <div
              ref={sealRef}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '20%',
                aspectRatio: '1',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, ${WAX_TOP} 0%, ${WAX_BOTTOM} 80%)`,
                boxShadow: '0 3px 7px rgba(0,0,0,0.3), inset 0 -2px 4px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                willChange: 'transform',
              }}
            >
              <svg width="48%" viewBox="0 0 24 24" fill="rgba(0,0,0,0.28)" aria-hidden="true">
                <path d={HEART_PATH} />
              </svg>
            </div>
          </div>
        </button>

        <div
          className="w-12 h-px my-5 mx-auto opacity-0"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
            animation: 'fadeIn 1s ease forwards',
            animationDelay: '0.8s',
          }}
        />

        <button
          onClick={handleClick}
          className="font-sans text-[0.72rem] tracking-[0.3em] uppercase text-cream border-none py-4 px-10 rounded-sm cursor-pointer transition-all duration-200 opacity-0 hover:opacity-[0.85] hover:-translate-y-0.5"
          style={{
            backgroundColor: BTN_BG[template],
            animation: 'fadeUp 0.9s ease forwards',
            animationDelay: '1s',
          }}
        >
          {STAGE_LABEL[stage]}
        </button>
      </div>
    </div>
  )
}

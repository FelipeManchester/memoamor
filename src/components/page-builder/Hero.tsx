'use client'

import { useEffect, useState } from 'react'
import type { MemoryPage } from '@/types'

interface TimeElapsed {
  years: number
  months: number
  days: number
}

function calcTimeElapsed(startDate: string): TimeElapsed {
  const start = new Date(startDate)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prev = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prev.getDate()
  }
  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

interface HeroProps {
  page: MemoryPage
}

export default function Hero({ page }: HeroProps) {
  const [time, setTime] = useState<TimeElapsed>({ years: 0, months: 0, days: 0 })

  useEffect(() => {
    setTime(calcTimeElapsed(page.startDate))
    const interval = setInterval(() => {
      setTime(calcTimeElapsed(page.startDate))
    }, 60_000)
    return () => clearInterval(interval)
  }, [page.startDate])

  const startFormatted = new Date(page.startDate + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <section
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 24px',
        position: 'relative',
      }}
    >
      {/* Gradiente suave atrás do conteúdo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, #f0d4ca44 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Eyebrow */}
      <p
        className="reveal"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--color-mauve)',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        Uma história de amor
      </p>

      {/* Nomes */}
      <h1
        className="reveal"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.05,
          color: 'var(--color-wine)',
          position: 'relative',
        }}
      >
        {page.nameA}
        <br />
        <span style={{ fontSize: '0.55em', color: 'var(--color-mauve)' }}>&</span>
        <br />
        {page.nameB}
      </h1>

      {/* Divisor */}
      <div
        className="reveal"
        style={{
          width: 60,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
          margin: '28px auto',
        }}
      />

      {/* Data */}
      <p
        className="reveal"
        style={{
          fontSize: '0.82rem',
          letterSpacing: '0.15em',
          color: 'var(--color-mauve)',
          textTransform: 'uppercase',
        }}
      >
        {startFormatted}
      </p>

      {/* Contador */}
      <div
        className="reveal"
        style={{
          display: 'flex',
          gap: 'clamp(24px, 5vw, 56px)',
          marginTop: 48,
          alignItems: 'flex-start',
        }}
      >
        {[
          { value: time.years, label: 'anos' },
          { value: time.months, label: 'meses' },
          { value: time.days, label: 'dias' },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                fontWeight: 300,
                color: 'var(--color-wine)',
                lineHeight: 1,
              }}
            >
              {item.value}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-mauve)',
                marginTop: 4,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
          }}
        >
          Rolar
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, var(--color-mauve), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Animação do scroll CTA */}
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(0.5); opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}

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
    <section className="min-h-svh flex flex-col items-center justify-center text-center py-[60px] px-6 relative">
      {/* Gradiente suave atrás do conteúdo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, #f0d4ca44 0%, transparent 70%)',
        }}
      />

      {/* Eyebrow */}
      <p
        className="reveal font-sans text-[0.68rem] tracking-[0.35em] uppercase text-mauve mb-5 relative"
      >
        Uma história de amor
      </p>

      {/* Nomes */}
      <h1
        className="reveal font-serif font-light italic leading-[1.05] text-wine relative"
        style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
      >
        {page.nameA}
        <br />
        <span className="text-[0.55em] text-mauve">&</span>
        <br />
        {page.nameB}
      </h1>

      {/* Divisor */}
      <div
        className="reveal w-[60px] h-px my-7 mx-auto"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
        }}
      />

      {/* Data */}
      <p className="reveal text-[0.82rem] tracking-[0.15em] text-mauve uppercase">
        {startFormatted}
      </p>

      {/* Contador */}
      <div
        className="reveal flex items-start mt-12"
        style={{ gap: 'clamp(24px, 5vw, 56px)' }}
      >
        {[
          { value: time.years, label: 'anos' },
          { value: time.months, label: 'meses' },
          { value: time.days, label: 'dias' },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <span
              className="block font-serif font-light text-wine leading-none"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              {item.value}
            </span>
            <span className="block text-[0.62rem] tracking-[0.3em] uppercase text-mauve mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll CTA */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[0.58rem] tracking-[0.3em] uppercase text-mauve">Rolar</span>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{
            background: 'linear-gradient(to bottom, var(--color-mauve), transparent)',
          }}
        />
      </div>
    </section>
  )
}

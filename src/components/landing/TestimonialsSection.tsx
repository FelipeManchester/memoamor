'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'

interface Testimonial {
  id: number
  name: string
  city: string
  initial: string
  avatarBg: string
  avatarColor: string
  quote: string
  context: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Pedro G.',
    city: 'São Paulo',
    initial: 'P',
    avatarBg: '#7a3f3f',
    avatarColor: '#faf6f1',
    quote:
      'Mandei pra ela no exato dia que completamos 4 anos. Ela chorou. Eu chorei. Vale cada centavo.',
    context: 'Aniversário de namoro',
  },
  {
    id: 2,
    name: 'André S.',
    city: 'Belo Horizonte',
    initial: 'A',
    avatarBg: '#c49a8a',
    avatarColor: '#3d2b2b',
    quote: 'Sou péssimo com surpresas, mas isso fez todo o trabalho por mim.',
    context: 'Dia dos Namorados',
  },
  {
    id: 3,
    name: 'Camila T.',
    city: 'Salvador',
    initial: 'C',
    avatarBg: '#f2ddd5',
    avatarColor: '#7a3f3f',
    quote:
      'Mandei pra minha mãe nos 30 anos de casamento dela com meu pai. Eles ficaram horas vendo as memórias.',
    context: 'Bodas de pérola',
  },
]

function StarRating() {
  return (
    <div aria-label="5 de 5 estrelas" role="img" className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
            fill="#7a3f3f"
          />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ initial, bg, color }: { initial: string; bg: string; color: string }) {
  return (
    <div
      aria-hidden="true"
      className="w-12 h-12 rounded-full flex items-center justify-center font-serif italic text-xl font-light shrink-0"
      style={{ background: bg, color }}
    >
      {initial}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      aria-label={`Depoimento de ${t.name}`}
      className="bg-white rounded-[18px] p-6 md:p-8 border border-rose/40 shadow-[0_4px_24px_rgba(122,63,63,0.06)] flex flex-col gap-4 min-w-0 transition-[transform,box-shadow] duration-300 cursor-default hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(122,63,63,0.13)]"
    >
      {/* Avatar + nome + cidade */}
      <div className="flex items-center gap-3">
        <Avatar initial={t.initial} bg={t.avatarBg} color={t.avatarColor} />
        <div>
          <p className="font-sans text-[0.88rem] font-medium text-text leading-snug">{t.name}</p>
          <p className="font-sans text-[0.72rem] text-text-muted tracking-wide">{t.city}</p>
        </div>
      </div>

      <StarRating />

      <p className="font-sans text-[0.95rem] text-text leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      {t.context && (
        <p className="font-sans text-[0.68rem] text-mauve tracking-widest uppercase border-t border-rose/40 pt-3 mt-auto">
          {t.context}
        </p>
      )}
    </article>
  )
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useReducer(
    (_: number, next: number) =>
      ((next % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length,
    0,
  )
  const pausedRef = useRef(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [])

  useEffect(() => {
    scrollTo(current)
  }, [current, scrollTo])

  useEffect(() => {
    if (reducedMotionRef.current) return
    const id = setInterval(() => {
      if (!pausedRef.current) setCurrent(current + 1)
    }, 4500)
    return () => clearInterval(id)
  }, [current])

  function prev() {
    setCurrent(current - 1)
  }
  function next() {
    setCurrent(current + 1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-light py-20 md:py-28 lg:py-36">
      {/* Decoração de fundo */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(196,154,138,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(122,63,63,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20">
        {/* Cabeçalho */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4">
            Histórias reais
          </p>
          <h2
            className="font-serif font-light italic text-wine mb-4 leading-[1.15]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Histórias que já fizeram
            <br />
            alguém chorar
          </h2>
        </div>

        {/* ── DESKTOP: grid 3 colunas ── */}
        <div aria-label="Depoimentos de clientes" className="hidden md:grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* ── MOBILE: carrossel com swipe ── */}
        <div
          className="md:hidden"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div
            ref={trackRef}
            role="region"
            aria-label="Carrossel de depoimentos"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-1 outline-none [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="snap-start shrink-0 w-[calc(100vw-64px)] max-w-sm">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="w-9 h-9 rounded-full border border-wine/25 bg-white flex items-center justify-center text-wine transition-colors hover:border-wine/50 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M9 2L4 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="h-1.5 rounded-full border-none cursor-pointer transition-[width,background] duration-300 p-0"
                  style={{
                    width: i === current ? 20 : 6,
                    background: i === current ? 'var(--color-wine)' : 'var(--color-rose)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="w-9 h-9 rounded-full border border-wine/25 bg-white flex items-center justify-center text-wine transition-colors hover:border-wine/50 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M5 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

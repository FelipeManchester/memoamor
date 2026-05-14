'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Gradiente de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 20% 50%, #f0d4ca55 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 90% 20%, #e8c4b833 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 grid grid-cols-1 lg:grid-cols-2 items-center min-h-svh pt-20">

      {/* ── Coluna esquerda — texto ── */}
      <div className="flex flex-col gap-8 relative z-[1] py-16 pr-8">
        {/* Headline */}
        <h1
          className="font-serif font-light italic text-wine leading-[1.1] m-0"
          style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
        >
          A história de vocês,{' '}
          <span className="relative inline-block">
            em uma página.
            <svg
              viewBox="0 0 300 12"
              className="absolute w-full overflow-visible"
              style={{ bottom: -4, left: 0, height: 12 }}
            >
              <path
                d="M0,8 Q75,2 150,8 Q225,14 300,8"
                stroke="var(--color-rose)"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="font-sans text-base leading-[1.8] text-text-muted m-0"
          style={{ maxWidth: '42ch' }}
        >
          Crie uma página personalizada com fotos, memórias e a música de vocês. Compartilhe com um
          link — sem baixar nada, sem complicação.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 items-center flex-wrap">
          <Link
            href="/criar"
            className="font-sans text-[0.78rem] tracking-[0.2em] uppercase py-[18px] px-9 bg-wine text-cream no-underline rounded-sm transition-all duration-200 inline-block hover:opacity-[0.88] hover:-translate-y-0.5"
          >
            Criar minha página ♡
          </Link>
        </div>

      </div>

      {/* ── Coluna direita — preview mockup ── */}
      <div className="hidden lg:flex h-svh relative overflow-hidden items-center justify-center">
        {/* Moldura do mockup */}
        <div
          className="w-[75%] max-w-[380px] h-[75vh] rounded-3xl overflow-hidden border border-blush relative flex flex-col"
          style={{
            boxShadow: '0 40px 80px rgba(122, 63, 63, 0.15), 0 8px 24px rgba(122, 63, 63, 0.08)',
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: 'transform 0.1s linear',
          }}
        >
          {/* Barra do browser */}
          <div className="bg-white py-[10px] px-4 flex items-center gap-2 border-b border-blush shrink-0">
            <div className="flex gap-1.5">
              {['#ff6b6b', '#ffd93d', '#6bcb77'].map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <div className="flex-1 bg-blush rounded py-1 px-[10px] font-sans text-[0.6rem] text-mauve">
              memoamor.app/p/ana-e-pedro
            </div>
          </div>

          {/* Preview scrollável */}
          <div className="flex-1 overflow-hidden">
            <AutoScrollPreview />
          </div>
        </div>

        {/* Badge flutuante — contador */}
        <div
          className="absolute top-[15%] right-[5%] bg-white rounded-xl py-3 px-4 border border-blush animate-float"
          style={{ boxShadow: '0 8px 24px rgba(122, 63, 63, 0.12)' }}
        >
          <p className="font-sans text-[0.6rem] tracking-[0.1em] uppercase text-mauve m-0 mb-1">
            Juntos há
          </p>
          <p className="font-serif text-[1.3rem] italic text-wine m-0">3 anos ♡</p>
        </div>

        {/* Badge flutuante — player */}
        <div
          className="absolute bottom-[20%] left-[2%] bg-white rounded-xl py-[10px] px-[14px] border border-blush animate-float-reverse flex items-center gap-2"
          style={{ boxShadow: '0 8px 24px rgba(122, 63, 63, 0.12)' }}
        >
          <span className="text-[1.2rem]">♪</span>
          <div>
            <p className="font-sans text-[0.58rem] text-mauve m-0 mb-0.5">Tocando agora</p>
            <p className="font-serif text-[0.82rem] italic text-wine m-0">Perfect – Ed Sheeran</p>
          </div>
        </div>
      </div>

      </div>{/* end container */}
    </section>
  )
}

// ── Preview com auto-scroll em loop ──────────────
function AutoScrollPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function animate() {
      if (!el) return
      posRef.current += 0.4
      if (posRef.current >= el.scrollHeight / 2) posRef.current = 0
      el.scrollTop = posRef.current
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const memories = [
    { title: 'O início de tudo', date: 'Maio · 2016', color: '#f0d4ca' },
    { title: 'Nossa primeira viagem', date: 'Janeiro · 2017', color: '#e8c4b8' },
    { title: 'Os momentos pequenos', date: 'Um dia qualquer', color: '#f2ddd5' },
  ]

  const content = [...memories, ...memories]

  return (
    <div
      ref={ref}
      className="h-full overflow-y-scroll [scrollbar-width:none]"
    >
      {/* Hero simulado */}
      <div
        className="py-10 px-5 text-center min-h-[200px] flex flex-col items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(180deg, var(--color-blush) 0%, var(--color-cream) 100%)',
        }}
      >
        <p className="font-sans text-[0.45rem] tracking-[0.3em] uppercase text-mauve">
          Uma história de amor
        </p>
        <h2 className="font-serif text-[1.8rem] italic font-light text-wine m-0 leading-[1.1]">
          Ana
          <br />
          <span className="text-[0.5em] text-mauve">&</span>
          <br />
          Pedro
        </h2>
        <div className="flex gap-3 mt-2">
          {['9', '3', '12'].map((n, i) => (
            <div key={i} className="text-center">
              <span className="block font-serif text-[1.2rem] text-wine">{n}</span>
              <span className="block font-sans text-[0.4rem] tracking-[0.2em] uppercase text-mauve">
                {['anos', 'meses', 'dias'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Memórias simuladas */}
      {content.map((m, i) => (
        <div
          key={i}
          className={`py-5 px-4 border-b border-blush flex gap-3 items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
        >
          <div
            className="w-20 h-[90px] rounded shrink-0"
            style={{ background: m.color }}
          />
          <div>
            <p className="font-sans text-[0.45rem] tracking-[0.2em] uppercase text-mauve m-0 mb-1">
              {m.date}
            </p>
            <p className="font-serif text-[0.85rem] italic text-wine m-0 mb-1.5">{m.title}</p>
            <p className="font-sans text-[0.5rem] leading-[1.6] text-text-muted m-0">
              Alguns momentos ficam pra sempre guardados no coração...
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

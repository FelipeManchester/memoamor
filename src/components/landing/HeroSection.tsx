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
    <section
      style={{
        minHeight: '100svh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: 0,
        paddingTop: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Gradiente de fundo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 70% at 20% 50%, #f0d4ca55 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 90% 20%, #e8c4b833 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Coluna esquerda — texto ── */}
      <div
        style={{
          padding: 'clamp(40px, 8vw, 100px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--color-blush)',
            border: '1px solid var(--color-rose)',
            borderRadius: 100,
            padding: '6px 16px',
            width: 'fit-content',
          }}
        >
          <span style={{ fontSize: '0.6rem' }}>✦</span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-wine)',
            }}
          >
            Presente digital único
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-wine)',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          A história de vocês,{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            em uma página.
            <svg
              viewBox="0 0 300 12"
              style={{
                position: 'absolute',
                bottom: -4,
                left: 0,
                width: '100%',
                height: 12,
                overflow: 'visible',
              }}
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
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--color-text-muted)',
            maxWidth: '42ch',
            margin: 0,
          }}
        >
          Crie uma página personalizada com fotos, memórias e a música de vocês. Compartilhe com um
          link — sem baixar nada, sem complicação.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/criar"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '18px 36px',
              background: 'var(--color-wine)',
              color: 'var(--color-cream)',
              textDecoration: 'none',
              borderRadius: 2,
              transition: 'opacity 0.2s, transform 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Criar minha página ♡
          </Link>

          <a
            href="/demo"
            target="_blank"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'gap 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.gap = '12px'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.gap = '8px'
            }}
          >
            Ver exemplo ao vivo →
          </a>
        </div>

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 }}>
          <div style={{ display: 'flex' }}>
            {['#c49a8a', '#d4a898', '#e8c4b8', '#c49a8a', '#b08070'].map((color, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: color,
                  border: '2px solid var(--color-cream)',
                  marginLeft: i > 0 ? -8 : 0,
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--color-mauve)',
              margin: 0,
            }}
          >
            Mais de <strong style={{ color: 'var(--color-wine)' }}>500 casais</strong> já têm a sua
            página
          </p>
        </div>
      </div>

      {/* ── Coluna direita — preview mockup ── */}
      <div
        style={{
          height: '100svh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Moldura do mockup */}
        <div
          style={{
            width: '75%',
            maxWidth: 380,
            height: '75vh',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(122, 63, 63, 0.15), 0 8px 24px rgba(122, 63, 63, 0.08)',
            border: '1px solid var(--color-blush)',
            position: 'relative',
            transform: `translateY(${scrollY * 0.05}px)`,
            transition: 'transform 0.1s linear',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Barra do browser */}
          <div
            style={{
              background: 'white',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid var(--color-blush)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff6b6b', '#ffd93d', '#6bcb77'].map((c) => (
                <div
                  key={c}
                  style={{ width: 10, height: 10, borderRadius: '50%', background: c }}
                />
              ))}
            </div>
            <div
              style={{
                flex: 1,
                background: 'var(--color-blush)',
                borderRadius: 4,
                padding: '4px 10px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                color: 'var(--color-mauve)',
              }}
            >
              memoamor.app/p/ana-e-pedro
            </div>
          </div>

          {/* Preview scrollável */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <AutoScrollPreview />
          </div>
        </div>

        {/* Badge flutuante — contador */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            background: 'white',
            borderRadius: 12,
            padding: '12px 16px',
            boxShadow: '0 8px 24px rgba(122, 63, 63, 0.12)',
            border: '1px solid var(--color-blush)',
            animation: 'floatBadge 4s ease-in-out infinite',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              margin: '0 0 4px',
            }}
          >
            Juntos há
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              margin: 0,
            }}
          >
            3 anos ♡
          </p>
        </div>

        {/* Badge flutuante — player */}
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '2%',
            background: 'white',
            borderRadius: 12,
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(122, 63, 63, 0.12)',
            border: '1px solid var(--color-blush)',
            animation: 'floatBadge 5s ease-in-out infinite reverse',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>♪</span>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.58rem',
                color: 'var(--color-mauve)',
                margin: '0 0 2px',
              }}
            >
              Tocando agora
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.82rem',
                fontStyle: 'italic',
                color: 'var(--color-wine)',
                margin: 0,
              }}
            >
              Perfect – Ed Sheeran
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
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
      style={{
        height: '100%',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
      }}
    >
      {/* Hero simulado */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--color-blush) 0%, var(--color-cream) 100%)',
          padding: '40px 20px',
          textAlign: 'center',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.45rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
          }}
        >
          Uma história de amor
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--color-wine)',
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Ana
          <br />
          <span style={{ fontSize: '0.5em', color: 'var(--color-mauve)' }}>&</span>
          <br />
          Pedro
        </h2>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {['9', '3', '12'].map((n, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  color: 'var(--color-wine)',
                }}
              >
                {n}
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.4rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-mauve)',
                }}
              >
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
          style={{
            padding: '20px 16px',
            borderBottom: '1px solid var(--color-blush)',
            display: 'flex',
            flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 80,
              height: 90,
              borderRadius: 4,
              background: m.color,
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.45rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-mauve)',
                margin: '0 0 4px',
              }}
            >
              {m.date}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: 'var(--color-wine)',
                margin: '0 0 6px',
              }}
            >
              {m.title}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.5rem',
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              Alguns momentos ficam pra sempre guardados no coração...
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

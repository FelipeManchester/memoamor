'use client'

export default function CtaSection() {
  return (
    <section
      style={{
        background: 'var(--color-wine)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Elementos decorativos */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232, 196, 184, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Pétalas decorativas nos cantos */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 280,
          opacity: 0.06,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <ellipse cx="100" cy="100" rx="40" ry="100" fill="var(--color-rose)" />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--color-rose)"
          transform="rotate(60 100 100)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--color-rose)"
          transform="rotate(120 100 100)"
        />
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: -40,
          right: -40,
          width: 280,
          opacity: 0.06,
          pointerEvents: 'none',
          transform: 'rotate(180deg)',
        }}
        aria-hidden="true"
      >
        <ellipse cx="100" cy="100" rx="40" ry="100" fill="var(--color-rose)" />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--color-rose)"
          transform="rotate(60 100 100)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--color-rose)"
          transform="rotate(120 100 100)"
        />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--color-rose)',
            marginBottom: 24,
            opacity: 0.8,
          }}
        >
          Comece agora
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Conte a história de vocês.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            color: 'var(--color-blush)',
            lineHeight: 1.8,
            marginBottom: 40,
            opacity: 0.85,
          }}
        >
          Em menos de 5 minutos você cria uma página que vai emocionar quem você ama.
        </p>

        <a
          href="/criar"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '18px 48px',
            background: 'var(--color-cream)',
            color: 'var(--color-wine)',
            textDecoration: 'none',
            borderRadius: 2,
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Criar minha página ♡
        </a>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            color: 'var(--color-rose)',
            marginTop: 16,
            opacity: 0.7,
          }}
        >
          A partir de R$ 39 · Pagamento único
        </p>
      </div>
    </section>
  )
}

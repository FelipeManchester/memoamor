'use client'

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Conte a história',
      description:
        'Preencha os nomes, a data especial e adicione as memórias que marcaram vocês. Fotos, textos e a música de vocês.',
      icon: '✍️',
    },
    {
      number: '02',
      title: 'Escolha o tema',
      description:
        'Selecione entre três temas visuais exclusivos — Pétalas, Corações ou Constelações. Cada um com animações únicas.',
      icon: '✨',
    },
    {
      number: '03',
      title: 'Compartilhe o link',
      description:
        'Receba o link da sua página por e-mail e compartilhe com quem você ama. Funciona em qualquer celular ou computador.',
      icon: '♡',
    },
  ]

  return (
    <section
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fundo decorativo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, #f0d4ca33 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 80px)' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              marginBottom: 16,
            }}
          >
            Simples assim
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              margin: 0,
            }}
          >
            Pronto em menos de 5 minutos
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            position: 'relative',
          }}
        >
          {/* Linha conectora */}
          <div
            style={{
              position: 'absolute',
              top: 36,
              left: 'calc(16.66% + 24px)',
              right: 'calc(16.66% + 24px)',
              height: 1,
              background:
                'linear-gradient(90deg, var(--color-rose), var(--color-mauve), var(--color-rose))',
              opacity: 0.4,
              pointerEvents: 'none',
            }}
          />

          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 20,
              }}
            >
              {/* Número com círculo */}
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'white',
                    border: '1px solid var(--color-rose)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(122, 63, 63, 0.08)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>{step.icon}</span>
                </div>
                {/* Número pequeno */}
                <div
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--color-wine)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.55rem',
                      color: 'var(--color-cream)',
                      fontWeight: 400,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--color-wine)',
                    margin: 0,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    lineHeight: 1.8,
                    color: 'var(--color-text-muted)',
                    margin: 0,
                    maxWidth: '28ch',
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA abaixo dos steps */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 72px)' }}>
          <a
            href="/criar"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '16px 40px',
              background: 'var(--color-wine)',
              color: 'var(--color-cream)',
              textDecoration: 'none',
              borderRadius: 2,
              display: 'inline-block',
              transition: 'opacity 0.2s, transform 0.2s',
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
            Começar agora — R$ 39 →
          </a>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-mauve)',
              marginTop: 12,
            }}
          >
            Pagamento único · Página no ar por 1 ano
          </p>
        </div>
      </div>
    </section>
  )
}

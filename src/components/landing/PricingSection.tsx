'use client'

export default function PricingSection() {
  const plans = [
    {
      id: 'essential',
      name: 'Essencial',
      price: 'R$ 39',
      description: 'Tudo que você precisa para surpreender',
      highlighted: false,
      features: [
        'Página personalizada com animações',
        'Até 3 memórias com foto e texto',
        'Galeria com até 5 fotos',
        'Player de música (YouTube)',
        '3 temas visuais à escolha',
        'Contador de tempo juntos',
        'Link único para compartilhar',
        'Página no ar por 1 ano',
      ],
      cta: 'Criar minha página',
      note: 'Renovação por R$ 9,90/ano',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 69',
      description: 'Para quem quer o melhor',
      highlighted: true,
      features: [
        'Tudo do plano Essencial',
        'Até 6 memórias com foto e texto',
        'Galeria com até 10 fotos',
        'URL personalizada',
        "Sem marca d'água",
        'Página no ar por 1 ano',
      ],
      cta: 'Criar com Premium',
      note: 'Renovação por R$ 9,90/ano',
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
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, #f0d4ca33 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 72px)' }}>
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
            Sem surpresas
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              marginBottom: 16,
            }}
          >
            Simples e transparente
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              maxWidth: '44ch',
              margin: '0 auto',
              lineHeight: 1.8,
            }}
          >
            Pagamento único. Sem assinatura, sem cobranças escondidas.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            alignItems: 'start',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                borderRadius: 8,
                border: plan.highlighted
                  ? '2px solid var(--color-wine)'
                  : '1px solid var(--color-rose)',
                background: plan.highlighted ? 'var(--color-wine)' : 'white',
                padding: 'clamp(28px, 4vw, 40px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge mais popular */}
              {plan.highlighted && (
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    background: 'var(--color-rose)',
                    borderRadius: 100,
                    padding: '4px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--color-wine)',
                  }}
                >
                  Mais popular
                </div>
              )}

              {/* Nome e preço */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: plan.highlighted ? 'var(--color-rose)' : 'var(--color-mauve)',
                  marginBottom: 12,
                }}
              >
                {plan.name}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 300,
                    color: plan.highlighted ? 'var(--color-cream)' : 'var(--color-wine)',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-text-muted)',
                  marginBottom: 28,
                  lineHeight: 1.6,
                }}
              >
                {plan.description}
              </p>

              {/* Divisor */}
              <div
                style={{
                  height: 1,
                  background: plan.highlighted ? 'rgba(242, 221, 213, 0.2)' : 'var(--color-blush)',
                  marginBottom: 24,
                }}
              />

              {/* Features */}
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginBottom: 32,
                }}
              >
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-text)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: plan.highlighted ? 'var(--color-rose)' : 'var(--color-mauve)',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="/criar"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '16px',
                  borderRadius: 2,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s, transform 0.2s',
                  background: plan.highlighted ? 'var(--color-cream)' : 'var(--color-wine)',
                  color: plan.highlighted ? 'var(--color-wine)' : 'var(--color-cream)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.88'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {plan.cta} →
              </a>

              {/* Nota de renovação */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-mauve)',
                  textAlign: 'center',
                  marginTop: 12,
                  opacity: 0.8,
                }}
              >
                {plan.note}
              </p>
            </div>
          ))}
        </div>

        {/* Garantia */}
        <div
          style={{
            marginTop: 48,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🔒</span>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--color-mauve)',
              lineHeight: 1.6,
            }}
          >
            Pagamento seguro via PIX ou cartão · Seus dados protegidos
          </p>
        </div>
      </div>
    </section>
  )
}

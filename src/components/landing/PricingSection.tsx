'use client'

export default function PricingSection() {
  const plans = [
    {
      id: 'essential',
      name: 'Essencial',
      price: 'R$ 19,90',
      description: 'Tudo que você precisa para surpreender',
      highlighted: false,
      features: [
        '1 página',
        'Até 5 memórias',
        'Galeria com até 5 fotos',
        'Player de música',
        '3 temas visuais',
        'Contador de tempo',
        'Link único',
        'Página no ar 1 ano',
        "Marca d'água discreta",
      ],
      cta: 'Criar minha página',
      note: 'Renovação por R$ 9,90/ano',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 29,90',
      description: 'Para quem quer o melhor',
      highlighted: true,
      features: [
        '1 página',
        'Até 10 memórias',
        'Galeria com até 10 fotos',
        'Player de música',
        '3 temas visuais',
        'Contador de tempo',
        'URL personalizada',
        'Página no ar 1 ano',
        "Sem marca d'água",
      ],
      cta: 'Criar com Premium',
      note: 'Renovação por R$ 9,90/ano',
    },
  ]

  return (
    <section
      id="precos"
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}
    >
      {/* Fundo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, #f0d4ca33 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 relative z-[1]">
        {/* Cabeçalho */}
        <div className="text-center" style={{ marginBottom: 'clamp(48px, 8vw, 72px)' }}>
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4">
            Sem surpresas
          </p>
          <h2
            className="font-serif font-light italic text-wine mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Simples e transparente
          </h2>
          <p
            className="font-sans text-[0.95rem] text-text-muted mx-auto leading-[1.8]"
            style={{ maxWidth: '44ch' }}
          >
            Pagamento único. Sem assinatura, sem cobranças escondidas.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-lg relative overflow-hidden"
              style={{
                border: plan.highlighted
                  ? '2px solid var(--color-wine)'
                  : '1px solid var(--color-rose)',
                background: plan.highlighted ? 'var(--color-wine)' : 'white',
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              {/* Badge mais popular */}
              {plan.highlighted && (
                <div className="absolute top-5 right-5 bg-rose rounded-full px-3 py-1 font-sans text-[0.6rem] tracking-[0.15em] uppercase text-wine">
                  Mais popular
                </div>
              )}

              {/* Nome e preço */}
              <p
                className="font-sans text-[0.7rem] tracking-[0.25em] uppercase mb-3"
                style={{ color: plan.highlighted ? 'var(--color-rose)' : 'var(--color-mauve)' }}
              >
                {plan.name}
              </p>

              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="font-serif font-light leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    color: plan.highlighted ? 'var(--color-cream)' : 'var(--color-wine)',
                  }}
                >
                  {plan.price}
                </span>
              </div>

              <p
                className="font-sans text-[0.82rem] mb-7 leading-[1.6]"
                style={{
                  color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-text-muted)',
                }}
              >
                {plan.description}
              </p>

              {/* Divisor */}
              <div
                className="h-px mb-6"
                style={{
                  background: plan.highlighted ? 'rgba(242, 221, 213, 0.2)' : 'var(--color-blush)',
                }}
              />

              {/* Features */}
              <ul className="list-none flex flex-col gap-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-[10px] font-sans text-[0.85rem] leading-[1.5]"
                    style={{
                      color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-text)',
                    }}
                  >
                    <span
                      className="shrink-0 mt-px"
                      style={{
                        color: plan.highlighted ? 'var(--color-rose)' : 'var(--color-mauve)',
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
                className="block text-center font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 rounded-sm no-underline transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
                style={{
                  background: plan.highlighted ? 'var(--color-cream)' : 'var(--color-wine)',
                  color: plan.highlighted ? 'var(--color-wine)' : 'var(--color-cream)',
                }}
              >
                {plan.cta} →
              </a>

              {/* Nota de renovação */}
              <p
                className="font-sans text-[0.68rem] text-center mt-3 opacity-80"
                style={{
                  color: plan.highlighted ? 'var(--color-blush)' : 'var(--color-mauve)',
                }}
              >
                {plan.note}
              </p>
            </div>
          ))}
        </div>

        {/* Garantia */}
        <div className="mt-12 text-center flex items-center justify-center gap-3">
          <span className="text-[1.2rem]">🔒</span>
          <p className="font-sans text-[0.78rem] text-mauve leading-[1.6]">
            Pagamento seguro via PIX ou cartão · Seus dados protegidos
          </p>
        </div>
      </div>
    </section>
  )
}

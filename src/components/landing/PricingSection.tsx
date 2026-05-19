'use client'

import Reveal from '@/components/ui/Reveal'

type Feature = {
  text: string
  upgrade?: string // shown as a small badge on premium
}

const essentialFeatures: Feature[] = [
  { text: '1 página' },
  { text: 'Até 3 memórias' },
  { text: 'Galeria com até 5 fotos' },
  { text: 'Player de música' },
  { text: '1 tema visual' },
  { text: 'Contador de tempo' },
  { text: 'Link único' },
  { text: 'Página no ar 1 ano' },
  { text: "Marca d'água discreta" },
]

const premiumFeatures: Feature[] = [
  { text: '1 página' },
  { text: 'Até 6 memórias', upgrade: '2×' },
  { text: 'Galeria com até 10 fotos', upgrade: '2×' },
  { text: 'Player de música' },
  { text: '3 temas visuais', upgrade: 'novo' },
  { text: 'Contador de tempo' },
  { text: 'URL personalizada', upgrade: 'exclusivo' },
  { text: 'Página no ar 1 ano' },
  { text: "Sem marca d'água", upgrade: 'exclusivo' },
]

const HIGHLIGHTS = [
  { label: '2× memórias' },
  { label: '2× fotos' },
  { label: 'URL própria' },
  { label: 'Sem logo' },
]

export default function PricingSection() {
  return (
    <section
      id="precos"
      className="relative overflow-hidden"
      style={{ padding: 'clamp(48px, 12vw, 140px) 0' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 100%, var(--section-glow) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 relative z-[1]">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 8vw, 72px)' }}>
          <Reveal className="text-center">
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
          </Reveal>
        </div>

        {/* Cards — premium elevated via margin hack on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-end max-w-3xl mx-auto">
          {/* ── Essencial ── */}
          <div
            className="rounded-l-lg rounded-r-none max-md:rounded-lg relative"
            style={{
              border: '1px solid var(--color-rose)',
              background: 'var(--surface-card)',
              padding: 'clamp(28px, 4vw, 40px)',
            }}
          >
            <p className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-mauve mb-3">
              Essencial
            </p>

            <div className="flex items-baseline gap-1 mb-1">
              <span
                className="font-serif font-light leading-none text-wine"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.2rem)' }}
              >
                R$ 19,90
              </span>
            </div>

            <p className="font-sans text-[0.82rem] text-text-muted mb-7 leading-[1.6]">
              O básico bem feito
            </p>

            <div className="h-px mb-6 bg-blush" />

            <ul className="list-none flex flex-col gap-3 mb-8">
              {essentialFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-[10px] font-sans text-[0.85rem] leading-[1.5] text-text"
                >
                  <span className="shrink-0 text-mauve">✓</span>
                  {f.text}
                </li>
              ))}
            </ul>

            <a
              href="/criar"
              className="block text-center font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 rounded-sm no-underline transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-px"
              style={{ background: 'var(--color-wine)', color: 'var(--color-cream)' }}
            >
              Criar minha página →
            </a>

            <p className="font-sans text-[0.68rem] text-center mt-3 text-mauve opacity-70">
              Renovação por R$ 9,90/ano
            </p>
          </div>

          {/* ── Premium ── */}
          <div
            className="rounded-lg relative overflow-hidden"
            style={{
              background: 'var(--premium-bg)',
              padding: 'clamp(28px, 4vw, 44px)',
              boxShadow: '0 24px 64px var(--shadow-brand-heavy), 0 4px 16px var(--shadow-soft-strong)',
              marginBottom: '-1px', // align bottom edge with essencial card bottom border
            }}
          >
            {/* Popular badge */}
            <div
              className="absolute top-5 right-5 rounded-full px-3 py-1 font-sans text-[0.6rem] tracking-[0.15em] uppercase"
              style={{ background: 'var(--premium-badge-bg)', color: 'var(--premium-badge-text)' }}
            >
              Mais popular
            </div>

            <p
              className="font-sans text-[0.7rem] tracking-[0.25em] uppercase mb-3"
              style={{ color: 'var(--premium-eyebrow)' }}
            >
              Premium
            </p>

            {/* Price + delta */}
            <div className="mb-1">
              <span
                className="font-serif font-light leading-none"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  color: 'var(--premium-price)',
                }}
              >
                R$ 29,90
              </span>
            </div>

            {/* Value framing */}

            <p
              className="font-sans text-[0.82rem] mb-5 leading-[1.6]"
              style={{ color: 'var(--premium-tagline)' }}
            >
              Pra surpreender de verdade
            </p>

            {/* What you gain — highlight pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h.label}
                  className="font-sans text-[0.62rem] tracking-[0.08em] px-2.5 py-1 rounded-full"
                  style={{
                    background: 'var(--premium-pill-bg)',
                    color: 'var(--premium-pill-text)',
                    border: '1px solid var(--premium-pill-border)',
                  }}
                >
                  {h.label}
                </span>
              ))}
            </div>

            <div className="h-px mb-6" style={{ background: 'var(--premium-divider)' }} />

            {/* Features */}
            <ul className="list-none flex flex-col gap-3 mb-8">
              {premiumFeatures.map((f, i) => {
                const isUpgrade = !!f.upgrade
                return (
                  <li
                    key={i}
                    className="flex items-center gap-[10px] font-sans text-[0.85rem] leading-[1.5]"
                    style={{
                      color: isUpgrade ? 'var(--premium-feat-active)' : 'var(--premium-feat-muted)',
                      fontWeight: isUpgrade ? 400 : 300,
                    }}
                  >
                    <span
                      className="shrink-0"
                      style={{
                        color: isUpgrade ? 'var(--premium-check)' : 'var(--premium-check-muted)',
                      }}
                    >
                      ✓
                    </span>
                    <span className="flex-1">{f.text}</span>
                    {f.upgrade && (
                      <span
                        className="font-sans text-[0.58rem] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-sm shrink-0"
                        style={{
                          background: 'var(--premium-tag-bg)',
                          color: 'var(--premium-tag-text)',
                          border: '1px solid var(--premium-tag-border)',
                        }}
                      >
                        {f.upgrade}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* CTA */}
            <a
              href="/criar?plan=premium"
              className="block text-center font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 rounded-sm no-underline transition-all duration-200 hover:opacity-[0.92] hover:-translate-y-px"
              style={{
                background: 'var(--premium-cta-bg)',
                color: 'var(--premium-cta-text)',
              }}
            >
              Quero a Premium →
            </a>

            <p
              className="font-sans text-[0.68rem] text-center mt-3 opacity-60"
              style={{ color: 'var(--premium-disclaimer)' }}
            >
              Renovação por R$ 9,90/ano
            </p>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-12 text-center flex items-center justify-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-mauve shrink-0"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <p className="font-sans text-[0.78rem] text-mauve leading-[1.6]">
            Pagamento seguro via PIX ou cartão · Seus dados protegidos
          </p>
        </div>
      </div>
    </section>
  )
}

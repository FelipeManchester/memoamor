'use client'

import Reveal from '@/components/ui/Reveal'

export default function CtaSection() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{
        padding: 'clamp(48px, 12vw, 140px) 0',
        background: 'var(--cta-section-bg)',
      }}
    >
      {/* Elementos decorativos */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232, 196, 184, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Pétalas decorativas nos cantos */}
      <svg
        viewBox="0 0 200 200"
        className="absolute w-[280px] opacity-[0.06] pointer-events-none"
        style={{ top: -40, left: -40 }}
        aria-hidden="true"
      >
        <ellipse cx="100" cy="100" rx="40" ry="100" fill="var(--cta-petal-fill)" />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--cta-petal-fill)"
          transform="rotate(60 100 100)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--cta-petal-fill)"
          transform="rotate(120 100 100)"
        />
      </svg>

      <svg
        viewBox="0 0 200 200"
        className="absolute w-[280px] opacity-[0.06] pointer-events-none rotate-180"
        style={{ bottom: -40, right: -40 }}
        aria-hidden="true"
      >
        <ellipse cx="100" cy="100" rx="40" ry="100" fill="var(--cta-petal-fill)" />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--cta-petal-fill)"
          transform="rotate(60 100 100)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="40"
          ry="100"
          fill="var(--cta-petal-fill)"
          transform="rotate(120 100 100)"
        />
      </svg>

      <Reveal className="max-w-[600px] mx-auto px-5 relative z-[1]">
        <p
          className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--cta-eyebrow)' }}
        >
          Comece agora
        </p>

        <h2
          className="font-serif font-light italic leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--cta-heading)' }}
        >
          Surpreenda quem você ama.
        </h2>

        <p
          className="font-sans text-[0.95rem] leading-[1.8] mb-10 opacity-[0.85]"
          style={{ color: 'var(--cta-body)' }}
        >
          Qual foi a última vez que você surpreendeu o seu amor? Em menos de 5 minutos você cria uma
          página que vai emocionar.
        </p>

        <a
          href="/criar"
          className="inline-block font-sans text-[0.78rem] tracking-[0.2em] uppercase py-[18px] px-12 no-underline rounded-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            background: 'var(--cta-button-bg)',
            color: 'var(--cta-button-text)',
          }}
        >
          Criar minha página ♡
        </a>

        <p
          className="font-sans text-[0.72rem] mt-4 opacity-70"
          style={{ color: 'var(--cta-disclaimer)' }}
        >
          R$ 29,90 · Pagamento único
        </p>
      </Reveal>
    </section>
  )
}

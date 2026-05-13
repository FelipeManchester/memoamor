'use client'

export default function CtaSection() {
  return (
    <section
      className="bg-wine relative overflow-hidden text-center"
      style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}
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
        className="absolute w-[280px] opacity-[0.06] pointer-events-none rotate-180"
        style={{ bottom: -40, right: -40 }}
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

      <div className="max-w-[600px] mx-auto px-5 relative z-[1]">
        <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-rose mb-6 opacity-80">
          Comece agora
        </p>

        <h2
          className="font-serif font-light italic text-cream leading-[1.15] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Conte a história de vocês.
        </h2>

        <p className="font-sans text-[0.95rem] text-blush leading-[1.8] mb-10 opacity-[0.85]">
          Em menos de 5 minutos você cria uma página que vai emocionar quem você ama.
        </p>

        <a
          href="/criar"
          className="inline-block font-sans text-[0.78rem] tracking-[0.2em] uppercase py-[18px] px-12 bg-cream text-wine no-underline rounded-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
        >
          Criar minha página ♡
        </a>

        <p className="font-sans text-[0.72rem] text-rose mt-4 opacity-70">
          A partir de R$ 39 · Pagamento único
        </p>
      </div>
    </section>
  )
}

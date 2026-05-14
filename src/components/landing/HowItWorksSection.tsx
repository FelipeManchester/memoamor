'use client'

function IconPen() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-wine)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <line x1="5" y1="20.5" x2="19" y2="20.5" strokeOpacity="0.3" />
    </svg>
  )
}

function IconSparkle() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-wine)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Large star */}
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-wine)"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <line x1="8.41" y1="10.89" x2="15.59" y2="6.11" />
      <line x1="8.41" y1="13.11" x2="15.59" y2="17.89" />
    </svg>
  )
}

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Conte a história',
      description:
        'Preencha os nomes, a data especial e adicione as memórias que marcaram vocês. Fotos, textos e a música de vocês.',
      icon: <IconPen />,
    },
    {
      number: '02',
      title: 'Escolha o tema',
      description:
        'Selecione entre três temas visuais exclusivos — Pétalas, Corações ou Constelações. Cada um com animações únicas.',
      icon: <IconSparkle />,
    },
    {
      number: '03',
      title: 'Compartilhe o link',
      description:
        'Receba o link e um QR Code por e-mail. Mostre o código para quem você ama — é só apontar a câmera.',
      icon: <IconShare />,
    },
  ]

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}
    >
      {/* Fundo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, #f0d4ca33 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 relative z-[1]">
        {/* Cabeçalho */}
        <div className="text-center" style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}>
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4">
            Simples assim
          </p>
          <h2
            className="font-serif font-light italic text-wine m-0"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Pronto em menos de 5 minutos
          </h2>
        </div>

        {/* Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 relative"
          style={{ gap: 'clamp(24px, 4vw, 48px)' }}
        >
          {/* Linha conectora */}
          <div
            className="absolute top-9 h-px opacity-40 pointer-events-none hidden md:block"
            style={{
              left: 'calc(16.66% + 24px)',
              right: 'calc(16.66% + 24px)',
              background:
                'linear-gradient(90deg, var(--color-rose), var(--color-mauve), var(--color-rose))',
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-5">
              {/* Ícone com círculo */}
              <div className="relative">
                <div
                  className="w-[72px] h-[72px] rounded-full bg-white border border-rose flex items-center justify-center relative z-[1]"
                  style={{ boxShadow: '0 4px 20px rgba(122, 63, 63, 0.08)' }}
                >
                  {step.icon}
                </div>
                {/* Número pequeno */}
                <div className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] rounded-full bg-wine flex items-center justify-center z-[2]">
                  <span className="font-sans text-[0.55rem] text-cream font-normal">{i + 1}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[1.4rem] font-light italic text-wine m-0">
                  {step.title}
                </h3>
                <p
                  className="font-sans text-[0.88rem] leading-[1.8] text-text-muted m-0"
                  style={{ maxWidth: '28ch' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA abaixo dos steps */}
        <div className="text-center" style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
          <a
            href="/criar"
            className="font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 px-10 bg-wine text-cream no-underline rounded-sm inline-block transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-0.5"
          >
            Começar agora →
          </a>
          <p className="font-sans text-[0.72rem] text-mauve mt-3">
            Pagamento único · Página no ar por 1 ano
          </p>
        </div>
      </div>
    </section>
  )
}

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
      className="relative overflow-hidden"
      style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 100px)' }}
    >
      {/* Fundo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, #f0d4ca33 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1100px] mx-auto relative z-[1]">
        {/* Cabeçalho */}
        <div
          className="text-center"
          style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}
        >
          <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-mauve mb-4">
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
          className="grid grid-cols-3 relative"
          style={{ gap: 'clamp(24px, 4vw, 48px)' }}
        >
          {/* Linha conectora */}
          <div
            className="absolute top-9 h-px opacity-40 pointer-events-none"
            style={{
              left: 'calc(16.66% + 24px)',
              right: 'calc(16.66% + 24px)',
              background: 'linear-gradient(90deg, var(--color-rose), var(--color-mauve), var(--color-rose))',
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-5">
              {/* Número com círculo */}
              <div className="relative">
                <div
                  className="w-[72px] h-[72px] rounded-full bg-white border border-rose flex items-center justify-center relative z-[1]"
                  style={{ boxShadow: '0 4px 20px rgba(122, 63, 63, 0.08)' }}
                >
                  <span className="text-[1.8rem]">{step.icon}</span>
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
        <div
          className="text-center"
          style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}
        >
          <a
            href="/criar"
            className="font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 px-10 bg-wine text-cream no-underline rounded-sm inline-block transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-0.5"
          >
            Começar agora — R$ 39 →
          </a>
          <p className="font-sans text-[0.72rem] text-mauve mt-3">
            Pagamento único · Página no ar por 1 ano
          </p>
        </div>
      </div>
    </section>
  )
}

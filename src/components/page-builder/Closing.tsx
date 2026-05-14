import type { MemoryPage } from '@/types'

interface ClosingProps {
  page: MemoryPage
}

export default function Closing({ page }: ClosingProps) {
  const startYear = new Date(page.startDate + 'T12:00:00').getFullYear()

  return (
    <section
      className="text-center relative"
      style={{ padding: 'clamp(80px, 14vw, 160px) 24px' }}
    >
      <h2
        className="reveal font-serif italic font-light text-wine leading-[1.15] mb-5"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        Para sempre,
        <br />
        com você.
      </h2>

      <p className="reveal font-sans text-[0.82rem] font-medium tracking-[0.15em] uppercase text-text-muted mb-10">
        {page.nameA} & {page.nameB} · {startYear}
      </p>

      {/* Coração animado */}
      <span className="reveal inline-block text-[1.8rem] animate-heartbeat text-wine">♡</span>

      {/* Marca d'água — apenas plano Essencial */}
      {page.plan === 'essential' && (
        <div className="mt-20 pt-8 border-t border-blush">
          <a
            href="https://memoamor.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.62rem] tracking-[0.25em] uppercase text-rose no-underline opacity-70 transition-opacity duration-200"
          >
            Feito com Memoamor
          </a>
        </div>
      )}
    </section>
  )
}

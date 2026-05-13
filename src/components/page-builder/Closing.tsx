import type { MemoryPage } from '@/types'

interface ClosingProps {
  page: MemoryPage
}

export default function Closing({ page }: ClosingProps) {
  const startYear = new Date(page.startDate + 'T12:00:00').getFullYear()

  return (
    <section
      style={{
        textAlign: 'center',
        padding: 'clamp(80px, 14vw, 160px) 24px',
        position: 'relative',
      }}
    >
      <h2
        className="reveal"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-wine)',
          lineHeight: 1.15,
          marginBottom: 20,
        }}
      >
        Para sempre,
        <br />
        com você.
      </h2>

      <p
        className="reveal"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.82rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-mauve)',
          marginBottom: 40,
        }}
      >
        {page.nameA} & {page.nameB} · {startYear}
      </p>

      {/* Coração animado */}
      <span
        className="reveal"
        style={{
          display: 'inline-block',
          fontSize: '1.8rem',
          animation: 'heartbeat 2.4s ease-in-out infinite',
          color: 'var(--color-wine)',
        }}
      >
        ♡
      </span>

      {/* Marca d'água — apenas plano Essencial */}
      {page.plan === 'essential' && (
        <div
          style={{
            marginTop: 80,
            paddingTop: 32,
            borderTop: '1px solid var(--color-blush)',
          }}
        >
          <a
            href="https://memoamor.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-rose)',
              textDecoration: 'none',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
          >
            Feito com Memoamor
          </a>
        </div>
      )}

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.25); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          56% { transform: scale(1); }
        }
      `}</style>
    </section>
  )
}

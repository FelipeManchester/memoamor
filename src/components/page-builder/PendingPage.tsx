'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface PendingPageProps {
  slug: string
  template: string
}

export default function PendingPage({ slug, template }: PendingPageProps) {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('memory_pages')
        .select('status')
        .eq('slug', slug)
        .single()

      if (data?.status === 'active') {
        clearInterval(interval)
        router.refresh()
      }
    }, 2000)

    // Timeout de segurança — para de fazer polling após 3 minutos
    const timeout = setTimeout(() => clearInterval(interval), 3 * 60 * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [slug, router])

  const bgColor = template === 'constellations' ? '#1a0f0f' : 'var(--color-cream)'
  const textColor = template === 'constellations' ? 'var(--color-rose)' : 'var(--color-wine)'
  const mutedColor = template === 'constellations' ? 'var(--color-mauve)' : 'var(--color-mauve)'

  return (
    <div
      style={{
        minHeight: '100svh',
        background: bgColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        textAlign: 'center',
        padding: 24,
      }}
    >
      {/* Coração pulsando */}
      <span
        style={{
          fontSize: '2.5rem',
          color: textColor,
          animation: 'heartbeat 2.4s ease-in-out infinite',
        }}
      >
        ♡
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: textColor,
          }}
        >
          Preparando sua página...
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: mutedColor,
            lineHeight: 1.8,
            maxWidth: '36ch',
          }}
        >
          Isso leva alguns segundos. A página abrirá automaticamente assim que estiver pronta.
        </p>
      </div>

      {/* Indicador de loading */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: textColor,
              animation: `loadingDot 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.25); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          56% { transform: scale(1); }
        }
        @keyframes loadingDot {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

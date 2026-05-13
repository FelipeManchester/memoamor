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

    const timeout = setTimeout(() => clearInterval(interval), 3 * 60 * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [slug, router])

  const bgColor = template === 'constellations' ? '#1a0f0f' : 'var(--color-cream)'
  const textColor = template === 'constellations' ? 'var(--color-rose)' : 'var(--color-wine)'
  const mutedColor = 'var(--color-mauve)'

  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center gap-6 text-center p-6"
      style={{ background: bgColor }}
    >
      {/* Coração pulsando */}
      <span
        className="text-[2.5rem] animate-heartbeat"
        style={{ color: textColor }}
      >
        ♡
      </span>

      <div className="flex flex-col gap-3">
        <h1
          className="font-serif font-light italic"
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            color: textColor,
          }}
        >
          Preparando sua página...
        </h1>
        <p
          className="font-sans text-[0.85rem] leading-[1.8]"
          style={{ color: mutedColor, maxWidth: '36ch' }}
        >
          Isso leva alguns segundos. A página abrirá automaticamente assim que estiver pronta.
        </p>
      </div>

      {/* Indicador de loading */}
      <div className="flex gap-2 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full opacity-40"
            style={{
              background: textColor,
              animation: `loadingDot 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

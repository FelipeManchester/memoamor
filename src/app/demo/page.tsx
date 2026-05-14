'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockPage } from '@/lib/mock'
import BackgroundRenderer from '@/components/backgrounds/BackgroundRenderer'
import ScrollAnimations from '@/components/gsap/ScrollAnimations'
import Hero from '@/components/page-builder/Hero'
import MemoryBlock from '@/components/page-builder/MemoryBlock'
import QuoteBlock from '@/components/page-builder/QuoteBlock'
import Gallery from '@/components/page-builder/Gallery'
import Closing from '@/components/page-builder/Closing'
import MemoryPageClient from '@/components/page-builder/MemoryPageClient'
import type { TemplateId } from '@/types'
import { TEMPLATE_QUOTES } from '@/lib/constants'

const VALID_TEMPLATES: TemplateId[] = ['petals', 'hearts', 'constellations']

const templates: { id: TemplateId; name: string }[] = [
  { id: 'petals', name: 'Pétalas' },
  { id: 'hearts', name: 'Corações' },
  { id: 'constellations', name: 'Constelações' },
]

function DemoContent() {
  const searchParams = useSearchParams()
  const param = searchParams.get('template') as TemplateId
  const initial: TemplateId = VALID_TEMPLATES.includes(param) ? param : 'petals'

  const [template, setTemplate] = useState<TemplateId>(initial)
  const [opened, setOpened] = useState(false)
  const page = { ...mockPage, template }

  function handleOpen() {
    setOpened(true)
  }

  return (
    <div data-template={template}>
      <BackgroundRenderer template={template} />
      <ScrollAnimations />

      {/* Seletor de template */}
      {opened && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1500,
            display: 'flex',
            gap: 8,
            background: 'var(--selector-bg, rgba(250, 246, 241, 0.88))',
            backdropFilter: 'blur(12px)',
            borderRadius: 100,
            padding: '6px 8px',
            border: '1px solid var(--color-rose)',
          }}
        >
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                borderRadius: 100,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: template === t.id ? 'var(--btn-primary-bg, var(--color-wine))' : 'transparent',
                color: template === t.id ? 'var(--color-cream)' : 'var(--color-mauve)',
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      {/* Logo */}
      <a
        href="/"
        style={{
          position: 'fixed',
          top: 20,
          left: 24,
          zIndex: 1500,
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-wine)',
          textDecoration: 'none',
        }}
      >
        Memoamor
      </a>

      {/* Botão CTA fixo */}
      <a
        href="/criar"
        style={{
          position: 'fixed',
          top: 20,
          right: 24,
          zIndex: 1500,
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '12px 20px',
          borderRadius: 2,
          background: 'var(--btn-primary-bg, var(--color-wine))',
          color: 'var(--color-cream)',
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        Criar a minha →
      </a>

      {/* Conteúdo da página */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero page={page} />

        <section
          style={{
            padding: 'clamp(60px, 10vw, 120px) clamp(20px, 8vw, 100px)',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {page.memories.map((memory, i) => (
            <MemoryBlock
              key={memory.id}
              memory={memory}
              flip={i % 2 !== 0}
              supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
            />
          ))}
        </section>

        <QuoteBlock
          text={TEMPLATE_QUOTES[template]?.text ?? TEMPLATE_QUOTES.petals.text}
          author={TEMPLATE_QUOTES[template]?.author ?? TEMPLATE_QUOTES.petals.author}
        />

        <Gallery photos={page.gallery} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />

        <Closing page={page} />
      </main>

      <MemoryPageClient
        nameA={page.nameA}
        nameB={page.nameB}
        youtubeUrl={page.youtubeUrl}
        template={template}
        onOpen={handleOpen}
      />
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense>
      <DemoContent />
    </Suspense>
  )
}

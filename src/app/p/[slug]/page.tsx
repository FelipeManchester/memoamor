import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { mockPage } from '@/lib/mock'
import type { MemoryPage } from '@/types'

import PetalBackground from '@/components/backgrounds/PetalBackground'
import ScrollAnimations from '@/components/gsap/ScrollAnimations'

import Hero from '@/components/page-builder/Hero'
import MemoryBlock from '@/components/page-builder/MemoryBlock'
import Gallery from '@/components/page-builder/Gallery'
import QuoteBlock from '@/components/page-builder/QuoteBlock'
import Closing from '@/components/page-builder/Closing'
import MemoryPageClient from '@/components/page-builder/MemoryPageClient'

import ResetFormOnSuccess from '@/components/page-builder/ResetFormOnSuccess'

const USE_MOCK = false // 👈 mude para false quando o banco estiver populado

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ payment?: string }>
}

export default async function MemoryPageRoute({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { payment } = await searchParams

  let page: MemoryPage

  if (USE_MOCK) {
    page = mockPage
  } else {
    const supabase = createAdminClient()
    const { data } = await supabase.from('memory_pages').select('*').eq('slug', slug).single()

    if (!data) notFound()

    // Mapeia snake_case do banco para camelCase dos componentes
    page = {
      id: data.id,
      slug: data.slug,
      status: data.status,
      plan: data.plan,
      template: data.template,
      nameA: data.name_a,
      nameB: data.name_b,
      startDate: data.start_date,
      pageTitle: data.page_title,
      youtubeUrl: data.youtube_url,
      memories: (data.memories ?? []).map((m: any) => ({
        id: m.id,
        dateLabel: m.date_label,
        title: m.title,
        body: m.body,
        imagePath: m.image_path,
      })),
      gallery: data.gallery ?? [],
      customerEmail: data.customer_email,
      paidAt: data.paid_at,
      reservedUntil: data.reserved_until,
      expiresAt: data.expires_at,
      abacateSessionId: data.abacate_session_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } as MemoryPage
  }

  if (page.status === 'pending_payment') {
    return (
      <main>
        <p>Preparando sua página...</p>
      </main>
    )
  }

  return (
    <>
      {/* Aqui vamos montar os componentes um por um */}
      <ScrollAnimations />
      <PetalBackground />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero page={page} />

        {/* Memórias */}
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
          text="Amar é encontrar na felicidade do outro a própria felicidade."
          author="Gottfried Leibniz"
        />

        <Gallery photos={page.gallery} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />

        <Closing page={page} />
        <MemoryPageClient nameA={page.nameA} nameB={page.nameB} youtubeUrl={page.youtubeUrl} />
      </main>
      {payment === 'success' && <ResetFormOnSuccess />}
    </>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import { mockPage } from '@/lib/mock'
import type { MemoryPage } from '@/types'
import { TEMPLATE_QUOTES } from '@/lib/constants'

function formatDatePtBR(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  return `${day} de ${months[month - 1]} de ${year}`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('memory_pages')
    .select('name_a, name_b, start_date, status')
    .eq('slug', slug)
    .single()

  if (!data || data.status !== 'active') {
    return { title: 'Página não encontrada' }
  }

  const title = `${data.name_a} & ${data.name_b} | Memoamor`
  const description = `A história de ${data.name_a} e ${data.name_b}, desde ${formatDatePtBR(data.start_date)}. Uma página de memórias especial, criada com amor.`
  const ogImage = `/api/og`
  const pageUrl = `/p/${slug}`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: pageUrl,
      siteName: 'Memoamor',
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

import BackgroundRenderer from '@/components/backgrounds/BackgroundRenderer'
import ScrollAnimations from '@/components/gsap/ScrollAnimations'

import Hero from '@/components/page-builder/Hero'
import MemoryBlock from '@/components/page-builder/MemoryBlock'
import Gallery from '@/components/page-builder/Gallery'
import QuoteBlock from '@/components/page-builder/QuoteBlock'
import Closing from '@/components/page-builder/Closing'
import MemoryPageClient from '@/components/page-builder/MemoryPageClient'

import ResetFormOnSuccess from '@/components/page-builder/ResetFormOnSuccess'

import PendingPage from '@/components/page-builder/PendingPage'

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
      closingQuote: data.closing_quote ?? null,
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
    return <PendingPage slug={page.slug} template={page.template} />
  }

  return (
    <div data-template={page.template}>
      <ScrollAnimations />
      <BackgroundRenderer template={page.template} />
      <main className="relative z-[1]">
        <Hero page={page} />

        {/* Memórias */}
        <section
          className="max-w-[1100px] mx-auto"
          style={{ padding: 'clamp(60px, 10vw, 120px) clamp(20px, 8vw, 100px)' }}
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
          text={TEMPLATE_QUOTES[page.template]?.text ?? TEMPLATE_QUOTES.petals.text}
          author={TEMPLATE_QUOTES[page.template]?.author ?? TEMPLATE_QUOTES.petals.author}
        />

        <Gallery photos={page.gallery} supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!} />

        <Closing page={page} />
        <MemoryPageClient
          nameA={page.nameA}
          nameB={page.nameB}
          youtubeUrl={page.youtubeUrl}
          template={page.template}
        />
      </main>
      {payment === 'success' && <ResetFormOnSuccess />}
    </div>
  )
}

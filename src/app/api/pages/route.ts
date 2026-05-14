import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateBaseSlug, generateSlugWithSuffix } from '@/lib/slug'
import { addMinutes, addDays } from 'date-fns'
import { SLUG_RESERVATION_MINUTES, PAGE_DURATION_DAYS } from '@/lib/constants'
import type { CreateFormData, ApiResponse, CreatePageResponse } from '@/types'

// ─────────────────────────────────────────────
// POST /api/pages
// Salva os dados da página antes do checkout
// status: pending_payment + reserved_until
// ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: CreateFormData = await req.json()
    const supabase = createAdminClient()

    const baseSlug = generateBaseSlug(body.nameA, body.nameB, body.startDate)
    let slug = baseSlug
    let inserted = false
    let attempts = 0

    // Tenta inserir — em colisão, adiciona sufixo (máx. 5 tentativas)
    while (!inserted && attempts < 5) {
      const now = new Date()
      const reservedUntil = addMinutes(now, SLUG_RESERVATION_MINUTES).toISOString()
      const expiresAt = addDays(now, PAGE_DURATION_DAYS).toISOString()

      const { error } = await supabase.from('memory_pages').insert({
        slug,
        status: 'pending_payment',
        plan: body.plan,
        template: body.template,
        name_a: body.nameA,
        name_b: body.nameB,
        start_date: body.startDate,
        page_title: body.pageTitle || null,
        closing_quote: body.closingQuote || null,
        youtube_url: body.youtubeUrl || null,
        memories: body.memories.map((m) => ({
          id: m.id,
          date_label: m.dateLabel,
          title: m.title,
          body: m.body,
          image_path: m.imagePath,
        })),
        gallery: body.gallery.map((g) => g.path).filter(Boolean),
        customer_email: body.customerEmail,
        reserved_until: reservedUntil,
        expires_at: expiresAt,
      })

      if (!error) {
        inserted = true
      } else if (error.code === '23505') {
        // Unique violation — tenta com sufixo
        slug = generateSlugWithSuffix(baseSlug)
        attempts++
      } else {
        throw error
      }
    }

    if (!inserted) {
      return NextResponse.json<ApiResponse>(
        { data: null, error: 'Não foi possível gerar um endereço único. Tente novamente.' },
        { status: 500 },
      )
    }

    return NextResponse.json<ApiResponse<CreatePageResponse>>({
      data: { slug, checkoutUrl: '' }, // checkoutUrl preenchida pelo /api/checkout
      error: null,
    })
  } catch (err) {
    console.error('[POST /api/pages]', err)
    return NextResponse.json<ApiResponse>(
      { data: null, error: 'Erro interno. Tente novamente.' },
      { status: 500 },
    )
  }
}

// ─────────────────────────────────────────────
// GET /api/pages?slug=ana-e-pedro-2016
// Polling de status — usado após o checkout
// ─────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    return NextResponse.json<ApiResponse>(
      { data: null, error: 'Slug obrigatório.' },
      { status: 400 },
    )
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('memory_pages')
    .select('status')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json<ApiResponse>(
      { data: null, error: 'Página não encontrada.' },
      { status: 404 },
    )
  }

  return NextResponse.json<ApiResponse>({ data, error: null })
}

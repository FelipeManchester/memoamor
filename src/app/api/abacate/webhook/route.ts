import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendDeliveryEmail } from '@/lib/email'
import { PLANS } from '@/lib/constants'

const META_PIXEL_ID = '1685469816137988'

async function hashEmail(email: string): Promise<string> {
  const encoded = new TextEncoder().encode(email.trim().toLowerCase())
  const buf = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function sendMetaPurchaseEvent(slug: string, planId: string, email?: string) {
  const accessToken = process.env.META_ACCESS_TOKEN
  if (!accessToken) return

  const plan = PLANS.find((p) => p.id === planId)
  const value = plan ? plan.priceInCents / 100 : 0

  const hashedEmail = email ? await hashEmail(email) : undefined

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_id: `purchase-${slug}`,
        event_source_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://memoamor.app'}/sucesso`,
        user_data: {
          ...(hashedEmail ? { em: [hashedEmail] } : {}),
        },
        custom_data: { value, currency: 'BRL' },
      },
    ],
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${accessToken}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) },
  )

  if (!res.ok) {
    console.error('[webhook] Meta Conversions API error:', await res.text())
  }
}

interface MemoryRow {
  id: string
  date_label: string
  title: string
  body: string
  image_path: string | null
}

async function migratePhotos(
  supabase: ReturnType<typeof createAdminClient>,
  slug: string,
  memories: MemoryRow[],
  gallery: string[],
) {
  const updatedMemories = memories.map((m) => ({ ...m }))
  const updatedGallery = [...gallery]
  let changed = false

  for (let i = 0; i < updatedMemories.length; i++) {
    const m = updatedMemories[i]
    if (!m.image_path?.startsWith('temp/')) continue

    const filename = m.image_path.split('/').pop()
    if (!filename) continue

    const newPath = `pages/${slug}/memories/${filename}`
    const { error } = await supabase.storage.from('pages').move(m.image_path, newPath)

    if (error) {
      console.error('[webhook] erro na migração:', error)
      continue
    }

    m.image_path = newPath
    changed = true
  }

  for (let i = 0; i < updatedGallery.length; i++) {
    const oldPath = updatedGallery[i]
    if (!oldPath.startsWith('temp/')) continue

    const filename = oldPath.split('/').pop()
    if (!filename) continue

    const newPath = `pages/${slug}/gallery/${filename}`
    const { error } = await supabase.storage.from('pages').move(oldPath, newPath)

    if (error) {
      console.error('[webhook] erro na migração:', error)
      continue
    }

    updatedGallery[i] = newPath
    changed = true
  }

  if (!changed) return

  const { error } = await supabase
    .from('memory_pages')
    .update({ memories: updatedMemories, gallery: updatedGallery })
    .eq('slug', slug)

  if (error) {
    console.error('[webhook] erro na migração:', error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get('secret')

    if (secret !== process.env.ABACATEPAY_WEBHOOK_SECRET) {
      console.error('[webhook] secret inválido:', secret)
      return new NextResponse('Não autorizado', { status: 401 })
    }

    const body = await req.json()
    console.log('[webhook] evento recebido:', body.event)

    if (body.event !== 'checkout.completed') {
      return new NextResponse('ok', { status: 200 })
    }

    // Estrutura v2
    const checkout = body.data?.checkout
    const slug: string = checkout?.externalId ?? checkout?.metadata?.slug
    const customerEmail: string = body.data?.customer?.email

    if (!slug) {
      console.error('[webhook] slug ausente no payload:', JSON.stringify(body))
      return new NextResponse('Slug ausente', { status: 400 })
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('memory_pages')
      .update({
        status: 'active',
        paid_at: new Date().toISOString(),
        abacate_session_id: checkout?.id ?? null,
      })
      .eq('slug', slug)
      .neq('status', 'active') // idempotency — skip if already processed
      .select('name_a, name_b, customer_email, memories, gallery, plan')
      .single()

    if (error) {
      console.error('[webhook] erro ao ativar página:', error)
      return new NextResponse('Erro interno', { status: 500 })
    }

    // Already active — webhook was already processed (retry from gateway)
    if (!data) {
      console.log('[webhook] página já ativa, ignorando duplicata:', slug)
      return new NextResponse('ok', { status: 200 })
    }

    try {
      await migratePhotos(
        supabase,
        slug,
        (data.memories ?? []) as MemoryRow[],
        (data.gallery ?? []) as string[],
      )
    } catch (err) {
      console.error('[webhook] erro na migração:', err)
    }

    try {
      await sendDeliveryEmail({
        to: customerEmail ?? data.customer_email,
        slug,
        nameA: data.name_a,
        nameB: data.name_b,
      })
    } catch (emailErr) {
      console.error('[webhook] erro ao enviar email:', emailErr)
    }

    try {
      await sendMetaPurchaseEvent(slug, data.plan, customerEmail ?? data.customer_email)
    } catch (err) {
      console.error('[webhook] Meta Conversions API falhou:', err)
    }

    console.log('[webhook] página ativada com sucesso:', slug)
    return new NextResponse('ok', { status: 200 })
  } catch (err) {
    console.error('[POST /api/abacate/webhook]', err)
    return new NextResponse('ok', { status: 200 })
  }
}

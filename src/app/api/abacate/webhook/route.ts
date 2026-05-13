import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendDeliveryEmail } from '@/lib/email'

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
      .select('name_a, name_b, customer_email')
      .single()

    if (error) {
      console.error('[webhook] erro ao ativar página:', error)
      return new NextResponse('Erro interno', { status: 500 })
    }

    await sendDeliveryEmail({
      to: customerEmail ?? data.customer_email,
      slug,
      nameA: data.name_a,
      nameB: data.name_b,
    })

    console.log('[webhook] página ativada com sucesso:', slug)
    return new NextResponse('ok', { status: 200 })
  } catch (err) {
    console.error('[POST /api/abacate/webhook]', err)
    return new NextResponse('ok', { status: 200 })
  }
}

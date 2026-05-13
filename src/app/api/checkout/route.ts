import { NextRequest, NextResponse } from 'next/server'
import { ABACATEPAY_PRODUCTS } from '@/lib/constants'
import type { ApiResponse, PlanId } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { slug, email, planId }: { slug: string; email: string; planId: PlanId } =
      await req.json()

    const productId = ABACATEPAY_PRODUCTS[planId]
    if (!productId) {
      return NextResponse.json<ApiResponse>(
        { data: null, error: 'Plano inválido.' },
        { status: 400 },
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL

    const response = await fetch('https://api.abacatepay.com/v2/checkouts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ABACATEPAY_API_KEY}`,
      },
      body: JSON.stringify({
        items: [{ id: productId, quantity: 1 }],
        methods: ['PIX', 'CARD'],
        externalId: slug,
        returnUrl: `${baseUrl}/criar?cancelado=true`,
        completionUrl: `${baseUrl}/p/${slug}?payment=success`,
        metadata: { slug, email, planId },
      }),
    })

    const json = await response.json()
    console.log('[abacatepay raw response]', JSON.stringify(json))

    if (!response.ok || !json.data?.url) {
      throw new Error(json.error ?? 'Resposta inválida do gateway')
    }

    return NextResponse.json<ApiResponse>({
      data: { checkoutUrl: json.data.url },
      error: null,
    })
  } catch (err: any) {
    console.error('[POST /api/checkout]', err)
    return NextResponse.json<ApiResponse>(
      { data: null, error: err.message ?? 'Erro ao criar pagamento. Tente novamente.' },
      { status: 500 },
    )
  }
}

import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')?.trim() ?? ''

  if (slug.length < 3) {
    return NextResponse.json({ available: false })
  }

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('memory_pages')
    .select('id, status, reserved_until')
    .eq('slug', slug)
    .maybeSingle()

  if (!data) return NextResponse.json({ available: true })

  if (data.status === 'active') return NextResponse.json({ available: false })

  if (data.status === 'pending_payment') {
    const taken = data.reserved_until ? new Date(data.reserved_until) > new Date() : false
    return NextResponse.json({ available: !taken })
  }

  // expired or cancelled — slug is free
  return NextResponse.json({ available: true })
}

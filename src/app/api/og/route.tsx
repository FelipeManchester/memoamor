import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

type TemplateId = 'petals' | 'hearts' | 'constellations'

const TEMPLATE_COLORS: Record<TemplateId, { bg: string; accent: string; muted: string; circle: string }> = {
  petals: {
    bg: '#FAF7F2',
    accent: '#8B3A52',
    muted: '#B8948A',
    circle: 'rgba(196,160,176,0.12)',
  },
  hearts: {
    bg: '#FFF5F7',
    accent: '#C4314B',
    muted: '#D4788A',
    circle: 'rgba(196,49,75,0.08)',
  },
  constellations: {
    bg: '#0E0E1A',
    accent: '#C8A96E',
    muted: '#8A8FAA',
    circle: 'rgba(200,169,110,0.08)',
  },
}

function formatDatePtBR(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
  ]
  return `${day} de ${months[month - 1]} de ${year}`
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  if (slug) {
    return dynamicOG(slug)
  }

  return staticOG()
}

async function dynamicOG(slug: string) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )

  const { data } = await supabase
    .from('memory_pages')
    .select('name_a, name_b, start_date, template')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!data) {
    return new Response('Not found', { status: 404 })
  }

  const templateId = (data.template as TemplateId) ?? 'petals'
  const colors = TEMPLATE_COLORS[templateId] ?? TEMPLATE_COLORS.petals
  const formattedDate = formatDatePtBR(data.start_date)
  const isConstellations = templateId === 'constellations'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.bg,
          position: 'relative',
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: colors.circle,
            display: 'flex',
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: colors.circle,
            display: 'flex',
          }}
        />

        {/* Stars for constellations */}
        {isConstellations && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              fontSize: 10,
              color: '#C8A96E',
              opacity: 0.4,
              letterSpacing: '60px',
              lineHeight: '60px',
              padding: '20px',
              flexWrap: 'wrap',
              overflow: 'hidden',
            }}
          >
            {'✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧ ✦ ✧'}
          </div>
        )}

        {/* Top divider line */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 120,
            right: 120,
            height: 1,
            background: colors.accent,
            opacity: 0.15,
            display: 'flex',
          }}
        />

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            zIndex: 1,
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: '6px',
              textTransform: 'uppercase',
              color: colors.muted,
              marginBottom: 24,
              fontFamily: 'sans-serif',
            }}
          >
            uma história de amor
          </div>

          <div
            style={{
              fontSize: 88,
              fontStyle: 'italic',
              fontWeight: 300,
              color: colors.accent,
              lineHeight: 1,
              marginBottom: 24,
              fontFamily: 'serif',
            }}
          >
            {data.name_a} & {data.name_b}
          </div>

          <div
            style={{
              width: 64,
              height: 1,
              background: colors.accent,
              opacity: 0.3,
              marginBottom: 24,
              display: 'flex',
            }}
          />

          <div
            style={{
              fontSize: 22,
              color: colors.muted,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              fontWeight: 300,
            }}
          >
            {formattedDate}
          </div>
        </div>

        {/* Bottom divider line */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 120,
            right: 120,
            height: 1,
            background: colors.accent,
            opacity: 0.15,
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 60,
            fontSize: 22,
            fontStyle: 'italic',
            color: colors.accent,
            opacity: 0.6,
            fontFamily: 'serif',
          }}
        >
          Memoamor
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 60,
            fontSize: 14,
            color: colors.muted,
            fontFamily: 'sans-serif',
            letterSpacing: '1px',
            opacity: 0.7,
          }}
        >
          memoamor.app/{slug}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}

function staticOG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#FAF7F2',
          position: 'relative',
        }}
      >
        {/* Background accents */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'rgba(196,160,176,0.15)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: 300,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(139,58,82,0.07)',
            display: 'flex',
          }}
        />

        {/* Left: headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 60px 100px 80px',
            flex: 1,
            maxWidth: 640,
            zIndex: 1,
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 13,
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: '#C4A0B0',
              marginBottom: 32,
              fontFamily: 'sans-serif',
            }}
          >
            memoamor
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 54,
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#8B3A52',
              lineHeight: 1.2,
              marginBottom: 28,
              fontFamily: 'serif',
            }}
          >
            A história de vocês, em uma página
          </div>

          {/* Sub */}
          <div
            style={{
              fontSize: 20,
              color: '#B8948A',
              fontFamily: 'sans-serif',
              fontWeight: 300,
              lineHeight: 1.5,
              marginBottom: 48,
            }}
          >
            Crie em 5 minutos. Compartilhe com um link.
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: '#8B3A52',
              color: '#FAF7F2',
              fontSize: 13,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              padding: '14px 28px',
              borderRadius: 2,
              fontFamily: 'sans-serif',
            }}
          >
            Criar agora →
          </div>
        </div>

        {/* Right: example card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '0 0 auto',
            width: 440,
            padding: '60px 80px 60px 20px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.75)',
              borderRadius: 16,
              padding: '44px 40px',
              gap: 0,
              border: '1px solid rgba(196,160,176,0.25)',
            }}
          >
            {/* Tag */}
            <div
              style={{
                fontSize: 10,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#C4A0B0',
                marginBottom: 24,
                fontFamily: 'sans-serif',
              }}
            >
              uma história de amor
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: 32,
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#8B3A52',
                fontFamily: 'serif',
                marginBottom: 20,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              A história de vocês, em uma página
            </div>

            {/* Divider */}
            <div
              style={{
                width: 40,
                height: 1,
                background: 'rgba(196,160,176,0.4)',
                marginBottom: 20,
                display: 'flex',
              }}
            />

            {/* Tagline */}
            <div
              style={{
                fontSize: 12,
                color: '#B8948A',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                lineHeight: 1.6,
                maxWidth: 240,
              }}
            >
              Fotos, músicas e memórias guardadas para sempre.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 80,
            fontSize: 22,
            fontStyle: 'italic',
            color: '#8B3A52',
            fontFamily: 'serif',
            opacity: 0.7,
          }}
        >
          Memoamor
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            right: 80,
            fontSize: 14,
            color: '#C4A0B0',
            fontFamily: 'sans-serif',
            letterSpacing: '1px',
          }}
        >
          memoamor.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    },
  )
}

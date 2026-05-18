import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

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
  const nameA = searchParams.get('a')
  const nameB = searchParams.get('b')
  const date = searchParams.get('date')
  const template = (searchParams.get('template') as TemplateId) ?? 'petals'
  const slug = searchParams.get('slug')

  if (nameA && nameB) {
    return dynamicOG({ nameA, nameB, date, template, slug })
  }

  return staticOG()
}

function dynamicOG({
  nameA,
  nameB,
  date,
  slug,
}: {
  nameA: string
  nameB: string
  date: string | null
  template: TemplateId
  slug: string | null
}) {
  const formattedDate = date ? formatDatePtBR(date) : null

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

        {/* Left: names */}
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

          <div
            style={{
              fontSize: 64,
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#8B3A52',
              lineHeight: 1.1,
              marginBottom: 20,
              fontFamily: 'serif',
            }}
          >
            {nameA} & {nameB}
          </div>

          <div
            style={{
              fontSize: 20,
              color: '#B8948A',
              fontFamily: 'sans-serif',
              fontWeight: 300,
              lineHeight: 1.5,
            }}
          >
            {formattedDate ? `juntos desde ${formattedDate}` : 'uma história de amor'}
          </div>
        </div>

        {/* Right: card */}
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
              uma historia de amor
            </div>

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
              {nameA} & {nameB}
            </div>

            <div
              style={{
                width: 40,
                height: 1,
                background: 'rgba(196,160,176,0.4)',
                marginBottom: 20,
                display: 'flex',
              }}
            />

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
              {formattedDate ? formattedDate : 'Fotos, musicas e memorias guardadas para sempre.'}
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
          {slug ? `memoamor.app/p/${slug}` : 'memoamor.app'}
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

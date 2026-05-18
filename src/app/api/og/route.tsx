import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
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
            Criar agora
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
              A historia de voces, em uma pagina
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
              Fotos, musicas e memorias guardadas para sempre.
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

import Image from 'next/image'

interface GalleryProps {
  photos: string[]
  supabaseUrl: string
}

function getImageUrl(path: string, supabaseUrl: string): string {
  return `${supabaseUrl}/storage/v1/object/public/pages/${path}`
}

export default function Gallery({ photos, supabaseUrl }: GalleryProps) {
  if (photos.length === 0) return null

  return (
    <section
      style={{
        background: 'var(--color-light)',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 8vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <p
          className="reveal"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Um álbum
        </p>

        <h2
          className="reveal"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-wine)',
            textAlign: 'center',
            marginBottom: 56,
          }}
        >
          Momentos nossos
        </h2>

        {/* Grid assimétrico */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {photos.map((path, i) => (
            <div
              key={i}
              className="reveal scale-in"
              style={{
                overflow: 'hidden',
                borderRadius: 2,
                gridRow: i === 0 ? 'span 2' : undefined,
                gridColumn: i === 3 ? 'span 2' : undefined,
                minHeight: 220,
              }}
            >
              <Image
                src={getImageUrl(path, supabaseUrl)}
                alt={`Foto ${i + 1}`}
                width={800}
                height={800}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s ease',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

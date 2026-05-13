import Image from 'next/image'
import type { Memory } from '@/types'

interface MemoryBlockProps {
  memory: Memory
  flip?: boolean
  supabaseUrl: string
}

function getImageUrl(path: string, supabaseUrl: string): string {
  return `${supabaseUrl}/storage/v1/object/public/pages/${path}`
}

export default function MemoryBlock({ memory, flip = false, supabaseUrl }: MemoryBlockProps) {
  return (
    <div
      className="reveal"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 80px)',
        alignItems: 'center',
        marginBottom: 'clamp(80px, 12vw, 140px)',
        direction: flip ? 'rtl' : 'ltr',
      }}
    >
      {/* Foto */}
      <div
        className={flip ? 'reveal from-right' : 'reveal from-left'}
        style={{ position: 'relative', direction: 'ltr' }}
      >
        {/* Borda decorativa rotacionada */}
        <div
          style={{
            position: 'absolute',
            inset: -12,
            border: '1px solid var(--color-rose)',
            borderRadius: 2,
            transform: 'rotate(-1.5deg)',
            transition: 'transform 0.6s ease',
            pointerEvents: 'none',
          }}
        />

        {memory.imagePath ? (
          <div className="memory-img" style={{ overflow: 'hidden', borderRadius: 2 }}>
            <Image
              src={getImageUrl(memory.imagePath, supabaseUrl)}
              alt={memory.title}
              width={600}
              height={750}
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '4/5',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        ) : (
          /* Placeholder quando não há foto */
          <div
            style={{
              width: '100%',
              aspectRatio: '4/5',
              background: 'linear-gradient(135deg, var(--color-blush), var(--color-rose))',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-mauve)"
              strokeWidth="1.5"
              opacity="0.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Texto */}
      <div
        className={flip ? 'reveal from-left' : 'reveal from-right'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          direction: 'ltr',
        }}
      >
        {memory.dateLabel && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
            }}
          >
            {memory.dateLabel}
          </p>
        )}

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-wine)',
            lineHeight: 1.15,
          }}
        >
          {memory.title}
        </h2>

        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.9,
            color: 'var(--color-text-muted)',
            maxWidth: '42ch',
          }}
        >
          {memory.body}
        </p>
      </div>
    </div>
  )
}

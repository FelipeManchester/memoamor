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
      className="reveal grid grid-cols-2 items-center"
      style={{
        gap: 'clamp(32px, 5vw, 80px)',
        marginBottom: 'clamp(80px, 12vw, 140px)',
        direction: flip ? 'rtl' : 'ltr',
      }}
    >
      {/* Foto */}
      <div
        className={`${flip ? 'reveal from-right' : 'reveal from-left'} relative`}
        style={{ direction: 'ltr' }}
      >
        {/* Borda decorativa rotacionada */}
        <div
          className="absolute -inset-3 border border-rose rounded-sm pointer-events-none transition-transform duration-[600ms]"
          style={{ transform: 'rotate(-1.5deg)' }}
        />

        {memory.imagePath ? (
          <div className="memory-img overflow-hidden rounded-sm">
            <Image
              src={getImageUrl(memory.imagePath, supabaseUrl)}
              alt={memory.title}
              width={600}
              height={750}
              className="w-full h-auto aspect-[4/5] object-cover block"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-[4/5] rounded-sm flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-blush), var(--color-rose))',
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
        className={`${flip ? 'reveal from-left' : 'reveal from-right'} flex flex-col gap-5`}
        style={{ direction: 'ltr' }}
      >
        {memory.dateLabel && (
          <p className="font-sans text-[0.65rem] tracking-[0.35em] uppercase text-mauve">
            {memory.dateLabel}
          </p>
        )}

        <h2
          className="font-serif font-light italic text-wine leading-[1.15]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
        >
          {memory.title}
        </h2>

        <p
          className="text-[0.95rem] leading-[1.9] text-text-muted"
          style={{ maxWidth: '42ch' }}
        >
          {memory.body}
        </p>
      </div>
    </div>
  )
}

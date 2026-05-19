import Image from 'next/image'
import type { Memory } from '@/types'

interface MemoryBlockProps {
  memory: Memory
  flip?: boolean
  index: number
  total: number
  supabaseUrl: string
}

// Must match the marginBottom below so the timeline line bridges the gap
const TIMELINE_GAP = 'clamp(48px, 12vw, 140px)'

function getImageUrl(path: string, supabaseUrl: string): string {
  if (path.startsWith('/')) return path
  return `${supabaseUrl}/storage/v1/object/public/pages/${path}`
}

export default function MemoryBlock({ memory, flip = false, index, total, supabaseUrl }: MemoryBlockProps) {
  const isFirst = index === 0
  const isLast = index === total - 1

  // The connecting line for this block: first block starts at its node,
  // last block ends at its node, middle blocks span the full gap.
  let lineStyle: React.CSSProperties
  if (isFirst) {
    lineStyle = { top: '50%', height: `calc(50% + ${TIMELINE_GAP})` }
  } else if (isLast) {
    lineStyle = { top: 0, height: '50%' }
  } else {
    lineStyle = { top: 0, height: `calc(100% + ${TIMELINE_GAP})` }
  }

  return (
    <div
      className={`reveal relative grid grid-cols-1 md:grid-cols-2 items-center ${flip ? 'md:[direction:rtl]' : ''}`}
      style={{
        gap: 'clamp(24px, 5vw, 80px)',
        marginBottom: TIMELINE_GAP,
      }}
    >
      {/* Timeline — desktop only, runs through the column gap.
          absolute so it does NOT consume a grid cell */}
      {total > 1 && (
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ direction: 'ltr' }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{ ...lineStyle, width: 1, background: 'var(--color-rose)', zIndex: 0 }}
          />
          <div
            className="absolute left-1/2 top-1/2 rounded-full flex items-center justify-center"
            style={{
              width: 20,
              height: 20,
              transform: 'translate(-50%, -50%)',
              border: '1.5px solid var(--color-rose)',
              zIndex: 2,
            }}
          >
            <span
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-wine)' }}
            />
          </div>
        </div>
      )}

      {/* Foto */}
      <div
        className={`${flip ? 'reveal from-right' : 'reveal from-left'} relative z-[1]`}
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
              quality={90}
              className="w-full h-auto aspect-4/5 object-cover block"
            />
          </div>
        ) : (
          <div
            className="w-full aspect-4/5 rounded-sm flex items-center justify-center"
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
        className={`${flip ? 'reveal from-left' : 'reveal from-right'} relative z-[1] flex flex-col gap-5`}
        style={{ direction: 'ltr' }}
      >
        {memory.dateLabel && (
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
            {memory.dateLabel}
          </p>
        )}

        <h2
          className="font-serif font-light italic text-wine leading-[1.15]"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
        >
          {memory.title}
        </h2>

        <p className="text-[0.95rem] leading-[1.9] text-text-muted" style={{ maxWidth: '42ch' }}>
          {memory.body}
        </p>
      </div>
    </div>
  )
}

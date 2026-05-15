import Image from 'next/image'

interface GalleryProps {
  photos: string[]
  supabaseUrl: string
}

function getImageUrl(path: string, supabaseUrl: string): string {
  return `${supabaseUrl}/storage/v1/object/public/pages/${path}`
}

type SlotConfig = {
  column: 'left' | 'right' | 'full'
  aspect: string
  marginTop: string
  rotation: string
  depth: 'near' | 'far'
  indent: string
}

const SLOT_PATTERN: SlotConfig[] = [
  { column: 'left',  aspect: '3 / 4',  marginTop: '0',     rotation: '-1.2deg', depth: 'near', indent: '0' },
  { column: 'right', aspect: '4 / 3',  marginTop: '40px',  rotation: '1.2deg',  depth: 'far',  indent: '0' },
  { column: 'right', aspect: '1 / 1',  marginTop: '0',     rotation: '-0.6deg', depth: 'far',  indent: '12%' },
  { column: 'left',  aspect: '1 / 1',  marginTop: '60px',  rotation: '0.8deg',  depth: 'near', indent: '6%' },
  { column: 'left',  aspect: '3 / 4',  marginTop: '0',     rotation: '-0.9deg', depth: 'near', indent: '0' },
  { column: 'full',  aspect: '16 / 9', marginTop: '32px',  rotation: '0deg',    depth: 'far',  indent: '0' },
]

function slotForIndex(i: number): SlotConfig {
  return SLOT_PATTERN[i % SLOT_PATTERN.length]
}

export default function Gallery({ photos, supabaseUrl }: GalleryProps) {
  if (photos.length === 0) return null

  const total = photos.length.toString().padStart(2, '0')
  const headingWords = 'Momentos nossos'.split(' ')

  return (
    <section
      className="gallery-section relative bg-light overflow-hidden"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 8vw, 100px)',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(196, 154, 138, 0.08) 0%, transparent 70%)',
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Progress hairline */}
      <div
        aria-hidden
        className="gallery-progress absolute left-[clamp(8px,2vw,24px)] top-[clamp(60px,10vw,120px)] bottom-[clamp(60px,10vw,120px)] w-px origin-top"
        style={{ backgroundColor: 'var(--color-mauve)', opacity: 0.5, transform: 'scaleY(0)' }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Cabeçalho */}
        <div className="gallery-heading relative text-center mb-12 md:mb-20">
          <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-mauve mb-4">
            <span className="gallery-heading__word inline-block">Um</span>{' '}
            <span className="gallery-heading__word inline-block">álbum</span>
          </p>

          <h2
            className="font-serif font-light italic text-wine"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}
          >
            {headingWords.map((word, i) => (
              <span key={i} className="gallery-heading__word inline-block">
                {word}
                {i < headingWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>

          <div
            className="gallery-heading__rule mx-auto mt-8 h-px origin-left"
            style={{
              width: 'clamp(60px, 8vw, 120px)',
              backgroundColor: 'var(--color-mauve)',
              opacity: 0.4,
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Layout editorial — desktop: grid 2 colunas / mobile: coluna única */}
        <div
          className="grid gap-4 md:gap-6"
          style={{
            gridTemplateColumns: '1fr',
          }}
        >
          <div className="hidden md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-12">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-12 lg:gap-16">
              {photos.map((path, i) => {
                const slot = slotForIndex(i)
                if (slot.column !== 'left') return null
                return (
                  <PhotoFigure
                    key={`l-${i}`}
                    path={path}
                    index={i}
                    total={total}
                    slot={slot}
                    supabaseUrl={supabaseUrl}
                  />
                )
              })}
            </div>
            {/* Coluna direita */}
            <div className="flex flex-col gap-12 lg:gap-16 md:mt-16">
              {photos.map((path, i) => {
                const slot = slotForIndex(i)
                if (slot.column !== 'right') return null
                return (
                  <PhotoFigure
                    key={`r-${i}`}
                    path={path}
                    index={i}
                    total={total}
                    slot={slot}
                    supabaseUrl={supabaseUrl}
                  />
                )
              })}
            </div>
            {/* Full-width — fora das colunas */}
            <div className="md:col-span-2 flex flex-col gap-12 lg:gap-16">
              {photos.map((path, i) => {
                const slot = slotForIndex(i)
                if (slot.column !== 'full') return null
                return (
                  <PhotoFigure
                    key={`f-${i}`}
                    path={path}
                    index={i}
                    total={total}
                    slot={slot}
                    supabaseUrl={supabaseUrl}
                    fullWidth
                  />
                )
              })}
            </div>
          </div>

          {/* Mobile — coluna única */}
          <div className="flex flex-col gap-6 md:hidden">
            {photos.map((path, i) => {
              const slot = slotForIndex(i)
              return (
                <PhotoFigure
                  key={`m-${i}`}
                  path={path}
                  index={i}
                  total={total}
                  slot={{ ...slot, marginTop: '0', indent: '0' }}
                  supabaseUrl={supabaseUrl}
                  mobile
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface PhotoFigureProps {
  path: string
  index: number
  total: string
  slot: SlotConfig
  supabaseUrl: string
  fullWidth?: boolean
  mobile?: boolean
}

function PhotoFigure({ path, index, total, slot, supabaseUrl, fullWidth, mobile }: PhotoFigureProps) {
  const depthClass = slot.depth === 'near' ? 'gallery-photo--depth-near' : 'gallery-photo--depth-far'
  const indexLabel = (index + 1).toString().padStart(2, '0')

  return (
    <figure
      className={`gallery-photo relative ${depthClass}`}
      style={{
        marginTop: mobile ? '0' : slot.marginTop,
        transform: `rotate(${slot.rotation})`,
        marginLeft: !mobile && slot.column === 'right' ? slot.indent : '0',
        marginRight: !mobile && slot.column === 'left' ? slot.indent : '0',
      }}
    >
      <div
        className="gallery-photo__mask relative overflow-hidden rounded-[2px]"
        style={{
          aspectRatio: fullWidth ? '16 / 9' : slot.aspect,
          boxShadow:
            '0 1px 0 rgba(122, 63, 63, 0.06), 0 20px 40px -24px rgba(122, 63, 63, 0.25)',
        }}
      >
        <Image
          src={getImageUrl(path, supabaseUrl)}
          alt={`Foto ${index + 1}`}
          fill
          sizes={fullWidth ? '(max-width: 768px) 100vw, 1100px' : '(max-width: 768px) 100vw, 50vw'}
          className="gallery-photo__img object-cover"
        />
        {/* Sutil tint ao passar o mouse */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-0 transition-opacity duration-700 hover:opacity-100"
          style={{ backgroundColor: 'rgba(122, 63, 63, 0.08)' }}
        />
      </div>

      {/* Counter tag */}
      <figcaption
        className="gallery-photo__counter absolute top-3 right-3 font-sans text-[0.6rem] tracking-[0.3em] uppercase px-2 py-1 rounded-[1px] backdrop-blur-sm"
        style={{
          color: 'var(--color-cream)',
          backgroundColor: 'rgba(61, 43, 43, 0.55)',
          letterSpacing: '0.25em',
        }}
      >
        {indexLabel} / {total}
      </figcaption>
    </figure>
  )
}

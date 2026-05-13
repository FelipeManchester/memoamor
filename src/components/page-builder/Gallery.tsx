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
      className="bg-light"
      style={{ padding: 'clamp(60px, 10vw, 120px) clamp(20px, 8vw, 100px)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Cabeçalho */}
        <p className="reveal font-sans text-[0.65rem] tracking-[0.4em] uppercase text-mauve text-center mb-4">
          Um álbum
        </p>

        <h2
          className="reveal font-serif font-light italic text-wine text-center mb-14"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          Momentos nossos
        </h2>

        {/* Grid assimétrico */}
        <div className="grid grid-cols-3 gap-4">
          {photos.map((path, i) => (
            <div
              key={i}
              className={`reveal scale-in overflow-hidden rounded-sm min-h-[220px] ${i === 0 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''}`}
            >
              <Image
                src={getImageUrl(path, supabaseUrl)}
                alt={`Foto ${i + 1}`}
                width={800}
                height={800}
                className="w-full h-full object-cover block transition-transform duration-[800ms]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

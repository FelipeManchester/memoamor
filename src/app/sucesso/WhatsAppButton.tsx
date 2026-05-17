'use client'

export default function WhatsAppButton({ url }: { url: string }) {
  function handleShare() {
    const text = `Criei uma página especial com as nossas memórias ♡\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleShare}
      className="font-sans text-[0.72rem] tracking-[0.15em] uppercase px-6 py-3 border border-rose rounded-sm bg-transparent text-mauve cursor-pointer whitespace-nowrap flex items-center gap-2 transition-colors duration-200 hover:border-wine hover:text-wine"
    >
      ♡ Enviar essa memória
    </button>
  )
}

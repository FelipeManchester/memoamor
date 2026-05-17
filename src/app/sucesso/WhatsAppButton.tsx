'use client'

function IconWhatsApp() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.122 1.523 5.855L.057 23.716a.75.75 0 0 0 .923.923l5.861-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.37l-.358-.213-3.716.929.944-3.716-.22-.37A9.818 9.818 0 0 1 12 2.182c5.426 0 9.818 4.392 9.818 9.818S17.426 21.818 12 21.818z" />
    </svg>
  )
}

export default function WhatsAppButton({ url }: { url: string }) {
  function handleShare() {
    const text = `Criei uma página especial com as nossas memórias ♡\n${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleShare}
      className="font-sans text-[0.72rem] tracking-[0.15em] uppercase px-6 py-3 rounded-sm border-none bg-[#25D366] text-white cursor-pointer whitespace-nowrap flex items-center gap-[7px]"
    >
      <IconWhatsApp />
      Compartilhar no WhatsApp
    </button>
  )
}

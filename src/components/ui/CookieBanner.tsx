'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'memoamor-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage indisponível — não exibe o aviso
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignora falha de escrita
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed z-[2000] left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-[360px] [animation:fadeUp_0.5s_ease]"
    >
      <div
        className="bg-white border border-rose rounded-lg p-5 flex flex-col gap-3 [box-shadow:var(--shadow-lg)]"
      >
        <p className="font-serif italic text-wine text-[1.05rem]">Sobre os cookies</p>
        <p className="font-sans text-[0.8rem] leading-[1.7] text-text-muted">
          Usamos cookies para melhorar sua experiência e entender como o site é usado. Ao
          continuar navegando, você concorda com a nossa{' '}
          <a href="/privacidade" className="text-wine underline">
            Política de Privacidade
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="self-end font-sans text-[0.7rem] tracking-[0.2em] uppercase py-2.5 px-8 bg-wine text-cream rounded-sm cursor-pointer transition-opacity duration-200 hover:opacity-[0.88]"
        >
          OK
        </button>
      </div>
    </div>
  )
}

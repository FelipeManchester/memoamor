'use client'

import { useState } from 'react'

interface OverlayProps {
  nameA: string
  nameB: string
  onOpen: () => void
}

export default function Overlay({ nameA, nameB, onOpen }: OverlayProps) {
  const [closing, setClosing] = useState(false)

  function handleOpen() {
    setClosing(true)
    setTimeout(() => onOpen(), 800)
  }

  return (
    <div
      className={`fixed inset-0 z-[1400] bg-cream flex flex-col items-center justify-center text-center p-6 transition-opacity duration-[800ms] ${closing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Pétalas decorativas nos cantos */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-0 left-0 w-[200px] opacity-[0.12] pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>

      <svg
        viewBox="0 0 200 200"
        className="absolute bottom-0 right-0 w-[200px] opacity-[0.12] pointer-events-none rotate-180"
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>

      {/* Conteúdo */}
      <p
        className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-mauve mb-6 opacity-0"
        style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.2s' }}
      >
        Uma surpresa para você
      </p>

      <h1
        className="font-serif font-light italic text-wine leading-[1.1] mb-4 opacity-0"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 6rem)',
          animation: 'fadeUp 0.9s ease forwards',
          animationDelay: '0.4s',
        }}
      >
        {nameA}
        <br />
        <span className="text-[0.5em] text-mauve">&</span>
        <br />
        {nameB}
      </h1>

      <div
        className="w-12 h-px my-6 mx-auto opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
          animation: 'fadeIn 1s ease forwards',
          animationDelay: '0.7s',
        }}
      />

      {/* Botão */}
      <button
        onClick={handleOpen}
        className="font-sans text-[0.72rem] tracking-[0.3em] uppercase text-cream bg-wine border-none py-4 px-10 rounded-sm cursor-pointer transition-all duration-200 opacity-0 hover:opacity-[0.85] hover:-translate-y-0.5"
        style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.9s' }}
      >
        Abrir memórias ♡
      </button>
    </div>
  )
}

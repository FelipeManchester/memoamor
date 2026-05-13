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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        background: 'var(--color-cream)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 24,
        transition: 'opacity 0.8s ease',
        opacity: closing ? 0 : 1,
        pointerEvents: closing ? 'none' : 'auto',
      }}
    >
      {/* Pétalas decorativas nos cantos */}
      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 200,
          opacity: 0.12,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>

      <svg
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 200,
          opacity: 0.12,
          pointerEvents: 'none',
          transform: 'rotate(180deg)',
        }}
        aria-hidden="true"
      >
        <path
          d="M20,20 C60,10 140,10 180,20 C170,60 170,140 180,180 C140,170 60,170 20,180 C30,140 30,60 20,20Z"
          fill="var(--color-mauve)"
        />
      </svg>

      {/* Conteúdo */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--color-mauve)',
          marginBottom: 24,
          animation: 'fadeUp 0.9s ease forwards',
          opacity: 0,
          animationDelay: '0.2s',
        }}
      >
        Uma surpresa para você
      </p>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.8rem, 8vw, 6rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--color-wine)',
          lineHeight: 1.1,
          marginBottom: 16,
          animation: 'fadeUp 0.9s ease forwards',
          opacity: 0,
          animationDelay: '0.4s',
        }}
      >
        {nameA}
        <br />
        <span style={{ fontSize: '0.5em', color: 'var(--color-mauve)' }}>&</span>
        <br />
        {nameB}
      </h1>

      <div
        style={{
          width: 48,
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--color-mauve), transparent)',
          margin: '24px auto 40px',
          animation: 'fadeIn 1s ease forwards',
          opacity: 0,
          animationDelay: '0.7s',
        }}
      />

      {/* Botão */}
      <button
        onClick={handleOpen}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--color-cream)',
          background: 'var(--color-wine)',
          border: 'none',
          padding: '16px 40px',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'opacity 0.2s, transform 0.2s',
          animation: 'fadeUp 0.9s ease forwards',
          opacity: 0,
          animationDelay: '0.9s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.85'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Abrir memórias ♡
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

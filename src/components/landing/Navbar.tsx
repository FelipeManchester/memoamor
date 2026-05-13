'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrollY > 40 ? 'rgba(250, 246, 241, 0.92)' : 'transparent',
        backdropFilter: scrollY > 40 ? 'blur(16px)' : 'none',
        borderBottom: scrollY > 40 ? '1px solid var(--color-blush)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-wine)',
        }}
      >
        Memoamor
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <a
          href="/demo"
          target="_blank"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
            textDecoration: 'none',
          }}
        >
          Ver exemplo
        </a>
        <Link
          href="/criar"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            background: 'var(--color-wine)',
            color: 'var(--color-cream)',
            textDecoration: 'none',
            borderRadius: 2,
            transition: 'opacity 0.2s',
          }}
        >
          Criar página
        </Link>
      </div>
    </nav>
  )
}

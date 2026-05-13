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
      className="fixed top-0 left-0 right-0 z-[100] px-10 py-5 flex items-center justify-between transition-all duration-[400ms]"
      style={{
        background: scrollY > 40 ? 'rgba(250, 246, 241, 0.92)' : 'transparent',
        backdropFilter: scrollY > 40 ? 'blur(16px)' : 'none',
        borderBottom: scrollY > 40 ? '1px solid var(--color-blush)' : 'none',
      }}
    >
      <span className="font-serif text-[1.4rem] italic font-light text-wine">
        Memoamor
      </span>

      <div className="flex items-center gap-8">
        <a
          href="/demo"
          target="_blank"
          className="font-sans text-[0.72rem] tracking-[0.15em] uppercase text-mauve no-underline"
        >
          Ver exemplo
        </a>
        <Link
          href="/criar"
          className="font-sans text-[0.72rem] tracking-[0.15em] uppercase py-[10px] px-6 bg-wine text-cream no-underline rounded-sm transition-opacity duration-200 hover:opacity-[0.88]"
        >
          Criar página
        </Link>
      </div>
    </nav>
  )
}

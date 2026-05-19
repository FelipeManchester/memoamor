'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Templates', href: '#templates' },
  { label: 'Preços', href: '#precos' },
]

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrolled = scrollY > 40

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-[400ms]"
        style={{
          background: scrolled || menuOpen ? 'var(--navbar-scrolled-bg)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          borderBottom: scrolled || menuOpen ? '1px solid var(--color-blush)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-[1.4rem] italic font-light text-wine no-underline"
          >
            Memoamor
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="font-sans text-[0.72rem] font-medium tracking-[0.15em] uppercase text-text-muted no-underline transition-colors duration-200 hover:text-wine"
              >
                {label}
              </a>
            ))}

            <div className="w-px h-4 bg-blush" />

            <a
              href="/demo"
              className="font-sans text-[0.72rem] font-medium tracking-[0.15em] uppercase text-text-muted no-underline transition-colors duration-200 hover:text-wine"
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

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link
              href="/criar"
              className="font-sans text-[0.68rem] tracking-[0.15em] uppercase py-[8px] px-4 bg-wine text-cream no-underline rounded-sm"
            >
              Criar página
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              className="flex flex-col gap-[5px] p-1"
            >
              <span
                className="block w-5 h-px bg-wine transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-px bg-wine transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-wine transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: menuOpen ? '300px' : '0px' }}
        >
          <div className="px-5 pb-6 flex flex-col gap-5 border-t border-blush pt-5">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleAnchorClick(e, href)}
                className="font-sans text-[0.78rem] font-medium tracking-[0.15em] uppercase text-text-muted no-underline"
              >
                {label}
              </a>
            ))}
            <a
              href="/demo"
              onClick={() => setMenuOpen(false)}
              className="font-sans text-[0.78rem] font-medium tracking-[0.15em] uppercase text-text-muted no-underline"
            >
              Ver exemplo
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

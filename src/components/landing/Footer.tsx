'use client'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Termos de uso', href: '/termos' },
    { label: 'Privacidade', href: '/privacidade' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <footer
      className="bg-cream border-t border-blush"
      style={{ padding: '40px clamp(24px, 8vw, 100px)' }}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-6">
        {/* Logo + tagline */}
        <div>
          <p className="font-serif text-[1.2rem] italic font-light text-wine mb-1">
            Memoamor
          </p>
          <p className="font-sans text-[0.72rem] text-mauve">
            A história de vocês, em uma página.
          </p>
        </div>

        {/* Links */}
        <nav className="flex gap-8 flex-wrap">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[0.75rem] tracking-[0.1em] text-mauve no-underline transition-colors duration-200 hover:text-wine"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-sans text-[0.68rem] text-mauve opacity-70">
          © {currentYear} Memoamor. Feito com amor.
        </p>
      </div>
    </footer>
  )
}

'use client'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Termos de uso', href: '/termos' },
    { label: 'Privacidade', href: '/privacidade' },
    { label: 'Contato', href: '/contato' },
  ]

  return (
    <footer className="bg-cream border-t border-blush py-10">
      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
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

        {/* Social + Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/memoamor.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-mauve hover:text-wine transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@memoamor.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-mauve hover:text-wine transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
          </div>
          <p className="font-sans text-[0.68rem] text-mauve opacity-70">
            © {currentYear} Memoamor. Feito com amor.
          </p>
        </div>
      </div>
    </footer>
  )
}

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
      style={{
        background: 'var(--color-cream)',
        borderTop: '1px solid var(--color-blush)',
        padding: '40px clamp(24px, 8vw, 100px)',
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        {/* Logo + tagline */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-wine)',
              marginBottom: 4,
            }}
          >
            Memoamor
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-mauve)',
            }}
          >
            A história de vocês, em uma página.
          </p>
        </div>

        {/* Links */}
        <nav
          style={{
            display: 'flex',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'var(--color-mauve)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-wine)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-mauve)'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            color: 'var(--color-mauve)',
            opacity: 0.7,
          }}
        >
          © {currentYear} Memoamor. Feito com amor.
        </p>
      </div>
    </footer>
  )
}

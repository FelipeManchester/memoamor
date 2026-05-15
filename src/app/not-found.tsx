import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false },
}

const HEARTS = [
  { left: 8,  top: 22, size: 16, opacity: 0.13, delay: 0.0, duration: 4.2 },
  { left: 82, top: 18, size: 11, opacity: 0.09, delay: 1.1, duration: 5.0 },
  { left: 65, top: 72, size: 19, opacity: 0.11, delay: 0.5, duration: 4.6 },
  { left: 22, top: 68, size: 9,  opacity: 0.07, delay: 1.7, duration: 3.8 },
  { left: 90, top: 55, size: 13, opacity: 0.10, delay: 0.3, duration: 5.4 },
  { left: 48, top: 14, size: 7,  opacity: 0.08, delay: 2.0, duration: 4.0 },
  { left: 35, top: 85, size: 14, opacity: 0.09, delay: 0.9, duration: 4.8 },
  { left: 75, top: 40, size: 8,  opacity: 0.07, delay: 1.4, duration: 3.6 },
]

const HEART_PATH =
  'M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151 1.018 5.719 4.955 1.566-3.937 4.406-4.955 5.719-4.955 2.213 0 5.281 1.4 5.281 5.191 0 4.105-5.374 8.863-11 14.402z'

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main
        className="relative bg-cream flex items-center justify-center overflow-hidden"
        style={{ minHeight: 'calc(100svh - 200px)' }}
      >
        {/* Radial gradient — same as hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 15% 40%, #f0d4ca44 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 85% 20%, #e8c4b822 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Ghost "404" */}
        <span
          className="pointer-events-none select-none absolute font-serif italic text-wine"
          style={{
            fontSize: 'clamp(14rem, 38vw, 30rem)',
            opacity: 0.035,
            lineHeight: 1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden="true"
        >
          404
        </span>

        {/* Floating hearts */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {HEARTS.map((h, i) => (
            <svg
              key={i}
              width={h.size}
              height={h.size}
              viewBox="0 0 24 24"
              fill="var(--color-wine)"
              className="absolute"
              style={{
                left: `${h.left}%`,
                top: `${h.top}%`,
                opacity: h.opacity,
                animation: `floatBadge ${h.duration}s ease-in-out ${h.delay}s infinite`,
              }}
            >
              <path d={HEART_PATH} />
            </svg>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[520px]">
          <p
            className="font-sans text-[0.62rem] font-medium tracking-[0.4em] uppercase text-mauve opacity-0"
            style={{ animation: 'fadeUp 0.8s ease forwards', animationDelay: '0.1s' }}
          >
            erro 404
          </p>

          <h1
            className="font-serif font-light italic text-wine leading-[1.1] mt-5 mb-4 opacity-0"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              animation: 'fadeUp 0.9s ease forwards',
              animationDelay: '0.25s',
            }}
          >
            Essa página se perdeu pelo caminho...
          </h1>

          <div
            className="w-10 h-px my-5 opacity-0"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-rose), transparent)',
              animation: 'fadeIn 1s ease forwards',
              animationDelay: '0.45s',
            }}
            aria-hidden="true"
          />

          <p
            className="font-sans text-[0.88rem] text-text-muted leading-[1.9] opacity-0"
            style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.5s' }}
          >
            Talvez o link tenha expirado, ou essa memória foi para outro lugar.
            Mas a história de vocês ainda pode continuar.
          </p>

          <div
            className="flex gap-4 flex-wrap justify-center mt-10 opacity-0"
            style={{ animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.7s' }}
          >
            <Link
              href="/"
              className="font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 bg-wine text-cream no-underline rounded-sm transition-all duration-200 hover:opacity-[0.88] hover:-translate-y-0.5 inline-block"
            >
              Voltar ao início
            </Link>
            <Link
              href="/criar"
              className="font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border border-wine text-wine no-underline rounded-sm transition-all duration-200 hover:bg-wine hover:text-cream inline-block"
            >
              Criar minha página ♡
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

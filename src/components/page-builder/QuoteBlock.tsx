interface QuoteBlockProps {
  text: string
  author?: string
}

export default function QuoteBlock({ text, author }: QuoteBlockProps) {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream) 100%)',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 10vw, 140px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aspas decorativas */}
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '16rem',
          color: 'var(--color-rose)',
          position: 'absolute',
          top: -60,
          left: 20,
          lineHeight: 1,
          opacity: 0.2,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </span>

      <p
        className="reveal"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--color-wine)',
          maxWidth: 700,
          margin: '0 auto 24px',
          lineHeight: 1.45,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {text}
      </p>

      {author && (
        <p
          className="reveal"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {author}
        </p>
      )}
    </section>
  )
}

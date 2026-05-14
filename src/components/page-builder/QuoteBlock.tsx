interface QuoteBlockProps {
  text: string
  author?: string
}

export default function QuoteBlock({ text, author }: QuoteBlockProps) {
  return (
    <section
      className="text-center relative overflow-hidden"
      style={{
        background: 'var(--quote-bg, linear-gradient(135deg, var(--color-blush) 0%, var(--color-cream) 100%))',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 10vw, 140px)',
      }}
    >
      {/* Aspas decorativas */}
      <span
        aria-hidden="true"
        className="font-serif absolute pointer-events-none select-none leading-none"
        style={{ fontSize: '16rem', top: -60, left: 20, color: 'var(--quote-mark-color, rgba(232, 196, 184, 0.2))' }}
      >
        &ldquo;
      </span>

      <p
        className="reveal font-serif italic font-light text-wine mx-auto mb-6 leading-[1.45] relative z-[1]"
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
          maxWidth: 700,
        }}
      >
        {text}
      </p>

      {author && (
        <p className="reveal font-sans text-[0.68rem] tracking-[0.3em] uppercase text-mauve relative z-[1]">
          {author}
        </p>
      )}
    </section>
  )
}

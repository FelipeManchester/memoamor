'use client'

import { useState } from 'react'

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-blush)',
        paddingBottom: open ? 16 : 0,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--color-text)',
            fontWeight: 400,
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: 'var(--color-mauve)',
            fontSize: '1rem',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(45deg)' : 'none',
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            lineHeight: 1.8,
            color: 'var(--color-text-muted)',
            margin: '0 0 4px',
          }}
        >
          {answer}
        </p>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--color-blush)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
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
        {/* Chevron */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            flexShrink: 0,
            color: 'var(--color-mauve)',
            transition: 'transform 250ms ease-in-out',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Grid-template-rows technique */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 250ms ease-in-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              margin: '0 0 16px',
            }}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  )
}

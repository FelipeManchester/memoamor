'use client'

import { useState } from 'react'

function IconCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setShowTooltip(true)
      setTimeout(() => setCopied(false), 2000)
      setTimeout(() => setShowTooltip(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {showTooltip && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            background: 'var(--color-wine)',
            color: 'var(--color-cream)',
            padding: '5px 11px',
            borderRadius: 4,
            fontSize: '0.72rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            animation: 'tooltipFadeOut 2s ease-out forwards',
            zIndex: 20,
            fontFamily: 'var(--font-sans)',
          }}
        >
          Link copiado ♡
        </span>
      )}
      <button
        onClick={handleCopy}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '12px 24px',
          border: '1px solid var(--color-rose)',
          borderRadius: 2,
          background: 'transparent',
          color: copied ? 'var(--color-wine)' : 'var(--color-mauve)',
          cursor: 'pointer',
          transition: 'color 0.2s, border-color 0.2s',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          borderColor: copied ? 'var(--color-wine)' : 'var(--color-rose)',
        }}
      >
        {copied ? <IconCheck /> : <IconCopy />}
        {copied ? 'Copiado!' : 'Copiar link'}
      </button>
    </span>
  )
}

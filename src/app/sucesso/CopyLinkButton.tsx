'use client'

import { useState } from 'react'

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select text
    }
  }

  return (
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
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ Copiado!' : 'Copiar link'}
    </button>
  )
}

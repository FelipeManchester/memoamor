'use client'

import { useState } from 'react'
import { useCreateFormStore } from '@/store/createForm'

const SUGGESTED_SONGS = [
  {
    url: 'https://www.youtube.com/watch?v=cNGjD0VG4R8',
    title: 'Perfect',
    artist: 'Ed Sheeran',
  },
  {
    url: 'https://www.youtube.com/watch?v=vGJTaP6anOU',
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
  },
  {
    url: 'https://www.youtube.com/watch?v=sm7onw6nVqQ',
    title: 'Dear Bobbie',
    artist: 'Yellowcard',
  },
]

function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

type ValidationStatus = 'idle' | 'loading' | 'valid' | 'error'

export default function StepFour() {
  const { data, updateField, setStep } = useCreateFormStore()
  const [status, setStatus] = useState<ValidationStatus>('idle')

  async function handleUrlChange(url: string) {
    updateField('youtubeUrl', url)
    updateField('youtubeTitle', null)
    setStatus('idle')

    const videoId = extractVideoId(url)
    if (!videoId) return

    // Valida o link via YouTube oEmbed — não requer API key
    setStatus('loading')
    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      )
      if (!res.ok) throw new Error()
      const json = await res.json()
      updateField('youtubeTitle', json.title)
      setStatus('valid')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Cabeçalho */}
      <div>
        <p style={eyebrowStyle}>Passo 4 de 5</p>
        <h1 style={titleStyle}>Qual é a música de vocês?</h1>
        <p style={subtitleStyle}>Cole o link de um vídeo do YouTube. Você pode pular essa etapa.</p>
      </div>

      {/* Campo de URL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>Link do YouTube</label>
        <input
          style={{
            ...inputStyle,
            borderColor:
              status === 'valid' ? '#4a7a4a' : status === 'error' ? '#c0392b' : 'var(--color-rose)',
          }}
          type="url"
          placeholder="https://youtube.com/watch?v=..."
          value={data.youtubeUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
        />

        {/* Feedback de validação */}
        {status === 'loading' && (
          <p style={{ ...feedbackStyle, color: 'var(--color-mauve)' }}>Verificando...</p>
        )}
        {status === 'valid' && data.youtubeTitle && (
          <p style={{ ...feedbackStyle, color: '#4a7a4a' }}>✓ {data.youtubeTitle}</p>
        )}
        {status === 'error' && (
          <p style={{ ...feedbackStyle, color: '#c0392b' }}>
            Vídeo não encontrado. Verifique o link.
          </p>
        )}
      </div>

      {/* Sugestões */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={labelStyle}>Ou escolha uma sugestão:</p>
        {SUGGESTED_SONGS.map((song) => (
          <button
            key={song.url}
            onClick={() => handleUrlChange(song.url)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              border: `1px solid ${data.youtubeUrl === song.url ? 'var(--color-wine)' : 'var(--color-rose)'}`,
              borderRadius: 2,
              background: data.youtubeUrl === song.url ? 'var(--color-blush)' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text)',
                }}
              >
                {song.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: 'var(--color-mauve)',
                }}
              >
                {song.artist}
              </p>
            </div>
            {data.youtubeUrl === song.url && (
              <span style={{ color: 'var(--color-wine)', fontSize: '0.8rem' }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(3)} style={ghostButtonStyle}>
          ← Voltar
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setStep(5)} style={ghostButtonStyle}>
            Pular
          </button>
          <button
            onClick={() => setStep(5)}
            disabled={status === 'loading'}
            style={primaryButtonStyle(status !== 'loading')}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Estilos ───────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--color-mauve)',
  marginBottom: 8,
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 300,
  fontStyle: 'italic',
  color: 'var(--color-wine)',
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'var(--color-mauve)',
  marginTop: 8,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  color: 'var(--color-text)',
}

const feedbackStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  background: 'white',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

const ghostButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  background: 'transparent',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 20px',
  color: 'var(--color-mauve)',
  cursor: 'pointer',
}

const primaryButtonStyle = (enabled: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  padding: '16px 32px',
  background: enabled ? 'var(--color-wine)' : 'var(--color-blush)',
  color: enabled ? 'var(--color-cream)' : 'var(--color-mauve)',
  border: 'none',
  borderRadius: 2,
  cursor: enabled ? 'pointer' : 'not-allowed',
  transition: 'all 0.2s',
})

'use client'

import { useState } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'

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
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 4 de 6
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Qual é a música de vocês?
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          Cola o link do YouTube. Vamos tocar quando alguém abrir a página.
        </p>
      </div>

      {/* Campo de URL */}
      <div className="flex flex-col gap-2">
        <label className="form-label">Link do YouTube</label>
        <input
          className="form-input"
          style={{
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
          <p className="font-sans text-[0.8rem] text-mauve">Verificando...</p>
        )}
        {status === 'valid' && data.youtubeTitle && (
          <p className="font-sans text-[0.8rem]" style={{ color: '#4a7a4a' }}>
            ✓ {data.youtubeTitle}
          </p>
        )}
        {status === 'error' && (
          <p className="font-sans text-[0.8rem]" style={{ color: '#c0392b' }}>
            Vídeo não encontrado. Verifique o link.
          </p>
        )}
        {status === 'idle' && !data.youtubeUrl && (
          <p className="font-sans text-[0.8rem] text-mauve">
            Não tem música ainda? Sem problema — você pode pular esse passo.
          </p>
        )}
      </div>

      {/* Sugestões */}
      <div className="flex flex-col gap-3">
        <p className="form-label">Ou escolha uma sugestão:</p>
        {SUGGESTED_SONGS.map((song) => (
          <button
            key={song.url}
            onClick={() => handleUrlChange(song.url)}
            className="flex items-center justify-between py-3 px-4 rounded-sm transition-all duration-200 cursor-pointer text-left"
            style={{
              border: `1px solid ${data.youtubeUrl === song.url ? 'var(--color-wine)' : 'var(--color-rose)'}`,
              background: data.youtubeUrl === song.url ? 'var(--color-blush)' : 'white',
            }}
          >
            <div>
              <p className="font-sans text-[0.85rem] text-text">{song.title}</p>
              <p className="font-sans text-[0.72rem] text-mauve">{song.artist}</p>
            </div>
            {data.youtubeUrl === song.url && (
              <span className="text-wine text-[0.8rem]">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Navegação */}
      <div className="flex justify-between">
        <button onClick={() => setStep(3)} className="btn-ghost">
          ← Voltar
        </button>
        <div className="flex gap-3">
          <button onClick={() => setStep(5)} className="btn-ghost">
            Pular esta etapa
          </button>
          <button
            onClick={() => setStep(5)}
            disabled={status === 'loading'}
            className={cn(
              'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200',
              status !== 'loading' ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
            )}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  )
}

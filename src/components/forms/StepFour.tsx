'use client'

import { useState, useEffect, useRef } from 'react'
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
    url: 'https://www.youtube.com/watch?v=450p7goxZqg',
    title: 'John Legend',
    artist: 'All of Me',
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

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLDivElement, options: object) => YTPlayer
      PlayerState: { PLAYING: number }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}

function IconPlay() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6zm8-14v14h4V5z" />
    </svg>
  )
}

function IconSpinner() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

type ValidationStatus = 'idle' | 'loading' | 'valid' | 'error'

export default function StepFour() {
  const { data, updateField, setStep } = useCreateFormStore()
  const [status, setStatus] = useState<ValidationStatus>('idle')

  // ── Inline preview player ─────────────────────────
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [apiReady, setApiReady] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.YT?.Player) {
      setApiReady(true)
      return
    }
    window.onYouTubeIframeAPIReady = () => setApiReady(true)
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  }, [])

  useEffect(() => {
    if (!apiReady || !previewVideoId || !containerRef.current) return
    playerRef.current?.destroy()
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: previewVideoId,
      playerVars: { autoplay: 1, controls: 0, rel: 0 },
      events: {
        onStateChange: (e: { data: number }) => {
          setIsPreviewPlaying(e.data === window.YT.PlayerState.PLAYING)
          setIsPreviewLoading(false)
        },
      },
    })
    return () => {
      playerRef.current?.destroy()
    }
  }, [apiReady, previewVideoId])

  function togglePreview(videoId: string, e: React.MouseEvent) {
    e.stopPropagation()
    if (previewVideoId === videoId) {
      isPreviewPlaying ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo()
    } else {
      setIsPreviewPlaying(false)
      setIsPreviewLoading(true)
      setPreviewVideoId(videoId)
    }
  }

  // ── URL validation ────────────────────────────────
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

  const customVideoId = extractVideoId(data.youtubeUrl)

  return (
    <div className="flex flex-col gap-8">
      {/* Hidden YT player container */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <div ref={containerRef} />
      </div>

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

        {status === 'loading' && (
          <p className="font-sans text-[0.8rem] text-mauve">Verificando...</p>
        )}
        {status === 'valid' && data.youtubeTitle && customVideoId && (
          <div className="flex items-center gap-2">
            <p className="font-sans text-[0.8rem]" style={{ color: '#4a7a4a' }}>
              ✓ {data.youtubeTitle}
            </p>
            <button
              type="button"
              onClick={(e) => togglePreview(customVideoId, e)}
              className="w-6 h-6 rounded-full border border-rose flex items-center justify-center text-mauve hover:border-wine hover:text-wine transition-colors duration-150 shrink-0 cursor-pointer"
              aria-label={previewVideoId === customVideoId && isPreviewPlaying ? 'Pausar' : 'Ouvir'}
            >
              {previewVideoId === customVideoId && isPreviewLoading ? (
                <IconSpinner />
              ) : previewVideoId === customVideoId && isPreviewPlaying ? (
                <IconPause />
              ) : (
                <IconPlay />
              )}
            </button>
          </div>
        )}
        {status === 'error' && (
          <p className="font-sans text-[0.8rem]" style={{ color: '#c0392b' }}>
            Vídeo não encontrado. Verifique o link.
          </p>
        )}
        {status === 'idle' && !data.youtubeUrl && (
          <p className="font-sans text-[0.8rem] text-mauve">
            Não tem música ainda? Sem problema, pode pular esse passo.
          </p>
        )}
      </div>

      {/* Sugestões */}
      <div className="flex flex-col gap-3">
        <p className="form-label">Ou escolha uma sugestão:</p>
        {SUGGESTED_SONGS.map((song) => {
          const vid = extractVideoId(song.url)!
          const isPlaying = previewVideoId === vid && isPreviewPlaying
          return (
            <div
              key={song.url}
              role="button"
              tabIndex={0}
              onClick={() => handleUrlChange(song.url)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleUrlChange(song.url)
              }}
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
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <button
                  type="button"
                  onClick={(e) => togglePreview(vid, e)}
                  className="w-7 h-7 rounded-full border border-rose flex items-center justify-center text-mauve hover:border-wine hover:text-wine transition-colors duration-150 shrink-0 cursor-pointer"
                  aria-label={isPlaying ? `Pausar ${song.title}` : `Ouvir ${song.title}`}
                >
                  {previewVideoId === vid && isPreviewLoading ? (
                    <IconSpinner />
                  ) : isPlaying ? (
                    <IconPause />
                  ) : (
                    <IconPlay />
                  )}
                </button>
                {data.youtubeUrl === song.url && <span className="text-wine text-[0.8rem]">✓</span>}
              </div>
            </div>
          )
        })}
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
              'btn-primary',
              status !== 'loading'
                ? 'bg-wine text-cream cursor-pointer'
                : 'bg-blush text-mauve cursor-not-allowed',
            )}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  )
}

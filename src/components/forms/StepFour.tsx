'use client'

import { useState, useEffect, useRef } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { TEMPLATES } from '@/lib/constants'
import type { TemplateId } from '@/types'
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
    title: 'All of Me',
    artist: 'John Legend',
  },
]

const CLOSING_EXAMPLES = [
  'Juntos para sempre, amor.',
  'Você é minha história preferida.',
  'Pra sempre ao seu lado.',
  'Meu lugar favorito é perto de você.',
  'Todo dia, com mais amor.',
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

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}

interface YTWindow {
  YT: {
    Player: new (el: HTMLDivElement, options: object) => YTPlayer
    PlayerState: { PLAYING: number }
  }
  onYouTubeIframeAPIReady: () => void
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
  const { data, updateField, setTemplate, setStep } = useCreateFormStore()
  const [status, setStatus] = useState<ValidationStatus>('idle')
  const isEssential = data.plan === 'essential'

  // ── Inline preview player ─────────────────────────
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [apiReady, setApiReady] = useState(false)
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = window as unknown as YTWindow
    if (w.YT?.Player) {
      setApiReady(true)
      return
    }
    w.onYouTubeIframeAPIReady = () => setApiReady(true)
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  }, [])

  useEffect(() => {
    if (!apiReady || !previewVideoId || !containerRef.current) return
    const w = window as unknown as YTWindow
    playerRef.current?.destroy()
    playerRef.current = new w.YT.Player(containerRef.current, {
      videoId: previewVideoId,
      playerVars: { autoplay: 1, controls: 0, rel: 0 },
      events: {
        onStateChange: (e: { data: number }) => {
          setIsPreviewPlaying(e.data === w.YT.PlayerState.PLAYING)
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
  const canAdvance = status !== 'loading'

  return (
    <div className="flex flex-col gap-8">
      {/* Hidden YT player container */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <div ref={containerRef} />
      </div>

      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 4 de 5
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Os toques finais
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          A música e o visual da página de vocês.
        </p>
      </div>

      {/* ── Seção: Música ── */}
      <div className="flex flex-col gap-5">
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
          Música
        </p>

        {/* Campo de URL */}
        <div className="flex flex-col gap-2">
          <label className="form-label">
            Link do YouTube
            <span className="text-mauve ml-1.5">(opcional)</span>
          </label>
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
              Deixe em branco se preferir sem música.
            </p>
          )}
        </div>

        {/* Sugestões */}
        <div className="flex flex-col gap-2">
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
                  background: data.youtubeUrl === song.url ? 'var(--color-blush)' : 'var(--surface-card)',
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
      </div>

      {/* Divider */}
      <div className="border-t border-blush" />

      {/* ── Seção: Tema ── */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-1">
            Tema
          </p>
          <p className="font-sans text-[0.82rem] text-text-muted">
            Cada tema tem animações próprias. O conteúdo é o mesmo.
          </p>
        </div>

        {/* Seletor de templates */}
        <div className="flex flex-col gap-3">
          {TEMPLATES.map((template) => {
            const isSelected = data.template === template.id
            const isLocked = isEssential && template.id !== 'petals'
            return (
              <button
                key={template.id}
                onClick={() => !isLocked && setTemplate(template.id as TemplateId)}
                className="flex items-center justify-between py-4 px-5 rounded-sm transition-all duration-200 text-left"
                style={{
                  border: `1px solid ${isSelected ? 'var(--color-wine)' : 'var(--color-rose)'}`,
                  background: isLocked ? 'var(--color-light)' : isSelected ? 'var(--color-blush)' : 'var(--surface-card)',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isLocked ? 0.65 : 1,
                }}
              >
                <div>
                  <p className="font-sans text-[0.85rem] text-text mb-0.5">{template.name}</p>
                  <p className="font-sans text-[0.72rem] text-text-muted">{template.description}</p>
                </div>
                {isLocked ? (
                  <span
                    className="font-sans text-[0.6rem] tracking-[0.12em] uppercase px-2 py-1 rounded-full shrink-0"
                    style={{ background: 'var(--color-blush)', color: 'var(--color-mauve)' }}
                  >
                    Premium
                  </span>
                ) : isSelected ? (
                  <span className="text-wine">✓</span>
                ) : null}
              </button>
            )
          })}
        </div>

        {/* Frase final */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="closingQuote" className="form-label">
              Frase final da página
            </label>
            <button
              type="button"
              onClick={() => {
                const random = CLOSING_EXAMPLES[Math.floor(Math.random() * CLOSING_EXAMPLES.length)]
                updateField('closingQuote', random)
              }}
              className="font-sans text-[0.7rem] text-mauve cursor-pointer underline decoration-dotted shrink-0"
            >
              Ver sugestões →
            </button>
          </div>
          <input
            id="closingQuote"
            className="form-input"
            type="text"
            placeholder="Para sempre, com você."
            maxLength={50}
            value={data.closingQuote}
            onChange={(e) => updateField('closingQuote', e.target.value)}
          />
          <div className="flex justify-between items-center">
            <p className="text-[0.72rem] text-mauve">
              Aparece no final da página, antes do coração ♡
            </p>
            <span className="text-[0.7rem] text-mauve">{data.closingQuote.length}/50</span>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <button onClick={() => setStep(3)} className="btn-ghost">
            ← Voltar
          </button>
          <button
            onClick={() => setStep(5)}
            disabled={!canAdvance}
            className={cn(
              'btn-primary',
              canAdvance
                ? 'bg-wine text-cream cursor-pointer'
                : 'bg-blush text-mauve cursor-not-allowed',
            )}
          >
            Continuar →
          </button>
        </div>
        <p className="font-sans text-[0.72rem] text-mauve text-center italic">
          Quase lá! Sua história está quase pronta ♡
        </p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

interface PlayerBarProps {
  youtubeUrl: string | null
  songTitle?: string | null
  onPlayReady?: (playFn: () => void) => void
  showTapToPlay?: boolean
  onTapToPlay?: () => void
}

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
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  setVolume: (v: number) => void
  unMute: () => void
  destroy: () => void
}

export default function PlayerBar({ youtubeUrl, songTitle, onPlayReady, showTapToPlay, onTapToPlay }: PlayerBarProps) {
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(30)
  const [apiReady, setApiReady] = useState(false)
  const [fetchedTitle, setFetchedTitle] = useState<string | null>(null)

  const videoId = youtubeUrl ? extractVideoId(youtubeUrl) : null

  useEffect(() => {
    if (!videoId) return
    fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    )
      .then((r) => r.json())
      .then((d) => setFetchedTitle(d.title ?? null))
      .catch(() => {})
  }, [videoId])

  useEffect(() => {
    if (!videoId) return

    if (window.YT?.Player) {
      setApiReady(true)
      return
    }

    window.onYouTubeIframeAPIReady = () => setApiReady(true)

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }, [videoId])

  useEffect(() => {
    if (!apiReady || !videoId || !containerRef.current) return

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      // Autoplay mudo: bufferiza enquanto o overlay está visível.
      // No clique de "Abrir memórias", rewind + unmute → sem delay.
      playerVars: { autoplay: 1, controls: 0, rel: 0, mute: 1, playsinline: 1 },
      events: {
        onReady: (e: any) => {
          e.target.setVolume(volume)
          onPlayReady?.(() => {
            const p = playerRef.current
            if (!p) return
            p.seekTo(0, true)
            p.unMute()
            p.setVolume(volume)
            p.playVideo()
          })
        },
        onStateChange: (e: any) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING)
        },
      },
    })

    return () => {
      playerRef.current?.destroy()
    }
  }, [apiReady, videoId])

  function togglePlay() {
    if (!playerRef.current) return
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value)
    setVolume(val)
    playerRef.current?.setVolume(val)
  }

  if (!videoId) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t border-rose z-[1000]"
      style={{
        background: 'var(--player-bg, rgba(250, 246, 241, 0.88))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        maxWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Tap-to-play banner — shown on iOS when player loaded after the gesture */}
      {showTapToPlay && (
        <button
          onClick={onTapToPlay}
          className="w-full flex items-center justify-center gap-2 py-2 border-b border-rose bg-transparent cursor-pointer"
          style={{ background: 'var(--color-blush)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--color-wine)">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-wine">
            Toque para tocar a música ♪
          </span>
        </button>
      )}

      <div className="flex items-center h-[72px] px-4 sm:px-6 gap-3 sm:gap-4 w-full">
        {/* Container oculto do player YT */}
        <div aria-hidden="true" style={{ display: 'none' }}>
          <div ref={containerRef} />
        </div>

        {/* Info da música */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-0.5 truncate">
            ♪ tocando agora
          </p>
          <p className="font-serif text-sm italic text-wine truncate">
            {songTitle ?? fetchedTitle ?? 'Nossa música'}
          </p>
        </div>

        {/* Botão play/pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
          className="shrink-0 bg-transparent border-none cursor-pointer text-wine p-2 rounded-full flex items-center justify-center transition-[background] duration-200"
        >
          {isPlaying ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6zm8-14v14h4V5z" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Volume */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--color-mauve)"
            className="shrink-0"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={handleVolume}
            className="w-14 sm:w-20 cursor-pointer accent-wine"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

interface PlayerBarProps {
  youtubeUrl: string | null
  songTitle?: string | null
  onPlayReady?: (playFn: () => void) => void
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
  setVolume: (v: number) => void
  destroy: () => void
}

export default function PlayerBar({ youtubeUrl, songTitle, onPlayReady }: PlayerBarProps) {
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [apiReady, setApiReady] = useState(false)

  const videoId = youtubeUrl ? extractVideoId(youtubeUrl) : null

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
      playerVars: { autoplay: 0, controls: 0, rel: 0 },
      events: {
        onReady: (e: any) => e.target.setVolume(volume),
        onStateChange: (e: any) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING)
        },
      },
    })

    if (onPlayReady) {
      onPlayReady(() => playerRef.current?.playVideo())
    }

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
      className="fixed bottom-0 left-0 right-0 h-[72px] border-t border-rose flex items-center px-6 gap-5 z-[1000]"
      style={{
        background: 'rgba(250, 246, 241, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Container oculto do player YT */}
      <div ref={containerRef} className="hidden" />

      {/* Info da música */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-mauve mb-0.5">
          ♪ tocando agora
        </p>
        <p className="font-serif text-base italic text-wine whitespace-nowrap overflow-hidden text-ellipsis">
          {songTitle ?? 'Nossa música'}
        </p>
      </div>

      {/* Botão play/pause */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar' : 'Tocar'}
        className="bg-transparent border-none cursor-pointer text-wine p-2 rounded-full flex items-center justify-center transition-[background] duration-200"
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
      <div className="flex items-center gap-2">
        <svg
          width="16"
          height="16"
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
          className="w-20 cursor-pointer accent-wine"
        />
      </div>
    </div>
  )
}

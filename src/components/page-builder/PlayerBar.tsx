'use client'

import { useEffect, useRef, useState } from 'react'

// ── Debug overlay ─────────────────────────────────────────────────────────────
// Remove this block and the <DebugOverlay /> usage once the iOS issue is solved.
const debugLines: string[] = []
function dbg(msg: string) {
  const line = `${new Date().toISOString().slice(11, 23)} ${msg}`
  debugLines.unshift(line)
  if (debugLines.length > 20) debugLines.pop()
  document.getElementById('ios-debug')!.innerText = debugLines.join('\n')
}
function DebugOverlay() {
  return (
    <div
      id="ios-debug"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.85)', color: '#0f0', fontFamily: 'monospace',
        fontSize: 11, padding: 8, whiteSpace: 'pre-wrap', pointerEvents: 'none',
        maxHeight: '40vh', overflow: 'hidden',
      }}
    />
  )
}
// ─────────────────────────────────────────────────────────────────────────────

interface PlayerBarProps {
  youtubeUrl: string | null
  songTitle?: string | null
  onPlayReady?: (playFn: () => boolean) => void
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

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  setVolume: (v: number) => void
  destroy: () => void
}

interface YTWindow {
  YT?: {
    Player: new (el: HTMLIFrameElement | string, options: object) => YTPlayer
    PlayerState?: { PLAYING: number }
  }
  onYouTubeIframeAPIReady?: () => void
}

export default function PlayerBar({
  youtubeUrl,
  songTitle,
  onPlayReady,
  showTapToPlay,
  onTapToPlay,
}: PlayerBarProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const readyRef = useRef(false)
  const volumeRef = useRef(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(30)
  const [fetchedTitle, setFetchedTitle] = useState<string | null>(null)

  const videoId = youtubeUrl ? extractVideoId(youtubeUrl) : null

  // Fetch song title for display
  useEffect(() => {
    if (!videoId) return
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      .then((r) => r.json())
      .then((d) => setFetchedTitle(d.title ?? null))
      .catch(() => {})
  }, [videoId])

  // Create the YouTube player up front. iOS only allows audio when
  // playVideo() is called synchronously inside a user gesture, on a
  // player that already exists — so the player must be built before
  // the user taps, not on tap.
  useEffect(() => {
    if (!videoId) return

    let cancelled = false

    function createPlayer() {
      const yt = (window as unknown as YTWindow).YT
      const iframe = iframeRef.current
      if (!yt?.Player || !iframe || cancelled || playerRef.current) {
        dbg(`createPlayer skip: yt=${!!yt?.Player} iframe=${!!iframe} cancelled=${cancelled} hasPlayer=${!!playerRef.current}`)
        return
      }

      iframe.src =
        `https://www.youtube.com/embed/${videoId}` +
        `?controls=0&rel=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`

      dbg(`createPlayer: building YT.Player for ${videoId}`)

      playerRef.current = new yt.Player(iframe, {
        events: {
          onReady: () => {
            readyRef.current = true
            playerRef.current?.setVolume(volumeRef.current)
            dbg('onReady: player is ready ✓')
          },
          onStateChange: (e: { data: number }) => {
            const playing = (window as unknown as YTWindow).YT?.PlayerState?.PLAYING ?? 1
            dbg(`onStateChange: state=${e.data} (PLAYING=${playing})`)
            setIsPlaying(e.data === playing)
          },
          onError: (e: { data: number }) => {
            dbg(`onError: code=${e.data}`)
          },
        },
      })
    }

    const w = window as unknown as YTWindow
    if (w.YT?.Player) {
      dbg('YT already loaded, calling createPlayer immediately')
      createPlayer()
    } else {
      dbg('YT not loaded, injecting script tag')
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script')
        tag.id = 'yt-iframe-api'
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      const prev = w.onYouTubeIframeAPIReady
      w.onYouTubeIframeAPIReady = () => {
        dbg('onYouTubeIframeAPIReady fired')
        prev?.()
        createPlayer()
      }
    }

    return () => {
      cancelled = true
    }
  }, [videoId])

  // Play trigger handed to the parent. Returns true if playback was
  // started synchronously (iOS-safe); false means the player is not
  // ready yet and the caller should show the tap-to-play fallback.
  useEffect(() => {
    if (!videoId) return

    onPlayReady?.(() => {
      const player = playerRef.current
      dbg(`onPlayReady callback: player=${!!player} ready=${readyRef.current}`)
      if (!player || !readyRef.current) return false

      dbg('onPlayReady: calling playVideo()')
      player.playVideo()
      setIsPlaying(true)
      return true
    })
  }, [videoId]) // eslint-disable-line react-hooks/exhaustive-deps

  function togglePlay() {
    dbg(`togglePlay: playerRef=${!!playerRef.current} readyRef=${readyRef.current} isPlaying=${isPlaying}`)
    if (!playerRef.current) return
    if (isPlaying) {
      dbg('calling pauseVideo()')
      playerRef.current.pauseVideo()
    } else {
      dbg('calling playVideo()')
      playerRef.current.playVideo()
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value)
    setVolume(val)
    volumeRef.current = val
    playerRef.current?.setVolume(val)
  }

  if (!videoId) return null

  return (
    <>
    <DebugOverlay />
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
      {/* Tap-to-play fallback banner for iOS edge cases */}
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
        {/* Hidden YouTube iframe — player is built on mount so playVideo()
            can run synchronously inside the open-button tap (iOS audio). */}
        <iframe
          ref={iframeRef}
          id="yt-player-iframe"
          aria-hidden="true"
          allow="autoplay; encrypted-media"
          style={{ display: 'none' }}
          title="music-player"
        />

        {/* Song info */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="font-sans text-[0.6rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-0.5 truncate">
            ♪ tocando agora
          </p>
          <p className="font-serif text-sm italic text-wine truncate">
            {songTitle ?? fetchedTitle ?? 'Nossa música'}
          </p>
        </div>

        {/* Play/pause */}
        <button
          id="player-play-btn"
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
    </>
  )
}

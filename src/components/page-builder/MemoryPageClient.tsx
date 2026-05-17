'use client'

import { useState, useRef } from 'react'
import Overlay from './Overlay'
import PlayerBar from './PlayerBar'
import type { TemplateId } from '@/types'

interface MemoryPageClientProps {
  nameA: string
  nameB: string
  youtubeUrl: string | null
  template?: TemplateId
  onOpen?: () => void
}

export default function MemoryPageClient({
  nameA,
  nameB,
  youtubeUrl,
  template,
  onOpen,
}: MemoryPageClientProps) {
  const [opened, setOpened] = useState(false)
  const [showTapToPlay, setShowTapToPlay] = useState(false)
  const playRef = useRef<(() => boolean) | null>(null)

  function handlePlayReady(fn: () => boolean) {
    playRef.current = fn
  }

  function handleOpen() {
    setOpened(true)
    onOpen?.()

    // Call directly inside the tap handler — iOS requires this to allow audio.
    // Falls back to the tap-to-play banner if the player is not ready yet.
    const played = playRef.current?.() ?? false
    if (!played) setShowTapToPlay(true)

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  }

  function handleTapToPlay() {
    const played = playRef.current?.() ?? false
    if (played) setShowTapToPlay(false)
  }

  return (
    <>
      {!opened && <Overlay nameA={nameA} nameB={nameB} template={template} onOpen={handleOpen} />}
      <PlayerBar
        youtubeUrl={youtubeUrl}
        onPlayReady={handlePlayReady}
        showTapToPlay={showTapToPlay}
        onTapToPlay={handleTapToPlay}
      />
    </>
  )
}

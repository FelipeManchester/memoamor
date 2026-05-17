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
  const playRef = useRef<(() => void) | null>(null)

  function handlePlayReady(fn: () => void) {
    playRef.current = fn
  }

  function handleOpen() {
    setOpened(true)
    onOpen?.()

    if (playRef.current) {
      // Call directly inside the tap handler — iOS requires this to allow audio
      playRef.current()
    } else {
      // Extremely rare: user tapped before first effect ran in PlayerBar
      setShowTapToPlay(true)
    }

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  }

  function handleTapToPlay() {
    setShowTapToPlay(false)
    playRef.current?.()
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

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
  const playRef = useRef<(() => void) | null>(null)
  const pendingPlay = useRef(false)

  // Quando o play estiver pronto e houver uma intenção pendente, dispara
  function handlePlayReady(fn: () => void) {
    playRef.current = fn
    if (pendingPlay.current) {
      pendingPlay.current = false
      fn()
    }
  }

  function handleOpen() {
    setOpened(true)
    onOpen?.()
    if (playRef.current) {
      playRef.current()
    } else {
      pendingPlay.current = true
    }
    // Overlay removed from DOM — recalculate ScrollTrigger positions
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  }

  return (
    <>
      {!opened && <Overlay nameA={nameA} nameB={nameB} template={template} onOpen={handleOpen} />}
      <PlayerBar youtubeUrl={youtubeUrl} onPlayReady={handlePlayReady} />
    </>
  )
}

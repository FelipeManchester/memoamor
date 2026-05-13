'use client'

import { useState, useRef } from 'react'
import Overlay from './Overlay'
import PlayerBar from './PlayerBar'

interface MemoryPageClientProps {
  nameA: string
  nameB: string
  youtubeUrl: string | null
  onOpen?: () => void
}

export default function MemoryPageClient({
  nameA,
  nameB,
  youtubeUrl,
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
      // Player já está pronto — toca imediatamente
      playRef.current()
    } else {
      // Player ainda não está pronto — marca intenção pendente
      pendingPlay.current = true
    }
  }

  return (
    <>
      {!opened && <Overlay nameA={nameA} nameB={nameB} onOpen={handleOpen} />}
      <PlayerBar youtubeUrl={youtubeUrl} onPlayReady={handlePlayReady} />
    </>
  )
}

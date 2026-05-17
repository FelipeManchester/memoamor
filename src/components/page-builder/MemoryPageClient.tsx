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
  const pendingPlay = useRef(false)

  // Player pronto: se havia intenção pendente, NÃO dispara automaticamente
  // (já fora do gesto do usuário — iOS bloquearia). Mostra botão manual.
  function handlePlayReady(fn: () => void) {
    playRef.current = fn
    if (pendingPlay.current) {
      pendingPlay.current = false
      setShowTapToPlay(true)
    }
  }

  function handleOpen() {
    setOpened(true)
    onOpen?.()
    if (playRef.current) {
      // Player já pronto: chama dentro do gesto → funciona no iOS
      playRef.current()
    } else {
      // Player ainda carregando: marca intenção pendente
      pendingPlay.current = true
    }
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  }

  function handleTapToPlay() {
    setShowTapToPlay(false)
    playRef.current?.() // Dentro do gesto do usuário → iOS permite
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

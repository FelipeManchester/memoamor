'use client'

import { useRef } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { processImage, createLocalPreview } from '@/lib/image'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import type { GalleryItem } from '@/types'

const MAX_PHOTOS = 5

export default function StepThree() {
  const { data, addGalleryItem, removeGalleryItem, updateGalleryItem, setStep } =
    useCreateFormStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Bloqueia avanço se houver upload em andamento
  const canAdvance = data.gallery.every(
    (g) => g.uploadStatus === 'done' || g.uploadStatus === 'idle',
  )

  async function handleFilesSelect(files: FileList) {
    const remaining = MAX_PHOTOS - data.gallery.length
    const selected = Array.from(files).slice(0, remaining)

    for (const file of selected) {
      const id = nanoid()
      const preview = createLocalPreview(file)

      // Adiciona o item com status processing imediatamente
      const newItem: GalleryItem = {
        id,
        file,
        path: null,
        preview,
        uploadStatus: 'processing',
      }
      addGalleryItem(newItem)

      try {
        const processed = await processImage(file)
        updateGalleryItem(id, { uploadStatus: 'uploading' })

        const supabase = createClient()
        const path = `temp/${nanoid()}/${processed.name}`
        const { error } = await supabase.storage.from('pages').upload(path, processed)

        if (error) throw error

        updateGalleryItem(id, { path, uploadStatus: 'done' })
      } catch {
        updateGalleryItem(id, { uploadStatus: 'error' })
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Cabeçalho */}
      <div>
        <p style={eyebrowStyle}>Passo 3 de 5</p>
        <h1 style={titleStyle}>Adicione fotos à galeria</h1>
        <p style={subtitleStyle}>Até {MAX_PHOTOS} fotos. Você pode pular essa etapa.</p>
      </div>

      {/* Grid de fotos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        {data.gallery.map((item) => (
          <div
            key={item.id}
            style={{ position: 'relative', aspectRatio: '1', borderRadius: 2, overflow: 'hidden' }}
          >
            <img
              src={item.preview ?? ''}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Badge de status */}
            {item.uploadStatus !== 'done' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {item.uploadStatus === 'processing' && 'Processando...'}
                {item.uploadStatus === 'uploading' && 'Enviando...'}
                {item.uploadStatus === 'error' && 'Erro'}
              </div>
            )}

            {/* Botão remover */}
            {item.uploadStatus === 'done' && (
              <button
                onClick={() => removeGalleryItem(item.id)}
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  background: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 22,
                  height: 22,
                  cursor: 'pointer',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Slot para adicionar mais fotos */}
        {data.gallery.length < MAX_PHOTOS && (
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              aspectRatio: '1',
              border: '1px dashed var(--color-rose)',
              borderRadius: 2,
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--color-mauve)',
              fontFamily: 'var(--font-sans)',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        )}
      </div>

      {/* Input de arquivo oculto — aceita múltiplos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files?.length) handleFilesSelect(e.target.files)
          e.target.value = ''
        }}
      />

      {/* Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(2)} style={ghostButtonStyle}>
          ← Voltar
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setStep(4)} style={ghostButtonStyle}>
            Pular
          </button>
          <button
            onClick={() => setStep(4)}
            disabled={!canAdvance}
            style={primaryButtonStyle(canAdvance)}
          >
            Continuar →
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Estilos ───────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--color-mauve)',
  marginBottom: 8,
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 300,
  fontStyle: 'italic',
  color: 'var(--color-wine)',
}

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.85rem',
  color: 'var(--color-mauve)',
  marginTop: 8,
}

const ghostButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  background: 'transparent',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 20px',
  color: 'var(--color-mauve)',
  cursor: 'pointer',
}

const primaryButtonStyle = (enabled: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  padding: '16px 32px',
  background: enabled ? 'var(--color-wine)' : 'var(--color-blush)',
  color: enabled ? 'var(--color-cream)' : 'var(--color-mauve)',
  border: 'none',
  borderRadius: 2,
  cursor: enabled ? 'pointer' : 'not-allowed',
  transition: 'all 0.2s',
})

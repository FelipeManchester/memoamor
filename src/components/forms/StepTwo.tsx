'use client'

import { useRef } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { processImage, createLocalPreview } from '@/lib/image'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import type { UploadStatus } from '@/types'

export default function StepTwo() {
  const { data, updateMemory, addMemory, removeMemory, setStep } = useCreateFormStore()
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Valida se pode avançar — mínimo 1 memória com título e corpo
  const canAdvance = data.memories.every(
    (m) =>
      m.title.trim().length >= 2 &&
      m.body.trim().length >= 20 &&
      m.uploadStatus !== 'processing' &&
      m.uploadStatus !== 'uploading',
  )

  // Gerencia o upload de foto de uma memória específica
  async function handleImageSelect(memoryId: string, file: File) {
    const preview = createLocalPreview(file)
    updateMemory(memoryId, { imagePreview: preview, uploadStatus: 'processing' })

    try {
      // Converte para WebP no browser
      const processed = await processImage(file)
      updateMemory(memoryId, { uploadStatus: 'uploading' })

      // Faz upload direto para o Supabase Storage
      const supabase = createClient()
      const path = `temp/${nanoid()}/${processed.name}`
      const { error } = await supabase.storage.from('pages').upload(path, processed)

      if (error) throw error

      updateMemory(memoryId, { imagePath: path, uploadStatus: 'done' })
    } catch {
      updateMemory(memoryId, { uploadStatus: 'error', imagePreview: null })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Cabeçalho */}
      <div>
        <p style={eyebrowStyle}>Passo 2 de 5</p>
        <h1 style={titleStyle}>Conte as memórias de vocês</h1>
        <p style={subtitleStyle}>Adicione de 1 a 3 memórias especiais.</p>
      </div>

      {/* Lista de memórias */}
      {data.memories.map((memory, i) => (
        <div
          key={memory.id}
          style={{
            border: '1px solid var(--color-rose)',
            borderRadius: 4,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            background: 'white',
          }}
        >
          {/* Cabeçalho do card */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ ...eyebrowStyle, margin: 0 }}>Memória {i + 1}</span>
            {data.memories.length > 1 && (
              <button onClick={() => removeMemory(memory.id)} style={ghostButtonStyle}>
                Remover
              </button>
            )}
          </div>

          {/* Época */}
          <div style={fieldWrapStyle}>
            <label style={labelStyle}>
              Época ou data
              <span style={optionalStyle}>(opcional)</span>
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Ex: Maio de 2016"
              maxLength={30}
              value={memory.dateLabel}
              onChange={(e) => updateMemory(memory.id, { dateLabel: e.target.value })}
            />
          </div>

          {/* Título */}
          <div style={fieldWrapStyle}>
            <label style={labelStyle}>Título *</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Ex: O início de tudo"
              maxLength={60}
              value={memory.title}
              onChange={(e) => updateMemory(memory.id, { title: e.target.value })}
            />
          </div>

          {/* Texto */}
          <div style={fieldWrapStyle}>
            <label style={labelStyle}>Texto *</label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
              placeholder="Conte essa memória com suas palavras..."
              maxLength={300}
              value={memory.body}
              onChange={(e) => updateMemory(memory.id, { body: e.target.value })}
            />
            <span
              style={{ fontSize: '0.7rem', color: 'var(--color-mauve)', alignSelf: 'flex-end' }}
            >
              {memory.body.length}/300
            </span>
          </div>

          {/* Upload de foto */}
          <div style={fieldWrapStyle}>
            <label style={labelStyle}>
              Foto
              <span style={optionalStyle}>(opcional)</span>
            </label>

            {memory.imagePreview ? (
              // Preview da foto selecionada
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={memory.imagePreview}
                  alt="Preview"
                  style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }}
                />
                {/* Badge de status */}
                <span style={getStatusBadgeStyle(memory.uploadStatus)}>
                  {getStatusLabel(memory.uploadStatus)}
                </span>
                {/* Botão remover foto */}
                {memory.uploadStatus === 'done' && (
                  <button
                    onClick={() =>
                      updateMemory(memory.id, {
                        imagePath: null,
                        imagePreview: null,
                        uploadStatus: 'idle',
                      })
                    }
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      background: 'var(--color-wine)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
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
                {/* Botão tentar novamente em caso de erro */}
                {memory.uploadStatus === 'error' && (
                  <button
                    onClick={() => fileInputRefs.current[memory.id]?.click()}
                    style={ghostButtonStyle}
                  >
                    Tentar novamente
                  </button>
                )}
              </div>
            ) : (
              // Área de seleção de foto
              <button
                onClick={() => fileInputRefs.current[memory.id]?.click()}
                style={{
                  border: '1px dashed var(--color-rose)',
                  borderRadius: 2,
                  padding: '20px 24px',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--color-mauve)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  width: '100%',
                }}
              >
                + Adicionar foto
              </button>
            )}

            {/* Input de arquivo oculto */}
            <input
              ref={(el) => {
                fileInputRefs.current[memory.id] = el
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageSelect(memory.id, file)
              }}
            />
          </div>
        </div>
      ))}

      {/* Botão adicionar memória */}
      {data.memories.length < 3 && (
        <button onClick={addMemory} style={ghostButtonStyle}>
          + Adicionar outra memória
        </button>
      )}

      {/* Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setStep(1)} style={ghostButtonStyle}>
          ← Voltar
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!canAdvance}
          style={primaryButtonStyle(canAdvance)}
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}

// ── Helpers de status de upload ───────────────
function getStatusLabel(status: UploadStatus): string {
  const labels: Record<UploadStatus, string> = {
    idle: '',
    processing: 'Processando...',
    uploading: 'Enviando...',
    done: '✓',
    error: 'Erro',
  }
  return labels[status]
}

function getStatusBadgeStyle(status: UploadStatus): React.CSSProperties {
  const colors: Record<UploadStatus, string> = {
    idle: 'transparent',
    processing: '#c49a8a',
    uploading: '#c49a8a',
    done: '#4a7a4a',
    error: '#c0392b',
  }
  return {
    position: 'absolute',
    bottom: 4,
    left: 4,
    background: colors[status],
    color: 'white',
    fontSize: '0.6rem',
    padding: '2px 6px',
    borderRadius: 2,
  }
}

// ── Estilos compartilhados ────────────────────
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

const fieldWrapStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  color: 'var(--color-text)',
}

const optionalStyle: React.CSSProperties = {
  color: 'var(--color-mauve)',
  marginLeft: 6,
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  background: 'white',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
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

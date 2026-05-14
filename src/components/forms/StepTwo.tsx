'use client'

import { useRef } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { processImage, createLocalPreview } from '@/lib/image'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import type { UploadStatus } from '@/types'
import { cn } from '@/lib/utils'

export default function StepTwo() {
  const { data, updateMemory, addMemory, removeMemory, setStep } = useCreateFormStore()
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const canAdvance = data.memories.every(
    (m) =>
      m.title.trim().length >= 2 &&
      m.body.trim().length >= 20 &&
      m.uploadStatus !== 'processing' &&
      m.uploadStatus !== 'uploading',
  )

  async function handleImageSelect(memoryId: string, file: File) {
    const preview = createLocalPreview(file)
    updateMemory(memoryId, { imagePreview: preview, uploadStatus: 'processing' })

    try {
      const processed = await processImage(file)
      updateMemory(memoryId, { uploadStatus: 'uploading' })

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
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 2 de 5
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Conte as memórias de vocês
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          Adicione de 1 a 3 memórias especiais.
        </p>
      </div>

      {/* Lista de memórias */}
      {data.memories.map((memory, i) => (
        <div
          key={memory.id}
          className="border border-rose rounded flex flex-col gap-5 p-6 bg-white"
        >
          {/* Cabeçalho do card */}
          <div className="flex justify-between items-center">
            <span className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
              Memória {i + 1}
            </span>
            {data.memories.length > 1 && (
              <button onClick={() => removeMemory(memory.id)} className="btn-ghost">
                Remover
              </button>
            )}
          </div>

          {/* Época */}
          <div className="flex flex-col gap-2">
            <label className="form-label">
              Época ou data
              <span className="text-mauve ml-1.5">(opcional)</span>
            </label>
            <input
              className="form-input"
              type="text"
              placeholder="Ex: Maio de 2016"
              maxLength={30}
              value={memory.dateLabel}
              onChange={(e) => updateMemory(memory.id, { dateLabel: e.target.value })}
            />
          </div>

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label className="form-label">Título *</label>
            <input
              className="form-input"
              type="text"
              placeholder="Ex: O início de tudo"
              maxLength={60}
              value={memory.title}
              onChange={(e) => updateMemory(memory.id, { title: e.target.value })}
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-2">
            <label className="form-label">Texto *</label>
            <textarea
              className="form-input min-h-[100px] resize-y"
              placeholder="Conte essa memória com suas palavras..."
              maxLength={300}
              value={memory.body}
              onChange={(e) => updateMemory(memory.id, { body: e.target.value })}
            />
            <span className="text-[0.7rem] text-mauve self-end">
              {memory.body.length}/300
            </span>
          </div>

          {/* Upload de foto */}
          <div className="flex flex-col gap-2">
            <label className="form-label">
              Foto
              <span className="text-mauve ml-1.5">(opcional)</span>
            </label>

            {memory.imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={memory.imagePreview}
                  alt="Preview"
                  className="w-[120px] h-[120px] object-cover rounded-sm"
                />
                {/* Badge de status */}
                <span
                  className="absolute bottom-1 left-1 text-white text-[0.6rem] py-0.5 px-1.5 rounded-sm"
                  style={{ background: getStatusBadgeColor(memory.uploadStatus) }}
                >
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
                    className="absolute -top-2 -right-2 bg-wine text-white border-none rounded-full w-5 h-5 cursor-pointer text-[0.65rem] flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
                {memory.uploadStatus === 'error' && (
                  <button
                    onClick={() => fileInputRefs.current[memory.id]?.click()}
                    className="btn-ghost mt-2"
                  >
                    Tentar novamente
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInputRefs.current[memory.id]?.click()}
                className="border border-dashed border-rose rounded-sm py-5 px-6 bg-transparent cursor-pointer text-mauve font-sans text-[0.8rem] w-full"
              >
                + Adicionar foto
              </button>
            )}

            <input
              ref={(el) => { fileInputRefs.current[memory.id] = el }}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
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
        <button onClick={addMemory} className="btn-ghost">
          + Adicionar outra memória
        </button>
      )}

      {/* Navegação */}
      <div className="flex justify-between">
        <button onClick={() => setStep(1)} className="btn-ghost">
          ← Voltar
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!canAdvance}
          className={cn(
            'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200',
            canAdvance ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
          )}
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}

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

function getStatusBadgeColor(status: UploadStatus): string {
  const colors: Record<UploadStatus, string> = {
    idle: 'transparent',
    processing: '#c49a8a',
    uploading: '#c49a8a',
    done: '#4a7a4a',
    error: '#c0392b',
  }
  return colors[status]
}

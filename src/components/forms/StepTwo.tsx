'use client'

import { useState, useRef, useEffect } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { processImage, createLocalPreview } from '@/lib/image'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import type { UploadStatus } from '@/types'
import { cn } from '@/lib/utils'
import { PLANS } from '@/lib/constants'

const EXAMPLE_TEXTS = [
  'Foi uma tarde que eu nunca vou esquecer. A gente mal se conhecia, mas algo já estava diferente: um sorriso, um olhar. Não sei explicar, mas sabia que era especial.',
  'Era uma viagem que a gente tinha planejado há meses. Cada detalhe foi uma pequena aventura. O que ficou foi a sensação de que ao lado de você, qualquer lugar vira um lar.',
  'Não foi um momento grandioso. Foi um dia comum, uma conversa qualquer, mas foi quando percebi que não queria mais esse mundo sem você do meu lado.',
  'Cada vez que lembro, sinto aquela sensação de borboletas no estômago. Era simples, mas perfeito. E perfeito por ser exatamente assim: nosso.',
  'Você me ensinou que amor é presença. Não precisa de grandes gestos. É estar lá, do jeito que só você sabe estar, e isso mudou tudo pra mim.',
]

export default function StepTwo() {
  const { data, updateMemory, addMemory, removeMemory, setStep } = useCreateFormStore()
  const plan = PLANS.find((p) => p.id === data.plan)!
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [examplesForMemory, setExamplesForMemory] = useState<string | null>(null)

  // Restore previews from Supabase public URL for images uploaded in a previous session
  useEffect(() => {
    const supabase = createClient()
    data.memories.forEach((m) => {
      if (m.imagePath && (!m.imagePreview || m.imagePreview.startsWith('blob:'))) {
        const { data: urlData } = supabase.storage.from('pages').getPublicUrl(m.imagePath)
        updateMemory(m.id, { imagePreview: urlData.publicUrl, uploadStatus: 'done' })
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const canAdvance = data.memories.every(
    (m) =>
      m.title.trim().length >= 2 &&
      m.body.trim().length >= 10 &&
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

      const { data: urlData } = supabase.storage.from('pages').getPublicUrl(path)
      updateMemory(memoryId, { imagePath: path, imagePreview: urlData.publicUrl, uploadStatus: 'done' })
    } catch {
      updateMemory(memoryId, { uploadStatus: 'error', imagePreview: null })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Modal de exemplos */}
      {examplesForMemory && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
          onClick={() => setExamplesForMemory(null)}
        >
          <div
            className="bg-white rounded w-full max-w-md flex flex-col gap-4 p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Exemplos de texto para memória"
          >
            <div className="flex items-center justify-between">
              <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
                Exemplos de texto
              </p>
              <button
                type="button"
                onClick={() => setExamplesForMemory(null)}
                className="text-mauve text-[1rem] leading-none cursor-pointer"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <p className="font-sans text-[0.75rem] text-text-muted">
              Clique num exemplo para usá-lo. Você pode editar depois ♡
            </p>
            <div className="flex flex-col gap-3">
              {EXAMPLE_TEXTS.map((text, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    updateMemory(examplesForMemory, { body: text })
                    setExamplesForMemory(null)
                  }}
                  className="text-left py-3 px-4 rounded-sm border border-rose font-sans text-[0.78rem] text-text leading-[1.6] cursor-pointer transition-all duration-150 hover:bg-blush hover:border-wine"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
          Adicione de 1 a {plan.maxMemories} memórias especiais.
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
                <span
                  className="absolute bottom-1 left-1 text-white text-[0.6rem] py-0.5 px-1.5 rounded-sm"
                  style={{ background: getStatusBadgeColor(memory.uploadStatus) }}
                >
                  {getStatusLabel(memory.uploadStatus)}
                </span>
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
                    aria-label="Remover foto"
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

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label htmlFor={`title-${memory.id}`} className="form-label">
              Como vocês chamam esse momento? <span aria-label="obrigatório">*</span>
            </label>
            <input
              id={`title-${memory.id}`}
              className="form-input"
              type="text"
              placeholder="Nossa primeira viagem"
              maxLength={60}
              value={memory.title}
              onChange={(e) => updateMemory(memory.id, { title: e.target.value })}
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor={`body-${memory.id}`} className="form-label">
                Conta um pouco mais ♡ <span aria-label="obrigatório">*</span>
              </label>
              <button
                type="button"
                onClick={() => setExamplesForMemory(memory.id)}
                className="font-sans text-[0.7rem] text-mauve cursor-pointer underline decoration-dotted shrink-0"
              >
                Sem inspiração? Veja exemplos →
              </button>
            </div>
            <textarea
              id={`body-${memory.id}`}
              className="form-input min-h-[100px] resize-y"
              placeholder="Foi o dia em que percebi que queria você pra sempre..."
              maxLength={300}
              value={memory.body}
              aria-describedby={`body-helper-${memory.id}`}
              onChange={(e) => updateMemory(memory.id, { body: e.target.value })}
            />
            <div className="flex justify-between items-center">
              <span
                id={`body-helper-${memory.id}`}
                className="text-[0.7rem]"
                style={{
                  color: memory.body.length >= 10 ? '#4a7a4a' : 'var(--color-mauve)',
                }}
              >
                {memory.body.length >= 10 ? '✓ Ótimo!' : 'Mín. 10 caracteres'}
              </span>
              <span className="text-[0.7rem] text-mauve">{memory.body.length}/300</span>
            </div>
          </div>
        </div>
      ))}

      {/* Botão adicionar memória */}
      {data.memories.length < plan.maxMemories && (
        <button onClick={addMemory} className="btn-ghost">
          + Adicionar outra memória
        </button>
      )}

      {/* Navegação */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <button onClick={() => setStep(1)} className="btn-ghost">
            ← Voltar
          </button>
          <button
            onClick={() => setStep(3)}
            disabled={!canAdvance}
            className={cn(
              'btn-primary',
              canAdvance ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
            )}
          >
            Continuar →
          </button>
        </div>
        {canAdvance && (
          <p className="font-sans text-[0.72rem] text-mauve text-center italic">
            A página de vocês está tomando forma ♡
          </p>
        )}
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

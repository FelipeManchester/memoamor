'use client'

import { useState, useRef } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { processImage, createLocalPreview } from '@/lib/image'
import { createClient } from '@/lib/supabase/client'
import { nanoid } from 'nanoid'
import type { GalleryItem } from '@/types'
import { cn } from '@/lib/utils'
import { PLANS } from '@/lib/constants'

export default function StepThree() {
  const { data, addGalleryItem, removeGalleryItem, updateGalleryItem, setStep } =
    useCreateFormStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const plan = PLANS.find((p) => p.id === data.plan)!
  const maxPhotos = plan.maxGalleryPhotos
  const [isDragging, setIsDragging] = useState(false)

  const canAdvance = data.gallery.every(
    (g) => g.uploadStatus === 'done' || g.uploadStatus === 'idle',
  )

  async function handleFilesSelect(files: FileList) {
    const remaining = maxPhotos - data.gallery.length
    const selected = Array.from(files).slice(0, remaining)

    for (const file of selected) {
      const id = nanoid()
      const preview = createLocalPreview(file)

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

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) handleFilesSelect(e.dataTransfer.files)
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false)
  }

  const hasPhotos = data.gallery.length > 0

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 3 de 6
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Suas fotos preferidas
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          Até {maxPhotos} foto{maxPhotos > 1 ? 's' : ''}. PNG, JPG, WebP, HEIC. Você pode pular essa etapa.
        </p>
      </div>

      {/* Dropzone vazia */}
      {!hasPhotos && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed rounded-sm py-12 px-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-150',
            isDragging ? 'border-wine bg-blush' : 'border-rose bg-transparent',
          )}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Adicionar fotos à galeria"
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <span className="font-sans text-[2rem] text-mauve leading-none">+</span>
          <p className="font-sans text-[0.85rem] text-mauve text-center">
            Arrasta aqui ou clica para escolher
          </p>
        </div>
      )}

      {/* Grid de fotos */}
      {hasPhotos && (
        <div className="grid grid-cols-3 gap-3">
          {data.gallery.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-sm overflow-hidden"
            >
              <img
                src={item.preview ?? ''}
                alt=""
                className="w-full h-full object-cover"
              />

              {item.uploadStatus !== 'done' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[0.7rem] font-sans">
                  {item.uploadStatus === 'processing' && 'Processando...'}
                  {item.uploadStatus === 'uploading' && 'Enviando...'}
                  {item.uploadStatus === 'error' && 'Erro'}
                </div>
              )}

              {item.uploadStatus === 'done' && (
                <button
                  onClick={() => removeGalleryItem(item.id)}
                  className="absolute top-1 right-1 bg-black/50 text-white border-none rounded-full w-[22px] h-[22px] cursor-pointer text-[0.65rem] flex items-center justify-center"
                  aria-label="Remover foto"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {data.gallery.length < maxPhotos && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border border-dashed border-rose rounded-sm bg-transparent cursor-pointer text-mauve font-sans text-[1.5rem] flex items-center justify-center"
              aria-label="Adicionar mais fotos"
            >
              +
            </button>
          )}
        </div>
      )}

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFilesSelect(e.target.files)
          e.target.value = ''
        }}
      />

      {/* Navegação */}
      <div className="flex justify-between">
        <button onClick={() => setStep(2)} className="btn-ghost">
          ← Voltar
        </button>
        <div className="flex gap-3">
          <button onClick={() => setStep(4)} className="btn-ghost">
            Pular esta etapa
          </button>
          <button
            onClick={() => setStep(4)}
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
    </div>
  )
}

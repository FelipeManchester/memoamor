'use client'

import { useRef } from 'react'
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

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 3 de 5
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Adicione fotos à galeria
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          Até {maxPhotos} fotos. Você pode pular essa etapa.
        </p>
      </div>

      {/* Grid de fotos */}
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

            {/* Badge de status */}
            {item.uploadStatus !== 'done' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[0.7rem] font-sans">
                {item.uploadStatus === 'processing' && 'Processando...'}
                {item.uploadStatus === 'uploading' && 'Enviando...'}
                {item.uploadStatus === 'error' && 'Erro'}
              </div>
            )}

            {/* Botão remover */}
            {item.uploadStatus === 'done' && (
              <button
                onClick={() => removeGalleryItem(item.id)}
                className="absolute top-1 right-1 bg-black/50 text-white border-none rounded-full w-[22px] h-[22px] cursor-pointer text-[0.65rem] flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Slot para adicionar mais fotos */}
        {data.gallery.length < maxPhotos && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square border border-dashed border-rose rounded-sm bg-transparent cursor-pointer text-mauve font-sans text-[1.5rem] flex items-center justify-center"
          >
            +
          </button>
        )}
      </div>

      {/* Input de arquivo oculto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
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
            Pular
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

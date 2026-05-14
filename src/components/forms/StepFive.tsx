'use client'

import { useCreateFormStore } from '@/store/createForm'
import { TEMPLATES } from '@/lib/constants'
import { generateBaseSlug } from '@/lib/slug'
import type { TemplateId } from '@/types'
import { cn } from '@/lib/utils'

export default function StepFive() {
  const { data, setTemplate, setStep } = useCreateFormStore()

  const isEssential = data.plan === 'essential'

  const previewSlug = isEssential
    ? null
    : data.nameA && data.nameB && data.startDate
    ? data.pageTitle || generateBaseSlug(data.nameA, data.nameB, data.startDate)
    : 'sua-pagina'

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 5 de 6
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Qual o clima da história de vocês?
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2">
          Cada tema tem animações próprias. O conteúdo é o mesmo.
        </p>
      </div>

      {/* Seletor de templates */}
      <div className="flex flex-col gap-3">
        {TEMPLATES.map((template) => {
          const isSelected = data.template === template.id
          const isLocked = isEssential && template.id !== 'petals'
          return (
            <button
              key={template.id}
              onClick={() => !isLocked && setTemplate(template.id as TemplateId)}
              className="flex items-center justify-between py-4 px-5 rounded-sm transition-all duration-200 text-left"
              style={{
                border: `1px solid ${isSelected ? 'var(--color-wine)' : 'var(--color-rose)'}`,
                background: isLocked ? '#faf8f6' : isSelected ? 'var(--color-blush)' : 'white',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                opacity: isLocked ? 0.65 : 1,
              }}
            >
              <div>
                <p className="font-sans text-[0.85rem] text-text mb-0.5">{template.name}</p>
                <p className="font-sans text-[0.72rem] text-text-muted">{template.description}</p>
              </div>
              {isLocked ? (
                <span
                  className="font-sans text-[0.6rem] tracking-[0.12em] uppercase px-2 py-1 rounded-full shrink-0"
                  style={{ background: 'var(--color-blush)', color: 'var(--color-mauve)' }}
                >
                  Premium
                </span>
              ) : isSelected ? (
                <span className="text-wine">✓</span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Resumo */}
      <div className="border border-rose rounded flex flex-col gap-[10px] p-5 bg-white">
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Resumo
        </p>

        {[
          { label: 'Casal', value: `${data.nameA} & ${data.nameB}` },
          {
            label: 'Desde',
            value: data.startDate
              ? new Date(data.startDate + 'T12:00:00').toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : '—',
          },
          { label: 'Memórias', value: `${data.memories.length}` },
          {
            label: 'Galeria',
            value: data.gallery.length > 0 ? `${data.gallery.length} fotos` : 'Sem fotos',
          },
          {
            label: 'Música',
            value: data.youtubeTitle ?? (data.youtubeUrl ? 'Link adicionado' : 'Sem música'),
          },
          { label: 'Tema', value: TEMPLATES.find((t) => t.id === data.template)?.name ?? '—' },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="font-sans text-[0.75rem] text-mauve">{item.label}</span>
            <span className="font-sans text-[0.82rem] text-text">{item.value}</span>
          </div>
        ))}

        {/* URL da página */}
        <div className="mt-2 pt-3 border-t border-blush">
          <p className="font-sans text-[0.72rem] text-mauve mb-1">Sua página ficará em:</p>
          <p className="font-sans text-[0.82rem]">
            <span className="text-wine">memoamor.app/p/</span>
            {isEssential ? (
              <span className="text-mauve italic">gerado automaticamente</span>
            ) : (
              <span className="text-wine">{previewSlug}</span>
            )}
          </p>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <button onClick={() => setStep(4)} className="btn-ghost">
          ← Voltar
        </button>
        <button
          onClick={() => setStep(6)}
          className="font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200 bg-wine text-cream cursor-pointer"
        >
          Revisar e finalizar →
        </button>
      </div>
    </div>
  )
}

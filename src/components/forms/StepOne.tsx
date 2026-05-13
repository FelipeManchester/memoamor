'use client'

import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'

export default function StepOne() {
  const { data, updateField, setStep } = useCreateFormStore()

  const canAdvance =
    data.nameA.trim().length >= 2 && data.nameB.trim().length >= 2 && data.startDate !== ''

  function handleAdvance() {
    if (!canAdvance) return
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho do passo */}
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-mauve mb-2">
          Passo 1 de 5
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Como vocês se chamam?
        </h1>
      </div>

      {/* Nomes */}
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="form-label">Nome 1 *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Ana"
            maxLength={30}
            value={data.nameA}
            onChange={(e) => updateField('nameA', e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="form-label">Nome 2 *</label>
          <input
            className="form-input"
            type="text"
            placeholder="Pedro"
            maxLength={30}
            value={data.nameB}
            onChange={(e) => updateField('nameB', e.target.value)}
          />
        </div>
      </div>

      {/* Data */}
      <div className="flex flex-col gap-2">
        <label className="form-label">Desde quando estão juntos? *</label>
        <input
          className="form-input"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          value={data.startDate}
          onChange={(e) => updateField('startDate', e.target.value)}
        />
      </div>

      {/* Título personalizado */}
      <div className="flex flex-col gap-2">
        <label className="form-label">
          Endereço da página
          <span className="text-mauve ml-1.5">(opcional)</span>
        </label>
        <div className="flex items-center gap-0">
          <span className="font-sans text-[0.85rem] text-mauve bg-blush border border-rose border-r-0 py-[10px] px-3 rounded-l-[2px] whitespace-nowrap">
            memoamor.app/p/
          </span>
          <input
            className="form-input rounded-l-none rounded-r-[2px] flex-1"
            type="text"
            placeholder="ana-e-pedro"
            maxLength={40}
            value={data.pageTitle}
            onChange={(e) =>
              updateField('pageTitle', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
            }
          />
        </div>
        <p className="text-[0.72rem] text-mauve">Se deixar em branco, geramos automaticamente.</p>
      </div>

      {/* Botão avançar */}
      <button
        onClick={handleAdvance}
        disabled={!canAdvance}
        className={cn(
          'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200 self-end',
          canAdvance ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
        )}
      >
        Continuar →
      </button>
    </div>
  )
}

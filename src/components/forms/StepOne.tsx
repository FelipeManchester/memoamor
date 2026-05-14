'use client'

import { useState, useEffect } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'

type SlugStatus = 'idle' | 'checking' | 'available' | 'taken'

export default function StepOne() {
  const { data, updateField, setStep } = useCreateFormStore()
  const isPremium = data.plan === 'premium'
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('idle')

  // Debounced slug availability check (premium + custom slug only)
  useEffect(() => {
    if (!isPremium || !data.pageTitle) {
      setSlugStatus('idle')
      return
    }
    setSlugStatus('checking')
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-slug?slug=${encodeURIComponent(data.pageTitle)}`)
        const json = await res.json()
        setSlugStatus(json.available ? 'available' : 'taken')
      } catch {
        setSlugStatus('idle')
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [data.pageTitle, isPremium])

  const slugOk =
    !isPremium || !data.pageTitle || (slugStatus === 'available' && data.pageTitle.length >= 3)

  const canAdvance =
    data.nameA.trim().length >= 2 &&
    data.nameB.trim().length >= 2 &&
    data.startDate !== '' &&
    slugOk &&
    slugStatus !== 'checking'

  function handleAdvance() {
    if (!canAdvance) return
    setStep(2)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
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

      {/* Frase da página */}
      <div className="flex flex-col gap-2">
        <label className="form-label">Frase da página</label>
        <textarea
          className="form-input resize-none"
          rows={3}
          maxLength={200}
          value={data.closingQuote ?? ''}
          onChange={(e) => updateField('closingQuote', e.target.value)}
          style={{ lineHeight: 1.6 }}
        />
        <p className="text-[0.72rem] text-mauve">{(data.closingQuote ?? '').length}/200 caracteres</p>
        <div className="flex flex-col gap-2">
          <p className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-text-muted">
            Sugestões
          </p>
          <div className="flex flex-col gap-2">
            {[
              'Amar é encontrar na felicidade do outro a própria felicidade.',
              'Você é o lar que eu sempre quis encontrar.',
              'O amor não se explica — apenas se sente.',
            ].map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => updateField('closingQuote', phrase)}
                className="text-left py-2 px-3 rounded-sm text-[0.78rem] text-text-muted transition-all duration-150 cursor-pointer border"
                style={{
                  background: (data.closingQuote ?? '') === phrase ? 'var(--color-blush)' : 'white',
                  borderColor:
                    (data.closingQuote ?? '') === phrase ? 'var(--color-wine)' : 'var(--color-rose)',
                  color:
                    (data.closingQuote ?? '') === phrase ? 'var(--color-wine)' : 'var(--color-text-muted)',
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Endereço da página */}
      <div className="flex flex-col gap-2">
        <label className="form-label">
          Endereço da página
          {isPremium ? (
            <span className="text-mauve ml-1.5">(opcional)</span>
          ) : (
            <span className="text-mauve ml-1.5">(gerado automaticamente)</span>
          )}
        </label>

        <div className="flex items-center">
          <span className="font-sans text-[0.85rem] text-mauve bg-blush border border-rose border-r-0 py-2.5 px-3 rounded-l-xs whitespace-nowrap">
            memoamor.app/p/
          </span>
          <input
            className={cn(
              'form-input rounded-l-none rounded-r-xs flex-1',
              !isPremium && 'bg-blush text-mauve cursor-not-allowed opacity-70',
              isPremium &&
                data.pageTitle &&
                slugStatus === 'taken' &&
                'border-[#c0392b] focus:border-[#c0392b]',
              isPremium &&
                data.pageTitle &&
                slugStatus === 'available' &&
                'border-[#16a34a] focus:border-[#16a34a]',
            )}
            type="text"
            placeholder={isPremium ? 'nome1-e-nome2' : 'gerado-automaticamente'}
            maxLength={40}
            disabled={!isPremium}
            value={isPremium ? data.pageTitle : ''}
            onChange={(e) =>
              isPremium &&
              updateField('pageTitle', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
            }
          />
        </div>

        {/* Status messages */}
        {!isPremium && (
          <p className="text-[0.72rem] text-mauve">
            Um endereço aleatório será gerado no momento do pagamento.
          </p>
        )}
        {isPremium && !data.pageTitle && (
          <p className="text-[0.72rem] text-mauve">Se deixar em branco, geramos automaticamente.</p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'checking' && (
          <p className="text-[0.72rem] text-mauve">Verificando disponibilidade…</p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'available' && (
          <p className="text-[0.72rem]" style={{ color: '#16a34a' }}>
            Link disponível!
          </p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'taken' && (
          <p className="text-[0.72rem]" style={{ color: '#c0392b' }}>
            Esse link está em uso.
          </p>
        )}
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <button onClick={() => setStep(0)} className="btn-ghost">
          ← Mudar plano
        </button>
        <button
          onClick={handleAdvance}
          disabled={!canAdvance}
          className={cn(
            'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200',
            canAdvance
              ? 'bg-wine text-cream cursor-pointer'
              : 'bg-blush text-mauve cursor-not-allowed',
          )}
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}

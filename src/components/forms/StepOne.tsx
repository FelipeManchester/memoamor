'use client'

import { useState, useEffect } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'
import DatePicker from './DatePicker'

type SlugStatus = 'idle' | 'checking' | 'available' | 'taken'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function StepOne() {
  const { data, updateField, setStep } = useCreateFormStore()
  const isPremium = data.plan === 'premium'
  const [slugStatus, setSlugStatus] = useState<SlugStatus>('idle')
  const [slugUserEdited, setSlugUserEdited] = useState(false)

  // Auto-fill slug from names when user hasn't manually edited
  useEffect(() => {
    if (!isPremium || slugUserEdited) return
    const a = toSlug(data.nameA)
    const b = toSlug(data.nameB)
    if (!a && !b) return
    const auto = a && b ? `${a}-e-${b}` : a || b
    updateField('pageTitle', auto)
  }, [data.nameA, data.nameB, isPremium, slugUserEdited])

  useEffect(() => {
    if (!isPremium || !data.pageTitle) {
      setSlugStatus('idle')
      return
    }
    setSlugStatus('checking')
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/check-slug?slug=${encodeURIComponent(data.pageTitle)}`,
          { signal: controller.signal },
        )
        const json = await res.json()
        setSlugStatus(json.available ? 'available' : 'taken')
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setSlugStatus('idle')
      }
    }, 600)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [data.pageTitle, isPremium])

  const today = new Date().toISOString().split('T')[0]

  const slugOk =
    !isPremium || !data.pageTitle || (slugStatus === 'available' && data.pageTitle.length >= 3)

  const canAdvance =
    data.nameA.trim().length >= 2 &&
    data.nameB.trim().length >= 2 &&
    data.startDate !== '' &&
    data.startDate <= today &&
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
          Passo 1 de 6
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
          <label htmlFor="nameA" className="form-label">
            Seu nome <span aria-label="obrigatório">*</span>
          </label>
          <input
            id="nameA"
            className="form-input"
            type="text"
            placeholder="Ana"
            maxLength={30}
            value={data.nameA}
            onChange={(e) => updateField('nameA', e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="nameB" className="form-label">
            Nome do(a) parceiro(a) <span aria-label="obrigatório">*</span>
          </label>
          <input
            id="nameB"
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
        <label className="form-label">
          Desde quando vocês estão juntos? <span aria-label="obrigatório">*</span>
        </label>
        <DatePicker
          value={data.startDate}
          onChange={(v) => updateField('startDate', v)}
          max={today}
        />
      </div>

      {/* Endereço da página */}
      <div className="flex flex-col gap-2">
        <label htmlFor="pageTitle" className="form-label">
          Endereço da página
          {isPremium ? (
            <span className="text-mauve ml-1.5">(opcional)</span>
          ) : (
            <span className="text-mauve ml-1.5">(apenas na versão premium)</span>
          )}
        </label>

        <div className="flex items-center">
          <span className="font-sans text-[0.85rem] text-mauve bg-blush border border-rose border-r-0 py-2.5 px-3 rounded-l-xs whitespace-nowrap">
            memoamor.app/p/
          </span>
          <input
            id="pageTitle"
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
            placeholder={isPremium ? 'ana-e-pedro' : ''}
            maxLength={40}
            disabled={!isPremium}
            value={isPremium ? data.pageTitle : (data.reservedSlug ?? '')}
            aria-describedby="pageTitle-helper"
            onChange={(e) => {
              if (!isPremium) return
              setSlugUserEdited(true)
              updateField('pageTitle', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
            }}
          />
        </div>

        {!isPremium && (
          <p id="pageTitle-helper" className="text-[0.72rem] text-mauve">
            Este será o seu endereço único. Gerado automaticamente.
          </p>
        )}
        {isPremium && !data.pageTitle && (
          <p id="pageTitle-helper" className="text-[0.72rem] text-mauve">
            Se deixar em branco, geramos automaticamente.
          </p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'checking' && (
          <p id="pageTitle-helper" className="text-[0.72rem] text-mauve">
            Verificando disponibilidade…
          </p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'available' && (
          <p id="pageTitle-helper" className="text-[0.72rem]" style={{ color: '#16a34a' }}>
            ✓ Link disponível!
          </p>
        )}
        {isPremium && data.pageTitle && slugStatus === 'taken' && (
          <p id="pageTitle-helper" className="text-[0.72rem]" style={{ color: '#c0392b' }}>
            Esse link já está em uso. Tente outro ♡
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
            'btn-primary',
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

'use client'

import { useState } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { TEMPLATES, PLANS } from '@/lib/constants'
import { generateBaseSlug } from '@/lib/slug'
import { cn } from '@/lib/utils'

export default function StepSix() {
  const { data, updateField, setStep } = useCreateFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEssential = data.plan === 'essential'
  const plan = PLANS.find((p) => p.id === data.plan)!
  const templateName = TEMPLATES.find((t) => t.id === data.template)?.name ?? '—'

  const previewSlug =
    !isEssential && data.nameA && data.nameB && data.startDate
      ? data.pageTitle || generateBaseSlug(data.nameA, data.nameB, data.startDate)
      : null

  const formattedDate = data.startDate
    ? new Date(data.startDate + 'T12:00:00').toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)
  const canSubmit = emailValid && !isSubmitting

  async function handleSubmit() {
    if (!canSubmit) return
    setIsSubmitting(true)
    setError(null)

    try {
      const pagesRes = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nameA: data.nameA,
          nameB: data.nameB,
          startDate: data.startDate,
          pageTitle: data.pageTitle,
          template: data.template,
          plan: data.plan,
          youtubeUrl: data.youtubeUrl,
          youtubeTitle: data.youtubeTitle,
          memories: data.memories,
          gallery: data.gallery,
          customerEmail: data.customerEmail,
        }),
      })

      const pagesJson = await pagesRes.json()
      if (pagesJson.error) throw new Error(pagesJson.error)

      const { slug } = pagesJson.data

      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          email: data.customerEmail,
          planId: data.plan,
        }),
      })

      const checkoutJson = await checkoutRes.json()
      if (checkoutJson.error) throw new Error(checkoutJson.error)

      window.location.href = checkoutJson.data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Passo 6 de 6
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Tudo certo?
        </h1>
        <p className="font-sans text-[0.82rem] text-text-muted mt-1">
          Dá uma última olhada. Você ainda pode editar tudo agora — e por mais 24h depois do pagamento ♡
        </p>
      </div>

      {/* Card 1 — O casal */}
      <div className="border border-rose rounded-sm bg-white p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
            O casal
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="font-sans text-[0.68rem] text-mauve underline cursor-pointer"
          >
            Editar
          </button>
        </div>

        <p className="font-serif text-[1.1rem] font-light text-wine">
          {data.nameA || '—'} ♡ {data.nameB || '—'}
        </p>

        <p className="font-sans text-[0.8rem] text-text-muted">Desde {formattedDate}</p>

        <p className="font-sans text-[0.75rem]">
          <span className="text-mauve">memoamor.app/p/</span>
          {previewSlug ? (
            <span className="text-wine">{previewSlug}</span>
          ) : (
            <span className="text-mauve italic">gerado automaticamente</span>
          )}
        </p>
      </div>

      {/* Card 2 — Memórias */}
      <div className="border border-rose rounded-sm bg-white p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
            Memórias ({data.memories.length})
          </p>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="font-sans text-[0.68rem] text-mauve underline cursor-pointer"
          >
            Editar
          </button>
        </div>

        {data.memories.length === 0 ? (
          <p className="font-sans text-[0.78rem] text-text-muted">Nenhuma memória adicionada.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.memories.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                {m.imagePreview ? (
                  <img
                    src={m.imagePreview}
                    alt=""
                    className="w-10 h-10 rounded-sm object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-sm bg-blush flex items-center justify-center shrink-0">
                    <span className="font-sans text-[0.7rem] text-mauve">{i + 1}</span>
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <p className="font-sans text-[0.8rem] text-text truncate">
                    {m.title || <span className="italic text-text-muted">Sem título</span>}
                  </p>
                  {m.dateLabel && (
                    <p className="font-sans text-[0.68rem] text-mauve">{m.dateLabel}</p>
                  )}
                  {m.body && (
                    <p className="font-sans text-[0.72rem] text-text-muted line-clamp-1">{m.body}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card 3 — Galeria */}
      <div className="border border-rose rounded-sm bg-white p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
            Galeria ({data.gallery.length > 0 ? `${data.gallery.length} foto${data.gallery.length > 1 ? 's' : ''}` : '0 fotos'})
          </p>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="font-sans text-[0.68rem] text-mauve underline cursor-pointer"
          >
            Editar
          </button>
        </div>

        {data.gallery.length === 0 ? (
          <p className="font-sans text-[0.78rem] text-text-muted">Nenhuma foto adicionada.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.gallery.map((g) =>
              g.preview ? (
                <img
                  key={g.id}
                  src={g.preview}
                  alt=""
                  className="w-14 h-14 rounded-sm object-cover"
                />
              ) : (
                <div
                  key={g.id}
                  className="w-14 h-14 rounded-sm bg-blush"
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* Card 4 — Detalhes */}
      <div className="border border-rose rounded-sm bg-white p-5 flex flex-col gap-3">
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted">
          Detalhes
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.72rem] text-mauve w-14 shrink-0">Música</span>
            <span className="font-sans text-[0.8rem] text-text truncate">
              {data.youtubeTitle ?? (data.youtubeUrl ? 'Link adicionado' : 'Sem música')}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="font-sans text-[0.68rem] text-mauve underline cursor-pointer shrink-0 ml-3"
          >
            Editar
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[0.72rem] text-mauve w-14 shrink-0">Tema</span>
            <span className="font-sans text-[0.8rem] text-text">{templateName}</span>
          </div>
          <button
            type="button"
            onClick={() => setStep(5)}
            className="font-sans text-[0.68rem] text-mauve underline cursor-pointer shrink-0 ml-3"
          >
            Editar
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-sans text-[0.72rem] text-mauve w-14 shrink-0">Plano</span>
          <span className="font-sans text-[0.8rem] text-text">
            {plan.name} · R$ {(plan.priceInCents / 100).toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* E-mail */}
      <div className="flex flex-col gap-2">
        <label className="form-label">Seu e-mail *</label>
        <input
          className="form-input"
          style={{
            borderColor: data.customerEmail && !emailValid ? '#c0392b' : 'var(--color-rose)',
          }}
          type="email"
          placeholder="seuemail@email.com"
          value={data.customerEmail}
          onChange={(e) => updateField('customerEmail', e.target.value)}
        />
        <p className="text-[0.72rem] text-text-muted">
          Você receberá o link e um <strong>QR Code</strong> por e-mail após o pagamento.
        </p>
      </div>

      {/* Erro */}
      {error && (
        <p
          className="font-sans text-[0.8rem] py-3 px-4 rounded-sm border"
          style={{ color: '#c0392b', background: '#fdf0f0', borderColor: '#f5c6c6' }}
        >
          {error}
        </p>
      )}

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <button onClick={() => setStep(5)} className="btn-ghost">
          ← Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={cn(
            'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200',
            canSubmit ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
          )}
        >
          {isSubmitting
            ? 'Processando...'
            : `Pagar R$ ${(plan.priceInCents / 100).toFixed(2).replace('.', ',')} e criar a página ♡`}
        </button>
      </div>
    </div>
  )
}

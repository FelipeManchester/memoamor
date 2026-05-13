'use client'

import { useState } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { TEMPLATES, PLANS } from '@/lib/constants'
import { generateBaseSlug } from '@/lib/slug'
import type { TemplateId } from '@/types'
import { cn } from '@/lib/utils'

export default function StepFive() {
  const { data, setTemplate, updateField, setStep } = useCreateFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plan = PLANS.find((p) => p.id === data.plan)!

  const previewSlug =
    data.nameA && data.nameB && data.startDate
      ? data.pageTitle || generateBaseSlug(data.nameA, data.nameB, data.startDate)
      : 'sua-pagina'

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

      console.log('[checkout status]', checkoutRes.status)
      const checkoutJson = await checkoutRes.json()
      console.log('[checkout response]', checkoutJson)
      console.log('[checkout response]', checkoutJson)
      if (checkoutJson.error) throw new Error(checkoutJson.error)

      window.location.href = checkoutJson.data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho */}
      <div>
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-mauve mb-2">
          Passo 5 de 5
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Escolha o tema da sua página
        </h1>
      </div>

      {/* Seletor de templates */}
      <div className="flex flex-col gap-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id as TemplateId)}
            className="flex items-center justify-between py-4 px-5 rounded-sm transition-all duration-200 cursor-pointer text-left"
            style={{
              border: `1px solid ${data.template === template.id ? 'var(--color-wine)' : 'var(--color-rose)'}`,
              background: data.template === template.id ? 'var(--color-blush)' : 'white',
            }}
          >
            <div>
              <p className="font-sans text-[0.85rem] text-text mb-0.5">{template.name}</p>
              <p className="font-sans text-[0.72rem] text-mauve">{template.description}</p>
            </div>
            {data.template === template.id && <span className="text-wine">✓</span>}
          </button>
        ))}
      </div>

      {/* Resumo */}
      <div className="border border-rose rounded flex flex-col gap-[10px] p-5 bg-white">
        <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-mauve mb-2">
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
          <p className="font-sans text-[0.82rem] text-wine">
            memoamor.app/p/{previewSlug}
          </p>
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
        <p className="text-[0.72rem] text-mauve">
          Você receberá o link da página por e-mail após o pagamento.
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
        <button onClick={() => setStep(4)} className="btn-ghost">
          ← Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={cn(
            'font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200 flex items-center gap-2',
            canSubmit ? 'bg-wine text-cream cursor-pointer' : 'bg-blush text-mauve cursor-not-allowed',
          )}
        >
          {isSubmitting
            ? 'Processando...'
            : `Criar página · R$ ${(plan.priceInCents / 100).toFixed(2).replace('.', ',')}`}
        </button>
      </div>
    </div>
  )
}

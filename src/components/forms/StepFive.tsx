'use client'

import { useState } from 'react'
import { useCreateFormStore } from '@/store/createForm'
import { TEMPLATES, PLANS } from '@/lib/constants'
import { generateBaseSlug } from '@/lib/slug'
import type { TemplateId } from '@/types'

export default function StepFive() {
  const { data, setTemplate, updateField, setStep } = useCreateFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plan = PLANS.find((p) => p.id === data.plan)!

  // Gera o slug de preview baseado nos nomes e data
  const previewSlug =
    data.nameA && data.nameB && data.startDate
      ? data.pageTitle || generateBaseSlug(data.nameA, data.nameB, data.startDate)
      : 'sua-pagina'

  // Valida e-mail simples
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)
  const canSubmit = emailValid && !isSubmitting

  async function handleSubmit() {
    if (!canSubmit) return
    setIsSubmitting(true)
    setError(null)

    try {
      // 1. Salva os dados no banco
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

      // 2. Cria sessão de checkout
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

      // 3. Redireciona para o checkout
      window.location.href = checkoutJson.data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo deu errado. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Cabeçalho */}
      <div>
        <p style={eyebrowStyle}>Passo 5 de 5</p>
        <h1 style={titleStyle}>Escolha o tema da sua página</h1>
      </div>

      {/* Seletor de templates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setTemplate(template.id as TemplateId)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              border: `1px solid ${data.template === template.id ? 'var(--color-wine)' : 'var(--color-rose)'}`,
              borderRadius: 2,
              background: data.template === template.id ? 'var(--color-blush)' : 'white',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  color: 'var(--color-text)',
                  marginBottom: 2,
                }}
              >
                {template.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.72rem',
                  color: 'var(--color-mauve)',
                }}
              >
                {template.description}
              </p>
            </div>
            {data.template === template.id && <span style={{ color: 'var(--color-wine)' }}>✓</span>}
          </button>
        ))}
      </div>

      {/* Resumo */}
      <div
        style={{
          border: '1px solid var(--color-rose)',
          borderRadius: 4,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'white',
        }}
      >
        <p style={eyebrowStyle}>Resumo</p>

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
          <div
            key={item.label}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                color: 'var(--color-mauve)',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                color: 'var(--color-text)',
              }}
            >
              {item.value}
            </span>
          </div>
        ))}

        {/* URL da página */}
        <div
          style={{
            marginTop: 8,
            paddingTop: 12,
            borderTop: '1px solid var(--color-blush)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-mauve)',
              marginBottom: 4,
            }}
          >
            Sua página ficará em:
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: 'var(--color-wine)',
            }}
          >
            memoamor.app/p/{previewSlug}
          </p>
        </div>
      </div>

      {/* E-mail */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>Seu e-mail *</label>
        <input
          style={{
            ...inputStyle,
            borderColor: data.customerEmail && !emailValid ? '#c0392b' : 'var(--color-rose)',
          }}
          type="email"
          placeholder="seuemail@email.com"
          value={data.customerEmail}
          onChange={(e) => updateField('customerEmail', e.target.value)}
        />
        <p style={{ fontSize: '0.72rem', color: 'var(--color-mauve)' }}>
          Você receberá o link da página por e-mail após o pagamento.
        </p>
      </div>

      {/* Erro */}
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            color: '#c0392b',
            padding: '12px 16px',
            background: '#fdf0f0',
            borderRadius: 2,
            border: '1px solid #f5c6c6',
          }}
        >
          {error}
        </p>
      )}

      {/* Navegação */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setStep(4)} style={ghostButtonStyle}>
          ← Voltar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            ...primaryButtonStyle(canSubmit),
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {isSubmitting
            ? 'Processando...'
            : `Criar página · R$ ${(plan.priceInCents / 100).toFixed(2).replace('.', ',')}`}
        </button>
      </div>
    </div>
  )
}

// ── Estilos ───────────────────────────────────
const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.65rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'var(--color-mauve)',
  marginBottom: 8,
}

const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-serif)',
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 300,
  fontStyle: 'italic',
  color: 'var(--color-wine)',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  color: 'var(--color-text)',
}

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
  color: 'var(--color-text)',
  background: 'white',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

const ghostButtonStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  background: 'transparent',
  border: '1px solid var(--color-rose)',
  borderRadius: 2,
  padding: '10px 20px',
  color: 'var(--color-mauve)',
  cursor: 'pointer',
}

const primaryButtonStyle = (enabled: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-sans)',
  fontSize: '0.72rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  padding: '16px 32px',
  background: enabled ? 'var(--color-wine)' : 'var(--color-blush)',
  color: enabled ? 'var(--color-cream)' : 'var(--color-mauve)',
  border: 'none',
  borderRadius: 2,
  cursor: enabled ? 'pointer' : 'not-allowed',
  transition: 'all 0.2s',
})

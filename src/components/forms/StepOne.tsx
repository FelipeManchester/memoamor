'use client'

import { useCreateFormStore } from '@/store/createForm'

export default function StepOne() {
  const { data, updateField, setStep } = useCreateFormStore()

  // Valida se pode avançar — nomes e data obrigatórios
  const canAdvance =
    data.nameA.trim().length >= 2 && data.nameB.trim().length >= 2 && data.startDate !== ''

  function handleAdvance() {
    if (!canAdvance) return
    setStep(2)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Cabeçalho do passo */}
      <div>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-mauve)',
            marginBottom: 8,
          }}
        >
          Passo 1 de 5
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--color-wine)',
          }}
        >
          Como vocês se chamam?
        </h1>
      </div>

      {/* Nomes */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>Nome 1 *</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Ana"
            maxLength={30}
            value={data.nameA}
            onChange={(e) => updateField('nameA', e.target.value)}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={labelStyle}>Nome 2 *</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Pedro"
            maxLength={30}
            value={data.nameB}
            onChange={(e) => updateField('nameB', e.target.value)}
          />
        </div>
      </div>

      {/* Data */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>Desde quando estão juntos? *</label>
        <input
          style={inputStyle}
          type="date"
          max={new Date().toISOString().split('T')[0]}
          value={data.startDate}
          onChange={(e) => updateField('startDate', e.target.value)}
        />
      </div>

      {/* Título personalizado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label style={labelStyle}>
          Endereço da página
          <span style={{ color: 'var(--color-mauve)', marginLeft: 6 }}>(opcional)</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--color-mauve)',
              background: 'var(--color-blush)',
              border: '1px solid var(--color-rose)',
              borderRight: 'none',
              padding: '10px 12px',
              borderRadius: '2px 0 0 2px',
              whiteSpace: 'nowrap',
            }}
          >
            memoamor.app/p/
          </span>
          <input
            style={{
              ...inputStyle,
              borderRadius: '0 2px 2px 0',
              flex: 1,
            }}
            type="text"
            placeholder="ana-e-pedro"
            maxLength={40}
            value={data.pageTitle}
            onChange={(e) =>
              updateField('pageTitle', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))
            }
          />
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--color-mauve)' }}>
          Se deixar em branco, geramos automaticamente.
        </p>
      </div>

      {/* Botão avançar */}
      <button
        onClick={handleAdvance}
        disabled={!canAdvance}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          padding: '16px 32px',
          background: canAdvance ? 'var(--color-wine)' : 'var(--color-blush)',
          color: canAdvance ? 'var(--color-cream)' : 'var(--color-mauve)',
          border: 'none',
          borderRadius: 2,
          cursor: canAdvance ? 'pointer' : 'not-allowed',
          transition: 'all 0.2s',
          alignSelf: 'flex-end',
        }}
      >
        Continuar →
      </button>
    </div>
  )
}

// Estilos reutilizáveis
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

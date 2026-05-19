'use client'

import { useCreateFormStore } from '@/store/createForm'
import { PLANS } from '@/lib/constants'
import type { PlanId } from '@/types'

type Feature = { text: string; upgrade?: string }

const PLAN_FEATURES: Record<PlanId, Feature[]> = {
  essential: [
    { text: '1 página' },
    { text: 'Até 3 memórias' },
    { text: 'Galeria com até 5 fotos' },
    { text: 'Player de música' },
    { text: '1 tema visual (Pétalas)' },
    { text: 'Contador de tempo' },
    { text: 'Link único gerado automaticamente' },
    { text: 'Página no ar 1 ano' },
    { text: "Marca d'água discreta" },
  ],
  premium: [
    { text: '1 página' },
    { text: 'Até 6 memórias', upgrade: '2×' },
    { text: 'Galeria com até 10 fotos', upgrade: '2×' },
    { text: 'Player de música' },
    { text: '3 temas visuais', upgrade: 'novo' },
    { text: 'Contador de tempo' },
    { text: 'URL personalizada', upgrade: 'exclusivo' },
    { text: 'Página no ar 1 ano' },
    { text: "Sem marca d'água", upgrade: 'exclusivo' },
  ],
}

const PREMIUM_HIGHLIGHTS = ['2× memórias', '2× fotos', 'URL própria', 'Sem logo']

export default function PlanSelector() {
  const { data, setPlan, setTemplate, updateField, setStep } = useCreateFormStore()

  function selectPlan(planId: PlanId) {
    setPlan(planId)
    if (planId === 'essential') {
      updateField('pageTitle', '')
      setTemplate('petals')
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-2">
          Antes de começar
        </p>
        <h1
          className="font-serif font-light italic text-wine"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
        >
          Escolha seu plano
        </h1>
        <p className="font-sans text-[0.85rem] text-text-muted mt-2 leading-[1.7]">
          Pagamento único, sem assinatura e sem surpresas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 items-end">
        {/* ── Essencial ── */}
        {(() => {
          const plan = PLANS.find((p) => p.id === 'essential')!
          const isSelected = data.plan === 'essential'
          return (
            <button
              onClick={() => selectPlan('essential')}
              className="text-left rounded-l-lg rounded-r-none max-sm:rounded-lg max-sm:rounded-b-none relative overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                border: isSelected ? '2px solid var(--color-wine)' : '1px solid var(--color-rose)',
                background: 'var(--surface-card)',
                padding: 'clamp(20px, 3vw, 28px)',
              }}
            >
              <p className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-mauve mb-2">
                Essencial
              </p>

              <p
                className="font-serif font-light leading-none text-wine mb-5"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}
              >
                R$ {(plan.priceInCents / 100).toFixed(2).replace('.', ',')}
              </p>

              <ul className="list-none flex flex-col gap-[10px]">
                {PLAN_FEATURES.essential.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-sans text-[0.8rem] leading-[1.5] text-text"
                  >
                    <span className="shrink-0 mt-px text-[0.72rem] text-mauve">✓</span>
                    {f.text}
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div className="mt-5 pt-3 border-t border-rose flex items-center gap-1.5 font-sans text-[0.68rem] tracking-[0.12em] uppercase text-wine">
                  <span>✓</span> Selecionado
                </div>
              )}
            </button>
          )
        })()}

        {/* ── Premium ── */}
        {(() => {
          const plan = PLANS.find((p) => p.id === 'premium')!
          const isSelected = data.plan === 'premium'
          return (
            <button
              onClick={() => selectPlan('premium')}
              className="text-left rounded-lg max-sm:rounded-t-none relative overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                background: 'var(--surface-card)',
                border: isSelected ? '2px solid var(--color-wine)' : '1px solid var(--color-rose)',
                padding: 'clamp(20px, 3vw, 32px)',
                boxShadow: '0 4px 16px var(--shadow-soft)',
              }}
            >
              {/* Popular badge */}
              <div
                className="absolute top-4 right-4 rounded-full px-3 py-1 font-sans text-[0.6rem] tracking-[0.15em] uppercase"
                style={{
                  background: 'var(--color-rose)',
                  color: 'var(--color-wine)',
                }}
              >
                Popular
              </div>

              <p className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-mauve mb-2">
                Premium
              </p>

              <p
                className="font-serif font-light leading-none text-wine mb-1"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                R$ {(plan.priceInCents / 100).toFixed(2).replace('.', ',')}
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {PREMIUM_HIGHLIGHTS.map((h) => (
                  <span
                    key={h}
                    className="font-sans text-[0.58rem] tracking-[0.06em] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'var(--color-blush)',
                      color: 'var(--color-wine)',
                      border: '1px solid var(--color-rose)',
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="h-px mb-4" style={{ background: 'var(--color-blush)' }} />

              <ul className="list-none flex flex-col gap-[10px]">
                {PLAN_FEATURES.premium.map((f, i) => {
                  const isUpgrade = !!f.upgrade
                  return (
                    <li
                      key={i}
                      className="flex items-center gap-2 font-sans text-[0.8rem] leading-[1.5] text-text"
                      style={{ fontWeight: isUpgrade ? 600 : 400 }}
                    >
                      <span className="shrink-0 text-[0.72rem] text-mauve">✓</span>
                      <span className="flex-1">{f.text}</span>
                      {f.upgrade && (
                        <span
                          className="font-sans text-[0.55rem] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded-sm shrink-0"
                          style={{
                            background: 'var(--color-blush)',
                            color: 'var(--color-wine)',
                            border: '1px solid var(--color-rose)',
                          }}
                        >
                          {f.upgrade}
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>

              {isSelected && (
                <div className="mt-5 pt-3 border-t border-rose flex items-center gap-1.5 font-sans text-[0.68rem] tracking-[0.12em] uppercase text-wine">
                  <span>✓</span> Selecionado
                </div>
              )}
            </button>
          )
        })()}
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => setStep(1)}
          className="btn-primary bg-wine text-cream cursor-pointer hover:opacity-[0.88]"
        >
          Continuar →
        </button>
        <p className="font-sans text-[0.68rem] text-mauve">Renovação por R$ 9,90/ano</p>
      </div>
    </div>
  )
}

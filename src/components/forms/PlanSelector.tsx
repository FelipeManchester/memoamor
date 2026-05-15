'use client'

import { useCreateFormStore } from '@/store/createForm'
import { PLANS } from '@/lib/constants'
import type { PlanId } from '@/types'

const PLAN_FEATURES: Record<PlanId, string[]> = {
  essential: [
    '1 página',
    'Até 3 memórias',
    'Galeria com até 5 fotos',
    'Player de música',
    '1 tema visual (Pétalas)',
    'Contador de tempo',
    'Link único gerado automaticamente',
    'Página no ar 1 ano',
    "Marca d'água discreta",
  ],
  premium: [
    '1 página',
    'Até 6 memórias',
    'Galeria com até 10 fotos',
    'Player de música',
    '3 temas visuais',
    'Contador de tempo',
    'URL personalizada',
    'Página no ar 1 ano',
    "Sem marca d'água",
  ],
}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLANS.map((plan) => {
          const isSelected = data.plan === plan.id
          const isPremium = plan.id === 'premium'
          const features = PLAN_FEATURES[plan.id]

          return (
            <button
              key={plan.id}
              onClick={() => selectPlan(plan.id)}
              className="text-left rounded-lg relative overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                border: isSelected
                  ? '2px solid var(--color-wine)'
                  : '1px solid var(--color-rose)',
                background:
                  isPremium && isSelected
                    ? 'var(--color-wine)'
                    : isSelected
                    ? 'var(--color-blush)'
                    : 'white',
                padding: 'clamp(20px, 3vw, 28px)',
              }}
            >
              {isPremium && (
                <div
                  className="absolute top-4 right-4 rounded-full px-3 py-1 font-sans text-[0.6rem] tracking-[0.15em] uppercase"
                  style={{
                    background: isSelected ? 'rgba(242,221,213,0.18)' : 'var(--color-rose)',
                    color: isSelected ? 'var(--color-rose)' : 'var(--color-wine)',
                  }}
                >
                  Popular
                </div>
              )}

              <p
                className="font-sans text-[0.7rem] tracking-[0.25em] uppercase mb-2"
                style={{
                  color: isPremium && isSelected ? 'var(--color-rose)' : 'var(--color-mauve)',
                }}
              >
                {plan.name}
              </p>

              <p
                className="font-serif font-light leading-none mb-5"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  color: isPremium && isSelected ? 'var(--color-cream)' : 'var(--color-wine)',
                }}
              >
                R$ {(plan.priceInCents / 100).toFixed(2).replace('.', ',')}
              </p>

              <ul className="list-none flex flex-col gap-[10px]">
                {features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-sans text-[0.8rem] leading-[1.5]"
                    style={{
                      color: isPremium && isSelected ? 'var(--color-blush)' : 'var(--color-text)',
                    }}
                  >
                    <span
                      className="shrink-0 mt-px text-[0.72rem]"
                      style={{
                        color: isPremium && isSelected ? 'var(--color-rose)' : 'var(--color-mauve)',
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {isSelected && (
                <div
                  className="mt-5 pt-3 border-t flex items-center gap-1.5 font-sans text-[0.68rem] tracking-[0.12em] uppercase"
                  style={{
                    borderColor: isPremium ? 'rgba(242,221,213,0.2)' : 'var(--color-rose)',
                    color: isPremium ? 'var(--color-rose)' : 'var(--color-wine)',
                  }}
                >
                  <span>✓</span> Selecionado
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => setStep(1)}
          className="font-sans text-[0.72rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200 bg-wine text-cream cursor-pointer hover:opacity-[0.88]"
        >
          Continuar →
        </button>
        <p className="font-sans text-[0.68rem] text-mauve">
          Renovação por R$ 9,90/ano
        </p>
      </div>
    </div>
  )
}

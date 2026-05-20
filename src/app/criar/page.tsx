'use client'

import { useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'
import type { PlanId } from '@/types'

import PlanSelector from '@/components/forms/PlanSelector'
import StepOne from '@/components/forms/StepOne'
import StepTwo from '@/components/forms/StepTwo'
import StepThree from '@/components/forms/StepThree'
import StepFour from '@/components/forms/StepFour'
import StepSix from '@/components/forms/StepSix'

const STEPS = ['O casal', 'Memórias', 'Galeria', 'Música & Tema', 'Revisão']
const VALID_PLANS: PlanId[] = ['essential', 'premium']

function PlanFromUrl() {
  const searchParams = useSearchParams()
  const setPlan = useCreateFormStore((s) => s.setPlan)
  const applied = useRef(false)

  useEffect(() => {
    if (applied.current) return
    applied.current = true
    const plan = searchParams.get('plan') as PlanId | null
    if (plan && VALID_PLANS.includes(plan)) {
      setPlan(plan)
    }
  }, [searchParams, setPlan])

  return null
}

export default function CriarPage() {
  const currentStep = useCreateFormStore((s) => s.currentStep)

  return (
    <main className="theme-midnight min-h-svh bg-cream text-text flex flex-col">
      <Suspense fallback={null}>
        <PlanFromUrl />
      </Suspense>
      {/* Header com logo e progresso */}
      <header className="py-5 px-6 border-b border-blush flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-[1.75rem] text-wine no-underline leading-none"
            style={{ fontFamily: 'var(--font-logo)' }}
          >
            Memoamor
          </a>
          {currentStep > 1 && (
            <span className="font-sans text-[0.65rem] text-mauve">
              ✓ Salvo automaticamente
            </span>
          )}
        </div>

        {/* Barra de progresso — oculta na seleção de plano */}
        {currentStep > 0 && (
          <div className="flex gap-2 items-center">
            {STEPS.map((label, i) => {
              const step = i + 1
              const isDone = currentStep > step
              const isActive = currentStep === step

              return (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-sans transition-all duration-300',
                        isDone || isActive ? 'bg-wine text-cream' : 'bg-blush text-mauve',
                      )}
                    >
                      {isDone ? '✓' : step}
                    </div>
                    <span
                      className={cn(
                        'text-[0.55rem] tracking-[0.1em] uppercase whitespace-nowrap',
                        isActive ? 'text-wine' : 'text-mauve',
                      )}
                    >
                      {label}
                    </span>
                  </div>

                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        'flex-1 h-px mb-[18px] transition-[background] duration-300',
                        currentStep > step ? 'bg-wine' : 'bg-blush',
                      )}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </header>

      {/* Conteúdo do passo atual */}
      <div
        className="flex-1 flex items-start justify-center px-6"
        style={{ padding: 'clamp(32px, 6vw, 80px) 24px' }}
      >
        <div className="w-full max-w-[560px]">
          {currentStep === 0 && <PlanSelector />}
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour />}
          {currentStep === 5 && <StepSix />}
        </div>
      </div>
    </main>
  )
}

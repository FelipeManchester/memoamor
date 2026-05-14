'use client'

import { useCreateFormStore } from '@/store/createForm'
import { cn } from '@/lib/utils'

import PlanSelector from '@/components/forms/PlanSelector'
import StepOne from '@/components/forms/StepOne'
import StepTwo from '@/components/forms/StepTwo'
import StepThree from '@/components/forms/StepThree'
import StepFour from '@/components/forms/StepFour'
import StepFive from '@/components/forms/StepFive'
import StepSix from '@/components/forms/StepSix'

const STEPS = ['O casal', 'Memórias', 'Galeria', 'Música', 'Tema', 'Revisão']

export default function CriarPage() {
  const currentStep = useCreateFormStore((s) => s.currentStep)

  return (
    <main className="min-h-svh bg-cream flex flex-col">
      {/* Header com logo e progresso */}
      <header className="py-5 px-6 border-b border-blush flex flex-col gap-4">
        <a href="/" className="font-serif text-[1.3rem] italic text-wine no-underline">
          Memoamor
        </a>

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
          {currentStep === 5 && <StepFive />}
          {currentStep === 6 && <StepSix />}
        </div>
      </div>
    </main>
  )
}

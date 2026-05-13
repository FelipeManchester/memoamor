'use client'

import { useCreateFormStore } from '@/store/createForm'

import StepOne from '@/components/forms/StepOne'
import StepTwo from '@/components/forms/StepTwo'
import StepThree from '@/components/forms/StepThree'
import StepFour from '@/components/forms/StepFour'
import StepFive from '@/components/forms/StepFive'

const STEPS = ['O casal', 'Memórias', 'Galeria', 'Música', 'Tema']

export default function CriarPage() {
  const currentStep = useCreateFormStore((s) => s.currentStep)

  return (
    <main
      style={{
        minHeight: '100svh',
        background: 'var(--color-cream)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header com logo e progresso */}
      <header
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--color-blush)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: 'var(--color-wine)',
            textDecoration: 'none',
          }}
        >
          Memoamor
        </a>

        {/* Barra de progresso */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {STEPS.map((label, i) => {
            const step = i + 1
            const isDone = currentStep > step
            const isActive = currentStep === step

            return (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <div
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-sans)',
                      background: isDone || isActive ? 'var(--color-wine)' : 'var(--color-blush)',
                      color: isDone || isActive ? 'var(--color-cream)' : 'var(--color-mauve)',
                      transition: 'all 0.3s',
                    }}
                  >
                    {isDone ? '✓' : step}
                  </div>
                  <span
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--color-wine)' : 'var(--color-mauve)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {label}
                  </span>
                </div>

                {/* Linha conectora */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: 1,
                      marginBottom: 18,
                      background: currentStep > step ? 'var(--color-wine)' : 'var(--color-blush)',
                      transition: 'background 0.3s',
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </header>

      {/* Conteúdo do passo atual */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 'clamp(32px, 6vw, 80px) 24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 560 }}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour />}
          {currentStep === 5 && <StepFive />}
          {/* Demais passos serão adicionados aqui */}
        </div>
      </div>
    </main>
  )
}

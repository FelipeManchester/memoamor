'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function ContatoPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main
      className="theme-midnight min-h-svh bg-cream text-text"
      style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)' }}
    >
      <div className="max-w-[560px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <a
            href="/"
            className="font-serif text-[1.2rem] italic text-wine no-underline block mb-10"
          >
            Memoamor
          </a>
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-3">
            Fale conosco
          </p>
          <h1
            className="font-serif font-light italic text-wine mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Como podemos ajudar?
          </h1>
          <p className="font-sans text-[0.88rem] text-text-muted leading-[1.8]">
            Respondemos em até 1 dia útil. Para dúvidas rápidas, consulte o{' '}
            <a href="/#faq" className="text-wine no-underline">
              FAQ
            </a>
            .
          </p>
        </div>

        {/* Formulário ou confirmação */}
        {status === 'sent' ? (
          <div
            className="text-center py-12 px-6 border border-rose rounded-lg"
            style={{ background: 'var(--surface-card)' }}
          >
            <span className="text-[2rem] block mb-4">♡</span>
            <h2 className="font-serif text-[1.5rem] italic font-light text-wine mb-3">
              Mensagem enviada!
            </h2>
            <p className="font-sans text-[0.88rem] text-text-muted leading-[1.8]">
              Recebemos sua mensagem e responderemos em breve no e-mail{' '}
              <strong>{formData.email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label className="form-label">Nome *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Seu nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* E-mail */}
            <div className="flex flex-col gap-2">
              <label className="form-label">E-mail *</label>
              <input
                className="form-input"
                type="email"
                placeholder="seuemail@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-2">
              <label className="form-label">Mensagem *</label>
              <textarea
                className="form-input min-h-[140px] resize-y"
                placeholder="Como podemos ajudar?"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Erro */}
            {status === 'error' && (
              <p
                className="font-sans text-[0.82rem] py-3 px-4 rounded-sm border"
                style={{ color: '#c0392b', background: '#fdf0f0', borderColor: '#f5c6c6' }}
              >
                Algo deu errado. Tente novamente ou envie um e-mail para{' '}
                <a href="mailto:contato@memoamor.app" style={{ color: '#c0392b' }}>
                  contato@memoamor.app
                </a>
              </p>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={cn(
                'font-sans text-[0.75rem] tracking-[0.2em] uppercase py-4 px-8 border-none rounded-sm transition-all duration-200 self-end',
                status === 'sending' ? 'bg-blush text-mauve cursor-not-allowed' : 'bg-wine text-cream cursor-pointer',
              )}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensagem →'}
            </button>
          </form>
        )}

        {/* Contato direto */}
        <div className="mt-10 pt-8 border-t border-blush text-center">
          <p className="font-sans text-[0.78rem] text-text-muted">
            Prefere e-mail direto?{' '}
            <a href="mailto:contato@memoamor.app" className="text-wine no-underline">
              contato@memoamor.app
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

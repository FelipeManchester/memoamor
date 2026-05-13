'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

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
      style={{
        minHeight: '100svh',
        background: 'var(--color-cream)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: 40,
            }}
          >
            Memoamor
          </a>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              marginBottom: 12,
            }}
          >
            Fale conosco
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
              marginBottom: 16,
            }}
          >
            Como podemos ajudar?
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.88rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            Respondemos em até 1 dia útil. Para dúvidas rápidas, consulte o{' '}
            <a href="/#faq" style={{ color: 'var(--color-wine)', textDecoration: 'none' }}>
              FAQ
            </a>
            .
          </p>
        </div>

        {/* Formulário ou confirmação */}
        {status === 'sent' ? (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              border: '1px solid var(--color-rose)',
              borderRadius: 8,
              background: 'white',
            }}
          >
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: 16 }}>♡</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--color-wine)',
                marginBottom: 12,
              }}
            >
              Mensagem enviada!
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.8,
              }}
            >
              Recebemos sua mensagem e responderemos em breve no e-mail{' '}
              <strong>{formData.email}</strong>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Nome */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>Nome *</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="Seu nome"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* E-mail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>E-mail *</label>
              <input
                style={inputStyle}
                type="email"
                placeholder="seuemail@email.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Mensagem */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={labelStyle}>Mensagem *</label>
              <textarea
                style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                placeholder="Como podemos ajudar?"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Erro */}
            {status === 'error' && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  color: '#c0392b',
                  padding: '12px 16px',
                  background: '#fdf0f0',
                  borderRadius: 2,
                  border: '1px solid #f5c6c6',
                }}
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
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '16px 32px',
                background: status === 'sending' ? 'var(--color-blush)' : 'var(--color-wine)',
                color: status === 'sending' ? 'var(--color-mauve)' : 'var(--color-cream)',
                border: 'none',
                borderRadius: 2,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                alignSelf: 'flex-end',
              }}
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar mensagem →'}
            </button>
          </form>
        )}

        {/* Contato direto */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 32,
            borderTop: '1px solid var(--color-blush)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--color-mauve)',
            }}
          >
            Prefere e-mail direto?{' '}
            <a
              href="mailto:contato@memoamor.app"
              style={{ color: 'var(--color-wine)', textDecoration: 'none' }}
            >
              contato@memoamor.app
            </a>
          </p>
        </div>
      </div>
    </main>
  )
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
}

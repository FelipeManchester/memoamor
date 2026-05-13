'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'A página fica no ar para sempre?',
    answer:
      'A página fica no ar por 1 ano a partir da data de criação. Você receberá um aviso 30 dias antes do vencimento para renovar por apenas R$ 9,90/ano. Após o vencimento, a página entra em modo pausado por 30 dias antes de ser removida — tempo suficiente para renovar sem perder nada.',
  },
  {
    question: 'Posso pagar com PIX?',
    answer:
      'Sim! Aceitamos PIX e cartão de crédito. O PIX é processado instantaneamente — sua página fica no ar em segundos após a confirmação.',
  },
  {
    question: 'Posso editar a página depois de criar?',
    answer:
      'No momento não é possível editar após a criação. Por isso o formulário tem um resumo completo antes do pagamento — você confirma tudo antes de finalizar. Em breve vamos adicionar a opção de edição.',
  },
  {
    question: 'Como o destinatário acessa a página?',
    answer:
      'Basta abrir o link no celular ou computador — sem precisar baixar nada, criar conta ou instalar nenhum aplicativo. Funciona em qualquer browser moderno.',
  },
  {
    question: 'As fotos ficam seguras?',
    answer:
      'Sim. As fotos são armazenadas em servidores seguros e só são acessíveis através do link da sua página. Não compartilhamos seus dados com terceiros.',
  },
  {
    question: 'Posso criar mais de uma página?',
    answer:
      'Sim! Cada criação é independente. Você pode criar quantas páginas quiser — para datas diferentes, casais diferentes ou como presente para amigos.',
  },
  {
    question: 'O que acontece se eu não renovar?',
    answer:
      'Após 1 ano, você receberá dois avisos por e-mail. Se não renovar, a página entra em modo pausado por 30 dias. Depois desse período, ela sai do ar — mas os dados ficam no sistema por mais 60 dias caso queira reativar.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section
      style={{
        background: 'var(--color-light)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--color-mauve)',
              marginBottom: 16,
            }}
          >
            Dúvidas frequentes
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
            }}
          >
            Perguntas e respostas
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px solid var(--color-rose)',
                borderBottom: i === faqs.length - 1 ? '1px solid var(--color-rose)' : 'none',
              }}
            >
              {/* Pergunta */}
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.5,
                    fontWeight: openIndex === i ? 400 : 300,
                    transition: 'font-weight 0.2s',
                  }}
                >
                  {faq.question}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    color: 'var(--color-mauve)',
                    flexShrink: 0,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                    display: 'inline-block',
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </button>

              {/* Resposta */}
              <div
                style={{
                  maxHeight: openIndex === i ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.8,
                    paddingBottom: 20,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            Ainda tem dúvidas?{' '}
            <a
              href="/contato"
              style={{
                color: 'var(--color-wine)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--color-rose)',
                paddingBottom: 1,
              }}
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

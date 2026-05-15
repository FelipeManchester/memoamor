'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'A página fica no ar para sempre?',
    answer:
      'A página fica no ar por 1 ano a partir da data de criação. Você receberá um aviso 30 dias antes do vencimento para renovar por apenas R$ 9,90/ano. Após o vencimento, a página entra em modo pausado por 30 dias antes de ser removida. Tempo suficiente para renovar sem perder nada.',
  },
  {
    question: 'Posso pagar com PIX?',
    answer:
      'Sim! Aceitamos PIX e cartão de crédito. O PIX é processado instantaneamente: sua página fica no ar em segundos após a confirmação.',
  },
  {
    question: 'Posso editar a página depois de criar?',
    answer:
      'No momento não é possível editar após a criação. Por isso o formulário tem um resumo completo antes do pagamento, você confirma tudo antes de finalizar. Em breve vamos adicionar a opção de edição.',
  },
  {
    question: 'Como o destinatário acessa a página?',
    answer:
      'Basta abrir o link no celular ou computador, sem precisar baixar nada, criar conta ou instalar nenhum aplicativo. Funciona em qualquer browser moderno.',
  },
  {
    question: 'As fotos ficam seguras?',
    answer:
      'Sim. As fotos são armazenadas em servidores seguros e só são acessíveis através do link da sua página. Não compartilhamos seus dados com terceiros.',
  },
  {
    question: 'Como funciona o QR Code?',
    answer:
      'Após o pagamento, você recebe um e-mail com o link da página e um QR Code exclusivo. É só abrir o e-mail, mostrar o QR Code para quem você quer surpreender e pedir para apontar a câmera do celular. A página abre instantaneamente, sem precisar digitar nada.',
  },
  {
    question: 'Posso criar mais de uma página?',
    answer:
      'Sim! Cada criação é independente. Você pode criar quantas páginas quiser: para datas diferentes, casais diferentes ou como presente para amigos.',
  },
  {
    question: 'O que acontece se eu não renovar?',
    answer:
      'Após 1 ano, você receberá dois avisos por e-mail. Se não renovar, a página entra em modo pausado por 30 dias. Depois desse período, ela sai do ar, mas os dados ficam no sistema por mais 60 dias caso queira reativar.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section
      className="bg-light"
      style={{ padding: 'clamp(80px, 12vw, 140px) 0' }}
    >
      <div className="max-w-[720px] mx-auto px-5 md:px-10 xl:px-20">
        {/* Cabeçalho */}
        <div
          className="text-center"
          style={{ marginBottom: 'clamp(48px, 6vw, 64px)' }}
        >
          <p className="font-sans text-[0.65rem] font-medium tracking-[0.2em] uppercase text-text-muted mb-4">
            Dúvidas frequentes
          </p>
          <h2
            className="font-serif font-light italic text-wine"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            Perguntas e respostas
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-0">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-t border-rose"
              style={{
                borderBottom: i === faqs.length - 1 ? '1px solid var(--color-rose)' : 'none',
              }}
            >
              {/* Pergunta */}
              <button
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer text-left gap-4"
              >
                <span
                  className="font-sans text-[0.92rem] text-text leading-[1.5] transition-[font-weight] duration-200"
                  style={{ fontWeight: openIndex === i ? 400 : 300 }}
                >
                  {faq.question}
                </span>
                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-mauve transition-transform duration-[250ms] ease-in-out"
                  style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* Resposta — grid-template-rows technique */}
              <div
                className="grid transition-[grid-template-rows] duration-[250ms] ease-in-out"
                style={{ gridTemplateRows: openIndex === i ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="font-sans text-[0.88rem] text-text-muted leading-[1.8] pb-5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="text-center mt-12">
          <p className="font-sans text-[0.85rem] text-text-muted leading-[1.8]">
            Ainda tem dúvidas?{' '}
            <a
              href="/contato"
              className="text-wine no-underline border-b border-rose pb-px"
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

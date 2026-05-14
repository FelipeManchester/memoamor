import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
import { createAdminClient } from '@/lib/supabase/server'
import ResetFormOnSuccess from '@/components/page-builder/ResetFormOnSuccess'
import CopyLinkButton from './CopyLinkButton'
import FaqItem from './FaqItem'

const FAQS = [
  {
    question: 'Como faço para compartilhar a página?',
    answer:
      'Copie o link acima ou mostre o QR Code para quem você quer surpreender — é só apontar a câmera do celular. O link e o QR Code também foram enviados para o seu e-mail.',
  },
  {
    question: 'Por quanto tempo a página fica no ar?',
    answer:
      'A página fica ativa por 1 ano a partir de hoje. Você receberá um aviso por e-mail 30 dias antes do vencimento para renovar por apenas R$ 9,90/ano.',
  },
  {
    question: 'Posso editar a página depois de criada?',
    answer:
      'No momento não é possível editar após a criação. Por isso o formulário tem um resumo completo antes do pagamento. Em breve vamos adicionar a opção de edição.',
  },
  {
    question: 'E se eu quiser remover minha página?',
    answer:
      'Entre em contato pelo e-mail contato@memoamor.app com o assunto "Remover página" e o link da sua página. Removemos em até 48 horas.',
  },
  {
    question: 'Perdi o link — e agora?',
    answer:
      'O link e o QR Code foram enviados para o e-mail que você cadastrou. Verifique a caixa de entrada e a pasta de spam. Se ainda não encontrar, entre em contato pelo e-mail contato@memoamor.app.',
  },
]

export default async function SucessoPage(props: {
  searchParams: Promise<{ slug?: string; payment?: string }>
}) {
  const searchParams = await props.searchParams

  if (searchParams.payment !== 'success') {
    redirect('/')
  }

  const slug = searchParams.slug ?? ''

  let nameA = ''
  let nameB = ''

  if (slug) {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('memory_pages')
      .select('name_a, name_b')
      .eq('slug', slug)
      .maybeSingle()

    if (data) {
      nameA = data.name_a
      nameB = data.name_b
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://memoamor.app'
  const pageUrl = slug ? `${appUrl}/p/${slug}` : appUrl

  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/` +
    `?size=220x220` +
    `&data=${encodeURIComponent(pageUrl)}` +
    `&color=7a3f3f` +
    `&bgcolor=faf6f1` +
    `&margin=10` +
    `&format=png`

  const coupleLabel = nameA && nameB ? `${nameA} & ${nameB}` : null

  return (
    <>
      <ResetFormOnSuccess />

      <div
        style={{
          minHeight: '100svh',
          background: 'var(--color-cream)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* ── Top bar ───────────────────────────────── */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-blush)',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-wine)',
              textDecoration: 'none',
            }}
          >
            Memoamor
          </Link>
        </div>

        {/* ── Main content ──────────────────────────── */}
        <div
          style={{
            maxWidth: 560,
            margin: '0 auto',
            padding: 'clamp(40px, 8vw, 80px) 24px clamp(60px, 10vw, 100px)',
          }}
        >

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: '2.2rem', marginBottom: 16 }}>♡</div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-wine)',
                lineHeight: 1.15,
                margin: '0 0 16px',
              }}
            >
              {coupleLabel ? `${coupleLabel}` : 'Página criada!'}
            </h1>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              Obrigado pela compra. Sua página está no ar e ficará disponível por{' '}
              <strong style={{ color: 'var(--color-text)' }}>1 ano</strong>.
            </p>
          </div>

          {/* QR Code card */}
          {slug && (
            <div
              style={{
                background: 'white',
                border: '1px solid var(--color-rose)',
                borderRadius: 8,
                padding: '28px 24px',
                textAlign: 'center',
                marginBottom: 24,
                boxShadow: '0 4px 24px rgba(122,63,63,0.07)',
              }}
            >
              <p
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  margin: '0 0 20px',
                }}
              >
                QR Code da página
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="QR Code"
                width={160}
                height={160}
                style={{ display: 'block', margin: '0 auto 20px', borderRadius: 4 }}
              />

              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-text-muted)',
                  margin: '0 0 20px',
                }}
              >
                Aponte a câmera do celular para abrir a página
              </p>

              {/* URL + actions */}
              <div
                style={{
                  background: 'var(--color-blush)',
                  borderRadius: 4,
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  color: 'var(--color-wine)',
                  wordBreak: 'break-all',
                  marginBottom: 16,
                  fontFamily: 'monospace',
                }}
              >
                {pageUrl}
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={pageUrl}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    padding: '12px 24px',
                    background: 'var(--color-wine)',
                    color: 'var(--color-cream)',
                    textDecoration: 'none',
                    borderRadius: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Ver página →
                </a>
                <CopyLinkButton url={pageUrl} />
              </div>
            </div>
          )}

          {/* Email confirmation */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'flex-start',
              padding: '16px 20px',
              background: 'var(--color-light)',
              borderRadius: 6,
              marginBottom: 48,
            }}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>✉</span>
            <p
              style={{
                fontSize: '0.85rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                margin: 0,
              }}
            >
              O link e o QR Code foram enviados para o seu e-mail. Guarde-o — é a forma mais fácil de
              compartilhar quando quiser.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--color-wine)',
                margin: '0 0 8px',
              }}
            >
              Dúvidas frequentes
            </h2>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
                margin: '0 0 24px',
              }}
            >
              Tudo que você precisa saber sobre sua página.
            </p>

            <div style={{ borderTop: '1px solid var(--color-blush)' }}>
              {FAQS.map((faq) => (
                <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>

          {/* Footer link */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <Link
              href="/"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-mauve)',
                textDecoration: 'none',
              }}
            >
              ← Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

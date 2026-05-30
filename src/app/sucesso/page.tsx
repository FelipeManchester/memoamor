import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
import { createAdminClient } from '@/lib/supabase/server'
import { PLANS } from '@/lib/constants'
import ResetFormOnSuccess from '@/components/page-builder/ResetFormOnSuccess'
import PetalConfetti from '@/components/ui/PetalConfetti'
import CopyLinkButton from './CopyLinkButton'
import WhatsAppButton from './WhatsAppButton'
import PrintQRButton from './PrintQRButton'
import FaqItem from './FaqItem'
import PurchasePixelEvent from './PurchasePixelEvent'

const FAQS = [
  {
    question: 'Como faço para compartilhar a página?',
    answer:
      'Copie o link acima ou mostre o QR Code para quem você quer surpreender. É só apontar a câmera do celular. O link e o QR Code também foram enviados para o seu e-mail.',
  },
  {
    question: 'Por quanto tempo a página fica no ar?',
    answer:
      'A página fica ativa por 1 ano a partir de hoje. Você receberá um aviso por e-mail 30 dias antes do vencimento para renovar por apenas R$ 19,90/ano.',
  },
  {
    question: 'Posso editar a página depois de criada?',
    answer:
      'Você pode enviar uma solicitação de edição em nossa página de <a href="/contato" style="color:var(--color-wine);border-bottom:1px solid var(--color-rose);text-decoration:none">contato</a>. Responderemos em até 1 dia útil.',
  },
  {
    question: 'E se eu quiser remover minha página?',
    answer:
      'Entre em contato pelo e-mail contato@memoamor.app com o assunto "Remover página" e o link da sua página. Removemos em até 48 horas.',
  },
  {
    question: 'Perdi o link, e agora?',
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
  let dbPlan: string | null = null

  if (slug) {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('memory_pages')
      .select('name_a, name_b, plan')
      .eq('slug', slug)
      .maybeSingle()

    if (data) {
      nameA = data.name_a
      nameB = data.name_b
      dbPlan = data.plan as string | null
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

  const planRecord = PLANS.find((p) => p.id === dbPlan)
  const purchaseValue = planRecord ? planRecord.priceInCents / 100 : 0

  return (
    <>
      <ResetFormOnSuccess />
      <PetalConfetti />
      {slug && <PurchasePixelEvent value={purchaseValue} eventId={`purchase-${slug}`} />}

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
              fontFamily: 'var(--font-logo)',
              fontSize: '1.75rem',
              lineHeight: 1,
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
              Pagamento recebido! A página estará disponível em instantes e ficará no ar por{' '}
              <strong style={{ color: 'var(--color-text)' }}>1 ano</strong>.
            </p>
          </div>

          {/* QR Code card */}
          {slug && (
            <div className="bg-white border border-rose rounded-lg py-7 px-6 text-center mb-6 shadow-[0_4px_24px_rgba(122,63,63,0.07)]">
              <div className="flex items-center justify-center gap-2 mb-5">
                <p className="text-[0.62rem] tracking-[0.2em] uppercase font-medium text-text-muted m-0">
                  QR Code da página
                </p>
                <PrintQRButton qrUrl={qrUrl} />
              </div>

              <div className="inline-block border-[1.5px] border-dashed border-rose rounded-lg py-4 px-5 mb-5">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="QR Code"
                  width={160}
                  height={160}
                  className="block mx-auto mb-2.5 rounded"
                />

                <p
                  className="text-[0.85rem] font-semibold text-wine m-0 tracking-[0.02em]"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  Pra sempre com você ❤️
                </p>
              </div>

              <p className="text-[0.78rem] text-text-muted mb-5">
                Aponte a câmera do celular para abrir a página
              </p>

              {/* URL + actions */}
              <div className="bg-blush rounded py-2.5 px-3.5 text-[0.8rem] text-wine break-all mb-4 font-mono">
                {pageUrl}
              </div>

              <div className="flex gap-2.5 justify-center flex-wrap">
                <a
                  href={pageUrl}
                  className="font-sans text-[0.72rem] tracking-[0.15em] uppercase py-3 px-6 bg-wine text-cream no-underline rounded-sm whitespace-nowrap"
                >
                  Ver página →
                </a>
                <CopyLinkButton url={pageUrl} />
                <WhatsAppButton url={pageUrl} />
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
              O link e o QR Code foram enviados para o seu e-mail. Guarde-o: é a forma mais fácil de
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

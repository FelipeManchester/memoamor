import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do Memoamor.',
}

export default function PrivacidadePage() {
  return (
    <main
      style={{
        minHeight: '100svh',
        background: 'var(--color-cream)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Link
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
          </Link>
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
            Última atualização: maio de 2026
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-wine)',
            }}
          >
            Política de Privacidade
          </h1>
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Block title="1. Quem somos">
            O Memoamor é operado por pessoa jurídica inscrita no CNPJ 62.485.352/0001-31. Esta
            política descreve como coletamos, usamos e protegemos seus dados pessoais, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </Block>

          <Block title="2. Dados que coletamos">
            Coletamos apenas os dados necessários para a prestação do serviço:
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[
                'E-mail — para entrega do link da página e comunicações sobre o serviço',
                'Fotos e textos — conteúdo inserido voluntariamente para compor a página',
                'Dados de pagamento — processados pelo gateway AbacatePay, não armazenamos dados de cartão',
                'Dados de acesso — logs técnicos para segurança e diagnóstico de problemas',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="3. Como usamos seus dados">
            Seus dados são usados exclusivamente para:
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[
                'Criar e manter sua página de memórias',
                'Enviar o link da página após o pagamento',
                'Enviar avisos de vencimento e renovação',
                'Responder solicitações de suporte',
                'Cumprir obrigações legais',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="4. Compartilhamento de dados">
            Não vendemos nem compartilhamos seus dados com terceiros para fins comerciais.
            Compartilhamos apenas com prestadores de serviço essenciais ao funcionamento da
            plataforma — processador de pagamento (AbacatePay), serviço de e-mail (Resend) e
            infraestrutura de hospedagem (Supabase e Vercel) — todos sob obrigação contratual de
            confidencialidade.
          </Block>

          <Block title="5. Armazenamento e segurança">
            Seus dados são armazenados em servidores seguros com criptografia em trânsito (HTTPS) e
            em repouso. As fotos ficam em bucket privado com acesso controlado. Adotamos boas
            práticas de segurança para proteger suas informações contra acesso não autorizado.
          </Block>

          <Block title="6. Retenção de dados">
            Seus dados são mantidos pelo período necessário à prestação do serviço. Após o
            encerramento da página — por não renovação ou solicitação de exclusão — os dados são
            removidos em até 60 dias. Dados de pagamento podem ser retidos por até 5 anos para fins
            fiscais, conforme exigência legal.
          </Block>

          <Block title="7. Seus direitos (LGPD)">
            Você tem direito a:
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[
                'Confirmar a existência de tratamento dos seus dados',
                'Acessar seus dados pessoais',
                'Corrigir dados incompletos ou desatualizados',
                'Solicitar a exclusão dos seus dados',
                'Revogar o consentimento a qualquer momento',
                'Solicitar portabilidade dos seus dados',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 12 }}>
              Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
              <a
                href="mailto:contato@memoamor.app"
                style={{ color: 'var(--color-wine)', textDecoration: 'none' }}
              >
                contato@memoamor.app
              </a>
              . Responderemos em até 15 dias úteis.
            </p>
          </Block>

          <Block title="8. Cookies">
            O Memoamor utiliza cookies técnicos essenciais para o funcionamento do serviço — como
            manutenção de estado do formulário. Não utilizamos cookies de rastreamento ou
            publicidade.
          </Block>

          <Block title="9. Alterações nesta política">
            Esta política pode ser atualizada periodicamente. Alterações significativas serão
            comunicadas por e-mail com antecedência. Recomendamos revisar esta página
            periodicamente.
          </Block>

          <Block title="10. Contato">
            Para dúvidas, solicitações ou reclamações relacionadas à privacidade e proteção de
            dados, entre em contato pelo e-mail{' '}
            <a
              href="mailto:contato@memoamor.app"
              style={{ color: 'var(--color-wine)', textDecoration: 'none' }}
            >
              contato@memoamor.app
            </a>
            .
          </Block>
        </div>
      </div>
    </main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.15rem',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--color-wine)',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.88rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  )
}

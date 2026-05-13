import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do Memoamor.',
}

export default function PrivacidadePage() {
  return (
    <main
      className="min-h-svh bg-cream"
      style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 100px)' }}
    >
      <div className="max-w-[720px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="font-serif text-[1.2rem] italic text-wine no-underline block mb-10"
          >
            Memoamor
          </Link>
          <p className="font-sans text-[0.65rem] tracking-[0.3em] uppercase text-mauve mb-3">
            Última atualização: maio de 2026
          </p>
          <h1
            className="font-serif font-light italic text-wine"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Política de Privacidade
          </h1>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col gap-8">
          <Block title="1. Quem somos">
            O Memoamor é operado por pessoa jurídica inscrita no CNPJ 62.485.352/0001-31. Esta
            política descreve como coletamos, usamos e protegemos seus dados pessoais, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </Block>

          <Block title="2. Dados que coletamos">
            Coletamos apenas os dados necessários para a prestação do serviço:
            <ul className="mt-3 pl-5 flex flex-col gap-2">
              {[
                'E-mail — para entrega do link da página e comunicações sobre o serviço',
                'Fotos e textos — conteúdo inserido voluntariamente para compor a página',
                'Dados de pagamento — processados pelo gateway AbacatePay, não armazenamos dados de cartão',
                'Dados de acesso — logs técnicos para segurança e diagnóstico de problemas',
              ].map((item, i) => (
                <li key={i} className="font-sans text-[0.88rem] text-text-muted leading-[1.7]">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="3. Como usamos seus dados">
            Seus dados são usados exclusivamente para:
            <ul className="mt-3 pl-5 flex flex-col gap-2">
              {[
                'Criar e manter sua página de memórias',
                'Enviar o link da página após o pagamento',
                'Enviar avisos de vencimento e renovação',
                'Responder solicitações de suporte',
                'Cumprir obrigações legais',
              ].map((item, i) => (
                <li key={i} className="font-sans text-[0.88rem] text-text-muted leading-[1.7]">
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
            <ul className="mt-3 pl-5 flex flex-col gap-2">
              {[
                'Confirmar a existência de tratamento dos seus dados',
                'Acessar seus dados pessoais',
                'Corrigir dados incompletos ou desatualizados',
                'Solicitar a exclusão dos seus dados',
                'Revogar o consentimento a qualquer momento',
                'Solicitar portabilidade dos seus dados',
              ].map((item, i) => (
                <li key={i} className="font-sans text-[0.88rem] text-text-muted leading-[1.7]">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
              <a href="mailto:contato@memoamor.app" className="text-wine no-underline">
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
            <a href="mailto:contato@memoamor.app" className="text-wine no-underline">
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
    <div className="flex flex-col gap-3">
      <h2 className="font-serif text-[1.15rem] font-light italic text-wine">{title}</h2>
      <div className="font-sans text-[0.88rem] text-text-muted leading-[1.8]">{children}</div>
    </div>
  )
}

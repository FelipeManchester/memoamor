import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do Memoamor.',
}

export default function TermosPage() {
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
            Termos de Uso
          </h1>
        </div>

        {/* Conteúdo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Block title="1. O que é o Memoamor">
            O Memoamor é uma plataforma digital que permite a criação de páginas web personalizadas
            para registrar e compartilhar memórias de relacionamentos. O serviço é operado por
            pessoa jurídica inscrita no CNPJ 62.485.352/0001-31.
          </Block>

          <Block title="2. Aceitação dos termos">
            Ao criar uma página no Memoamor, você declara ter lido, compreendido e concordado com
            estes Termos de Uso. Se não concordar com qualquer parte, não utilize o serviço.
          </Block>

          <Block title="3. O serviço">
            O Memoamor oferece a criação de páginas digitais personalizadas mediante pagamento
            único. Após a confirmação do pagamento, você receberá um link exclusivo para acessar e
            compartilhar sua página. A página ficará disponível por 1 (um) ano a partir da data de
            criação.
          </Block>

          <Block title="4. Pagamento e renovação">
            O pagamento é único e não recorrente. Aceitamos PIX e cartão de crédito. Após 1 ano,
            você poderá renovar sua página pelo valor de R$ 9,90/ano. Você receberá avisos por
            e-mail 30 dias e 7 dias antes do vencimento. Após o vencimento sem renovação, a página
            entra em modo pausado por 30 dias. Após esse período, a página é removida — mas os dados
            ficam armazenados por mais 60 dias para eventual reativação.
          </Block>

          <Block title="5. Política de reembolso">
            Por se tratar de produto digital entregue imediatamente após o pagamento, não oferecemos
            reembolso após a criação da página. Em caso de falha técnica comprovada que impeça o
            acesso à página, analisaremos o caso individualmente mediante contato em
            contato@memoamor.app.
          </Block>

          <Block title="6. Conteúdo do usuário">
            Você é integralmente responsável pelo conteúdo inserido na sua página — textos, fotos e
            links. É proibido inserir conteúdo que:
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
                'Viole direitos autorais ou propriedade intelectual de terceiros',
                'Contenha imagens ou textos de cunho sexual, violento ou discriminatório',
                'Seja falso, enganoso ou difamatório',
                'Viole a privacidade de terceiros sem consentimento',
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

          <Block title="7. Disponibilidade do serviço">
            O Memoamor se esforça para manter o serviço disponível 24 horas por dia, 7 dias por
            semana. No entanto, não garantimos disponibilidade ininterrupta. Manutenções programadas
            serão comunicadas com antecedência sempre que possível.
          </Block>

          <Block title="8. Limitação de responsabilidade">
            O Memoamor não se responsabiliza por danos indiretos decorrentes do uso ou
            impossibilidade de uso do serviço, incluindo perda de dados por falhas de terceiros,
            interrupções de serviços de infraestrutura ou força maior.
          </Block>

          <Block title="9. Alterações nos termos">
            Podemos atualizar estes termos a qualquer momento. Alterações significativas serão
            comunicadas por e-mail com pelo menos 15 dias de antecedência. O uso continuado do
            serviço após as alterações implica aceitação dos novos termos.
          </Block>

          <Block title="10. Contato">
            Para dúvidas, solicitações ou reclamações relacionadas a estes termos, entre em contato
            pelo e-mail{' '}
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

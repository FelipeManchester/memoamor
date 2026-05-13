import { Resend } from 'resend'

export async function sendDeliveryEmail({
  to,
  slug,
  nameA,
  nameB,
}: {
  to: string
  slug: string
  nameA: string
  nameB: string
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY) //
  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/p/${slug}`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `♡ A página de ${nameA} e ${nameB} está no ar`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #3d2b2b;">
        <h1 style="font-size: 24px; font-weight: 300; color: #7a3f3f;">
          Tudo pronto, ${nameA}!
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #6b4a4a;">
          A página de memórias de <strong>${nameA} e ${nameB}</strong> está no ar.
          Compartilhe o link abaixo com quem você ama:
        </p>
        <a
          href="${pageUrl}"
          style="display:inline-block;margin:24px 0;padding:14px 28px;background:#7a3f3f;color:#faf6f1;text-decoration:none;border-radius:2px;font-family:sans-serif;font-size:14px;"
        >
          Abrir minha página →
        </a>
        <p style="font-size: 13px; color: #c49a8a;">
          Ou copie o link: ${pageUrl}
        </p>
        <hr style="border:none;border-top:1px solid #e8c4b8;margin:32px 0;" />
        <p style="font-size: 12px; color: #c49a8a;">
          Guarde esse e-mail — é a forma mais segura de acessar sua página.
          Ela fica no ar por 1 ano a partir de hoje.
        </p>
        <p style="font-size: 12px; color: #c49a8a;">Memoamor · memoamor.app</p>
      </div>
    `,
  })
}

export async function sendExpirationWarningEmail({
  to,
  slug,
  nameA,
  nameB,
  expiresAt,
}: {
  to: string
  slug: string
  nameA: string
  nameB: string
  expiresAt: string
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY) // ← instancia aqui também
  const pageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/p/${slug}`
  const renewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/renovar/${slug}`
  const expiryDate = new Date(expiresAt).toLocaleDateString('pt-BR')

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `A página de ${nameA} e ${nameB} expira em 30 dias`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #3d2b2b;">
        <h1 style="font-size: 24px; font-weight: 300; color: #7a3f3f;">
          Renove sua página ♡
        </h1>
        <p style="font-size: 16px; line-height: 1.8; color: #6b4a4a;">
          A página de <strong>${nameA} e ${nameB}</strong> expira em
          <strong>${expiryDate}</strong>. Renove por mais 1 ano por apenas
          <strong>R$ 9,90</strong>.
        </p>
        
          href="${renewUrl}"
          style="display:inline-block;margin:24px 0;padding:14px 28px;background:#7a3f3f;color:#faf6f1;text-decoration:none;border-radius:2px;font-family:sans-serif;font-size:14px;"
        >
          Renovar por R$ 9,90 →
        </a>
        <p style="font-size: 13px; color: #c49a8a;">Sua página: ${pageUrl}</p>
      </div>
    `,
  })
}

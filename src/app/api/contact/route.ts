import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'contato@memoamor.app',
      replyTo: email,
      subject: `[Contato] ${name} — Memoamor`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; color: #3d2b2b;">
          <h2 style="font-weight: 300; color: #7a3f3f;">Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong></p>
          <p style="background: #faf6f1; padding: 16px; border-radius: 4px; line-height: 1.8;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/contact]', err)
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 })
  }
}

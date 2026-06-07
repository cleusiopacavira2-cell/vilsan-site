import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/schemas/contact'
import { createServerClient } from '@/lib/supabase'
import { rateLimit } from '@/lib/rateLimit'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const WHATSAPP_NUM = process.env.WHATSAPP_NUM || '244926891271'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'clesiopacavira91@gmail.com'

export async function POST(req: NextRequest) {
  // ── Rate limiting: 5 submissions per minute per IP ─────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const { allowed } = rateLimit(ip, 5, 60_000)
  if (!allowed) {
    return NextResponse.json(
      { status: 'error', message: 'Demasiados pedidos. Aguarde um momento e tente novamente.' },
      { status: 429 }
    )
  }

  // ── Parse & validate ────────────────────────────────────────
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Pedido inválido.' },
      { status: 400 }
    )
  }

  // Honeypot check — if this hidden field is filled, it's a bot
  const rawBody = body as Record<string, string>
  if (rawBody.__hp && rawBody.__hp.length > 0) {
    // Silently return success to confuse bots
    return NextResponse.json({ status: 'success', message: 'ok' })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || 'Dados inválidos'
    return NextResponse.json(
      { status: 'error', message: firstError },
      { status: 400 }
    )
  }

  const { nome, telefone, email, servico, mensagem } = parsed.data

  // ── 1. Save to Supabase ─────────────────────────────────────
  const supabaseAdmin = createServerClient()
  const { data: lead, error: dbError } = await supabaseAdmin
    .from('contacts')
    .insert({
      nome,
      telefone,
      email: email || null,
      servico,
      mensagem: mensagem || null,
    })
    .select('id')
    .single()

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json(
      { status: 'error', message: 'Erro ao guardar pedido. Tente novamente.' },
      { status: 500 }
    )
  }

  const leadId = lead?.id

  // ── 2. Email notification via Resend ────────────────────────
  try {
    await resend.emails.send({
      from: 'Vilsan Site <noreply@vilsan.ao>',
      to: ADMIN_EMAIL,
      subject: `Novo Pedido #${leadId} — ${nome}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#05162E;color:white;border-radius:16px;padding:32px">
          <h2 style="color:#00D4FF;margin:0 0 24px">Novo Pedido de Orçamento #${leadId}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);width:110px">Nome</td><td style="padding:8px 0;font-weight:600">${nome}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5)">Telefone</td><td style="padding:8px 0;font-weight:600">${telefone}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5)">Email</td><td style="padding:8px 0">${email || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5)">Serviço</td><td style="padding:8px 0">${servico}</td></tr>
            <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);vertical-align:top">Mensagem</td><td style="padding:8px 0">${mensagem || '—'}</td></tr>
          </table>
          <p style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:24px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
            ${new Date().toLocaleString('pt-AO')} • Vilsan Water Angola
          </p>
        </div>
      `,
    })
  } catch (emailError) {
    // Email failure must not block the user response
    console.error('Resend error:', emailError)
  }

  // ── 3. Build WhatsApp link ──────────────────────────────────
  const msgWa = encodeURIComponent(
    `Olá Vilsan! Acabei de enviar um pedido pelo site.\n\nNome: ${nome}\nServiço: ${servico}${mensagem ? `\nMensagem: ${mensagem}` : ''}`
  )
  const whatsappLink = `https://wa.me/${WHATSAPP_NUM}?text=${msgWa}`

  return NextResponse.json({
    status: 'success',
    message: 'Pedido enviado com sucesso! Iremos contactá-lo em breve.',
    id: leadId,
    whatsapp_link: whatsappLink,
  })
}

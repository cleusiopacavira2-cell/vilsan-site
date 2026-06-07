import { createServerClient } from '@/lib/supabase'
import { ContactLead } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BarChart3, ClipboardList, MessageCircle, Mail } from 'lucide-react'
import LeadActions from './LeadActions'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const leadId = parseInt(id)
  if (isNaN(leadId)) notFound()

  const sb = createServerClient()
  const { data } = await sb.from('contacts').select('*').eq('id', leadId).single()
  if (!data) notFound()

  const lead = data as ContactLead

  const estadoColors: Record<string, string> = {
    novo: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    lido: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    respondido: 'bg-green-500/20 text-green-400 border-green-500/30',
    fechado: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }

  const waLink = `https://wa.me/${lead.telefone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Olá ${lead.nome}! A equipa Vilsan recebeu o seu pedido de orçamento de ${lead.servico}. Estamos aqui para ajudar.`
  )}`

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#051E3A] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col py-6 lg:py-8 px-6 order-2 lg:order-1">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003366] to-[#007acc] border-2 border-[#00D4FF] flex items-center justify-center font-black text-lg">
            V
          </div>
          <div>
            <div className="font-black tracking-widest text-sm">VILSAN</div>
            <div className="text-[#00D4FF] text-[10px] uppercase tracking-widest">Painel Admin</div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-sm">
            <BarChart3 size={20} />
            Dashboard
          </Link>
          <Link href="/dashboard/orcamentos" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] font-semibold text-sm">
            <ClipboardList size={20} />
            Orçamentos
          </Link>
        </nav>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/30 hover:text-white/60 transition-colors text-sm">
          ← Voltar ao Site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 order-1 lg:order-2">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/dashboard/orcamentos" className="text-white/40 hover:text-white transition-colors text-sm">
            ← Orçamentos
          </Link>
          <span className="text-white/20">/</span>
          <h1 className="text-2xl font-black">Pedido #{lead.id}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${estadoColors[lead.estado]}`}>
            {lead.estado}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Lead info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-8">
              <h2 className="font-bold text-[#00D4FF] text-sm uppercase tracking-widest mb-6">
                Informação do Cliente
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6\">
                {[
                  { label: 'Nome', value: lead.nome },
                  { label: 'Telefone', value: lead.telefone },
                  { label: 'Email', value: lead.email || '—' },
                  { label: 'Serviço', value: lead.servico },
                  {
                    label: 'Data de Envio',
                    value: new Date(lead.created_at).toLocaleString('pt-AO'),
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{f.label}</div>
                    <div className="font-semibold">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {lead.mensagem && (
              <div className="bg-white/4 border border-white/8 rounded-2xl p-8">
                <h2 className="font-bold text-[#00D4FF] text-sm uppercase tracking-widest mb-4">
                  Mensagem
                </h2>
                <p className="text-white/70 leading-relaxed">{lead.mensagem}</p>
              </div>
            )}
          </div>

          {/* Actions sidebar */}
          <div className="space-y-6">
            {/* Quick contact */}
            <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
              <h2 className="font-bold text-sm uppercase tracking-widest mb-4 text-white/60">
                Contactar
              </h2>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity mb-3"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              {lead.email && (
                <a
                  href={`mailto:${lead.email}?subject=Pedido de Orçamento Vilsan #${lead.id}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#00D4FF]/20 text-[#00D4FF] py-3 rounded-xl font-bold text-sm hover:bg-[#00D4FF]/30 transition-colors"
                >
                  <Mail size={18} />
                  Email
                </a>
              )}
            </div>

            {/* Status + Delete — Client Component */}
            <LeadActions leadId={lead.id} currentEstado={lead.estado} />
          </div>
        </div>
      </main>
    </div>
  )
}

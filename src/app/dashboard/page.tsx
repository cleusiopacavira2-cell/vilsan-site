import { createServerClient } from '@/lib/supabase'
import { ContactLead } from '@/types'
import Link from 'next/link'
import { BarChart3, ClipboardList, Bell, Eye, CheckCircle, User } from 'lucide-react'

async function getStats() {
  const sb = createServerClient()
  const [total, novos, lidos, respondidos] = await Promise.all([
    sb.from('contacts').select('*', { count: 'exact', head: true }),
    sb.from('contacts').select('*', { count: 'exact', head: true }).eq('estado', 'novo'),
    sb.from('contacts').select('*', { count: 'exact', head: true }).eq('estado', 'lido'),
    sb.from('contacts').select('*', { count: 'exact', head: true }).eq('estado', 'respondido'),
  ])
  return {
    total: total.count ?? 0,
    novos: novos.count ?? 0,
    lidos: lidos.count ?? 0,
    respondidos: respondidos.count ?? 0,
  }
}

async function getRecentLeads(): Promise<ContactLead[]> {
  const sb = createServerClient()
  const { data } = await sb
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  return (data as ContactLead[]) ?? []
}

const estadoBadge: Record<string, string> = {
  novo: 'bg-yellow-500/20 text-yellow-400',
  lido: 'bg-blue-500/20 text-blue-400',
  respondido: 'bg-green-500/20 text-green-400',
  fechado: 'bg-gray-500/20 text-gray-400',
}

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([getStats(), getRecentLeads()])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#051E3A] border-r border-white/5 flex flex-col py-8 px-6">
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
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] font-semibold text-sm"
          >
            <BarChart3 size={20} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/orcamentos"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-sm"
          >
            <ClipboardList size={20} />
            Orçamentos
          </Link>
        </nav>

        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/30 hover:text-white/60 transition-colors text-sm"
        >
          ← Voltar ao Site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 order-1 lg:order-2\">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black">Dashboard</h1>
          <span className="text-white/40 text-sm flex items-center gap-2">
            <User size={16} />
            Admin
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {[
            { Icon: ClipboardList, label: 'Total de Pedidos', value: stats.total, color: '#00D4FF' },
            { Icon: Bell, label: 'Novos (não lidos)', value: stats.novos, color: '#FFB400' },
            { Icon: Eye, label: 'Lidos', value: stats.lidos, color: '#0095FF' },
            { Icon: CheckCircle, label: 'Respondidos', value: stats.respondidos, color: '#25D366' },
          ].map((s) => {
            const Icon = s.Icon
            return (
              <div
                key={s.label}
                className="bg-white/4 border border-white/8 rounded-2xl p-6 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${s.color}22`, color: s.color }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div className="text-2xl font-black" style={{ color: s.color }}>
                    {s.value}
                  </div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent requests */}
        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-white/8">
            <h2 className="font-bold">Pedidos Recentes</h2>
            <Link
              href="/dashboard/orcamentos"
              className="text-[#00D4FF] text-sm font-semibold hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['#', 'Nome', 'Serviço', 'Telefone', 'Data', 'Estado', 'Ação'].map((h) => (
                    <th key={h} className="text-left py-3 px-6 text-white/40 font-semibold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center text-white/30 py-10">
                      Nenhum pedido ainda
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-4 px-6 text-white/40">#{lead.id}</td>
                      <td className="py-4 px-6 font-semibold">{lead.nome}</td>
                      <td className="py-4 px-6 text-white/70">{lead.servico}</td>
                      <td className="py-4 px-6 text-white/70">{lead.telefone}</td>
                      <td className="py-4 px-6 text-white/40">
                        {new Date(lead.created_at).toLocaleDateString('pt-AO')}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${estadoBadge[lead.estado] ?? 'bg-white/10 text-white/50'}`}
                        >
                          {lead.estado}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/dashboard/orcamentos/${lead.id}`}
                          className="bg-[#00D4FF]/20 text-[#00D4FF] px-3 py-1 rounded-lg text-xs font-semibold hover:bg-[#00D4FF]/30 transition-colors"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

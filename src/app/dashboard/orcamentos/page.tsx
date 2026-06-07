import { createServerClient } from '@/lib/supabase'
import { ContactLead } from '@/types'
import Link from 'next/link'
import { BarChart3, ClipboardList, Bell, Eye, CheckCircle } from 'lucide-react'

interface Props {
  searchParams: Promise<{ estado?: string; p?: string }>
}

const LIMIT = 15

const estadoBadge: Record<string, string> = {
  novo: 'bg-yellow-500/20 text-yellow-400',
  lido: 'bg-blue-500/20 text-blue-400',
  respondido: 'bg-green-500/20 text-green-400',
  fechado: 'bg-gray-500/20 text-gray-400',
}

export default async function OrcamentosPage({ searchParams }: Props) {
  const params = await searchParams
  const filtro = params.estado ?? 'todos'
  const page = Math.max(1, parseInt(params.p ?? '1'))
  const offset = (page - 1) * LIMIT

  const sb = createServerClient()

  let query = sb.from('contacts').select('*', { count: 'exact' })
  if (filtro !== 'todos') query = query.eq('estado', filtro)
  const { data, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + LIMIT - 1)

  const leads = (data as ContactLead[]) ?? []
  const totalPages = Math.ceil((count ?? 0) / LIMIT)

  const filterBtns = [
    { label: `Todos (${count ?? 0})`, value: 'todos' },
    { label: 'Novos', icon: Bell, value: 'novo' },
    { label: 'Lidos', icon: Eye, value: 'lido' },
    { label: 'Respondidos', icon: CheckCircle, value: 'respondido' },
  ]

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
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-sm"
          >
            <BarChart3 size={20} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/orcamentos"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] font-semibold text-sm"
          >
            <ClipboardList size={20} />
            Orçamentos
          </Link>
        </nav>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/30 hover:text-white/60 transition-colors text-sm">
          ← Voltar ao Site
        </Link>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 order-1 lg:order-2\">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black">Pedidos de Orçamento</h1>
          <span className="text-white/40 text-sm">👤 Admin</span>
        </div>

        <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 p-6 border-b border-white/8">
            {filterBtns.map((btn) => {
              const Icon = btn.icon
              return (
                <Link
                  key={btn.value}
                  href={`/dashboard/orcamentos?estado=${btn.value}`}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    filtro === btn.value
                      ? 'bg-[#00D4FF] text-[#05162E]'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {Icon ? <Icon size={16} /> : null}
                  {btn.label}
                </Link>
              )
            })}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['#', 'Nome', 'Telefone', 'Email', 'Serviço', 'Data', 'Estado', 'Ações'].map((h) => (
                    <th key={h} className="text-left py-3 px-6 text-white/40 font-semibold text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-white/30 py-10">
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="py-4 px-6 text-white/40">#{lead.id}</td>
                      <td className="py-4 px-6 font-semibold">{lead.nome}</td>
                      <td className="py-4 px-6 text-white/70">{lead.telefone}</td>
                      <td className="py-4 px-6 text-white/40">{lead.email || '—'}</td>
                      <td className="py-4 px-6 text-white/70">{lead.servico}</td>
                      <td className="py-4 px-6 text-white/40">
                        {new Date(lead.created_at).toLocaleDateString('pt-AO')}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${estadoBadge[lead.estado] ?? 'bg-white/10 text-white/50'}`}>
                          {lead.estado}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/dashboard/orcamentos/${lead.id}`}
                          className="bg-[#00D4FF]/20 text-[#00D4FF] px-3 py-1 rounded-lg text-xs font-semibold hover:bg-[#00D4FF]/30 transition-colors mr-2"
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex gap-2 p-6 border-t border-white/8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/dashboard/orcamentos?estado=${filtro}&p=${p}`}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                    p === page
                      ? 'bg-[#00D4FF] text-[#05162E]'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

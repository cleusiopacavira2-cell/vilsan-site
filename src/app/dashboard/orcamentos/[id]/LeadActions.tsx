'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Eye, CheckCircle, Lock, Trash2 } from 'lucide-react'
import { updateLeadStatus, deleteLead } from '../actions'

const ESTADOS = [
  { value: 'novo', label: 'Novo', icon: Bell, color: 'text-yellow-400' },
  { value: 'lido', label: 'Lido', icon: Eye, color: 'text-blue-400' },
  { value: 'respondido', label: 'Respondido', icon: CheckCircle, color: 'text-green-400' },
  { value: 'fechado', label: 'Fechado', icon: Lock, color: 'text-gray-400' },
]

interface Props {
  leadId: number
  currentEstado: string
}

export default function LeadActions({ leadId, currentEstado }: Props) {
  const [estado, setEstado] = useState(currentEstado)
  const [isPending, startTransition] = useTransition()
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleStatusChange = (newEstado: string) => {
    setEstado(newEstado)
    setMsg('')
    startTransition(async () => {
      const result = await updateLeadStatus(leadId, newEstado)
      if (result.error) {
        setEstado(currentEstado)
        setMsg('Erro ao actualizar estado.')
      } else {
        setMsg('Estado actualizado!')
        setTimeout(() => setMsg(''), 2500)
      }
    })
  }

  const handleDelete = () => {
    if (!window.confirm(`Apagar pedido #${leadId}? Esta acção é irreversível.`)) return
    startTransition(async () => {
      const result = await deleteLead(leadId)
      if (result.error) {
        setMsg('Erro ao apagar pedido.')
      } else {
        router.push('/dashboard/orcamentos')
      }
    })
  }

  return (
    <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
      <h2 className="font-bold text-sm uppercase tracking-widest text-white/60">Estado</h2>

      <div className="space-y-2">
        {ESTADOS.map((e) => {
          const Icon = e.icon
          return (
            <button
              key={e.value}
              onClick={() => handleStatusChange(e.value)}
              disabled={isPending}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 flex items-center gap-2 ${
                estado === e.value
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-white/4 border border-transparent hover:bg-white/8'
              } ${e.color}`}
            >
              <Icon size={18} />
              {estado === e.value && <span className="ml-auto">●</span>}
              {e.label}
            </button>
          )
        })}
      </div>

      {msg && (
        <p className="text-green-400 text-xs text-center">{msg}</p>
      )}

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="w-full bg-red-500/10 text-red-400 border border-red-500/20 py-3 rounded-xl font-bold text-sm hover:bg-red-500/20 transition-colors disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
      >
        <Trash2 size={18} />
        Apagar Pedido
      </button>
    </div>
  )
}

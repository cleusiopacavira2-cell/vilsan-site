'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertTriangle, Loader2, CheckCircle2, MessageCircle } from 'lucide-react'
import { contactSchema, type ContactSchema } from '@/schemas/contact'

const SERVICES = [
  'Purificação Residencial',
  'Purificação Industrial',
  'Manutenção Técnica',
  'Franquia / Kit Loja',
  'Osmose Inversa',
  'Dessalinização',
  'Outro',
]

interface Props {
  defaultService?: string
  onServiceRef?: (setService: (s: string) => void) => void
}

export default function ContactForm({ defaultService = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waLink, setWaLink] = useState('')
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { servico: defaultService },
  })

  // Expose setValue for parent to set service from catalogue buttons
  if (typeof window !== 'undefined') {
    ;(window as unknown as Record<string, unknown>).__vilsanSetService = (s: string) => setValue('servico', s)
  }

  const onSubmit = async (data: ContactSchema) => {
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()

      if (result.status === 'success') {
        setStatus('success')
        setWaLink(result.whatsapp_link)
        reset()
        setTimeout(() => {
          setShowModal(true)
        }, 1200)
        setTimeout(() => {
          setStatus('idle')
          setShowModal(false)
        }, 8000)
      } else {
        setStatus('error')
        setErrorMsg(result.message || 'Erro ao enviar. Tente novamente.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erro de ligação. Tente novamente.')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="form-orcamento"
        className="bg-[#05162E] p-6 sm:p-8 lg:p-10 rounded-[3rem] shadow-2xl"
      >
        <div className="space-y-4 sm:space-y-6">
          {/* Success */}
          {status === 'success' && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 text-center">
              <div className="text-4xl mb-3 flex justify-center"><CheckCircle2 size={36} className="text-green-500" /></div>
              <div className="text-white font-bold text-lg">Pedido enviado com sucesso!</div>
              <div className="text-white/60 text-sm mt-2">Iremos contactá-lo em breve. A abrir o WhatsApp...</div>
            </div>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-300 text-sm text-center flex items-center justify-center gap-2">
              <AlertTriangle size={16} />
              {errorMsg}
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
              Nome Completo *
            </label>
            <input
              {...register('nome')}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-4 px-6 focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none placeholder:text-white/20"
              placeholder="Ex: Manuel dos Santos"
            />
            {errors.nome && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={14} /> {errors.nome.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
              Telefone *
            </label>
            <input
              {...register('telefone')}
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-4 px-6 focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none placeholder:text-white/20"
              placeholder="+244 9XX XXX XXX"
            />
            {errors.telefone && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={14} /> {errors.telefone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-4 px-6 focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none placeholder:text-white/20"
              placeholder="o.seu.email@exemplo.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={14} /> {errors.email.message}</p>
            )}
          </div>

          {/* Serviço */}
          <div>
            <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
              Tipo de Serviço *
            </label>
            <select
              {...register('servico')}
              className="w-full bg-[#05162E] border border-white/10 rounded-xl text-white py-4 px-6 focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none appearance-none"
            >
              <option value="">Selecione uma opção</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.servico && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={14} /> {errors.servico.message}</p>
            )}
          </div>

          {/* Mensagem */}
          <div>
            <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">
              Mensagem
            </label>
            <textarea
              {...register('mensagem')}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-4 px-6 focus:ring-1 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all outline-none placeholder:text-white/20 resize-none"
              placeholder="Como podemos ajudar?"
            />
            {errors.mensagem && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1"><AlertTriangle size={14} /> {errors.mensagem.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full font-black py-5 rounded-xl shadow-xl transition-all uppercase text-sm tracking-widest ${
              status === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-[#00D4FF] hover:bg-white text-[#05162E]'
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" /> A enviar...
              </span>
            ) : status === 'success' ? (
              <span className="flex items-center justify-center gap-2"><CheckCircle2 size={18} /> Enviado!</span>
            ) : (
              'Enviar Pedido'
            )}
          </button>

          {/* Honeypot — hidden from real users, traps bots */}
          <input
            type="text"
            name="__hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

          <p className="text-white/30 text-xs text-center">
            Os seus dados são tratados com confidencialidade.
          </p>
        </div>
      </form>

      {/* WhatsApp Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="animate-pop-in bg-[#05162E] border border-[#00D4FF]/25 rounded-[28px] p-10 max-w-[420px] w-[90%] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4 flex justify-center"><CheckCircle2 size={48} className="text-green-500" /></div>
            <h3 className="text-[#00D4FF] text-xl font-black mb-2">Pedido enviado!</h3>
            <p className="text-white/60 text-sm mb-7 leading-relaxed">
              O seu pedido foi guardado. Clique abaixo para abrir o WhatsApp e confirmar directamente
              com a nossa equipa.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#25D366] text-white py-4 rounded-2xl font-black text-base mb-3 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Abrir WhatsApp
            </a>
            <button
              onClick={() => setShowModal(false)}
              className="bg-white/8 text-white/50 border-0 py-3 rounded-2xl w-full cursor-pointer text-sm hover:bg-white/10 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export interface ContactLead {
  id: number
  nome: string
  telefone: string
  email: string | null
  servico: string
  mensagem: string | null
  estado: 'novo' | 'lido' | 'respondido' | 'fechado'
  created_at: string
}

export interface ContactFormData {
  nome: string
  telefone: string
  email?: string
  servico: string
  mensagem?: string
}

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message: string
  data?: T
}

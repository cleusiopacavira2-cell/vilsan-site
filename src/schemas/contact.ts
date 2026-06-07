import { z } from 'zod'

export const contactSchema = z.object({
  nome: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome demasiado longo'),
  telefone: z
    .string()
    .min(9, 'Telefone inválido')
    .max(20, 'Telefone inválido')
    .regex(/^[+\d\s()-]+$/, 'Formato de telefone inválido'),
  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),
  servico: z
    .string()
    .min(1, 'Selecione um serviço'),
  mensagem: z
    .string()
    .min(20, 'Mensagem deve ter pelo menos 20 caracteres')
    .max(2000, 'Mensagem demasiado longa')
    .optional()
    .or(z.literal('')),
})

export type ContactSchema = z.infer<typeof contactSchema>

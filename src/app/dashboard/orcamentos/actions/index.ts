'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function updateLeadStatus(id: number, estado: string) {
  const validStates = ['novo', 'lido', 'respondido', 'fechado']
  if (!validStates.includes(estado)) return { error: 'Estado inválido' }

  const sb = createServerClient()
  const { error } = await sb.from('contacts').update({ estado }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/orcamentos')
  return { success: true }
}

export async function deleteLead(id: number) {
  const sb = createServerClient()
  const { error } = await sb.from('contacts').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/orcamentos')
  return { success: true }
}

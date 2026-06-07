'use client'

import { useEffect } from 'react'
import CatalogueSection from '@/components/sections/CatalogueSection'

export default function HomeClient() {
  // Scroll reveal
  useEffect(() => {
    const reveal = () => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add('active')
        }
      })
    }
    reveal()
    window.addEventListener('scroll', reveal, { passive: true })
    return () => window.removeEventListener('scroll', reveal)
  }, [])

  const handleProductSelect = (productName: string) => {
    // Map product names to service select options
    const serviceMap: Record<string, string> = {
      'Purificador de Bancada': 'Purificação Residencial',
      'Purificador de Pé': 'Purificação Residencial',
      'Sistema WF30 + UV': 'Purificação Industrial',
      'Kit Montagem Loja': 'Franquia / Kit Loja',
    }

    const mappedService = serviceMap[productName] || 'Outro'

    // Use the global setter exposed by ContactForm
    const setService = (window as unknown as Record<string, unknown>).__vilsanSetService as
      | ((s: string) => void)
      | undefined
    setService?.(mappedService)

    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => {
      const nameInput = document.querySelector<HTMLInputElement>('#form-orcamento input[name="nome"]')
      nameInput?.focus()
    }, 600)
  }

  return <CatalogueSection onSelectProduct={handleProductSelect} />
}

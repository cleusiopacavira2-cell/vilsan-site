'use client'

import { useEffect } from 'react'

export function useReveal() {
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
}

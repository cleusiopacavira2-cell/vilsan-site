'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#servicos', label: 'Serviços' },
    { href: '#catalogo', label: 'Catálogo' },
    { href: '#sobre', label: 'Empresa' },
    { href: '#franquia', label: 'Franquia' },
  ]

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled ? 'glass-dark shadow-2xl py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-3 group">
            <Image
              src="/logo.png"
              alt="Vilsan Logo"
              width={80}
              height={80}
              className="object-contain transition-transform group-hover:scale-110"
            />
          </a>

          <div className="hidden lg:flex items-center space-x-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-[#00D4FF] font-medium text-sm uppercase tracking-widest transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-[#00D4FF] hover:bg-white text-[#05162E] px-8 py-3 rounded-full font-bold text-sm transition-all transform hover:-translate-y-1 shadow-xl"
            >
              CONTACTO
            </a>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#05162E] z-[60] flex flex-col items-center justify-center space-y-8">
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-bold text-white uppercase tracking-widest hover:text-[#00D4FF] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-bold text-[#00D4FF] uppercase tracking-widest"
          >
            Contacto
          </a>
        </div>
      )}
    </>
  )
}

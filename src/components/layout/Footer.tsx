import Image from 'next/image'
import { Share2, Camera, MessageCircle } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#05162E] pt-24 pb-12 text-white border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
        <div>
          <a href="#" className="mb-8">
            <Image
              src="/logo.png"
              alt="Vilsan"
              width={64}
              height={64}
              className="object-contain"
            />
          </a>
          <p className="text-white/40 leading-relaxed mb-8">
            Elevando os padrões de saúde hídrica em Angola através de tecnologia e compromisso
            profissional.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: Share2, href: 'https://facebook.com', label: 'Facebook' },
              { icon: Camera, href: 'https://instagram.com/vilsan_agua', label: 'Instagram' },
              { icon: MessageCircle, href: 'https://wa.me/244926891271', label: 'WhatsApp' },
            ].map((s) => {
              const Icon = s.icon
              return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#00D4FF] transition-all text-white hover:text-[#05162E]"
                title={s.label}
              >
                <Icon size={20} />
              </a>
            )
            })}
          </div>
        </div>

        <div>
          <h6 className="font-bold text-[#00D4FF] mb-8 uppercase tracking-widest text-xs">
            Serviços
          </h6>
          <ul className="space-y-4 text-white/60">
            {['Osmose Inversa', 'Filtração Residencial', 'Apoio Industrial', 'Serviços Hidráulicos'].map(
              (s) => (
                <li key={s}>
                  <a href="#servicos" className="hover:text-[#00D4FF] transition-colors">
                    {s}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-[#00D4FF] mb-8 uppercase tracking-widest text-xs">
            Empresa
          </h6>
          <ul className="space-y-4 text-white/60">
            {[
              { label: 'Sobre Nós', href: '#sobre' },
              { label: 'Nosso Portfólio', href: '#catalogo' },
              { label: 'Franquias', href: '#franquia' },
              { label: 'Fale Connosco', href: '#contacto' },
            ].map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-[#00D4FF] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="font-bold text-[#00D4FF] mb-8 uppercase tracking-widest text-xs">
            Apoio Técnico
          </h6>
          <ul className="space-y-4 text-white/60">
            <li>Segunda - Sexta: 08:00 - 18:00</li>
            <li>Sábado: 09:00 - 13:00</li>
            <li className="pt-4">
              <a
                href="tel:+244941392901"
                className="text-xl font-bold text-white hover:text-[#00D4FF] transition-colors"
              >
                +244 941 392 901
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12 border-t border-white/5 text-center text-white/20 text-xs">
        <p>© {year} Vilsan Water Angola. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

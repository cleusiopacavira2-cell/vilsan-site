'use client'

import { Settings, Gem, Waves, Droplet, Wrench, Zap } from 'lucide-react'

const services = [
  {
    Icon: Settings,
    title: 'Instalação de Filtros',
    desc: 'Soluções precisas de filtragem para residências, escritórios e condomínios com materiais de alta durabilidade.',
  },
  {
    Icon: Gem,
    title: 'Osmose Inversa',
    desc: 'O padrão ouro da purificação. Remove até 99% das impurezas químicas e biológicas da água.',
  },
  {
    Icon: Waves,
    title: 'Dessalinização',
    desc: 'Transformação de águas salobras em água potável cristalina para projectos de grande escala.',
  },
  {
    Icon: Droplet,
    title: 'Lavagem de Reservatórios',
    desc: 'Sanitização profissional de tanques e reservatórios com reagentes específicos e seguros.',
  },
  {
    Icon: Wrench,
    title: 'Serviços Hidráulicos',
    desc: 'Reparação e optimização de sistemas de bombagem e canalização para máxima eficiência.',
  },
  {
    Icon: Zap,
    title: 'Manutenção Técnica',
    desc: 'Planos preventivos para garantir que os seus sistemas nunca parem de fornecer água pura.',
  },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white" id="servicos">
      <div className="container mx-auto px-6 text-center mb-20 reveal">
        <h2 className="text-[#05162E] font-black text-sm uppercase tracking-[0.3em] mb-4">
          A Nossa Especialidade
        </h2>
        <p
          className="text-4xl lg:text-5xl text-[#05162E]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Serviços de{' '}
          <span className="italic text-[#00D4FF]">Alta Performance</span>
        </p>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => {
          const Icon = s.Icon
          return (
            <div
              key={i}
              className={`p-10 rounded-[2.5rem] border border-gray-100 hover:border-[#00D4FF]/30 transition-all hover:shadow-2xl group reveal ${
                i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : i === 3 ? 'delay-300' : ''
              }`}
            >
              <div className="w-16 h-16 bg-[#F0F9FF] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Icon size={32} className="text-[#00D4FF]" />
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

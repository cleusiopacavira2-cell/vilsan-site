'use client'

import { Droplets, Building2, Dna, Store } from 'lucide-react'

const products = [
  {
    Icon: Droplets,
    name: 'Purificador Bancada',
    desc: 'Compacto, potente e ideal para cozinhas familiares.',
    price: 'KZ 145.000',
  },
  {
    Icon: Building2,
    name: 'Purificador de Pé',
    desc: 'Design executivo para escritórios e salas de espera.',
    price: 'KZ 210.000',
  },
  {
    Icon: Dna,
    name: 'Sistema WF30 + UV',
    desc: 'Máxima segurança com esterilização ultravioleta.',
    price: 'KZ 380.000',
  },
  {
    Icon: Store,
    name: 'Kit Montagem Loja',
    desc: 'Tudo o que precisa para o seu negócio de água.',
    price: 'Consultar',
  },
]

interface Props {
  onSelectProduct?: (name: string) => void
}

export default function CatalogueSection({ onSelectProduct }: Props) {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden" id="catalogo">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-end mb-16 reveal">
        <div className="mb-8 md:mb-0">
          <h2 className="text-[#00D4FF] font-black text-sm uppercase tracking-[0.3em] mb-4">
            Equipamentos
          </h2>
          <p
            className="text-4xl lg:text-5xl text-[#05162E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Soluções <span className="italic">Prontas a Usar</span>
          </p>
        </div>
        <a href="#contacto" className="text-[#05162E] font-bold flex items-center group">
          Explorar Tudo
          <span className="ml-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-[#00D4FF] group-hover:translate-x-2 transition-all">
            →
          </span>
        </a>
      </div>

      <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p, i) => {
          const Icon = p.Icon
          return (
            <div
              key={p.name}
              className={`bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl transition-all reveal ${
                i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : i === 3 ? 'delay-300' : ''
              }`}
            >
              <div className="bg-gray-100 rounded-[1.5rem] h-48 flex items-center justify-center mb-6">
                <Icon size={56} className="text-[#00D4FF]" />
              </div>
              <div className="px-2">
                <h4 className="text-xl font-bold text-[#05162E] mb-2">{p.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-black text-[#00D4FF]">{p.price}</span>
                  <button
                    onClick={() => onSelectProduct?.(p.name)}
                    className="bg-[#05162E] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#00D4FF] hover:text-[#05162E] transition-colors"
                  >
                    Pedir Info
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

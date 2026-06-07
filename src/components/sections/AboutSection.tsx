import Image from 'next/image'

const checks = [
  'Certificação INIS',
  'Equipa Especializada',
  'Suporte Técnico',
  'Tecnologia Avançada',
]

export default function AboutSection() {
  return (
    <section className="py-24 bg-white" id="sobre">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-[#00D4FF] font-black text-sm uppercase tracking-[0.3em] mb-4">
            A Nossa Equipa
          </h2>
          <p
            className="text-4xl lg:text-5xl text-[#05162E]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Comprometidos com a <span className="italic">Saúde</span> da Sua Família
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Gallery */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 reveal">
            <div className="row-span-2 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/equipa1.jpg"
                alt="Director Geral Vilsan"
                width={300}
                height={420}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/equipa2.jpg"
                alt="Equipa técnica Vilsan"
                width={300}
                height={208}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/equipa3.jpg"
                alt="Colaboradoras Vilsan"
                width={300}
                height={208}
                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              A Vilsan nasceu da convicção de que toda a família angolana merece acesso a água pura e
              segura. Com sede na Centralidade do Kilamba, actuamos em todo o mercado angolano.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              A nossa equipa de técnicos especializados combina tecnologia de ponta com atendimento
              personalizado, garantindo que cada cliente receba a solução ideal — doméstica, comercial
              ou industrial.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {checks.map((c) => (
                <div key={c} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#00D4FF] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    ✓
                  </span>
                  <span className="font-semibold text-[#05162E]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  { n: 1, title: 'Captação', desc: 'Entrada controlada da água bruta no sistema.' },
  { n: 2, title: 'Pré-Filtração', desc: 'Remoção de sedimentos e partículas suspensas.' },
  { n: 3, title: 'Purificação', desc: 'Processo de Osmose Inversa molecular.' },
  { n: 4, title: 'Desinfecção', desc: 'Eliminação de 99% de vírus através de luz UV.' },
  { n: 5, title: 'Distribuição', desc: 'Armazenamento estéril e fornecimento.' },
]

const delays = ['', 'delay-100', 'delay-200', 'delay-300', 'delay-400']

export default function ProcessSection() {
  return (
    <section className="py-24 bg-[#05162E] text-white relative">
      <div className="container mx-auto px-6 text-center mb-20 reveal">
        <h2 className="text-[#00D4FF] font-black text-sm uppercase tracking-[0.3em] mb-4">
          Engenharia de Purificação
        </h2>
        <p
          className="text-4xl lg:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          O Caminho da <span className="italic">Água Perfeita</span>
        </p>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">
          {steps.map((s, i) => (
            <div key={s.n} className={`flex flex-col items-center reveal ${delays[i]}`}>
              <div className="w-16 h-16 bg-[#00D4FF] rounded-full flex items-center justify-center text-[#05162E] font-black text-xl mb-6 border-8 border-[#05162E] ring-1 ring-[#00D4FF]/30 flex-shrink-0">
                {s.n}
              </div>
              <h5 className="font-bold text-lg mb-2 text-center">{s.title}</h5>
              <p className="text-white/40 text-sm text-center">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

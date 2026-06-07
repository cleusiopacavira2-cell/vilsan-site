const testimonials = [
  {
    initials: 'AC',
    name: 'António Costa',
    role: 'Diretor Industrial',
    text: 'A qualidade da água na nossa empresa mudou drasticamente. Reduzimos custos e melhoramos a saúde dos nossos funcionários.',
  },
  {
    initials: 'LM',
    name: 'Luísa Manuel',
    role: 'Gestora de Condomínio',
    text: 'O suporte técnico da Vilsan é excelente. Estão sempre prontos para as manutenções e o sistema nunca falhou.',
  },
  {
    initials: 'JN',
    name: 'João Neto',
    role: 'Empreendedor',
    text: 'Montei o meu posto de água com a Vilsan e em 4 meses recuperei boa parte do investimento. Super recomendo!',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center mb-20 reveal">
        <h2 className="text-[#00D4FF] font-black text-sm uppercase tracking-[0.3em] mb-4">
          Testemunhos
        </h2>
        <p
          className="text-4xl lg:text-5xl text-[#05162E]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Quem confia na <span className="italic">Vilsan</span>
        </p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className={`bg-white p-10 rounded-[2.5rem] shadow-sm hover:-translate-y-2 transition-all reveal ${
              i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''
            }`}
          >
            <div className="flex text-yellow-400 mb-6 text-xl">★★★★★</div>
            <p className="text-gray-600 mb-8 italic">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                {t.initials}
              </div>
              <div>
                <h6 className="font-bold text-[#05162E]">{t.name}</h6>
                <span className="text-gray-400 text-xs uppercase">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

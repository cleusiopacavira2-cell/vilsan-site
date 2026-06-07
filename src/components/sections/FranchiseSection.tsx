import Image from 'next/image'

export default function FranchiseSection() {
  return (
    <section className="py-24 bg-white" id="franquia">
      <div className="container mx-auto px-6">
        <div className="bg-[#F0F9FF] rounded-[3rem] p-6 sm:p-8 md:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4FF]/5 rounded-full -mr-32 -mt-32" />

          <div className="lg:w-1/2 reveal">
            <span className="inline-block bg-[#05162E] text-[#00D4FF] text-xs font-black px-4 py-2 rounded-lg mb-6">
              OPORTUNIDADE BUSINESS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#05162E] mb-6 leading-tight">
              Monte o seu próprio Posto de Abastecimento de Água
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              O mercado de água purificada em Angola não para de crescer. Oferecemos o kit completo,
              formação e apoio técnico para abrir o seu negócio lucrativo hoje.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Image
                src="/loja1.jpg"
                alt="Loja Vilsan"
                width={240}
                height={144}
                className="rounded-2xl h-36 w-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <Image
                src="/loja2.jpg"
                alt="Posto Vilsan"
                width={240}
                height={144}
                className="rounded-2xl h-36 w-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>

            <ul className="space-y-4">
              {[
                'Equipamento industrial de última geração',
                'Certificação de qualidade incluída',
                'Formação técnica e de gestão',
              ].map((item) => (
                <li key={item} className="flex items-center text-[#05162E] font-semibold">
                  <span className="w-6 h-6 bg-[#00D4FF] rounded-full flex items-center justify-center mr-3 text-xs flex-shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 reveal">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl relative">
              <div className="absolute -top-10 -right-4 bg-[#00D4FF] text-[#05162E] px-8 py-4 rounded-2xl font-black text-xl shadow-xl transform rotate-3 italic">
                INVESTIMENTO KZ 3.5M
              </div>
              <h3 className="text-2xl font-black text-[#05162E] mb-6">Pack Empreendedor</h3>
              <div className="space-y-6">
                {[
                  ['Purificador Industrial', 'Incluído'],
                  ['Reservatórios (5.000L)', '2 Unidades'],
                  ['Branding da Loja', 'Total'],
                  ['Bidões iniciais (20L)', '50 Unidades'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-bold">{value}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/244941392901?text=Olá!%20Tenho%20interesse%20no%20Pack%20Empreendedor%20Vilsan."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#05162E] text-white text-center py-5 rounded-2xl mt-10 font-bold hover:bg-[#00D4FF] hover:text-[#05162E] transition-all"
              >
                Saber mais via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const items = [
  'Osmose Inversa',
  'Dessalinização',
  'Certificação INIS',
  'Manutenção Industrial',
  'Instalação de Filtros',
]

export default function TickerBanner() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#00D4FF] py-5 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[#05162E] font-black text-xl mx-8 tracking-tighter uppercase">
              {item}
            </span>
            <span className="text-[#05162E]/30 text-3xl">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

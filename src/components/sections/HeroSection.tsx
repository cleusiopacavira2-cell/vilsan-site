import Image from 'next/image'
import { Droplet } from 'lucide-react'

export default function HeroSection() {
  return (
    <header className="relative min-h-screen flex items-center bg-[#05162E] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00D4FF]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 pt-32 pb-20">
        {/* Left */}
        <div>
          <div className="inline-flex items-center space-x-2 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" />
            <span className="text-[#00D4FF] text-xs font-bold uppercase tracking-widest">
              Inovação em Tratamento de Água
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
            A Pura{' '}
            <span className="text-[#00D4FF] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Saúde
            </span>{' '}
            da
            <br />
            sua Água em
            <br />
            Angola.
          </h1>

          <p className="text-white/60 text-base sm:text-lg mb-10 leading-relaxed max-w-lg">
            Especialistas em certificação industrial e residencial. Implementamos tecnologia de osmose
            inversa com certificação para garantir o bem-estar da sua família e da empresa da sua região.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="bg-[#00D4FF] hover:bg-white text-[#05162E] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-xl shadow-[#00D4FF]/30 text-sm sm:text-base">
              Solicitar Orçamento
            </a>
            <a
              href="#catalogo"
              className="glass border border-white/10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:border-[#00D4FF]/40 transition-all text-sm sm:text-base">
              Ver Catálogo
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 sm:mt-14">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#00D4FF]">500+</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">Clientes</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#00D4FF]">5+</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">Anos</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#00D4FF]">100%</div>
              <div className="text-white/40 text-xs uppercase tracking-widest mt-1">INIS</div>
            </div>
          </div>
        </div>

        {/* Right - Hero image */}
        <div className="relative reveal">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/equipa1.jpg"
              alt="Equipa Vilsan"
              width={600}
              height={520}
              className="w-full h-[520px] object-cover brightness-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05162E]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-5 flex items-center gap-4">
              <Droplet size={32} className="text-cyan-400 flex-shrink-0" />
              <div>
                <div className="text-white font-bold">Água 100% Purificada</div>
                <div className="text-[#00D4FF] text-sm">Certificada pelo INIS • Luanda, Angola</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 text-center border border-[#00D4FF]/30">
            <div className="text-[#00D4FF] font-black text-xl">INIS ✓</div>
            <div className="text-white/50 text-xs">Certificado</div>
          </div>
        </div>
      </div>
    </header>
  )
}

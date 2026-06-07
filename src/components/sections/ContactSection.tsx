import { MapPin, Phone, Mail } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export default function ContactSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contacto">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left info */}
        <div className="reveal">
          <h2 className="text-[#00D4FF] font-black text-sm uppercase tracking-[0.3em] mb-4">
            Contacto
          </h2>
          <p
            className="text-3xl sm:text-4xl lg:text-6xl text-[#05162E] mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vamos dar{' '}
            <span className="italic text-[#00D4FF]">Pura Vida</span> ao seu projecto?
          </p>
          <p className="text-gray-500 text-lg mb-12">
            Entre em contacto com a nossa equipa de especialistas. Estamos prontos para responder às
            suas necessidades residenciais ou industriais.
          </p>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                icon: MapPin,
                title: 'Localização Principal',
                value: 'Centralidade do Kilamba, Luanda, Angola',
              },
              {
                icon: Phone,
                title: 'Telefone / WhatsApp',
                value: '+244 941 392 901',
              },
              {
                icon: Mail,
                title: 'Email Corporativo',
                value: 'vilsan@gmail.com',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
              <div key={item.title} className="flex items-start space-x-4 sm:space-x-6 group">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F0F9FF] rounded-2xl flex items-center justify-center text-[#00D4FF] group-hover:bg-[#00D4FF] group-hover:text-white transition-all flex-shrink-0">
                  <Icon size={24} />
                </div>
                <div>
                  <h6 className="font-bold text-[#05162E] text-sm sm:text-base">{item.title}</h6>
                  <p className="text-gray-500 text-sm sm:text-base">{item.value}</p>
                </div>
              </div>
            )})
            })
          </div>
        </div>

        {/* Form */}
        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

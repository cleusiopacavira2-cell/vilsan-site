import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import HeroSection from '@/components/sections/HeroSection'
import TickerBanner from '@/components/sections/TickerBanner'
import ServicesSection from '@/components/sections/ServicesSection'
import HomeClient from '@/components/sections/HomeClient'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutSection from '@/components/sections/AboutSection'
import FranchiseSection from '@/components/sections/FranchiseSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <ServicesSection />
      <HomeClient />
      <ProcessSection />
      <AboutSection />
      <FranchiseSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TemplatesSection from '@/components/landing/TemplatesSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import PricingSection from '@/components/landing/PricingSection'
import FaqSection from '@/components/landing/FaqSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'
import Reveal from '@/components/ui/Reveal'

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <Reveal><HowItWorksSection /></Reveal>
      <Reveal><TemplatesSection /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><PricingSection /></Reveal>
      <Reveal><FaqSection /></Reveal>
      <Reveal><CtaSection /></Reveal>
      <Reveal><Footer /></Reveal>
    </main>
  )
}

import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import TemplatesSection from '@/components/landing/TemplatesSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import PricingSection from '@/components/landing/PricingSection'
import FaqSection from '@/components/landing/FaqSection'
import CtaSection from '@/components/landing/CtaSection'
import Footer from '@/components/landing/Footer'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://memoamor.app'

export const metadata: Metadata = {
  alternates: { canonical: APP_URL },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${APP_URL}/#website`,
      url: APP_URL,
      name: 'Memoamor',
      description:
        'Crie uma página de memórias personalizada para casais: fotos, músicas, animações e um link único para compartilhar.',
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'Service',
      '@id': `${APP_URL}/#service`,
      name: 'Memoamor',
      serviceType: 'Página de memórias para casais',
      description:
        'Crie uma página de memórias personalizada com fotos, músicas e animações. O presente perfeito para aniversário de namoro ou casamento.',
      url: APP_URL,
      provider: {
        '@type': 'Organization',
        name: 'Memoamor',
        url: APP_URL,
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contato@memoamor.app',
          contactType: 'customer support',
          availableLanguage: 'Portuguese',
        },
      },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      offers: [
        {
          '@type': 'Offer',
          name: 'Plano Essencial',
          price: '19.90',
          priceCurrency: 'BRL',
          description: 'Página de memórias por 1 ano com link automático.',
        },
        {
          '@type': 'Offer',
          name: 'Plano Premium',
          price: '29.90',
          priceCurrency: 'BRL',
          description: 'Página de memórias por 1 ano com link personalizado e mais recursos.',
        },
      ],
    },
  ],
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="[overflow-x:clip]">
        <Navbar />
        <HeroSection />
        <HowItWorksSection />
        <TemplatesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
        <Footer />
      </main>
    </>
  )
}

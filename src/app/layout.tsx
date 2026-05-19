import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import CookieBanner from '@/components/ui/CookieBanner'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://memoamor.app'
const OG_TITLE = 'Memoamor: A história de vocês, em uma página'
const OG_DESCRIPTION =
  'Crie uma página de memórias personalizada para casais: fotos, músicas, animações e um link único para compartilhar. O presente perfeito para aniversário de namoro ou casamento.'

export const metadata: Metadata = {
  title: {
    default: OG_TITLE,
    template: '%s | Memoamor',
  },
  description: OG_DESCRIPTION,
  icons: { icon: '/favicon.png' },
  metadataBase: new URL(APP_URL),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: APP_URL,
    siteName: 'Memoamor',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Memoamor: A história de vocês, em uma página',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: ['/api/og'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap"
          rel="stylesheet"
        />
        {/* fbq queue init — runs synchronously so window.fbq exists before any component useEffect */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1685469816137988');
          fbq('track', 'PageView');
        `}} />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L9PMWQD4HK"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L9PMWQD4HK');
          `}
        </Script>
        <Script
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="afterInteractive"
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1685469816137988&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}

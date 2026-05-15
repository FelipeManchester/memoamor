import type { Metadata } from 'next'
import '@/styles/globals.css'

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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

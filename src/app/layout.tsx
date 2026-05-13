import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Memoamor — A história de vocês, em uma página',
    template: '%s | Memoamor',
  },
  description:
    'Crie uma página de memórias personalizada para comemorar a história de vocês. Fotos, textos, música e animações. Compartilhe com um link.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://memoamor.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://memoamor.app',
    siteName: 'Memoamor',
    title: 'Memoamor — A história de vocês, em uma página',
    description:
      'Crie uma página de memórias personalizada para comemorar a história de vocês.',
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

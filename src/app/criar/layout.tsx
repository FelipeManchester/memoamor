import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar minha página',
  robots: { index: false, follow: false },
}

export default function CriarLayout({ children }: { children: React.ReactNode }) {
  return children
}

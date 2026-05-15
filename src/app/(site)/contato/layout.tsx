import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a equipe do Memoamor. Respondemos dúvidas sobre sua página de memórias em até 1 dia útil.',
}

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children
}

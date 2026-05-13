import type { MemoryPage } from '@/types'

export const mockPage: MemoryPage = {
  id: 'mock-id',
  slug: 'ana-e-pedro-2016',
  status: 'active',
  plan: 'essential',
  template: 'petals',

  nameA: 'Ana',
  nameB: 'Pedro',
  startDate: '2016-05-07',
  pageTitle: null,

  youtubeUrl: 'https://www.youtube.com/watch?v=450p7goxZqg',
  memories: [
    {
      id: '1',
      dateLabel: 'Maio de 2016',
      title: 'O início de tudo',
      body: 'Aqui começa a história mais bonita que já vivi. Cada detalhe daquele dia ficou guardado dentro de mim — o jeito que você sorriu, a leveza do ar, a certeza que nasceu sem avisar.',
      imagePath: null,
    },
    {
      id: '2',
      dateLabel: 'Uma viagem especial',
      title: 'Lugares que guardam a gente',
      body: 'Alguns lugares ficam em nós não pelo que têm, mas por quem estava ao nosso lado. Esse foi um desses lugares — simples e perfeito porque era nosso.',
      imagePath: null,
    },
    {
      id: '3',
      dateLabel: 'Um dia qualquer',
      title: 'Os momentos pequenos',
      body: 'Não foram só as grandes aventuras. Foram os domingos parados, as risadas sem motivo, os silêncios que não precisavam de palavras.',
      imagePath: null,
    },
  ],
  gallery: [],

  customerEmail: 'ana@email.com',
  paidAt: '2024-01-01T00:00:00Z',
  reservedUntil: null,
  expiresAt: '2025-01-01T00:00:00Z',
  abacateSessionId: null,

  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}
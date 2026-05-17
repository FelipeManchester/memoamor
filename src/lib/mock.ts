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
  closingQuote: null,

  youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY',
  memories: [
    {
      id: '1',
      dateLabel: '',
      title: 'O início de tudo',
      body: 'Era um café pequeno, a mesa estava perto da janela e a luz entrava de um jeito diferente naquele dia. Eu não sabia ainda, mas aquela tarde ia mudar tudo. Foi ali que eu te vi pela primeira vez — e algo dentro de mim simplesmente soube.',
      imagePath: '/images/1.png',
    },
    {
      id: '2',
      dateLabel: '',
      title: 'De mãos dadas',
      body: 'A gente não tinha planejado nada. Era só uma caminhada, um parque, um dia comum. Mas quando você segurou minha mão pela primeira vez, o mundo inteiro ficou mais quieto. Algumas coisas simples são as que mais ficam.',
      imagePath: '/images/2.png',
    },
    {
      id: '3',
      dateLabel: '',
      title: 'O fim do mundo era ali',
      body: 'Sentamos no mesmo lugar sem combinar. O sol estava caindo devagar e nenhum dos dois queria falar com medo de quebrar aquele momento. Aprendi naquele dia que o lugar mais bonito do mundo é qualquer lugar onde você esteja.',
      imagePath: '/images/3.png',
    },
    {
      id: '4',
      dateLabel: '',
      title: 'Nossa casa',
      body: 'As caixas ainda estavam pelo chão quando você me trouxe um café e sentou do meu lado no meio de toda aquela bagunça. Foi ali que entendi que lar não é um lugar — é uma pessoa. E eu tinha encontrado o meu.',
      imagePath: '/images/4.png',
    },
    {
      id: '5',
      dateLabel: '',
      title: 'Para sempre assim',
      body: 'Os anos passaram, mas aquela sensação ficou — a de que eu escolheria você de novo em qualquer vida. Sentados aqui, olhando para tudo que construímos juntos, só consigo pensar em uma coisa: valeu cada segundo.',
      imagePath: '/images/5.png',
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

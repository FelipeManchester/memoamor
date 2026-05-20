import type { MemoryPage } from '@/types'

export const mockPage: MemoryPage = {
  id: 'mock-id',
  slug: 'helena-e-caio-2018',
  status: 'active',
  plan: 'essential',
  template: 'petals',

  nameA: 'Helena',
  nameB: 'Caio',
  startDate: '2018-03-14',
  pageTitle: null,
  closingQuote: null,

  youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY',
  memories: [
    {
      id: '1',
      dateLabel: '',
      title: 'Aquele entardecer que ficou',
      body: 'A gente subiu sem motivo nenhum e ficou ali até o céu virar laranja inteiro. Não tinha pressa de descer, não tinha pressa de nada. Era só a vista, o silêncio bom e a certeza tranquila de que era ali que a gente queria estar.',
      imagePath: '/images/memory-1.jpeg',
    },
    {
      id: '2',
      dateLabel: '',
      title: 'O mar guardou esse momento',
      body: 'Os pés na água fria, o vento mexendo no cabelo e a gente abraçado vendo o sol se despedir. Tem fotos que precisam de explicação. Essa não. Era o tipo de instante que a gente já sabia, ali mesmo, que ia carregar pra sempre.',
      imagePath: '/images/memory-2.jpeg',
    },
    {
      id: '3',
      dateLabel: '',
      title: 'Conversas de manhã',
      body: 'Sempre foi assim. O café esfriando, as mãos se procurando por cima da mesa e horas inteiras passando sem ninguém perceber. É nesses momentos mais quietos que a gente entende o que é estar bem ao lado de alguém.',
      imagePath: '/images/memory-3.jpeg',
    },
    {
      id: '4',
      dateLabel: '',
      title: 'Sempre buscando a mão do outro',
      body: 'Foi numa tarde sem rumo, o céu se desmanchando em laranja e a estrada inteira pra gente. Em algum momento as mãos se procuraram no ar, sem combinar nada. É assim que tudo sempre foi entre a gente. Mesmo separados, sempre alcançando o outro.',
      imagePath: '/images/memory-4.jpeg',
    },
    {
      id: '5',
      dateLabel: '',
      title: 'O nosso jeito de estar',
      body: 'Tem dias que a gente acorda devagar, sem hora pra nada. Você do meu lado, sem precisar dizer uma palavra. É aqui que mora a vida que a gente escolheu construir. No silêncio gostoso da manhã, no toque que já sabe o caminho.',
      imagePath: '/images/memory-5.jpeg',
    },
  ],
  gallery: [
    '/images/gallery-1.jpeg',
    '/images/gallery-2.jpeg',
    '/images/gallery-3.jpeg',
    '/images/gallery-4.jpeg',
    '/images/gallery-5.jpeg',
    '/images/gallery-6.jpeg',
    '/images/gallery-7.jpeg',
    '/images/gallery-8.jpeg',
  ],

  customerEmail: 'helena@email.com',
  paidAt: '2024-01-01T00:00:00Z',
  reservedUntil: null,
  expiresAt: '2025-01-01T00:00:00Z',
  abacateSessionId: null,

  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

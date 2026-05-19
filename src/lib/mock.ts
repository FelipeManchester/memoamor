import type { MemoryPage } from '@/types'

export const mockPage: MemoryPage = {
  id: 'mock-id',
  slug: 'laira-e-felipe-2016',
  status: 'active',
  plan: 'essential',
  template: 'petals',

  nameA: 'Laira',
  nameB: 'Felipe',
  startDate: '2013-10-26',
  pageTitle: null,
  closingQuote: null,

  youtubeUrl: 'https://www.youtube.com/watch?v=yKNxeF4KMsY',
  memories: [
    {
      id: '1',
      dateLabel: '',
      title: 'O início de tudo',
      body: 'No começo, muitos dos nossos encontros aconteciam no cinema. A gente escolhia qualquer filme, mas a verdade é que o filme importava pouco. Importava estar junto, dividir aquela escuridão e sair de lá de mão dada. Foi em noites assim que tudo começou.',
      imagePath: '/images/memory-1.jpeg',
    },
    {
      id: '2',
      dateLabel: '',
      title: 'Nosso primeiro Dia dos Namorados',
      body: 'Você chegou com um coraçãozinho de pelúcia na mão e um sorriso que me desarmou completamente. Não era o presente que ficou na memória. Era o gesto, o cuidado, a forma como você olhou pra mim. Eu soube ali que queria comemorar todos os outros do seu lado.',
      imagePath: '/images/memory-2.jpeg',
    },
    {
      id: '3',
      dateLabel: '',
      title: 'Nossa família',
      body: 'Nossa família começou a ganhar forma quando Arthur chegou e mudou tudo. A partir daí cada programa virou mais especial, cada foto ficou mais cheia de sentido. Somos três agora, e é exatamente assim que devia ser.',
      imagePath: '/images/memory-5.jpeg',
    },
    {
      id: '4',
      dateLabel: '',
      title: 'Um dia de pura alegria',
      body: 'Água por todo lado, sol na pele e a gente rindo à toa. Tem dias que não precisam de nada especial para ficar guardados pra sempre. Esse foi um deles.',
      imagePath: '/images/memory-4.jpeg',
    },
    {
      id: '5',
      dateLabel: '',
      title: 'A gente gosta de viajar',
      body: 'A gente sempre gostou de ir a algum lugar juntos. Não importa se é longe ou perto, se é planejado ou de última hora. Viajar com você sempre foi uma das coisas que mais nos aproximou, porque cada lugar novo é uma memória nova que só a gente tem.',
      imagePath: '/images/memory-3.jpeg',
    },
  ],
  gallery: [
    '/images/gallery-1.jpeg',
    '/images/gallery-2.jpeg',
    '/images/gallery-3.jpeg',
    '/images/gallery-5.jpeg',
    '/images/gallery-6.jpeg',
    '/images/gallery-7.jpeg',
    '/images/gallery-8.jpeg',
    '/images/gallery-9.jpeg',
  ],

  customerEmail: 'ana@email.com',
  paidAt: '2024-01-01T00:00:00Z',
  reservedUntil: null,
  expiresAt: '2025-01-01T00:00:00Z',
  abacateSessionId: null,

  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

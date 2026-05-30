# Memoamor

> A história de vocês, em uma página.

SaaS para criação de páginas de memórias personalizadas para casais — com animações GSAP, galeria de fotos, música e link único compartilhável.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 + TypeScript |
| Estilo | Tailwind CSS v4 |
| Animações | GSAP + ScrollTrigger |
| Banco | Supabase (Postgres) |
| Storage | Supabase Storage |
| Pagamentos | AbacatePay (PIX + cartão) |
| E-mail | Resend |
| Deploy | Vercel |

---

## Setup local

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha o `.env.local` com suas chaves:

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `ABACATEPAY_API_KEY` | Dashboard AbacatePay |
| `ABACATEPAY_WEBHOOK_SECRET` | Dashboard AbacatePay → Webhooks |
| `RESEND_API_KEY` | resend.com → API Keys |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Google Cloud Console |

### 3. Configure o banco de dados

No [Supabase SQL Editor](https://supabase.com/dashboard), execute o arquivo:

```
supabase/schema.sql
```

### 4. Configure o Storage

No dashboard do Supabase:
1. Vá em **Storage → New Bucket**
2. Nome: `pages`
3. Public: **false**
4. Configure as policies conforme comentários no `schema.sql`

### 5. Rode o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx                    → Landing page
│   ├── demo/page.tsx               → Demonstração completa
│   ├── criar/page.tsx              → Formulário (5 passos)
│   ├── p/[slug]/page.tsx           → Página entregue (ISR)
│   ├── not-found.tsx               → 404
│   ├── (site)/
│   │   ├── sobre/page.tsx
│   │   ├── termos/page.tsx
│   │   ├── privacidade/page.tsx
│   │   ├── contato/page.tsx
│   │   └── cancelado/page.tsx
│   └── api/
│       ├── pages/route.ts          → Salva dados antes do checkout
│       ├── checkout/route.ts       → Cria sessão AbacatePay
│       └── abacate/webhook/route.ts → Ativa página após pagamento
│
├── components/
│   ├── page-builder/               → Blocos da página entregue
│   │   ├── Hero.tsx
│   │   ├── MemoryBlock.tsx
│   │   ├── Gallery.tsx
│   │   ├── QuoteBlock.tsx
│   │   ├── Closing.tsx
│   │   └── PlayerBar.tsx
│   ├── backgrounds/                → Templates visuais
│   │   ├── PetalBackground.tsx
│   │   ├── HeartBackground.tsx
│   │   └── ConstellationBackground.tsx
│   └── gsap/
│       └── ScrollAnimations.tsx    → Inicializa GSAP (sem renderização)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               → Browser client
│   │   └── server.ts               → Server + Admin client
│   ├── constants.ts                → Templates, planos, limites
│   ├── email.ts                    → Resend — entrega e renovação
│   ├── image.ts                    → Processamento WebP no browser
│   ├── slug.ts                     → Geração e sanitização de slugs
│   └── utils.ts                    → cn() helper
│
├── store/
│   └── createForm.ts               → Zustand — estado do formulário
│
├── types/
│   └── index.ts                    → Tipos TypeScript centrais
│
└── styles/
    └── globals.css                 → Design tokens + reset
```

---

## Fluxo de pagamento

```
Formulário (5 passos)
        ↓
POST /api/pages → salva dados, status: pending_payment
        ↓
POST /api/checkout → cria sessão AbacatePay
        ↓
Usuário paga (PIX ou cartão)
        ↓
POST /api/abacate/webhook → status: active + e-mail enviado
        ↓
/p/[slug] → página no ar
```

---

## Templates disponíveis

| ID | Nome | Mood |
|---|---|---|
| `petals` | Pétalas | Romântico e delicado |
| `hearts` | Corações | Apaixonado e caloroso |
| `constellations` | Constelações | Poético e etéreo |

---

## Plano

| Plano | Preço | Memórias | Fotos | Slug customizado | Marca d'água |
|---|---|---|---|---|---|
| Premium | R$ 29,90 | 6 | 10 | Sim | Não |

Plano único. Página no ar por **1 ano**. Renovação por **R$ 19,90/ano**.

> O plano `essential` (R$ 19,90) foi descontinuado, mas permanece no código e no schema para
> que páginas já vendidas continuem funcionando.

---

## Comandos úteis

```bash
npm run dev        # desenvolvimento local
npm run build      # build de produção
npm run typecheck  # verificação de tipos TypeScript
npm run lint       # ESLint
```

---

## Deploy (Vercel)

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente no painel da Vercel
3. Configure o webhook do AbacatePay apontando para:
   `https://memoamor.app/api/abacate/webhook`
4. Deploy automático a cada push na `main`

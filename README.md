# Memoamor

> Your story, on a single page.

SaaS for creating personalized memory pages for couples — with GSAP animations, photo gallery, music, and a unique shareable link.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + ScrollTrigger |
| Database | Supabase (Postgres) |
| Storage | Supabase Storage |
| Payments | AbacatePay (PIX + card) |
| Email | Resend |
| Deploy | Vercel |

---

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` with your keys:

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API |
| `ABACATEPAY_API_KEY` | AbacatePay dashboard |
| `ABACATEPAY_WEBHOOK_SECRET` | AbacatePay dashboard → Webhooks |
| `RESEND_API_KEY` | resend.com → API Keys |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Google Cloud Console |

### 3. Set up the database

In the [Supabase SQL Editor](https://supabase.com/dashboard), run the file:

```
supabase/schema.sql
```

### 4. Set up Storage

In the Supabase dashboard:
1. Go to **Storage → New Bucket**
2. Name: `pages`
3. Public: **false**
4. Configure the policies as described in the comments in `schema.sql`

### 5. Run the project

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                    → Landing page
│   ├── demo/page.tsx               → Full demo
│   ├── criar/page.tsx              → Form (5 steps)
│   ├── p/[slug]/page.tsx           → Delivered page (ISR)
│   ├── not-found.tsx               → 404
│   ├── (site)/
│   │   ├── sobre/page.tsx
│   │   ├── termos/page.tsx
│   │   ├── privacidade/page.tsx
│   │   ├── contato/page.tsx
│   │   └── cancelado/page.tsx
│   └── api/
│       ├── pages/route.ts          → Saves data before checkout
│       ├── checkout/route.ts       → Creates AbacatePay session
│       └── abacate/webhook/route.ts → Activates page after payment
│
├── components/
│   ├── page-builder/               → Delivered page blocks
│   │   ├── Hero.tsx
│   │   ├── MemoryBlock.tsx
│   │   ├── Gallery.tsx
│   │   ├── QuoteBlock.tsx
│   │   ├── Closing.tsx
│   │   └── PlayerBar.tsx
│   ├── backgrounds/                → Visual templates
│   │   ├── PetalBackground.tsx
│   │   ├── HeartBackground.tsx
│   │   └── ConstellationBackground.tsx
│   └── gsap/
│       └── ScrollAnimations.tsx    → Initializes GSAP (renders nothing)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts               → Browser client
│   │   └── server.ts               → Server + Admin client
│   ├── constants.ts                → Templates, plans, limits
│   ├── email.ts                    → Resend — delivery and renewal
│   ├── image.ts                    → In-browser WebP processing
│   ├── slug.ts                     → Slug generation and sanitization
│   └── utils.ts                    → cn() helper
│
├── store/
│   └── createForm.ts               → Zustand — form state
│
├── types/
│   └── index.ts                    → Central TypeScript types
│
└── styles/
    └── globals.css                 → Design tokens + reset
```

---

## Payment flow

```
Form (5 steps)
        ↓
POST /api/pages → saves data, status: pending_payment
        ↓
POST /api/checkout → creates AbacatePay session
        ↓
User pays (PIX or card)
        ↓
POST /api/abacate/webhook → status: active + email sent
        ↓
/p/[slug] → page goes live
```

---

## Available templates

| ID | Name | Mood |
|---|---|---|
| `petals` | Petals (Pétalas) | Romantic and delicate |
| `hearts` | Hearts (Corações) | Passionate and warm |
| `constellations` | Constellations (Constelações) | Poetic and ethereal |

---

## Plan

| Plan | Price | Memories | Photos | Custom slug | Watermark |
|---|---|---|---|---|---|
| Premium | R$ 29.90 | 6 | 10 | Yes | No |

Single plan. Page stays live for **1 year**. Renewal costs **R$ 19.90/year**.

> The `essential` plan (R$ 19.90) has been discontinued, but remains in the code and schema so
> that pages already sold keep working.

---

## Useful commands

```bash
npm run dev        # local development
npm run build      # production build
npm run typecheck  # TypeScript type checking
npm run lint       # ESLint
```

---

## Deploy (Vercel)

1. Connect the repository on Vercel
2. Set the environment variables in the Vercel dashboard
3. Configure the AbacatePay webhook to point to:
   `https://memoamor.app/api/abacate/webhook`
4. Automatic deploy on every push to `main`

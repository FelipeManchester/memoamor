# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build
npm run typecheck  # TypeScript type checking (tsc --noEmit)
npm run lint       # ESLint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable                        | Source                                     |
| ------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase → Settings → API                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API                  |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase → Settings → API                  |
| `ABACATEPAY_API_KEY`            | AbacatePay dashboard                       |
| `ABACATEPAY_WEBHOOK_SECRET`     | AbacatePay → Webhooks                      |
| `RESEND_API_KEY`                | resend.com → API Keys                      |
| `RESEND_FROM_EMAIL`             | Verified sender address                    |
| `NEXT_PUBLIC_APP_URL`           | App base URL (e.g. `https://memoamor.app`) |
| `NEXT_PUBLIC_YOUTUBE_API_KEY`   | Google Cloud Console                       |

## Architecture

Memoamor is a SaaS for creating personalized memory pages for couples — with GSAP animations, photo galleries, music, and a unique shareable link. Built with Next.js 16, TypeScript, Tailwind CSS v4, Supabase, and AbacatePay (Brazilian PIX/card payments).

### Payment flow

```
/criar (5-step form, Zustand state)
  → POST /api/pages        saves data as pending_payment + reserves slug for 30 min
  → POST /api/checkout     creates AbacatePay session
  → User pays (PIX or card)
  → POST /api/abacate/webhook  sets status=active, sends delivery email via Resend
  → /p/[slug]              page goes live
```

### Key architectural decisions

**Supabase clients — two separate clients, never swap them:**

- `createAdminClient()` (`src/lib/supabase/server.ts`) — uses `SUPABASE_SERVICE_ROLE_KEY`, bypasses RLS. Used in all API routes.
- `createServerSupabaseClient()` — uses anon key with cookies, respects RLS. Available but not currently used by API routes.

**Database schema (`supabase/schema.sql`):**

- Single table `memory_pages` with `status` enum: `pending_payment | active | expired | cancelled`
- `memories` and `gallery` columns are stored as JSONB
- RLS: public can only SELECT `active` pages; all writes go through service role (API routes only)
- Storage bucket `pages` is private; photos are readable via a public SELECT policy on the bucket

**`/p/[slug]` page (`src/app/p/[slug]/page.tsx`):**

- Server component — fetches from Supabase directly (no API route)
- Maps snake_case DB columns to camelCase `MemoryPage` type manually
- Has a `USE_MOCK` flag (must stay `false` in production) for local development without a populated DB
- Shows `<PendingPage>` if `status === 'pending_payment'`; renders full page otherwise
- Background/template is currently hardcoded to `PetalBackground` — template switching is not yet fully wired

**Form state (`src/store/createForm.ts`):**

- Zustand store with `persist` middleware — state survives page refresh in localStorage key `memoamor-create-form`
- `File` objects in `MemoryFormItem.imageFile` and `GalleryItem.file` are **not** persisted (not serializable); only paths and statuses survive refresh

**Image processing (`src/lib/image.ts`):**

- Images are compressed to WebP (max 0.8 MB, 1920px) client-side using `browser-image-compression` before upload to Supabase Storage
- Object URLs from `createLocalPreview()` must be revoked with `revokeLocalPreview()` after use

**Types (`src/types/index.ts`):**

- Central type definitions. `MemoryPage` is the DB model (camelCase). `CreateFormData` is the client form state.
- `MemoryFormItem` has both `imageFile` (File, client-only) and `imagePath` (string, after upload)

**Constants (`src/lib/constants.ts`):**

- Plan limits, pricing, template IDs, AbacatePay product IDs, and upload limits all live here

**Slug generation (`src/lib/slug.ts`):**

- Slug is auto-generated from `nameA + nameB + startDate`; on unique constraint collision, a random suffix is added (up to 5 attempts)
- Premium plan allows custom slugs

**Email (`src/lib/email.ts`):**

- `sendDeliveryEmail` — sent on webhook activation
- `sendExpirationWarningEmail` — sent 30 days before expiry (requires a cron job, not yet implemented)
- Both functions instantiate `new Resend(...)` internally — no shared instance

**Backgrounds (`src/components/backgrounds/`):**

- Three animated background components: `PetalBackground`, `HeartBackground`, `ConstellationBackground`
- GSAP animations are initialized by `<ScrollAnimations />` (renders nothing, just registers triggers)

**Page builder components (`src/components/page-builder/`):**

- `Hero`, `MemoryBlock`, `Gallery`, `QuoteBlock`, `Closing`, `PlayerBar` — compose the delivered memory page
- `MemoryPageClient` handles the YouTube player bar (client component)
- `ResetFormOnSuccess` — clears Zustand store when `?payment=success` is in the URL

**Landing page components (`src/components/landing/`):**

- `Navbar`, `HeroSection`, `HowItWorksSection`, `TemplatesSection`, `PricingSection`, `FaqSection`, `CtaSection`, `Footer`

**Utility (`src/lib/utils.ts`):**

- `cn()` helper — combines `clsx` + `tailwind-merge`
  ## Skills
  Use the frontend design skill at .claude/skills/frontend-design/SKILL.md
  when building UI components.

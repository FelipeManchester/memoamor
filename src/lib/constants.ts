import type { Plan, Template } from '@/types'

// ─────────────────────────────────────────────
// Templates disponíveis
// ─────────────────────────────────────────────
export const TEMPLATES: Template[] = [
  {
    id: 'petals',
    name: 'Pétalas',
    description: 'Romântico e delicado',
  },
  {
    id: 'hearts',
    name: 'Corações',
    description: 'Apaixonado e caloroso',
  },
  {
    id: 'constellations',
    name: 'Constelações',
    description: 'Poético e etéreo',
  },
]

// ─────────────────────────────────────────────
// Planos disponíveis
// ─────────────────────────────────────────────
export const PLANS: Plan[] = [
  {
    id: 'essential',
    name: 'Essencial',
    priceInCents: 3900, // R$ 39,00
    maxMemories: 3,
    maxGalleryPhotos: 5,
    customSlug: false,
    watermark: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    priceInCents: 6900, // R$ 69,00
    maxMemories: 6,
    maxGalleryPhotos: 10,
    customSlug: true,
    watermark: false,
  },
]

// ─────────────────────────────────────────────
// Duração e renovação
// ─────────────────────────────────────────────
export const PAGE_DURATION_DAYS = 365
export const PAGE_RENEWAL_PRICE_CENTS = 990 // R$ 9,90
export const SLUG_RESERVATION_MINUTES = 30
export const GRACE_PERIOD_DAYS = 30 // após expirar, antes de tirar do ar

// ─────────────────────────────────────────────
// Limites de upload
// ─────────────────────────────────────────────
export const MAX_IMAGE_SIZE_MB = 10 // antes do processamento
export const MAX_IMAGE_SIZE_AFTER_MB = 0.8 // após conversão WebP
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// ── AbacatePay Product IDs ─────────────────────────────
export const ABACATEPAY_PRODUCTS: Record<string, string> = {
  essential: 'prod_YNjqaED0bSdkCmDY4UUbsy1L',
  premium: 'prod_L31sMaKtzJN0jF5NZzfRwKXM',
}

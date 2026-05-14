import SlugifyLib from 'slugify'
import { nanoid, customAlphabet } from 'nanoid'

const randomAlpha = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8)

// ─────────────────────────────────────────────
// Gera slug base a partir dos nomes e ano
// Ex: "Ana", "Pedro", "2016-05-07" → "ana-e-pedro-2016"
// ─────────────────────────────────────────────
export function generateBaseSlug(nameA: string, nameB: string, startDate: string): string {
  const year = startDate.split('-')[0]
  const raw = `${nameA} e ${nameB} ${year}`

  return SlugifyLib(raw, {
    lower: true,
    strict: true,       // remove caracteres especiais
    locale: 'pt',       // trata ã, ç, é etc.
    trim: true,
  })
}

// ─────────────────────────────────────────────
// Gera sufixo aleatório curto para colisões
// Ex: "ana-e-pedro-2016" → "ana-e-pedro-2016-k7xm"
// ─────────────────────────────────────────────
export function generateSlugWithSuffix(base: string): string {
  const suffix = nanoid(4).toLowerCase()
  return `${base}-${suffix}`
}

// ─────────────────────────────────────────────
// Gera slug aleatório para plano Essencial
// Ex: "k7m2x9pq"
// ─────────────────────────────────────────────
export function generateRandomSlug(): string {
  return randomAlpha()
}

// ─────────────────────────────────────────────
// Sanitiza slug customizado (plano Premium)
// Permite apenas letras, números e hífens
// ─────────────────────────────────────────────
export function sanitizeCustomSlug(input: string): string {
  return SlugifyLib(input, {
    lower: true,
    strict: true,
    locale: 'pt',
    trim: true,
  })
}

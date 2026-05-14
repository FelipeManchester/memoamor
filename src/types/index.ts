// ─────────────────────────────────────────────
// MEMOAMOR — Tipos centrais do projeto
// ─────────────────────────────────────────────

// ── Templates ────────────────────────────────
export type TemplateId = 'petals' | 'hearts' | 'constellations'

export interface Template {
  id: TemplateId
  name: string
  description: string
}

// ── Planos ───────────────────────────────────
export type PlanId = 'essential' | 'premium'

export interface Plan {
  id: PlanId
  name: string
  priceInCents: number
  maxMemories: number
  maxGalleryPhotos: number
  customSlug: boolean
  watermark: boolean
}

// ── Memória individual ────────────────────────
export interface Memory {
  id: string
  dateLabel: string       // "Maio de 2016" — texto livre
  title: string
  body: string
  imagePath: string | null
}

// ── Página de memórias (modelo completo) ─────
export interface MemoryPage {
  id: string
  slug: string
  status: PageStatus
  plan: PlanId
  template: TemplateId

  // Casal
  nameA: string
  nameB: string
  startDate: string       // ISO date "2016-05-07"
  pageTitle: string | null

  // Conteúdo
  closingQuote: string | null
  youtubeUrl: string | null
  memories: Memory[]
  gallery: string[]       // array de paths no Supabase Storage

  // Pagamento
  customerEmail: string
  paidAt: string | null
  reservedUntil: string | null
  expiresAt: string | null
  abacateSessionId: string | null

  // Timestamps
  createdAt: string
  updatedAt: string
}

export type PageStatus =
  | 'pending_payment'   // formulário preenchido, aguardando pagamento
  | 'active'            // pago e no ar
  | 'expired'           // 1 ano passou, aguardando renovação
  | 'cancelled'         // cancelado manualmente

// ── Formulário de criação (estado no cliente) ─
export interface CreateFormData {
  // Passo 1
  nameA: string
  nameB: string
  startDate: string
  pageTitle: string

  // Passo 2
  memories: MemoryFormItem[]

  // Passo 3
  gallery: GalleryItem[]

  // Passo 4
  youtubeUrl: string
  youtubeTitle: string | null

  // Passo 5
  template: TemplateId
  plan: PlanId
  customerEmail: string
}

export interface MemoryFormItem {
  id: string
  dateLabel: string
  title: string
  body: string
  imageFile: File | null
  imagePath: string | null   // path após upload
  imagePreview: string | null // object URL local para preview
  uploadStatus: UploadStatus
}

export interface GalleryItem {
  id: string
  file: File | null
  path: string | null
  preview: string | null
  uploadStatus: UploadStatus
}

export type UploadStatus = 'idle' | 'processing' | 'uploading' | 'done' | 'error'

// ── API responses ─────────────────────────────
export interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

export interface CreatePageResponse {
  slug: string
  checkoutUrl: string
}

export interface CheckPageStatusResponse {
  status: PageStatus
}

// ── YouTube oEmbed ────────────────────────────
export interface YouTubeOEmbed {
  title: string
  thumbnailUrl: string
  authorName: string
}

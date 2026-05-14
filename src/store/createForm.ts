import { create } from 'zustand'
import type { CreateFormData, MemoryFormItem, GalleryItem, TemplateId, PlanId } from '@/types'
import { nanoid } from 'nanoid'
import { persist } from 'zustand/middleware'

// ─────────────────────────────────────────────
// Estado inicial do formulário de criação
// ─────────────────────────────────────────────
const initialMemory = (): MemoryFormItem => ({
  id: nanoid(),
  dateLabel: '',
  title: '',
  body: '',
  imageFile: null,
  imagePath: null,
  imagePreview: null,
  uploadStatus: 'idle',
})

const initialState: CreateFormData = {
  nameA: '',
  nameB: '',
  startDate: '',
  pageTitle: '',
  memories: [initialMemory()],
  gallery: [],
  youtubeUrl: '',
  youtubeTitle: null,
  template: 'petals',
  closingQuote: 'Para sempre, com você.',
  plan: 'essential',
  customerEmail: '',
}

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────
interface CreateFormStore {
  data: CreateFormData
  currentStep: number

  // Ações gerais
  setStep: (step: number) => void
  updateField: <K extends keyof CreateFormData>(key: K, value: CreateFormData[K]) => void
  reset: () => void

  // Memórias
  addMemory: () => void
  removeMemory: (id: string) => void
  updateMemory: (id: string, updates: Partial<MemoryFormItem>) => void

  // Galeria
  addGalleryItem: (item: GalleryItem) => void
  removeGalleryItem: (id: string) => void
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void

  // Template e plano
  setTemplate: (template: TemplateId) => void
  setPlan: (plan: PlanId) => void
}

export const useCreateFormStore = create<CreateFormStore>()(
  persist(
    (set) => ({
      data: initialState,
      currentStep: 0,

      setStep: (step) => set({ currentStep: step }),

      updateField: (key, value) => set((state) => ({ data: { ...state.data, [key]: value } })),

      reset: () => set({ data: initialState, currentStep: 0 }),

      // ── Memórias ──────────────────────────────
      addMemory: () =>
        set((state) => ({
          data: {
            ...state.data,
            memories: [...state.data.memories, initialMemory()],
          },
        })),

      removeMemory: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            memories: state.data.memories.filter((m) => m.id !== id),
          },
        })),

      updateMemory: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            memories: state.data.memories.map((m) => (m.id === id ? { ...m, ...updates } : m)),
          },
        })),

      // ── Galeria ───────────────────────────────
      addGalleryItem: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            gallery: [...state.data.gallery, item],
          },
        })),

      removeGalleryItem: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            gallery: state.data.gallery.filter((g) => g.id !== id),
          },
        })),

      updateGalleryItem: (id, updates) =>
        set((state) => ({
          data: {
            ...state.data,
            gallery: state.data.gallery.map((g) => (g.id === id ? { ...g, ...updates } : g)),
          },
        })),

      // ── Template e plano ──────────────────────
      setTemplate: (template) => set((state) => ({ data: { ...state.data, template } })),

      setPlan: (plan) => set((state) => ({ data: { ...state.data, plan } })),
    }),
    {
      name: 'memoamor-create-form-v2', // v2: plano selecionado antes do passo 1
      partialize: (state) => ({
        // persiste apenas os dados — não o currentStep
        // assim sempre começa do passo onde estava
        data: state.data,
        currentStep: state.currentStep,
      }),
    },
  ),
)

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─────────────────────────────────────────────
// Utilitário para combinar classes Tailwind
// sem conflitos de especificidade
// ─────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

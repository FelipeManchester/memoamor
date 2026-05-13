import imageCompression from 'browser-image-compression'

// ─────────────────────────────────────────────
// Converte e comprime imagem para WebP no browser
// antes do upload para o Supabase Storage
// ─────────────────────────────────────────────
export async function processImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp' as const,
    initialQuality: 0.85,
  }

  const compressed = await imageCompression(file, options)

  // Garante extensão .webp no nome do arquivo
  const webpName = file.name.replace(/\.[^.]+$/, '.webp')
  return new File([compressed], webpName, { type: 'image/webp' })
}

// ─────────────────────────────────────────────
// Gera preview local (object URL) para exibir
// antes do upload sem depender do servidor
// ─────────────────────────────────────────────
export function createLocalPreview(file: File): string {
  return URL.createObjectURL(file)
}

// ─────────────────────────────────────────────
// Libera memória do object URL após uso
// ─────────────────────────────────────────────
export function revokeLocalPreview(url: string): void {
  URL.revokeObjectURL(url)
}

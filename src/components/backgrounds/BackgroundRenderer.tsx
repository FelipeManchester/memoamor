'use client'

import type { TemplateId } from '@/types'
import PetalBackground from './PetalBackground'
import HeartBackground from './HeartBackground'
import ConstellationBackground from './ConstellationBackground'

interface BackgroundRendererProps {
  template: TemplateId
}

const backgrounds: Record<TemplateId, React.ComponentType> = {
  petals: PetalBackground,
  hearts: HeartBackground,
  constellations: ConstellationBackground,
}

export default function BackgroundRenderer({ template }: BackgroundRendererProps) {
  const Background = backgrounds[template]
  return <Background />
}

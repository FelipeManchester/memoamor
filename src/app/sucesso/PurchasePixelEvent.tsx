'use client'

import { useEffect } from 'react'
import { fbqTrack } from '@/lib/pixel'

export default function PurchasePixelEvent({
  value,
  eventId,
}: {
  value: number
  eventId: string
}) {
  useEffect(() => {
    fbqTrack('Purchase', { value, currency: 'BRL' }, { eventID: eventId })
  }, [value, eventId])

  return null
}

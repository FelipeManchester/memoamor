export function fbqTrack(
  event: string,
  params?: Record<string, unknown>,
  eventData?: { eventID: string },
) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  if (eventData) {
    window.fbq('track', event, params ?? {}, eventData)
  } else {
    window.fbq('track', event, params)
  }
}

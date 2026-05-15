export {}

declare global {
  interface Window {
    fbq(
      action: string,
      event: string,
      params?: Record<string, unknown>,
      eventData?: { eventID?: string },
    ): void
    _fbq: unknown
  }
}

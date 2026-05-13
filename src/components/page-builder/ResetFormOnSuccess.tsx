'use client'

import { useEffect } from 'react'
import { useCreateFormStore } from '@/store/createForm'

export default function ResetFormOnSuccess() {
  const reset = useCreateFormStore((s) => s.reset)

  useEffect(() => {
    reset()
  }, [reset])

  return null
}

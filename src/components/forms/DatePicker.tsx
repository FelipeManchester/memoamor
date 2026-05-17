'use client'

import { useState, useEffect, useRef } from 'react'

interface DatePickerProps {
  value: string         // ISO YYYY-MM-DD (or empty)
  onChange: (iso: string) => void
  max?: string          // ISO YYYY-MM-DD upper bound
}

function isoToDisplay(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return ''
  return `${d}/${m}/${y}`
}

function applyMask(digits: string): string {
  const d = digits.slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

function parseDisplay(masked: string): { day: number; month: number; year: number } | null {
  const digits = masked.replace(/\D/g, '')
  if (digits.length < 8) return null
  const day = parseInt(digits.slice(0, 2), 10)
  const month = parseInt(digits.slice(2, 4), 10)
  const year = parseInt(digits.slice(4, 8), 10)
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null
  // Check real days in month
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day > daysInMonth) return null
  return { day, month, year }
}

export default function DatePicker({ value, onChange, max }: DatePickerProps) {
  const [display, setDisplay] = useState(() => isoToDisplay(value))
  const prevValue = useRef(value)

  // Sync when value resets externally (e.g., form clear)
  useEffect(() => {
    if (value !== prevValue.current) {
      prevValue.current = value
      setDisplay(isoToDisplay(value))
    }
  }, [value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    const masked = applyMask(digits)
    setDisplay(masked)

    const parsed = parseDisplay(masked)
    if (parsed) {
      const iso = `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(parsed.day).padStart(2, '0')}`
      onChange(iso)
    } else {
      onChange('')
    }
  }

  const parsed = parseDisplay(display)
  const isoSelected = parsed
    ? `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(parsed.day).padStart(2, '0')}`
    : ''
  const isFuture = !!(max && isoSelected && isoSelected > max)
  const isInvalid = display.replace(/\D/g, '').length === 8 && !parsed

  return (
    <div className="flex flex-col gap-1.5">
      <input
        type="text"
        inputMode="numeric"
        placeholder="DD/MM/AAAA"
        value={display}
        onChange={handleChange}
        maxLength={10}
        className="form-input"
        style={isFuture || isInvalid ? { borderColor: '#c0392b' } : undefined}
        aria-label="Data de início do relacionamento"
      />
      {isFuture && (
        <p className="text-[0.72rem]" style={{ color: '#c0392b' }}>
          A data deve ser igual ou anterior à data de hoje.
        </p>
      )}
      {isInvalid && !isFuture && (
        <p className="text-[0.72rem]" style={{ color: '#c0392b' }}>
          Data inválida.
        </p>
      )}
    </div>
  )
}

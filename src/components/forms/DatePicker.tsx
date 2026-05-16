'use client'

import { useState, useEffect } from 'react'

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 80 }, (_, i) => CURRENT_YEAR - i)

function daysInMonth(month: number, year: number): number {
  if (!month || !year) return 31
  return new Date(year, month, 0).getDate()
}

function parseISO(value: string) {
  const parts = value ? value.split('-') : []
  return {
    year: parts[0] ? parseInt(parts[0]) : 0,
    month: parts[1] ? parseInt(parts[1]) : 0,
    day: parts[2] ? parseInt(parts[2]) : 0,
  }
}

interface DatePickerProps {
  value: string
  onChange: (iso: string) => void
  max?: string
}

export default function DatePicker({ value, onChange, max }: DatePickerProps) {
  const initial = parseISO(value)
  const [day, setDay] = useState(initial.day)
  const [month, setMonth] = useState(initial.month)
  const [year, setYear] = useState(initial.year)

  // Sync when value resets externally (e.g., form clear)
  useEffect(() => {
    const parsed = parseISO(value)
    setDay(parsed.day)
    setMonth(parsed.month)
    setYear(parsed.year)
  }, [value])

  const maxDay = daysInMonth(month, year)
  const days = Array.from({ length: maxDay }, (_, i) => i + 1)

  function emit(d: number, m: number, y: number) {
    if (d && m && y) {
      const safe = Math.min(d, daysInMonth(m, y))
      onChange(`${y}-${String(m).padStart(2, '0')}-${String(safe).padStart(2, '0')}`)
    }
  }

  const isoSelected = day && month && year
    ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    : ''
  const isFuture = !!(max && isoSelected && isoSelected > max)

  function handleDay(val: number) {
    setDay(val)
    emit(val, month, year)
  }

  function handleMonth(val: number) {
    setMonth(val)
    // Clamp day if it exceeds days in new month
    const safe = day ? Math.min(day, daysInMonth(val, year)) : 0
    if (safe !== day) setDay(safe)
    emit(safe || day, val, year)
  }

  function handleYear(val: number) {
    setYear(val)
    const safe = day ? Math.min(day, daysInMonth(month, val)) : 0
    if (safe !== day) setDay(safe)
    emit(safe || day, month, val)
  }

  const cls = `form-input flex-1 appearance-none cursor-pointer${isFuture ? ' border-[#c0392b]' : ''}`

  return (
    <div className="flex flex-col gap-1.5">
    <div className="flex gap-2">
      <select
        value={day || ''}
        onChange={(e) => handleDay(parseInt(e.target.value) || 0)}
        className={cls}
        aria-label="Dia"
      >
        <option value="">Dia</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select
        value={month || ''}
        onChange={(e) => handleMonth(parseInt(e.target.value) || 0)}
        className={`${cls} flex-[2]`}
        aria-label="Mês"
      >
        <option value="">Mês</option>
        {MONTHS.map((m, i) => (
          <option key={i} value={i + 1}>{m}</option>
        ))}
      </select>

      <select
        value={year || ''}
        onChange={(e) => handleYear(parseInt(e.target.value) || 0)}
        className={cls}
        aria-label="Ano"
      >
        <option value="">Ano</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
    {isFuture && (
      <p className="text-[0.72rem]" style={{ color: '#c0392b' }}>
        A data deve ser igual ou anterior à data de hoje.
      </p>
    )}
    </div>
  )
}

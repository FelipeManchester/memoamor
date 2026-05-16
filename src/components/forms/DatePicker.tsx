'use client'

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

interface DatePickerProps {
  value: string
  onChange: (iso: string) => void
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const parts = value ? value.split('-') : []
  const year = parts[0] ? parseInt(parts[0]) : 0
  const month = parts[1] ? parseInt(parts[1]) : 0
  const day = parts[2] ? parseInt(parts[2]) : 0

  const maxDay = daysInMonth(month, year)
  const days = Array.from({ length: maxDay }, (_, i) => i + 1)

  function update(newDay: number, newMonth: number, newYear: number) {
    if (!newDay || !newMonth || !newYear) return
    const max = daysInMonth(newMonth, newYear)
    const safeDay = Math.min(newDay, max)
    onChange(
      `${newYear}-${String(newMonth).padStart(2, '0')}-${String(safeDay).padStart(2, '0')}`,
    )
  }

  const selectClass =
    'form-input flex-1 appearance-none cursor-pointer'

  return (
    <div className="flex gap-2">
      <select
        value={day || ''}
        onChange={(e) => update(parseInt(e.target.value), month, year)}
        className={selectClass}
        aria-label="Dia"
      >
        <option value="">Dia</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={month || ''}
        onChange={(e) => {
          const newMonth = parseInt(e.target.value)
          update(day, newMonth, year)
        }}
        className={`${selectClass} flex-[2]`}
        aria-label="Mês"
      >
        <option value="">Mês</option>
        {MONTHS.map((m, i) => (
          <option key={i} value={i + 1}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={year || ''}
        onChange={(e) => update(day, month, parseInt(e.target.value))}
        className={selectClass}
        aria-label="Ano"
      >
        <option value="">Ano</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}

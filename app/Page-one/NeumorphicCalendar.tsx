'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'

interface NeumorphicCalendarProps {
  value: string
  onChange: (date: string) => void
  onClose: () => void
  anchorRect?: DOMRect
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function NeumorphicCalendar({
  value,
  onChange,
  onClose,
  anchorRect,
}: NeumorphicCalendarProps) {
  const POPUP_WIDTH = 360
  const POPUP_HEIGHT = 440
  const GAP = 12
  const MARGIN = 16

  const today = new Date()
  const initial = value ? new Date(value) : today

  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  const selectedDate = value ? new Date(value) : null

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else setViewMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else setViewMonth((m) => m + 1)
  }

  const goToday = () => {
    const t = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    onChange(`${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`)
    onClose()
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate()

  const cells: { day: number; type: 'prev' | 'curr' | 'next' }[] = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, type: 'prev' })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type: 'curr' })
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, type: 'next' })

  const handleSelect = (day: number, type: 'prev' | 'curr' | 'next') => {
    let m = viewMonth
    let y = viewYear
    if (type === 'prev') {
      m -= 1
      if (m < 0) {
        m = 11
        y -= 1
      }
    }
    if (type === 'next') {
      m += 1
      if (m > 11) {
        m = 0
        y += 1
      }
    }
    const pad = (n: number) => String(n).padStart(2, '0')
    onChange(`${y}-${pad(m + 1)}-${pad(day)}`)
    onClose()
  }

  const isToday = (day: number, type: string) =>
    type === 'curr' &&
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear()

  const isSelected = (day: number, type: string) => {
    if (!selectedDate || type !== 'curr') return false
    return (
      day === selectedDate.getDate() &&
      viewMonth === selectedDate.getMonth() &&
      viewYear === selectedDate.getFullYear()
    )
  }

  const popupStyle: React.CSSProperties = (() => {
    if (!anchorRect) {
      return {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }

    const viewportW = window.innerWidth
    const viewportH = window.innerHeight

    const fitsRight = anchorRect.right + GAP + POPUP_WIDTH + MARGIN <= viewportW
    const left = fitsRight ? anchorRect.right + GAP : anchorRect.left - GAP - POPUP_WIDTH

    let top = anchorRect.top + anchorRect.height / 2 - POPUP_HEIGHT / 2
    top = Math.max(MARGIN, Math.min(top, viewportH - POPUP_HEIGHT - MARGIN))
    return { position: 'fixed' as const, top, left }
  })()

  return createPortal(
    <>
      <div className="s1-cal-backdrop" onClick={onClose} />
      <div className="s1-cal-popup" style={popupStyle} onClick={(e) => e.stopPropagation()}>
        <div className="s1-cal-header">
          <button className="s1-cal-nav" onClick={prevMonth} aria-label="Previous month">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="rgba(49,52,75,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="s1-cal-month-label">
            {MONTHS[viewMonth]}, {viewYear}
          </span>
          <button className="s1-cal-nav" onClick={nextMonth} aria-label="Next month">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4L10 8L6 12"
                stroke="rgba(49,52,75,0.7)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="s1-cal-divider" />

        <div className="s1-cal-grid">
          {DAYS.map((d) => (
            <div key={d} className="s1-cal-day-label">
              {d}
            </div>
          ))}
          {cells.map((cell, idx) => (
            <button
              key={idx}
              className={`s1-cal-cell
                ${cell.type !== 'curr' ? 's1-cal-cell--other' : ''}
                ${isToday(cell.day, cell.type) ? 's1-cal-cell--today' : ''}
                ${isSelected(cell.day, cell.type) ? 's1-cal-cell--selected' : ''}
                ${cell.type === 'curr' && !isToday(cell.day, cell.type) && !isSelected(cell.day, cell.type) ? 's1-cal-cell--raised' : ''}
              `}
              onClick={() => handleSelect(cell.day, cell.type)}
            >
              {cell.day}
            </button>
          ))}
        </div>

        <div className="s1-cal-footer">
          <button className="s1-cal-back" onClick={onClose}>
            Back
          </button>
          <button className="s1-cal-today" onClick={goToday}>
            Today
          </button>
        </div>
      </div>
    </>,
    document.body
  )
}

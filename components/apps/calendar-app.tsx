"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface CalendarAppProps {
  isDarkMode: boolean
}

type CalendarEvent = {
  id: number
  date: string
  title: string
  time: string
  category: "social" | "work" | "personal"
}

const events: CalendarEvent[] = [
  { id: 1, date: "09-21", title: "Meu aniversario", time: "O dia todo", category: "social" },
]

function formatMonthDay(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${month}-${day}`
}

function isSameDay(first: Date, second: Date) {
  return (
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() === second.getFullYear()
  )
}

function getCategoryLabel(category: CalendarEvent["category"]) {
  switch (category) {
    case "work":
      return "trabalho"
    case "personal":
      return "pessoal"
    default:
      return "social"
  }
}

export default function CalendarApp({ isDarkMode }: CalendarAppProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const today = new Date()

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    for (let index = 0; index < firstDay; index++) {
      days.push(<div key={`empty-${index}`} className="h-10 w-10" />)
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const hasEvent = events.some((event) => event.date === formatMonthDay(date))
      const isToday = isSameDay(date, today)

      const dayClasses = isToday
        ? isDarkMode
          ? "bg-blue-500 text-white ring-2 ring-blue-300/60"
          : "bg-blue-600 text-white ring-2 ring-blue-200"
        : hasEvent
          ? isDarkMode
            ? "bg-blue-950 text-blue-100"
            : "bg-blue-100 text-blue-800"
          : isDarkMode
            ? "text-gray-200 hover:bg-gray-900"
            : "text-gray-700 hover:bg-gray-100"

      days.push(
        <div key={day} className="flex justify-center">
          <div
            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${dayClasses}`}
            aria-label={isToday ? `Hoje, dia ${day}` : `Dia ${day}`}
          >
            {day}
            {hasEvent && !isToday ? (
              <span
                className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${
                  isDarkMode ? "bg-blue-300" : "bg-blue-600"
                }`}
              />
            ) : null}
          </div>
        </div>,
      )
    }

    return days
  }

  const monthLabel = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(currentMonth)

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} aria-label="Mes anterior">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-bold capitalize">{monthLabel}</h2>
            <button
              type="button"
              onClick={goToToday}
              className={`mt-1 rounded-full px-3 py-1 text-xs font-medium ${
                isDarkMode ? "bg-gray-900 text-blue-200" : "bg-blue-50 text-blue-700"
              }`}
            >
              Voltar para hoje
            </button>
          </div>

          <button onClick={nextMonth} aria-label="Proximo mes">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold">Proximos eventos</h3>
            <button
              className={`rounded-full p-1 ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label="Adicionar evento"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex justify-between gap-3">
                  <h4 className="font-medium">{event.title}</h4>
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${
                      event.category === "work"
                        ? "bg-blue-100 text-blue-800"
                        : event.category === "personal"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {getCategoryLabel(event.category)}
                  </span>
                </div>
                <div className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {event.date} • {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

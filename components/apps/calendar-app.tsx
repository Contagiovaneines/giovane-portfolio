"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface CalendarAppProps {
  isDarkMode: boolean
}

export default function CalendarApp({ isDarkMode }: CalendarAppProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Evento de aniversário, agora sem ano, para ser repetido todo ano
  const events = [
    { id: 1, date: "09-21", title: "Meu Aniversário", time: "O dia todo", category: "social" }, // Seu aniversário
  ]

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const renderCalendar = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    // Adiciona células vazias para os dias antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Adiciona células para cada dia do mês
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const dateString = `${date.getMonth() + 1}-${day}`.padStart(5, '0') // Formato "MM-DD"
      const hasEvent = events.some((event) => event.date === dateString)

      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center rounded-full text-sm ${
            hasEvent ? (isDarkMode ? "bg-blue-900 text-white" : "bg-blue-100 text-blue-800") : ""
          }`}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-4">
        {/* Navegação do mês */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button onClick={nextMonth}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grade do calendário */}
        <div className="mb-4">
          {/* Nomes dos dias */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Dias do calendário */}
          <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
        </div>

        {/* Eventos */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Próximos Eventos</h3>
            <button
              className={`p-1 rounded-full ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      event.category === "work"
                        ? "bg-blue-100 text-blue-800"
                        : event.category === "personal"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {event.category}
                  </span>
                </div>
                <div className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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

"use client"

import { useState, useEffect } from "react"
import { Battery, Wifi, Signal, Bell } from "lucide-react"

interface StatusBarProps {
  isDarkMode: boolean
  notificationCount?: number
  onToggleNotifications?: () => void
}

export default function StatusBar({ isDarkMode, notificationCount = 0, onToggleNotifications }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`flex justify-between items-center px-6 py-2 text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
      <div className="font-semibold">{currentTime}</div>
      <div className="flex items-center gap-2">
        {onToggleNotifications && (
          <button
            onClick={onToggleNotifications}
            className="relative flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell size={16} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        )}
        <Signal size={16} />
        <Wifi size={16} />
        <Battery size={16} />
      </div>
    </div>
  )
}

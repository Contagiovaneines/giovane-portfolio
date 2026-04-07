"use client"

import { useEffect, useState } from "react"
import { BatteryCharging, Bell, Signal, Wifi } from "lucide-react"

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

  const textClass = isDarkMode ? "text-white" : "text-slate-900"
  const iconButtonClass = isDarkMode
    ? "border-white/10 bg-white/6 hover:bg-white/10"
    : "border-slate-300/80 bg-white/95 hover:bg-slate-100"
  const networkIconClass = isDarkMode ? "text-white" : "text-slate-900"

  return (
    <div className={`flex items-center justify-between px-6 py-2 text-sm ${textClass}`}>
      <div className="font-semibold">{currentTime}</div>
      <div className="flex items-center gap-2">
        {onToggleNotifications && (
          <button
            onClick={onToggleNotifications}
            className={`relative flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${iconButtonClass}`}
            aria-label="Notifications"
          >
            <Bell size={16} className={notificationCount > 0 ? "status-bell-ring" : "status-icon-float"} />
            {notificationCount > 0 && (
              <>
                <span className="status-badge-halo absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500/45" />
                <span className="status-badge-pulse absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white shadow-[0_4px_12px_rgba(239,68,68,0.42)]">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              </>
            )}
          </button>
        )}
        <span className={`relative flex h-4 w-4 items-center justify-center ${networkIconClass}`}>
          <Signal size={16} className="opacity-30" />
          <Signal size={16} className="status-network-search absolute inset-0" style={{ animationDelay: "0ms" }} />
        </span>
        <span className={`relative flex h-4 w-4 items-center justify-center ${networkIconClass}`}>
          <Wifi size={16} className="opacity-30" />
          <Wifi size={16} className="status-network-search absolute inset-0" style={{ animationDelay: "220ms" }} />
        </span>
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="status-battery-glow absolute inset-0 rounded-full bg-emerald-400/25" />
          <BatteryCharging size={16} className="status-battery-charge relative text-emerald-400" />
        </span>
      </div>
    </div>
  )
}

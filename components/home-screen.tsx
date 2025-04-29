"use client"

import StatusBar from "./status-bar"
import AppIcon from "./app-icon"
import { apps } from "@/lib/app-data"
import type { AppType, ThemeSettings } from "@/lib/types"
import { Moon, Sun, Search, Settings, ChevronDown, User } from "lucide-react"
import clsx from "clsx"

interface HomeScreenProps {
  onAppOpen: (app: AppType) => void
  isDarkMode: boolean
  themeSettings: ThemeSettings
  onToggleTheme: () => void
  onToggleNotifications: () => void
  onToggleSearch: () => void
  onToggleSettings: () => void
  onToggleProfile: () => void
  notificationCount: number
}

export default function HomeScreen({
  onAppOpen,
  isDarkMode,
  themeSettings,
  onToggleTheme,
  onToggleNotifications,
  onToggleSearch,
  onToggleSettings,
  onToggleProfile,
  notificationCount,
}: HomeScreenProps) {
  const getPrimaryColorClass = () => {
    const colorClasses: Record<string, string> = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
    }
    return colorClasses[themeSettings.primaryColor] || "bg-blue-500"
  }

  const buttonClasses = clsx(
    "p-2 rounded-full",
    isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
  )

  const dockButtonClasses = clsx(
    "p-3 rounded-full",
    isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
  )

  return (
    <div
      className={clsx(
        "flex flex-col h-full",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <StatusBar
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
        onToggleNotifications={onToggleNotifications}
      />

      {/* Ações rápidas */}
      <div className="px-4 py-2 flex justify-between">
        <button onClick={onToggleSearch} className={buttonClasses}>
          <Search size={18} className={isDarkMode ? "text-white" : "text-black"} />
        </button>
        <button onClick={onToggleProfile} className={buttonClasses}>
          <User size={18} className={isDarkMode ? "text-white" : "text-black"} />
        </button>
      </div>

      {/* Área de apps */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {apps.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              onClick={() => onAppOpen(app)}
              isDarkMode={isDarkMode}
              iconStyle={themeSettings.iconStyle}
            />
          ))}
        </div>
      </div>

      {/* Dock inferior */}
      <div className="p-4 flex justify-center space-x-2">
        <button
          onClick={onToggleTheme}
          className={clsx(dockButtonClasses, getPrimaryColorClass())}
        >
          {isDarkMode ? (
            <Sun size={24} className="text-white" />
          ) : (
            <Moon size={24} className="text-white" />
          )}
        </button>
        <button onClick={onToggleSettings} className={dockButtonClasses}>
          <Settings size={24} className={isDarkMode ? "text-white" : "text-black"} />
        </button>
        <button onClick={onToggleNotifications} className={dockButtonClasses}>
          <ChevronDown size={24} className={isDarkMode ? "text-white" : "text-black"} />
        </button>
      </div>
    </div>
  )
}

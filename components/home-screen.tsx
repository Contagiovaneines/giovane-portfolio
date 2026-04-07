"use client"

import { ChevronDown, Moon, Search, Settings, Sun, User } from "lucide-react"
import clsx from "clsx"

import { apps } from "@/lib/app-data"
import type { AppType, ThemeSettings } from "@/lib/types"

import AppIcon from "./app-icon"
import StatusBar from "./status-bar"

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
  const getThemeToggleButtonClass = () => {
    const darkModeClasses: Record<string, string> = {
      blue: "border-blue-400/20 bg-blue-500 hover:bg-blue-400",
      purple: "border-purple-400/20 bg-purple-500 hover:bg-purple-400",
      green: "border-emerald-400/20 bg-emerald-500 hover:bg-emerald-400",
      red: "border-rose-400/20 bg-rose-500 hover:bg-rose-400",
      orange: "border-amber-300/40 bg-amber-400 hover:bg-amber-300",
    }

    const lightModeClasses: Record<string, string> = {
      blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
      purple: "border-purple-200 bg-purple-50 hover:bg-purple-100",
      green: "border-emerald-200 bg-emerald-50 hover:bg-emerald-100",
      red: "border-rose-200 bg-rose-50 hover:bg-rose-100",
      orange: "border-amber-200 bg-amber-50 hover:bg-amber-100",
    }

    const classes = isDarkMode ? darkModeClasses : lightModeClasses

    return classes[themeSettings.primaryColor] || classes.blue
  }

  const getThemeToggleIconClass = () => {
    const darkModeClasses: Record<string, string> = {
      blue: "text-white",
      purple: "text-white",
      green: "text-white",
      red: "text-white",
      orange: "text-slate-950",
    }

    const lightModeClasses: Record<string, string> = {
      blue: "text-blue-700",
      purple: "text-purple-700",
      green: "text-emerald-700",
      red: "text-rose-700",
      orange: "text-amber-700",
    }

    const classes = isDarkMode ? darkModeClasses : lightModeClasses

    return classes[themeSettings.primaryColor] || classes.blue
  }

  const buttonClasses = clsx(
    "flex h-10 items-center rounded-full border px-3 shadow-sm backdrop-blur transition",
    isDarkMode
      ? "border-white/12 bg-[#111827]/88 text-white shadow-[0_12px_30px_rgba(0,0,0,0.28)] hover:bg-[#162033]"
      : "border-slate-300/80 bg-white/95 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.12)] hover:bg-slate-50",
  )

  const dockButtonClasses = clsx(
    "flex h-12 w-12 items-center justify-center rounded-full border shadow-sm backdrop-blur transition",
    isDarkMode
      ? "border-white/12 bg-[#182335] text-white shadow-[0_14px_30px_rgba(0,0,0,0.28)] hover:bg-[#202c42]"
      : "border-slate-300/80 bg-white/95 text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.12)] hover:bg-slate-50",
  )

  return (
    <div
      className={clsx(
        "flex h-full flex-col",
        isDarkMode
          ? "bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.12),_transparent_22%),linear-gradient(180deg,_#020617_0%,_#000000_28%,_#000000_100%)] text-white"
          : "bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_24%),linear-gradient(180deg,_#ffffff_0%,_#f3f4f6_100%)] text-slate-900",
      )}
    >
      <StatusBar
        isDarkMode={isDarkMode}
        notificationCount={notificationCount}
        onToggleNotifications={onToggleNotifications}
      />

      <div className="flex items-center gap-3 px-4 py-1">
        <button onClick={onToggleSearch} className={clsx(buttonClasses, "flex-1 justify-start gap-2 rounded-full px-4")}>
          <Search size={18} className={isDarkMode ? "text-white/80" : "text-slate-700"} />
          <span className={clsx("text-sm font-medium", isDarkMode ? "text-white/70" : "text-slate-600")}>Buscar</span>
        </button>
        <button onClick={onToggleProfile} className={clsx(buttonClasses, "h-10 w-10 justify-center rounded-full px-0")}>
          <User size={18} className={isDarkMode ? "text-white" : "text-slate-900"} />
        </button>
      </div>

      <div className="flex-1 px-4 pb-4 pt-5">
        <div className="grid grid-cols-4 gap-x-3 gap-y-5">
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

      <div className="flex justify-center gap-3 px-4 pb-5 pt-2">
        <button onClick={onToggleTheme} className={clsx(dockButtonClasses, getThemeToggleButtonClass())}>
          {isDarkMode ? (
            <Sun size={24} className={getThemeToggleIconClass()} />
          ) : (
            <Moon size={24} className={getThemeToggleIconClass()} />
          )}
        </button>
        <button onClick={onToggleSettings} className={dockButtonClasses}>
          <Settings size={24} className={isDarkMode ? "text-white" : "text-slate-900"} />
        </button>
        <button onClick={onToggleNotifications} className={dockButtonClasses}>
          <ChevronDown size={24} className={isDarkMode ? "text-white" : "text-slate-900"} />
        </button>
      </div>
    </div>
  )
}

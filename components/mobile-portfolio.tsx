"use client"

import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import { useReducedMotion } from "motion/react"

import AppScreen from "@/components/app-screen"
import BootScreen from "@/components/boot-screen"
import HomeScreen from "@/components/home-screen"
import NotificationPanel from "@/components/notification-panel"
import ProfileScreen from "@/components/profile-screen"
import SearchOverlay from "@/components/search-overlay"
import SettingsPanel from "@/components/settings-panel"
import { readStoredJson } from "@/lib/storage"
import type { AppType, Notification, ThemeSettings } from "@/lib/types"

const THEME_MODE_STORAGE_KEY = "portfolio-phone-dark-mode"
const THEME_SETTINGS_STORAGE_KEY = "portfolio-phone-theme-settings"

const defaultThemeSettings: ThemeSettings = {
  primaryColor: "blue",
  iconStyle: "rounded",
  fontSize: "medium",
}

function createInitialNotifications(): Notification[] {
  return [
    {
      id: "welcome-projects",
      app: "projects",
      title: "Portfolio atualizado",
      message: "Abra Projects para ver os destaques e o showreel.",
      time: new Date().toISOString(),
      read: false,
    },
  ]
}

function getPrimaryGradient(primaryColor: string) {
  const gradients: Record<string, string> = {
    blue: "from-blue-500 via-sky-400 to-cyan-300",
    purple: "from-violet-500 via-fuchsia-400 to-pink-300",
    green: "from-emerald-500 via-green-400 to-lime-300",
    red: "from-rose-500 via-red-400 to-orange-300",
    orange: "from-orange-500 via-amber-400 to-yellow-300",
  }

  return gradients[primaryColor] ?? gradients.blue
}

export function MobilePortfolio() {
  const reduceMotion = useReducedMotion()
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings)
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null)
  const [activeOverlay, setActiveOverlay] = useState<"search" | "settings" | "notifications" | "profile" | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>(() => createInitialNotifications())
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    setIsDarkMode(readStoredJson<boolean>(THEME_MODE_STORAGE_KEY, true))
    setThemeSettings(readStoredJson<ThemeSettings>(THEME_SETTINGS_STORAGE_KEY, defaultThemeSettings))
  }, [])

  useEffect(() => {
    window.localStorage.setItem(THEME_MODE_STORAGE_KEY, JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    window.localStorage.setItem(THEME_SETTINGS_STORAGE_KEY, JSON.stringify(themeSettings))
  }, [themeSettings])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBooting(false)
    }, reduceMotion ? 180 : 1600)

    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  const unreadCount = useMemo(() => notifications.filter((notification) => !notification.read).length, [notifications])
  const primaryColorClass = useMemo(() => getPrimaryGradient(themeSettings.primaryColor), [themeSettings.primaryColor])

  const closeAllLayers = () => {
    setSelectedApp(null)
    setActiveOverlay(null)
  }

  const handleAppOpen = (app: AppType) => {
    setSelectedApp(app)
    setActiveOverlay(null)
  }

  const handleToggleTheme = () => {
    setIsDarkMode((value) => !value)
  }

  const handleUpdateThemeSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings((current) => ({ ...current, ...settings }))
  }

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleClearNotification = (id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id))
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#111827] px-4 py-6 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_26%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_22%),linear-gradient(180deg,_#0f172a_0%,_#111827_48%,_#020617_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />

      <div className="relative w-full max-w-[392px]">
        <div className="relative rounded-[2.35rem] border border-white/10 bg-[#182335] p-1.5 shadow-[0_32px_120px_rgba(2,6,23,0.7)]">
          <div className="pointer-events-none absolute inset-0 rounded-[2.35rem] ring-1 ring-inset ring-white/5" />
          <div
            className={clsx(
              "relative h-[min(780px,calc(100dvh-3rem))] overflow-hidden rounded-[1.95rem]",
              isDarkMode ? "phone-theme-dark dark bg-black" : "phone-theme-light bg-white",
            )}
          >
            {isBooting ? (
              <BootScreen isDarkMode={true} primaryColorClass={primaryColorClass} />
            ) : (
              <>
                <HomeScreen
                  onAppOpen={handleAppOpen}
                  isDarkMode={isDarkMode}
                  themeSettings={themeSettings}
                  onToggleTheme={handleToggleTheme}
                  onToggleNotifications={() =>
                    setActiveOverlay((current) => (current === "notifications" ? null : "notifications"))
                  }
                  onToggleSearch={() => setActiveOverlay((current) => (current === "search" ? null : "search"))}
                  onToggleSettings={() => setActiveOverlay((current) => (current === "settings" ? null : "settings"))}
                  onToggleProfile={() => setActiveOverlay((current) => (current === "profile" ? null : "profile"))}
                  notificationCount={unreadCount}
                />

                {selectedApp ? (
                  <AppScreen
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    isDarkMode={isDarkMode}
                    themeSettings={themeSettings}
                    onAddNotification={(notification) => setNotifications((current) => [notification, ...current])}
                  />
                ) : null}

                {activeOverlay === "search" ? (
                  <SearchOverlay isDarkMode={isDarkMode} onClose={() => setActiveOverlay(null)} onAppOpen={handleAppOpen} />
                ) : null}

                {activeOverlay === "settings" ? (
                  <SettingsPanel
                    isDarkMode={isDarkMode}
                    themeSettings={themeSettings}
                    onClose={() => setActiveOverlay(null)}
                    onToggleTheme={handleToggleTheme}
                    onUpdateThemeSettings={handleUpdateThemeSettings}
                  />
                ) : null}

                {activeOverlay === "notifications" ? (
                  <NotificationPanel
                    notifications={notifications}
                    isDarkMode={isDarkMode}
                    onClose={() => setActiveOverlay(null)}
                    onMarkAsRead={handleMarkNotificationAsRead}
                    onClear={handleClearNotification}
                    onAppOpen={handleAppOpen}
                  />
                ) : null}

                {activeOverlay === "profile" ? (
                  <ProfileScreen isDarkMode={isDarkMode} onClose={() => setActiveOverlay(null)} />
                ) : null}
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={closeAllLayers}
          className="absolute -bottom-14 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-medium text-white/75 backdrop-blur transition hover:bg-white/10 sm:inline-flex"
        >
          Fechar telas abertas
        </button>
      </div>
    </main>
  )
}

'use client'

import { useState, useEffect } from "react"
import BootScreen from "@/components/boot-screen"
import HomeScreen from "@/components/home-screen"
import AppScreen from "@/components/app-screen"
import NotificationPanel from "@/components/notification-panel"
import SearchOverlay from "@/components/search-overlay"
import SettingsPanel from "@/components/settings-panel"
import ProfileScreen from "@/components/profile-screen"
import type { AppType, Notification, ThemeSettings } from "@/lib/types"

export default function MobileInterface() {
  const [isBooting, setIsBooting] = useState(true)
  const [activeApp, setActiveApp] = useState<AppType | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    primaryColor: "blue",
    iconStyle: "default",
    fontSize: "medium",
  })

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false)
    }, 3000)

    const savedTheme = localStorage.getItem("themeSettings")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setThemeSettings(parsedTheme)
        setIsDarkMode(parsedTheme.isDarkMode || false)
      } catch (e) {
        console.error("Failed to parse saved theme settings")
      }
    } else {
      setIsDarkMode(false)
    }

    const notificationTimer = setTimeout(() => {
      addNotification({
        id: "1",
        app: "instagram",
        title: "Nova mensagem",
        message: "Giovane voce tem uma mensagem para você",
        time: new Date().toISOString(),
        read: false,
      })
    }, 5000)

    return () => {
      clearTimeout(bootTimer)
      clearTimeout(notificationTimer)
    }
  }, [])

  const handleAppOpen = (app: AppType) => {
    setActiveApp(app)
    setShowNotifications(false)
    setShowSearch(false)
    setShowSettings(false)
    setShowProfile(false)
  }

  const handleAppClose = () => {
    setActiveApp(null)
  }

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    updateThemeSettings({ isDarkMode: newDarkMode })
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowSearch(false)
    setShowSettings(false)
    setShowProfile(false)
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
    setShowNotifications(false)
    setShowSettings(false)
    setShowProfile(false)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
    setShowNotifications(false)
    setShowSearch(false)
    setShowProfile(false)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
    setShowSearch(false)
    setShowSettings(false)
  }

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev])
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const updateThemeSettings = (newSettings: Partial<ThemeSettings>) => {
    const updatedSettings = { ...themeSettings, ...newSettings }
    setThemeSettings(updatedSettings)
    localStorage.setItem("themeSettings", JSON.stringify(updatedSettings))
  }

  const getPrimaryColorClass = () => {
    switch (themeSettings.primaryColor) {
      case "blue":
        return "from-blue-600 to-blue-400"
      case "purple":
        return "from-purple-600 to-purple-400"
      case "green":
        return "from-green-600 to-green-400"
      case "red":
        return "from-red-600 to-red-400"
      case "orange":
        return "from-orange-600 to-orange-400"
      default:
        return "from-blue-600 to-blue-400"
    }
  }

  return (
    <main className={`flex min-h-screen items-center justify-center p-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <div
        className={`relative overflow-hidden w-full max-w-[375px] h-[667px] rounded-[40px] border-8 ${isDarkMode ? "border-gray-800 bg-black" : "border-gray-300 bg-white"} shadow-xl`}
      >
        {isBooting ? (
          <BootScreen isDarkMode={isDarkMode} primaryColorClass={getPrimaryColorClass()} />
        ) : activeApp ? (
          <AppScreen
            app={activeApp}
            onClose={handleAppClose}
            isDarkMode={isDarkMode}
            themeSettings={themeSettings}
            onAddNotification={addNotification}
          />
        ) : (
          <HomeScreen
            onAppOpen={handleAppOpen}
            isDarkMode={isDarkMode}
            themeSettings={themeSettings}
            onToggleTheme={toggleTheme}
            onToggleNotifications={toggleNotifications}
            onToggleSearch={toggleSearch}
            onToggleSettings={toggleSettings}
            onToggleProfile={toggleProfile}
            notificationCount={notifications.filter((n) => !n.read).length}
          />
        )}

        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel
            notifications={notifications}
            isDarkMode={isDarkMode}
            onClose={() => setShowNotifications(false)}
            onMarkAsRead={markNotificationAsRead}
            onClear={clearNotification}
            onAppOpen={handleAppOpen}
          />
        )}

        {/* Search Overlay */}
        {showSearch && (
          <SearchOverlay isDarkMode={isDarkMode} onClose={() => setShowSearch(false)} onAppOpen={handleAppOpen} />
        )}

        {/* Settings Panel */}
        {showSettings && (
          <SettingsPanel
            isDarkMode={isDarkMode}
            themeSettings={themeSettings}
            onClose={() => setShowSettings(false)}
            onToggleTheme={toggleTheme}
            onUpdateThemeSettings={updateThemeSettings}
          />
        )}

        {/* Profile Screen */}
        {showProfile && <ProfileScreen isDarkMode={isDarkMode} onClose={() => setShowProfile(false)} />}
      </div>
    </main>
  )
}

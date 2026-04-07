"use client"

import { JSX, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import clsx from "clsx"

import type { AppType, Notification, ThemeSettings } from "@/lib/types"

import CameraApp from "./apps/camera-app"
import CalendarApp from "./apps/calendar-app"
import EmailApp from "./apps/email-app"
import GithubApp from "./apps/github-app"
import InstagramApp from "./apps/instagram-app"
import LinkedinApp from "./apps/linkedin-app"
import NotesApp from "./apps/notes-app"
import PhoneApp from "./apps/phone-app"
import ProjectsApp from "./apps/projects-app"
import SpotifyApp from "./apps/spotify-app"
import WeatherApp from "./apps/weather-app"
import YoutubeApp from "./apps/youtube-app"
import StatusBar from "./status-bar"

interface AppScreenProps {
  app: AppType
  onClose: () => void
  isDarkMode: boolean
  themeSettings: ThemeSettings
  onAddNotification: (notification: Notification) => void
}

export default function AppScreen({
  app,
  onClose,
  isDarkMode,
  themeSettings,
  onAddNotification,
}: AppScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const renderAppContent = () => {
    const appMap: Record<string, JSX.Element> = {
      instagram: <InstagramApp />,
      github: <GithubApp />,
      linkedin: <LinkedinApp />,
      spotify: <SpotifyApp isDarkMode={isDarkMode} />,
      youtube: <YoutubeApp isDarkMode={isDarkMode} />,
      notes: <NotesApp isDarkMode={isDarkMode} />,
      calendar: <CalendarApp isDarkMode={isDarkMode} />,
      weather: <WeatherApp isDarkMode={isDarkMode} />,
      camera: <CameraApp isDarkMode={isDarkMode} />,
      projects: <ProjectsApp isDarkMode={isDarkMode} />,
      mail: <EmailApp isDarkMode={isDarkMode} />,
      phone: <PhoneApp isDarkMode={isDarkMode} />,
    }

    return appMap[app.id] || (
      <div className="flex h-full items-center justify-center">
        <p>Conteudo do app {app.name}</p>
      </div>
    )
  }

  const getFontSizeClass = () => {
    const fontSizeClasses: Record<string, string> = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }

    return fontSizeClasses[themeSettings.fontSize] || "text-base"
  }

  const themeClasses = clsx(isDarkMode ? "bg-black text-white" : "bg-white text-black", getFontSizeClass())

  void onAddNotification

  return (
    <div
      className={clsx(
        "absolute inset-0 flex h-full flex-col transition-transform duration-300",
        isVisible ? "translate-x-0" : "translate-x-full",
        themeClasses,
      )}
    >
      <StatusBar isDarkMode={isDarkMode} />

      <div className={`flex items-center border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <button
          onClick={handleClose}
          className={`rounded-full p-2 ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">{app.name}</h1>
      </div>

      <div className="flex-1 overflow-auto">{renderAppContent()}</div>
    </div>
  )
}

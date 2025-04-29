"use client"

import { JSX, useEffect, useState } from "react"
import StatusBar from "./status-bar"
import type { AppType, Notification, ThemeSettings } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import InstagramApp from "./apps/instagram-app"
import GithubApp from "./apps/github-app"
import LinkedinApp from "./apps/linkedin-app"
import SpotifyApp from "./apps/spotify-app"
// import YoutubeApp from "./apps/youtube-app" // Verify the file exists at this path or correct the path if necessary
import NotesApp from "./apps/notes-app"
import CalendarApp from "./apps/calendar-app"
import WeatherApp from "./apps/weather-app"
import ProjectsApp from "./apps/projects-app"
import EmailApp from "./apps/email-app"
import clsx from "clsx"

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

  // Função para renderizar o conteúdo do aplicativo com base no ID
  const renderAppContent = () => {
    const apps: Record<string, JSX.Element> = {
      instagram: <InstagramApp isDarkMode={isDarkMode} />,
      github: <GithubApp isDarkMode={isDarkMode} />,
      linkedin: <LinkedinApp isDarkMode={isDarkMode} />,
      spotify: <SpotifyApp isDarkMode={isDarkMode} />,
      // youtube: <YoutubeApp isDarkMode={isDarkMode} />,
      notes: <NotesApp isDarkMode={isDarkMode} />,
      calendar: <CalendarApp isDarkMode={isDarkMode} />,
      weather: <WeatherApp isDarkMode={isDarkMode} />,
      projects: <ProjectsApp isDarkMode={isDarkMode} />,
      mail: <EmailApp isDarkMode={isDarkMode} />,
    }
    return apps[app.id] || (
      <div className="flex items-center justify-center h-full">
        <p>Conteúdo do app {app.name}</p>
      </div>
    )
  }

  // Função para determinar a classe de tamanho de fonte
  const getFontSizeClass = () => {
    const fontSizeClasses: Record<string, string> = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }
    return fontSizeClasses[themeSettings.fontSize] || "text-base"
  }

  // Função para determinar as classes de tema
  const themeClasses = clsx(
    isDarkMode ? "bg-black text-white" : "bg-white text-black",  // Modo claro e escuro
    getFontSizeClass()  // Tamanho de fonte
  )

  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col h-full transition-transform duration-300",
        isVisible ? "translate-x-0" : "translate-x-full",
        themeClasses
      )}
    >
      <StatusBar isDarkMode={isDarkMode} />

      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={handleClose}
          className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">{app.name}</h1>
      </div>

      <div className="flex-1 overflow-auto">{renderAppContent()}</div>
    </div>
  )
}

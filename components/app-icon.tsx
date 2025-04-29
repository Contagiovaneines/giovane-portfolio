"use client"

import { useState } from "react"
import type { AppType } from "@/lib/types"

interface AppIconProps {
  app: AppType
  onClick: () => void
  isDarkMode: boolean
  iconStyle?: string
}

export default function AppIcon({ app, onClick, isDarkMode, iconStyle = "default" }: AppIconProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseDown = () => setIsPressed(true)
  const handleMouseUp = () => setIsPressed(false)

  // Apply different icon styles based on the setting
  const getIconStyle = () => {
    switch (iconStyle) {
      case "rounded":
        return "rounded-xl"
      case "circle":
        return "rounded-full"
      case "square":
        return "rounded-md"
      default:
        return "rounded-xl"
    }
  }

  // Define background color and icon color based on dark mode
  const iconColor = app.iconColor || (isDarkMode ? "text-white" : "text-black")  // Para o modo claro, ícone será 'text-black'
  const textColor = isDarkMode ? "text-white" : "text-black"  // Para o modo claro, texto será 'text-black'

  // Define background color for each app, depending on the mode (dark/light)
  const bgColor = isDarkMode
    ? app.bgColor || "bg-gray-800"  // Default dark mode background
    : app.bgColor || "bg-gray-200"  // Default light mode background

  // Set specific colors for each app (if not provided by the app data)
  const iconWrapperBgColor = (isDarkMode ? app.bgColor : app.bgColor) || {
    instagram: "bg-gradient-to-tr from-purple-600 to-pink-500",
    github: "bg-gray-900",
    linkedin: "bg-blue-700",
    spotify: "bg-green-600",
    youtube: "bg-red-600",
    notes: "bg-yellow-500",
    calendar: "bg-blue-500",
    weather: "bg-cyan-500",
    projects: "bg-purple-500",
    mail: "bg-blue-600",
    phone: "bg-green-500",
    camera: "bg-gray-800",
  }[app.id]

  return (
    <button
      className={`flex flex-col items-center transition-all duration-200 ${isPressed ? "scale-90" : "hover:scale-105 hover:-translate-y-1"}`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      aria-pressed={isPressed}
    >
      <div
        className={`w-14 h-14 flex items-center justify-center ${getIconStyle()} ${iconWrapperBgColor} transition-colors duration-200`}
      >
        <app.icon className={`w-8 h-8 ${iconColor} transition-colors duration-200`} />
      </div>
      <span className={`mt-1 text-xs font-medium ${textColor} transition-colors duration-200`}>{app.name}</span>
    </button>
  )
}

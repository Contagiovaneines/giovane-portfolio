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

  const getIconStyle = () => {
    switch (iconStyle) {
      case "rounded":
        return "rounded-[1.15rem]"
      case "circle":
        return "rounded-full"
      case "square":
        return "rounded-lg"
      default:
        return "rounded-[1.15rem]"
    }
  }

  const iconColor = app.iconColor || (isDarkMode ? "text-white" : "text-slate-900")
  const textColor = isDarkMode ? "text-white" : "text-slate-900"
  const borderClass = isDarkMode ? "border-white/10" : "border-slate-300/80"

  const iconWrapperBgColor = app.bgColor || {
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
      className={`flex flex-col items-center transition-all duration-200 ${
        isPressed ? "scale-[0.92]" : "hover:-translate-y-1 hover:scale-[1.03]"
      }`}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      aria-pressed={isPressed}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center border ${borderClass} ${getIconStyle()} ${iconWrapperBgColor} shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition-colors duration-200`}
      >
        <app.icon className={`h-7 w-7 ${iconColor} transition-colors duration-200`} />
      </div>
      <span className={`mt-1.5 text-[11px] font-semibold leading-none ${textColor} transition-colors duration-200`}>
        {app.name}
      </span>
    </button>
  )
}

"use client"

import { useEffect, useState } from "react"
import { X, Check, Trash } from "lucide-react"
import { apps } from "@/lib/app-data"
import type { Notification, AppType } from "@/lib/types"
import clsx from "clsx"

interface NotificationPanelProps {
  notifications: Notification[]
  isDarkMode: boolean
  onClose: () => void
  onMarkAsRead: (id: string) => void
  onClear: (id: string) => void
  onAppOpen: (app: AppType) => void
}

export default function NotificationPanel({
  notifications,
  isDarkMode,
  onClose,
  onMarkAsRead,
  onClear,
  onAppOpen,
}: NotificationPanelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleNotificationClick = (notification: Notification) => {
    onMarkAsRead(notification.id)
    const app = apps.find((a) => a.id === notification.app)
    if (app) {
      onAppOpen(app)
    }
  }

  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button
          onClick={handleClose}
          className={clsx(
            "p-2 rounded-full",
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          )}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => {
              const app = apps.find((a) => a.id === notification.app)
              const appBgClass = app
                ? app.bgColor || (isDarkMode ? "bg-gray-700" : "bg-gray-300")
                : ""
              const appIconColor = app ? app.iconColor || "text-white" : "text-white"

              return (
                <div
                  key={notification.id}
                  className={clsx(
                    "p-3 rounded-lg",
                    notification.read
                      ? isDarkMode
                        ? "bg-gray-900"
                        : "bg-gray-100"
                      : isDarkMode
                      ? "bg-gray-800"
                      : "bg-blue-50",
                    !notification.read && "border-l-4 border-blue-500"
                  )}
                >
                  <div className="flex justify-between">
                    <div
                      className="flex-1"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-center">
                        {app && (
                          <div
                            className={clsx(
                              "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                              appBgClass
                            )}
                          >
                            {/* Renderizando o ícone como componente JSX */}
                            <app.icon className={clsx("w-4 h-4", appIconColor)} />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p
                            className={clsx(
                              "text-sm",
                              isDarkMode ? "text-gray-400" : "text-gray-600"
                            )}
                          >
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {formatTime(notification.time)}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-2">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className={clsx(
                            "p-1 rounded-full",
                            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                          )}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onClear(notification.id)}
                        className={clsx(
                          "p-1 rounded-full",
                          isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                        )}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

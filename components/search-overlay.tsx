"use client"

import { useEffect, useState } from "react"
import { X, Search } from "lucide-react"
import { apps } from "@/lib/app-data"
import type { AppType } from "@/lib/types"
import { Input } from "@/components/ui/input"

interface SearchOverlayProps {
  isDarkMode: boolean
  onClose: () => void
  onAppOpen: (app: AppType) => void
}

export default function SearchOverlay({ isDarkMode, onClose, onAppOpen }: SearchOverlayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<AppType[]>([])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    const results = apps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }, [searchTerm])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleAppClick = (app: AppType) => {
    onAppOpen(app)
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isDarkMode ? "bg-black/95 text-white" : "bg-white/95 text-black"}`}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Search</h2>
        <button
          onClick={handleClose}
          className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search apps..."
            className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {searchTerm.trim() === "" ? (
          <div className="text-center text-gray-500 mt-8">Type to search for apps</div>
        ) : searchResults.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No results found</div>
        ) : (
          <div className="space-y-2">
            {searchResults.map((app) => (
              <div
                key={app.id}
                className={`p-3 rounded-lg flex items-center ${
                  isDarkMode ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"
                } cursor-pointer`}
                onClick={() => handleAppClick(app)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    app.bgColor || (isDarkMode ? "bg-gray-800" : "bg-gray-300")
                  }`}
                >
                  <app.icon className={`w-5 h-5 ${app.iconColor || (isDarkMode ? "text-white" : "text-black")}`} />
                </div>
                <span className="font-medium">{app.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

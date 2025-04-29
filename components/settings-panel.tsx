"use client"

import { useEffect, useState } from "react"
import { X, Moon, Sun, Check, Quote } from "lucide-react"
import type { ThemeSettings } from "@/lib/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SettingsPanelProps {
  isDarkMode: boolean
  themeSettings: ThemeSettings
  onClose: () => void
  onToggleTheme: () => void
  onUpdateThemeSettings: (settings: Partial<ThemeSettings>) => void
}

export default function SettingsPanel({
  isDarkMode,
  themeSettings,
  onClose,
  onToggleTheme,
  onUpdateThemeSettings,
}: SettingsPanelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const motivationalQuote =
    "Programar é dar vida às ideias. Cada linha de código é um passo rumo a um futuro criado por você."

  return (
    <div
      className={`absolute inset-0 flex flex-col transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Configurações</h2>
        <button
          onClick={handleClose}
          className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* Frase Motivacional */}
          <div
            className={`p-5 rounded-xl border-l-4 ${
              isDarkMode ? "bg-gray-900 border-blue-500" : "bg-gray-100 border-blue-600"
            } shadow-sm`}
          >
            <div className="flex items-start">
              <Quote className="w-6 h-6 mr-3 mt-1 text-blue-500" />
              <div>
                <p className="italic text-base leading-relaxed">{motivationalQuote}</p>
                <p className="mt-2 text-sm text-right opacity-70">
                  — Desenvolvedor Full Stack em Caçapava-SP
                </p>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Aparência</h3>
            <div
              className={`p-3 rounded-lg flex items-center justify-between ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                {isDarkMode ? <Moon className="w-5 h-5 mr-2" /> : <Sun className="w-5 h-5 mr-2" />}
                <span>{isDarkMode ? "Modo Escuro" : "Modo Claro"}</span>
              </div>
              <button
                onClick={onToggleTheme}
                className={`w-12 h-6 rounded-full relative ${
                  isDarkMode ? "bg-blue-600" : "bg-gray-300"
                } transition-colors duration-200`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                    isDarkMode ? "left-7" : "left-1"
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Primary Color */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Cor Primária</h3>
            <div className="flex flex-wrap gap-2">
              {["blue", "purple", "green", "red", "orange"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    color === "blue"
                      ? "bg-blue-500"
                      : color === "purple"
                        ? "bg-purple-500"
                        : color === "green"
                          ? "bg-green-500"
                          : color === "red"
                            ? "bg-red-500"
                            : "bg-orange-500"
                  }`}
                  onClick={() => onUpdateThemeSettings({ primaryColor: color })}
                >
                  {themeSettings.primaryColor === color && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Icon Style */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Estilo de Ícones</h3>
            <RadioGroup
              value={themeSettings.iconStyle}
              onValueChange={(value) => onUpdateThemeSettings({ iconStyle: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="icon-default" />
                <Label htmlFor="icon-default">Padrão (Quadrado Arredondado)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rounded" id="icon-rounded" />
                <Label htmlFor="icon-rounded">Arredondado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="circle" id="icon-circle" />
                <Label htmlFor="icon-circle">Círculo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="square" id="icon-square" />
                <Label htmlFor="icon-square">Quadrado</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Tamanho da Fonte</h3>
            <RadioGroup
              value={themeSettings.fontSize}
              onValueChange={(value) => onUpdateThemeSettings({ fontSize: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small" className="text-sm">
                  Pequena
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium" className="text-base">
                  Média
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large" className="text-lg">
                  Grande
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sobre o Desenvolvedor */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Sobre</h3>
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
              <p className="text-sm">
                Desenvolvido por um Desenvolvedor Full Stack em Caçapava-SP, especializado em Angular, React e
                desenvolvimento mobile.
              </p>
              <p className="text-sm mt-2">Versão 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

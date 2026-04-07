"use client"

import { useEffect, useState } from "react"
import { Check, Moon, Quote, Sun, X } from "lucide-react"
import { motion } from "motion/react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { ThemeSettings } from "@/lib/types"

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
    "Programar e dar vida as ideias. Cada linha de codigo e um passo rumo a um futuro criado por voce."

  const cardClass = isDarkMode ? "border border-white/10 bg-gray-900" : "border border-slate-200 bg-slate-50"
  const selectedColorRingClass = isDarkMode ? "ring-2 ring-white/80" : "ring-2 ring-slate-900/70"
  const radioItemClass = isDarkMode
    ? "border-slate-500 text-sky-400 focus-visible:ring-sky-400"
    : "border-slate-400 text-slate-900 focus-visible:ring-slate-900"
  const closeButtonClass = isDarkMode
    ? "border border-white/10 bg-white/5 hover:bg-white/10"
    : "border border-slate-200 bg-white hover:bg-slate-100"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-slate-600"

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-slate-900"}`}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Configuracoes</h2>
        <button onClick={handleClose} className={`rounded-full p-2 transition ${closeButtonClass}`} aria-label="Fechar configuracoes">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <motion.div
            className={`rounded-xl border-l-4 p-5 shadow-sm ${isDarkMode ? "border-blue-500 bg-gray-900" : "border-blue-600 bg-slate-100"}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="flex items-start">
              <Quote className="mr-3 mt-1 h-6 w-6 text-blue-500" />
              <div>
                <p className="text-base italic leading-relaxed">{motivationalQuote}</p>
                <p className={`mt-2 text-right text-sm ${mutedTextClass}`}>Giovane dev • Cacapava-SP</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Aparencia</h3>
            <div className={`flex items-center justify-between rounded-lg p-3 ${cardClass}`}>
              <div className="flex items-center">
                {isDarkMode ? <Moon className="mr-2 h-5 w-5" /> : <Sun className="mr-2 h-5 w-5" />}
                <span>{isDarkMode ? "Modo escuro" : "Modo claro"}</span>
              </div>
              <button
                onClick={onToggleTheme}
                className={`relative h-7 w-14 rounded-full border transition-colors duration-200 ${
                  isDarkMode ? "border-blue-400/30 bg-blue-600" : "border-slate-300 bg-white"
                }`}
                aria-label={isDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full transition-transform duration-200 ${
                    isDarkMode ? "left-8 bg-white" : "left-1 bg-slate-900"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Cor primaria</h3>
            <div className={`flex flex-wrap gap-2 rounded-lg p-3 ${cardClass}`}>
              {["blue", "purple", "green", "red", "orange"].map((color) => (
                <button
                  key={color}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ring-offset-2 transition ${
                    color === "blue"
                      ? "bg-blue-500"
                      : color === "purple"
                        ? "bg-purple-500"
                        : color === "green"
                          ? "bg-emerald-500"
                        : color === "red"
                            ? "bg-rose-500"
                            : "bg-amber-400"
                  } ${themeSettings.primaryColor === color ? selectedColorRingClass : ""}`}
                  onClick={() => onUpdateThemeSettings({ primaryColor: color })}
                  aria-label={`Selecionar cor ${color}`}
                >
                  {themeSettings.primaryColor === color && <Check className={`h-4 w-4 ${color === "orange" ? "text-slate-950" : "text-white"}`} />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Estilo de icones</h3>
            <RadioGroup
              value={themeSettings.iconStyle}
              onValueChange={(value) => onUpdateThemeSettings({ iconStyle: value })}
              className={`flex flex-col space-y-2 rounded-lg p-3 ${cardClass}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="icon-default" className={radioItemClass} />
                <Label htmlFor="icon-default">Padrao</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rounded" id="icon-rounded" className={radioItemClass} />
                <Label htmlFor="icon-rounded">Arredondado</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="circle" id="icon-circle" className={radioItemClass} />
                <Label htmlFor="icon-circle">Circulo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="square" id="icon-square" className={radioItemClass} />
                <Label htmlFor="icon-square">Quadrado</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Tamanho da fonte</h3>
            <RadioGroup
              value={themeSettings.fontSize}
              onValueChange={(value) => onUpdateThemeSettings({ fontSize: value })}
              className={`flex flex-col space-y-2 rounded-lg p-3 ${cardClass}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" className={radioItemClass} />
                <Label htmlFor="font-small" className="text-sm">
                  Pequena
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" className={radioItemClass} />
                <Label htmlFor="font-medium" className="text-base">
                  Media
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" className={radioItemClass} />
                <Label htmlFor="font-large" className="text-lg">
                  Grande
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Sobre</h3>
            <div className={`rounded-lg p-3 ${cardClass}`}>
              <p className="text-sm">
                Portfolio mobile com foco em apresentacao profissional, navegacao fluida e leitura clara em modo claro e escuro.
              </p>
              <p className={`mt-2 text-sm ${mutedTextClass}`}>Versao 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

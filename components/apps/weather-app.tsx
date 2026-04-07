"use client"

import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  RefreshCw,
  Snowflake,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface WeatherAppProps {
  isDarkMode: boolean
}

interface WeatherData {
  location: string
  temperature: number
  condition: string
  high: number
  low: number
  humidity: number
  wind: number
  feelsLike: number
  icon: LucideIcon
  forecast: {
    day: string
    temp: number
    icon: LucideIcon
  }[]
  hourlyForecast: {
    time: string
    temp: number
    icon: LucideIcon
  }[]
}

type OpenMeteoForecastResponse = {
  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

const FIXED_LOCATION = {
  label: "Ca\u00e7apava, SP",
  latitude: -23.10083,
  longitude: -45.70694,
}

function getWeatherPresentation(code: number): { condition: string; icon: LucideIcon } {
  if (code === 0) return { condition: "Ensolarado", icon: Sun }
  if ([1, 2].includes(code)) return { condition: "Parcialmente nublado", icon: CloudSun }
  if (code === 3) return { condition: "Nublado", icon: Cloud }
  if ([45, 48].includes(code)) return { condition: "Neblina", icon: Cloud }
  if ([51, 53, 55, 56, 57].includes(code)) return { condition: "Garoa", icon: CloudRain }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { condition: "Chuva", icon: CloudRain }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { condition: "Neve", icon: Snowflake }
  if ([95, 96, 99].includes(code)) return { condition: "Tempestade", icon: CloudLightning }

  return { condition: "Tempo variavel", icon: Cloud }
}

function formatHourLabel(value: string) {
  if (!value.includes("T")) return value
  return value.split("T")[1]?.slice(0, 5) ?? value
}

function formatDayLabel(value: string, index: number) {
  if (index === 0) return "Hoje"

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  })
    .format(new Date(`${value}T12:00:00`))
    .replace(".", "")
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return "Nao foi possivel carregar o clima agora."
}

function mapWeatherData(payload: OpenMeteoForecastResponse, location: string): WeatherData {
  const currentPresentation = getWeatherPresentation(payload.current.weather_code)
  const currentHourIndex = Math.max(payload.hourly.time.findIndex((time) => time === payload.current.time), 0)

  return {
    location,
    temperature: Math.round(payload.current.temperature_2m),
    condition: currentPresentation.condition,
    high: Math.round(payload.daily.temperature_2m_max[0] ?? payload.current.temperature_2m),
    low: Math.round(payload.daily.temperature_2m_min[0] ?? payload.current.temperature_2m),
    humidity: Math.round(payload.current.relative_humidity_2m),
    wind: Math.round(payload.current.wind_speed_10m),
    feelsLike: Math.round(payload.current.apparent_temperature),
    icon: currentPresentation.icon,
    forecast: payload.daily.time.slice(0, 5).map((day, index) => {
      const presentation = getWeatherPresentation(payload.daily.weather_code[index] ?? 0)

      return {
        day: formatDayLabel(day, index),
        temp: Math.round(payload.daily.temperature_2m_max[index] ?? payload.current.temperature_2m),
        icon: presentation.icon,
      }
    }),
    hourlyForecast: payload.hourly.time.slice(currentHourIndex, currentHourIndex + 6).map((time, index) => {
      const presentation = getWeatherPresentation(payload.hourly.weather_code[currentHourIndex + index] ?? 0)

      return {
        time: index === 0 ? "Agora" : formatHourLabel(time),
        temp: Math.round(payload.hourly.temperature_2m[currentHourIndex + index] ?? payload.current.temperature_2m),
        icon: presentation.icon,
      }
    }),
  }
}

export default function WeatherApp({ isDarkMode }: WeatherAppProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState("Atualizando clima de Ca\u00e7apava, SP...")
  const primaryButtonClass = isDarkMode
    ? "bg-[#16213a] text-white hover:bg-[#1d2b46]"
    : "bg-slate-900 text-white hover:bg-slate-800"

  const fetchWeather = async (latitude: number, longitude: number, label: string) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`,
    )

    if (!response.ok) {
      throw new Error("Nao foi possivel consultar o clima agora.")
    }

    const payload = (await response.json()) as OpenMeteoForecastResponse
    setWeatherData(mapWeatherData(payload, label))
  }

  const loadDefaultWeather = async () => {
    setLoading(true)
    setError(null)
    setStatusMessage("Atualizando clima de Ca\u00e7apava, SP...")

    try {
      await fetchWeather(FIXED_LOCATION.latitude, FIXED_LOCATION.longitude, FIXED_LOCATION.label)
      setStatusMessage("Clima fixo de Ca\u00e7apava, SP.")
    } catch (requestError) {
      setError(getErrorMessage(requestError))
      setStatusMessage("Nao foi possivel atualizar o clima de Ca\u00e7apava, SP.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadDefaultWeather()
  }, [])

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className={`border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <div
            className={`flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 ${
              isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-100"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isDarkMode ? "bg-black/40" : "bg-white"
              }`}
            >
              <MapPin className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm font-semibold">{FIXED_LOCATION.label}</div>
              <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Localizacao fixa do app</div>
            </div>
          </div>

          <Button type="button" className={`shrink-0 ${primaryButtonClass}`} onClick={() => void loadDefaultWeather()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <p className={`mt-3 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{statusMessage}</p>
      </div>

      {loading ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
          <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{statusMessage}</p>
        </div>
      ) : error ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 px-6 text-center">
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{error}</p>
          <Button type="button" className={primaryButtonClass} onClick={() => void loadDefaultWeather()}>
            Tentar novamente
          </Button>
        </div>
      ) : weatherData ? (
        <div>
          <div
            className={`p-6 ${
              isDarkMode ? "bg-gradient-to-b from-blue-900 to-black" : "bg-gradient-to-b from-blue-500 to-blue-300"
            }`}
          >
            <div className="text-center text-white">
              <h2 className="text-xl font-bold">{weatherData.location}</h2>
              <div className="my-4 flex items-center justify-center">
                <weatherData.icon className="mr-2 h-16 w-16" />
                <span className="text-5xl font-bold">
                  {weatherData.temperature}
                  {"\u00b0C"}
                </span>
              </div>
              <p className="text-lg">{weatherData.condition}</p>
              <p className="mt-2">
                Max: {weatherData.high}
                {"\u00b0C \u2022 "}
                Min: {weatherData.low}
                {"\u00b0C"}
              </p>
            </div>
          </div>

          <div className={`border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            <h3 className="mb-3 font-bold">Previsao por hora</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {weatherData.hourlyForecast.map((hour) => (
                <div key={hour.time} className="flex min-w-16 flex-col items-center">
                  <span className="text-sm">{hour.time}</span>
                  <hour.icon className="my-2 h-6 w-6" />
                  <span className="font-medium">
                    {hour.temp}
                    {"\u00b0C"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            <h3 className="mb-3 font-bold">Previsao de 5 dias</h3>
            <div className="space-y-3">
              {weatherData.forecast.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="w-12 capitalize">{day.day}</span>
                  <day.icon className="h-6 w-6" />
                  <span className="font-medium">
                    {day.temp}
                    {"\u00b0C"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="mb-3 font-bold">Detalhes do clima</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Wind className="mr-2 h-5 w-5" />
                  <span>Vento</span>
                </div>
                <p className="mt-1 font-medium">{weatherData.wind} km/h</p>
              </div>

              <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Droplets className="mr-2 h-5 w-5" />
                  <span>Umidade</span>
                </div>
                <p className="mt-1 font-medium">{weatherData.humidity}%</p>
              </div>

              <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5" />
                  <span>Sensacao</span>
                </div>
                <p className="mt-1 font-medium">
                  {weatherData.feelsLike}
                  {"\u00b0C"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-gray-500">
          <p>Dados climaticos nao disponiveis.</p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
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
  icon: typeof Sun
  forecast: {
    day: string
    temp: number
    icon: typeof Sun
  }[]
  hourlyForecast: {
    time: string
    temp: number
    icon: typeof Sun
  }[]
}

export default function WeatherApp({ isDarkMode }: WeatherAppProps) {
  const [searchLocation, setSearchLocation] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [animateTransition, setAnimateTransition] = useState(false)

  useEffect(() => {
    // Simular carregamento de dados do clima para Caçapava-SP
    setTimeout(() => {
      setWeatherData({
        location: "Caçapava, SP",
        temperature: 24,
        condition: "Ensolarado",
        high: 28,
        low: 18,
        humidity: 65,
        wind: 10,
        feelsLike: 26,
        icon: Sun,
        forecast: [
          { day: "Hoje", temp: 24, icon: Sun },
          { day: "Ter", temp: 25, icon: Sun },
          { day: "Qua", temp: 23, icon: Cloud },
          { day: "Qui", temp: 22, icon: CloudRain },
          { day: "Sex", temp: 24, icon: Sun },
        ],
        hourlyForecast: [
          { time: "Agora", temp: 24, icon: Sun },
          { time: "13h", temp: 25, icon: Sun },
          { time: "14h", temp: 26, icon: Sun },
          { time: "15h", temp: 26, icon: Cloud },
          { time: "16h", temp: 25, icon: Cloud },
          { time: "17h", temp: 23, icon: Cloud },
        ],
      })
      setLoading(false)
    }, 1500)
  }, [])

  const handleSearch = () => {
    if (!searchLocation.trim()) return

    setLoading(true)
    setAnimateTransition(true)

    // Simular chamada de API com atraso
    setTimeout(() => {
      // Gerar dados aleatórios de clima com base na localização
      const isRainy = Math.random() > 0.7
      const isCloudy = Math.random() > 0.5
      const baseTemp = Math.floor(Math.random() * 10) + 20 // 20-30°C para Brasil

      const newWeatherData: WeatherData = {
        location: searchLocation,
        temperature: baseTemp,
        condition: isRainy ? "Chuvoso" : isCloudy ? "Nublado" : "Ensolarado",
        high: baseTemp + Math.floor(Math.random() * 5),
        low: baseTemp - Math.floor(Math.random() * 5),
        humidity: Math.floor(Math.random() * 30) + 60, // 60-90% para clima tropical
        wind: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        feelsLike: baseTemp + (isRainy ? -2 : 2),
        icon: isRainy ? CloudRain : isCloudy ? Cloud : Sun,
        forecast: [
          { day: "Hoje", temp: baseTemp, icon: isRainy ? CloudRain : isCloudy ? Cloud : Sun },
          { day: "Ter", temp: baseTemp + Math.floor(Math.random() * 4) - 2, icon: Math.random() > 0.5 ? Cloud : Sun },
          {
            day: "Qua",
            temp: baseTemp + Math.floor(Math.random() * 4) - 2,
            icon: Math.random() > 0.6 ? CloudRain : Cloud,
          },
          { day: "Qui", temp: baseTemp + Math.floor(Math.random() * 4) - 2, icon: Math.random() > 0.7 ? Sun : Cloud },
          { day: "Sex", temp: baseTemp + Math.floor(Math.random() * 4) - 2, icon: Math.random() > 0.5 ? Sun : Cloud },
        ],
        hourlyForecast: [
          { time: "Agora", temp: baseTemp, icon: isRainy ? CloudRain : isCloudy ? Cloud : Sun },
          { time: "13h", temp: baseTemp + 1, icon: Math.random() > 0.5 ? Cloud : Sun },
          { time: "14h", temp: baseTemp + 2, icon: Math.random() > 0.5 ? Cloud : Sun },
          { time: "15h", temp: baseTemp + 1, icon: Math.random() > 0.6 ? CloudRain : Cloud },
          { time: "16h", temp: baseTemp, icon: Math.random() > 0.5 ? Cloud : Sun },
          { time: "17h", temp: baseTemp - 1, icon: Math.random() > 0.5 ? Cloud : Sun },
        ],
      }

      setWeatherData(newWeatherData)
      setLoading(false)

      // Resetar estado de animação após a transição
      setTimeout(() => {
        setAnimateTransition(false)
      }, 500)
    }, 1000)
  }

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Barra de pesquisa */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Pesquisar localização..."
              className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button className="ml-2" onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : weatherData ? (
        <div className={`transition-opacity duration-500 ${animateTransition ? "opacity-0" : "opacity-100"}`}>
          {/* Clima atual */}
          <div
            className={`p-6 ${
              isDarkMode ? "bg-gradient-to-b from-blue-900 to-black" : "bg-gradient-to-b from-blue-500 to-blue-300"
            }`}
          >
            <div className="text-center text-white">
              <h2 className="text-xl font-bold">{weatherData.location}</h2>
              <div className="flex justify-center items-center my-4">
                <weatherData.icon className="w-16 h-16 mr-2" />
                <span className="text-5xl font-bold">{weatherData.temperature}°C</span>
              </div>
              <p className="text-lg">{weatherData.condition}</p>
              <p className="mt-2">
                Máx: {weatherData.high}°C • Mín: {weatherData.low}°C
              </p>
            </div>
          </div>

          {/* Previsão por hora */}
          <div className={`p-4 border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
            <h3 className="font-bold mb-3">Previsão por Hora</h3>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {weatherData.hourlyForecast.map((hour, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm">{hour.time}</span>
                  <hour.icon className="my-2 w-6 h-6" />
                  <span className="font-medium">{hour.temp}°C</span>
                </div>
              ))}
            </div>
          </div>

          {/* Previsão de 5 dias */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold mb-3">Previsão de 5 dias</h3>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="w-10">{day.day}</span>
                  <day.icon className="w-6 h-6" />
                  <span className="font-medium">{day.temp}°C</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do clima */}
          <div className="p-4">
            <h3 className="font-bold mb-3">Detalhes do Clima</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Wind className="w-5 h-5 mr-2" />
                  <span>Vento</span>
                </div>
                <p className="mt-1 font-medium">{weatherData.wind} km/h</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 mr-2" />
                  <span>Umidade</span>
                </div>
                <p className="mt-1 font-medium">{weatherData.humidity}%</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  <span>Sensação</span>
                </div>
                <p className="mt-1 font-medium">{weatherData.feelsLike}°C</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Dados climáticos não disponíveis</p>
        </div>
      )}
    </div>
  )
}

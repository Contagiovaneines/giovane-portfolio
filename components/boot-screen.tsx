"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface BootScreenProps {
  isDarkMode: boolean
  primaryColorClass: string
}

export default function BootScreen({ isDarkMode, primaryColorClass }: BootScreenProps) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    // Fade in animation
    setOpacity(1)
  }, [])

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full transition-opacity duration-1000 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
      style={{ opacity }}
    >
  <div className={`text-5xl font-bold mb-8 text-center`}>
  <div className={`bg-gradient-to-r ${primaryColorClass} bg-clip-text text-transparent`}>
    GIOVANE<br />DEV
  </div>
  <div className={`text-xl mt-2 bg-gradient-to-r ${primaryColorClass} bg-clip-text text-transparent`}>
    fullstack e mobile
  </div>
</div>

      <Loader2
        className={`animate-spin h-10 w-10 bg-gradient-to-r ${primaryColorClass} bg-clip-text text-transparent`}
      />
    </div>
  )
}

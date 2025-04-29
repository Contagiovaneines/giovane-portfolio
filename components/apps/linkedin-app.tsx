"use client"

import { useEffect } from "react"

export default function LinkedinApp() {
  useEffect(() => {
    window.location.href = "https://www.linkedin.com/in/giovane-ines/"
  }, [])

  return null // não renderiza nada, só redireciona
}

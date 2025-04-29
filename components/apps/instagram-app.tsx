"use client"

import { useEffect } from "react"

export default function instagramApp() {
  useEffect(() => {
    window.location.href = "https://www.instagram.com/giovane_ines/"
  }, [])

  return null // não renderiza nada, só redireciona
}

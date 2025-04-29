"use client"

import { useEffect } from "react"

export default function GithubApp() {
  useEffect(() => {
    window.location.href = "https://github.com/Contagiovaneines"
  }, [])

  return null // não renderiza nada, só redireciona
}

import type { LucideIcon } from "lucide-react"

export interface AppType {
  id: string
  name: string
  icon: LucideIcon
  bgColor?: string
  iconColor?: string
}

export interface Notification {
  id: string
  app: string
  title: string
  message: string
  time: string
  read: boolean
}

export interface ThemeSettings {
  primaryColor: string
  iconStyle: string
  fontSize: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  image: string | null
  category: string
  technologies: string[]
  link: string
  github: string
  stars: number
  updatedAt: string
  language: string | null
  featured: boolean
}

export interface PortfolioProjectsResponse {
  source: "github" | "fallback"
  username: string
  projects: PortfolioProject[]
}

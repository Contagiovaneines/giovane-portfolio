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

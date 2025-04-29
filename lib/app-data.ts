import {
  Instagram,
  Github,
  Linkedin,
  Music,
  Youtube,
  FileText,
  Calendar,
  Cloud,
  Settings,
  Mail,
  Phone,
  Camera,
  FolderKanban,
} from "lucide-react"
import type { AppType } from "./types"

export const apps: AppType[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    bgColor: "bg-gradient-to-tr from-purple-600 to-pink-500", // cor de fundo gradiente
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "github",
    name: "GitHub",
    icon: Github,
    bgColor: "bg-gray-900", // cor de fundo cinza escuro
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    bgColor: "bg-blue-700", // cor de fundo azul
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: Music,
    bgColor: "bg-green-600", // cor de fundo verde
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    bgColor: "bg-red-600", // cor de fundo vermelho
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "notes",
    name: "Notes",
    icon: FileText,
    bgColor: "bg-yellow-500", // cor de fundo amarela
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: Calendar,
    bgColor: "bg-blue-500", // cor de fundo azul
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "weather",
    name: "Weather",
    icon: Cloud,
    bgColor: "bg-cyan-500", // cor de fundo ciano
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderKanban,
    bgColor: "bg-purple-500", // cor de fundo roxo
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "mail",
    name: "Mail",
    icon: Mail,
    bgColor: "bg-blue-600", // cor de fundo azul
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "phone",
    name: "Phone",
    icon: Phone,
    bgColor: "bg-green-500", // cor de fundo verde
    iconColor: "text-white", // ícone branco no modo escuro
  },
  {
    id: "camera",
    name: "Camera",
    icon: Camera,
    bgColor: "bg-gray-800", // cor de fundo cinza escuro
    iconColor: "text-white", // ícone branco no modo escuro
  },
]

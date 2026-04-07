"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Briefcase,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  X,
} from "lucide-react"
import { motion } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { profileData } from "@/lib/profile"

interface ProfileScreenProps {
  isDarkMode: boolean
  onClose: () => void
}

function buildMailtoLink(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${profileData.email}?${params.toString()}`
}

export default function ProfileScreen({ isDarkMode, onClose }: ProfileScreenProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const panelClass = isDarkMode ? "border-white/10 bg-[#0b1220]" : "border-black/10 bg-white"
  const cardClass = isDarkMode ? "border-white/10 bg-white/[0.04]" : "border-black/10 bg-gray-50"
  const softTextClass = isDarkMode ? "text-gray-300" : "text-gray-700"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const availabilityBadgeClass = isDarkMode
    ? "border-blue-400/30 bg-blue-500/10 text-blue-300"
    : "border-blue-600/20 bg-blue-50 text-blue-700"
  const avatarBorderClass = isDarkMode ? "border-[#0b1220]" : "border-white"

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <div className={`flex items-center justify-between border-b px-4 py-3 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Perfil</h2>
        <button
          onClick={handleClose}
          className={`rounded-full p-2 transition ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label="Fechar perfil"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className={`relative border-b p-4 ${panelClass}`}>
          <div
            className={`h-28 rounded-[28px] ${
              isDarkMode
                ? "bg-[linear-gradient(135deg,#1d4ed8_0%,#4338ca_48%,#6d28d9_100%)]"
                : "bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_48%,#7c3aed_100%)]"
            }`}
          />

          <div className="relative -mt-10 px-2">
            <Avatar className={`h-20 w-20 border-4 shadow-lg ${avatarBorderClass}`}>
              <AvatarImage src="/perfil.jpg" alt={profileData.name} />
              <AvatarFallback>{profileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="mt-4 space-y-2">
              <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${availabilityBadgeClass}`}>
                {profileData.availability}
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-tight">{profileData.name}</h1>
                <p className={`mt-1 text-sm leading-6 ${mutedTextClass}`}>{profileData.title}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <div className={`flex items-center gap-3 rounded-2xl border px-3 py-3 ${cardClass}`}>
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-sm">{profileData.location}</span>
              </div>
              <a
                href={buildMailtoLink(
                  "Contato pelo portfolio",
                  "Ola, Giovane. Vi seu perfil no portfolio e quero conversar sobre um projeto.",
                )}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition ${cardClass}`}
              >
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="min-w-0 break-all">{profileData.email}</span>
              </a>
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition ${cardClass}`}
              >
                <Globe className="h-4 w-4 text-blue-400" />
                <span className="min-w-0 break-all">{profileData.website}</span>
              </a>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/showreel"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Sparkles className="h-4 w-4" />
                Showreel
              </Link>
              <Link
                href="/site"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${cardClass}`}
              >
                <ExternalLink className="h-4 w-4" />
                Ver site
              </Link>
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${cardClass}`}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${cardClass}`}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-4 py-5">
          <section className={`rounded-[28px] border p-4 ${cardClass}`}>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Sobre</div>
            <p className={`mt-3 text-sm leading-7 ${softTextClass}`}>{profileData.about.paragraphs[0]}</p>
          </section>

          <section className={`rounded-[28px] border p-4 ${cardClass}`}>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">O que eu entrego</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileData.serviceFocus.map((item) => (
                <span
                  key={item}
                  className={`rounded-full px-3 py-2 text-xs font-semibold ${
                    isDarkMode ? "bg-white/6 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className={`rounded-[28px] border p-4 ${cardClass}`}>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">Tecnologias</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className={`rounded-full px-3 py-2 text-xs font-semibold ${
                    isDarkMode ? "bg-black/40 text-gray-200" : "bg-white text-gray-700"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className={`rounded-[28px] border p-4 ${cardClass}`}>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
              <Briefcase className="h-4 w-4" />
              Experiencia
            </div>

            <div className="mt-4 space-y-3">
              {profileData.experience.map((experience) => (
                <div
                  key={`${experience.company}-${experience.period}`}
                  className={`rounded-2xl border p-4 ${isDarkMode ? "border-white/8 bg-black/30" : "border-black/8 bg-white"}`}
                >
                  <div className="text-xs uppercase tracking-[0.14em] text-blue-400">{experience.period}</div>
                  <h3 className="mt-2 text-sm font-semibold">{experience.title}</h3>
                  <p className={`text-sm ${mutedTextClass}`}>{experience.company}</p>
                  <p className={`mt-2 text-sm leading-6 ${softTextClass}`}>{experience.highlights[0] ?? experience.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { Github, Linkedin, Mail, MessageSquare, Sparkles } from "lucide-react"

import { profileData } from "@/lib/profile"

interface PhoneAppProps {
  isDarkMode: boolean
}

function buildMailtoLink(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${profileData.email}?${params.toString()}`
}

export default function PhoneApp({ isDarkMode }: PhoneAppProps) {
  const cardClass = isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
  const mutedClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="space-y-4 p-4">
        <div className={`rounded-3xl border p-5 ${cardClass}`}>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-bold">Vamos conversar</h2>
          <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
            Este app fica como um atalho rapido para falar comigo sobre freelas, parcerias ou projetos sob demanda.
          </p>
        </div>

        <div className={`rounded-3xl border p-4 ${cardClass}`}>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-400" />
            <div>
              <div className="text-sm font-semibold">E-mail</div>
              <div className={`text-xs ${mutedClass}`}>{profileData.email}</div>
            </div>
          </div>
          <a
            href={buildMailtoLink(
              "Contato pelo portfolio",
              "Ola, Giovane. Vim pelo portfolio e quero conversar sobre um projeto.",
            )}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Enviar e-mail
          </a>
        </div>

        <div className={`grid grid-cols-2 gap-3 rounded-3xl border p-4 ${cardClass}`}>
          <a
            href={profileData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-2xl border px-4 py-4 text-center ${isDarkMode ? "border-gray-800 bg-black/40" : "border-gray-200 bg-white"}`}
          >
            <Linkedin className="mx-auto h-5 w-5 text-blue-500" />
            <div className="mt-2 text-sm font-semibold">LinkedIn</div>
          </a>
          <a
            href={profileData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-2xl border px-4 py-4 text-center ${isDarkMode ? "border-gray-800 bg-black/40" : "border-gray-200 bg-white"}`}
          >
            <Github className="mx-auto h-5 w-5" />
            <div className="mt-2 text-sm font-semibold">GitHub</div>
          </a>
        </div>

        <div className={`rounded-3xl border p-4 ${cardClass}`}>
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 text-amber-400" />
            <div>
              <div className="text-sm font-semibold">Atendimento inicial</div>
              <p className={`mt-1 text-sm leading-6 ${mutedClass}`}>
                Como nao ha numero publico configurado aqui, o contato inicial segue por e-mail ou LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

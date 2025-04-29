"use client"

import { useEffect, useState } from "react"
import { X, Mail, Phone, Globe, MapPin, Briefcase, Github, Linkedin, FileText } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProfileScreenProps {
  isDarkMode: boolean
  onClose: () => void
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

  // Perfil do usuário
  const profile = {
    name: "Giovane Ines da Silva",
    title: "Desenvolvedor Fullstack e Mobile",
    location: "Caçapava, SP",
    email: "giovaneinesdev@gmail.com",
    phone: "Solicite por e-mail",
    website: "https://contagiovaneines.github.io",
    bio: "Desenvolvedor Fullstack | Java | Angular | APIs REST | Spring Boot | FlutterFlow | Git/GitHub | Estudante de Sistemas para Internet. Sou formado em Técnico em Desenvolvimento de Sistemas e atualmente curso Sistemas para Internet. Atuo como Desenvolvedor na Kaspper, onde me formei pela Kaspper Academy e tive a oportunidade de evoluir tecnicamente por meio de projetos práticos, mentorias e experiências em equipe.",
    skills: ["Java", "Angular", "FlutterFlow", "APIs REST", "Supabase", "Firebase", "Git/GitHub", "Spring Boot"],
    experience: [
      {
        title: "Desenvolvedor Fullstack",
        company: "Kaspper",
        period: "março de 2025 - Presente",
        description: "Atuo no desenvolvimento de aplicativos com FlutterFlow e aprofundando meus conhecimentos em Java e boas práticas de programação orientada a objetos."
      },
      {
        title: "Auxiliar de Suporte Técnico",
        company: "Ag Distribuidora",
        period: "novembro de 2024 - março de 2025",
        description: "Prestei suporte técnico de sistemas, redes e infraestrutura, focando no sistema ERP Winthor e realização de diagnósticos de manutenção."
      },
      {
        title: "Estagiário DevOps",
        company: "Jack Experts",
        period: "dezembro de 2023 - agosto de 2024",
        description: "Trabalhei na automação de pipelines com GitLab CI/CD, Docker, Kubernetes e Helm, melhorando a confiabilidade e tempo de entrega dos deploys."
      },
      // Adicione as outras experiências conforme necessário
    ],
    education: [
      {
        degree: "Tecnólogo em Sistemas para Internet",
        institution: "UniCesumar",
        year: "2025 (previsto)"
      },
      {
        degree: "Técnico em Desenvolvimento de Sistemas",
        institution: "ETEC - Escola Técnica Estadual de São Paulo",
        year: "2022"
      },
      {
        degree: "Pessoa Programadora, Programação de Computadores",
        institution: "Kaspper Academy",
        year: "2025"
      },
      {
        degree: "Intercâmbio, Ensino de Inglês como Segundo Idioma",
        institution: "Twin English Centre, London",
        year: "2023"
      }
    ],
    social: {
      github: "https://github.com/contagiovaneines",
      linkedin: "https://www.linkedin.com/in/giovane-ines"
    }
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col transition-transform duration-300 ${isVisible ? "translate-y-0" : "translate-y-full"} ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Meu Perfil</h2>
        <button
          onClick={handleClose}
          className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Header/Cover */}
        <div
          className={`h-32 ${isDarkMode ? "bg-gradient-to-r from-blue-900 to-purple-900" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
        ></div>

        {/* Profile Info */}
        <div className="px-4 relative">
          <Avatar className="w-24 h-24 border-4 border-white dark:border-black absolute -top-12 left-4">
          <AvatarImage src="/perfil.jpg" alt={profile.name} />
          <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="pt-16">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{profile.title}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span>{profile.website}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
             
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Sobre</h2>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{profile.bio}</p>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Habilidades</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Experiência</h2>
            <div className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 mr-2 mt-1" />
                    <div>
                      <h3 className="font-medium">{exp.title}</h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {exp.company} • {exp.period}
                      </p>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Educação</h2>
            <div className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <h3 className="font-medium">{edu.degree}</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {edu.institution} • {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="mt-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Redes Sociais</h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Github className="w-5 h-5 mr-2" />
                <a href={profile.social.github} className="text-blue-500">
                  {profile.social.github}
                </a>
              </div>
              <div className="flex items-center">
                <Linkedin className="w-5 h-5 mr-2" />
                <a href={profile.social.linkedin} className="text-blue-500">
                  {profile.social.linkedin}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

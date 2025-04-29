"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  link: string
  github: string
}

interface ProjectsAppProps {
  isDarkMode: boolean
}

export default function ProjectsApp({ isDarkMode }: ProjectsAppProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  
  const projects: Project[] = [
    {
      id: 1,
      title: "flutter-techtaste",
      description: "App Flutter feito na plataforma IDX do Google.",
      image: "/images/flutter-techtaste.png",
      category: "Flutter",
      technologies: ["Flutter", "Dart", "IDX"],
      link: "https://idx.google.com/",
      github: "https://github.com/Contagiovaneines/flutter-techtaste",
    },
    {
      id: 2,
      title: "AudioBook",
      description: "App FlutterFlow de audiobooks.",
      image: "/images/audiobook-flutterflow.png",
      category: "FlutterFlow",
      technologies: ["FlutterFlow", "Dart"],
      link: "#",
      github: "https://github.com/Contagiovaneines/AudioBook-flutterflow",
    },
    {
      id: 3,
      title: "App de Viagens",
      description: "App de viagens desenvolvido com FlutterFlow.",
      image: "/images/appviagens.png",
      category: "FlutterFlow",
      technologies: ["FlutterFlow", "Dart"],
      link: "#",
      github: "https://github.com/Contagiovaneines/appviagens",
    },
    {
      id: 4,
      title: "App de Cursos",
      description: "Aplicativo de cursos feito com FlutterFlow.",
      image: "/images/appdecursos.png",
      category: "FlutterFlow",
      technologies: ["FlutterFlow", "Dart"],
      link: "#",
      github: "https://github.com/Contagiovaneines/AppDeCursos-flutterflow",
    },
    {
      id: 5,
      title: "Lojja",
      description: "Aplicativo de e-commerce simples feito com FlutterFlow.",
      image: "/images/lojja.png",
      category: "FlutterFlow",
      technologies: ["FlutterFlow", "Dart"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Lojja-flutterflow",
    },
    {
      id: 6,
      title: "Pokedex Java",
      description: "Pokedex desenvolvida em Java.",
      image: "/images/pokedex-java.png",
      category: "Java",
      technologies: ["Java"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Pokedex-Java",
    },
    {
      id: 7,
      title: "Calculadoras Java",
      description: "Coleção de calculadoras feitas em Java.",
      image: "/images/calculadoras-java.png",
      category: "Java",
      technologies: ["Java"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Calculadoras-Java",
    },
    {
      id: 8,
      title: "Sistema de Estoque",
      description: "Sistema de gerenciamento de estoque - Desafio Kaspper.",
      image: "/images/sistema-estoque.png",
      category: "Java",
      technologies: ["Java", "Swing", "MySQL"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Sistema-de-Gerenciamento-de-Estoque",
    },
    {
      id: 9,
      title: "Recibo Emadec",
      description: "Gerador de recibos HTML para a empresa Emadec.",
      image: "/images/recibo-emadec.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Recibo-emadec",
    },
    {
      id: 10,
      title: "Spotify Imersão Alura",
      description: "Clone do Spotify feito na imersão front-end da Alura.",
      image: "/images/spotify-alura.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/spotify-imersao-alura",
    },
    {
      id: 11,
      title: "Linktree Copy",
      description: "Cópia do Linktree com melhorias visuais.",
      image: "/images/linktree.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/LinkTree-copy",
    },
    {
      id: 12,
      title: "Clone Trello",
      description: "Clones estilizados do Trello usando HTML e CSS.",
      image: "/images/clone-trello.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/clone-trello",
    },
    {
      id: 13,
      title: "Pokedex Angular",
      description: "App Angular que consome a PokeAPI.",
      image: "/images/pokedex-angular.png",
      category: "Angular",
      technologies: ["Angular", "TypeScript", "API"],
      link: "#",
      github: "https://github.com/Contagiovaneines/pokedex-angular",
    },
    {
      id: 14,
      title: "Sistemas de Livros",
      description: "Sistema de gerenciamento de livros feito com TypeScript.",
      image: "/images/sistemas-livros.png",
      category: "TypeScript",
      technologies: ["TypeScript", "Node.js"],
      link: "#",
      github: "https://github.com/Contagiovaneines/Sistemas-Livros",
    },
    {
      id: 15,
      title: "Barbearia Alura",
      description: "Projeto feito com base em curso da Alura com melhorias.",
      image: "/images/barbearia.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/barbearia.alura.io",
    },
    {
      id: 16,
      title: "Decodificador Oracle",
      description: "Challenge Oracle ONE de decodificação.",
      image: "/images/decodificador.png",
      category: "Web",
      technologies: ["HTML", "CSS"],
      link: "#",
      github: "https://github.com/Contagiovaneines/ChallengeONE.Decodificador.io-",
    },
  ]
  
  const categories = Array.from(new Set(projects.map((project) => project.category)))

  const filteredProjects = projects.filter(
    (project) =>
      (activeCategory === null || project.category === activeCategory) &&
      (searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-4">
        {/* Search and filter */}
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search projects"
              className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            size="icon"
            className={`ml-2 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
            variant="ghost"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-lg overflow-hidden border ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
            >
              <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex justify-between">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    View Project
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">No projects found matching your criteria</div>
        )}

      {/* Email Button */}
<div className="mt-6 text-center">
  <a
    href="mailto:giovaneinesdev@gmail.com?subject=Project Inquiry&body=Gostaria%20de%20entrar%20em%20contato%20com%20você%20sobre%20projetos%20e%20propostas%20de%20emprego."
    className={`w-full inline-block ${isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-center py-2 px-4 rounded-md text-white`}
  >
    Entrar em Contato
  </a>
</div>
      </div>
    </div>
  )
}
//   </div>
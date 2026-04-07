"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ExternalLink, Filter, Github, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fallbackProjects } from "@/lib/projects"
import type { PortfolioProject, PortfolioProjectsResponse } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProjectsAppProps {
  isDarkMode: boolean
}

function getCategoryGradient(category: string) {
  switch (category) {
    case "Flutter":
      return "from-sky-500 via-cyan-500 to-blue-600"
    case "FlutterFlow":
      return "from-indigo-500 via-blue-500 to-cyan-500"
    case "Java":
      return "from-orange-500 via-amber-500 to-red-500"
    case "Angular":
      return "from-rose-500 via-red-500 to-orange-500"
    case "TypeScript":
      return "from-blue-600 via-slate-700 to-cyan-500"
    case "Python":
      return "from-yellow-400 via-green-500 to-emerald-600"
    case "Database":
      return "from-slate-500 via-stone-600 to-neutral-800"
    default:
      return "from-violet-500 via-fuchsia-500 to-pink-500"
  }
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export default function ProjectsApp({ isDarkMode }: ProjectsAppProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [projects, setProjects] = useState<PortfolioProject[]>(fallbackProjects)
  const [source, setSource] = useState<PortfolioProjectsResponse["source"]>("fallback")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects", {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Projects request failed with status ${response.status}`)
        }

        const payload = (await response.json()) as PortfolioProjectsResponse
        setProjects(payload.projects)
        setSource(payload.source)
      } catch (error) {
        if (controller.signal.aborted) return

        setProjects(fallbackProjects)
        setSource("fallback")
        console.error("Failed to load GitHub projects", error)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProjects()

    return () => controller.abort()
  }, [])

  const categories = Array.from(new Set(projects.map((project) => project.category)))

  const filteredProjects = projects.filter((project) => {
    if (activeCategory !== null && project.category !== activeCategory) return false
    if (showFeaturedOnly && !project.featured) return false
    if (!searchTerm.trim()) return true

    const normalizedSearch = searchTerm.toLowerCase()

    return (
      project.title.toLowerCase().includes(normalizedSearch) ||
      project.description.toLowerCase().includes(normalizedSearch) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(normalizedSearch))
    )
  })

  return (
    <div className={`h-full overflow-auto ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="outline" className={cn(isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-300")}>
            {source === "github" ? "GitHub ao vivo" : "Fallback local"}
          </Badge>
          <Badge variant="secondary" className={cn(isDarkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700")}>
            {projects.length} projetos
          </Badge>
          <Link
            href="/showreel"
            className={cn(
              "ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 font-medium transition-colors",
              isDarkMode ? "bg-gray-900 text-blue-300 hover:bg-gray-800" : "bg-blue-50 text-blue-700 hover:bg-blue-100",
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Showreel
          </Link>
        </div>

        <div className="flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Buscar projetos"
              className={`pl-9 ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"}`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Button
            size="icon"
            variant="ghost"
            className={`ml-2 ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => setShowFeaturedOnly((value) => !value)}
            aria-label="Alternar destaque"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            Todos
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
          <Badge
            variant={showFeaturedOnly ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setShowFeaturedOnly((value) => !value)}
          >
            Destaques
          </Badge>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl border ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
              >
                <div className={`h-40 animate-pulse ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />
                <div className="space-y-3 p-4">
                  <div className={`h-5 w-2/3 animate-pulse rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />
                  <div className={`h-4 w-full animate-pulse rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />
                  <div className={`h-4 w-4/5 animate-pulse rounded ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`overflow-hidden rounded-2xl border ${isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"}`}
              >
                {project.image ? (
                  <div className="relative h-40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 375px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className={cn("h-40 bg-gradient-to-br p-4 text-white", getCategoryGradient(project.category))}>
                    <div className="flex h-full flex-col justify-between">
                      <Badge className="w-fit border-white/25 bg-white/15 text-white hover:bg-white/15">
                        {project.category}
                      </Badge>
                      <div>
                        <div className="text-xs uppercase tracking-[0.25em] text-white/70">Projeto</div>
                        <h3 className="mt-2 text-2xl font-semibold leading-tight">{project.title}</h3>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className={`mt-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {project.description}
                      </p>
                    </div>
                    {project.featured && (
                      <Badge className="bg-blue-600 text-white hover:bg-blue-600">Destaque</Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className={`flex items-center justify-between text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <span>{project.language ?? project.category}</span>
                    <span>{project.stars} stars</span>
                    <span>{formatUpdatedAt(project.updatedAt)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver projeto
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-400/50 py-10 text-center text-gray-500">
            Nenhum projeto encontrado com esse filtro.
          </div>
        )}

        <div className="pt-2 text-center">
          <a
            href="mailto:giovaneinesdev@gmail.com?subject=Project%20Inquiry&body=Gostaria%20de%20conversar%20sobre%20projetos%20e%20o%20showreel."
            className={`inline-block w-full rounded-xl px-4 py-3 text-center text-white ${
              isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Entrar em contato
          </a>
        </div>
      </div>
    </div>
  )
}

import type { PortfolioProject } from "@/lib/types"

const projectImages: Record<string, string> = {
  "flutter-techtaste": "/images/flutter-techtaste.png",
  "AudioBook-flutterflow": "/images/audiobook-flutterflow.png",
  appviagens: "/images/appviagens.png",
  "AppDeCursos-flutterflow": "/images/appdecursos.png",
  "Lojja-flutterflow": "/images/lojja.png",
  "Pokedex-Java": "/images/pokedex-java.png",
  "Calculadoras-Java": "/images/calculadoras-java.png",
  "Sistema-de-Gerenciamento-de-Estoque": "/images/sistema-estoque.png",
  "Recibo-emadec": "/images/recibo-emadec.png",
  "spotify-imersao-alura": "/images/spotify-alura.png",
  "LinkTree-copy": "/images/linktree.png",
  "clone-trello": "/images/clone-trello.png",
  "pokedex-angular": "/images/pokedex-angular.png",
  "Sistemas-Livros": "/images/sistemas-livros.png",
  "barbearia.alura.io": "/images/barbearia.png",
  "ChallengeONE.Decodificador.io-": "/images/decodificador.png",
}

type ProjectOverride = Partial<
  Pick<PortfolioProject, "title" | "description" | "category" | "technologies" | "link" | "featured">
>

const projectOverrides: Record<string, ProjectOverride> = {
  StreamixSite: {
    title: "Streamix",
    description:
      "Landing page e experiência web para uma plataforma de streaming, com foco em apresentação visual, navegação moderna e identidade digital.",
    category: "TypeScript",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://streamix-ondemand.vercel.app",
    featured: true,
  },
  "Recibo-emadec": {
    title: "Recibo EmaDec",
    description:
      "Aplicação web para emissão rápida de recibos, pensada para agilizar rotinas administrativas com uma interface simples e direta.",
    category: "Web",
    technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
    link: "https://recibo-emadec.vercel.app",
    featured: true,
  },
  "disney-api": {
    title: "Disney Character Search",
    description:
      "Aplicação Angular conectada a API externa, com busca, paginação e interface responsiva para explorar personagens e conteúdos.",
    category: "Angular",
    technologies: ["Angular", "TypeScript", "API REST", "Bootstrap"],
    link: "https://disney-api-xi.vercel.app",
    featured: true,
  },
  "Sistema-de-Gerenciamento-de-Estoque": {
    title: "Sistema de Gerenciamento de Estoque",
    description:
      "Sistema desktop criado para organizar entradas, saídas e controle de produtos, reforçando lógica de negócio e estrutura de dados.",
    category: "Java",
    technologies: ["Java", "Swing", "MySQL"],
    featured: true,
  },
  "AudioBook-flutterflow": {
    title: "AudioBook",
    description:
      "Aplicativo de audiobooks prototipado em FlutterFlow para acelerar validação de produto e navegação mobile.",
    category: "FlutterFlow",
    technologies: ["FlutterFlow", "Dart", "Mobile"],
    featured: true,
  },
  "flutter-techtaste": {
    title: "Flutter TechTaste",
    description:
      "Aplicativo Flutter desenvolvido no Google IDX para explorar navegação, componentes e experiência mobile.",
    category: "Flutter",
    technologies: ["Flutter", "Dart", "Google IDX"],
    featured: true,
  },
  appviagens: {
    title: "App Viagens",
    description:
      "Aplicativo mobile em FlutterFlow voltado para exploração de destinos e organização de uma experiência de viagem.",
    category: "FlutterFlow",
    technologies: ["FlutterFlow", "Dart", "Mobile"],
    featured: true,
  },
  "AppDeCursos-flutterflow": {
    title: "App de Cursos",
    description:
      "Aplicativo para organização de conteúdos educacionais com foco em consumo mobile e estrutura visual objetiva.",
    category: "FlutterFlow",
    technologies: ["FlutterFlow", "Dart", "Mobile"],
    featured: true,
  },
  "Lojja-flutterflow": {
    title: "Lojja",
    description:
      "Aplicativo com proposta de catálogo e navegação de loja, desenvolvido em FlutterFlow para validar fluxos de e-commerce.",
    category: "FlutterFlow",
    technologies: ["FlutterFlow", "Dart", "E-commerce"],
    featured: true,
  },
  "Pokedex-Java": {
    title: "Pokedex Java",
    description:
      "Projeto em Java criado para consolidar lógica, modelagem orientada a objetos e organização de uma aplicação desktop.",
    category: "Java",
    technologies: ["Java", "POO"],
  },
  "Calculadoras-Java": {
    title: "Calculadoras Java",
    description: "Coleção de calculadoras em Java para praticar lógica de negócio, estrutura de interface e orientação a objetos.",
    category: "Java",
    technologies: ["Java", "POO"],
  },
  "Scripts-SQL-para-WinThor": {
    title: "Scripts SQL para WinThor",
    description:
      "Coleção de scripts SQL voltada para consultas e manutenção de dados no ecossistema WinThor.",
    category: "Database",
    technologies: ["PL/SQL", "WinThor", "Banco de Dados"],
  },
}

export const curatedProjectOrder = [
  "StreamixSite",
  "Recibo-emadec",
  "disney-api",
  "Sistema-de-Gerenciamento-de-Estoque",
  "AudioBook-flutterflow",
  "flutter-techtaste",
  "Lojja-flutterflow",
  "AppDeCursos-flutterflow",
  "appviagens",
  "Pokedex-Java",
] as const

export function getProjectImage(repoName: string): string | null {
  return projectImages[repoName] ?? null
}

export function getProjectOverride(repoName: string): ProjectOverride | undefined {
  return projectOverrides[repoName]
}

export function humanizeRepoName(repoName: string): string {
  return repoName
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function inferProjectCategory({
  name,
  description,
  language,
}: {
  name: string
  description: string | null
  language: string | null
}): string {
  const haystack = `${name} ${description ?? ""}`.toLowerCase()

  if (haystack.includes("flutterflow")) return "FlutterFlow"
  if (language === "Dart") return "Flutter"
  if (haystack.includes("angular")) return "Angular"
  if (language === "Java") return "Java"
  if (language === "TypeScript") return "TypeScript"
  if (language === "Python") return "Python"
  if (language === "PLSQL") return "Database"
  if (language === "HTML" || language === "CSS") return "Web"

  return language ?? "Projetos"
}

export function inferProjectTechnologies({
  name,
  description,
  language,
  topics,
}: {
  name: string
  description: string | null
  language: string | null
  topics: string[]
}): string[] {
  const technologies = new Set<string>()
  const haystack = `${name} ${description ?? ""}`.toLowerCase()

  for (const topic of topics) {
    technologies.add(topic.replace(/[-_]+/g, " "))
  }

  if (language) {
    technologies.add(language)
  }

  if (haystack.includes("flutterflow")) {
    technologies.add("FlutterFlow")
    technologies.add("Dart")
  }

  if (haystack.includes("flutter") && !haystack.includes("flutterflow")) {
    technologies.add("Flutter")
    technologies.add("Dart")
  }

  if (haystack.includes("angular")) {
    technologies.add("Angular")
    technologies.add("TypeScript")
  }

  if (haystack.includes("spring")) {
    technologies.add("Spring Boot")
  }

  if (haystack.includes("api")) {
    technologies.add("API")
  }

  if (language === "HTML" || language === "CSS") {
    technologies.add("HTML")
    technologies.add("CSS")
  }

  if (haystack.includes("mysql")) {
    technologies.add("MySQL")
  }

  if (haystack.includes("docker")) {
    technologies.add("Docker")
  }

  return Array.from(technologies).slice(0, 5)
}

export const fallbackProjects: PortfolioProject[] = [
  {
    id: "StreamixSite",
    title: "Streamix",
    description:
      "Landing page e experiência web para uma plataforma de streaming, com foco em apresentação visual, navegação moderna e identidade digital.",
    image: getProjectImage("StreamixSite"),
    category: "TypeScript",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    link: "https://streamix-ondemand.vercel.app",
    github: "https://github.com/contagiovaneines/StreamixSite",
    stars: 0,
    updatedAt: "2025-12-04T06:16:49Z",
    language: "TypeScript",
    featured: true,
  },
  {
    id: "Recibo-emadec",
    title: "Recibo EmaDec",
    description:
      "Aplicação web para emissão rápida de recibos, pensada para agilizar rotinas administrativas com uma interface simples e direta.",
    image: getProjectImage("Recibo-emadec"),
    category: "Web",
    technologies: ["HTML", "CSS", "JavaScript", "Vercel"],
    link: "https://recibo-emadec.vercel.app",
    github: "https://github.com/contagiovaneines/Recibo-emadec",
    stars: 0,
    updatedAt: "2025-04-04T02:40:26Z",
    language: "HTML",
    featured: true,
  },
  {
    id: "disney-api",
    title: "Disney Character Search",
    description:
      "Aplicação Angular conectada a API externa, com busca, paginação e interface responsiva para explorar personagens e conteúdos.",
    image: getProjectImage("disney-api"),
    category: "Angular",
    technologies: ["Angular", "TypeScript", "API REST", "Bootstrap"],
    link: "https://disney-api-xi.vercel.app",
    github: "https://github.com/contagiovaneines/disney-api",
    stars: 0,
    updatedAt: "2025-02-13T01:57:14Z",
    language: "TypeScript",
    featured: true,
  },
  {
    id: "Sistema-de-Gerenciamento-de-Estoque",
    title: "Sistema de Gerenciamento de Estoque",
    description:
      "Sistema desktop criado para organizar entradas, saídas e controle de produtos, reforçando lógica de negócio e estrutura de dados.",
    image: getProjectImage("Sistema-de-Gerenciamento-de-Estoque"),
    category: "Java",
    technologies: ["Java", "Swing", "MySQL"],
    link: "https://github.com/contagiovaneines/Sistema-de-Gerenciamento-de-Estoque",
    github: "https://github.com/contagiovaneines/Sistema-de-Gerenciamento-de-Estoque",
    stars: 0,
    updatedAt: "2025-04-01T15:47:10Z",
    language: "Java",
    featured: true,
  },
  {
    id: "AudioBook-flutterflow",
    title: "AudioBook",
    description:
      "Aplicativo de audiobooks prototipado em FlutterFlow para acelerar validação de produto e navegação mobile.",
    image: getProjectImage("AudioBook-flutterflow"),
    category: "FlutterFlow",
    technologies: ["FlutterFlow", "Dart", "Mobile"],
    link: "https://github.com/contagiovaneines/AudioBook-flutterflow",
    github: "https://github.com/contagiovaneines/AudioBook-flutterflow",
    stars: 0,
    updatedAt: "2025-04-04T18:14:59Z",
    language: "Dart",
    featured: true,
  },
  {
    id: "flutter-techtaste",
    title: "Flutter TechTaste",
    description:
      "Aplicativo Flutter desenvolvido no Google IDX para explorar navegação, componentes e experiência mobile.",
    image: getProjectImage("flutter-techtaste"),
    category: "Flutter",
    technologies: ["Flutter", "Dart", "Google IDX"],
    link: "https://github.com/contagiovaneines/flutter-techtaste",
    github: "https://github.com/contagiovaneines/flutter-techtaste",
    stars: 0,
    updatedAt: "2025-04-15T23:06:22Z",
    language: "Dart",
    featured: true,
  },
]

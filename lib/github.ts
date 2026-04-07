import "server-only"

import {
  curatedProjectOrder,
  fallbackProjects,
  getProjectImage,
  getProjectOverride,
  humanizeRepoName,
  inferProjectCategory,
  inferProjectTechnologies,
} from "@/lib/projects"
import type { PortfolioProject, PortfolioProjectsResponse } from "@/lib/types"

type GithubRepo = {
  archived: boolean
  description: string | null
  fork: boolean
  homepage: string | null
  html_url: string
  language: string | null
  name: string
  pushed_at: string
  stargazers_count: number
  topics: string[]
  updated_at: string
}

const GITHUB_USERNAME = "Contagiovaneines"
const GITHUB_API_VERSION = "2026-03-10"
const MAX_PROJECTS = 16
const EXCLUDED_REPO_NAMES = new Set([
  "Contagiovaneines",
  "Contagiovaneines.github.io",
  "giovane-portfolio",
])

function getFeaturedRepos(): string[] {
  const rawValue = process.env.FEATURED_REPOS?.trim()
  if (rawValue) {
    return rawValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return [...curatedProjectOrder]
}

function isInterestingRepo(repo: GithubRepo): boolean {
  if (repo.fork || repo.archived) return false
  if (EXCLUDED_REPO_NAMES.has(repo.name)) return false

  const normalizedName = repo.name.toLowerCase()
  const normalizedDescription = (repo.description ?? "").toLowerCase()
  const haystack = `${normalizedName} ${normalizedDescription}`

  if (/config|github-config|profile-readme/.test(normalizedName)) return false
  if (/download|playlist|youtube|bootcamp|estudos|study/.test(haystack)) return false

  return true
}

function scoreRepo(repo: GithubRepo, featuredRepos: string[]): number {
  const normalizedName = repo.name.toLowerCase()
  const normalizedDescription = (repo.description ?? "").toLowerCase()
  const haystack = `${normalizedName} ${normalizedDescription}`
  const updatedRecently = Date.now() - new Date(repo.updated_at).getTime() < 1000 * 60 * 60 * 24 * 540
  let score = 0

  if (featuredRepos.includes(repo.name)) score += 12
  if (repo.homepage) score += 4
  if (repo.description) score += 3
  if (repo.language) score += 2
  if (repo.topics.length > 0) score += 2
  if (updatedRecently) score += 1
  score += Math.min(repo.stargazers_count, 3)

  if (/(app|site|landing|api|angular|flutter|java|mobile|sistema|stock|dashboard|platform|stream)/.test(haystack)) {
    score += 2
  }

  if (/(script|sql|query)/.test(haystack)) {
    score -= 1
  }

  return score
}

function mergeTechnologies(base: string[], extra?: string[]): string[] {
  if (!extra?.length) return base

  return Array.from(new Set([...extra, ...base])).slice(0, 6)
}

function mapRepoToProject(repo: GithubRepo, featuredRepos: string[]): PortfolioProject {
  const override = getProjectOverride(repo.name)
  const inferredTechnologies = inferProjectTechnologies({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    topics: repo.topics,
  })
  const defaultDescription = repo.description?.trim() || `Projeto ${humanizeRepoName(repo.name)} hospedado no GitHub.`

  return {
    id: repo.name,
    title: override?.title ?? humanizeRepoName(repo.name),
    description: override?.description ?? defaultDescription,
    image: getProjectImage(repo.name),
    category:
      override?.category ??
      inferProjectCategory({
        name: repo.name,
        description: repo.description,
        language: repo.language,
      }),
    technologies: mergeTechnologies(inferredTechnologies, override?.technologies),
    link: override?.link ?? repo.homepage?.trim() ?? repo.html_url,
    github: repo.html_url,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
    language: repo.language,
    featured: override?.featured ?? (featuredRepos.includes(repo.name) || Boolean(repo.homepage)),
  }
}

async function fetchGithubRepos(): Promise<GithubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "giovane-portfolio",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    },
  )

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`)
  }

  return (await response.json()) as GithubRepo[]
}

export async function getPortfolioProjectsResponse(): Promise<PortfolioProjectsResponse> {
  const featuredRepos = getFeaturedRepos()

  try {
    const repos = await fetchGithubRepos()

    const projects = repos
      .filter(isInterestingRepo)
      .map((repo) => ({
        repo,
        score: scoreRepo(repo, featuredRepos),
      }))
      .filter(({ score }) => score >= 3)
      .sort((a, b) => {
        const featuredDelta = Number(featuredRepos.includes(b.repo.name)) - Number(featuredRepos.includes(a.repo.name))
        if (featuredDelta !== 0) return featuredDelta
        if (b.score !== a.score) return b.score - a.score
        return new Date(b.repo.pushed_at).getTime() - new Date(a.repo.pushed_at).getTime()
      })
      .slice(0, MAX_PROJECTS)
      .map(({ repo }) => mapRepoToProject(repo, featuredRepos))

    if (projects.length > 0) {
      return {
        source: "github",
        username: GITHUB_USERNAME,
        projects,
      }
    }
  } catch {
    // Falls back to curated local data when the GitHub API is unavailable.
  }

  return {
    source: "fallback",
    username: GITHUB_USERNAME,
    projects: fallbackProjects,
  }
}

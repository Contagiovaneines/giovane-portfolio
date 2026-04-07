"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Globe,
  LayoutTemplate,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  MonitorSmartphone,
  MoonStar,
  PanelTop,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Workflow,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTheme } from "next-themes"

import { Badge } from "@/components/ui/badge"
import { profileData } from "@/lib/profile"
import type { PortfolioProject, PortfolioProjectsResponse } from "@/lib/types"
import { cn } from "@/lib/utils"

type PortfolioHomeProps = {
  projects: PortfolioProject[]
  source: PortfolioProjectsResponse["source"]
}

const serviceIcons: Record<string, LucideIcon> = {
  sites: Globe,
  "landing-pages": LayoutTemplate,
  "sistemas-web": MonitorSmartphone,
  "apis-integracoes": Workflow,
  "white-label": Layers3,
}

const serviceAccents: Record<string, string> = {
  sites: "from-sky-500 via-cyan-400 to-cyan-200",
  "landing-pages": "from-amber-400 via-orange-300 to-rose-200",
  "sistemas-web": "from-slate-900 via-slate-700 to-slate-500",
  "apis-integracoes": "from-emerald-500 via-teal-400 to-cyan-200",
  "white-label": "from-fuchsia-500 via-violet-400 to-sky-300",
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const panelClass =
  "rounded-[30px] border border-slate-900/10 bg-white/75 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.32)] backdrop-blur-xl transition duration-300 dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_32px_120px_-64px_rgba(2,6,23,0.92)]"

const subtleTextClass = "text-slate-700 dark:text-slate-300/84"
const softTextClass = "text-slate-600 dark:text-slate-400"
const labelClass = "text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400"
const INTRO_SESSION_KEY = "portfolio-intro-seen"
const INTRO_DURATION_MS = 920

function buildMailto(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${profileData.email}?${params.toString()}`
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

function sortProjects(projects: PortfolioProject[]) {
  const selected = new Map(projects.map((project) => [project.id, project]))
  const prioritized = profileData.featuredProjectIds
    .map((projectId) => selected.get(projectId))
    .filter((project): project is PortfolioProject => Boolean(project))

  const remaining = projects.filter((project) => !profileData.featuredProjectIds.includes(project.id))

  return [...prioritized, ...remaining].slice(0, 6)
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-900/20 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-white/20 dark:hover:text-white"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
        {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      </span>
      <span className="hidden sm:inline">{isDark ? "Modo claro" : "Modo escuro"}</span>
    </button>
  )
}

function IntroOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-hidden bg-[#f7f4ee] dark:bg-[#020617]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }}
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/15"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="relative flex h-full items-center justify-center px-6">
        <motion.div
          className="max-w-2xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUpVariants} className={cn(labelClass, "mb-6 text-sky-800 dark:text-sky-200")}>
            Portfolio Experience
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="font-[family:var(--font-display)] text-4xl font-bold tracking-[-0.08em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Giovane Ines
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-5 max-w-xl text-sm uppercase tracking-[0.34em] text-slate-500 dark:text-slate-400 sm:text-base"
          >
            sites • landing pages • sistemas • integracoes
          </motion.p>
          <motion.div
            variants={fadeUpVariants}
            className="mx-auto mt-8 h-px w-48 bg-gradient-to-r from-transparent via-slate-950/40 to-transparent dark:via-white/40"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

function SectionIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl space-y-3">
        <div className={labelClass}>{eyebrow}</div>
        <h2 className="font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.06em] text-slate-950 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className={cn("text-base leading-7 sm:text-lg", subtleTextClass)}>{description}</p>
      </div>
      {action}
    </div>
  )
}

function ProjectActions({ project }: { project: PortfolioProject }) {
  const onlyGithub = project.link === project.github

  if (onlyGithub) {
    return (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
      >
        <Github className="h-4 w-4" />
        Ver no GitHub
      </a>
    )
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        <ExternalLink className="h-4 w-4" />
        Ver projeto
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
      >
        <Code2 className="h-4 w-4" />
        Codigo
      </a>
    </div>
  )
}

function SurfaceMotionCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(panelClass, className)}
    >
      {children}
    </motion.div>
  )
}

export function PortfolioHome({ projects, source }: PortfolioHomeProps) {
  const reduceMotion = useReducedMotion()
  const [showIntro, setShowIntro] = useState(!reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setShowIntro(false)
      return
    }

    try {
      const hasSeenIntro = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1"

      if (hasSeenIntro) {
        setShowIntro(false)
        return
      }

      window.sessionStorage.setItem(INTRO_SESSION_KEY, "1")
    } catch {
      // Falls back to the current visit when sessionStorage is unavailable.
    }

    setShowIntro(true)
    const timer = window.setTimeout(() => {
      setShowIntro(false)
    }, INTRO_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  const featuredProjects = useMemo(() => sortProjects(projects), [projects])
  const budgetLink = buildMailto(
    "Solicitacao de orcamento",
    "Ola, Giovane. Gostaria de conversar sobre um projeto e entender como voce pode me ajudar.",
  )
  const contactLink = buildMailto(
    "Contato pelo portfolio",
    "Ola, Giovane. Vi seu portfolio e gostaria de falar sobre um projeto, parceria ou oportunidade.",
  )
  const whatsappLink = buildMailto(
    "Contato rapido pelo portfolio",
    "Ola, Giovane. Quero falar com voce rapidamente sobre um projeto. Se preferir, me retorne com um contato de WhatsApp.",
  )

  return (
    <>
      <AnimatePresence>{showIntro ? <IntroOverlay /> : null}</AnimatePresence>

      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_85%_12%,_rgba(251,191,36,0.14),_transparent_26%),linear-gradient(180deg,_#f7f4ee_0%,_#f2efe8_100%)] text-slate-950 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_24%),radial-gradient(circle_at_80%_8%,_rgba(251,191,36,0.10),_transparent_18%),linear-gradient(180deg,_#020617_0%,_#0b1120_55%,_#111827_100%)] dark:text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="ambient-orb ambient-orb-primary pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/12" />
        <div className="ambient-orb ambient-orb-secondary pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl dark:bg-amber-300/10" />

        <header className="sticky top-0 z-30 border-b border-slate-900/8 bg-[#f7f4ee]/75 backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-[#020617]/72">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-[family:var(--font-display)] text-lg font-semibold tracking-[-0.04em] text-slate-950 dark:text-white"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:rotate-6 group-hover:scale-105 dark:bg-white dark:text-slate-950">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>Giovane Ines</span>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300 md:flex">
              <a href="#services" className="transition hover:text-slate-950 dark:hover:text-white">
                Servicos
              </a>
              <a href="#projects" className="transition hover:text-slate-950 dark:hover:text-white">
                Projetos
              </a>
              <a href="#about" className="transition hover:text-slate-950 dark:hover:text-white">
                Sobre
              </a>
              <a href="#experience" className="transition hover:text-slate-950 dark:hover:text-white">
                Experiencia
              </a>
              <a href="#contact" className="transition hover:text-slate-950 dark:hover:text-white">
                Contato
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href={budgetLink}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Solicitar orcamento
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </header>

        <motion.div
          className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-8 sm:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <section className="grid gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-16">
            <motion.div variants={fadeUpVariants} className="space-y-8">
              <Badge className="w-fit rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-800 hover:bg-sky-500/10 dark:border-sky-300/20 dark:bg-sky-300/10 dark:text-sky-200">
                {profileData.hero.eyebrow}
              </Badge>

              <div className="space-y-5">
                <div className={labelClass}>{profileData.hero.availabilityNote}</div>
                <h1 className="max-w-4xl font-[family:var(--font-display)] text-4xl font-bold leading-[0.98] tracking-[-0.09em] text-slate-950 dark:text-white sm:text-5xl lg:text-7xl">
                  {profileData.hero.headline}
                </h1>
                <p className={cn("max-w-2xl text-lg leading-8 sm:text-xl", subtleTextClass)}>
                  {profileData.hero.subheadline}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={budgetLink}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  Solicitar orcamento
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
                >
                  Ver projetos
                </a>
                <a
                  href={whatsappLink}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap gap-5 text-sm">
                <div className={cn("inline-flex items-center gap-2", softTextClass)}>
                  <MapPin className="h-4 w-4 text-sky-700 dark:text-sky-300" />
                  {profileData.location} • {profileData.availability}
                </div>
                <div className={cn("inline-flex items-center gap-2", softTextClass)}>
                  <Mail className="h-4 w-4 text-sky-700 dark:text-sky-300" />
                  {profileData.email}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {profileData.proofPoints.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 + index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[26px] border border-white/75 bg-white/80 px-5 py-4 text-sm font-medium text-slate-700 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span>{item}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative">
              <div className="pointer-events-none absolute inset-x-12 top-10 h-40 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-400/10" />

              <div className="relative grid gap-4">
                <SurfaceMotionCard className="overflow-hidden rounded-[34px] bg-slate-950 p-6 text-white dark:border-white/12 dark:bg-white/[0.05]">
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-[24px] border border-white/10">
                      <Image
                        src="/perfil.jpg"
                        alt={profileData.name}
                        fill
                        priority
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.28em] text-sky-200">Perfil profissional</div>
                      <h2 className="font-[family:var(--font-display)] text-2xl font-bold leading-tight text-white">
                        {profileData.title}
                      </h2>
                      <p className="max-w-md text-sm leading-6 text-slate-300">{profileData.bio}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: PanelTop, label: "Sites", value: "claros e premium" },
                      { icon: Workflow, label: "APIs", value: "integradas ao fluxo" },
                      { icon: Rocket, label: "Entrega", value: "rapida e confiavel" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <item.icon className="h-4 w-4 text-sky-200" />
                        <div className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">{item.label}</div>
                        <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </SurfaceMotionCard>

                <div className="grid gap-4 sm:grid-cols-2">
                  <SurfaceMotionCard className="p-6">
                    <div className={labelClass}>O que eu entrego</div>
                    <div className="mt-4 space-y-3">
                      {profileData.serviceFocus.map((item) => (
                        <div key={item} className={cn("flex items-start gap-3 text-sm", subtleTextClass)}>
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-sky-700 dark:text-sky-300" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </SurfaceMotionCard>

                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[30px] bg-[linear-gradient(135deg,_#0f172a_0%,_#164e63_46%,_#38bdf8_100%)] p-6 text-white shadow-[0_24px_90px_-48px_rgba(14,165,233,0.7)]"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">Como eu trabalho</div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="font-semibold">Diagnostico claro</div>
                        <p className="mt-1 text-sm text-sky-50/80">Entendimento do problema e do objetivo antes de desenhar a tela.</p>
                      </div>
                      <div>
                        <div className="font-semibold">Interface com intencao</div>
                        <p className="mt-1 text-sm text-sky-50/80">Design e estrutura pensados para guiar a leitura e a acao.</p>
                      </div>
                      <div>
                        <div className="font-semibold">Base que sustenta</div>
                        <p className="mt-1 text-sm text-sky-50/80">Codigo, integracoes e publicacao organizados para nao travar depois.</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <SurfaceMotionCard className="p-5">
                  <div className={cn("flex flex-wrap items-center gap-3 text-sm", subtleTextClass)}>
                    <Star className="h-4 w-4 text-sky-700 dark:text-sky-300" />
                    <span>{profileData.credentials[0]}</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <span>{profileData.credentials[1]}</span>
                    <span className="text-slate-400 dark:text-slate-500">•</span>
                    <Link
                      href="/showreel"
                      className="font-semibold text-sky-800 transition hover:text-slate-950 dark:text-sky-300 dark:hover:text-white"
                    >
                      Ver showreel
                    </Link>
                  </div>
                </SurfaceMotionCard>
              </div>
            </motion.div>
          </section>

          <motion.section
            id="services"
            className="scroll-mt-28 pt-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionIntro
                eyebrow="Servicos"
                title="Uma identidade visual mais forte para a home, mas com foco em negocio."
                description="Melhorei a forma como a pagina apresenta seu trabalho para que ela pareca mais premium, mais confiavel e mais pronta para conversao."
                action={
                  <a
                    href={budgetLink}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
                  >
                    Falar sobre um projeto
                    <ArrowRight className="h-4 w-4" />
                  </a>
                }
              />
            </motion.div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {profileData.services.map((service, index) => {
                const Icon = serviceIcons[service.id] ?? Sparkles

                return (
                  <motion.article
                    key={service.id}
                    variants={fadeUpVariants}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(panelClass, "group p-6")}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "absolute inset-0 rounded-[24px] bg-gradient-to-br opacity-80 blur-2xl transition duration-300 group-hover:opacity-100",
                          serviceAccents[service.id] ?? "from-sky-500 via-cyan-400 to-cyan-200",
                        )}
                      />
                      <div className="relative inline-flex rounded-[24px] border border-white/40 bg-white/80 p-3 text-slate-950 shadow-lg dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                      0{index + 1}
                    </div>
                    <h3 className="mt-3 font-[family:var(--font-display)] text-xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                      {service.title}
                    </h3>
                    <p className={cn("mt-3 text-sm leading-7", subtleTextClass)}>{service.description}</p>
                  </motion.article>
                )
              })}
            </div>
          </motion.section>

          <motion.section
            id="projects"
            className="scroll-mt-28 pt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.16 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionIntro
                eyebrow="Projetos em destaque"
                title="Abertura mais cinematografica, cards mais vivos e leitura muito mais clara."
                description="Tambem refinei a vitrine para que os projetos parecam mais produto e menos listagem crua de repositorio."
                action={
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="rounded-full border border-slate-300 bg-white/75 px-4 py-2 text-slate-700 hover:bg-white/75 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200">
                      {source === "github" ? "Projetos sincronizados com GitHub" : "Selecao curada local"}
                    </Badge>
                    <Link
                      href="/showreel"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-900 hover:text-slate-950 dark:border-white/12 dark:text-slate-200 dark:hover:border-white/30 dark:hover:text-white"
                    >
                      Ver showreel
                    </Link>
                  </div>
                }
              />
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {featuredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  variants={fadeUpVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-[32px] border border-slate-900/10 bg-white/82 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.38)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-[0_32px_120px_-64px_rgba(2,6,23,0.92)]"
                >
                  {project.image ? (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-56 flex-col justify-between bg-[linear-gradient(135deg,_#0f172a_0%,_#164e63_55%,_#38bdf8_100%)] p-6 text-white">
                      <Badge className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white hover:bg-white/10">
                        {project.category}
                      </Badge>
                      <div>
                        <div className="text-xs uppercase tracking-[0.28em] text-white/65">Projeto em destaque</div>
                        <h3 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.05em]">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-[family:var(--font-display)] text-2xl font-bold tracking-[-0.05em] text-slate-950 dark:text-white">
                          {project.title}
                        </h3>
                        <p className={cn("mt-3 text-sm leading-7", subtleTextClass)}>{project.description}</p>
                      </div>
                      {project.featured ? (
                        <Badge className="rounded-full bg-slate-950 px-3 py-1 text-white hover:bg-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-white">
                          Destaque
                        </Badge>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.05]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      <span>{project.language ?? project.category}</span>
                      <span>Atualizado em {formatUpdatedAt(project.updatedAt)}</span>
                      {project.stars > 0 ? <span>{project.stars} stars</span> : null}
                    </div>

                    <ProjectActions project={project} />
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="scroll-mt-28 pt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <motion.div variants={fadeUpVariants} className="space-y-6">
                <div className={labelClass}>Sobre</div>
                <h2 className="font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.06em] text-slate-950 dark:text-white sm:text-4xl">
                  {profileData.about.heading}
                </h2>

                <div className={cn("space-y-5 text-base leading-8 sm:text-lg", subtleTextClass)}>
                  {profileData.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {profileData.credentials.map((credential) => (
                    <Badge
                      key={credential}
                      className="rounded-full border border-slate-300 bg-white/75 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white/75 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200"
                    >
                      {credential}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="grid gap-4">
                {profileData.about.highlights.map((highlight, index) => {
                  const icons = [ShieldCheck, Blocks, Workflow, Layers3]
                  const HighlightIcon = icons[index % icons.length]

                  return (
                    <SurfaceMotionCard key={highlight.title} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                          <HighlightIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-[family:var(--font-display)] text-xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                            {highlight.title}
                          </h3>
                          <p className={cn("mt-3 text-sm leading-7", subtleTextClass)}>{highlight.description}</p>
                        </div>
                      </div>
                    </SurfaceMotionCard>
                  )
                })}

                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[30px] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-[0_30px_100px_-52px_rgba(2,6,23,0.9)] dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Formacao</div>
                  <div className="mt-4 space-y-4">
                    {profileData.education.map((education) => (
                      <div
                        key={`${education.institution}-${education.degree}`}
                        className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="font-semibold text-white">{education.degree}</div>
                        <div className="mt-1 text-sm text-slate-300">
                          {education.institution} • {education.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="experience"
            className="scroll-mt-28 pt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionIntro
                eyebrow="Experiencia"
                title="Modo noturno mais sofisticado, hierarquia melhor e leitura mais elegante."
                description="Trabalhei para que a pagina fique premium em qualquer tema, com contraste melhor, profundidade maior e tipografia mais confiante."
              />
            </motion.div>

            <div className="mt-8 grid gap-5 xl:grid-cols-3">
              {profileData.experience.map((experience) => (
                <motion.article
                  key={`${experience.company}-${experience.period}`}
                  variants={fadeUpVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(panelClass, "p-6")}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {experience.period}
                  </div>
                  <h3 className="mt-4 font-[family:var(--font-display)] text-2xl font-bold tracking-[-0.05em] text-slate-950 dark:text-white">
                    {experience.title}
                  </h3>
                  <div className="mt-1 text-sm font-semibold text-sky-800 dark:text-sky-300">{experience.company}</div>
                  <p className={cn("mt-4 text-sm leading-7", subtleTextClass)}>{experience.description}</p>

                  <div className="mt-5 space-y-3">
                    {experience.highlights.map((item) => (
                      <div key={item} className={cn("flex items-start gap-3 text-sm", subtleTextClass)}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-sky-700 dark:text-sky-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section
            id="technologies"
            className="scroll-mt-28 pt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div variants={fadeUpVariants}>
              <SectionIntro
                eyebrow="Tecnologias"
                title="Tipografia nova, ritmo visual melhor e icones com mais presenca."
                description="A base tecnica continua clara, mas agora encaixada numa interface que transmite mais valor desde o primeiro scroll."
              />
            </motion.div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {profileData.techGroups.map((group, index) => {
                const icons = [Code2, Workflow, MonitorSmartphone, ShieldCheck]
                const GroupIcon = icons[index % icons.length]

                return (
                  <motion.article
                    key={group.title}
                    variants={fadeUpVariants}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(panelClass, "p-6")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                        <GroupIcon className="h-4 w-4" />
                      </div>
                      <h3 className="font-[family:var(--font-display)] text-xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">
                        {group.title}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:bg-white/[0.05]"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </motion.section>

          <motion.section
            id="contact"
            className="scroll-mt-28 pt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
          >
            <motion.div
              variants={fadeUpVariants}
              className="relative overflow-hidden rounded-[40px] bg-slate-950 px-6 py-10 text-white shadow-[0_40px_120px_-52px_rgba(2,6,23,0.9)] sm:px-8 sm:py-12 lg:px-12 dark:border dark:border-white/10 dark:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-cyan-400/25 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="max-w-3xl space-y-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-200">CTA final</div>
                  <h2 className="font-[family:var(--font-display)] text-3xl font-bold tracking-[-0.06em] text-white sm:text-4xl">
                    {profileData.finalCta.title}
                  </h2>
                  <p className="text-base leading-8 text-slate-300 sm:text-lg">{profileData.finalCta.description}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={budgetLink}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200"
                  >
                    Solicitar orcamento
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={contactLink}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>

              <div className="relative mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { label: "Foco", value: "Sites e landing pages" },
                  { label: "Estrutura", value: "Sistemas, APIs e integracoes" },
                  { label: "Parcerias", value: "Freelancer e white label" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="text-xs uppercase tracking-[0.22em] text-sky-200">{item.label}</div>
                    <div className="mt-3 text-lg font-semibold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          <motion.footer
            variants={fadeUpVariants}
            className="flex flex-col gap-4 border-t border-slate-900/10 pt-10 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              {profileData.shortName} • {profileData.location}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profileData.email}`}
                className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </a>
              <a
                href={profileData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={profileData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-slate-950 dark:hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.footer>
        </motion.div>
      </main>
    </>
  )
}
